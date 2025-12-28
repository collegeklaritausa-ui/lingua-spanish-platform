import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  BookOpen, 
  Clock, 
  Volume2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Globe,
  GraduationCap,
  Brain,
  Target,
  Play,
  ChevronRight,
  Star,
  Trophy
} from "lucide-react";

type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

const levelColors: Record<CEFRLevel, string> = {
  A1: 'bg-green-500',
  A2: 'bg-green-600',
  B1: 'bg-blue-500',
  B2: 'bg-blue-600',
  C1: 'bg-purple-500',
  C2: 'bg-purple-600',
};

const levelGradients: Record<CEFRLevel, string> = {
  A1: 'from-green-500 to-emerald-600',
  A2: 'from-green-600 to-teal-600',
  B1: 'from-blue-500 to-cyan-600',
  B2: 'from-blue-600 to-indigo-600',
  C1: 'from-purple-500 to-violet-600',
  C2: 'from-purple-600 to-pink-600',
};

interface VocabularyItem {
  spanish: string;
  english: string;
  pronunciation: string;
  pos: string;
  example_es: string;
  example_en: string;
}

interface Exercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'translation' | 'matching';
  question: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
  points: number;
}

export default function LessonDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('content');
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  // Fetch lesson data
  const { data: lesson, isLoading, error } = trpc.curriculum.getLessonBySlug.useQuery(
    { slug: slug || '' },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur border-white/20 max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Lesson Not Found</h2>
            <p className="text-gray-400 mb-6">The lesson you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => setLocation('/curriculum')} className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Curriculum
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswerSelect = (exerciseId: string, answer: string) => {
    setExerciseAnswers(prev => ({ ...prev, [exerciseId]: answer }));
  };

  const checkAnswer = (exercise: Exercise) => {
    const userAnswer = exerciseAnswers[exercise.id];
    return userAnswer?.toLowerCase().trim() === exercise.correct_answer.toLowerCase().trim();
  };

  const calculateScore = () => {
    let correct = 0;
    let total = lesson.exercises.length;
    lesson.exercises.forEach((ex: Exercise) => {
      if (checkAnswer(ex)) correct++;
    });
    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  const handleSubmitExercises = () => {
    setShowResults(true);
    lesson.exercises.forEach((ex: Exercise) => {
      setCompletedExercises(prev => new Set(Array.from(prev).concat(ex.id)));
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${levelGradients[lesson.cefr_level as CEFRLevel]} py-8`}>
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/curriculum')}
            className="text-white/80 hover:text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Curriculum
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-white/20 text-white border-0 text-lg px-3 py-1">
                  {lesson.cefr_level}
                </Badge>
                <Badge variant="outline" className="text-white/80 border-white/30">
                  {lesson.category.replace(/_/g, ' ')}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {lesson.title_en}
              </h1>
              <p className="text-xl text-white/80 italic">{lesson.title_es}</p>
            </div>
            
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{lesson.estimated_minutes} min</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{lesson.vocabulary.length} words</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>{lesson.exercises.length} exercises</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 gap-2 bg-white/10 p-1 rounded-lg mb-8">
            <TabsTrigger value="content" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
              <BookOpen className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="vocabulary" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
              <Brain className="w-4 h-4 mr-2" />
              Vocabulary
            </TabsTrigger>
            <TabsTrigger value="grammar" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
              <GraduationCap className="w-4 h-4 mr-2" />
              Grammar
            </TabsTrigger>
            <TabsTrigger value="exercises" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
              <Target className="w-4 h-4 mr-2" />
              Exercises
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      About This Lesson
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{lesson.description_en}</p>
                    <p className="text-gray-400 italic">{lesson.description_es}</p>
                  </CardContent>
                </Card>

                {/* Learning Objectives */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-400" />
                      Learning Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {lesson.objectives.map((objective: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Cultural Note */}
                <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-amber-400" />
                      Cultural Note
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200">{lesson.cultural_note}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Lesson Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Vocabulary</span>
                        <span>0/{lesson.vocabulary.length}</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Exercises</span>
                        <span>{completedExercises.size}/{lesson.exercises.length}</span>
                      </div>
                      <Progress value={(completedExercises.size / lesson.exercises.length) * 100} className="h-2" />
                    </div>
                    <Separator className="bg-white/10" />
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setActiveTab('exercises')}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Exercises
                    </Button>
                  </CardContent>
                </Card>

                {/* Grammar Preview */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Grammar Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {lesson.grammar_points.slice(0, 3).map((point: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {lesson.grammar_points.length > 3 && (
                      <Button variant="link" className="text-purple-400 p-0 mt-2" onClick={() => setActiveTab('grammar')}>
                        View all {lesson.grammar_points.length} points
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Vocabulary Tab */}
          <TabsContent value="vocabulary">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lesson.vocabulary.map((vocab: VocabularyItem, idx: number) => (
                <Card key={idx} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white">{vocab.spanish}</h3>
                        <p className="text-purple-400">{vocab.pronunciation}</p>
                      </div>
                      <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs">
                        {vocab.pos}
                      </Badge>
                    </div>
                    <p className="text-gray-300 font-medium mb-3">{vocab.english}</p>
                    <Separator className="bg-white/10 mb-3" />
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-400">
                        <span className="text-purple-400">ES:</span> {vocab.example_es}
                      </p>
                      <p className="text-gray-500">
                        <span className="text-blue-400">EN:</span> {vocab.example_en}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="mt-3 text-gray-400 hover:text-white p-0">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Grammar Tab */}
          <TabsContent value="grammar">
            <div className="space-y-4">
              {lesson.grammar_points.map((point: string, idx: number) => (
                <Card key={idx} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{idx + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{point}</h3>
                        <p className="text-gray-400">
                          Master this grammar concept through practice in the exercises section.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises">
            {showResults && (
              <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Trophy className="w-12 h-12 text-yellow-400" />
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {calculateScore().percentage}% Complete!
                        </h3>
                        <p className="text-gray-300">
                          You got {calculateScore().correct} out of {calculateScore().total} correct
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        setShowResults(false);
                        setExerciseAnswers({});
                        setCompletedExercises(new Set());
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {lesson.exercises.map((exercise: Exercise, idx: number) => (
                <Card key={exercise.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm">
                          {idx + 1}
                        </span>
                        {exercise.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </CardTitle>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-0">
                        {exercise.points} pts
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400 text-lg mt-2">
                      {exercise.question}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {exercise.type === 'multiple_choice' && exercise.options && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exercise.options.map((option, optIdx) => {
                          const isSelected = exerciseAnswers[exercise.id] === option;
                          const isCorrect = option.toLowerCase().trim() === exercise.correct_answer.toLowerCase().trim();
                          const showCorrectness = showResults && isSelected;
                          
                          return (
                            <Button
                              key={optIdx}
                              variant="outline"
                              className={`
                                justify-start h-auto py-3 px-4 text-left
                                ${isSelected ? 'border-purple-500 bg-purple-500/20' : 'border-white/20 bg-white/5'}
                                ${showResults && isCorrect ? 'border-green-500 bg-green-500/20' : ''}
                                ${showCorrectness && !isCorrect ? 'border-red-500 bg-red-500/20' : ''}
                                text-gray-200 hover:bg-white/10
                              `}
                              onClick={() => !showResults && handleAnswerSelect(exercise.id, option)}
                              disabled={showResults}
                            >
                              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center mr-3 flex-shrink-0">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              {option}
                              {showResults && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto" />}
                              {showCorrectness && !isCorrect && <XCircle className="w-5 h-5 text-red-400 ml-auto" />}
                            </Button>
                          );
                        })}
                      </div>
                    )}

                    {(exercise.type === 'fill_blank' || exercise.type === 'translation') && (
                      <div>
                        <input
                          type="text"
                          placeholder="Type your answer..."
                          value={exerciseAnswers[exercise.id] || ''}
                          onChange={(e) => handleAnswerSelect(exercise.id, e.target.value)}
                          disabled={showResults}
                          className={`
                            w-full px-4 py-3 rounded-lg bg-white/10 border text-white placeholder:text-gray-500
                            ${showResults && checkAnswer(exercise) ? 'border-green-500' : ''}
                            ${showResults && !checkAnswer(exercise) ? 'border-red-500' : 'border-white/20'}
                          `}
                        />
                        {showResults && !checkAnswer(exercise) && (
                          <p className="text-green-400 mt-2">
                            Correct answer: {exercise.correct_answer}
                          </p>
                        )}
                      </div>
                    )}

                    {showResults && (
                      <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <p className="text-blue-300 flex items-start gap-2">
                          <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          {exercise.explanation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {!showResults && (
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleSubmitExercises}
                    disabled={Object.keys(exerciseAnswers).length < lesson.exercises.length}
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Submit Answers ({Object.keys(exerciseAnswers).length}/{lesson.exercises.length})
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
