import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { loginSchema, registerSchema, generateToken, hashPassword, comparePassword } from "@/lib/auth";
import { asyncHandler, ValidationError, AuthenticationError, NotFoundError } from "@/lib/errors";

// User registration
export const POST = asyncHandler(async (req) => {
  const body = await req.json();
  
  // Validate input
  const validationResult = registerSchema.safeParse(body);
  if (!validationResult.success) {
    throw new ValidationError('Invalid input data', validationResult.error.errors);
  }

  const { name, email, password } = validationResult.data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ValidationError('User with this email already exists');
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
    message: 'User registered successfully',
    user,
    token,
  }, { status: 201 });
});

// User login
export const PUT = asyncHandler(async (req) => {
  const body = await req.json();
  
  // Validate input
  const validationResult = loginSchema.safeParse(body);
  if (!validationResult.success) {
    throw new ValidationError('Invalid input data', validationResult.error.errors);
  }

  const { email, password } = validationResult.data;

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Generate JWT token
  const token = generateToken({ id: user.id, email: user.email });

  return NextResponse.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
});
