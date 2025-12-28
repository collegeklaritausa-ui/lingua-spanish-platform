
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  BookOpen, 
  Clock, 
  ChevronRight,
  Star,
  Trophy,
  Target,
  Zap,
  Lock,
  CheckCircle2
} from "lucide-react";

type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface LevelData {
  code: CEFRLevel;
  name: string;
  spanishName: string;
  description: string;
  detailedDescription: string;
  skills: string[];
  topics: string[];
  estimatedHours: number;
  lessonCount: number;
  gradient: string;
  icon: string;
}

const levelData: LevelData[] = [
  {
    code: 'A1',
    name: 'Breakthrough',
    spanishName: 'Principiante',
    description: 'Basic phrases and everyday expressions',
    detailedDescription: 'Can understand and use familiar everyday expressions and very basic phrases. Can introduce themselves and others, ask and answer questions about personal details.',
    skills: ['Introduce yourself', 'Basic greetings', 'Numbers & colors', 'Simple questions'],
    topics: ['Greetings', 'Numbers', 'Colors', 'Family', 'Food', 'Time'],
    estimatedHours: 80,
    lessonCount: 2000,
    gradient: 'from-green-500 to-emerald-600',
    icon: '🌱'
  },
  {
    code: 'A2',
    name: 'Waystage',
    spanishName: 'Elemental',
    description: 'Simple, routine tasks and direct exchanges',
    detailedDescription: 'Can understand sentences and frequently used expressions. Can communicate in simple and routine tasks requiring direct exchange of information on familiar matters.',
    skills: ['Daily routines', 'Past experiences', 'Travel basics', 'Shopping & dining'],
    topics: ['Daily Routines', 'Travel', 'Shopping', 'Health', 'Emotions', 'Transport'],
    estimatedHours: 100,
    lessonCount: 2000,
    gradient: 'from-green-600 to-teal-600',
    icon: '🌿'
  },
  {
    code: 'B1',
    name: 'Threshold',
    spanishName: 'Intermedio',
    description: 'Main points on familiar matters',
    detailedDescription: 'Can understand the main points of clear standard input on familiar matters. Can deal with most situations likely to arise while traveling.',
    skills: ['Express opinions', 'Describe experiences', 'Handle travel', 'Discuss work'],
    topics: ['Opinions', 'Subjunctive Intro', 'Work', 'Education', 'Environment', 'Culture'],
    estimatedHours: 150,
    lessonCount: 1800,
    gradient: 'from-blue-500 to-cyan-600',
    icon: '🌳'
  },
  {
    code: 'B2',
    name: 'Vantage',
    spanishName: 'Intermedio Alto',
    description: 'Complex texts and abstract topics',
    detailedDescription: 'Can understand the main ideas of complex text on both concrete and abstract topics. Can interact with a degree of fluency and spontaneity.',
    skills: ['Debate topics', 'Understand news', 'Write essays', 'Professional communication'],
    topics: ['Subjunctive Advanced', 'Debates', 'Politics', 'Economics', 'Arts', 'Idioms'],
    estimatedHours: 200,
    lessonCount: 1700,
    gradient: 'from-blue-600 to-indigo-600',
    icon: '🌲'
  },
  {
    code: 'C1',
    name: 'Effective Proficiency',
    spanishName: 'Avanzado',
    description: 'Demanding texts and implicit meaning',
    detailedDescription: 'Can understand a wide range of demanding, longer texts, and recognize implicit meaning. Can express ideas fluently and spontaneously.',
    skills: ['Academic writing', 'Professional contexts', 'Nuanced expression', 'Cultural references'],
    topics: ['Professional Spanish', 'Legal', 'Medical', 'Philosophy', 'Dialects', 'Translation'],
    estimatedHours: 250,
    lessonCount: 1500,
    gradient: 'from-purple-500 to-violet-600',
    icon: '🏔️'
  },
  {
    code: 'C2',
    name: 'Mastery',
    spanishName: 'Maestría',
    description: 'Near-native fluency and precision',
    detailedDescription: 'Can understand with ease virtually everything heard or read. Can summarize information from different sources, reconstructing arguments in a coherent presentation.',
    skills: ['Literary analysis', 'Philosophical discourse', 'Native-like idioms', 'Any domain'],
    topics: ['Literary Analysis', 'Legal Advanced', 'Interpretation', 'Historical Texts', 'Academic Publishing'],
    estimatedHours: 300,
    lessonCount: 1000,
    gradient: 'from-purple-600 to-pink-600',
    icon: '🏆'
  }
];

// Mock user progress (would come from backend)
const mockProgress: Record<CEFRLevel, number> = {
  A1: 100,
  A2: 85,
  B1: 42,
  B2: 0,
  C1: 0,
  C2: 0
};

export default function LevelSelector() {
  const [, setLocation] = useLocation();

  // Fetch curriculum stats
  const { data: stats } = trpc.curriculum.getStats.useQuery();

  // Fetch levels info
  const { data: levels } = trpc.curriculum.getLevels.useQuery();

  const isLevelLocked = (level: CEFRLevel) => {
    const levelIndex = levelData.findIndex(l => l.code === level);
    if (levelIndex === 0) return false;
    const prevLevel = levelData[levelIndex - 1].code;
    return mockProgress[prevLevel] < 50;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/')}
            className="text-gray-400 hover:text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Choose Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> Level</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The Common European Framework of Reference (CEFR) provides a standardized way to measure language proficiency.
              Start from your current level or challenge yourself with advanced content.
            </p>
          </div>

          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.totalLessons.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Total Lessons</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 text-center">
                  <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.totalVocabulary.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Vocabulary Words</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.totalExercises.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Exercises</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="text-gray-400 text-sm">CEFR Levels</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Level Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levelData.map((level) => {
            const progress = mockProgress[level.code];
            const locked = isLevelLocked(level.code);
            const apiLevel = levels?.find((l: { code: CEFRLevel }) => l.code === level.code);
            const actualLessonCount = apiLevel?.lessonCount || level.lessonCount;

            return (
              <Card 
                key={level.code}
                className={`
                  relative overflow-hidden transition-all duration-300
                  ${locked ? 'opacity-60' : 'hover:scale-105 cursor-pointer'}
                  bg-slate-800/50 border-white/10
                `}
                onClick={() => !locked && setLocation(`/curriculum?level=${level.code}`)}
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${level.gradient}`} />
                
                {/* Lock Overlay */}
                {locked && (
                  <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center z-10">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-400">Complete previous level to unlock</p>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{level.icon}</span>
                        <div>
                          <CardTitle className="text-white text-2xl">{level.code}</CardTitle>
                          <p className="text-gray-400 text-sm">{level.spanishName}</p>
                        </div>
                      </div>
                      <Badge className={`bg-gradient-to-r ${level.gradient} text-white border-0`}>
                        {level.name}
                      </Badge>
                    </div>
                    {progress === 100 && (
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    )}
                  </div>
                  <CardDescription className="text-gray-300 mt-3">
                    {level.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <BookOpen className="w-4 h-4" />
                      <span>{actualLessonCount.toLocaleString()} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>~{level.estimatedHours}h</span>
                    </div>
                  </div>

                  {/* Skills Preview */}
                  <div className="flex flex-wrap gap-2">
                    {level.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-gray-400 border-gray-600 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {level.skills.length > 3 && (
                      <Badge variant="outline" className="text-gray-500 border-gray-700 text-xs">
                        +{level.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  {!locked && (
                    <Button 
                      className={`w-full bg-gradient-to-r ${level.gradient} hover:opacity-90 text-white`}
                    >
                      {progress === 0 ? 'Start Learning' : progress === 100 ? 'Review' : 'Continue'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CEFR Info Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Star className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">About CEFR Levels</h3>
                <p className="text-gray-300 mb-4">
                  The Common European Framework of Reference for Languages (CEFR) is an international standard 
                  for describing language ability. It's used around the world to describe learners' language skills.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="text-green-400 font-semibold mb-2">Basic User (A1-A2)</h4>
                    <p className="text-gray-400">Can understand and use everyday expressions and basic phrases for immediate needs.</p>
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Independent User (B1-B2)</h4>
                    <p className="text-gray-400">Can deal with most situations and produce clear text on a wide range of subjects.</p>
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-2">Proficient User (C1-C2)</h4>
                    <p className="text-gray-400">Can understand demanding texts, express ideas fluently, and use language flexibly.</p>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Your Journey</h4>
                    <p className="text-gray-400">Progress through each level at your own pace with our comprehensive curriculum.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
