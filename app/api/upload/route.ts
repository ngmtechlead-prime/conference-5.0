import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  r2Client,
  R2_BUCKET,
  generateFileKey,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "@/lib/r2";
import { uploadRatelimit, checkRateLimit, getClientIp } from "@/lib/ratelimit";
import { uploadLogger } from "@/lib/logger";

const ALLOWED_COMPETITIONS = ["dare-nigeria", "sme-pitch"];

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const { success: rateLimitOk } = await checkRateLimit(uploadRatelimit, ip);

    if (!rateLimitOk) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }
    const body = await request.json();
    const { filename, contentType, fileSize, competition, fieldName } = body;

    // Validate required fields
    if (!filename || !contentType || !competition || !fieldName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate competition
    if (!ALLOWED_COMPETITIONS.includes(competition)) {
      return NextResponse.json(
        { error: "Invalid competition" },
        { status: 400 },
      );
    }

    // Validate file size
    if (fileSize && fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 },
      );
    }

    // Validate content type
    const allAllowedTypes = [
      ...ALLOWED_FILE_TYPES.document,
      ...ALLOWED_FILE_TYPES.image,
      ...ALLOWED_FILE_TYPES.presentation,
    ];

    if (!allAllowedTypes.includes(contentType)) {
      return NextResponse.json(
        { error: "File type not allowed" },
        { status: 400 },
      );
    }

    // Generate unique file key
    const key = generateFileKey(competition, fieldName, filename);

    // Create presigned URL for upload
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 300, // 5 minutes
    });

    uploadLogger.info(
      { key, competition, fieldName },
      "Presigned URL generated",
    );

    return NextResponse.json({
      uploadUrl: presignedUrl,
      key,
      expiresIn: 300,
    });
  } catch (error) {
    uploadLogger.error({ error }, "Upload URL generation failed");
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 },
    );
  }
}
