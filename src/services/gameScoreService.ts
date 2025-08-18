import { CreateGameScoreRequest, GameScoreResponse, BestScoreResponse } from '../modeles/GameScore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
const API_KEY = 'f1-api-key-2025-secure-access-f1fanzone-production';

class GameScoreService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token'); // Utiliser 'access_token' au lieu de 'token'
    
    if (!token) {
      console.warn('Aucun token d\'authentification trouvé');
    }
    
    return {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      'Authorization': `Bearer ${token}`,
    };
  }

  private isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  async createGameScore(scoreData: CreateGameScoreRequest): Promise<GameScoreResponse> {
    try {
      // Vérifier l'authentification avant l'envoi
      if (!this.isAuthenticated()) {
        return {
          success: false,
          message: 'Utilisateur non authentifié',
        };
      }

      console.log('📊 Envoi du score:', scoreData);

      const response = await fetch(`${API_BASE_URL}/api/game-scores`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(scoreData),
      });

      console.log('📊 Réponse du serveur:', response.status, response.statusText);

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Erreur lors de l\'enregistrement du score:', data);
        return {
          success: false,
          message: data.message || `Erreur ${response.status}: ${response.statusText}`,
        };
      }

      console.log('✅ Score enregistré avec succès:', data);
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('❌ Erreur lors de l\'enregistrement du score:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      };
    }
  }

  async getBestScore(): Promise<BestScoreResponse> {
    try {
      // Vérifier l'authentification avant l'envoi
      if (!this.isAuthenticated()) {
        return {
          success: false,
          message: 'Utilisateur non authentifié',
        };
      }

      console.log('🏆 Récupération du meilleur score...');

      const response = await fetch(`${API_BASE_URL}/api/game-scores/best`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      console.log('🏆 Réponse du serveur:', response.status, response.statusText);

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Erreur lors de la récupération du meilleur score:', data);
        return {
          success: false,
          message: data.message || `Erreur ${response.status}: ${response.statusText}`,
        };
      }

      console.log('✅ Meilleur score récupéré:', data);
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('❌ Erreur lors de la récupération du meilleur score:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      };
    }
  }
}

export const gameScoreService = new GameScoreService();
