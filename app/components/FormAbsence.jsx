'use client';
import { useState } from 'react';

export default function FormAbsence() {
    const [absence, setAbsence] = useState({
        name: '',
        date: '',
        reason: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setAbsence({ ...absence, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!absence.name || !absence.date || !absence.reason) {
            setMessage("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const res = await fetch('/api/absences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(absence),
            });

            const result = await res.json();

            if (res.ok) {
                setMessage('Absence enregistrée avec succès ✅');
                setAbsence({ name: '', date: '', reason: '' });
            } else {
                setMessage(result.error || 'Erreur lors de l’enregistrement ❌');
            }
        } catch (err) {
            setMessage('Erreur serveur ❌');
            console.error(err);
        }
    };

    return (
        <div className="p-4 border rounded-md max-w-md mx-auto my-6 shadow-md">
            <h3 className="text-lg font-bold mb-4">Ajouter une absence</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={absence.name}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    name="date"
                    value={absence.date}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="reason"
                    placeholder="Raison"
                    value={absence.reason}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Enregistrer
                </button>
            </form>
            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>
    );
}
