import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (filename && request.body) {
    // ⚠️ The below code is for App Router Route Handlers only
    const blob = await put(filename, request.body, {
      access: "public",
    });

    return NextResponse.json(blob);
  }
  return NextResponse.json({ message: "Error: No filename detected" });
}


export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const fileurl = searchParams.get("fileurl");
    console.log("🚀 >>  DELETE >>  searchParams:", searchParams)

    console.log("🚀 >>  DELETE >>  fileurl:", fileurl);

    if (fileurl) {
      await del(fileurl);

      return NextResponse.json({ message: "Blob file deleted" });
    }

    throw new Error("fileurl empty!");
  } catch (error) {
    return NextResponse.json({ isError: true, error });
  }
};
