import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyTokenEdge } from "@/lib/auth-edge";

// Get current user information
export async function GET(req) {
  try {
    // Get authorization header
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        error: 'No valid authorization header'
      }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    // Verify token
    let decoded;
    try {
      decoded = verifyTokenEdge(token);
      if (!decoded) {
        return NextResponse.json({
          success: false,
          error: 'Invalid token'
        }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: 'Token verification failed'
      }, { status: 401 });
    }

    // Get user data from database
    const userData = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!userData) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: userData,
    });

  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

