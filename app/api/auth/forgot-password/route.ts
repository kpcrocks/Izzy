import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success even if user doesn't exist to prevent email enumeration
      return NextResponse.json(
        { message: "If an account exists, you will receive a password reset email" },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExp = new Date(Date.now() + 3600000); // 1 hour from now

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExp,
      },
    });

    // Send password reset email
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: "If an account exists, you will receive a password reset email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 