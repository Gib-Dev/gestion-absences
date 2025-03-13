'use client';
import { useEffect, useState } from 'react';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || 'Erreur inconnue');
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email} - {user.createdAt}
                    </li>
                ))}
            </ul>
        </div>
    );
}
