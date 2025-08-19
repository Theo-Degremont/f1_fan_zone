import { useState, useEffect } from 'react';
import { User, UserRegistrationData, AuthResponse } from '../modeles/userModel';
import authService from '../services/authService';

interface UseAuthReturn {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (userData: UserRegistrationData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkEmailAvailability: (email: string) => Promise<{ isAvailable: boolean; message?: string }>;
  refreshTokens: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initialisé à true
  const [error, setError] = useState<string | null>(null);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true); // Commencer le chargement
        console.log('🔍 Vérification de l\'authentification...');
        
        // Vérifier et rafraîchir les tokens si nécessaire
        const tokensValid = await authService.ensureValidTokens();
        console.log('🔑 Tokens valides:', tokensValid);
        
        if (tokensValid) {
          setIsAuthenticated(true);
          console.log('✅ Utilisateur authentifié');
          const tokens = authService.getTokens();
          if (tokens.accessToken) {
            // Optionnel : Décoder le token pour récupérer les infos utilisateur
            setUser({
              id: 0,
              username: 'Utilisateur',
              email: '',
              favorite_team_id: null,
              favorite_driver_id: null
            });
          }
        } else {
          // Tokens invalides ou expirés
          console.log('❌ Tokens invalides, utilisateur non authentifié');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('❌ Erreur lors de la vérification des tokens:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false); // Terminer le chargement dans tous les cas
        console.log('🏁 Vérification terminée');
      }
    };

    checkAuth();
  }, []);

  // Fonction d'inscription
  const register = async (userData: UserRegistrationData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.register(userData);
      
      // Si nous avons des tokens, l'inscription a réussi
      if (response.accessToken && response.refreshToken) {
        // Définir un utilisateur temporaire si pas fourni par l'API
        const user = response.user || {
          id: 0, // ID temporaire
          username: userData.username,
          email: userData.email,
          favorite_team_id: userData.favorite_team_id,
          favorite_driver_id: userData.favorite_driver_id
        };
        
        setUser(user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Tokens manquants dans la réponse');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'inscription';
      setError(errorMessage);
      throw err; // Re-throw pour que le composant puisse aussi gérer l'erreur
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(email, password);
      
      // Si nous avons des tokens, la connexion a réussi
      if (response.accessToken && response.refreshToken) {
        // Définir un utilisateur temporaire si pas fourni par l'API
        const user = response.user || {
          id: 0, // ID temporaire
          username: '',
          email: email,
          favorite_team_id: null,
          favorite_driver_id: null
        };
        
        setUser(user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Tokens manquants dans la réponse');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la connexion';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = (): void => {
    authService.clearTokens();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Fonction pour effacer l'erreur
  const clearError = (): void => {
    setError(null);
  };

  // Fonction pour rafraîchir manuellement les tokens
  const refreshTokens = async (): Promise<void> => {
    try {
      await authService.refreshTokens();
      // Après rafraîchissement réussi, l'utilisateur reste connecté
      console.log('✅ Tokens rafraîchis depuis useAuth');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du rafraîchissement';
      setError(errorMessage);
      
      // En cas d'échec du rafraîchissement, déconnecter l'utilisateur
      setIsAuthenticated(false);
      setUser(null);
      throw err;
    }
  };

  // Fonction pour vérifier la disponibilité d'un email
  const checkEmailAvailability = async (email: string): Promise<{ isAvailable: boolean; message?: string }> => {
    try {
      return await authService.checkEmailAvailability(email);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la vérification de l\'email';
      throw new Error(errorMessage);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    clearError,
    checkEmailAvailability,
    refreshTokens
  };
}
