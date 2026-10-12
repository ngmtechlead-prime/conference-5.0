import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiLogger } from "@/lib/logger";

const PRIVATE_HEADERS = { "Cache-Control": "private, no-store" } as const;
const VOLUNTEER_STATUS_VALUES = [
  "NEW",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "CONTACTED",
  "SELECTED",
  "WAITLISTED",
  "NOT_SELECTED",
] as const;
const interestIdSchema = z.string().trim().min(1).max(191);
const updateSchema = z
  .object({
    status: z.enum(VOLUNTEER_STATUS_VALUES).optional(),
    adminNotes: z.string().trim().max(5000).nullable().optional(),
  })
  .strict()
  .refine(
    ({ status, adminNotes }) => status !== undefined || adminNotes !== undefined,
    { message: "Provide a status or admin notes" },
  );

const detailSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  state: true,
  lga: true,
  city: true,
  address: true,
  applicantCategory: true,
  applicantCategoryOther: true,
  affiliationName: true,
  courseOrJobTitle: true,
  primaryRole: true,
  secondaryRole: true,
  otherRoleDescription: true,
  competencies: true,
  otherCompetency: true,
  experienceLevel: true,
  relevantExperience: true,
  hasVolunteeredBefore: true,
  volunteerExperience: true,
  motivation: true,
  proposedContribution: true,
  portfolioUrl: true,
  additionalProfileUrl: true,
  contributionStages: true,
  contributionMode: true,
  weeklyCommitment: true,
  availabilityWindows: true,
  eventAvailability: true,
  commitmentAcknowledgedAt: true,
  privacyConsentAt: true,
  privacyNoticeVersion: true,
  status: true,
  adminNotes: true,
  reviewedAt: true,
  reviewedBy: true,
  createdAt: true,
  updatedAt: true,
} as const;

interface RouteParams {
  params: Promise<{ id: string }>;
}

function privateJson(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: PRIVATE_HEADERS });
}

async function authorizedAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN" ? session.user : null;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const admin = await authorizedAdmin();
  if (!admin) return privateJson({ error: "Unauthorized" }, 401);

  const parsedId = interestIdSchema.safeParse((await params).id);
  if (!parsedId.success) {
    return privateJson({ error: "Invalid volunteer interest ID" }, 400);
  }

  try {
    const interest = await db.volunteerInterest.findUnique({
      where: { id: parsedId.data },
      select: detailSelect,
    });

    if (!interest) {
      return privateJson({ error: "Volunteer interest not found" }, 404);
    }

    return privateJson(interest);
  } catch (error) {
    apiLogger.error(
      { error, volunteerInterestId: parsedId.data },
      "Admin volunteer interest detail error",
    );
    return privateJson({ error: "Failed to fetch volunteer interest" }, 500);
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const admin = await authorizedAdmin();
  if (!admin) return privateJson({ error: "Unauthorized" }, 401);

  const parsedId = interestIdSchema.safeParse((await params).id);
  if (!parsedId.success) {
    return privateJson({ error: "Invalid volunteer interest ID" }, 400);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return privateJson({ error: "Request body must be valid JSON" }, 400);
  }

  const parsedBody = updateSchema.safeParse(body);
  if (!parsedBody.success) {
    return privateJson(
      {
        error: "Invalid update",
        details: parsedBody.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      400,
    );
  }

  try {
    const existing = await db.volunteerInterest.findUnique({
      where: { id: parsedId.data },
      select: { id: true },
    });
    if (!existing) {
      return privateJson({ error: "Volunteer interest not found" }, 404);
    }

    const reviewer = admin.email ?? admin.name ?? admin.id;
    const interest = await db.volunteerInterest.update({
      where: { id: parsedId.data },
      data: {
        ...(parsedBody.data.status !== undefined
          ? { status: parsedBody.data.status }
          : {}),
        ...(parsedBody.data.adminNotes !== undefined
          ? { adminNotes: parsedBody.data.adminNotes || null }
          : {}),
        reviewedAt: new Date(),
        reviewedBy: reviewer,
      },
      select: detailSelect,
    });

    apiLogger.info(
      { volunteerInterestId: parsedId.data, reviewerId: admin.id },
      "Volunteer interest reviewed",
    );
    return privateJson(interest);
  } catch (error) {
    apiLogger.error(
      { error, volunteerInterestId: parsedId.data },
      "Admin volunteer interest update error",
    );
    return privateJson({ error: "Failed to update volunteer interest" }, 500);
  }
}
