import { Difficulty, GrammarPoint, Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    sentence: "______ tired, she still finished the report.",
    options: [
      { id: '1a', text: 'Although', isCorrect: true },
      { id: '1b', text: 'Because', isCorrect: false },
      { id: '1c', text: 'Unless', isCorrect: false },
      { id: '1d', text: 'Since', isCorrect: false }
    ],
    correctAnswer: 'Although',
    explanation: {
      rule: "Although 引导让步状语从句，表示“尽管”。句子前后存在转折关系：尽管累，但还是完成了报告。",
      example: "Although it was raining, they went out for a walk.",
      commonMistake: "容易误用 Because。Because 表示原因，而此处语义是转折而非因果。"
    },
    difficulty: Difficulty.BEGINNER,
    category: GrammarPoint.ADVERBIAL_CLAUSE
  },
  {
    id: 2,
    sentence: "The boy ______ is wearing a red hat is my brother.",
    options: [
      { id: '2a', text: 'which', isCorrect: false },
      { id: '2b', text: 'who', isCorrect: true },
      { id: '2c', text: 'whom', isCorrect: false },
      { id: '2d', text: 'whose', isCorrect: false }
    ],
    correctAnswer: 'who',
    explanation: {
      rule: "who 引导定语从句，先行词是人（The boy），且在从句中作主语。",
      example: "The girl who is dancing is my sister.",
      commonMistake: "误用 which。which 的先行词通常是物。"
    },
    difficulty: Difficulty.BEGINNER,
    category: GrammarPoint.RELATIVE_CLAUSE
  },
  {
    id: 3,
    sentence: "______ the homework, he went out to play football.",
    options: [
      { id: '3a', text: 'Finish', isCorrect: false },
      { id: '3b', text: 'Finished', isCorrect: false },
      { id: '3c', text: 'Having finished', isCorrect: true },
      { id: '3d', text: 'To finish', isCorrect: false }
    ],
    correctAnswer: 'Having finished',
    explanation: {
      rule: "非谓语动词作时间状语。Having finished 是现在分词的完成式，表示该动作发生在主句动作（went out）之前。",
      example: "Having seen the film, I don't want to see it again.",
      commonMistake: "误用 Finished。Finished 表示被动或完成，但此处主语 he 与 finish 是主动关系。"
    },
    difficulty: Difficulty.ADVANCED,
    category: GrammarPoint.NON_FINITE_VERB
  },
  {
    id: 4,
    sentence: "This is the house ______ I lived ten years ago.",
    options: [
      { id: '4a', text: 'which', isCorrect: false },
      { id: '4b', text: 'that', isCorrect: false },
      { id: '4c', text: 'where', isCorrect: true },
      { id: '4d', text: 'when', isCorrect: false }
    ],
    correctAnswer: 'where',
    explanation: {
      rule: "where 引导定语从句，在从句中作地点状语（相当于 in which）。",
      example: "The city where I was born is very beautiful.",
      commonMistake: "误用 which。如果用 which，从句应为 which I lived in。"
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarPoint.RELATIVE_CLAUSE
  },
  {
    id: 5,
    sentence: "Weather ______, we will go for a picnic this Sunday.",
    options: [
      { id: '5a', text: 'permits', isCorrect: false },
      { id: '5b', text: 'permitting', isCorrect: true },
      { id: '5c', text: 'permitted', isCorrect: false },
      { id: '5d', text: 'to permit', isCorrect: false }
    ],
    correctAnswer: 'permitting',
    explanation: {
      rule: "独立主格结构。Weather 与 permit 是主动关系，且表示条件或伴随，使用现在分词 permitting。",
      example: "Time permitting, I'll visit the Great Wall.",
      commonMistake: "误用 permits。如果用 permits，前面需要加连词 If (If weather permits)。"
    },
    difficulty: Difficulty.ADVANCED,
    category: GrammarPoint.ABSOLUTE_CONSTRUCTION
  },
  {
    id: 6,
    sentence: "I don't know ______ he will come or not.",
    options: [
      { id: '6a', text: 'if', isCorrect: false },
      { id: '6b', text: 'whether', isCorrect: true },
      { id: '6c', text: 'that', isCorrect: false },
      { id: '6d', text: 'what', isCorrect: false }
    ],
    correctAnswer: 'whether',
    explanation: {
      rule: "whether...or not 是固定搭配，引导宾语从句。虽然 if 也可以引导宾语从句，但在直接跟 or not 时只能用 whether。",
      example: "I wonder whether it will rain or not.",
      commonMistake: "误用 if。if 不能直接与 or not 连用。"
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarPoint.CONJUNCTION
  },
  {
    id: 7,
    sentence: "The news ______ our team won the game excited us all.",
    options: [
      { id: '7a', text: 'which', isCorrect: false },
      { id: '7b', text: 'that', isCorrect: true },
      { id: '7c', text: 'what', isCorrect: false },
      { id: '7d', text: 'whose', isCorrect: false }
    ],
    correctAnswer: 'that',
    explanation: {
      rule: "that 引导同位语从句，解释说明 The news 的具体内容。that 在从句中不作成分，只起连接作用。",
      example: "The fact that he failed the exam surprised me.",
      commonMistake: "误用 which。which 引导定语从句时在从句中需作主语或宾语，而此处从句成分完整。"
    },
    difficulty: Difficulty.ADVANCED,
    category: GrammarPoint.RELATIVE_CLAUSE
  },
  {
    id: 8,
    sentence: "You won't pass the exam ______ you work hard.",
    options: [
      { id: '8a', text: 'if', isCorrect: false },
      { id: '8b', text: 'unless', isCorrect: true },
      { id: '8c', text: 'because', isCorrect: false },
      { id: '8d', text: 'since', isCorrect: false }
    ],
    correctAnswer: 'unless',
    explanation: {
      rule: "unless 引导条件状语从句，相当于 if...not。语义为“除非你努力，否则你不会通过考试”。",
      example: "I won't go unless you come with me.",
      commonMistake: "误用 if。如果用 if，句子应为 if you don't work hard。"
    },
    difficulty: Difficulty.BEGINNER,
    category: GrammarPoint.ADVERBIAL_CLAUSE
  },
  {
    id: 9,
    sentence: "He is the only student ______ can solve the problem.",
    options: [
      { id: '9a', text: 'who', isCorrect: false },
      { id: '9b', text: 'which', isCorrect: false },
      { id: '9c', text: 'that', isCorrect: true },
      { id: '9d', text: 'whom', isCorrect: false }
    ],
    correctAnswer: 'that',
    explanation: {
      rule: "当先行词被 the only, the very, the last 等修饰时，定语从句的引导词优先使用 that 而非 who。",
      example: "This is the very book that I am looking for.",
      commonMistake: "习惯性使用 who。虽然先行词是人，但有 the only 修饰时 that 更佳。"
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarPoint.RELATIVE_CLAUSE
  },
  {
    id: 10,
    sentence: "______ by the teacher, the student felt very happy.",
    options: [
      { id: '10a', text: 'Praising', isCorrect: false },
      { id: '10b', text: 'Praised', isCorrect: true },
      { id: '10c', text: 'To praise', isCorrect: false },
      { id: '10d', text: 'Praise', isCorrect: false }
    ],
    correctAnswer: 'Praised',
    explanation: {
      rule: "过去分词作状语。The student 与 praise 是被动关系（被老师表扬），因此用过去分词 Praised。",
      example: "Seen from the hill, the city looks beautiful.",
      commonMistake: "误用 Praising。现在分词表示主动关系。"
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarPoint.NON_FINITE_VERB
  }
];
