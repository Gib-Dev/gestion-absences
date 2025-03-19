"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogin, AiOutlineLogout, AiOutlineUserAdd } from "react-icons/ai";

export default function NavBar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Vérifier l'état de connexion au chargement du composant
    useEffect(() => {
        const auth = localStorage.getItem("auth");
        setIsLoggedIn(!!auth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false);
        router.push("/auth/login");
    };

    return (
        <nav className="bg-white text-night p-4 flex justify-between items-center shadow-md">
            {/* LOGO */}
            <Link href="/" className="flex items-center">
                <Image 
                    src="/images/Logo.webp" 
                    alt="Gestion Absences" 
                    width={40} 
                    height={40} 
                    className="rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                />
                <span className="ml-3 text-lg font-bold">Gestion Absences</span>
            </Link>

            {/* MENU */}
            <div className="space-x-6 flex items-center">
                <Link href="/" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                    <AiOutlineHome className="mr-1" /> Accueil
                </Link>

                <Link href="/statistics" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                    📊 Statistiques
                </Link>

                {!isLoggedIn && (
                    <>
                        <Link href="/auth/login" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                            <AiOutlineLogin className="mr-1" /> Connexion
                        </Link>
                        <Link href="/auth/register" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                            <AiOutlineUserAdd className="mr-1" /> Inscription
                        </Link>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <Link href="/profile" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                            <AiOutlineUser className="mr-1" /> Profil
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-400 hover:text-red-600 flex items-center transition-colors duration-200 ease-in-out"
                        >
                            <AiOutlineLogout className="mr-1" /> Déconnexion
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
