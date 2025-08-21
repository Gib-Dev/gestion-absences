"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-ghostwhite text-night">
      {/* En-tête */}
      <header className="bg-white p-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Simplifiez la gestion des absences avec notre outil intuitif !
          </h1>
          <div>
            <Link href="/auth/register">
              <button className="bg-magenta text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all">
                Créer un compte
              </button>
            </Link>
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
            <Link href="/auth/register">
              <button className="bg-magenta text-white px-6 py-3 rounded hover:bg-opacity-90 transition-all">
                Commencez maintenant
              </button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/banc.jpg"
              alt="Gestion des absences"
              width={600}
              height={400}
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
            <p>Obtenez une vue d&apos;ensemble des absences en un clin d&apos;œil.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-2">Statistiques avancées</h3>
            <p>Analysez les tendances avec des graphiques interactifs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-2">Gestion des utilisateurs</h3>
            <p>Administrez facilement votre équipe et leurs permissions.</p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Ce que nos utilisateurs disent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <p className="italic">
              &quot;Depuis que j&apos;utilise cet outil, la gestion des absences est devenue un jeu d&apos;enfant !&quot;
            </p>
            <p className="font-bold mt-2">- Moussa, DRH</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <p className="italic">
              &quot;Un outil indispensable pour toute équipe qui souhaite gérer les absences efficacement.&quot;
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
          <Link href="/auth/register">
            <button className="bg-magenta text-white px-6 py-3 rounded hover:bg-opacity-90 transition-all">
              Commencer gratuitement
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}