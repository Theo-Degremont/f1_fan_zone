'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../hooks/useAuth';
import '../styles/navbar-hovers.css';


export default function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    window.location.href = '/';
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 bg-f1-gray-700 shadow-lg border-b border-f1-gray-600 z-50 backdrop-blur-sm bg-f1-gray-700/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
          
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

          {isAuthenticated && (
            <div className="hidden md:block">
              <div className="ml-10 bg-f1-gray-600 rounded-lg px-2 py-2 border border-f1-gray-500">
                <div className="flex items-baseline space-x-2">
                  <Link href="/grand-prix" className="nav-link-hover font-formula1 text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                    Grand prix
                  </Link>
                  <Link href="/classement" className="nav-link-hover font-formula1 text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                    Classement
                  </Link>
                  <Link href="/comparateur" className="nav-link-hover font-formula1 text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                    Comparateur
                  </Link>
                  <Link href="/game" className="nav-link-hover font-formula1 text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                    Jeux
                  </Link>
                  <Link href="/community" className="nav-link-hover font-formula1 text-f1-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                    Communauté
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-3">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300"
                >
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link href="/connexion" className="connexion-hover text-f1-gray-100 px-2 py-2 rounded-md text-sm font-medium">
                    Connexion
                  </Link>
                  <Link href="/inscription" className="rejoindre-hover bg-f1-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Rejoindre
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-f1-gray-100 hover:text-white p-2"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-f1-gray-700 border-t border-f1-gray-600">
              {isAuthenticated && (
                <>
                  <Link 
                    href="/grand-prix" 
                    className="block text-f1-gray-100 px-3 py-2 rounded-md text-base font-medium hover:bg-f1-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Grand prix
                  </Link>
                  <Link 
                    href="/classement" 
                    className="block text-f1-gray-100 px-3 py-2 rounded-md text-base font-medium hover:bg-f1-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Classement
                  </Link>
                  <Link 
                    href="/comparateur" 
                    className="block text-f1-gray-100 px-3 py-2 rounded-md text-base font-medium hover:bg-f1-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Comparateur
                  </Link>
                  <Link 
                    href="/jeux" 
                    className="block text-f1-gray-100 px-3 py-2 rounded-md text-base font-medium hover:bg-f1-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jeux
                  </Link>
                  <Link 
                    href="/community" 
                    className="block text-f1-gray-100 px-3 py-2 rounded-md text-base font-medium hover:bg-f1-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Communauté
                  </Link>
                </>
              )}
              
              <div className="pt-4 pb-3 border-t border-f1-gray-600">
                {isAuthenticated ? (
                  <Link 
                    href="/profile" 
                    className="block text-f1-gray-100 px-3 py-2 rounded-md text-base font-medium hover:bg-f1-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profil
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      href="/connexion" 
                      className="block text-f1-gray-100 px-3 py-2 rounded-md text-base font-medium hover:bg-f1-gray-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                    <Link 
                      href="/inscription" 
                      className="block bg-f1-red-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-f1-red-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Rejoindre
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </nav>
    </header>
  );
}