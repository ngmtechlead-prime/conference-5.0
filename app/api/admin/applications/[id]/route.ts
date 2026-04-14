import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSignedDownloadUrl } from "@/lib/r2";
import { ApplicationStatus } from "@/lib/generated/prisma/client";
import { apiLogger } from "@/lib/logger";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const application = await db.application.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    // Generate signed URLs for files if they exist
    let filesWithUrls = null;
    if (application.files) {
      const files = application.files as Record<
        string,
        { key: string; filename: string; contentType: string }
      >;

      filesWithUrls = await Promise.all(
        Object.entries(files).map(async ([fieldName, file]) => {
          const signedUrl = await getSignedDownloadUrl(file.key);
          return {
            fieldName,
            filename: file.filename,
            contentType: file.contentType,
            url: signedUrl,
          };
        }),
      );
    }

    return NextResponse.json({
      ...application,
      filesWithUrls,
    });
  } catch (error) {
    apiLogger.error({ error }, "Admin application detail error");
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { adminNotes, status } = body;

    const updateData: { adminNotes?: string; status?: ApplicationStatus } = {};

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    if (status && Object.values(ApplicationStatus).includes(status)) {
      updateData.status = status as ApplicationStatus;
    }

    const application = await db.application.update({
      where: { id },
      data: updateData,
    });

    apiLogger.info({ applicationId: id }, "Application updated");
    return NextResponse.json(application);
  } catch (error) {
    apiLogger.error({ error }, "Admin application update error");
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}
