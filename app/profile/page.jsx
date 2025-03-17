"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!auth || !userData) {
            router.push("/auth/login");
        } else {
            setUser(userData);
        }
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 text-center p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4">Profil</h1>
                {user ? (
                    <>
                        <p className="text-gray-700 mb-2"><strong>Nom :</strong> {user.name}</p>
                        <p className="text-gray-700 mb-2"><strong>Email :</strong> {user.email}</p>
                        <p className="text-gray-700 mb-2"><strong>Rôle :</strong> Admin ou Utilisateur</p>
                    </>
                ) : (
                    <p>Chargement...</p>
                )}
            </div>
        </main>
    );
}
