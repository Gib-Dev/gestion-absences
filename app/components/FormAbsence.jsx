"use client";

import { useState } from "react";

export default function FormAbsence({ onAdd }) {
    const [absence, setAbsence] = useState({ name: "", date: "", reason: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setAbsence({ ...absence, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!absence.name || !absence.date || !absence.reason) {
            setMessage("Tous les champs sont requis.");
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

            setMessage("✅ Absence enregistrée avec succès !");
            setAbsence({ name: "", date: "", reason: "" });
            onAdd && onAdd();
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-4">
            <h3 className="font-semibold text-lg">📋 Ajouter une absence</h3>
            <input
                type="text"
                name="name"
                value={absence.name}
                onChange={handleChange}
                placeholder="Nom"
                className="w-full border p-2 rounded"
            />
            <input
                type="date"
                name="date"
                value={absence.date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            <input
                type="text"
                name="reason"
                value={absence.reason}
                onChange={handleChange}
                placeholder="Raison"
                className="w-full border p-2 rounded"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Enregistrer
            </button>
            {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        </form>
    );
}
