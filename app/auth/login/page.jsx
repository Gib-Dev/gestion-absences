// ✅ app/auth/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth === "true") router.push("/dashboard");
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email === form.email && user.password === form.password) {
            localStorage.setItem("auth", "true");
            document.cookie = "auth=true; path=/";
            router.push("/dashboard");
        } else {
            setError("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Connexion</h2>
                {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                        Se connecter
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-700">
                    Vous n'avez pas de compte ? <a href="/auth/register" className="text-blue-600 font-medium hover:underline">Inscription</a>
                </p>
            </div>
        </div>
    );
}
