// import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const userFound = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userFound) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    // NO USAR PORQUE DA ERROR AL USARLO EN NEXT
    // const hashedPasswordV2 = await bcrypt.hash(data.password, 10);

    // console.log("🚀 >>  POST >>  hashedPasswordV2:", hashedPasswordV2);

    const hashedPassword = data.password;

    const newUser = await prisma.user.create({ data: { ...data, password: hashedPassword } });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    console.error("🚀 >>  POST >>  error:", error);
    return NextResponse.json({ message: "error.message" }, { status: 500 });
  }
}
