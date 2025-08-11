"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaSave, FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import apiService from "@/lib/api";

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated, loading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", email: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/auth/login");
            return;
        }

        if (user) {
            setEditForm({
                name: user.name || "",
                email: user.email || ""
            });
        }
    }, [loading, isAuthenticated, router, user]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditForm({
            name: user?.name || "",
            email: user?.email || ""
        });
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        if (!editForm.name.trim() || !editForm.email.trim()) {
            toast.error("Tous les champs sont obligatoires");
            return;
        }

        try {
            setIsSubmitting(true);
            // Here you would typically call an API to update the user profile
            // For now, we'll just simulate the update
            toast.success("Profil mis à jour avec succès !");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Erreur lors de la mise à jour du profil");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-ghostwhite flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-magenta mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-ghostwhite p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-magenta to-purple-600 px-6 py-8 text-white">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <FaUser className="text-3xl" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Profil Utilisateur</h1>
                                    <p className="text-white text-opacity-90">Gérez vos informations personnelles</p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Personal Information */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                        <FaUser className="text-magenta" />
                                        Informations Personnelles
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nom complet
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editForm.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-magenta focus:border-transparent"
                                                    placeholder="Votre nom"
                                                />
                                            ) : (
                                                <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                                                    {user?.name || "Non renseigné"}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Adresse email
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={editForm.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-magenta focus:border-transparent"
                                                    placeholder="votre@email.com"
                                                />
                                            ) : (
                                                <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                                                    {user?.email || "Non renseigné"}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rôle
                                            </label>
                                            <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                                                {user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3 pt-4">
                                        {!isEditing ? (
                                            <button
                                                onClick={handleEdit}
                                                className="bg-magenta text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
                                            >
                                                <FaEdit />
                                                Modifier
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleSave}
                                                    disabled={isSubmitting}
                                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors duration-200 flex items-center gap-2"
                                                >
                                                    {isSubmitting ? (
                                                        <FaSpinner className="animate-spin" />
                                                    ) : (
                                                        <FaSave />
                                                    )}
                                                    {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
                                                >
                                                    <FaTimes />
                                                    Annuler
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Account Statistics */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                        <FaCalendar className="text-magenta" />
                                        Statistiques du Compte
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                            <div className="text-2xl font-bold text-blue-600">0</div>
                                            <div className="text-sm text-blue-700">Absences enregistrées</div>
                                        </div>
                                        
                                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                                            <div className="text-2xl font-bold text-green-600">0</div>
                                            <div className="text-sm text-green-700">Jours d'absence</div>
                                        </div>
                                        
                                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                                            <div className="text-2xl font-bold text-purple-600">0</div>
                                            <div className="text-sm text-purple-700">Mois actifs</div>
                                        </div>
                                        
                                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                                            <div className="text-2xl font-bold text-orange-600">0</div>
                                            <div className="text-sm text-orange-700">Rapports générés</div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="pt-4">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Actions Rapides</h3>
                                        <div className="space-y-2">
                                            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200">
                                                📊 Voir mes statistiques
                                            </button>
                                            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200">
                                                📄 Générer un rapport
                                            </button>
                                            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200">
                                                ⚙️ Paramètres du compte
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
