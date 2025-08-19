
import { Driver } from './driverModel';
import { Team } from './teamModel';
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
    team_history: [{
       team: {
        id: number;
        name: string;
        color: string;
      }
    }
    ];
  };
}

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
    color: string;
    nb_championship: number;
    nb_victory: number;
  };
}

export interface ClassementResponse {
  season: number;
  totalDrivers: number;
  classements: ClassementPilote[];
}

export interface ClassementTeamResponse {
  data: {
    classements: ClassementTeam[];
  };
}

export interface UseClassementReturn {
  classements: ClassementPilote[];
  isLoading: boolean;
  error: string | null;
  season: number;
  totalDrivers: number;
  loadClassementBySeason: (year: number) => Promise<void>;
  clearError: () => void;
}
