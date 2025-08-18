const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
const API_KEY = 'f1-api-key-2025-secure-access-f1fanzone-production';

export interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  image_url: string;
  link: string;
  author: string;
  published_at: string;
  updated_at: string | null;
  is_active: boolean;
  created_at: string;
  __v: number;
}

export interface NewsServiceResponse {
  success: boolean;
  data?: NewsArticle[];
  message?: string;
}

class NewsService {
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    };
  }

  async getNews(): Promise<NewsServiceResponse> {
    try {
      console.log('📰 Récupération des actualités F1...');

      const response = await fetch(`${API_BASE_URL}/api/news`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      console.log('📰 Réponse du serveur:', response.status, response.statusText);

      if (!response.ok) {
        console.error('❌ Erreur lors de la récupération des actualités');
        return {
          success: false,
          message: `Erreur ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      console.log('✅ Actualités récupérées avec succès:', data.length, 'articles');

      // Filtrer pour ne garder que les articles actifs et les trier par date de publication
      const activeNews = data
        .filter((article: NewsArticle) => article.is_active)
        .sort((a: NewsArticle, b: NewsArticle) => 
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );

      return {
        success: true,
        data: activeNews,
      };
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des actualités:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      };
    }
  }
}

export const newsService = new NewsService();
