// app/components/UserList.jsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { APP_CONFIG } from "@/constants";
import FormUser from "./FormUser";

function getToken() {
    return localStorage.getItem(APP_CONFIG.AUTH.TOKEN_KEY);
}

function authHeaders() {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users", {
                headers: authHeaders(),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || `Erreur ${res.status}`);
            }

            const data = await res.json();
            setUsers(data.users || []);
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    };

    const handleSave = async (userData) => {
        try {
            const method = editingUser ? "PUT" : "POST";
            const body = editingUser
                ? { id: editingUser.id, ...userData }
                : userData;

            const res = await fetch("/api/users", {
                method,
                headers: authHeaders(),
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Erreur lors de la sauvegarde");
            }

            fetchUsers();
            setEditingUser(null);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch("/api/users", {
                method: "DELETE",
                headers: authHeaders(),
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Erreur lors de la suppression");
            }

            toast.success("Utilisateur supprime");
            fetchUsers();
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">Liste des utilisateurs</h3>
            <FormUser user={editingUser} onSave={handleSave} />
            <table className="w-full border mt-4">
                <thead>
                    <tr className="bg-blue-700 text-white">
                        <th className="p-2 text-left">Nom</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
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
                            <td colSpan="3" className="p-2 text-center">
                                Aucun utilisateur trouve.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
