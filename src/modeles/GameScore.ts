export interface GameScore {
  id: number;                    // Généré automatiquement
  user_id: number;              // Récupéré du JWT token
  score_ms: number;             // Score en millisecondes
  scoreInSeconds: number;       // Score en secondes (calculé côté serveur)
  rank: number;                 // Rang du score
  created_at: string;           // Date de création (ISO string)
  user: {                       // Informations utilisateur
    id: number;
    username: string;
    email: string;
  };
}

// Garde l'ancienne interface pour la compatibilité avec les anciennes données

export interface CreateGameScoreRequest {
  score_ms: number;
}

export interface GameScoreResponse {
  success: boolean;
  data?: GameScore;
  message?: string;
}

export interface BestScoreResponse {
  success: boolean;
  data?: GameScore;
  message?: string;
}
