// app/components/FormAbsence.jsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

export default function FormAbsence({ onAdd }) {
    const [absence, setAbsence] = useState({ name: "", date: "", reason: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!absence.name || !absence.date || !absence.reason) {
            toast.error("Tous les champs sont requis.");
            return;
        }

        try {
            const res = await fetch("/api/absences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(absence),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Erreur lors de l'enregistrement");

            toast.success("✅ Absence enregistrée avec succès !");
            setAbsence({ name: "", date: "", reason: "" });
            onAdd && onAdd();
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-4">
            <h3 className="font-semibold text-lg">📋 Ajouter une absence</h3>
            <input
                type="text"
                name="name"
                value={absence.name}
                onChange={(e) => setAbsence({ ...absence, name: e.target.value })}
                placeholder="Nom"
                className="w-full border p-2 rounded"
            />
            <input
                type="date"
                name="date"
                value={absence.date}
                onChange={(e) => setAbsence({ ...absence, date: e.target.value })}
                className="w-full border p-2 rounded"
            />
            <input
                type="text"
                name="reason"
                value={absence.reason}
                onChange={(e) => setAbsence({ ...absence, reason: e.target.value })}
                placeholder="Raison"
                className="w-full border p-2 rounded"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                <FaPlus className="mr-2" />
            </button>
        </form>
    );
}