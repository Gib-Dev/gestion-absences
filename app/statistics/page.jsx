"use client";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import correct pour éviter les erreurs

// Enregistrement des éléments graphiques pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Statistics() {
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState("month");

    useEffect(() => {
        // Simulation de données
        setData([
            { month: "Janvier", absences: 10 },
            { month: "Février", absences: 15 },
            { month: "Mars", absences: 8 }
        ]);
    }, []);

    const chartData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "Absences",
                data: data.map((item) => item.absences),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }
        ]
    };

    const pieData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "Répartition des Absences",
                data: data.map((item) => item.absences),
                backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"]
            }
        ]
    };

    // Fonction pour générer un PDF
    const generatePDF = () => {
        try {
            if (data.length === 0) {
                alert("Aucune donnée disponible pour générer un rapport !");
                return;
            }

            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("📄 Rapport des Absences", 20, 20);

            const tableColumn = ["Mois", "Nombre d'Absences"];
            const tableRows = [];

            data.forEach((item) => {
                tableRows.push([item.month, item.absences]);
            });

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 30
            });

            doc.save("rapport_absences.pdf");
        } catch (error) {
            console.error("Erreur lors de la génération du PDF :", error);
            alert("Une erreur s'est produite lors de la génération du rapport. Vérifie la console.");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
                📊 Statistiques des Absences
            </h1>

            {/* Sélecteur de période */}
            <div className="flex items-center space-x-4 mb-6">
                <label className="font-semibold text-lg">📅 Sélectionner une période :</label>
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="p-2 border rounded-md shadow-sm bg-white text-gray-700"
                >
                    <option value="month">Mensuel</option>
                    <option value="year">Annuel</option>
                    <option value="custom">Personnalisé</option>
                </select>
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105">
                    <h2 className="text-lg font-semibold mb-3">📊 Nombre d'absences par mois</h2>
                    <Bar data={chartData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105">
                    <h2 className="text-lg font-semibold mb-3">🥧 Répartition des Absences</h2>
                    <Pie data={pieData} />
                </div>
            </div>

            {/* Bouton de Génération de PDF */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={generatePDF}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition transform hover:scale-110 shadow-md"
                >
                    📄 Générer un Rapport PDF
                </button>
            </div>
        </div>
    );
}
