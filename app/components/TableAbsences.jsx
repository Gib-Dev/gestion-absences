"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Modal from "react-modal";
import { FaTrash, FaSearch, FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAbsences } from "@/hooks/useAbsences";
import { ERROR_MESSAGES, UI_TEXTS, APP_CONFIG } from "@/constants";
import { formatDate } from "@/utils/dateUtils";

import { memo } from "react";

const TableAbsences = memo(function TableAbsences() {
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

    // Memoize expensive computations
    const hasAbsences = useMemo(() => absences.length > 0, [absences.length]);
    const showPagination = useMemo(() => pagination.pages > 1, [pagination.pages]);

    // Initialize Modal
    useEffect(() => {
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body);
        }
    }, []);

    const openModal = useCallback((id) => {
        setSelectedId(id);
        setModalIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedId(null);
        setModalIsOpen(false);
    }, []);

    const handleDelete = useCallback(async () => {
        try {
            const result = await deleteAbsence(selectedId);
            if (result.success) {
                closeModal();
            }
        } catch (err) {
            console.error("Erreur lors de la suppression", err);
        }
    }, [selectedId, deleteAbsence, closeModal]);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        searchAbsences(searchTerm);
    }, [searchTerm, searchAbsences]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        if (error) clearError();
    }, [error, clearError]);

    // Remove the local formatDate function since we're using the utility

    if (loading && absences.length === 0) {
        return (
            <div className="flex items-center justify-center py-8">
                <FaSpinner className="animate-spin text-2xl text-blue-600" />
                <span className="ml-2 text-gray-600">{UI_TEXTS.ABSENCES.LOADING_ABSENCES}</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">
                {UI_TEXTS.ABSENCES.LIST_TITLE}
            </h3>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder={UI_TEXTS.ABSENCES.SEARCH_PLACEHOLDER}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    {UI_TEXTS.ABSENCES.SEARCH_BUTTON}
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
                        {hasAbsences ? (
                            absences.map((absence) => (
                                <tr key={absence.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-900">{absence.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{formatDate(absence.date)}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{absence.reason}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => openModal(absence.id)}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                            title={UI_TEXTS.ABSENCES.DELETE_TITLE}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                    {searchTerm ? UI_TEXTS.ABSENCES.NO_SEARCH_RESULTS : UI_TEXTS.ABSENCES.NO_ABSENCES}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {showPagination && (
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
                <h2 className="text-lg font-semibold mb-4 text-gray-900">{UI_TEXTS.ABSENCES.DELETE_CONFIRMATION}</h2>
                <p className="mb-6 text-gray-600">
                    {UI_TEXTS.ABSENCES.DELETE_WARNING}
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        {UI_TEXTS.ABSENCES.CANCEL_BUTTON}
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : null}
                        {UI_TEXTS.ABSENCES.DELETE_BUTTON}
                    </button>
                </div>
            </Modal>
        </div>
    );
});

export default TableAbsences;
