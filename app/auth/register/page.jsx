// ✅ app/auth/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    role: "user",
                }),
            });

            if (!res.ok) throw new Error("Erreur lors de l'inscription");

            localStorage.setItem("user", JSON.stringify(form));
            localStorage.setItem("auth", "true");
            document.cookie = "auth=true; path=/";
            toast.success("✅ Inscription réussie ! Bienvenue 🎉");
            router.push("/dashboard");
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-300 bg-cover bg-center" style={{ backgroundImage: "url('/bg-login.jpg')" }}>
            <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Inscription</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nom"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                        <FaUser className="absolute left-3 top-2.5 text-gray-600" />
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                        <FaEnvelope className="absolute left-3 top-2.5 text-gray-600" />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                        <FaLock className="absolute left-3 top-2.5 text-gray-600" />
                    </div>
                    <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold">S'inscrire</button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-700">
                    Vous avez déjà un compte ? <a href="/auth/login" className="text-pink-700 hover:underline">Se connecter</a>
                </p>
            </div>
        </div>
    );
}
