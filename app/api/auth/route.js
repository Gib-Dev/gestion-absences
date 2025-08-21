import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { loginSchema, registerSchema, generateToken, hashPassword, comparePassword } from "@/lib/auth";

// User registration
export async function POST(req) {
  try {
    console.log('🔐 Registration attempt started');
    const body = await req.json();
    console.log('📝 Registration data:', { name: body.name, email: body.email });
    
    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      console.log('❌ Validation failed:', validationResult.error.errors);
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const { data: existingUser, error: findError } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single();

    console.log('🔍 Find result:', { existingUser, findError });

    if (findError && findError.code !== 'PGRST116') {
      console.log('❌ Find error:', findError);
      throw findError;
    }

    if (existingUser) {
      console.log('❌ User already exists');
      return NextResponse.json({
        success: false,
        error: 'User with this email already exists'
      }, { status: 400 });
    }

    // Hash password and create user
    console.log('🔐 Hashing password...');
    const hashedPassword = await hashPassword(password);
    console.log('📝 Creating user in Supabase...');
    
    const { data: user, error: createError } = await supabase
      .from('User')
      .insert({
        name,
        email,
        password: hashedPassword,
      })
      .select('id, name, email, createdAt')
      .single();

    console.log('📝 Create result:', { user, createError });

    if (createError) {
      console.log('❌ Create error:', createError);
      throw createError;
    }

    // Generate JWT token
    console.log('🎫 Generating JWT token...');
    const token = generateToken({ id: user.id, email: user.email });

    console.log('✅ Registration successful');
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user,
      token,
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Registration error:', error);
    
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
    console.log('🔐 Login attempt started');
    const body = await req.json();
    console.log('📝 Login data:', { email: body.email });
    
    // Validate input
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      console.log('❌ Validation failed:', validationResult.error.errors);
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { email, password } = validationResult.data;

    // Find user
    console.log('🔍 Finding user...');
    const { data: user, error: findError } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single();

    console.log('🔍 Find result:', { user: user ? { id: user.id, email: user.email } : null, findError });

    if (findError || !user) {
      console.log('❌ User not found or find error');
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }

    // Verify password
    console.log('🔐 Verifying password...');
    const isPasswordValid = await comparePassword(password, user.password);
    console.log('🔐 Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Invalid password');
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }

    // Generate JWT token
    console.log('🎫 Generating JWT token...');
    const token = generateToken({ id: user.id, email: user.email });

    console.log('✅ Login successful');
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
    console.error('❌ Login error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

