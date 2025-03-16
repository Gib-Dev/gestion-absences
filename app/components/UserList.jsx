// app/components/UserList.jsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import FormUser from "./FormUser";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            console.log("Réponse de l'API :", res); // <-- Ajoutez ce log

            if (!res.ok) {
                const errorText = await res.text(); // <-- Lisez le message d'erreur
                throw new Error(`Erreur ${res.status}: ${errorText}`);
            }

            const data = await res.json();
            console.log("Données reçues :", data); // <-- Ajoutez ce log

            if (!Array.isArray(data)) throw new Error("Données invalides");

            setUsers(data);
        } catch (err) {
            console.error(err);
            toast.error("❌ " + err.message);
        }
    };

    const handleSave = async (userData) => {
        try {
            const method = editingUser ? "PUT" : "POST";
            const url = editingUser ? `/api/users?id=${editingUser.id}` : "/api/users";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!res.ok) throw new Error("Erreur lors de la sauvegarde");

            fetchUsers();
            setEditingUser(null);
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/users?id=${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Erreur lors de la suppression");

            fetchUsers();
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">👥 Liste des utilisateurs</h3>
            <FormUser user={editingUser} onSave={handleSave} />
            <table className="w-full border mt-4">
                <thead>
                    <tr className="bg-blue-700 text-white">
                        <th className="p-2 text-left">Nom</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Rôle</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.role}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="text-blue-600 hover:text-blue-800 mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="p-2 text-center">
                                Aucun utilisateur trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}