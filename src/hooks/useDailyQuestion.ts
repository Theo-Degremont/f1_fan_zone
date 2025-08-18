import { useState, useEffect } from 'react';
import { DailyQuestion, DailyQuestionStats, AnswerVoteRequest, UserAnswer } from '../models/DailyQuestion';
import { dailyQuestionService } from '../services/dailyQuestionService';

export const useDailyQuestion = () => {
  const [question, setQuestion] = useState<DailyQuestion | null>(null);
  const [stats, setStats] = useState<DailyQuestionStats | null>(null);
  const [userAnswer, setUserAnswer] = useState<UserAnswer | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);

  const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access_token');
  };
  const fetchAllData = async () => {
    if (!isAuthenticated()) {
      console.log('Utilisateur non connecté, impossible de récupérer la question du jour');
      setError('Veuillez vous connecter pour voir la question du jour');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await dailyQuestionService.getMyAnswer();
      
      if (response.success && response.data) {
        
        const { question, stats, hasVoted, userAnswer } = response.data;
        
        setQuestion(question);
        setStats(stats);
        setHasVoted(hasVoted);
        setUserAnswer(userAnswer);
        
      } else {
        setError(response.message || 'Aucune question disponible aujourd\'hui');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  // Envoyer un vote
  const submitVote = async (answerId: number): Promise<boolean> => {
    if (!isAuthenticated()) {
      setError('Veuillez vous connecter pour voter');
      return false;
    }

    if (hasVoted) {
      setError('Vous avez déjà voté pour cette question');
      return false;
    }

    if (!question?._id) {
      setError('Erreur: ID de question manquant');
      return false;
    }

    setIsSubmittingVote(true);
    setError(null);

    try {
      const voteData: AnswerVoteRequest = {
        id_question: question._id,
        answer: answerId,
      };

      const response = await dailyQuestionService.submitAnswer(voteData);

      if (response.success) {
        await fetchAllData();
        return true;
      } else {
        setError(response.message || 'Erreur lors de l\'enregistrement du vote');
        return false;
      }
    } catch (err) {
      setError('Erreur de connexion');
      return false;
    } finally {
      setIsSubmittingVote(false);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    question,
    stats,
    userAnswer,
    hasVoted,
    isLoading,
    error,
    isSubmittingVote,
    fetchAllData,
    submitVote,
    isAuthenticated: isAuthenticated(),
  };
};
