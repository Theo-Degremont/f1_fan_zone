import { useState, useEffect } from 'react';
import { GameScore, CreateGameScoreRequest } from '../modeles/GameScore';
import { gameScoreService } from '../services/gameScoreService';

export const useGameScore = () => {
  const [bestScore, setBestScore] = useState<GameScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
  };

  // Récupérer le meilleur score au chargement
  const fetchBestScore = async () => {
    if (!isAuthenticated()) {
      console.log('Utilisateur non connecté, pas de récupération du meilleur score');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await gameScoreService.getBestScore();
      
      if (response.success && response.data) {
        
        // Vérifier si response.data a une propriété bestScore
        let actualBestScore;
        if ('bestScore' in response.data) {
          actualBestScore = (response.data as any).bestScore;
        } else {
          actualBestScore = response.data;
        }
        
        // Vérification finale des propriétés requises
        if (actualBestScore && actualBestScore.score_ms && actualBestScore.id) {
          setBestScore(actualBestScore);
        } else {
          setError('Données du meilleur score invalides');
        }
      } else {
        setError(response.message || 'Erreur lors de la récupération du meilleur score');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  // Enregistrer un nouveau score
  const submitScore = async (scoreData: CreateGameScoreRequest): Promise<boolean> => {
    if (!isAuthenticated()) {
      console.log('🔒 Utilisateur non connecté, pas d\'enregistrement du score');
      setError('Utilisateur non connecté');
      return false;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await gameScoreService.createGameScore(scoreData);
      
      if (response.success) {
        await fetchBestScore();
        return true;
      } else {
        setError(response.message || 'Erreur lors de l\'enregistrement du score');
        return false;
      }
    } catch (err) {
      setError('Erreur de connexion');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Charger le meilleur score au montage du composant
  useEffect(() => {
    // Temporairement désactivé en attendant la correction de l'API
    fetchBestScore();
  }, []);

  return {
    bestScore,
    isLoading,
    error,
    submitScore,
    fetchBestScore,
  };
};
