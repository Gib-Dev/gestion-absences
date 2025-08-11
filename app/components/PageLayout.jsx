"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "./NavBar";
import Loading from "./Loading";

export default function PageLayout({ children, showNavbar = true, requireAuth = false }) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Si l'authentification est requise et que l'utilisateur n'est pas connecté
        if (requireAuth && !loading && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [requireAuth, loading, isAuthenticated, router]);

    // Afficher un loader pendant la vérification de l'authentification
    if (loading) {
        return <Loading />;
    }

    // Si l'authentification est requise et que l'utilisateur n'est pas connecté, ne rien afficher
    if (requireAuth && !isAuthenticated) {
        return null;
    }

    return (
        <>
            {showNavbar && <NavBar />}
            {children}
        </>
    );
}
