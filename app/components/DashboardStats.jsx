import React from 'react';
import { useStatistics } from '@/hooks/useStatistics';
import { BiCalendar, BiUser, BiTrendingUp, BiRefresh } from 'react-icons/bi';

export default function DashboardStats() {
  const {
    totalAbsences,
    averageAbsencesPerUser,
    absencesByMonth,
    loading,
    refreshStatistics
  } = useStatistics();

  const getTrendIcon = () => {
    if (absencesByMonth.length < 2) return "➡️";
    const current = absencesByMonth[absencesByMonth.length - 1]?.count || 0;
    const previous = absencesByMonth[absencesByMonth.length - 2]?.count || 0;
    return current > previous ? "↗️" : current < previous ? "↘️" : "➡️";
  };

  const StatCard = ({ title, value, icon: Icon, color = "blue", subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-magenta hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 ml-4`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Vue d&apos;ensemble des absences
        </h2>
        <button
          onClick={refreshStatistics}
          disabled={loading}
          className="text-magenta hover:text-magenta/80 transition-colors duration-200 flex items-center text-sm"
        >
          <BiRefresh className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total des absences"
          value={loading ? "..." : totalAbsences}
          icon={BiCalendar}
          color="blue"
          subtitle="Toutes périodes confondues"
        />
        <StatCard
          title="Moyenne par utilisateur"
          value={loading ? "..." : averageAbsencesPerUser}
          icon={BiUser}
          color="green"
          subtitle="Répartition équitable"
        />
        <StatCard
          title="Tendance actuelle"
          value={loading ? "..." : getTrendIcon()}
          icon={BiTrendingUp}
          color="purple"
          subtitle="Comparaison mensuelle"
        />
      </div>
    </div>
  );
}
