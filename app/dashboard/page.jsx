// app/dashboard/page.jsx
"use client";

import UserList from "../components/UserList";
import FormAbsence from "../components/FormAbsence";
import TableAbsences from "../components/TableAbsences";
import { FaUsers, FaPlusCircle, FaClipboardList } from "react-icons/fa";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
            <header className="bg-black text-white p-4 mb-6">
                <h1 className="text-2xl font-bold">Gestion Absences</h1>
                <p className="text-sm">Bienvenue dans le tableau de bord</p>
            </header>

            <main className="space-y-6">
                {/* Liste des utilisateurs */}
                <section className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold text-[#0C120C] flex items-center gap-2 mb-2">
                        <FaUsers className="text-[#A23B72]" /> Liste des utilisateurs
                    </h2>
                    <UserList />
                </section>

                {/* Formulaire d'ajout d'absence */}
                <section className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold text-[#0C120C] flex items-center gap-2 mb-2">
                        <FaPlusCircle className="text-[#A23B72]" /> Ajouter une absence
                    </h2>
                    <FormAbsence />
                </section>

                {/* Tableau des absences */}
                <section className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold text-[#0C120C] flex items-center gap-2 mb-2">
                        <FaClipboardList className="text-[#A23B72]" /> Liste des absences
                    </h2>
                    <TableAbsences />
                </section>
            </main>
        </div>
    );
}