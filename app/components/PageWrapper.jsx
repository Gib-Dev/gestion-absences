"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function PageWrapper({ children }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  
  // Pages qui ne doivent pas avoir la sidebar
  const noSidebarRoutes = ['/', '/auth/login', '/auth/register'];
  const shouldShowSidebar = !noSidebarRoutes.includes(pathname);

  // Si connecté, TOUJOURS afficher la NavBar (même sur la page d'accueil)
  if (isAuthenticated) {
    if (shouldShowSidebar) {
      // Pages avec sidebar (dashboard, profile, statistics)
      return (
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <NavBar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      );
    } else {
      // Page d'accueil connectée (avec NavBar mais sans sidebar)
      return (
        <div className="flex-1 flex flex-col">
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      );
    }
  }

  // Si NON connecté, pas de NavBar sur les pages publiques
  if (shouldShowSidebar) {
    return (
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  // Pages publiques sans sidebar (accueil, login, register)
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
