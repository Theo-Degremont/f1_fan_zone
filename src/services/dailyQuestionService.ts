import { MyAnswerResponseWrapper, AnswerVoteRequest, AnswerVoteResponse } from '../models/DailyQuestion';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
const API_KEY = 'f1-api-key-2025-secure-access-f1fanzone-production';

class DailyQuestionService {
  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    if (!token) {
      console.warn('Aucun token d\'authentification trouvé dans localStorage');
    } else {
      console.log('Token trouvé, longueur:', token.length);
    }
    
    return {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      'Authorization': `Bearer ${token}`,
    };
  }

  async getMyAnswer(): Promise<MyAnswerResponseWrapper> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/daily-questions/my-answer`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });


      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          console.warn('Erreur d\'authentification (401) - Token invalide');
          return {
            success: false,
            message: 'Session expirée, veuillez vous reconnecter',
          };
        }

        return {
          success: false,
          message: data.message || `Erreur ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      };
    }
  }

  async submitAnswer(voteData: AnswerVoteRequest): Promise<AnswerVoteResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/daily-questions/answer`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(voteData),
      });


      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          console.warn('Erreur d\'authentification lors du vote (401) - Token invalide');
        } else {
          console.warn('Erreur lors de l\'envoi du vote:', data);
        }
        return {
          success: false,
          message: data.message || `Erreur ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Erreur lors de l\'envoi du vote:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      };
    }
  }
}

export const dailyQuestionService = new DailyQuestionService();
