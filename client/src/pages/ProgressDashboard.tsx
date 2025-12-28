import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  BookOpen, 
  Clock, 
  Trophy,
  Star,
  Target,
  Flame,
  TrendingUp,
  Calendar,
  Brain,
  Award,
  Zap,
  CheckCircle2,
  BarChart3,
  PieChart
} from "lucide-react";

type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

const levelColors: Record<CEFRLevel, { bg: string; text: string; gradient: string }> = {
  A1: { bg: 'bg-green-500', text: 'text-green-400', gradient: 'from-green-500 to-emerald-600' },
  A2: { bg: 'bg-green-600', text: 'text-green-500', gradient: 'from-green-600 to-teal-600' },
  B1: { bg: 'bg-blue-500', text: 'text-blue-400', gradient: 'from-blue-500 to-cyan-600' },
  B2: { bg: 'bg-blue-600', text: 'text-blue-500', gradient: 'from-blue-600 to-indigo-600' },
  C1: { bg: 'bg-purple-500', text: 'text-purple-400', gradient: 'from-purple-500 to-violet-600' },
  C2: { bg: 'bg-purple-600', text: 'text-purple-500', gradient: 'from-purple-600 to-pink-600' },
};

// Mock user progress data (would come from backend in production)
const mockUserProgress = {
  currentLevel: 'B1' as CEFRLevel,
  totalXP: 12450,
  streak: 7,
  bestStreak: 14,
  lessonsCompleted: 156,
  vocabularyMastered: 1240,
  exercisesCompleted: 624,
  totalTimeMinutes: 4320,
  weeklyGoal: 300,
  weeklyProgress: 180,
  levelProgress: {
    A1: { completed: 100, total: 100 },
    A2: { completed: 85, total: 100 },
    B1: { completed: 42, total: 100 },
    B2: { completed: 0, total: 100 },
    C1: { completed: 0, total: 100 },
    C2: { completed: 0, total: 100 },
  },
  recentActivity: [
    { date: '2024-12-28', lessons: 3, vocabulary: 24, exercises: 12, xp: 450 },
    { date: '2024-12-27', lessons: 2, vocabulary: 16, exercises: 8, xp: 300 },
    { date: '2024-12-26', lessons: 4, vocabulary: 32, exercises: 16, xp: 600 },
    { date: '2024-12-25', lessons: 1, vocabulary: 8, exercises: 4, xp: 150 },
    { date: '2024-12-24', lessons: 3, vocabulary: 24, exercises: 12, xp: 450 },
    { date: '2024-12-23', lessons: 2, vocabulary: 16, exercises: 8, xp: 300 },
    { date: '2024-12-22', lessons: 3, vocabulary: 24, exercises: 12, xp: 450 },
  ],
  achievements: [
    { id: 1, name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned: true, date: '2024-11-01' },
    { id: 2, name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', earned: true, date: '2024-12-28' },
    { id: 3, name: 'Vocabulary Master', description: 'Learn 1000 words', icon: '📚', earned: true, date: '2024-12-20' },
    { id: 4, name: 'A1 Graduate', description: 'Complete all A1 lessons', icon: '🎓', earned: true, date: '2024-11-15' },
    { id: 5, name: 'A2 Graduate', description: 'Complete all A2 lessons', icon: '🎓', earned: false, date: null },
    { id: 6, name: 'Perfect Score', description: 'Get 100% on 10 exercises', icon: '⭐', earned: true, date: '2024-12-15' },
    { id: 7, name: 'Night Owl', description: 'Study after midnight', icon: '🦉', earned: true, date: '2024-12-10' },
    { id: 8, name: 'Marathon Learner', description: 'Study for 2 hours straight', icon: '🏃', earned: false, date: null },
  ],
};

export default function ProgressDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch curriculum stats
  const { data: stats } = trpc.curriculum.getStats.useQuery();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getXPLevel = (xp: number) => {
    if (xp < 1000) return { level: 1, title: 'Beginner', nextXP: 1000 };
    if (xp < 5000) return { level: 2, title: 'Learner', nextXP: 5000 };
    if (xp < 10000) return { level: 3, title: 'Intermediate', nextXP: 10000 };
    if (xp < 25000) return { level: 4, title: 'Advanced', nextXP: 25000 };
    if (xp < 50000) return { level: 5, title: 'Expert', nextXP: 50000 };
    return { level: 6, title: 'Master', nextXP: 100000 };
  };

  const xpInfo = getXPLevel(mockUserProgress.totalXP);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-white/10 py-4">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/curriculum')}
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Curriculum
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${levelColors[mockUserProgress.currentLevel].gradient} flex items-center justify-center`}>
                <span className="text-4xl font-bold text-white">{mockUserProgress.currentLevel}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Your Learning Journey</h1>
                <p className="text-gray-400">Level {xpInfo.level} - {xpInfo.title}</p>
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>{mockUserProgress.totalXP.toLocaleString()} XP</span>
                    <span className="text-gray-600">/ {xpInfo.nextXP.toLocaleString()} XP</span>
                  </div>
                  <Progress value={(mockUserProgress.totalXP / xpInfo.nextXP) * 100} className="h-2 w-48" />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <Flame className="w-10 h-10 text-orange-400" />
                  <div>
                    <div className="text-3xl font-bold text-white">{mockUserProgress.streak}</div>
                    <div className="text-orange-300 text-sm">Day Streak</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <Trophy className="w-10 h-10 text-yellow-400" />
                  <div>
                    <div className="text-3xl font-bold text-white">{mockUserProgress.bestStreak}</div>
                    <div className="text-purple-300 text-sm">Best Streak</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 gap-2 bg-white/10 p-1 rounded-lg mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="levels" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              Levels
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="w-8 h-8 text-blue-400" />
                    <Badge className="bg-blue-500/20 text-blue-400 border-0">Lessons</Badge>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{mockUserProgress.lessonsCompleted}</div>
                  <p className="text-gray-400 text-sm">Lessons completed</p>
                  {stats && (
                    <div className="mt-3">
                      <Progress value={(mockUserProgress.lessonsCompleted / stats.totalLessons) * 100} className="h-1" />
                      <p className="text-gray-500 text-xs mt-1">of {stats.totalLessons.toLocaleString()} total</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Brain className="w-8 h-8 text-green-400" />
                    <Badge className="bg-green-500/20 text-green-400 border-0">Vocabulary</Badge>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{mockUserProgress.vocabularyMastered.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Words mastered</p>
                  {stats && (
                    <div className="mt-3">
                      <Progress value={(mockUserProgress.vocabularyMastered / stats.totalVocabulary) * 100} className="h-1" />
                      <p className="text-gray-500 text-xs mt-1">of {stats.totalVocabulary.toLocaleString()} total</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-purple-400" />
                    <Badge className="bg-purple-500/20 text-purple-400 border-0">Exercises</Badge>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{mockUserProgress.exercisesCompleted}</div>
                  <p className="text-gray-400 text-sm">Exercises completed</p>
                  {stats && (
                    <div className="mt-3">
                      <Progress value={(mockUserProgress.exercisesCompleted / stats.totalExercises) * 100} className="h-1" />
                      <p className="text-gray-500 text-xs mt-1">of {stats.totalExercises.toLocaleString()} total</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-yellow-400" />
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-0">Time</Badge>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{Math.floor(mockUserProgress.totalTimeMinutes / 60)}</div>
                  <p className="text-gray-400 text-sm">Hours studied</p>
                  <div className="mt-3">
                    <p className="text-gray-500 text-xs">{formatTime(mockUserProgress.totalTimeMinutes)} total</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Goal */}
            <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Weekly Goal</h3>
                    <p className="text-gray-400">Study {mockUserProgress.weeklyGoal} minutes this week</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{formatTime(mockUserProgress.weeklyProgress)}</div>
                    <p className="text-gray-400 text-sm">of {formatTime(mockUserProgress.weeklyGoal)}</p>
                  </div>
                </div>
                <Progress value={(mockUserProgress.weeklyProgress / mockUserProgress.weeklyGoal) * 100} className="h-3" />
                <p className="text-purple-300 text-sm mt-2">
                  {mockUserProgress.weeklyProgress >= mockUserProgress.weeklyGoal 
                    ? '🎉 Goal achieved! Keep going!'
                    : `${formatTime(mockUserProgress.weeklyGoal - mockUserProgress.weeklyProgress)} more to reach your goal`
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Levels Tab */}
          <TabsContent value="levels">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[]).map((level) => {
                const progress = mockUserProgress.levelProgress[level];
                const percentage = (progress.completed / progress.total) * 100;
                const isCurrentLevel = level === mockUserProgress.currentLevel;
                const isCompleted = percentage === 100;
                const isLocked = ['B2', 'C1', 'C2'].includes(level) && mockUserProgress.levelProgress.B1.completed < 50;

                return (
                  <Card 
                    key={level}
                    className={`
                      border-white/10 transition-all
                      ${isCurrentLevel ? `bg-gradient-to-br ${levelColors[level].gradient} border-0` : 'bg-white/5'}
                      ${isLocked ? 'opacity-50' : ''}
                    `}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center gap-2">
                          <span className={`text-2xl font-bold ${isCurrentLevel ? 'text-white' : levelColors[level].text}`}>
                            {level}
                          </span>
                          {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                          {isCurrentLevel && <Star className="w-5 h-5 text-yellow-400" />}
                        </CardTitle>
                        <Badge className={`${isCurrentLevel ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-400'} border-0`}>
                          {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'In Progress'}
                        </Badge>
                      </div>
                      <CardDescription className={isCurrentLevel ? 'text-white/80' : 'text-gray-400'}>
                        {level === 'A1' && 'Breakthrough - Basic phrases'}
                        {level === 'A2' && 'Waystage - Simple tasks'}
                        {level === 'B1' && 'Threshold - Familiar matters'}
                        {level === 'B2' && 'Vantage - Complex texts'}
                        {level === 'C1' && 'Effective Proficiency'}
                        {level === 'C2' && 'Mastery - Near-native'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className={isCurrentLevel ? 'text-white/80' : 'text-gray-400'}>Progress</span>
                          <span className={isCurrentLevel ? 'text-white' : 'text-white'}>{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <p className={`text-sm ${isCurrentLevel ? 'text-white/60' : 'text-gray-500'}`}>
                          {progress.completed} of {progress.total} lessons
                        </p>
                      </div>
                      {!isLocked && (
                        <Button 
                          className={`w-full mt-4 ${isCurrentLevel ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-purple-600 hover:bg-purple-700'}`}
                          onClick={() => setLocation('/curriculum')}
                        >
                          {isCompleted ? 'Review' : 'Continue'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">Your learning activity over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserProgress.recentActivity.map((day, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <div className="w-16 text-center">
                        <div className="text-sm text-gray-400">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-semibold text-white">
                          {new Date(day.date).getDate()}
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-400">{day.lessons}</div>
                          <div className="text-xs text-gray-500">Lessons</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-400">{day.vocabulary}</div>
                          <div className="text-xs text-gray-500">Words</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-purple-400">{day.exercises}</div>
                          <div className="text-xs text-gray-500">Exercises</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-400">+{day.xp}</div>
                          <div className="text-xs text-gray-500">XP</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockUserProgress.achievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className={`
                    border-white/10 transition-all
                    ${achievement.earned ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30' : 'bg-white/5 opacity-60'}
                  `}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-1">{achievement.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-0">
                        Earned {new Date(achievement.date!).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-500/20 text-gray-400 border-0">
                        Not yet earned
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
