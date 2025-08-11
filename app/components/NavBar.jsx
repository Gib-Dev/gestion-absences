"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogin, AiOutlineLogout, AiOutlineUserAdd, AiOutlineDashboard } from "react-icons/ai";
import { BiBarChart } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

export default function NavBar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, logout, loading } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const isActive = (path) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    const NavLink = ({ href, children, icon: Icon, className = "" }) => (
        <Link 
            href={href} 
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${
                isActive(href) 
                    ? 'bg-magenta text-white shadow-lg transform scale-105' 
                    : 'text-night hover:text-magenta hover:bg-ghostwhite'
            } ${className}`}
        >
            {Icon && <Icon className="mr-2 text-lg" />}
            {children}
        </Link>
    );

    // Show loading spinner while authentication state is being determined
    if (loading) {
        return (
            <nav className="bg-white text-night p-4 flex justify-between items-center shadow-lg border-b-2 border-ghostwhite">
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
        <nav className="bg-white text-night shadow-lg border-b-2 border-ghostwhite sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* LOGO */}
                    <Link href="/" className="flex items-center group">
                        <div className="relative">
                            <Image 
                                src="/images/Logo.webp" 
                                alt="Gestion Absences" 
                                width={40} 
                                height={40} 
                                className="rounded-full shadow-md group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 rounded-full bg-magenta opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <span className="ml-3 text-xl font-bold text-magenta group-hover:text-night transition-colors duration-300">
                            Gestion Absences
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2">
                        <NavLink href="/" icon={AiOutlineHome}>
                            Accueil
                        </NavLink>

                        {/* Dashboard link for authenticated users */}
                        {isAuthenticated && (
                            <NavLink href="/dashboard" icon={AiOutlineDashboard}>
                                Tableau de bord
                            </NavLink>
                        )}

                        {/* Statistics link for authenticated users */}
                        {isAuthenticated && (
                            <NavLink href="/statistics" icon={BiBarChart}>
                                Statistiques
                            </NavLink>
                        )}

                        {!isAuthenticated ? (
                            <>
                                <NavLink href="/auth/login" icon={AiOutlineLogin}>
                                    Connexion
                                </NavLink>
                                <NavLink href="/auth/register" icon={AiOutlineUserAdd}>
                                    Inscription
                                </NavLink>
                            </>
                        ) : (
                            <>
                                {/* User info and profile */}
                                <div className="flex items-center space-x-3 ml-4 pl-4 border-l-2 border-ghostwhite">
                                    <div className="text-sm text-gray-600 bg-ghostwhite px-3 py-2 rounded-lg">
                                        <span className="font-medium">Bonjour, </span>
                                        <span className="text-magenta font-semibold">{user?.name || 'Utilisateur'}</span>
                                    </div>
                                    <NavLink href="/profile" icon={AiOutlineUser} className="text-sm">
                                        Profil
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center px-4 py-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200 ease-in-out"
                                    >
                                        <AiOutlineLogout className="mr-2" />
                                        <span className="hidden sm:inline">Déconnexion</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-night hover:text-magenta p-2 rounded-lg hover:bg-ghostwhite transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t-2 border-ghostwhite bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <NavLink href="/" icon={AiOutlineHome} className="block w-full">
                                Accueil
                            </NavLink>

                            {isAuthenticated && (
                                <NavLink href="/dashboard" icon={AiOutlineDashboard} className="block w-full">
                                    Tableau de bord
                                </NavLink>
                            )}

                            {isAuthenticated && (
                                <NavLink href="/statistics" icon={BiBarChart} className="block w-full">
                                    Statistiques
                                </NavLink>
                            )}

                            {!isAuthenticated ? (
                                <>
                                    <NavLink href="/auth/login" icon={AiOutlineLogin} className="block w-full">
                                        Connexion
                                    </NavLink>
                                    <NavLink href="/auth/register" icon={AiOutlineUserAdd} className="block w-full">
                                        Inscription
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <div className="px-4 py-3 bg-ghostwhite rounded-lg mb-2">
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">Bonjour, </span>
                                            <span className="text-magenta font-semibold">{user?.name || 'Utilisateur'}</span>
                                        </div>
                                    </div>
                                    <NavLink href="/profile" icon={AiOutlineUser} className="block w-full">
                                        Profil
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-4 py-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200 ease-in-out"
                                    >
                                        <AiOutlineLogout className="mr-2" />
                                        Déconnexion
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
