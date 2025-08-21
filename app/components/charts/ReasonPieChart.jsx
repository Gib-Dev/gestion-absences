import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ReasonPieChart({ data, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-magenta"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Aucune donnée disponible pour ce graphique</p>
      </div>
    );
  }

  // Couleurs pour les différentes raisons
  const colors = [
    'rgba(59, 130, 246, 0.8)',   // Bleu
    'rgba(16, 185, 129, 0.8)',   // Vert
    'rgba(245, 158, 11, 0.8)',   // Orange
    'rgba(239, 68, 68, 0.8)',    // Rouge
    'rgba(139, 92, 246, 0.8)',   // Violet
    'rgba(236, 72, 153, 0.8)',   // Rose
    'rgba(34, 197, 94, 0.8)',    // Vert clair
    'rgba(251, 146, 60, 0.8)',   // Orange clair
  ];

  const chartData = {
    labels: data.map(item => item.reason),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#374151',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Répartition des absences par raison',
        color: '#374151',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-80">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
