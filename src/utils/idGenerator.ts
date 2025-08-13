/**
 * Utilitaires pour générer des identifiants uniques
 */

let counter = 0;

/**
 * Génère un ID unique pour les composants React
 * Combinaison de timestamp, compteur et randomness pour garantir l'unicité
 */
export function generateUniqueId(prefix: string = 'id'): string {
  counter = (counter + 1) % 10000; // Reset le compteur tous les 10000 pour éviter des nombres trop longs
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  
  return `${prefix}-${timestamp}-${counter}-${random}`;
}

/**
 * Génère un ID spécifiquement pour les toasts
 */
export function generateToastId(): string {
  return generateUniqueId('toast');
}

/**
 * Génère un ID simple basé sur un compteur (pour les cas où on n'a pas besoin de persistance)
 */
export function generateSimpleId(prefix: string = 'item'): string {
  counter = (counter + 1) % 10000;
  return `${prefix}-${counter}`;
}

/**
 * Génère un ID aléatoire court (style UUID simplifié)
 */
export function generateShortId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default {
  generateUniqueId,
  generateToastId,
  generateSimpleId,
  generateShortId
};
