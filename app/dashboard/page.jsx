'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserList from '@/components/UserList';
import FormAbsence from '@/components/FormAbsence';
import TableAbsences from '@/components/TableAbsences';

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/auth/login');
        }
    }, []);

    return (
        <main className="p-8 space-y-10">
            <section>
                <h2 className="text-2xl font-bold mb-2">Bienvenue dans le tableau de bord</h2>
                <p className="text-sm text-gray-400">Vous êtes connecté. Voici les informations disponibles :</p>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-4">Liste des utilisateurs</h3>
                <UserList />
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-4">Ajouter une absence</h3>
                <FormAbsence />
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-4">Liste des absences</h3>
                <TableAbsences />
            </section>
        </main>
    );
}
