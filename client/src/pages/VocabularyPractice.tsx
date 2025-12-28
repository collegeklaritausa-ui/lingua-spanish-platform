import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  RotateCcw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Shuffle,
  BookOpen,
  Brain,
  Trophy,
  Star,
  Zap,
  Target,
  Flame
} from "lucide-react";

type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface VocabularyItem {
  spanish: string;
  english: string;
  pronunciation: string;
  pos: string;
  example_es: string;
  example_en: string;
  lessonId?: string;
}

const levelColors: Record<CEFRLevel, string> = {
  A1: 'from-green-500 to-emerald-600',
  A2: 'from-green-600 to-teal-600',
  B1: 'from-blue-500 to-cyan-600',
  B2: 'from-blue-600 to-indigo-600',
  C1: 'from-purple-500 to-violet-600',
  C2: 'from-purple-600 to-pink-600',
};

export default function VocabularyPractice() {
  const [, setLocation] = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [learningCards, setLearningCards] = useState<Set<number>>(new Set());
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, streak: 0, bestStreak: 0 });
  const [mode, setMode] = useState<'browse' | 'quiz'>('browse');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);

  // Fetch lessons for selected level
  const { data: lessonsData, isLoading } = trpc.curriculum.getLessonsByLevel.useQuery({
    level: selectedLevel,
    page: 1,
    pageSize: 50,
  });

  // For vocabulary, we'll use the first few lessons
  const firstLessonSlug = lessonsData?.lessons?.[0]?.slug || '';
  const { data: firstLesson } = trpc.curriculum.getLessonBySlug.useQuery(
    { slug: firstLessonSlug },
    { enabled: !!firstLessonSlug }
  );
  
  const secondLessonSlug = lessonsData?.lessons?.[1]?.slug || '';
  const { data: secondLesson } = trpc.curriculum.getLessonBySlug.useQuery(
    { slug: secondLessonSlug },
    { enabled: !!secondLessonSlug }
  );
  
  const thirdLessonSlug = lessonsData?.lessons?.[2]?.slug || '';
  const { data: thirdLesson } = trpc.curriculum.getLessonBySlug.useQuery(
    { slug: thirdLessonSlug },
    { enabled: !!thirdLessonSlug }
  );

  // Extract vocabulary from lessons
  useEffect(() => {
    const allVocab: VocabularyItem[] = [];
    [firstLesson, secondLesson, thirdLesson].forEach(lesson => {
      if (lesson?.vocabulary) {
        lesson.vocabulary.forEach((v: VocabularyItem) => {
          allVocab.push({ ...v, lessonId: lesson.id });
        });
      }
    });
    if (allVocab.length > 0) {
      setVocabulary(allVocab);
      setCurrentIndex(0);
      setIsFlipped(false);
      setKnownCards(new Set());
      setLearningCards(new Set());
    }
  }, [firstLesson, secondLesson, thirdLesson]);

  const shuffleVocabulary = useCallback(() => {
    setVocabulary(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const generateQuizOptions = useCallback((correctAnswer: string) => {
    const options = [correctAnswer];
    const otherWords = vocabulary
      .filter(v => v.english !== correctAnswer)
      .map(v => v.english);
    
    while (options.length < 4 && otherWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherWords.length);
      const word = otherWords.splice(randomIndex, 1)[0];
      if (!options.includes(word)) {
        options.push(word);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  }, [vocabulary]);

  useEffect(() => {
    if (mode === 'quiz' && vocabulary[currentIndex]) {
      setQuizOptions(generateQuizOptions(vocabulary[currentIndex].english));
      setQuizAnswer(null);
    }
  }, [currentIndex, mode, vocabulary, generateQuizOptions]);

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setQuizAnswer(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
      setQuizAnswer(null);
    }
  };

  const handleKnown = () => {
    setKnownCards(prev => new Set(Array.from(prev).concat(currentIndex)));
    setLearningCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentIndex);
      return newSet;
    });
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + 1,
      streak: prev.streak + 1,
      bestStreak: Math.max(prev.bestStreak, prev.streak + 1)
    }));
    handleNext();
  };

  const handleLearning = () => {
    setLearningCards(prev => new Set(Array.from(prev).concat(currentIndex)));
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentIndex);
      return newSet;
    });
    setSessionStats(prev => ({
      ...prev,
      incorrect: prev.incorrect + 1,
      streak: 0
    }));
    handleNext();
  };

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
    const isCorrect = answer === vocabulary[currentIndex].english;
    if (isCorrect) {
      setSessionStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        streak: prev.streak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.streak + 1)
      }));
      setKnownCards(prev => new Set(Array.from(prev).concat(currentIndex)));
    } else {
      setSessionStats(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        streak: 0
      }));
      setLearningCards(prev => new Set(Array.from(prev).concat(currentIndex)));
    }
  };

  const currentCard = vocabulary[currentIndex];
  const progress = vocabulary.length > 0 ? ((currentIndex + 1) / vocabulary.length) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading vocabulary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/curriculum')}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center gap-4">
              <Select value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as CEFRLevel)}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[]).map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex bg-white/10 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMode('browse')}
                  className={`${mode === 'browse' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMode('quiz')}
                  className={`${mode === 'quiz' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">{vocabulary.length}</div>
                <div className="text-gray-400 text-sm">Total Words</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center gap-3">
              <Check className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-white">{knownCards.size}</div>
                <div className="text-gray-400 text-sm">Known</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center gap-3">
              <Target className="w-8 h-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">{learningCards.size}</div>
                <div className="text-gray-400 text-sm">Learning</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-400" />
              <div>
                <div className="text-2xl font-bold text-white">{sessionStats.streak}</div>
                <div className="text-gray-400 text-sm">Streak</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-white">{sessionStats.bestStreak}</div>
                <div className="text-gray-400 text-sm">Best Streak</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{currentIndex + 1} / {vocabulary.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard Area */}
        {currentCard ? (
          <div className="max-w-2xl mx-auto">
            {mode === 'browse' ? (
              /* Browse Mode - Flashcard */
              <div 
                className="relative h-96 cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className={`
                  absolute inset-0 transition-transform duration-500 transform-style-preserve-3d
                  ${isFlipped ? 'rotate-y-180' : ''}
                `}>
                  {/* Front of card */}
                  <Card className={`
                    absolute inset-0 backface-hidden
                    bg-gradient-to-br ${levelColors[selectedLevel]} border-0
                  `}>
                    <CardContent className="h-full flex flex-col items-center justify-center p-8">
                      <Badge className="bg-white/20 text-white border-0 mb-4">{currentCard.pos}</Badge>
                      <h2 className="text-5xl font-bold text-white mb-4">{currentCard.spanish}</h2>
                      <p className="text-2xl text-white/80">{currentCard.pronunciation}</p>
                      <Button variant="ghost" className="mt-6 text-white/80 hover:text-white hover:bg-white/10">
                        <Volume2 className="w-6 h-6 mr-2" />
                        Listen
                      </Button>
                      <p className="absolute bottom-4 text-white/50 text-sm">Click to flip</p>
                    </CardContent>
                  </Card>

                  {/* Back of card */}
                  <Card className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-800 border-white/20">
                    <CardContent className="h-full flex flex-col items-center justify-center p-8">
                      <h2 className="text-4xl font-bold text-white mb-6">{currentCard.english}</h2>
                      <div className="w-full max-w-md space-y-4 text-center">
                        <div className="p-4 rounded-lg bg-purple-500/20 border border-purple-500/30">
                          <p className="text-purple-300 mb-1">Spanish Example:</p>
                          <p className="text-white">{currentCard.example_es}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-blue-500/20 border border-blue-500/30">
                          <p className="text-blue-300 mb-1">English Translation:</p>
                          <p className="text-white">{currentCard.example_en}</p>
                        </div>
                      </div>
                      <p className="absolute bottom-4 text-gray-500 text-sm">Click to flip back</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              /* Quiz Mode */
              <Card className="bg-slate-800 border-white/20">
                <CardHeader className="text-center">
                  <Badge className={`bg-gradient-to-r ${levelColors[selectedLevel]} text-white border-0 w-fit mx-auto mb-2`}>
                    {currentCard.pos}
                  </Badge>
                  <CardTitle className="text-4xl text-white">{currentCard.spanish}</CardTitle>
                  <p className="text-xl text-gray-400">{currentCard.pronunciation}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-center text-gray-400 mb-6">What does this word mean?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quizOptions.map((option, idx) => {
                      const isCorrect = option === currentCard.english;
                      const isSelected = quizAnswer === option;
                      const showResult = quizAnswer !== null;
                      
                      return (
                        <Button
                          key={idx}
                          variant="outline"
                          className={`
                            h-auto py-4 px-6 text-lg justify-start
                            ${!showResult ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : ''}
                            ${showResult && isCorrect ? 'border-green-500 bg-green-500/20 text-green-300' : ''}
                            ${showResult && isSelected && !isCorrect ? 'border-red-500 bg-red-500/20 text-red-300' : ''}
                            ${showResult && !isSelected && !isCorrect ? 'border-white/10 bg-white/5 text-gray-500' : ''}
                          `}
                          onClick={() => !quizAnswer && handleQuizAnswer(option)}
                          disabled={!!quizAnswer}
                        >
                          <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center mr-3 flex-shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {option}
                          {showResult && isCorrect && <Check className="w-5 h-5 ml-auto" />}
                          {showResult && isSelected && !isCorrect && <X className="w-5 h-5 ml-auto" />}
                        </Button>
                      );
                    })}
                  </div>
                  
                  {quizAnswer && (
                    <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <p className="text-blue-300 mb-2">Example:</p>
                      <p className="text-white">{currentCard.example_es}</p>
                      <p className="text-gray-400 mt-1">{currentCard.example_en}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              {mode === 'browse' && (
                <div className="flex gap-3">
                  <Button
                    onClick={handleLearning}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Still Learning
                  </Button>
                  <Button
                    onClick={handleKnown}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    I Know This
                  </Button>
                </div>
              )}

              {mode === 'quiz' && quizAnswer && (
                <Button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Next Word
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentIndex === vocabulary.length - 1}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={shuffleVocabulary}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Shuffle
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentIndex(0);
                  setIsFlipped(false);
                  setKnownCards(new Set());
                  setLearningCards(new Set());
                  setSessionStats({ correct: 0, incorrect: 0, streak: 0, bestStreak: 0 });
                }}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        ) : (
          <Card className="max-w-md mx-auto bg-white/10 border-white/20">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Vocabulary Found</h3>
              <p className="text-gray-400">Select a different level to load vocabulary words.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* CSS for 3D flip effect */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
