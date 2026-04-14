import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";
import { ApplicationStatus } from "@/lib/generated/prisma/client";
import {
  sendApplicationAcceptedEmail,
  sendApplicationDeclinedEmail,
} from "@/lib/email";
import { apiLogger } from "@/lib/logger";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const COMPETITION_NAMES: Record<string, string> = {
  DARE_NIGERIA: "DARE Nigeria Challenge",
  SME_PITCH: "SME Pitch Competition",
};

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { decision, notes } = body;

    // Validate decision
    if (!["accept", "decline"].includes(decision)) {
      return NextResponse.json(
        { error: "Invalid decision. Must be 'accept' or 'decline'" },
        { status: 400 },
      );
    }

    // Get current admin from token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const adminId = token?.id as string;

    // Get application
    const application = await db.application.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    // Check if already decided
    if (
      application.status === ApplicationStatus.ACCEPTED ||
      application.status === ApplicationStatus.DECLINED
    ) {
      return NextResponse.json(
        { error: "Application has already been decided" },
        { status: 400 },
      );
    }

    // Update application status
    const newStatus =
      decision === "accept"
        ? ApplicationStatus.ACCEPTED
        : ApplicationStatus.DECLINED;

    const updatedApplication = await db.application.update({
      where: { id },
      data: {
        status: newStatus,
        adminNotes: notes || application.adminNotes,
        decidedAt: new Date(),
        decidedBy: adminId,
      },
    });

    // Extract applicant info for email
    const data = application.data as {
      step1?: {
        personalInfo?: {
          firstName?: string;
          lastName?: string;
          email?: string;
        };
      };
    };

    const applicantEmail = data?.step1?.personalInfo?.email;
    const applicantName =
      `${data?.step1?.personalInfo?.firstName || ""} ${data?.step1?.personalInfo?.lastName || ""}`.trim();
    const competitionName =
      COMPETITION_NAMES[application.competition] || application.competition;

    // Send email notification
    if (applicantEmail) {
      if (decision === "accept") {
        await sendApplicationAcceptedEmail(
          applicantEmail,
          applicantName,
          competitionName,
          notes,
        );
      } else {
        await sendApplicationDeclinedEmail(
          applicantEmail,
          applicantName,
          competitionName,
          notes,
        );
      }
    }

    apiLogger.info(
      {
        applicationId: id,
        decision,
        adminId,
        competition: application.competition,
      },
      "Application decision processed",
    );

    return NextResponse.json({
      success: true,
      application: updatedApplication,
      emailSent: !!applicantEmail,
    });
  } catch (error) {
    apiLogger.error({ error }, "Admin decision error");
    return NextResponse.json(
      { error: "Failed to process decision" },
      { status: 500 },
    );
  }
}
