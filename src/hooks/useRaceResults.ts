import { useState, useCallback } from 'react';
import { RaceResult } from '../models/raceResultModel';
import { authService } from '../services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface UseRaceResultsReturn {
  results: RaceResult[];
  isLoading: boolean;
  error: string | null;
  raceInfo: RaceResult['race'] | null;
  fastestLapTime: number | null;
  loadRaceResults: (raceId: number) => Promise<void>;
  clearError: () => void;
}

export function useRaceResults(): UseRaceResultsReturn {
  const [results, setResults] = useState<RaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [raceInfo, setRaceInfo] = useState<RaceResult['race'] | null>(null);
  const [fastestLapTime, setFastestLapTime] = useState<number | null>(null);

  const loadRaceResults = useCallback(async (raceId: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.authenticatedFetch(`${API_BASE_URL}/api/races/${raceId}/results`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Les résultats de cette course ne sont pas encore disponibles`);
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📊 Données reçues de l\'API résultats:', data);
      
      // Traiter les données selon la structure reçue
      let raceResults: RaceResult[] = [];
      if (Array.isArray(data)) {
        raceResults = data;
      } else if (data.data && Array.isArray(data.data)) {
        raceResults = data.data;
      } else {
        console.log('❌ Structure de données non reconnue');
        console.log('📊 Data complet:', JSON.stringify(data, null, 2));
      }

      // Trier par position
      raceResults.sort((a, b) => {
        // Les DNF ont position 0, les mettre à la fin
        if (a.position === 0 && b.position === 0) return 0;
        if (a.position === 0) return 1;
        if (b.position === 0) return -1;
        return a.position - b.position;
      });

      setResults(raceResults);

      // Récupérer les informations de la course depuis le premier résultat
      if (raceResults.length > 0) {
        setRaceInfo(raceResults[0].race);
        
        // Trouver le temps de tour le plus rapide
        const validLapTimes = raceResults
          .filter(result => result.lap_time && result.lap_time > 0)
          .map(result => result.lap_time);
        
        if (validLapTimes.length > 0) {
          setFastestLapTime(Math.min(...validLapTimes));
        }
      }

    } catch (err) {
      console.error('Erreur lors du chargement des résultats:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setResults([]);
      setRaceInfo(null);
      setFastestLapTime(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  return {
    results,
    isLoading,
    error,
    raceInfo,
    fastestLapTime,
    loadRaceResults,
    clearError
  };
}
