import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Competition, ApplicationStatus } from "@/lib/generated/prisma/client";
import { apiLogger } from "@/lib/logger";

export async function GET() {
  try {
    // Get counts by competition and status
    const [
      totalApplications,
      dareNigeriaCount,
      smePitchCount,
      pendingCount,
      underReviewCount,
      acceptedCount,
      declinedCount,
      recentApplications,
    ] = await Promise.all([
      db.application.count(),
      db.application.count({
        where: { competition: Competition.DARE_NIGERIA },
      }),
      db.application.count({
        where: { competition: Competition.SME_PITCH },
      }),
      db.application.count({
        where: { status: ApplicationStatus.PENDING },
      }),
      db.application.count({
        where: { status: ApplicationStatus.UNDER_REVIEW },
      }),
      db.application.count({
        where: { status: ApplicationStatus.ACCEPTED },
      }),
      db.application.count({
        where: { status: ApplicationStatus.DECLINED },
      }),
      db.application.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          competition: true,
          status: true,
          createdAt: true,
          data: true,
        },
      }),
    ]);

    // Transform recent applications
    const transformedRecent = recentApplications.map((app) => {
      const data = app.data as {
        step1?: {
          personalInfo?: {
            firstName?: string;
            lastName?: string;
          };
        };
      };

      return {
        id: app.id,
        competition: app.competition,
        status: app.status,
        createdAt: app.createdAt,
        applicantName:
          `${data?.step1?.personalInfo?.firstName || ""} ${data?.step1?.personalInfo?.lastName || ""}`.trim(),
      };
    });

    return NextResponse.json({
      totals: {
        all: totalApplications,
        dareNigeria: dareNigeriaCount,
        smePitch: smePitchCount,
      },
      byStatus: {
        pending: pendingCount,
        underReview: underReviewCount,
        accepted: acceptedCount,
        declined: declinedCount,
      },
      recentApplications: transformedRecent,
    });
  } catch (error) {
    apiLogger.error({ error }, "Admin stats error");
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
