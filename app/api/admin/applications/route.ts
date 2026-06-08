import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Competition, ApplicationStatus } from "@/lib/generated/prisma/client";
import { apiLogger } from "@/lib/logger";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const competition = searchParams.get("competition") as Competition | null;
    const status = searchParams.get("status") as ApplicationStatus | null;
    const search = searchParams.get("search");
    const isExport = searchParams.get("export") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = isExport
      ? 10000
      : parseInt(searchParams.get("limit") || "20");
    const skip = isExport ? 0 : (page - 1) * limit;

    // Build where clause
    const where: {
      competition?: Competition;
      status?: ApplicationStatus;
      OR?: Array<{ data: { path: string[]; string_contains: string } }>;
    } = {};

    if (competition) {
      where.competition = competition;
    }

    if (status) {
      where.status = status;
    }

    // Search by name or email in JSON data
    if (search) {
      where.OR = [
        {
          data: {
            path: ["step1", "personalInfo", "email"],
            string_contains: search,
          },
        },
        {
          data: {
            path: ["step1", "personalInfo", "firstName"],
            string_contains: search,
          },
        },
        {
          data: {
            path: ["step1", "personalInfo", "lastName"],
            string_contains: search,
          },
        },
      ];
    }

    // Get applications with pagination
    const [applications, total] = await Promise.all([
      db.application.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          competition: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          decidedAt: true,
          data: true,
        },
      }),
      db.application.count({ where }),
    ]);

    // Transform data to include extracted fields for easier display
    const transformedApplications = applications.map((app) => {
      const data = app.data as {
        step1?: {
          personalInfo?: {
            firstName?: string;
            lastName?: string;
            email?: string;
          };
        };
      };

      return {
        ...app,
        applicantName:
          app.competition === "CASE_STUDY"
            ? (app.data as any).fullName
            : `${data?.step1?.personalInfo?.firstName || ""} ${data?.step1?.personalInfo?.lastName || ""}`.trim(),
        applicantEmail:
          app.competition === "CASE_STUDY"
            ? (app.data as any).email
            : data?.step1?.personalInfo?.email || "",
      };
    });

    return NextResponse.json({
      applications: transformedApplications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    apiLogger.error({ error }, "Admin applications list error");
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
