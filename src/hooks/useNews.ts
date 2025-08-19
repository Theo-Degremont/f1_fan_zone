import { useState, useEffect } from 'react';
import { NewsArticle, newsService } from '../services/newsService';

export const useNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await newsService.getNews();
      
      if (response.success && response.data) {
        setNews(response.data);
      } else {
        setError(response.message || 'Erreur lors de la récupération des actualités');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des actualités:', err);
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

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
