"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Vérifier l'état de connexion au chargement du composant
    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false); // Mettre à jour l'état de connexion
        router.push("/auth/login");
    };

    return (
        <nav className="bg-white text-night p-4 flex justify-between items-center shadow-sm">
            <h1 className="text-lg font-bold">Gestion Absences</h1>
            <div className="space-x-4">
                <Link href="/" className="hover:text-magenta">
                    Accueil
                </Link>

                {/* Afficher "Connexion" et "Inscription" uniquement si l'utilisateur n'est pas connecté */}
                {!isLoggedIn && (
                    <>
                        <Link href="/auth/login" className="hover:text-magenta">
                            Connexion
                        </Link>
                        <Link href="/auth/register" className="hover:text-magenta">
                            Inscription
                        </Link>
                    </>
                )}

                {/* Afficher "Profil" et "Déconnexion" uniquement si l'utilisateur est connecté */}
                {isLoggedIn && (
                    <>
                        <Link href="/profile" className="hover:text-magenta">
                            Profil
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-400 hover:text-red-600"
                        >
                            Déconnexion
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}