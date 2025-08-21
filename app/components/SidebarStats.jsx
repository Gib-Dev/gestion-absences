import React from 'react';
import { useStatistics } from '@/hooks/useStatistics';
import { BiCalendar, BiUser } from 'react-icons/bi';

export default function SidebarStats() {
  const { totalAbsences, averageAbsencesPerUser, loading } = useStatistics();

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Statistiques rapides
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <BiCalendar className="mr-2 text-magenta" />
            Total absences
          </div>
          <span className="font-bold text-gray-900">{totalAbsences}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <BiUser className="mr-2 text-magenta" />
            Moyenne/user
          </div>
          <span className="font-bold text-gray-900">{averageAbsencesPerUser}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <a 
          href="/statistics" 
          className="text-xs text-magenta hover:text-magenta/80 transition-colors duration-200"
        >
          Voir toutes les statistiques →
        </a>
      </div>
    </div>
  );
}
