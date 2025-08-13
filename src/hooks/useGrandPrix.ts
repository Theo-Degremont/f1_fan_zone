import { useState, useCallback } from 'react';
import { authService } from '../services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';

// Interface pour un Grand Prix
export interface GrandPrix {
  id: number;
  race_name: string;
  city: string;
  country: string;
  started_at: string;
  track_name: string;
  image_url: string;
  duration: number;
  nb_curve: number;
  nb_laps: number;
  race_results: any[];
}

interface UseGrandPrixReturn {
  grandPrixList: GrandPrix[];
  isLoading: boolean;
  error: string | null;
  loadGrandPrixBySeason: (year: number) => Promise<void>;
  clearError: () => void;
}

export function useGrandPrix(): UseGrandPrixReturn {
  const [grandPrixList, setGrandPrixList] = useState<GrandPrix[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour charger les Grands Prix par saison
  const loadGrandPrixBySeason = useCallback(async (year: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Appel API réel avec authentification
      const response = await authService.authenticatedFetch(`${API_BASE_URL}/api/races/year/${year}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 Données reçues de l\'API:', data);
      
      // Adapter les données selon la structure de votre API
      // L'API peut retourner un objet avec une propriété contenant le tableau
      const races = Array.isArray(data) ? data : (data.races || data.data || []);
      console.log('🏁 Courses extraites:', races);
      setGrandPrixList(races);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des Grands Prix';
      setError(errorMessage);
      console.error('Erreur useGrandPrix:', err);
    } finally {
      setIsLoading(false);
    }
  }, []); // Pas de dépendances car on utilise que des setters de state

  // Fonction pour effacer l'erreur
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    grandPrixList,
    isLoading,
    error,
    loadGrandPrixBySeason,
    clearError
  };
}

export default useGrandPrix;
