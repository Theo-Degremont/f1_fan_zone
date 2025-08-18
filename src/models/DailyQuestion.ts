export interface DailyQuestion {
  _id: string;
  questions: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4?: string | null;
  date: string;
  is_active: boolean;
  created_at: string;
  __v: number;
}

export interface DailyQuestionStats {
  votes: {
    answer1: number;
    answer2: number;
    answer3: number;
    answer4: number;
  };
  percentages: {
    answer1: number;
    answer2: number;
    answer3: number;
    answer4: number;
  };
  totalVotes: number;
  date: string;
}

export interface MyAnswerResponse {
  hasVoted: boolean;
  question: DailyQuestion;
  userAnswer: UserAnswer | null;
  stats: DailyQuestionStats;
  message: string;
}

export interface MyAnswerResponseWrapper {
  success: boolean;
  data?: MyAnswerResponse;
  message?: string;
}

export interface AnswerVoteRequest {
  id_question: string;
  answer: number;
}

export interface AnswerVoteResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export interface UserAnswer {
  _id: string;
  userId: number;
  questionId: string;
  answer: number;
  created_at: string;
}
