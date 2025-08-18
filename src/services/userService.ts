const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'api-key-default';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  favorite_team_id: number | null;
  favorite_driver_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserProfile {
  username: string;
  email: string;
  favorite_team_id: number | null;
  favorite_driver_id: number | null;
}

export interface UserServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class UserService {
  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    if (!token) {
      console.warn('Aucun token d\'authentification trouvé dans localStorage');
    }
    
    return {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      'Authorization': `Bearer ${token}`,
    };
  }

  async getUserProfile(): Promise<UserServiceResponse<UserProfile>> {
    try {
      console.log('Récupération du profil utilisateur...');

      const response = await fetch(`${API_BASE_URL}/api/me`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
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
      console.error(' Erreur lors de la récupération du profil:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      };
    }
  }

  async updateUserProfile(profileData: UpdateUserProfile): Promise<UserServiceResponse<UserProfile>> {
    try {

      const response = await fetch(`${API_BASE_URL}/api/me`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData),
      });

      console.log('✏️ Réponse du serveur (PUT):', response.status, response.statusText);

      // Si PUT échoue avec une erreur CORS, essayer PATCH
      if (!response.ok && response.status === 0) {
        console.log('🔄 Tentative avec PATCH au lieu de PUT...');
        
        const response = await fetch(`${API_BASE_URL}/api/me`, {
          method: 'PATCH',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(profileData),
        });

        console.log('✏️ Réponse du serveur (PATCH):', response.status, response.statusText);
      }

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Erreur lors de la mise à jour du profil:', data);
        return {
          success: false,
          message: data.message || `Erreur ${response.status}: ${response.statusText}`,
        };
      }

      console.log('✅ Profil mis à jour avec succès:', data);
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      };
    }
  }
}

export const userService = new UserService();
