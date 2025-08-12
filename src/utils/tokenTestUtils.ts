/**
 * Script de test pour les utilitaires de tokens
 * À exécuter dans la console du navigateur pour tester
 */

// Exemple de test des fonctions de token
console.log('🧪 Test des utilitaires de tokens');

// Simuler un token JWT expiré (pour test)
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiZXhwIjoxNjQwOTk1MjAwLCJpYXQiOjE2NDA5OTUyMDB9.xxx';

// Token valide (expire dans le futur)
const futureTimestamp = Math.floor(Date.now() / 1000) + 1800; // +30 minutes
const validTokenPayload = {
  sub: "1234567890",
  email: "test@example.com",
  exp: futureTimestamp,
  iat: Math.floor(Date.now() / 1000)
};

// Encoder le payload en base64url pour créer un token de test
const header = btoa(JSON.stringify({alg: "HS256", typ: "JWT"}));
const payload = btoa(JSON.stringify(validTokenPayload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
const signature = 'test-signature';
const validToken = `${header}.${payload}.${signature}`;

console.log('Token de test généré:', validToken);

// Vous pouvez maintenant tester dans la console :
// import { decodeJWT, isTokenExpired, isTokenExpiringSoon, getTokenTimeRemaining } from './src/utils/tokenUtils';

// Tests à faire :
console.log(`
🧪 Tests à effectuer dans la console :

1. Test de décodage :
const payload = decodeJWT('${validToken}');
console.log('Payload décodé:', payload);

2. Test d'expiration :
const expired = isTokenExpired('${validToken}');
console.log('Token expiré:', expired);

3. Test expiration prochaine :
const expiringSoon = isTokenExpiringSoon('${validToken}', 35);
console.log('Expire bientôt:', expiringSoon);

4. Test temps restant :
const timeRemaining = getTokenTimeRemaining('${validToken}');
console.log('Temps restant (minutes):', timeRemaining);
`);

export { validToken, expiredToken };
