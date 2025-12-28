import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AvatarHost } from "@/components/AvatarHost";
import { MOCK_FEED_DATA, FeedItem } from "@/const/feedData";
import { trpc } from "@/lib/trpc";
import { FeedItemCard } from "@/components/FeedItemCard";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  BookOpen, 
  MessageSquare, 
  Brain, 
  Trophy,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Target,
  Flame,
  Layers
} from "lucide-react";
import MainNavigation from "@/components/MainNavigation";

/**
 * The main TikTok-like feed page for the Prize2Pride platform.
 */
export default function Feed() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  const { data: scrapedLessons, isLoading: isLessonsLoading } = trpc.lesson.getLessons.useQuery();

  // Use mock data for the feed
  const feedData: FeedItem[] = MOCK_FEED_DATA;

  const quickLinks = [
    { label: 'Browse Levels', path: '/levels', icon: <Layers className="w-5 h-5" />, color: 'from-green-500 to-emerald-600' },
    { label: 'Curriculum', path: '/curriculum', icon: <BookOpen className="w-5 h-5" />, color: 'from-blue-500 to-cyan-600' },
    { label: 'Vocabulary', path: '/vocabulary', icon: <Brain className="w-5 h-5" />, color: 'from-purple-500 to-violet-600' },
    { label: 'Chat Arena', path: '/chat', icon: <MessageSquare className="w-5 h-5" />, color: 'from-orange-500 to-amber-600' },
    { label: 'Tools', path: '/tools', icon: <Sparkles className="w-5 h-5" />, color: 'from-pink-500 to-rose-600' },
    { label: 'Progress', path: '/progress', icon: <Trophy className="w-5 h-5" />, color: 'from-yellow-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <MainNavigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-purple-500/20 text-purple-300 border-0 mb-4">
                <Flame className="w-3 h-3 mr-1" />
                10,000+ Lessons Available
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Master Spanish
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> A1 to C2</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                Your journey to Spanish fluency starts here. Learn with AI-powered lessons, 
                interactive exercises, and real-world content adapted to your level.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                  onClick={() => setLocation('/levels')}
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Start Learning
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setLocation('/curriculum')}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Curriculum
                </Button>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <AvatarHost message={t('host.default_message')} state="idle" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link) => (
            <Card 
              key={link.path}
              className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer transition-all hover:scale-105"
              onClick={() => setLocation(link.path)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mx-auto mb-3`}>
                  {link.icon}
                </div>
                <p className="text-white font-medium text-sm">{link.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">10,000+</div>
              <div className="text-gray-400 text-sm">Lessons</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">70,000+</div>
              <div className="text-gray-400 text-sm">Vocabulary</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">40,000+</div>
              <div className="text-gray-400 text-sm">Exercises</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">6</div>
              <div className="text-gray-400 text-sm">CEFR Levels</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feed Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {t('nav.lessons')}
          </h2>
          <Button 
            variant="link" 
            className="text-purple-400 hover:text-purple-300"
            onClick={() => setLocation('/curriculum')}
          >
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {loading || isLessonsLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="animate-spin w-8 h-8 text-purple-400" />
            <p className="mt-2 text-gray-400">Loading Feed and Autonomous Content...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedData.slice(0, 6).map((item) => (
              <FeedItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0">
          <CardContent className="p-8 text-center">
            <GraduationCap className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Ready to Start Your Journey?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Join thousands of learners mastering Spanish with our comprehensive curriculum.
              From basic greetings to native-like fluency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => setLocation('/levels')}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => setLocation('/chat')}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Try AI Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Prize2Pride</h3>
              <p className="text-xs text-gray-400">Ultra-Luxury Knowledge Casino Studio</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Prize2Pride. All rights reserved. Built with ❤️ for Spanish learners worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}
