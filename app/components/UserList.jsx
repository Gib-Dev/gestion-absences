"use client";

import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError("Erreur lors du chargement des utilisateurs");
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#0C120C] mb-2 flex items-center gap-2">
                <FaUser /> Liste des utilisateurs
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="bg-white p-4 rounded-lg shadow-md">
                {users.map((user, index) => (
                    <li key={index} className="border-b py-2 text-sm text-gray-700">
                        {user.name} - {user.email} - {user.createdAt}
                    </li>
                ))}
            </ul>
        </div>
    );
}
