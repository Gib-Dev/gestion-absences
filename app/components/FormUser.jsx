'use client';
import { useState } from 'react';

export default function FormUser({ onUserAdded }) {
    const [user, setUser] = useState({ name: '', email: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.name || !user.email) {
            setMessage("Tous les champs sont requis !");
            return;
        }

        onUserAdded(user);
        setMessage("Utilisateur ajouté ✅");
        setUser({ name: '', email: '' });
    };

    return (
        <div className="p-4 border rounded-md bg-white shadow-md max-w-md mx-auto mt-4">
            <h3 className="text-lg font-bold mb-4">Ajouter un utilisateur</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={user.name}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Ajouter
                </button>
            </form>
            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>
    );
}
