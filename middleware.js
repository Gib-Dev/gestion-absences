import { NextResponse } from "next/server";
import { verifyTokenEdge } from "@/lib/auth-edge";

const PROTECTED_API_ROUTES = ["/api/auth/me", "/api/absences", "/api/users"];

const CSRF_METHODS = ["POST", "PUT", "DELETE", "PATCH"];

function isProtectedRoute(pathname) {
  return PROTECTED_API_ROUTES.some((route) => pathname.startsWith(route));
}

export async function middleware(request) {
  try {
    // CSRF check: state-changing requests to API must come from browser fetch
    // SameSite=Lax blocks cross-origin form POSTs, this adds defense-in-depth
    if (
      request.nextUrl.pathname.startsWith("/api/") &&
      CSRF_METHODS.includes(request.method)
    ) {
      const contentType = request.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return NextResponse.json(
          { success: false, error: "Content-Type invalide" },
          { status: 403 }
        );
      }
    }

    if (!isProtectedRoute(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // Read token from HttpOnly cookie (primary) or Authorization header (fallback)
    const cookieToken = request.cookies.get("auth_token")?.value;
    const authHeader = request.headers.get("authorization");
    const headerToken =
      authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    const token = cookieToken || headerToken;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Non autorise" },
        { status: 401 }
      );
    }

    const decoded = await verifyTokenEdge(token);

    if (!decoded) {
      // Clear invalid cookie
      const response = NextResponse.json(
        { success: false, error: "Token invalide ou expire" },
        { status: 401 }
      );
      response.cookies.delete("auth_token");
      return response;
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
    "/api/auth/logout",
    "/api/absences/:path*",
    "/api/users/:path*",
  ],
};
