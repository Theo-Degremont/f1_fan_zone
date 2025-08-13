import { Driver, Team } from './teamModel';

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

// Interface pour la réponse API du classement
export interface ClassementResponse {
  season: number;
  totalDrivers: number;
  classements: ClassementPilote[];
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
