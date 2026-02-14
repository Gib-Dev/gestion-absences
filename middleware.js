import { NextResponse } from "next/server";
import { verifyTokenEdge } from "@/lib/auth-edge";

const PROTECTED_API_ROUTES = [
  "/api/auth/me",
  "/api/absences",
  "/api/users",
];

function isProtectedRoute(pathname) {
  return PROTECTED_API_ROUTES.some((route) => pathname.startsWith(route));
}

export async function middleware(request) {
  try {
    if (!isProtectedRoute(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Non autorise" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = await verifyTokenEdge(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Token invalide ou expire" },
        { status: 401 }
      );
    }

    // Pass user info to the API route via headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", String(decoded.id));
    requestHeaders.set("x-user-email", decoded.email);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur d'authentification" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/auth/me",
    "/api/absences/:path*",
    "/api/users/:path*",
  ],
};
