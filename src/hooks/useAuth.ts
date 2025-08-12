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
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      // Ne pas définir automatiquement l'utilisateur comme authentifié
      // juste parce que des tokens existent - ils pourraient être expirés
      // L'authentification sera confirmée lors d'une action utilisateur
      if (isAuth) {
        // Tokens présents mais on ne définit pas isAuthenticated
        // L'utilisateur devra se connecter pour confirmer
        console.log('Tokens trouvés dans le localStorage');
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
    checkEmailAvailability
  };
}
