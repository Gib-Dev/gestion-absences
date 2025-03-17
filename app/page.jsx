export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 text-center p-6">
      <div className="max-w-xl bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-3xl font-bold mb-4">Bienvenue dans Gestion Absences</h1>
        <p className="mb-6 text-gray-600">
          Cette application permet de gérer facilement les absences et les utilisateurs dans une interface intuitive.
        </p>
        <div className="space-x-4">
          <a href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Se connecter</a>
          <a href="/auth/register" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">S’inscrire</a>
        </div>
      </div>
    </main>
  );
}
