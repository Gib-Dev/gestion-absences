"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simuler une récupération depuis une API
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
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }
        ]
    };

    // Fonction pour générer un PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Rapport des Absences", 20, 20);
        data.forEach((item, index) => {
            doc.text(`${item.month}: ${item.absences} absences`, 20, 30 + index * 10);
        });
        doc.save("rapport_absences.pdf");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">📊 Statistiques des Absences</h1>
            <div className="w-full max-w-lg mx-auto mt-6">
                <Bar data={chartData} />
            </div>

            <button
                onClick={generatePDF}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                📄 Générer un Rapport PDF
            </button>
        </div>
    );
}
