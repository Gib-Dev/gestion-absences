"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/auth/login");
    };

    return (
        <nav className="bg-white text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Gestion Absences</h1>
            <div className="space-x-4">
                <Link href="/">Accueil</Link>
                <Link href="/auth/login">Connexion</Link>
                <Link href="/auth/register">Inscription</Link>
                <Link href="/profile">Profil</Link>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-600">
                    Déconnexion
                </button>
            </div>
        </nav>
    );
}
