"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { UI_TEXTS } from "@/constants";
import PageLayout from "@/components/PageLayout";

export default function StatisticsPage() {
  return (
    <PageLayout requireAuth={true}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Statistiques</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">
            Cette page affichera les statistiques des absences. 
            Fonctionnalité en cours de développement.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
