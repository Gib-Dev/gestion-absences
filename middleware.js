// ✅ middleware.js
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    // Pour la navigation côté client, on laisse passer
    // L'authentification sera gérée côté client par le composant PageLayout
    // Le middleware ne bloque que les routes API qui nécessitent une authentification
    
    // Si c'est une route API protégée, on vérifie l'en-tête Authorization
    if (request.nextUrl.pathname.startsWith('/api/') && 
        (request.nextUrl.pathname.startsWith('/api/auth/me') || 
         request.nextUrl.pathname.startsWith('/api/absences'))) {
      
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
    
    // Pour toutes les autres routes, on laisse passer
    // L'authentification sera gérée côté client
    return NextResponse.next();
    
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

// Spécification des routes concernées
export const config = {
  matcher: [
    "/api/auth/me",
    "/api/absences/:path*"
  ],
};


