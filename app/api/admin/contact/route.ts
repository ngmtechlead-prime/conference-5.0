import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiLogger } from "@/lib/logger";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const isReadParam = searchParams.get("isRead");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: {
      isRead?: boolean;
      OR?: Array<{ fullName?: { contains: string; mode: "insensitive" }; email?: { contains: string; mode: "insensitive" }; subject?: { contains: string; mode: "insensitive" } }>;
    } = {};

    if (isReadParam === "true") where.isRead = true;
    if (isReadParam === "false") where.isRead = false;

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
      ];
    }

    const [messages, total, unreadCount] = await Promise.all([
      db.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.contactMessage.count({ where }),
      db.contactMessage.count({ where: { isRead: false } }),
    ]);

    return NextResponse.json({
      messages,
      unreadCount,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    apiLogger.error({ error }, "Admin contact messages list error");
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 },
    );
  }
}
