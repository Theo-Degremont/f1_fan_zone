import { useState, useEffect } from 'react';
import { NewsArticle, newsService } from '../services/newsService';

export const useNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les actualités
  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await newsService.getNews();
      
      if (response.success && response.data) {
        console.log('✅ Actualités récupérées avec succès:', response.data.length, 'articles');
        setNews(response.data);
      } else {
        console.warn('⚠️ Erreur lors de la récupération des actualités:', response.message);
        setError(response.message || 'Erreur lors de la récupération des actualités');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des actualités:', err);
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les actualités au montage du composant
  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    isLoading,
    error,
    fetchNews,
  };
};
