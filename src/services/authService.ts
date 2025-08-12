import { UserRegistrationData, AuthResponse, AuthError } from '../modeles/userModel';
import { isTokenExpired, isTokenExpiringSoon, getTokenTimeRemaining } from '../utils/tokenUtils';

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
    if (!accessToken) return false;
    
    // Vérifier si le token n'est pas expiré
    return !isTokenExpired(accessToken);
  }

  // Fonction pour rafraîchir les tokens
  public async refreshTokens(): Promise<AuthResponse> {
    try {
      const { refreshToken } = this.getTokens();
      
      if (!refreshToken) {
        throw new Error('Aucun refresh token disponible');
      }

      console.log('🔄 Rafraîchissement des tokens en cours...');

      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        },
        body: JSON.stringify({ refreshToken })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Erreur lors du rafraîchissement:', data);
        
        // Si le refresh token est invalide, nettoyer les tokens
        if (response.status === 401 || response.status === 403) {
          this.clearTokens();
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
        
        throw new Error(data.message || 'Erreur lors du rafraîchissement des tokens');
      }

      // Sauvegarder les nouveaux tokens (rotation du refresh token)
      if (data.accessToken && data.refreshToken) {
        this.saveTokens(data.accessToken, data.refreshToken);
        console.log('✅ Tokens rafraîchis avec succès');
        
        // Log du temps restant sur le nouveau token
        const timeRemaining = getTokenTimeRemaining(data.accessToken);
        console.log(`⏰ Nouveau token valide pour ${timeRemaining} minutes`);
      }

      return data as AuthResponse;
    } catch (error) {
      console.error('❌ Erreur lors du rafraîchissement des tokens:', error);
      
      // En cas d'erreur, nettoyer les tokens pour forcer une nouvelle connexion
      this.clearTokens();
      throw error;
    }
  }

  // Fonction pour vérifier et rafraîchir automatiquement les tokens si nécessaire
  public async ensureValidTokens(): Promise<boolean> {
    try {
      const { accessToken, refreshToken } = this.getTokens();
      
      if (!accessToken || !refreshToken) {
        console.log('🔒 Aucun token disponible');
        return false;
      }

      // Si le token d'accès est expiré
      if (isTokenExpired(accessToken)) {
        console.log('⚠️ Access token expiré, rafraîchissement nécessaire');
        await this.refreshTokens();
        return true;
      }

      // Si le token va expirer dans les 5 prochaines minutes
      if (isTokenExpiringSoon(accessToken, 5)) {
        const timeRemaining = getTokenTimeRemaining(accessToken);
        console.log(`⏰ Access token expire dans ${timeRemaining} minutes, rafraîchissement préventif`);
        await this.refreshTokens();
        return true;
      }

      // Token encore valide
      const timeRemaining = getTokenTimeRemaining(accessToken);
      console.log(`✅ Token valide, expire dans ${timeRemaining} minutes`);
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de la vérification des tokens:', error);
      return false;
    }
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

  // Fonction pour faire une requête authentifiée avec vérification automatique des tokens
  public async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Vérifier et rafraîchir les tokens si nécessaire avant la requête
    const tokensValid = await this.ensureValidTokens();
    
    if (!tokensValid) {
      throw new Error('Session expirée, veuillez vous reconnecter');
    }

    const { accessToken } = this.getTokens();
    
    if (!accessToken) {
      throw new Error('Aucun token d\'authentification trouvé');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      }
    });

    // Si on reçoit une 401, essayer de rafraîchir une fois
    if (response.status === 401) {
      console.log('🔄 Token rejeté par le serveur, tentative de rafraîchissement...');
      
      try {
        await this.refreshTokens();
        const { accessToken: newToken } = this.getTokens();
        
        if (newToken) {
          // Refaire la requête avec le nouveau token
          return fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              'Authorization': `Bearer ${newToken}`,
              'Content-Type': 'application/json',
              'X-API-Key': API_KEY
            }
          });
        }
      } catch (refreshError) {
        console.error('❌ Impossible de rafraîchir le token:', refreshError);
        throw new Error('Session expirée, veuillez vous reconnecter');
      }
    }

    return response;
  }
}

// Instance singleton du service d'authentification
export const authService = new AuthService();
export default authService;
