// ✅ middleware.js
import { NextResponse } from "next/server";
import { verifyTokenEdge, isValidToken } from "./app/lib/auth-edge";

export async function middleware(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || request.cookies.get("auth")?.value;

    // Routes protégées (redirection si non connecté)
    const protectedRoutes = ["/dashboard", "/profile", "/statistics"];
    const isProtectedRoute = protectedRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      try {
        // Verify JWT token using Edge-compatible function
        const decoded = verifyTokenEdge(token);
        if (!decoded) {
          return NextResponse.redirect(new URL("/auth/login", request.url));
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }

    // Empêcher accès à login/register si déjà connecté
    if (
      (request.nextUrl.pathname.startsWith("/auth/login") ||
        request.nextUrl.pathname.startsWith("/auth/register")) &&
      token
    ) {
      try {
        const decoded = verifyTokenEdge(token);
        if (decoded) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (error) {
        // Token invalid, allow access to auth pages
        console.error("Invalid token in auth pages:", error);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // In case of error, allow the request to proceed
    // The client-side authentication will handle the redirect
    return NextResponse.next();
  }
}

// Spécification des routes concernées
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*", 
    "/statistics/:path*",
    "/auth/login",
    "/auth/register"
  ],
};


