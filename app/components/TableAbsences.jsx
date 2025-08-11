"use client";

import { useState } from "react";
import Modal from "react-modal";
import { FaTrash, FaSearch, FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAbsences } from "@/hooks/useAbsences";

export default function TableAbsences() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    
    const {
        absences,
        loading,
        error,
        pagination,
        deleteAbsence,
        searchAbsences,
        changePage,
        clearError
    } = useAbsences();

    // Initialize Modal
    useState(() => {
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body);
        }
    });

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
            const result = await deleteAbsence(selectedId);
            if (result.success) {
                closeModal();
            }
        } catch (err) {
            console.error("Erreur lors de la suppression", err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        searchAbsences(searchTerm);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (error) clearError();
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    if (loading && absences.length === 0) {
        return (
            <div className="flex items-center justify-center py-8">
                <FaSpinner className="animate-spin text-2xl text-blue-600" />
                <span className="ml-2 text-gray-600">Chargement des absences...</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">
                📌 Liste des absences
            </h3>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Rechercher par nom ou raison..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Rechercher
                </button>
            </form>

            {/* Error Display */}
            {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    {error}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nom</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Raison</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {absences.length > 0 ? (
                            absences.map((absence) => (
                                <tr key={absence.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-900">{absence.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{formatDate(absence.date)}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{absence.reason}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => openModal(absence.id)}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                            title="Supprimer"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                    {searchTerm ? 'Aucune absence trouvée pour cette recherche.' : 'Aucune absence enregistrée.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Page {pagination.page} sur {pagination.pages} ({pagination.total} absences)
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => changePage(pagination.page - 1)}
                            disabled={pagination.page <= 1}
                            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={() => changePage(pagination.page + 1)}
                            disabled={pagination.page >= pagination.pages}
                            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="bg-white p-6 rounded-lg shadow-xl w-96 mx-auto mt-32"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Confirmation de suppression</h2>
                <p className="mb-6 text-gray-600">
                    Êtes-vous sûr de vouloir supprimer cette absence ? Cette action est irréversible.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : null}
                        Supprimer
                    </button>
                </div>
            </Modal>
        </div>
    );
}
