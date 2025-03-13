'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
            <p>Ici, tu pourras gérer les absences.</p>
        </div>
    );
}
