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
  current_drivers: Array<{
    id: number;
    key: string;
    name: string;
    surname: string;
    number: number;
    image_url?: string | null;
  }>; // Pilotes actuels de l'équipe
  driver_history: Array<{
    id: number;
    driver_id: number;
    team_id: number;
    date_start: string;
    date_end?: string | null;
    season_start: number;
    season_end?: number | null;
    is_current: boolean;
  }>; // Historique des pilotes
}

// Type pour la réponse de l'API
export interface TeamsApiResponse {
  success: boolean;
  data: Team[];
  message?: string;
}
