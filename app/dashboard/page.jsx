"use client";

import UserList from "../components/UserList";
import FormAbsence from "../components/FormAbsence";
import TableAbsences from "../components/TableAbsences";
import { FaUsers, FaPlusCircle, FaClipboardList } from "react-icons/fa";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-ghostwhite text-night p-6">
            {/* En-tête */}
            <header className="bg-magenta text-ghostwhite p-6 rounded-lg shadow-md mb-8">
                <h1 className="text-2xl font-bold">Tableau de bord</h1>
                <p className="text-sm">Bienvenue dans votre espace de gestion des absences</p>
            </header>

            {/* Contenu principal */}
            <main className="space-y-8">
                {/* Liste des utilisateurs */}
                <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                    <h2 className="text-xl font-semibold text-night flex items-center gap-3 mb-4">
                        <FaUsers className="text-magenta" /> Liste des utilisateurs
                    </h2>
                    <UserList />
                </section>

                {/* Formulaire d'ajout d'absence */}
                <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                    <h2 className="text-xl font-semibold text-night flex items-center gap-3 mb-4">
                        <FaPlusCircle className="text-magenta" /> Ajouter une absence
                    </h2>
                    <FormAbsence />
                </section>

                {/* Tableau des absences */}
                <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                    <h2 className="text-xl font-semibold text-night flex items-center gap-3 mb-4">
                        <FaClipboardList className="text-magenta" /> Liste des absences
                    </h2>
                    <TableAbsences />
                </section>
            </main>
        </div>
    );
}