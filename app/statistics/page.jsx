"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import apiService from "@/lib/api";
import NavBar from "@/components/NavBar";
import { FaSpinner, FaChartBar, FaFilePdf, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

// Enregistrement des éléments graphiques pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Statistics() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState("month");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/auth/login");
            return;
        }

        if (isAuthenticated) {
            fetchStatistics();
        }
    }, [loading, isAuthenticated, router, period]);

    const fetchStatistics = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Fetch real data from API
            const response = await apiService.get('/api/absences');
            const absences = response.absences || [];
            
            // Process data based on period
            const processedData = processDataByPeriod(absences, period);
            setData(processedData);
        } catch (error) {
            console.error("Error fetching statistics:", error);
            setError("Erreur lors du chargement des statistiques");
            toast.error("Impossible de charger les statistiques");
        } finally {
            setIsLoading(false);
        }
    };

    const processDataByPeriod = (absences, period) => {
        if (period === "month") {
            const monthlyData = {};
            absences.forEach(absence => {
                const date = new Date(absence.date);
                const month = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                monthlyData[month] = (monthlyData[month] || 0) + 1;
            });
            
            return Object.entries(monthlyData).map(([month, count]) => ({
                month,
                absences: count
            }));
        } else if (period === "year") {
            const yearlyData = {};
            absences.forEach(absence => {
                const date = new Date(absence.date);
                const year = date.getFullYear();
                yearlyData[year] = (yearlyData[year] || 0) + 1;
            });
            
            return Object.entries(yearlyData).map(([year, count]) => ({
                month: year.toString(),
                absences: count
            }));
        }
        
        // Default to monthly
        return [];
    };

    const chartData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "Absences",
                data: data.map((item) => item.absences),
                backgroundColor: "rgba(156, 39, 176, 0.6)",
                borderColor: "rgba(156, 39, 176, 1)",
                borderWidth: 2,
                borderRadius: 4
            }
        ]
    };

    const pieData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "Répartition des Absences",
                data: data.map((item) => item.absences),
                backgroundColor: [
                    "#9C27B0", "#E91E63", "#2196F3", "#4CAF50", 
                    "#FF9800", "#795548", "#607D8B", "#FF5722"
                ],
                borderWidth: 2
            }
        ]
    };

    const generatePDF = () => {
        try {
            if (data.length === 0) {
                toast.warning("Aucune donnée disponible pour générer un rapport !");
                return;
            }

            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("📄 Rapport des Absences", 20, 20);
            
            // Add user info
            doc.setFontSize(12);
            doc.text(`Généré par: ${user?.name || 'Utilisateur'}`, 20, 30);
            doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 40);

            const tableColumn = ["Période", "Nombre d'Absences"];
            const tableRows = [];

            data.forEach((item) => {
                tableRows.push([item.month, item.absences.toString()]);
            });

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 50,
                styles: {
                    head: { fillColor: [156, 39, 176] }
                }
            });

            doc.save(`rapport_absences_${new Date().toISOString().split('T')[0]}.pdf`);
            toast.success("Rapport PDF généré avec succès !");
        } catch (error) {
            console.error("Erreur lors de la génération du PDF :", error);
            toast.error("Une erreur s'est produite lors de la génération du rapport");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-ghostwhite flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-magenta mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Chargement...</p>
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
            <div className="min-h-screen bg-ghostwhite p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold flex items-center gap-2 mb-6 text-night">
                        <FaChartBar className="text-magenta" />
                        Statistiques des Absences
                    </h1>

                    {/* Sélecteur de période */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="flex items-center space-x-4">
                            <label className="font-semibold text-lg text-gray-700 flex items-center gap-2">
                                <FaCalendarAlt className="text-magenta" />
                                Sélectionner une période :
                            </label>
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-magenta focus:border-transparent"
                            >
                                <option value="month">Mensuel</option>
                                <option value="year">Annuel</option>
                            </select>
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                            {error}
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <FaSpinner className="animate-spin text-3xl text-magenta mr-3" />
                            <span className="text-lg text-gray-600">Chargement des statistiques...</span>
                        </div>
                    ) : (
                        <>
                            {/* Graphiques */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                                    <h2 className="text-lg font-semibold mb-3 text-gray-800">📊 Nombre d'absences par période</h2>
                                    {data.length > 0 ? (
                                        <Bar 
                                            data={chartData}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: { display: false },
                                                    tooltip: { backgroundColor: 'rgba(156, 39, 176, 0.9)' }
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            Aucune donnée disponible
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                                    <h2 className="text-lg font-semibold mb-3 text-gray-800">🥧 Répartition des Absences</h2>
                                    {data.length > 0 ? (
                                        <Pie 
                                            data={pieData}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    tooltip: { backgroundColor: 'rgba(156, 39, 176, 0.9)' }
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            Aucune donnée disponible
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Summary Cards */}
                            {data.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                        <div className="text-2xl font-bold text-magenta">{data.length}</div>
                                        <div className="text-gray-600">Périodes</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {data.reduce((sum, item) => sum + item.absences, 0)}
                                        </div>
                                        <div className="text-gray-600">Total Absences</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {Math.round(data.reduce((sum, item) => sum + item.absences, 0) / data.length)}
                                        </div>
                                        <div className="text-gray-600">Moyenne</div>
                                    </div>
                                </div>
                            )}

                            {/* Bouton de Génération de PDF */}
                            <div className="flex justify-center">
                                <button
                                    onClick={generatePDF}
                                    disabled={data.length === 0}
                                    className="bg-magenta text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md disabled:cursor-not-allowed"
                                >
                                    <FaFilePdf />
                                    Générer un Rapport PDF
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
