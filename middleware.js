// ✅ middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const authCookie = request.cookies.get("auth");

  // Routes protégées (redirection si non connecté)
  if (request.nextUrl.pathname.startsWith("/dashboard") && !authCookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Empêcher accès à login/register si déjà connecté
  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    authCookie
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// ✅ Spécification des routes concernées
export const config = {
  matcher: ["/dashboard", "/auth/login", "/auth/register"],
};
