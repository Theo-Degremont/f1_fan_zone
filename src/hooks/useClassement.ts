import { useState, useCallback } from 'react';
import { authService } from '../services/authService';
import { ClassementPilote, ClassementResponse } from '../modeles/classementModel';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';

interface UseClassementReturn {
  classements: ClassementPilote[];
  isLoading: boolean;
  error: string | null;
  season: number;
  totalDrivers: number;
  loadClassementBySeason: (year: number) => Promise<void>;
  clearError: () => void;
}

export function useClassement(): UseClassementReturn {
  const [classements, setClassements] = useState<ClassementPilote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [season, setSeason] = useState<number>(2024);
  const [totalDrivers, setTotalDrivers] = useState<number>(0);

  // Fonction pour charger le classement par saison
  const loadClassementBySeason = useCallback(async (year: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Appel API réel avec authentification
      const response = await authService.authenticatedFetch(`${API_BASE_URL}/api/classements/season/${year}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data: ClassementResponse = await response.json();
      console.log('📊 Données de classement reçues:', data);
      
      // Mettre à jour l'état avec les données reçues
      setClassements(data.classements || []);
      setSeason(data.season);
      setTotalDrivers(data.totalDrivers);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement du classement';
      setError(errorMessage);
      console.error('Erreur useClassement:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonction pour effacer l'erreur
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    classements,
    isLoading,
    error,
    season,
    totalDrivers,
    loadClassementBySeason,
    clearError
  };
}

export default useClassement;
