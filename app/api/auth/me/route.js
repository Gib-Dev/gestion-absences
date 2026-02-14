import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    // Read token from cookie (primary) or Authorization header (fallback)
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("auth_token")?.value;

    const authHeader = req.headers.get("authorization");
    const headerToken =
      authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    const token = cookieToken || headerToken;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Non autorise" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.json(
          { success: false, error: "Token invalide" },
          { status: 401 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Token invalide ou expire" },
        { status: 401 }
      );
    }

    const { data: userData, error } = await supabase
      .from("User")
      .select("id, name, email, createdAt")
      .eq("id", decoded.id)
      .single();

    if (error || !userData) {
      return NextResponse.json(
        { success: false, error: "Utilisateur non trouve" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);

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
