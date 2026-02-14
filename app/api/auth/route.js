import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  loginSchema,
  registerSchema,
  generateToken,
  hashPassword,
  comparePassword,
} from "@/lib/auth";

// User registration
export async function POST(req) {
  try {
    const body = await req.json();

    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Donnees invalides",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = validationResult.data;

    const { data: existingUser, error: findError } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

    if (findError && findError.code !== "PGRST116") {
      throw findError;
    }

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Un utilisateur avec cet email existe deja" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const { data: user, error: createError } = await supabase
      .from("User")
      .insert({ name, email, password: hashedPassword })
      .select("id, name, email, createdAt")
      .single();

    if (createError) throw createError;

    const token = generateToken({ id: user.id, email: user.email });

    return NextResponse.json(
      { success: true, message: "Inscription reussie", user, token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne",
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Une erreur est survenue",
      },
      { status: 500 }
    );
  }
}

// User login
export async function PUT(req) {
  try {
    const body = await req.json();

    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Donnees invalides",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    const { data: user, error: findError } = await supabase
      .from("User")
      .select("*")
      .eq("email", email)
      .single();

    if (findError || !user) {
      return NextResponse.json(
        { success: false, error: "Email ou mot de passe invalide" },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Email ou mot de passe invalide" },
        { status: 401 }
      );
    }

    const token = generateToken({ id: user.id, email: user.email });

    return NextResponse.json({
      success: true,
      message: "Connexion reussie",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne",
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Une erreur est survenue",
      },
      { status: 500 }
    );
  }
}
