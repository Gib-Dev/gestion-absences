// app/components/UserList.jsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import apiService from "@/lib/api";
import FormUser from "./FormUser";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await apiService.get("/api/users");
            setUsers(data.users || []);
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    };

    const handleSave = async (userData) => {
        try {
            if (editingUser) {
                await apiService.put("/api/users", {
                    id: editingUser.id,
                    ...userData,
                });
            } else {
                await apiService.post("/api/users", userData);
            }

            fetchUsers();
            setEditingUser(null);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiService.delete("/api/users", { id });
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
