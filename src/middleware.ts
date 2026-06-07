import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { ROUTES } from "@/lib/constants/routes";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from auth pages
  if (sessionCookie && [ROUTES.login, ROUTES.register].includes(pathname as typeof ROUTES.login)) {
    return NextResponse.redirect(new URL(ROUTES.dashboard.overview, request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!sessionCookie && pathname.startsWith(ROUTES.dashboard.overview)) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
