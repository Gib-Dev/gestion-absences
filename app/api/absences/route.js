// app/api/absences/route.js
"use server";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const absences = await prisma.absence.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(absences);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des absences" }, 
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.date || !body.reason) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Create new absence
    const newAbsence = await prisma.absence.create({
      data: {
        name: body.name,
        date: new Date(body.date),
        reason: body.reason,
      },
    });

    return NextResponse.json(newAbsence, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'absence" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "ID de l'absence requis" },
        { status: 400 }
      );
    }

    await prisma.absence.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: "Absence supprimée avec succès" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'absence" },
      { status: 500 }
    );
  }
}
