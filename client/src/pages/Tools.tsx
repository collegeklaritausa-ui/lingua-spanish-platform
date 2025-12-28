import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterConverter from "@/components/RegisterConverter";
import { 
  ArrowLeft,
  Sparkles,
  Languages,
  BookOpen,
  Mic,
  PenTool,
  Calculator,
  Clock
} from "lucide-react";

export default function Tools() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('register');

  const tools = [
    {
      id: 'register',
      name: 'Register Converter',
      description: 'Convert text between linguistic registers',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      available: true
    },
    {
      id: 'conjugator',
      name: 'Verb Conjugator',
      description: 'Conjugate Spanish verbs in all tenses',
      icon: <Languages className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      available: false
    },
    {
      id: 'dictionary',
      name: 'Dictionary',
      description: 'Look up words with examples and audio',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      available: false
    },
    {
      id: 'pronunciation',
      name: 'Pronunciation Practice',
      description: 'Practice speaking with AI feedback',
      icon: <Mic className="w-6 h-6" />,
      color: 'from-orange-500 to-amber-500',
      available: false
    },
    {
      id: 'writing',
      name: 'Writing Assistant',
      description: 'Get help with Spanish writing',
      icon: <PenTool className="w-6 h-6" />,
      color: 'from-rose-500 to-red-500',
      available: false
    },
    {
      id: 'numbers',
      name: 'Number Converter',
      description: 'Convert numbers to Spanish words',
      icon: <Calculator className="w-6 h-6" />,
      color: 'from-violet-500 to-purple-500',
      available: false
    }
  ];

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
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Learning Tools</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful tools to enhance your Spanish learning experience
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {tools.map((tool) => (
            <Card 
              key={tool.id}
              className={`
                cursor-pointer transition-all
                ${activeTab === tool.id ? `bg-gradient-to-br ${tool.color} border-0` : 'bg-white/5 border-white/10'}
                ${!tool.available && activeTab !== tool.id ? 'opacity-50' : ''}
                hover:scale-105
              `}
              onClick={() => tool.available && setActiveTab(tool.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`mx-auto mb-2 ${activeTab === tool.id ? 'text-white' : 'text-gray-400'}`}>
                  {tool.icon}
                </div>
                <div className={`text-sm font-medium ${activeTab === tool.id ? 'text-white' : 'text-gray-300'}`}>
                  {tool.name}
                </div>
                {!tool.available && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tool Content */}
        <div className="mt-8">
          {activeTab === 'register' && <RegisterConverter />}
          
          {activeTab !== 'register' && (
            <Card className="bg-white/5 border-white/10 max-w-2xl mx-auto">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6">
                  {tools.find(t => t.id === activeTab)?.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {tools.find(t => t.id === activeTab)?.name}
                </h3>
                <p className="text-gray-400 mb-6">
                  This tool is coming soon! We're working hard to bring you more powerful learning features.
                </p>
                <Button 
                  onClick={() => setActiveTab('register')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Try Register Converter
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
