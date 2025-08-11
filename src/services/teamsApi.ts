import { Team } from '../modeles/teamModel';

// Configuration de l'API depuis les variables d'environnement
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'api-key-default';

// Service pour récupérer les équipes depuis votre API
export class TeamsApiService {
  
  /**
   * Récupère toutes les équipes F1 depuis l'API
   * @returns Promise<Team[]> - Liste des équipes
   */
  static async getAllTeams(): Promise<Team[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/teams`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'X-API-Key': API_KEY,
        },
        // Ajout de cache pour éviter les appels répétés
        next: { revalidate: 300 } // Revalidation toutes les 5 minutes
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} - ${response.statusText}`);
      }

      // Votre API retourne directement un tableau, pas un objet avec success/data
      const data: Team[] = await response.json();
      
      return data;
      
    } catch (error) {
      console.error('Erreur lors de la récupération des équipes:', error);
      throw error;
    }
  }

  /**
   * Récupère une équipe spécifique par sa clé
   * @param key - Clé unique de l'équipe (ex: "ferrari", "mclaren")
   * @returns Promise<Team | null>
   */
  static async getTeamByKey(key: string): Promise<Team | null> {
    try {
      const teams = await this.getAllTeams();
      return teams.find(team => team.key === key) || null;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'équipe ${key}:`, error);
      throw error;
    }
  }

  /**
   * Utilitaire pour formater les dates
   * @param dateString - Date au format ISO string
   * @returns Date formatée lisible
   */
  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Calcule l'âge d'une équipe en années
   * @param dateStart - Date de création de l'équipe
   * @returns Nombre d'années
   */
  static calculateTeamAge(dateStart: string): number {
    const startDate = new Date(dateStart);
    const currentDate = new Date();
    return currentDate.getFullYear() - startDate.getFullYear();
  }
}
