'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Ne faire la vérification qu'une fois monté et chargement terminé
    if (mounted && !isLoading) {
      console.log('🔍 ProtectedRoute - isAuthenticated:', isAuthenticated);
      
      if (!isAuthenticated) {
        console.log('❌ Non authentifié, redirection vers /connexion');
        router.replace('/connexion');
      } else {
        console.log('✅ Authentifié, accès autorisé');
      }
    }
  }, [mounted, isLoading, isAuthenticated, router]);

  // Ne rien afficher tant que pas monté côté client
  if (!mounted) {
    return null;
  }

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-f1-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-f1-red-600"></div>
          <p className="text-f1-gray-100 mt-4">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Ne pas afficher le contenu si non authentifié
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-f1-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-f1-red-600"></div>
          <p className="text-f1-gray-100 mt-4">Redirection vers la connexion...</p>
        </div>
      </div>
    );
  }

  // Afficher le contenu si authentifié
  return <>{children}</>;
}
