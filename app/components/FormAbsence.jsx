// app/components/FormAbsence.jsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { useAbsences } from "@/hooks/useAbsences";

export default function FormAbsence() {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        reason: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { createAbsence, error, clearError } = useAbsences();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (error) clearError();
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error("Le nom est requis");
            return false;
        }
        if (!formData.date) {
            toast.error("La date est requise");
            return false;
        }
        if (!formData.reason.trim()) {
            toast.error("La raison est requise");
            return false;
        }
        
        // Check if date is not in the future
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate > today) {
            toast.error("La date ne peut pas être dans le futur");
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            const result = await createAbsence(formData);
            
            if (result.success) {
                toast.success("✅ Absence enregistrée avec succès !");
                // Reset form
                setFormData({ name: "", date: "", reason: "" });
            } else {
                toast.error(`❌ ${result.error}`);
            }
        } catch (err) {
            toast.error("❌ Erreur lors de l'enregistrement");
            console.error("Form submission error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">
                📋 Ajouter une absence
            </h3>
            
            {/* Name Input */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nom de la personne"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                    required
                />
            </div>
            
            {/* Date Input */}
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                    required
                />
            </div>
            
            {/* Reason Input */}
            <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                    Raison *
                </label>
                <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Raison de l'absence"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    disabled={isSubmitting}
                    required
                />
            </div>
            
            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <FaSpinner className="animate-spin" />
                        Enregistrement...
                    </>
                ) : (
                    <>
                        <FaPlus />
                        Ajouter l'absence
                    </>
                )}
            </button>
            
            {/* Error Display */}
            {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    {error}
                </div>
            )}
        </form>
    );
}