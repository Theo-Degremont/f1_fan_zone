import { useState, useEffect } from 'react';
import { Team } from '../modeles/teamModel';
import { TeamsApiService } from '../services/teamsApi';

interface UseTeamsReturn {
  teams: Team[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook personnalisé pour gérer les données des équipes F1
 * @returns Object contenant les équipes, l'état de chargement, les erreurs et la fonction de refresh
 */
export const useTeams = (): UseTeamsReturn => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const teamsData = await TeamsApiService.getAllTeams();
      setTeams(teamsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue lors du chargement des équipes';
      setError(errorMessage);
      console.error('Erreur useTeams:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const refetch = async () => {
    await fetchTeams();
  };

  return {
    teams,
    isLoading,
    error,
    refetch
  };
};
