"use client";

import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-screen bg-ghostwhite flex items-center justify-center">
      <div className="text-center">
        <FaSpinner className="animate-spin text-4xl text-magenta mx-auto mb-4" />
        <p className="text-gray-600">Chargement...</p>
      </div>
    </div>
  );
}
