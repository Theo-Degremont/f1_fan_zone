'use client';

import { useState, useEffect } from 'react';
import NavBar from '@/src/components/NavBar';
import Footer from '@/src/components/Footer';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import { BubbleBackground } from '@/src/components/animate-ui/backgrounds/bubble';
import { useDailyQuestion } from '@/src/hooks/useDailyQuestion';

interface Answer {
  id: number;
  text: string;
  percentage?: number;
}

export default function CommunityPage() {
  const { question, stats, userAnswer, hasVoted, isLoading, error, isAuthenticated, submitVote, isSubmittingVote } = useDailyQuestion();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (hasVoted && userAnswer) {
      setSelectedAnswer(userAnswer.answer);
      setShowResults(true);
    } else {
      setSelectedAnswer(null);
      setShowResults(false);
    }
  }, [hasVoted, userAnswer]);

  const getFormattedAnswers = (): Answer[] => {
    if (!question) return [];
    
    const answers: Answer[] = [
      { id: 1, text: question.answer1 },
      { id: 2, text: question.answer2 },
      { id: 3, text: question.answer3 },
    ];
    
    if (question.answer4) {
      answers.push({ id: 4, text: question.answer4 });
    }
    
    return answers;
  };

  const getAnswerStats = (answerId: number) => {
    if (!stats) return { percentage: 0, votes: 0 };
    
    const percentageKey = `answer${answerId}` as keyof typeof stats.percentages;
    const votesKey = `answer${answerId}` as keyof typeof stats.votes;
    
    return {
      percentage: stats.percentages[percentageKey] || 0,
      votes: stats.votes[votesKey] || 0,
    };
  };

  const handleAnswerClick = async (answerId: number) => {
    if (hasVoted || showResults || isSubmittingVote) return;
    
    setSelectedAnswer(answerId);
    
    const success = await submitVote(answerId);
    
    if (success) {
      setShowResults(true);
    } else {
      
      setShowResults(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-f1-gray-900 via-f1-gray-800 to-black">
        <BubbleBackground
          interactive={true}
          colors={{ 
            first: '218,59,35', 
            second: '196,23,0', 
            third: '131,15,0', 
            fourth: '218,59,35', 
            fifth: '131,15,0', 
            sixth: '131,15,0' 
          }}
          className="fixed inset-0 -z-10"
        />
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-[100vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Chargement de la question du jour...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-f1-gray-900 via-f1-gray-800 to-black">
        <BubbleBackground
          interactive={true}
          colors={{ 
            first: '218,59,35', 
            second: '196,23,0', 
            third: '131,15,0', 
            fourth: '218,59,35', 
            fifth: '131,15,0', 
            sixth: '131,15,0' 
          }}
          className="fixed inset-0 -z-10"
        />
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-[100vh]">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-formula1 font-bold text-white mb-4">Question du jour</h1>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mb-6"></div>
            <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6">
              <p className="text-red-300 text-lg mb-2">😔 Oops !</p>
              <p className="text-red-200">{error}</p>
              {!isAuthenticated && (
                <p className="text-red-300 mt-3 text-sm">
                  <a href="/connexion" className="underline hover:text-red-100">
                    Connectez-vous
                  </a> pour accéder à la question du jour
                </p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedAnswers = getFormattedAnswers();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-f1-gray-900 via-f1-gray-800 to-black">
        <BubbleBackground
            interactive = {true}
            colors={{ 
                first: '218,59,35', 
                second: '196,23,0', 
                third: '131,15,0', 
                fourth: '218,59,35', 
                fifth: '131,15,0', 
                sixth: '131,15,0' 
            }}
            className="fixed inset-0 -z-10"
            />
      <NavBar />
      
      <div className="flex flex-col items-center justify-center min-h-[100vh]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-formula1 font-bold text-center text-white mb-8">
            Question du jour
          </h1>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mb-5"></div>
          
          <div className=" p-6 mb-8">
            <h2 className="text-xl font-semibold text-white text-center">
              {question?.questions}
            </h2>
          </div>
          
          <div className="flex justify-between items-center gap-4 mb-8">
            {formattedAnswers.map((answer) => (
              <div key={answer.id} className="flex-1 text-center">
                <button
                  onClick={() => handleAnswerClick(answer.id)}
                  disabled={hasVoted || showResults || isSubmittingVote}
                  className={`w-full p-4 rounded-xl transition-all duration-300 font-medium relative ${
                    hasVoted || showResults
                      ? selectedAnswer === answer.id
                        ? 'bg-red-600 text-white scale-110 shadow-xl'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : isSubmittingVote
                      ? selectedAnswer === answer.id
                        ? 'bg-red-700 text-white scale-105'
                        : 'bg-red-400 text-red-200 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700 hover:scale-105'
                  }`}
                >
                  {isSubmittingVote && selectedAnswer === answer.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Vote en cours...
                    </div>
                  ) : (
                    answer.text
                  )}
                </button>
                
                {showResults && (
                  <div className="mt-3">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-white font-bold text-lg">
                        {getAnswerStats(answer.id).percentage}%
                      </span>
                      <span className="text-gray-300 text-sm">
                        ({getAnswerStats(answer.id).votes} votes)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {showResults && (
            <div className="text-center mt-8">
              <div className="p-6">
                <p className="text-gray-300 text-lg">
                  {hasVoted ? 'Vous avez déjà voté !' : 'Merci pour votre participation !'}
                </p>
                <p className="text-gray-400 mt-2">
                  {stats?.totalVotes || 0} votes au total
                </p>
                <p className="text-gray-400 mt-1">
                  Revenez demain pour une nouvelle question
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
            <Footer />
      </div>
    </ProtectedRoute>
  );
}
