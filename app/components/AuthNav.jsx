import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthNav() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/images/Logo.webp" 
              alt="Gestion Absences" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <span className="text-xl font-bold text-magenta">
              Gestion Absences
            </span>
          </Link>
          
          <div className="flex space-x-4">
            <Link href="/auth/login">
              <span className="text-gray-600 hover:text-magenta transition-colors duration-200">
                Connexion
              </span>
            </Link>
            <Link href="/auth/register">
              <span className="text-gray-600 hover:text-magenta transition-colors duration-200">
                Inscription
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
