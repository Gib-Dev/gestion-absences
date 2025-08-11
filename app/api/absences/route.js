// app/api/absences/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyTokenEdge } from "@/lib/auth-edge";
import { z } from "zod";
import { APP_CONFIG } from "@/constants";

// Validation schemas
const absenceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(APP_CONFIG.VALIDATION.NAME_MAX_LENGTH, 'Name too long'),
  date: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime()); // ✅ Permet toutes les dates valides (passées et futures)
  }, 'Date must be valid'),
  reason: z.string().min(1, 'Reason is required').max(APP_CONFIG.VALIDATION.REASON_MAX_LENGTH, 'Reason too long'),
});

const deleteSchema = z.object({
  id: z.number().int().positive('Invalid ID'),
});

// Helper function to authenticate user
function authenticateUser(req) {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization header');
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = verifyTokenEdge(token);
    if (!decoded) {
      throw new Error('Invalid token');
    }
    return decoded;
  } catch (error) {
    throw new Error('Token verification failed');
  }
}

// Get all absences (with pagination)
export async function GET(req) {
  try {
    // Authenticate user
    const user = authenticateUser(req);
    
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || APP_CONFIG.PAGINATION.DEFAULT_PAGE;
    const limit = parseInt(searchParams.get('limit')) || APP_CONFIG.PAGINATION.DEFAULT_LIMIT;
    const search = searchParams.get('search') || '';
    
    // Validate pagination
    if (page < 1 || limit < 1 || limit > APP_CONFIG.PAGINATION.MAX_LIMIT) {
      return NextResponse.json({
        success: false,
        error: 'Invalid pagination parameters'
      }, { status: 400 });
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
      success: true,
      absences,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error in GET /api/absences:', error);
    
    if (error.message.includes('authorization') || error.message.includes('token')) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// Create new absence
export async function POST(req) {
  try {
    // Authenticate user
    const user = authenticateUser(req);
    
    const body = await req.json();
    
    // Validate input
    const validationResult = absenceSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { name, date, reason } = validationResult.data;

    // Create new absence
    const newAbsence = await prisma.absence.create({
      data: {
        name,
        date: new Date(date),
        reason,
        userId: user.id, // Maintenant que la DB est mise à jour
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
      success: true,
      message: 'Absence created successfully',
      absence: newAbsence,
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/absences:', error);
    
    if (error.message.includes('authorization') || error.message.includes('token')) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// Delete absence
export async function DELETE(req) {
  try {
    // Authenticate user
    const user = authenticateUser(req);
    
    const body = await req.json();
    
    // Validate input
    const validationResult = deleteSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { id } = validationResult.data;

    // Check if absence exists and user has permission
    const absence = await prisma.absence.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!absence) {
      return NextResponse.json({
        success: false,
        error: 'Absence not found'
      }, { status: 404 });
    }

    // Optional: Check if user owns the absence or is admin
    // if (absence.userId !== user.id && user.role !== 'ADMIN') {
    //   return NextResponse.json({
    //     success: false,
    //     error: 'You can only delete your own absences'
    //   }, { status: 403 });
    // }

    // Delete absence
    await prisma.absence.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Absence deleted successfully',
    });
  } catch (error) {
    console.error('Error in DELETE /api/absences:', error);
    
    if (error.message.includes('authorization') || error.message.includes('token')) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}
