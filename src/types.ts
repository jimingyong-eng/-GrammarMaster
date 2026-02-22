export enum Difficulty {
  BEGINNER = '初级',
  INTERMEDIATE = '中级',
  ADVANCED = '高级'
}

export enum GrammarPoint {
  RELATIVE_CLAUSE = '定语从句',
  ADVERBIAL_CLAUSE = '状语从句',
  NON_FINITE_VERB = '非谓语动词',
  CONJUNCTION = '连词',
  ABSOLUTE_CONSTRUCTION = '独立主格',
  PRONOUN = '代词',
  TENSE = '时态'
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  sentence: string; // Use "____" for blanks
  options: Option[];
  correctAnswer: string;
  explanation: {
    rule: string;
    example: string;
    commonMistake: string;
  };
  difficulty: Difficulty;
  category: GrammarPoint;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string>; // questionId -> selectedText
  isSubmitted: boolean;
  score: number;
  showExplanation: boolean;
}
