import { UserRegistrationData, AuthResponse, AuthError } from '../modeles/userModel';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'f1-api-key-2025-secure-access-f1fanzone-production';

class AuthService {
  
  // Fonction pour enregistrer les tokens dans le cache
  private saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  // Fonction pour récupérer les tokens du cache
  public getTokens(): { accessToken: string | null; refreshToken: string | null } {
    return {
      accessToken: localStorage.getItem('access_token'),
      refreshToken: localStorage.getItem('refresh_token')
    };
  }

  // Fonction pour supprimer les tokens du cache
  public clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // Fonction pour vérifier si l'utilisateur est connecté
  public isAuthenticated(): boolean {
    const { accessToken } = this.getTokens();
    return !!accessToken;
  }

  // Fonction pour vérifier si un email est déjà pris
  public async checkEmailAvailability(email: string): Promise<{ isAvailable: boolean; message?: string }> {
    try {
      console.log('Vérification email:', email);
      console.log('URL API:', `${API_BASE_URL}/api/users/check-email?email=${encodeURIComponent(email)}`);
      console.log('API Key:', API_KEY ? 'Présente' : 'Absente');

      const response = await fetch(`${API_BASE_URL}/api/users/check-email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        }
      });

      console.log('Statut réponse:', response.status);
      console.log('Headers réponse:', [...response.headers.entries()]);

      // Vérifier si la réponse contient du JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Réponse non-JSON:', textResponse);
        throw new Error('Réponse du serveur invalide (non-JSON)');
      }

      const data = await response.json();
      console.log('Données reçues:', data);

      if (!response.ok) {
        console.error('Erreur API:', data);
        throw new Error(data.message || 'Erreur lors de la vérification de l\'email');
      }

      return {
        isAvailable: data.available || false,
        message: data.message
      };
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'email:', error);
      throw error;
    }
  }

  // Fonction d'inscription
  public async register(userData: UserRegistrationData): Promise<AuthResponse> {
    try {

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        },
        body: JSON.stringify(userData)
      });

      // Toujours lire la réponse, même en cas d'erreur
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        console.error('Réponse inscription non-JSON:', textResponse);
        throw new Error(`Réponse du serveur invalide: ${textResponse}`);
      }

      console.log('Données inscription reçues:', data);

      if (!response.ok) {
        console.error('Erreur inscription détaillée:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
          url: `${API_BASE_URL}/api/auth/register`,
          headers: Object.fromEntries(response.headers.entries())
        });
        
        // Afficher plus de détails sur l'erreur
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(`Erreurs de validation: ${data.errors.join(', ')}`);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          throw new Error(data.message || `Erreur HTTP ${response.status}: ${response.statusText}`);
        }
      }

      // Si l'inscription réussit, sauvegarder les tokens
      if (data.accessToken && data.refreshToken) {
        this.saveTokens(data.accessToken, data.refreshToken);
      }

      return data as AuthResponse;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  }

  // Fonction de connexion (pour plus tard)
  public async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la connexion');
      }

      // Si la connexion réussit, sauvegarder les tokens
      if (data.accessToken && data.refreshToken) {
        this.saveTokens(data.accessToken, data.refreshToken);
      }

      return data as AuthResponse;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  // Fonction pour faire une requête authentifiée
  public async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const { accessToken } = this.getTokens();
    
    if (!accessToken) {
      throw new Error('Aucun token d\'authentification trouvé');
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
  }
}

// Instance singleton du service d'authentification
export const authService = new AuthService();
export default authService;
