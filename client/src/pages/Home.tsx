/**
 * Prize2Pride Lingua Spanish Platform
 * Luxury Home Page - El Dorado Edition
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Features:
 * - Stunning luxury design (gold, royal blue, black)
 * - Animated avatar showcase
 * - CEFR level progression
 * - Course statistics
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Crown, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Trophy,
  ChevronRight,
  GraduationCap,
  Target,
  Star,
  Play,
  Users,
  Globe,
  Zap
} from 'lucide-react';
import MainNavigation from '@/components/MainNavigation';

// Avatar images for showcase
const SHOWCASE_AVATARS = [
  '/Prize2Pride_Posters/poster_006.png',
  '/Prize2Pride_Posters/poster_015.png',
  '/Prize2Pride_Posters/poster_020.png',
  '/Prize2Pride_Posters/poster_025.png',
  '/Prize2Pride_Posters/poster_030.png',
  '/Prize2Pride_Posters/poster_035.png',
];

// CEFR Levels
const CEFR_LEVELS = [
  { code: 'A1', name: 'Principiante', color: 'from-green-500 to-emerald-600', lessons: 2000 },
  { code: 'A2', name: 'Elemental', color: 'from-green-600 to-teal-600', lessons: 2000 },
  { code: 'B1', name: 'Intermedio', color: 'from-blue-500 to-cyan-600', lessons: 1800 },
  { code: 'B2', name: 'Intermedio Alto', color: 'from-blue-600 to-indigo-600', lessons: 1700 },
  { code: 'C1', name: 'Avanzado', color: 'from-purple-500 to-violet-600', lessons: 1500 },
  { code: 'C2', name: 'Maestría', color: 'from-purple-600 to-pink-600', lessons: 1000 },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  // Rotate avatars
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAvatarIndex((prev) => (prev + 1) % SHOWCASE_AVATARS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <MainNavigation />

      {/* Hero Section with Luxury Design */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-400 text-sm font-medium">El Dorado Edition • Manus 1.6</span>
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Master Spanish
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
                  From A1 to C2
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                Experience the world's most sophisticated Spanish learning platform. 
                <span className="text-yellow-400 font-semibold"> 10,000+ lessons</span>, 
                hyper-realistic AI tutors, and a luxury learning experience designed to transform your fluency.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold text-lg px-8 py-6 shadow-lg shadow-yellow-500/25"
                  onClick={() => setLocation('/levels')}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Free
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6"
                  onClick={() => setLocation('/chat')}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Try AI Tutor
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-400" />
                  <span>50,000+ Learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>100+ Countries</span>
                </div>
              </div>
            </div>

            {/* Right Content - Avatar Showcase */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
                
                {/* Avatar Card */}
                <Card className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-yellow-500/20 backdrop-blur-xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500"></div>
                  
                  <CardContent className="p-6">
                    {/* Avatar Image */}
                    <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video">
                      <img 
                        src={SHOWCASE_AVATARS[currentAvatarIndex]}
                        alt="AI Tutor"
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                      
                      {/* Speaking Indicator */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">AI Tutor Active</span>
                      </div>
                    </div>

                    {/* Avatar Navigation */}
                    <div className="flex justify-center gap-2 mb-4">
                      {SHOWCASE_AVATARS.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentAvatarIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentAvatarIndex === index 
                              ? 'bg-yellow-500 scale-125' 
                              : 'bg-gray-600 hover:bg-gray-500'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Sample Conversation */}
                    <div className="space-y-3">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                        <p className="text-blue-300 text-sm">
                          <span className="font-bold">Tutor:</span> ¡Hola! ¿Cómo te llamas?
                        </p>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 ml-8">
                        <p className="text-yellow-300 text-sm">
                          <span className="font-bold">You:</span> Me llamo María. ¿Y tú?
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-yellow-500/10 hover:border-yellow-500/30 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-black" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">10,000+</div>
              <div className="text-gray-400">Lessons</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/10 hover:border-blue-500/30 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">70,000+</div>
              <div className="text-gray-400">Vocabulary</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/10 hover:border-purple-500/30 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">40,000+</div>
              <div className="text-gray-400">Exercises</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-green-500/10 hover:border-green-500/30 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">6</div>
              <div className="text-gray-400">CEFR Levels</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CEFR Levels Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="bg-purple-500/20 text-purple-300 border-0 mb-4">
            <GraduationCap className="w-3 h-3 mr-1" />
            Complete Curriculum
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Fluency</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Follow the internationally recognized CEFR framework from complete beginner to native-like mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CEFR_LEVELS.map((level) => (
            <Card 
              key={level.code}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-white/5 hover:border-white/20 cursor-pointer transition-all hover:scale-105 group"
              onClick={() => setLocation(`/curriculum?level=${level.code}`)}
            >
              <div className={`h-1 bg-gradient-to-r ${level.color}`}></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${level.color}`}>
                    {level.code}
                  </div>
                  <Badge className={`bg-gradient-to-r ${level.color} text-white border-0`}>
                    {level.lessons.toLocaleString()} lessons
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{level.name}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {level.code === 'A1' && 'Basic phrases and everyday expressions'}
                  {level.code === 'A2' && 'Simple, routine tasks and direct exchanges'}
                  {level.code === 'B1' && 'Main points on familiar matters'}
                  {level.code === 'B2' && 'Complex texts and abstract topics'}
                  {level.code === 'C1' && 'Demanding texts and implicit meaning'}
                  {level.code === 'C2' && 'Near-native fluency and precision'}
                </p>
                <div className="flex items-center text-yellow-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
                  Start Learning <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="bg-yellow-500/20 text-yellow-300 border-0 mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Premium Features
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Prize2Pride</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-yellow-500/10">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hyper-Realistic AI Tutors</h3>
              <p className="text-gray-400">
                Learn with stunning AI avatars that provide personalized, interactive lessons in a luxury studio environment.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/10">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Comprehensive Curriculum</h3>
              <p className="text-gray-400">
                10,000+ lessons covering all aspects of Spanish from basic greetings to advanced literary analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/10">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Gamified Learning</h3>
              <p className="text-gray-400">
                Track your progress, earn achievements, and compete with learners worldwide on your journey to fluency.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 border-yellow-500/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <CardContent className="p-12 text-center relative z-10">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of learners mastering Spanish with our comprehensive curriculum.
              From basic greetings to native-like fluency, we'll guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold text-lg px-8 py-6"
                onClick={() => setLocation('/levels')}
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => setLocation('/pricing')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                View Premium Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Prize2Pride</h3>
                <p className="text-xs text-gray-400">Ultra-Luxury Knowledge Casino Studio</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm text-center">
              © 2025 Prize2Pride. All rights reserved. Built with ❤️ for Spanish learners worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
