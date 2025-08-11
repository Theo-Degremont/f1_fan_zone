import { Race } from '../modeles/raceModel';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'api-key-default';


export class RaceApiService {
  
  /**
   * Récupère la prochaine course depuis l'API
   * @returns Promise<Race> - La prochaine course
   */
  static async getNextRace(): Promise<Race> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/races/next`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'X-API-Key': API_KEY,
        },

        next: { revalidate: 300 }
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} - ${response.statusText}`);
      }
      const data: Race = await response.json();
      
      return data;
      
    } catch (error) {
      console.error('Erreur lors de la récupération des équipes:', error);
      throw error;
    }
  }

}