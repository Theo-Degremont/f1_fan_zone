'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/navbar-hovers.css';


export default function NavBar() {
  return (
    <nav className="bg-f1-gray-700 shadow-lg border-b border-f1-gray-600 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          
          {/* Logo à gauche */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
                <Image 
                  src="/images/logo_f1_fan_zone.svg" 
                  alt="F1 Fan Zone Logo" 
                  width={90} 
                  height={90} 
                  className="logo-hover"
                />
            </Link>
          </div>

          {/* Navigation au milieu */}
          <div className="hidden md:block">
            <div className="ml-10 bg-f1-gray-600 rounded-lg px-2 py-2 border border-f1-gray-500">
              <div className="flex items-baseline space-x-2">
                <Link href="/grand-prix" className="nav-link-hover text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Grand prix
                </Link>
                <Link href="/classement" className="nav-link-hover text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Classement
                </Link>
                <Link href="/comparateur" className="nav-link-hover text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Comparateur
                </Link>
                <Link href="/jeux" className="nav-link-hover text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Jeux
                </Link>
                <Link href="/communaute" className="nav-link-hover text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Communauté
                </Link>
              </div>
            </div>
          </div>

          {/* Boutons à droite */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-3">
              <Link href="/connexion" className="connexion-hover text-f1-gray-100 px-2 py-2 rounded-md text-sm font-medium">
                Connexion
              </Link>
              <Link href="/rejoindre" className="rejoindre-hover bg-f1-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Rejoindre
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

