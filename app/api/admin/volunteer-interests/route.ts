import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  isLgaInState,
  isNigeriaState,
} from "@/lib/constants/nigeria-locations";
import {
  VOLUNTEER_APPLICANT_CATEGORY_VALUES,
  VOLUNTEER_COMPETENCY_VALUES,
  VOLUNTEER_EVENT_AVAILABILITY_VALUES,
  VOLUNTEER_EXPERIENCE_LEVEL_VALUES,
  VOLUNTEER_ROLE_VALUES,
  VOLUNTEER_WEEKLY_COMMITMENT_VALUES,
} from "@/lib/constants/volunteer-interest";
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

const listQuerySchema = z
  .object({
    search: z.string().trim().min(1).max(200).optional(),
    state: z.string().trim().refine(isNigeriaState, "Invalid state").optional(),
    lga: z.string().trim().min(1).max(120).optional(),
    primaryRole: z.enum(VOLUNTEER_ROLE_VALUES).optional(),
    secondaryRole: z.enum(VOLUNTEER_ROLE_VALUES).optional(),
    competency: z.enum(VOLUNTEER_COMPETENCY_VALUES).optional(),
    applicantCategory: z.enum(VOLUNTEER_APPLICANT_CATEGORY_VALUES).optional(),
    experienceLevel: z.enum(VOLUNTEER_EXPERIENCE_LEVEL_VALUES).optional(),
    hasVolunteeredBefore: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),
    weeklyCommitment: z.enum(VOLUNTEER_WEEKLY_COMMITMENT_VALUES).optional(),
    eventAvailability: z.enum(VOLUNTEER_EVENT_AVAILABILITY_VALUES).optional(),
    status: z.enum(VOLUNTEER_STATUS_VALUES).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    export: z
      .enum(["true", "false"])
      .default("false")
      .transform((value) => value === "true"),
  })
  .strict()
  .superRefine(({ state, lga }, context) => {
    if (lga && !state) {
      context.addIssue({
        code: "custom",
        path: ["lga"],
        message: "Select a state before filtering by LGA",
      });
      return;
    }

    if (state && lga && !isLgaInState(state, lga)) {
      context.addIssue({
        code: "custom",
        path: ["lga"],
        message: "LGA does not belong to the selected state",
      });
    }
  });

const listSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  state: true,
  lga: true,
  primaryRole: true,
  applicantCategory: true,
  experienceLevel: true,
  eventAvailability: true,
  status: true,
  createdAt: true,
} as const;

const exportSelect = {
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

function privateJson(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: PRIVATE_HEADERS });
}

function queryObject(searchParams: URLSearchParams): Record<string, string> | null {
  const query = Object.create(null) as Record<string, string>;
  for (const [key, value] of searchParams) {
    if (key in query) return null;
    query[key] = value;
  }
  return query;
}

export async function GET(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return privateJson({ error: "Unauthorized" }, 401);
  }

  const rawQuery = queryObject(new URL(request.url).searchParams);
  if (!rawQuery) {
    return privateJson({ error: "Query parameters must not be repeated" }, 400);
  }

  const parsedQuery = listQuerySchema.safeParse(rawQuery);
  if (!parsedQuery.success) {
    return privateJson(
      {
        error: "Invalid query parameters",
        details: parsedQuery.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      400,
    );
  }

  const {
    search,
    state,
    lga,
    primaryRole,
    secondaryRole,
    competency,
    applicantCategory,
    experienceLevel,
    hasVolunteeredBefore,
    weeklyCommitment,
    eventAvailability,
    status,
    page,
    limit,
    export: isExport,
  } = parsedQuery.data;

  const where = {
    ...(state ? { state } : {}),
    ...(lga ? { lga } : {}),
    ...(primaryRole ? { primaryRole } : {}),
    ...(secondaryRole ? { secondaryRole } : {}),
    ...(competency ? { competencies: { has: competency } } : {}),
    ...(applicantCategory ? { applicantCategory } : {}),
    ...(experienceLevel ? { experienceLevel } : {}),
    ...(hasVolunteeredBefore !== undefined ? { hasVolunteeredBefore } : {}),
    ...(weeklyCommitment ? { weeklyCommitment } : {}),
    ...(eventAvailability ? { eventAvailability } : {}),
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { firstName: { contains: search, mode: "insensitive" as const } },
            { lastName: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { phoneNumber: { contains: search, mode: "insensitive" as const } },
            { city: { contains: search, mode: "insensitive" as const } },
            { address: { contains: search, mode: "insensitive" as const } },
            { affiliationName: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  try {
    const skip = (page - 1) * limit;
    const [interests, total] = await Promise.all([
      isExport
        ? db.volunteerInterest.findMany({
            where,
            orderBy: { createdAt: "desc" },
            select: exportSelect,
          })
        : db.volunteerInterest.findMany({
            where,
            orderBy: { createdAt: "desc" },
            select: listSelect,
            skip,
            take: limit,
          }),
      db.volunteerInterest.count({ where }),
    ]);

    return privateJson({
      interests,
      pagination: {
        total,
        page: isExport ? 1 : page,
        limit: isExport ? total : limit,
        totalPages: isExport ? (total > 0 ? 1 : 0) : Math.ceil(total / limit),
      },
    });
  } catch (error) {
    apiLogger.error({ error }, "Admin volunteer interests list error");
    return privateJson({ error: "Failed to fetch volunteer interests" }, 500);
  }
}
