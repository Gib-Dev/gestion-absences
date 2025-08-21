import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useStatistics = () => {
  const [statistics, setStatistics] = useState({
    absencesByMonth: [],
    absencesByReason: [],
    absencesByUser: [],
    totalAbsences: 0,
    averageAbsencesPerUser: 0,
    loading: true,
    error: null
  });

  const fetchStatistics = async () => {
    try {
      setStatistics(prev => ({ ...prev, loading: true, error: null }));

      // Récupérer toutes les absences
      const { data: absences, error: absencesError } = await supabase
        .from('Absence')
        .select('*')
        .order('date', { ascending: false });

      if (absencesError) throw absencesError;

      // Récupérer tous les utilisateurs
      const { data: users, error: usersError } = await supabase
        .from('User')
        .select('id, name, email');

      if (usersError) throw usersError;

      // Traitement des données
      const processedData = processAbsenceData(absences, users);
      setStatistics({
        ...processedData,
        loading: false
      });

    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      setStatistics(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  const processAbsenceData = (absences, users) => {
    if (!absences || absences.length === 0) {
      return {
        absencesByMonth: [],
        absencesByReason: [],
        absencesByUser: [],
        totalAbsences: 0,
        averageAbsencesPerUser: 0
      };
    }

    // Statistiques par mois (6 derniers mois)
    const months = getLast6Months();
    const absencesByMonth = months.map(month => {
      const count = absences.filter(absence => {
        const absenceDate = new Date(absence.date);
        return absenceDate.getMonth() === month.month && 
               absenceDate.getFullYear() === month.year;
      }).length;
      return { month: month.label, count };
    });

    // Statistiques par raison
    const reasonCounts = {};
    absences.forEach(absence => {
      reasonCounts[absence.reason] = (reasonCounts[absence.reason] || 0) + 1;
    });
    const absencesByReason = Object.entries(reasonCounts).map(([reason, count]) => ({
      reason,
      count
    }));

    // Statistiques par utilisateur
    const userCounts = {};
    absences.forEach(absence => {
      const user = users.find(u => u.id === absence.userId);
      if (user) {
        userCounts[user.name || user.email] = (userCounts[user.name || user.email] || 0) + 1;
      }
    });
    const absencesByUser = Object.entries(userCounts)
      .map(([userName, count]) => ({ userName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10

    return {
      absencesByMonth,
      absencesByReason,
      absencesByUser,
      totalAbsences: absences.length,
      averageAbsencesPerUser: users.length > 0 ? (absences.length / users.length).toFixed(1) : 0
    };
  };

  const getLast6Months = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push({
        month: date.getMonth(),
        year: date.getFullYear(),
        label: date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
      });
    }
    
    return months;
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return {
    ...statistics,
    refreshStatistics: fetchStatistics
  };
};
