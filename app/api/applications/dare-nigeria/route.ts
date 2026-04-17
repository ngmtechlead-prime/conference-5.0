import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateDareNigeriaApplication } from "@/lib/validation";
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
    // Rate limiting
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

    // Validate form data
    const validation = validateDareNigeriaApplication(formData);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    // Extract email for confirmation
    const applicantEmail = validation.data.step1.personalInfo.email;
    const applicantName = `${validation.data.step1.personalInfo.firstName} ${validation.data.step1.personalInfo.lastName}`;

    // Create application record
    const application = await db.application.create({
      data: {
        competition: Competition.DARE_NIGERIA,
        data: validation.data,
      },
    });

    // Send confirmation email
    await sendApplicationReceivedEmail(
      applicantEmail,
      applicantName,
      "DARE Nigeria Challenge",
    );

    apiLogger.info(
      { applicationId: application.id, competition: "DARE_NIGERIA" },
      "Application submitted successfully",
    );

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: "Application submitted successfully",
    });
  } catch (error) {
    apiLogger.error(
      { error, competition: "DARE_NIGERIA" },
      "Application submission failed",
    );
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}
