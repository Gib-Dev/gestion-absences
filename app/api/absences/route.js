// app/api/absences/route.js
"use server";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateUser } from "@/lib/auth";
import { asyncHandler, ValidationError, NotFoundError } from "@/lib/errors";
import { z } from "zod";

// Validation schemas
const absenceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  date: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime()) && parsed <= new Date();
  }, 'Date must be valid and not in the future'),
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason too long'),
});

const deleteSchema = z.object({
  id: z.number().int().positive('Invalid ID'),
});

// Get all absences (with pagination)
export const GET = asyncHandler(async (req) => {
  // Authenticate user
  const user = authenticateUser(req);
  
  // Parse query parameters
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';
  
  // Validate pagination
  if (page < 1 || limit < 1 || limit > 100) {
    throw new ValidationError('Invalid pagination parameters');
  }

  // Build where clause
  const where = search ? {
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      { reason: { contains: search, mode: 'insensitive' } },
    ],
  } : {};

  // Get absences with pagination
  const [absences, total] = await Promise.all([
    prisma.absence.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        date: true,
        reason: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.absence.count({ where }),
  ]);

  return NextResponse.json({
    absences,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// Create new absence
export const POST = asyncHandler(async (req) => {
  // Authenticate user
  const user = authenticateUser(req);
  
  const body = await req.json();
  
  // Validate input
  const validationResult = absenceSchema.safeParse(body);
  if (!validationResult.success) {
    throw new ValidationError('Invalid input data', validationResult.error.errors);
  }

  const { name, date, reason } = validationResult.data;

  // Create new absence
  const newAbsence = await prisma.absence.create({
    data: {
      name,
      date: new Date(date),
      reason,
      userId: user.id, // Associate with authenticated user
    },
    select: {
      id: true,
      name: true,
      date: true,
      reason: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({
    message: 'Absence created successfully',
    absence: newAbsence,
  }, { status: 201 });
});

// Delete absence
export const DELETE = asyncHandler(async (req) => {
  // Authenticate user
  const user = authenticateUser(req);
  
  const body = await req.json();
  
  // Validate input
  const validationResult = deleteSchema.safeParse(body);
  if (!validationResult.success) {
    throw new ValidationError('Invalid input data', validationResult.error.errors);
  }

  const { id } = validationResult.data;

  // Check if absence exists and user has permission
  const absence = await prisma.absence.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!absence) {
    throw new NotFoundError('Absence');
  }

  // Optional: Check if user owns the absence or is admin
  // if (absence.userId !== user.id && user.role !== 'ADMIN') {
  //   throw new AuthorizationError('You can only delete your own absences');
  // }

  // Delete absence
  await prisma.absence.delete({
    where: { id },
  });

  return NextResponse.json({
    message: 'Absence deleted successfully',
  });
});
