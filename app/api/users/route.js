"use server";

import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const dataFilePath = path.join(process.cwd(), "data", "absences.json");

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(fileContent);

    const users = data.map((absence, index) => ({
      id: index + 1,
      name: absence.name || "Test",
      email: absence.email || "Email non disponible",
      createdAt: absence.date || "Date inconnue",
    }));

    return NextResponse.json(users);
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
      name: body.name,
      email: body.email || "email@unknown.com",
      createdAt: new Date().toISOString(),
    };

    data.push(newUser);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
