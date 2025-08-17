// Interface pour les pilotes basée sur le schéma Prisma Driver
export interface Driver {
  id: number;
  key: string;
  name: string;
  surname: string;
  number: number;
  nb_championship: number;
  nb_pole: number;
  nb_podiums: number;
  nb_race: number;
  nb_victory: number;
  image_url?: string | null;
  current_team_id?: number | null;
  current_team?: {
    id: number;
    key: string;
    name: string;
    color: string;
  } | null;
}
