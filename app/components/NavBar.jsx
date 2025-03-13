"use client";

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="p-4 border-b flex justify-between items-center">
            <h1 className="text-xl font-bold">Gestion Absences</h1>
            <ul className="flex gap-4">
                <li><Link href="/">Accueil</Link></li>
                <li><Link href="/auth/login">Connexion</Link></li>
                <li><Link href="/auth/register">Inscription</Link></li>
                <li><Link href="/profile">Profil</Link></li>
            </ul>
        </nav>
    );
}
