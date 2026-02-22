/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  Filter,
  Info,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { questions } from './data/questions';
import { Difficulty, GrammarPoint, Question } from './types';

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<GrammarPoint | 'All'>('All');
  const [quizFinished, setQuizFinished] = useState(false);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const diffMatch = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      const catMatch = categoryFilter === 'All' || q.category === categoryFilter;
      return diffMatch && catMatch;
    });
  }, [difficultyFilter, categoryFilter]);

  const currentQuestion = filteredQuestions[currentIdx];

  const handleSelect = (answer: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleSubmit = () => {
    if (!selectedAnswers[currentQuestion.id]) return;
    setIsSubmitted(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setIsSubmitted(false);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const score = useMemo(() => {
    return Object.entries(selectedAnswers).reduce((acc, [id, ans]) => {
      const q = questions.find(q => q.id === Number(id));
      return q?.correctAnswer === ans ? acc + 1 : acc;
    }, 0);
  }, [selectedAnswers]);

  const getEncouragement = (score: number, total: number) => {
    const ratio = score / total;
    if (ratio === 1) return "太棒了！你是语法大师！🌟";
    if (ratio >= 0.8) return "非常出色！继续保持！👏";
    if (ratio >= 0.6) return "做得不错！再接再厉！💪";
    return "别灰心，多练习一定会进步的！📚";
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-md">
          <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">没有找到匹配的题目</h2>
          <p className="text-gray-500 mb-6">尝试更换筛选条件或重置过滤器。</p>
          <button 
            onClick={() => { setDifficultyFilter('All'); setCategoryFilter('All'); }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            重置过滤器
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">GrammarMaster</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold">{score}/{filteredQuestions.length}</span>
            </div>
            <button 
              onClick={handleReset}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              title="重新开始"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!quizFinished ? (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                <Filter className="w-4 h-4 text-slate-400" />
                <select 
                  value={difficultyFilter} 
                  onChange={(e) => { setDifficultyFilter(e.target.value as any); setCurrentIdx(0); setIsSubmitted(false); }}
                  className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
                >
                  <option value="All">所有难度</option>
                  {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <select 
                  value={categoryFilter} 
                  onChange={(e) => { setCategoryFilter(e.target.value as any); setCurrentIdx(0); setIsSubmitted(false); }}
                  className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
                >
                  <option value="All">所有语法点</option>
                  {Object.values(GrammarPoint).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    Question {currentIdx + 1}
                  </span>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      currentQuestion.difficulty === Difficulty.BEGINNER ? 'bg-emerald-50 text-emerald-700' :
                      currentQuestion.difficulty === Difficulty.INTERMEDIATE ? 'bg-amber-50 text-amber-700' :
                      'bg-rose-50 text-rose-700'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                      {currentQuestion.category}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-medium leading-relaxed mb-10 text-slate-800">
                  {currentQuestion.sentence.split('______').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`inline-block min-w-[120px] border-b-2 mx-2 text-center transition-all ${
                          isSubmitted 
                            ? (selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer ? 'text-emerald-600 border-emerald-600' : 'text-rose-600 border-rose-600')
                            : (selectedAnswers[currentQuestion.id] ? 'text-indigo-600 border-indigo-600' : 'border-slate-300')
                        }`}>
                          {selectedAnswers[currentQuestion.id] || '____'}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.text)}
                      disabled={isSubmitted}
                      className={`p-4 rounded-2xl text-left font-medium transition-all border-2 flex items-center justify-between ${
                        selectedAnswers[currentQuestion.id] === option.text
                          ? isSubmitted
                            ? option.isCorrect 
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                              : 'bg-rose-50 border-rose-500 text-rose-700'
                            : 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : isSubmitted && option.isCorrect
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-white border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>{option.text}</span>
                      {isSubmitted && option.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {isSubmitted && selectedAnswers[currentQuestion.id] === option.text && !option.isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end">
                  {!isSubmitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedAnswers[currentQuestion.id]}
                      className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
                    >
                      提交答案
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      {currentIdx === filteredQuestions.length - 1 ? '查看结果' : '下一题'}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Explanation Card */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 text-indigo-600">
                      <Info className="w-6 h-6" />
                      <h3 className="text-xl font-bold">详解卡片</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <section>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">语法规则</h4>
                        <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.rule}</p>
                      </section>
                      
                      <section className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">典型例句</h4>
                        <p className="text-slate-800 italic font-medium">"{currentQuestion.explanation.example}"</p>
                      </section>

                      <section>
                        <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-2">常见错误辨析</h4>
                        <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.commonMistake}</p>
                      </section>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm text-slate-500">想要深入学习？</span>
                        <a 
                          href="https://www.bing.com/search?q=english+grammar+learning" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline"
                        >
                          推荐复习链接 <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Final Results */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] p-12 shadow-xl border border-slate-100 text-center max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Trophy className="w-12 h-12 text-amber-500" />
            </div>
            
            <h2 className="text-4xl font-black mb-4 text-slate-900">练习完成！</h2>
            <p className="text-xl text-slate-500 mb-10">{getEncouragement(score, filteredQuestions.length)}</p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="text-4xl font-black text-indigo-600 mb-1">{score}</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">正确题数</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="text-4xl font-black text-slate-900 mb-1">{Math.round((score / filteredQuestions.length) * 100)}%</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">准确率</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleReset}
                className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                再练一次
              </button>
              <button 
                onClick={() => { setDifficultyFilter('All'); setCategoryFilter('All'); handleReset(); }}
                className="px-10 py-5 bg-slate-100 text-slate-900 rounded-2xl font-black hover:bg-slate-200 transition-all"
              >
                挑战其他题型
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-400 text-sm">
          © 2026 GrammarMaster - 专为初中生打造的语法练习平台
        </p>
      </footer>
    </div>
  );
}
