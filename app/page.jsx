"use client";

import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-ghostwhite text-night">
        {/* En-tête */}
        <header className="bg-white p-6 shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              Simplifiez la gestion des absences avec notre outil intuitif !
            </h1>
            <div>
              <a href="/auth/register">
                <button className="bg-magenta text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all">
                  Créer un compte
                </button>
              </a>
            </div>
          </div>
        </header>

        {/* Section de présentation */}
        <section className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">
                Notre plateforme vous permet de suivre et de gérer facilement les absences de vos employés ou étudiants en quelques clics.
              </h2>
              <p className="text-lg mb-4">
                Optimisez votre temps et simplifiez vos processus avec notre solution tout-en-un.
              </p>
              <a href="/auth/register">
                <button className="bg-magenta text-white px-6 py-3 rounded hover:bg-opacity-90 transition-all">
                  Commencez maintenant
                </button>
              </a>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/banc.jpg"
                alt="Gestion des absences"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Fonctionnalités principales */}
        <section className="container mx-auto py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Fonctionnalités principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-2">Tableau de bord intuitif</h3>
              <p>Obtenez une vue d'ensemble des absences en un clin d'œil.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-2">Notifications automatiques</h3>
              <p>Recevez des rappels pour les absences importantes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-2">Rapports détaillés</h3>
              <p>Analysez les tendances pour une meilleure planification.</p>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="container mx-auto py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Ce que nos utilisateurs disent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <p className="italic">
                "Depuis que j'utilise cet outil, la gestion des absences est devenue un jeu d'enfant !"
              </p>
              <p className="font-bold mt-2">- Moussa, DRH</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <p className="italic">
                "Un outil indispensable pour toute équipe qui souhaite gérer les absences efficacement."
              </p>
              <p className="font-bold mt-2">- Abdoul, Responsable pédagogique</p>
            </div>
          </div>
        </section>

        {/* Appel à l'action final */}
        <section className="container mx-auto py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à révolutionner la gestion des absences ?
            </h2>
            <a href="/auth/register">
              <button className="bg-magenta text-white px-6 py-3 rounded hover:bg-opacity-90 transition-all">
                Créez un compte dès aujourd'hui !
              </button>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}