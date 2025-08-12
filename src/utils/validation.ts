// Utilitaires de validation et de sécurité pour les formulaires

/**
 * Nettoie et sécurise une chaîne contre les attaques XSS
 * @param input - La chaîne à nettoyer
 * @returns La chaîne nettoyée
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  // Supprimer les balises HTML et les caractères dangereux
  return input
    .replace(/<[^>]*>/g, '') // Supprimer les balises HTML
    .replace(/[<>"/\\&]/g, '') // Supprimer les caractères dangereux
    .trim(); // Supprimer les espaces en début et fin
}

/**
 * Valide le nom d'utilisateur
 * @param username - Le nom d'utilisateur à valider
 * @returns Objet avec isValid et message d'erreur
 */
export function validateUsername(username: string): { isValid: boolean; message: string } {
  const cleanUsername = sanitizeInput(username);
  
  if (!cleanUsername) {
    return { isValid: false, message: 'Le pseudo est requis' };
  }
  
  if (cleanUsername.length < 3) {
    return { isValid: false, message: 'Le pseudo doit contenir au moins 3 caractères' };
  }
  
  if (cleanUsername.length > 25) {
    return { isValid: false, message: 'Le pseudo ne peut pas dépasser 25 caractères' };
  }
  
  // Vérifier que seuls les lettres et chiffres sont autorisés
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(cleanUsername)) {
    return { isValid: false, message: 'Le pseudo ne peut contenir que des lettres et des chiffres' };
  }
  
  return { isValid: true, message: '' };
}

/**
 * Valide l'adresse email
 * @param email - L'email à valider
 * @returns Objet avec isValid et message d'erreur
 */
export function validateEmail(email: string): { isValid: boolean; message: string } {
  const cleanEmail = sanitizeInput(email.toLowerCase());
  
  if (!cleanEmail) {
    return { isValid: false, message: 'L\'email est requis' };
  }
  
  // Regex complète pour valider l'email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, message: 'Veuillez entrer une adresse email valide' };
  }
  
  // Vérifications supplémentaires
  if (cleanEmail.length > 255) {
    return { isValid: false, message: 'L\'adresse email est trop longue' };
  }
  
  // Vérifier qu'il n'y a pas de points consécutifs
  if (cleanEmail.includes('..')) {
    return { isValid: false, message: 'L\'adresse email ne peut pas contenir de points consécutifs' };
  }
  
  return { isValid: true, message: '' };
}

/**
 * Valide le mot de passe
 * @param password - Le mot de passe à valider
 * @returns Objet avec isValid et message d'erreur
 */
export function validatePassword(password: string): { isValid: boolean; message: string } {
  if (!password) {
    return { isValid: false, message: 'Le mot de passe est requis' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Le mot de passe doit contenir au moins 8 caractères' };
  }
  
  if (password.length > 50) {
    return { isValid: false, message: 'Le mot de passe ne peut pas dépasser 50 caractères' };
  }
  
  // Vérifier la présence d'une majuscule
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Le mot de passe doit contenir au moins une majuscule' };
  }
  
  // Vérifier la présence d'une minuscule
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Le mot de passe doit contenir au moins une minuscule' };
  }
  
  // Vérifier la présence d'un chiffre
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Le mot de passe doit contenir au moins un chiffre' };
  }
  
  // Vérifier la présence d'un caractère spécial autorisé
  if (!/[@#!?_-]/.test(password)) {
    return { isValid: false, message: 'Le mot de passe doit contenir au moins un caractère spécial (@, #, !, ?, _, -)' };
  }
  
  return { isValid: true, message: '' };
}

/**
 * Valide la confirmation du mot de passe
 * @param password - Le mot de passe original
 * @param confirmPassword - La confirmation du mot de passe
 * @returns Objet avec isValid et message d'erreur
 */
export function validatePasswordConfirmation(password: string, confirmPassword: string): { isValid: boolean; message: string } {
  if (!confirmPassword) {
    return { isValid: false, message: 'La confirmation du mot de passe est requise' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Les mots de passe ne correspondent pas' };
  }
  
  return { isValid: true, message: '' };
}

/**
 * Valide tous les champs du formulaire d'inscription
 * @param formData - Les données du formulaire
 * @returns Objet avec les erreurs de validation
 */
export function validateRegistrationForm(formData: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  favorite_team_id: number | null;
  favorite_driver_id: number | null;
}): {
  isValid: boolean;
  errors: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    teams?: string;
  };
} {
  const errors: any = {};
  
  // Valider le nom d'utilisateur
  const usernameValidation = validateUsername(formData.username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.message;
  }
  
  // Valider l'email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }
  
  // Valider le mot de passe
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }
  
  // Valider la confirmation du mot de passe
  const confirmPasswordValidation = validatePasswordConfirmation(formData.password, formData.confirmPassword);
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.message;
  }
  
  // Valider que l'équipe et le pilote sont sélectionnés (optionnel)
  // Vous pouvez commenter ces lignes si vous voulez les rendre optionnels
  if (!formData.favorite_team_id) {
    errors.teams = 'Veuillez sélectionner votre équipe favorite';
  }
  
  if (!formData.favorite_driver_id) {
    errors.teams = errors.teams ? `${errors.teams} et votre pilote favori` : 'Veuillez sélectionner votre pilote favori';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Génère un indicateur de force du mot de passe
 * @param password - Le mot de passe à évaluer
 * @returns Objet avec la force et la couleur
 */
export function getPasswordStrength(password: string): { strength: string; color: string; score: number } {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[@#!?_-]/.test(password)) score += 1;
  if (password.length >= 16) score += 1;
  
  if (score <= 2) {
    return { strength: 'Faible', color: 'text-red-500', score };
  } else if (score <= 4) {
    return { strength: 'Moyen', color: 'text-yellow-500', score };
  } else if (score <= 5) {
    return { strength: 'Fort', color: 'text-green-500', score };
  } else {
    return { strength: 'Très fort', color: 'text-green-600', score };
  }
}
