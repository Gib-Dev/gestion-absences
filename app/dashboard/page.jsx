"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import FormAbsence from "@/components/FormAbsence";
import TableAbsences from "@/components/TableAbsences";
import { FaSpinner } from "react-icons/fa";

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ghostwhite flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
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
      <div className="min-h-screen bg-ghostwhite">
        <div className="container mx-auto p-6">
          {/* Welcome Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Bienvenue, {user?.name} ! 👋
            </h1>
            <p className="text-gray-600">
              Gérez vos absences et suivez votre équipe depuis votre tableau de bord.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <FormAbsence />
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <TableAbsences />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}