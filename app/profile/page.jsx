"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner, FaUser, FaEnvelope, FaCalendar, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { UI_TEXTS } from "@/constants";

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
      <div className="p-6">
        <div className="min-h-screen bg-ghostwhite flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">{UI_TEXTS.COMMON.LOADING}</p>
          </div>
        </div>
      </div>
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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Profil</h1>
      <ProfileContent />
    </div>
  );
}

function ProfileContent() {
  const { user } = useAuth();

  if (!user) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Nom</label>
          <p className="mt-1 text-lg text-gray-900">{user.name}</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-lg text-gray-900">{user.email}</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Membre depuis</label>
          <p className="mt-1 text-lg text-gray-900">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
