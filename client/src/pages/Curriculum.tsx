import { useState } from "react";
import { useLocation } from "wouter";
import MainNavigation from "@/components/MainNavigation";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Search, 
  GraduationCap,
  Trophy,
  Star,
  ChevronRight,
  Globe,
  Brain,
  MessageSquare
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

const levelDescriptions: Record<CEFRLevel, { name: string; subtitle: string; skills: string[] }> = {
  A1: {
    name: 'Breakthrough',
    subtitle: 'Basic phrases and everyday expressions',
    skills: ['Introduce yourself', 'Basic greetings', 'Simple questions', 'Numbers & colors']
  },
  A2: {
    name: 'Waystage',
    subtitle: 'Simple, routine tasks and direct exchanges',
    skills: ['Daily routines', 'Past experiences', 'Travel basics', 'Shopping & dining']
  },
  B1: {
    name: 'Threshold',
    subtitle: 'Main points on familiar matters',
    skills: ['Express opinions', 'Describe experiences', 'Handle travel situations', 'Discuss work & education']
  },
  B2: {
    name: 'Vantage',
    subtitle: 'Complex texts and abstract topics',
    skills: ['Debate topics', 'Understand news', 'Write essays', 'Professional communication']
  },
  C1: {
    name: 'Effective Proficiency',
    subtitle: 'Demanding texts and implicit meaning',
    skills: ['Academic writing', 'Professional contexts', 'Nuanced expression', 'Cultural references']
  },
  C2: {
    name: 'Mastery',
    subtitle: 'Near-native fluency and precision',
    skills: ['Literary analysis', 'Philosophical discourse', 'Native-like idioms', 'Any specialized domain']
  },
};

export default function Curriculum() {
  const [, setLocation] = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch curriculum stats
  const { data: stats } = trpc.curriculum.getStats.useQuery();

  // Fetch levels info
  const { data: levels } = trpc.curriculum.getLevels.useQuery();

  // Fetch lessons for selected level
  const { data: lessonsData, isLoading: lessonsLoading } = trpc.curriculum.getLessonsByLevel.useQuery({
    level: selectedLevel,
    page: currentPage,
    pageSize: 20,
  });

  // Search lessons
  const { data: searchResults } = trpc.curriculum.searchLessons.useQuery(
    { query: searchQuery, limit: 20 },
    { enabled: searchQuery.length >= 2 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <MainNavigation />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Spanish Curriculum
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> A1-C2</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Master Spanish with our comprehensive curriculum covering all CEFR levels.
              From absolute beginner to native-like mastery.
            </p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{stats.totalLessons.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Total Lessons</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 text-center">
                  <Brain className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{stats.totalVocabulary.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Vocabulary Items</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 text-center">
                  <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{stats.totalExercises.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Exercises</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 text-center">
                  <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{stats.totalCategories}</div>
                  <div className="text-gray-400 text-sm">Topic Categories</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search lessons, topics, vocabulary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            {searchResults && searchResults.length > 0 && (
              <Card className="mt-2 bg-slate-800 border-white/20">
                <ScrollArea className="h-64">
                  {searchResults.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-3 hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Badge className={`${levelColors[lesson.cefr_level]} text-white`}>
                          {lesson.cefr_level}
                        </Badge>
                        <span className="text-white font-medium">{lesson.title_en}</span>
                      </div>
                      <div className="text-gray-400 text-sm mt-1">{lesson.title_es}</div>
                    </div>
                  ))}
                </ScrollArea>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Level Selection */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedLevel} onValueChange={(v) => { setSelectedLevel(v as CEFRLevel); setCurrentPage(1); }}>
          <TabsList className="grid grid-cols-6 gap-2 bg-transparent h-auto mb-8">
            {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[]).map((level) => (
              <TabsTrigger
                key={level}
                value={level}
                className={`
                  data-[state=active]:${levelColors[level]} 
                  data-[state=active]:text-white
                  bg-white/10 text-gray-300 hover:bg-white/20
                  py-4 rounded-lg transition-all
                `}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">{level}</div>
                  <div className="text-xs opacity-75">{levelDescriptions[level].name}</div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[]).map((level) => (
            <TabsContent key={level} value={level}>
              {/* Level Overview Card */}
              <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-white/20 mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-3xl text-white flex items-center gap-3">
                        <Badge className={`${levelColors[level]} text-white text-lg px-3 py-1`}>
                          {level}
                        </Badge>
                        {levelDescriptions[level].name}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg mt-2">
                        {levelDescriptions[level].subtitle}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-white">
                        {levels?.find(l => l.code === level)?.lessonCount.toLocaleString() || 0}
                      </div>
                      <div className="text-gray-400">lessons available</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {levelDescriptions[level].skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Topics Grid */}
              <h3 className="text-xl font-semibold text-white mb-4">Topics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {levels?.find(l => l.code === level)?.topics.map((topic) => (
                  <Card 
                    key={topic} 
                    className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer transition-all"
                  >
                    <CardContent className="p-4">
                      <div className="text-white font-medium capitalize">
                        {topic.replace(/_/g, ' ')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Lessons List */}
              <h3 className="text-xl font-semibold text-white mb-4">Lessons</h3>
              {lessonsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                </div>
              ) : (
                <>
                  <div className="grid gap-4">
                    {lessonsData?.lessons.map((lesson) => (
                      <Card 
                        key={lesson.id}
                        className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer transition-all group"
                        onClick={() => setLocation(`/lesson/${lesson.slug}`)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline" className="text-gray-300 border-gray-600">
                                  {lesson.category.replace(/_/g, ' ')}
                                </Badge>
                                <div className="flex items-center text-gray-400 text-sm">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {lesson.estimated_minutes} min
                                </div>
                              </div>
                              <h4 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                                {lesson.title_en}
                              </h4>
                              <p className="text-gray-400 text-sm">{lesson.title_es}</p>
                              <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                                {lesson.description_en}
                              </p>
                            </div>
                            <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-purple-400 transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {lessonsData && lessonsData.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Previous
                      </Button>
                      <span className="text-gray-400 px-4">
                        Page {currentPage} of {lessonsData.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.min(lessonsData.totalPages, p + 1))}
                        disabled={currentPage === lessonsData.totalPages}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Footer CTA */}
      <div className="container mx-auto px-4 py-12">
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0">
          <CardContent className="p-8 text-center">
            <GraduationCap className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Ready to Start Learning?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Begin your Spanish journey today with our comprehensive curriculum.
              Track your progress and earn achievements as you advance through each level.
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Trophy className="w-5 h-5 mr-2" />
              Start Learning Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
