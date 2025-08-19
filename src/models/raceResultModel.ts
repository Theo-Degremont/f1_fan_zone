export interface Team {
  id: number;
  name: string;
  color: string;
}

export interface TeamHistory {
  team: Team;
}

export interface Driver {
  id: number;
  name: string;
  surname: string;
  number: number;
  image_url: string;
  team_history: TeamHistory[];
}

export interface Race {
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
}

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
  driver: Driver;
  race: Race;
}

export interface RaceResultsResponse extends Array<RaceResult> {}
