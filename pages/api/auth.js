import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req, res) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return new Response(
      JSON.stringify({ error: "Email ou mot de passe invalide" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
    JSON.stringify({
      user: { id: user.id, email: user.email, name: user.name },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
