"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTrash } from "react-icons/fa";

export default function TableAbsences() {
    const [absences, setAbsences] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body);
        }
        fetchAbsences();
    }, []);

    const fetchAbsences = async () => {
        try {
            const res = await fetch("/api/absences");
            const data = await res.json();
            setAbsences(data);
        } catch (err) {
            console.error("Erreur lors du chargement des absences", err);
        }
    };

    const openModal = (id) => {
        setSelectedId(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedId(null);
        setModalIsOpen(false);
    };

    const handleDelete = async () => {
        try {
            await fetch("/api/absences", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedId }),
            });
            closeModal();
            fetchAbsences();
        } catch (err) {
            console.error("Erreur lors de la suppression", err);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">📌 Liste des absences</h3>
            <table className="w-full border">
                <thead>
                    <tr className="bg-blue-700 text-white">
                        <th className="p-2 text-left">Nom</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Raison</th>
                        <th className="p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {absences.map((absence, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-2">{absence.name}</td>
                            <td className="p-2">{absence.date}</td>
                            <td className="p-2">{absence.reason}</td>
                            <td className="p-2">
                                <button onClick={() => openModal(index)} className="text-red-600 hover:text-red-800">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="bg-white p-6 rounded shadow-lg w-1/3 mx-auto mt-32">
                <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
                <p className="mb-4">Voulez-vous vraiment supprimer cette absence ?</p>
                <div className="flex justify-end space-x-2">
                    <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Annuler</button>
                    <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Supprimer</button>
                </div>
            </Modal>
        </div>
    );
}
