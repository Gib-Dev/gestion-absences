// app/components/FormAbsence.jsx
"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { useAbsences } from "@/hooks/useAbsences";
import { ERROR_MESSAGES, UI_TEXTS } from "@/constants";
import { isDateInFuture } from "@/utils/dateUtils";

import { memo } from "react";

const FormAbsence = memo(function FormAbsence() {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        reason: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { createAbsence, error, clearError } = useAbsences();

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (error) clearError();
    }, [error, clearError]);

    const validateForm = useCallback(() => {
        if (!formData.name.trim()) {
            toast.error(ERROR_MESSAGES.VALIDATION.NAME_REQUIRED);
            return false;
        }
        if (!formData.date) {
            toast.error(ERROR_MESSAGES.VALIDATION.DATE_REQUIRED);
            return false;
        }
        if (!formData.reason.trim()) {
            toast.error(ERROR_MESSAGES.VALIDATION.REASON_REQUIRED);
            return false;
        }
        
        // Check if date is not in the future
        if (isDateInFuture(formData.date)) {
            toast.error(ERROR_MESSAGES.VALIDATION.DATE_FUTURE);
            return false;
        }
        
        return true;
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            const result = await createAbsence(formData);
            
            if (result.success) {
                toast.success(ERROR_MESSAGES.SUCCESS.ABSENCE_CREATED);
                // Reset form
                setFormData({ name: "", date: "", reason: "" });
            } else {
                toast.error(`❌ ${result.error}`);
            }
        } catch (err) {
            toast.error(ERROR_MESSAGES.API.CREATE_FAILED);
            console.error("Form submission error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">
                {UI_TEXTS.ABSENCES.TITLE}
            </h3>
            
            {/* Name Input */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {UI_TEXTS.ABSENCES.NAME_LABEL}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={UI_TEXTS.ABSENCES.NAME_PLACEHOLDER}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                    required
                />
            </div>
            
            {/* Date Input */}
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    {UI_TEXTS.ABSENCES.DATE_LABEL}
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
                    {UI_TEXTS.ABSENCES.REASON_LABEL}
                </label>
                <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder={UI_TEXTS.ABSENCES.REASON_PLACEHOLDER}
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
                        {UI_TEXTS.ABSENCES.SAVING}
                    </>
                ) : (
                    <>
                        <FaPlus />
                        {UI_TEXTS.ABSENCES.ADD_BUTTON}
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
});

export default FormAbsence;