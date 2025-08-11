import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateUser } from "@/lib/auth";
import { asyncHandler } from "@/lib/errors";

// Get current user information
export const GET = asyncHandler(async (req) => {
  // Authenticate user
  const user = authenticateUser(req);
  
  // Get user data from database
  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!userData) {
    throw new NotFoundError('User');
  }

  return NextResponse.json({
    user: userData,
  });
});

