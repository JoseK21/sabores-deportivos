// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/master/:path*", "/admin/:path*"] };

// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith("/")) {
//     return NextResponse.rewrite(new URL("/auth/login", request.url));
//   }
// }
