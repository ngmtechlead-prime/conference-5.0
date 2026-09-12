import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { apiLogger } from "@/lib/logger";
import { safeRegistrationSelect } from "../registration-select";

const registrationIdSchema = z.string().trim().min(1).max(191);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const parsedId = registrationIdSchema.safeParse((await params).id);

  if (!parsedId.success) {
    return NextResponse.json(
      { error: "Invalid registration ID" },
      { status: 400 },
    );
  }

  try {
    const registration = await db.conferenceRegistration.findUnique({
      where: { id: parsedId.data },
      select: safeRegistrationSelect,
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(registration, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    apiLogger.error(
      { error, registrationId: parsedId.data },
      "Admin registration detail error",
    );
    return NextResponse.json(
      { error: "Failed to fetch registration" },
      { status: 500 },
    );
  }
}
