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
  driver: {
    id: number;
    key: string;
    name: string;
    surname: string;
    number: number;
    image_url?: string | null;
  };
  team: {
    id: number;
    key: string;
    name: string;
    color: string;
  };
}
