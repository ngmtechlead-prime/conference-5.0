import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendVolunteerInterestConfirmation } from "@/lib/email";
import { apiLogger } from "@/lib/logger";
import {
  checkRateLimit,
  getClientIp,
  volunteerInterestRatelimit,
} from "@/lib/ratelimit";
import { volunteerInterestSchema } from "@/lib/schemas/volunteer-interest";
import { VOLUNTEER_INTEREST_PRIVACY_NOTICE_VERSION } from "@/lib/constants/volunteer-interest";

const MAX_REQUEST_BYTES = 32_768;
const SUCCESS_MESSAGE = "Your volunteer interest has been received.";

class DuplicateVolunteerInterestError extends Error {}

function hashSubmissionKey(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function fieldErrorsFromIssues(
  issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>,
) {
  return issues.reduce<Record<string, string[]>>((errors, issue) => {
    const field = issue.path.map(String).join(".") || "form";
    (errors[field] ??= []).push(issue.message);
    return errors;
  }, {});
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

function privateErrorMetadata(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return { errorType: typeof error };
  }

  return {
    errorName:
      "name" in error && typeof error.name === "string"
        ? error.name
        : "UnknownError",
    errorCode:
      "code" in error && typeof error.code === "string"
        ? error.code
        : undefined,
    error,
  };
}

async function parseRequestBody(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_REQUEST_BYTES) {
    throw new RangeError("Request payload is too large");
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) {
    throw new RangeError("Request payload is too large");
  }

  return JSON.parse(rawBody);
}

function duplicateResponse() {
  return NextResponse.json(
    {
      success: false,
      code: "DUPLICATE_VOLUNTEER_INTEREST",
      error:
        "This email has already been used to submit a volunteer interest for NGM Conference 6.0.",
      fieldErrors: {
        email: ["A volunteer interest already exists for this email address."],
      },
    },
    { status: 409 },
  );
}

export async function POST(request: Request) {
  const requestId = randomBytes(8).toString("hex");
  let attemptedSubmissionKeyHash: string | null = null;

  try {
    const ip = getClientIp(request);
    const { success: rateLimitOk } = await checkRateLimit(
      volunteerInterestRatelimit,
      ip,
    );

    if (!rateLimitOk) {
      return NextResponse.json(
        {
          success: false,
          code: "RATE_LIMITED",
          error: "Too many submission attempts. Please try again later.",
        },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await parseRequestBody(request);
    } catch (error) {
      const message =
        error instanceof RangeError
          ? error.message
          : "Request body must be valid JSON";
      return NextResponse.json(
        { success: false, code: "INVALID_REQUEST", error: message },
        { status: 400 },
      );
    }

    const formData =
      typeof body === "object" && body !== null && "formData" in body
        ? body.formData
        : undefined;
    const validation = volunteerInterestSchema.safeParse(formData);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION_FAILED",
          error: "Please correct the highlighted fields.",
          fieldErrors: fieldErrorsFromIssues(validation.error.issues),
        },
        { status: 400 },
      );
    }

    const data = validation.data;
    const normalizedEmail = data.email;
    const submissionKeyHash = hashSubmissionKey(data.idempotencyKey);
    attemptedSubmissionKeyHash = submissionKeyHash;

    const result = await db.$transaction(async (transaction) => {
      const replay = await transaction.volunteerInterest.findUnique({
        where: { submissionKeyHash },
        select: {
          id: true,
          primaryRole: true,
          firstName: true,
          email: true,
        },
      });

      if (replay) return { interest: replay, replayed: true };

      const duplicate = await transaction.volunteerInterest.findUnique({
        where: { normalizedEmail },
        select: { id: true },
      });
      if (duplicate) throw new DuplicateVolunteerInterestError();

      const consentedAt = new Date();
      const interest = await transaction.volunteerInterest.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          normalizedEmail,
          phoneNumber: data.phoneNumber,
          state: data.state,
          lga: data.lga,
          city: data.city,
          address: data.address,
          applicantCategory: data.applicantCategory,
          applicantCategoryOther: data.applicantCategoryOther ?? null,
          affiliationName: data.affiliationName ?? null,
          courseOrJobTitle: data.courseOrJobTitle ?? null,
          primaryRole: data.primaryRole,
          secondaryRole: data.secondaryRole ?? null,
          otherRoleDescription: data.otherRoleDescription ?? null,
          competencies: data.competencies,
          otherCompetency: data.otherCompetency ?? null,
          experienceLevel: data.experienceLevel ?? null,
          relevantExperience: data.relevantExperience ?? null,
          hasVolunteeredBefore: data.hasVolunteeredBefore ?? null,
          volunteerExperience: data.volunteerExperience ?? null,
          motivation: data.motivation ?? null,
          proposedContribution: data.proposedContribution ?? null,
          portfolioUrl: data.portfolioUrl ?? null,
          additionalProfileUrl: data.additionalProfileUrl ?? null,
          contributionStages: data.contributionStages ?? [],
          contributionMode: data.contributionMode ?? null,
          weeklyCommitment: data.weeklyCommitment ?? null,
          availabilityWindows: data.availabilityWindows ?? [],
          eventAvailability: data.eventAvailability ?? null,
          commitmentAcknowledgedAt: data.commitmentAcknowledged
            ? consentedAt
            : null,
          privacyConsentAt: data.privacyConsent ? consentedAt : null,
          privacyNoticeVersion: VOLUNTEER_INTEREST_PRIVACY_NOTICE_VERSION,
          submissionKeyHash,
        },
        select: {
          id: true,
          primaryRole: true,
          firstName: true,
          email: true,
        },
      });

      return { interest, replayed: false };
    });

    if (!result.replayed) {
      try {
        const emailResult = await sendVolunteerInterestConfirmation({
          to: result.interest.email,
          firstName: result.interest.firstName,
          primaryRole: result.interest.primaryRole,
        });

        if (!emailResult.success) {
          apiLogger.warn(
            {
              requestId,
              interestId: result.interest.id,
              primaryRole: result.interest.primaryRole,
              outcome: "email_failed",
              replayed: false,
            },
            "Volunteer interest saved but confirmation email failed",
          );
        }
      } catch (error) {
        apiLogger.warn(
          {
            requestId,
            interestId: result.interest.id,
            primaryRole: result.interest.primaryRole,
            outcome: "email_failed",
            replayed: false,
            ...privateErrorMetadata(error),
          },
          "Volunteer interest saved but confirmation email failed",
        );
      }
    }

    apiLogger.info(
      {
        requestId,
        interestId: result.interest.id,
        primaryRole: result.interest.primaryRole,
        outcome: "success",
        replayed: result.replayed,
      },
      "Volunteer interest submission completed",
    );

    return NextResponse.json(
      {
        success: true,
        interestId: result.interest.id,
        message: SUCCESS_MESSAGE,
      },
      { status: result.replayed ? 200 : 201 },
    );
  } catch (error) {
    if (error instanceof DuplicateVolunteerInterestError) {
      return duplicateResponse();
    }

    if (isUniqueConstraintError(error)) {
      if (attemptedSubmissionKeyHash) {
        try {
          const replay = await db.volunteerInterest.findUnique({
            where: { submissionKeyHash: attemptedSubmissionKeyHash },
            select: {
              id: true,
              primaryRole: true,
            },
          });

          if (replay) {
            apiLogger.info(
              {
                requestId,
                interestId: replay.id,
                primaryRole: replay.primaryRole,
                outcome: "success",
                replayed: true,
              },
              "Volunteer interest submission replayed after unique conflict",
            );

            return NextResponse.json({
              success: true,
              interestId: replay.id,
              message: SUCCESS_MESSAGE,
            });
          }
        } catch (replayError) {
          apiLogger.error(
            {
              requestId,
              outcome: "replay_lookup_failed",
              ...privateErrorMetadata(replayError),
            },
            "Volunteer interest replay lookup failed",
          );

          return NextResponse.json(
            {
              success: false,
              code: "VOLUNTEER_INTEREST_FAILED",
              error:
                "We couldn't submit your volunteer interest right now. Please try again.",
            },
            { status: 500 },
          );
        }
      }

      return duplicateResponse();
    }

    console.error(error);

    apiLogger.error(
      {
        requestId,
        outcome: "failed",
        ...privateErrorMetadata(error),
      },
      "Volunteer interest submission failed",
    );
    return NextResponse.json(
      {
        success: false,
        code: "VOLUNTEER_INTEREST_FAILED",
        error:
          "We couldn't submit your volunteer interest right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
