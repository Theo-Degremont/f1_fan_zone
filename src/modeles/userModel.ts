// Interface pour l'utilisateur basée sur votre modèle Prisma
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  favorite_team_id: number | null;
  favorite_driver_id: number | null;
}

// Interface pour les données d'inscription (sans id et sans password en retour)
export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
  favorite_team_id: number | null;
  favorite_driver_id: number | null;
}

// Interface pour la réponse de l'API d'inscription
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: Omit<User, 'password'>; // User sans le mot de passe (optionnel)
  message?: string;
}

// Interface pour l'erreur d'API
export interface AuthError {
  success: false;
  message: string;
  errors?: string[];
}
