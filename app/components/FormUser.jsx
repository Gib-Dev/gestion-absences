// app/components/FormUser.jsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function FormUser({ user, onSave }) {
    const [name, setName] = useState(user ? user.name : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [role, setRole] = useState(user ? user.role : "user");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email) {
            toast.error("Tous les champs sont requis.");
            return;
        }

        const userData = { name, email, role };
        onSave(userData);
        toast.success(user ? "Utilisateur mis à jour ✅" : "Utilisateur ajouté ✅");
        setName("");
        setEmail("");
        setRole("user");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-4">
            <h3 className="font-semibold text-lg">👤 {user ? "Modifier" : "Ajouter"} un utilisateur</h3>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                {user ? "Mettre à jour" : "Ajouter"}
            </button>
        </form>
    );
}