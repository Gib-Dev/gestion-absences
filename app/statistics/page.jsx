"use client";

import React from 'react';
import { useStatistics } from '@/hooks/useStatistics';
import MonthlyAbsencesChart from '@/components/charts/MonthlyAbsencesChart';
import ReasonPieChart from '@/components/charts/ReasonPieChart';
import { BiBarChart, BiRefresh, BiUser, BiCalendar, BiTrendingUp } from 'react-icons/bi';
import { AiOutlineReload } from 'react-icons/ai';

export default function StatisticsPage() {
  const {
    absencesByMonth,
    absencesByReason,
    absencesByUser,
    totalAbsences,
    averageAbsencesPerUser,
    loading,
    error,
    refreshStatistics
  } = useStatistics();

  const StatCard = ({ title, value, icon: Icon, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-magenta">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Erreur lors du chargement des statistiques
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refreshStatistics}
            className="bg-magenta text-white px-6 py-3 rounded-lg hover:bg-magenta/80 transition-colors duration-200 flex items-center mx-auto"
          >
            <AiOutlineReload className="mr-2" />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <BiBarChart className="mr-3 text-magenta" />
              Statistiques des Absences
            </h1>
            <p className="text-gray-600 mt-2">
              Analysez et visualisez les données de votre &eacute;quipe
            </p>
          </div>
          <button
            onClick={refreshStatistics}
            disabled={loading}
            className="bg-magenta text-white px-4 py-2 rounded-lg hover:bg-magenta/80 transition-colors duration-200 flex items-center disabled:opacity-50"
          >
            <BiRefresh className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total des absences"
          value={totalAbsences}
          icon={BiCalendar}
          color="blue"
        />
        <StatCard
          title="Moyenne par utilisateur"
          value={averageAbsencesPerUser}
          icon={BiUser}
          color="green"
        />
        <StatCard
          title="Tendances"
          value={absencesByMonth.length > 1 ? 
            (absencesByMonth[absencesByMonth.length - 1]?.count > absencesByMonth[absencesByMonth.length - 2]?.count ? '↗️' : '↘️') : 
            '➡️'
          }
          icon={BiTrendingUp}
          color="purple"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <MonthlyAbsencesChart data={absencesByMonth} loading={loading} />
        <ReasonPieChart data={absencesByReason} loading={loading} />
      </div>

      {/* Top des utilisateurs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <BiUser className="mr-2 text-magenta" />
          Top des utilisateurs par absences
        </h3>
        
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-magenta"></div>
          </div>
        ) : absencesByUser.length > 0 ? (
          <div className="space-y-4">
            {absencesByUser.map((user, index) => (
              <div key={user.userName} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-magenta text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900">{user.userName}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-magenta mr-2">{user.count}</span>
                  <span className="text-gray-500 text-sm">absences</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>Aucune donn&eacute;e d&apos;utilisateur disponible</p>
          </div>
        )}
      </div>

      {/* Informations supplémentaires */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Conseils d&apos;utilisation
        </h4>
        <ul className="text-blue-800 space-y-2 text-sm">
          <li>• Les graphiques se mettent à jour automatiquement</li>
          <li>• Cliquez sur &quot;Actualiser&quot; pour forcer la mise à jour</li>
          <li>• Survolez les graphiques pour plus de d&eacute;tails</li>
          <li>• Les données sont basées sur les 6 derniers mois</li>
        </ul>
      </div>
    </div>
  );
}
