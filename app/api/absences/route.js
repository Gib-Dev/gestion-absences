import prisma from "../../../app/lib/prisma";

export async function GET() {
  try {
    const absences = await prisma.absence.findMany();
    return new Response(JSON.stringify(absences), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur GET absences" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const newAbs = await prisma.absence.create({ data });
    return new Response(JSON.stringify(newAbs), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur POST absence" }), {
      status: 500,
    });
  }
}
