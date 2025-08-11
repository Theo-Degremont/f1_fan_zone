
export interface Race {
  id: number;
  race_name: string;
  track_name: string;
  country: string; 
  city: string;
  started_at: string;
  nb_laps: number;
  nb_curve: number;
  nb_pole: number;
  image_url: string; 
  duration: number;
  race_results: [];
}

export interface RacesApiResponse {
  success: boolean;
  data: Race[];
  message?: string;
}
