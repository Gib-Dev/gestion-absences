// app/api/users/route.js
"use server";

import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

// Chemin absolu vers le fichier users.json
const dataFilePath = path.join(process.cwd(), "app", "data", "users.json");

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(fileContent);

    const newUser = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      role: body.role || "user",
    };

    data.push(newUser);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, name, email, role } = await req.json();
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(fileContent);

    const updatedData = data.map((user) =>
      user.id === id ? { ...user, name, email, role } : user
    );

    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ message: "Utilisateur mis à jour" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(fileContent);

    const filteredData = data.filter((user) => user.id !== id);
    await fs.writeFile(dataFilePath, JSON.stringify(filteredData, null, 2));

    return NextResponse.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
