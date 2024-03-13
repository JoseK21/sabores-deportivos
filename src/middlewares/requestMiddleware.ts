import { NextRequest, NextResponse } from "next/server";

// P2025: Record to delete does not exist.
// P2002: Unique constraint failed on the {constraint}

const ERROR_404_PRISMA_CODES = ["P2025"];

const error404Response = NextResponse.json(
  { error: "404 Not Found", isError: true, message: "Value Not Found" },
  { status: 404 }
);

const getInternalServerErrorResponse = (message: string | null, code: string | null) =>
  NextResponse.json(
    {
      isError: true,
      error: "Internal Server Error",
      code: code ?? "Unknown code",
      message: message ?? "Unknown error",
    },
    { status: 500 }
  );

type HandlerFunction = (args: { data: any; params: any }) => Promise<any>;

export const requestMiddleware =
  (handler: HandlerFunction) =>
  async (request: NextRequest, { params }: { params: any }, response: NextResponse) => {
    try {
      const data = request?.body ? await request?.json?.() : {};

      const result = await handler({ data, params });

      if (!result) return error404Response;

      return NextResponse.json({ data: result, isError: false, message: "ok" }, { status: 200 });
    } catch (error: any) {
      console.log(">>> requestMiddleware error:", error);
      if (ERROR_404_PRISMA_CODES.includes(error?.code)) return error404Response;

      return getInternalServerErrorResponse(error?.message, error?.code);
    }
  };
