
import { Driver } from './driverModel';
import { Team } from './teamModel';

// Interface pour un classement de pilote de la page classement
export interface ClassementPilote {
  id: number;
  season: number;
  id_driver: number;
  position: number;
  points: number;
  driver: {
    id: number;
    name: string;
    surname: string;
    number: number;
    current_team: {
      id: number;
      name: string;
      color: string;
    } | null;
  };
}

// Interface pour un classement d'équipe
export interface ClassementTeam {
  id: number;
  season: number;
  id_team: number;
  position: number;
  points: number;
  nb_wins: number;
  nb_points: number;
  team: {
    id: number;
    name: string;
    date_start: string;
    date_end: string | null;
    nb_victory: number;
    color: string;
    nb_championship: number;
    nb_race: number;
    key: string;
    nb_podiums: number;
    nb_pole: number;
  };
}

// Interface pour la réponse API du classement pilote
export interface ClassementResponse {
  season: number;
  totalDrivers: number;
  classements: ClassementPilote[];
}

// Interface pour la réponse API du classement équipe
export interface ClassementTeamResponse {
  season: number;
  totalTeams: number;
  teams: ClassementTeam[];
}

// Interface pour les hooks de classement
export interface UseClassementReturn {
  classements: ClassementPilote[];
  isLoading: boolean;
  error: string | null;
  season: number;
  totalDrivers: number;
  loadClassementBySeason: (year: number) => Promise<void>;
  clearError: () => void;
}
