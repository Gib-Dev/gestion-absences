import React from 'react';
import Link from 'next/link';
import SidebarStats from './SidebarStats';
import { 
  BiHome, 
  BiUser, 
  BiBarChart
} from 'react-icons/bi';

export default function Sidebar() {
  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: BiHome },
    { name: 'Profil', href: '/profile', icon: BiUser },
    { name: 'Statistiques', href: '/statistics', icon: BiBarChart },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Header simplifié */}
        <div className="px-4 py-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Navigation
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-magenta/10 hover:text-magenta transition-colors duration-200"
                  >
                    <Icon className="mr-3 text-lg" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Statistiques rapides */}
        <div className="px-4 pb-6">
          <SidebarStats />
        </div>
      </div>
    </div>
  );
}
