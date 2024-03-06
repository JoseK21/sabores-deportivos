import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = { matcher: ['/', '/master', '/admin'] }

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.rewrite(new URL("/auth/login", request.url));
  }
}
