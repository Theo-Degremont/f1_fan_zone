// Interface pour les pilotes actuels
export interface Driver {
  id: number;
  name: string;
  surname: string;
  number: number;
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
  current_drivers: Driver[]; // Ajout des pilotes actuels
}

// Type pour la réponse de l'API
export interface TeamsApiResponse {
  success: boolean;
  data: Team[];
  message?: string;
}
