import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export { default } from "next-auth/middleware";

const allowedOrigins = [
  "http://localhost:3000",
  "https://quinisports.com",
  "https://www.quinisports.com",
];

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // const origin = req.headers.get("origin") ?? "";

  res.headers.append("Access-Control-Allow-Origin", "https://www.quinisports.com");

  // add the remaining CORS headers to the response
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  return res;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: "/api/:path*",
};
