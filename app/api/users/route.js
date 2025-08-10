// app/api/users/route.js
"use server";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
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
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà" },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password || "defaultPassword123", // You might want to hash this
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

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

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

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

    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'utilisateur" },
      { status: 500 }
    );
  }
}
