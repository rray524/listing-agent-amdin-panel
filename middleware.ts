// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract pathname from the request URL
  const { pathname } = request.nextUrl;

  // List of paths that are allowed, feel free to customize this as needed
  const allowedPaths = [
    "/",
    "/admin",
    "/admin/agent-profile",
    "/login",
    "/signup",
    "/forget-password",
  ];
  const dynamicPathsPatterns = [
    /^\/NXYZ[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, // Matches paths starting with /NXYZ
    /^\/PXYZ[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, // Matches paths starting with /PXYZ
    /^\/reset-password\/[a-zA-Z0-9_-]+$/, // Matches /reset-password/abc-123,
    /^\/admin\/[0-9a-fA-F]{24}$/,
  ];

  const isAllowed =
    allowedPaths.includes(pathname) ||
    dynamicPathsPatterns.some((pattern) => pattern.test(pathname));

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue with the request if it's an allowed path
  return NextResponse.next();
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico).*)", // Match all paths except for API routes, static files, and Next.js internals
  ],
};
