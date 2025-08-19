// Interface pour un résultat de course
export interface RaceResult {
  id: number;
  race_id: number;
  driver_id: number;
  position: number;
  points: number;
  fastest_lap: string;
  created_at: string;
  lap_time: number;
  status: string;
  total_time: number | null;
  driver: {
    id: number;
    name: string;
    surname: string;
    number: number;
    image_url: string;
    team_history: [{
      team: {
        id: number;
        name: string;
        color: string;
      }
    }];
  };
  race: {
    id: number;
    race_name: string;
    track_name: string;
    country: string;
    city: string;
    started_at: string;
    nb_laps: number;
    nb_curve: number | null;
    duration: number;
    image_url: string;
    season: number;
  };
}

// Interface pour la réponse API des résultats de course
export interface RaceResultsResponse {
  data: RaceResult[];
}
