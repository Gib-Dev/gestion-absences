"use server";

import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const dataFilePath = path.join(process.cwd(), "data", "absences.json");

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

    const newAbsence = {
      name: body.name,
      date: body.date,
      reason: body.reason,
    };

    data.push(newAbsence);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json(newAbsence, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    let data = JSON.parse(fileContent);

    data.splice(id, 1);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Absence supprimée avec succès" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
