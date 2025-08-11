"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogin, AiOutlineLogout, AiOutlineUserAdd, AiOutlineDashboard } from "react-icons/ai";
import { BiBarChart } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";

export default function NavBar() {
    const router = useRouter();
    const { user, isAuthenticated, logout, loading } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Show loading spinner while authentication state is being determined
    if (loading) {
        return (
            <nav className="bg-white text-night p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="ml-3 w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </nav>
        );
    }

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
                <span className="ml-3 text-lg font-bold text-magenta">Gestion Absences</span>
            </Link>

            {/* MENU */}
            <div className="space-x-6 flex items-center">
                <Link href="/" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                    <AiOutlineHome className="mr-1" /> Accueil
                </Link>

                {/* Dashboard link for authenticated users */}
                {isAuthenticated && (
                    <Link href="/dashboard" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                        <AiOutlineDashboard className="mr-1" /> Tableau de bord
                    </Link>
                )}

                {/* Statistics link for authenticated users */}
                {isAuthenticated && (
                    <Link href="/statistics" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                        <BiBarChart className="mr-1" /> Statistiques
                    </Link>
                )}

                {!isAuthenticated ? (
                    <>
                        <Link href="/auth/login" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                            <AiOutlineLogin className="mr-1" /> Connexion
                        </Link>
                        <Link href="/auth/register" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                            <AiOutlineUserAdd className="mr-1" /> Inscription
                        </Link>
                    </>
                ) : (
                    <>
                        {/* User info and profile */}
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">Bonjour, </span>
                                <span className="text-magenta">{user?.name || 'Utilisateur'}</span>
                            </div>
                            <Link href="/profile" className="hover:text-magenta flex items-center transition-colors duration-200 ease-in-out">
                                <AiOutlineUser className="mr-1" /> Profil
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-red-400 hover:text-red-600 flex items-center transition-colors duration-200 ease-in-out"
                            >
                                <AiOutlineLogout className="mr-1" /> Déconnexion
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}
