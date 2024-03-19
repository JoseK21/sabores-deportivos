import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const userFound = await prisma.userSystem.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // const hashedPassword = await bcrypt.hash(data.password, 10);
    const hashedPassword = data.password;

    const newUser = await prisma.userSystem.create({
      data: {
        name: data.name,
        role: data.role,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    console.log("🚀 >>  POST >>  error:", error);
    return NextResponse.json(
      {
        message: "error.message",
      },
      {
        status: 500,
      }
    );
  }
}
