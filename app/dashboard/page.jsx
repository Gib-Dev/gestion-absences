'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserList from '../components/UserList'; // ← Ajout important

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/auth/login');
        }
    }, []);

    return (
        <div>
            <h2>Bienvenue dans le tableau de bord</h2>
            <p>Voici la liste des utilisateurs :</p>
            <UserList /> {/* ← intégration de la liste des utilisateurs */}
        </div>
    );
}
