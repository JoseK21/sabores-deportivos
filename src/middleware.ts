import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export { default } from "next-auth/middleware";

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
// }

// export const config = { matcher: ["/qs-admin", "/qs-admin/:path*"] };

export const config = { matcher: [] };

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   console.log("🚀 >>  middleware >>  pathname:", pathname);

//   if (pathname.includes("qs-admin")) {
//     return NextResponse.rewrite(new URL("/qs-admin/login", request.url));
//   }

//   if (pathname.startsWith("/")) {
//     return NextResponse.rewrite(new URL("/auth/login", request.url));
//   }
// }
