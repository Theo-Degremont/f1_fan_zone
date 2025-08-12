'use client'

import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

interface TokenRefreshProviderProps {
  children: React.ReactNode;
}

/**
 * Composant qui vérifie périodiquement l'état des tokens en arrière-plan
 * et rafraîchit automatiquement si nécessaire
 */
export function TokenRefreshProvider({ children }: TokenRefreshProviderProps) {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Fonction de vérification périodique
    const checkTokens = async () => {
      if (!isAuthenticated) {
        return; // Pas besoin de vérifier si pas connecté
      }

      try {
        console.log('🔍 Vérification périodique des tokens...');
        const tokensValid = await authService.ensureValidTokens();
        
        if (!tokensValid) {
          console.log('❌ Tokens invalides, déconnexion automatique');
          logout(); // Déconnexion automatique si tokens invalides
        }
      } catch (error) {
        console.error('❌ Erreur lors de la vérification périodique:', error);
        
        // En cas d'erreur, déconnecter pour sécuriser
        if (error instanceof Error && error.message.includes('Session expirée')) {
          logout();
        }
      }
    };

    // Démarrer la vérification périodique seulement si connecté
    if (isAuthenticated) {
      // Vérification immédiate
      checkTokens();
      
      // Puis vérification toutes les 5 minutes
      intervalId = setInterval(checkTokens, 5 * 60 * 1000); // 5 minutes
      console.log('🔄 Vérification automatique des tokens activée (toutes les 5 minutes)');
    }

    // Cleanup lors du démontage ou changement d'état d'authentification
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log('⏹️ Vérification automatique des tokens désactivée');
      }
    };
  }, [isAuthenticated, logout]);

  // Ce composant ne rend que ses enfants, il travaille en arrière-plan
  return <>{children}</>;
}

export default TokenRefreshProvider;
