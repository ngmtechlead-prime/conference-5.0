import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { apiLogger } from "@/lib/logger";
import { safeRegistrationSelect } from "./registration-select";

const listQuerySchema = z
  .object({
    search: z.string().trim().max(200).optional(),
    ticketType: z
      .enum(["UNDERGRADUATE", "GRADUATE_PROFESSIONAL"])
      .optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    export: z
      .enum(["true", "false"])
      .default("false")
      .transform((value) => value === "true"),
  })
  .strict();

export async function GET(request: Request) {
  const parsedQuery = listQuerySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams),
  );

  if (!parsedQuery.success) {
    return NextResponse.json(
      {
        error: "Invalid query parameters",
        details: parsedQuery.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const {
    search,
    ticketType,
    page,
    limit,
    export: isExport,
  } = parsedQuery.data;
  const skip = (page - 1) * limit;

  const where = {
    ...(ticketType ? { ticketType } : {}),
    ...(search
      ? {
          OR: [
            {
              publicReference: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              firstName: { contains: search, mode: "insensitive" as const },
            },
            {
              lastName: { contains: search, mode: "insensitive" as const },
            },
            { email: { contains: search, mode: "insensitive" as const } },
            {
              phoneNumber: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              institutionName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              professionalInformation: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),
  };

  try {
    const [registrations, total] = await Promise.all([
      db.conferenceRegistration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: safeRegistrationSelect,
        ...(isExport ? {} : { skip, take: limit }),
      }),
      db.conferenceRegistration.count({ where }),
    ]);

    return NextResponse.json(
      {
        registrations,
        pagination: {
          total,
          page: isExport ? 1 : page,
          limit: isExport ? total : limit,
          totalPages: isExport
            ? total > 0
              ? 1
              : 0
            : Math.ceil(total / limit),
        },
      },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    apiLogger.error({ error }, "Admin registrations list error");
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 },
    );
  }
}
