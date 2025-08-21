// app/api/users/route.js
"use server";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('User')
      .select('id, name, email, createdAt')
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json(users);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des utilisateurs" }, 
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Nom et email sont requis" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: findError } = await supabase
      .from('User')
      .select('*')
      .eq('email', body.email)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      throw findError;
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà" },
        { status: 409 }
      );
    }

    // Create new user
    const { data: newUser, error: createError } = await supabase
      .from('User')
      .insert({
        name: body.name,
        email: body.email,
        password: body.password || "defaultPassword123",
      })
      .select('id, name, email, createdAt')
      .single();

    if (createError) throw createError;

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, name, email } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "ID de l'utilisateur requis" },
        { status: 400 }
      );
    }

    const { data: updatedUser, error } = await supabase
      .from('User')
      .update({ name, email })
      .eq('id', id)
      .select('id, name, email, createdAt')
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      message: "Utilisateur mis à jour",
      user: updatedUser
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'utilisateur" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "ID de l'utilisateur requis" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('User')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'utilisateur" },
      { status: 500 }
    );
  }
}
