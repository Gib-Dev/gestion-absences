// ✅ app/auth/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) router.push("/dashboard");
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 bg-cover bg-center" style={{ backgroundImage: "url('/bg-login.jpg')" }}>
            <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <FaUser className="absolute left-3 top-2.5 text-gray-600" />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <FaLock className="absolute left-3 top-2.5 text-gray-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-1" /> Se souvenir de moi
                        </label>
                        <a href="#" className="hover:underline text-indigo-700">Mot de passe oublié ?</a>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold">Login</button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-700">
                    Vous n'avez pas de compte ? <a href="/auth/register" className="text-indigo-700 hover:underline">S'inscrire</a>
                </p>
            </div>
        </div>
    );
}



