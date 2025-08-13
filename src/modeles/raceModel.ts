
import { Driver, Team } from './teamModel';

// Interface pour les résultats de course
export interface RaceResult {
  id: number;
  race_id: number;
  driver_id: number;
  team_id: number;
  position: number;
  points: number;
  status: string; // finished, retired, disqualified, etc.
  fastest_lap: boolean;
  pole_position: boolean;
  time?: string | null;
  race: Race;
  driver: Driver;
  team: Team;
}

// Interface pour les classements des pilotes
export interface ClassementDriver {
  id: number;
  driver_id: number;
  season: number;
  points: number;
  position: number;
  driver: Driver;
}

// Interface pour les classements des équipes
export interface ClassementTeam {
  id: number;
  team_id: number;
  season: number;
  points: number;
  position: number;
  team: Team;
}

export interface Race {
  id: number;
  race_name: string;
  track_name: string;
  country?: string | null; 
  city: string;
  started_at: string; // DateTime converti en string
  season: number; // Nouvelle propriété pour la saison
  nb_laps: number;
  nb_curve?: number | null; // Optionnel
  duration?: number | null; // Optionnel
  image_url?: string | null; // Optionnel
  race_results: RaceResult[]; // Relation avec les résultats
}

export interface RacesApiResponse {
  success: boolean;
  data: Race[];
  message?: string;
}
