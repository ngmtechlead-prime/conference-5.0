import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateCaseStudyApplication } from "@/lib/validation";
import { Competition } from "@/lib/generated/prisma/client";
import { sendApplicationReceivedEmail } from "@/lib/email";
import {
  applicationRatelimit,
  checkRateLimit,
  getClientIp,
} from "@/lib/ratelimit";
import { apiLogger } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { success: rateLimitOk } = await checkRateLimit(
      applicationRatelimit,
      ip,
    );

    if (!rateLimitOk) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { formData } = body;

    const validation = validateCaseStudyApplication(formData);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const applicantEmail = validation.data.email;
    const applicantName = validation.data.fullName;

    // Case Study form stores email at the top level; the other competitions
    // nest it under step1.personalInfo.email. Check both shapes so a person
    // who has registered for any competition is detected.
    const existingApplication = await db.application.findFirst({
      where: {
        OR: [
          {
            data: {
              path: ["email"],
              equals: applicantEmail,
            },
          },
          {
            data: {
              path: ["step1", "personalInfo", "email"],
              equals: applicantEmail,
            },
          },
        ],
      },
      select: { id: true, competition: true },
    });

    if (existingApplication) {
      const competitionName =
        existingApplication.competition === Competition.DARE_NIGERIA
          ? "DARE Nigeria Challenge"
          : existingApplication.competition === Competition.SME_PITCH
            ? "SME Pitch Competition"
            : "Case Study & Research Analysis Competition";
      return NextResponse.json(
        {
          error: `You have already registered for the ${competitionName}. Each participant can only register for one competition.`,
        },
        { status: 409 },
      );
    }

    const application = await db.application.create({
      data: {
        competition: Competition.CASE_STUDY,
        data: validation.data,
      },
    });

    await sendApplicationReceivedEmail(
      applicantEmail,
      applicantName,
      "Case Study & Research Analysis Competition",
    );

    apiLogger.info(
      { applicationId: application.id, competition: "CASE_STUDY" },
      "Application submitted successfully",
    );

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: "Application submitted successfully",
    });
  } catch (error) {
    apiLogger.error(
      { error, competition: "CASE_STUDY" },
      "Application submission failed",
    );
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}
