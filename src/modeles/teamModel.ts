// Interface pour les pilotes basée sur le schéma Prisma Driver
export interface Driver {
  id: number;
  key: string;
  name: string;
  surname: string;
  number: number;
  nb_championship: number;
  nb_pole: number;
  nb_podiums: number;
  nb_race: number;
  nb_victory: number;
  image_url?: string | null;
  current_team_id?: number | null;
  current_team?: Team | null;
}

// Interface pour l'historique des équipes des pilotes
export interface DriverTeamHistory {
  id: number;
  driver_id: number;
  team_id: number;
  date_start: string; // DateTime converti en string
  date_end?: string | null; // DateTime optionnel
  season_start: number;
  season_end?: number | null;
  is_current: boolean;
  created_at: string; // DateTime converti en string
  driver: Driver;
  team: Team;
}

// Types TypeScript basés sur votre modèle Prisma Team
export interface Team {
  id: number;
  key: string;
  name: string;
  date_start: string; // DateTime sera converti en string par l'API
  date_end?: string | null; // DateTime optionnel
  nb_victory: number;
  nb_podiums: number;
  nb_pole: number;
  color: string; // Couleur hex (ex: "#F47601")
  nb_championship: number;
  nb_race: number;
  current_drivers: Driver[]; // Pilotes actuels de l'équipe
  driver_history: DriverTeamHistory[]; // Historique des pilotes
}

// Type pour la réponse de l'API
export interface TeamsApiResponse {
  success: boolean;
  data: Team[];
  message?: string;
}
