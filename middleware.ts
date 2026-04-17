import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { authLogger } from "@/lib/logger";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login page)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      cookieName: "__Secure-authjs.session-token",
    });

    if (!token || token.role !== "ADMIN") {
      authLogger.error(
        {
          pathname,
          hasToken: !!token,
          role: token?.role,
          token,
        },
        "Auth failed for admin route",
      );
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      cookieName: "__Secure-authjs.session-token",
    });

    if (!token || token.role !== "ADMIN") {
      authLogger.error(
        {
          pathname,
          hasToken: !!token,
          role: token?.role,
          token,
        },
        "Auth failed for admin API",
      );
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
