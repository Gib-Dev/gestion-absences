import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken, hashPassword } from "@/lib/auth";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caracteres").max(100),
  email: z.string().email("Format d'email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caracteres"),
});

const updateUserSchema = z.object({
  id: z.number().int().positive("ID invalide"),
  name: z.string().min(2).max(100).optional(),
  email: z.string().email("Format d'email invalide").optional(),
});

const deleteUserSchema = z.object({
  id: z.number().int().positive("ID invalide"),
});

function authenticateUser(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No valid authorization header");
  }

  const token = authHeader.substring(7);

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      throw new Error("Invalid token");
    }
    return decoded;
  } catch (error) {
    throw new Error("Token verification failed");
  }
}

function handleError(error, defaultMessage) {
  console.error(defaultMessage, error);

  if (
    error.message.includes("authorization") ||
    error.message.includes("token")
  ) {
    return NextResponse.json(
      { success: false, error: "Non autorise" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: defaultMessage,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Une erreur est survenue",
    },
    { status: 500 }
  );
}

export async function GET(req) {
  try {
    authenticateUser(req);

    const { data: users, error } = await supabase
      .from("User")
      .select("id, name, email, createdAt")
      .order("createdAt", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, users });
  } catch (error) {
    return handleError(error, "Erreur lors de la recuperation des utilisateurs");
  }
}

export async function POST(req) {
  try {
    authenticateUser(req);

    const body = await req.json();

    const validationResult = userSchema.safeParse(body);
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
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const { data: newUser, error: createError } = await supabase
      .from("User")
      .insert({ name, email, password: hashedPassword })
      .select("id, name, email, createdAt")
      .single();

    if (createError) throw createError;

    return NextResponse.json(
      { success: true, message: "Utilisateur cree", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "Erreur lors de la creation de l'utilisateur");
  }
}

export async function PUT(req) {
  try {
    authenticateUser(req);

    const body = await req.json();

    const validationResult = updateUserSchema.safeParse(body);
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

    const { id, name, email } = validationResult.data;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "Aucun champ a mettre a jour" },
        { status: 400 }
      );
    }

    const { data: updatedUser, error } = await supabase
      .from("User")
      .update(updateData)
      .eq("id", id)
      .select("id, name, email, createdAt")
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Utilisateur mis a jour",
      user: updatedUser,
    });
  } catch (error) {
    return handleError(error, "Erreur lors de la mise a jour de l'utilisateur");
  }
}

export async function DELETE(req) {
  try {
    authenticateUser(req);

    const body = await req.json();

    const validationResult = deleteUserSchema.safeParse(body);
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

    const { id } = validationResult.data;

    const { data: existing, error: findError } = await supabase
      .from("User")
      .select("id")
      .eq("id", id)
      .single();

    if (findError || !existing) {
      return NextResponse.json(
        { success: false, error: "Utilisateur non trouve" },
        { status: 404 }
      );
    }

    const { error } = await supabase.from("User").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Utilisateur supprime",
    });
  } catch (error) {
    return handleError(
      error,
      "Erreur lors de la suppression de l'utilisateur"
    );
  }
}
