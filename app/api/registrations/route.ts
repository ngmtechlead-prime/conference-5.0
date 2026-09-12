import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendConferenceRegistrationConfirmation } from "@/lib/email";
import { apiLogger } from "@/lib/logger";
import {
  registrationRatelimit,
  checkRateLimit,
  getClientIp,
} from "@/lib/ratelimit";
import { conferenceRegistrationSchema } from "@/lib/schemas/registration";
import { REGISTRATION_PRIVACY_NOTICE_VERSION } from "@/lib/constants/registration";
// import { isSponsoredAttendeeEmail } from "@/lib/registration-eligibility";

const MAX_REQUEST_BYTES = 32_768;

class DuplicateRegistrationError extends Error {}

function hashSubmissionKey(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function createPublicReference(): string {
  return `NGM5-${randomBytes(6).toString("hex").toUpperCase()}`;
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

export async function POST(request: Request) {
  const requestId = randomBytes(8).toString("hex");
  let attemptedSubmissionKeyHash: string | null = null;

  // throw new DuplicateRegistrationError();

  try {
    const ip = getClientIp(request);
    const { success: rateLimitOk } = await checkRateLimit(
      registrationRatelimit,
      ip,
    );

    if (!rateLimitOk) {
      return NextResponse.json(
        {
          success: false,
          code: "RATE_LIMITED",
          error: "Too many registration attempts. Please try again later.",
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
    const validation = conferenceRegistrationSchema.safeParse(formData);

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

    // TODO: Enable after SPONSORED_ATTENDEE_EMAILS has been populated and
    // verified, then replace this temporary commented check with an
    // ENFORCE_REGISTRATION_ELIGIBILITY feature flag.
    // if (!isSponsoredAttendeeEmail(normalizedEmail)) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       code: "EMAIL_NOT_ELIGIBLE",
    //       error:
    //         "We couldn't verify this email against the sponsored or discounted ticket list. Please check the email and register again, or contact the NGM Conference support team for assistance.",
    //       fieldErrors: { email: ["This email could not be verified for a sponsored ticket."] },
    //     },
    //     { status: 403 },
    //   );
    // }

    const result = await db.$transaction(async (transaction) => {
      const replay = await transaction.conferenceRegistration.findUnique({
        where: { submissionKeyHash },
        select: {
          id: true,
          publicReference: true,
          ticketType: true,
          firstName: true,
          email: true,
        },
      });

      if (replay) return { registration: replay, replayed: true };

      const duplicate = await transaction.conferenceRegistration.findUnique({
        where: { normalizedEmail },
        select: { id: true },
      });
      if (duplicate) throw new DuplicateRegistrationError();

      const categoryData =
        data.ticketType === "UNDERGRADUATE"
          ? {
              institutionName: data.undergraduate.institutionName,
              fieldOfStudy: data.undergraduate.fieldOfStudy,
              studentStatusConfirmed: data.undergraduate.studentStatusConfirmed,
              professionalInformation: null,
              industrySector: null,
              professionalCategory: null,
            }
          : {
              institutionName: null,
              fieldOfStudy: null,
              studentStatusConfirmed: null,
              professionalInformation:
                data.professional.professionalInformation,
              industrySector: data.professional.industrySector,
              professionalCategory: data.professional.professionalCategory,
            };

      const registration = await transaction.conferenceRegistration.create({
        data: {
          publicReference: createPublicReference(),
          ticketType: data.ticketType,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          normalizedEmail,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          maritalStatus: data.maritalStatus,
          maritalStatusOther: data.maritalStatusOther ?? null,
          residentialAddress: data.residentialAddress,
          activityOfInterest: data.activityOfInterest,
          discoverySource: data.discoverySource,
          discoverySourceOther: data.discoverySourceOther ?? null,
          referral: data.referral || null,
          privacyConsentAt: new Date(),
          privacyNoticeVersion: REGISTRATION_PRIVACY_NOTICE_VERSION,
          submissionKeyHash,
          ...categoryData,
        },
        select: {
          id: true,
          publicReference: true,
          ticketType: true,
          firstName: true,
          email: true,
        },
      });

      return { registration, replayed: false };
    });

    if (!result.replayed) {
      const emailResult = await sendConferenceRegistrationConfirmation({
        to: result.registration.email,
        firstName: result.registration.firstName,
        publicReference: result.registration.publicReference,
        ticketType: result.registration.ticketType,
      });

      if (!emailResult.success) {
        apiLogger.warn(
          {
            requestId,
            registrationId: result.registration.id,
            ticketType: result.registration.ticketType,
          },
          "Registration saved but confirmation email failed",
        );
      }
    }

    apiLogger.info(
      {
        requestId,
        registrationId: result.registration.id,
        ticketType: result.registration.ticketType,
        replayed: result.replayed,
      },
      "Conference registration completed",
    );

    return NextResponse.json(
      {
        success: true,
        registrationId: result.registration.id,
        publicReference: result.registration.publicReference,
        message: "Registration completed successfully.",
      },
      { status: result.replayed ? 200 : 201 },
    );
  } catch (error) {
    if (error instanceof DuplicateRegistrationError) {
      return NextResponse.json(
        {
          success: false,
          code: "DUPLICATE_REGISTRATION",
          error:
            "This email has already been used to register for NGM Conference 5.0.",
          fieldErrors: {
            email: ["This email is already registered for the conference."],
          },
        },
        { status: 409 },
      );
    }

    if (isUniqueConstraintError(error)) {
      if (attemptedSubmissionKeyHash) {
        const replay = await db.conferenceRegistration.findUnique({
          where: { submissionKeyHash: attemptedSubmissionKeyHash },
          select: { id: true, publicReference: true },
        });

        if (replay) {
          return NextResponse.json({
            success: true,
            registrationId: replay.id,
            publicReference: replay.publicReference,
            message: "Registration completed successfully.",
          });
        }
      }

      return NextResponse.json(
        {
          success: false,
          code: "DUPLICATE_REGISTRATION",
          error:
            "This email has already been used to register for NGM Conference 5.0.",
          fieldErrors: {
            email: ["This email is already registered for the conference."],
          },
        },
        { status: 409 },
      );
    }

    apiLogger.error({ error, requestId }, "Conference registration failed");
    return NextResponse.json(
      {
        success: false,
        code: "REGISTRATION_FAILED",
        error:
          "We couldn't complete your registration right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
