import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { loginSchema, registerSchema, generateToken, hashPassword, comparePassword } from "@/lib/auth";

// User registration
export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'User with this email already exists'
      }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email });

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user,
      token,
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: 'User with this email already exists'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// User login
export async function PUT(req) {
  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { email, password } = validationResult.data;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error('Login error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

