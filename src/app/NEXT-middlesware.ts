import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://www.saboresdeportivos.com",
  "https://saboresdeportivos.com",
  "https://www.saboresdeportivos.vercel.app",
  "http://www.saboresdeportivos.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  console.log("🚀 ~ middleware ~ origin:", origin);
  const isAllowedOrigin = allowedOrigins.includes(origin);
  console.log("🚀 ~ middleware ~ isAllowedOrigin:", isAllowedOrigin);

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
