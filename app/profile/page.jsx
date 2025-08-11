"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner, FaUser, FaEnvelope, FaCalendar, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { UI_TEXTS } from "@/constants";
import PageLayout from "@/components/PageLayout";

export default function Profile() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-ghostwhite flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">{UI_TEXTS.COMMON.LOADING}</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save the changes to the API
    console.log("Saving profile changes:", formData);
    setIsEditing(false);
    // You could add a toast notification here
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
    });
    setIsEditing(false);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-ghostwhite">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  👤 Profil Utilisateur
                </h1>
                <p className="text-gray-600">
                  Gérez vos informations personnelles et vos préférences
                </p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-magenta text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
                >
                  <FaEdit />
                  Modifier
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
                  >
                    <FaSave />
                    Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
                  >
                    <FaTimes />
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-ghostwhite pb-3">
                  Informations Personnelles
                </h2>
                
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                                         <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                       <FaUser className="mr-2 text-magenta" />
                       Nom complet
                     </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta focus:border-transparent"
                        placeholder="Votre nom complet"
                      />
                    ) : (
                      <p className="text-gray-900 bg-ghostwhite px-3 py-2 rounded-md">
                        {user?.name || "Non renseigné"}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                                         <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                       <FaEnvelope className="mr-2 text-magenta" />
                       Adresse email
                     </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-magenta focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    ) : (
                      <p className="text-gray-900 bg-ghostwhite px-3 py-2 rounded-md">
                        {user?.email || "Non renseigné"}
                      </p>
                    )}
                  </div>

                                     {/* Member Since */}
                   <div>
                     <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                       <FaCalendar className="mr-2 text-magenta" />
                       Membre depuis
                     </label>
                     <p className="text-gray-900 bg-ghostwhite px-3 py-2 rounded-md">
                       {user?.createdAt 
                         ? (() => {
                             try {
                               const date = new Date(user.createdAt);
                               if (isNaN(date.getTime())) return "Date inconnue";
                               return date.toLocaleDateString('fr-FR', {
                                 year: 'numeric',
                                 month: 'long',
                                 day: 'numeric'
                               });
                             } catch {
                               return "Date inconnue";
                             }
                           })()
                         : "Date inconnue"
                       }
                     </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Statut du Compte</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Statut</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Actif
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium text-gray-900">Utilisateur</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Dernière connexion</span>
                    <span className="text-sm text-gray-900">Aujourd'hui</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-ghostwhite rounded-md transition-colors">
                    Changer le mot de passe
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-ghostwhite rounded-md transition-colors">
                    Notifications
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-ghostwhite rounded-md transition-colors">
                    Préférences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
