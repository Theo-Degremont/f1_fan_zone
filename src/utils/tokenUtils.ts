/**
 * Utilitaires pour la gestion des tokens JWT
 */

export interface TokenPayload {
  exp: number; // Timestamp d'expiration
  iat: number; // Timestamp de création
  sub?: string; // Subject (user ID)
  email?: string;
  [key: string]: any;
}

/**
 * Décode un token JWT sans validation de signature
 * ⚠️ ATTENTION: Ne pas utiliser pour valider la sécurité, juste pour lire les données
 */
export function decodeJWT(token: string): TokenPayload | null {
  try {
    // Un JWT a 3 parties séparées par des points: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Token JWT invalide: format incorrect');
      return null;
    }

    // Décoder la partie payload (base64url)
    const payload = parts[1];
    
    // Convertir base64url en base64 standard
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    
    // Ajouter le padding si nécessaire
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    
    // Décoder et parser le JSON
    const decoded = JSON.parse(atob(padded));
    
    return decoded as TokenPayload;
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return null;
  }
}

/**
 * Vérifie si un token est expiré
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true; // Si on ne peut pas décoder, considérer comme expiré
  }

  // exp est en secondes, Date.now() est en millisecondes
  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  
  return currentTime >= expirationTime;
}

/**
 * Vérifie si un token va expirer dans un délai donné
 */
export function isTokenExpiringSoon(token: string, bufferMinutes: number = 5): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  const bufferTime = bufferMinutes * 60 * 1000; // Convertir en millisecondes
  
  return (currentTime + bufferTime) >= expirationTime;
}

/**
 * Retourne le temps restant avant expiration (en minutes)
 */
export function getTokenTimeRemaining(token: string): number {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return 0;
  }

  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  const remainingTime = expirationTime - currentTime;
  
  return Math.max(0, Math.floor(remainingTime / (60 * 1000))); // En minutes
}

/**
 * Extrait l'email du token si disponible
 */
export function getEmailFromToken(token: string): string | null {
  const payload = decodeJWT(token);
  return payload?.email || payload?.sub || null;
}
