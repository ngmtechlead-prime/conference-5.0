import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiLogger } from "@/lib/logger";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isRead } = body;

    if (typeof isRead !== "boolean") {
      return NextResponse.json(
        { error: "isRead must be a boolean" },
        { status: 400 },
      );
    }

    const message = await db.contactMessage.update({
      where: { id },
      data: { isRead },
    });

    return NextResponse.json({ message });
  } catch (error) {
    apiLogger.error({ error }, "Admin contact message update error");
    return NextResponse.json(
      { error: "Failed to update contact message" },
      { status: 500 },
    );
  }
}
