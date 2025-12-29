/**
 * Prize2Pride Lingua Spanish Platform
 * Mode Selector Page - Choose Learning Mode
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Check, AlertTriangle } from 'lucide-react';
import { LANGUAGE_MODES, LanguageMode, canAccessMode } from '@/const/languageModes';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/DashboardLayout';
import { AnimatedAvatarShowcase } from '@/components/AnimatedAvatarShowcase';

interface ModeSelectorProps {
  userTier?: string;
  onModeSelect?: (mode: LanguageMode) => void;
}

const ModeCard: React.FC<{
  mode: LanguageMode;
  isAccessible: boolean;
  isSelected: boolean;
  onSelect: () => void;
  language: string;
}> = ({ mode, isAccessible, isSelected, onSelect, language }) => {
  const [showExamples, setShowExamples] = useState(false);
  
  return (
    <Card 
      className={`
        relative overflow-hidden transition-all duration-300 cursor-pointer
        ${isSelected ? 'ring-2 ring-yellow-500 shadow-yellow-500/20' : ''}
        ${isAccessible ? 'hover:scale-105 hover:shadow-xl' : 'opacity-60'}
      `}
      style={{
        background: isAccessible 
          ? `linear-gradient(135deg, ${mode.color}20, transparent)` 
          : 'linear-gradient(135deg, #374151, #1f2937)'
      }}
      onClick={() => isAccessible && onSelect()}
    >
      {/* Lock Overlay for Inaccessible Modes */}
      {!isAccessible && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-400">Upgrade to unlock</p>
            <Badge variant="outline" className="mt-2 text-xs">
              {mode.minimumTier.toUpperCase()}
            </Badge>
          </div>
        </div>
      )}
      
      {/* Age Restriction Warning */}
      {mode.ageRestricted && (
        <div className="absolute top-2 right-2 z-20">
          <Badge variant="destructive" className="text-xs">
            <AlertTriangle className="w-3 h-3 mr-1" />
            18+
          </Badge>
        </div>
      )}
      
      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 z-20">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-black" />
          </div>
        </div>
      )}
      
      <CardHeader className="text-center pb-2">
        <div 
          className="text-5xl mb-4 mx-auto"
          style={{ filter: isAccessible ? 'none' : 'grayscale(100%)' }}
        >
          {mode.icon}
        </div>
        
        <CardTitle className="text-xl font-bold">
          {mode.nameTranslations[language] || mode.name}
        </CardTitle>
        
        <CardDescription className="text-sm">
          {mode.descriptionTranslations[language] || mode.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* CEFR Levels */}
        <div className="flex flex-wrap gap-1 justify-center">
          {mode.cefrLevels.map((level) => (
            <Badge 
              key={level} 
              variant="secondary" 
              className="text-xs"
              style={{ backgroundColor: `${mode.color}30`, color: mode.color }}
            >
              {level}
            </Badge>
          ))}
        </div>
        
        {/* Example Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            setShowExamples(!showExamples);
          }}
          disabled={!isAccessible}
        >
          {showExamples ? 'Hide Examples' : 'Show Examples'}
        </Button>
        
        {/* Examples */}
        {showExamples && isAccessible && (
          <div className="space-y-2 mt-2 p-3 bg-card/50 rounded-lg">
            {mode.examples.slice(0, 3).map((example, index) => (
              <div key={index} className="text-sm border-b border-border pb-2 last:border-0">
                <p className="font-semibold text-foreground">{example.spanish}</p>
                <p className="text-muted-foreground text-xs">
                  {(example as any)[language] || example.english}
                </p>
                <p className="text-xs text-muted-foreground/70 italic">
                  {example.context}
                </p>
              </div>
            ))}
          </div>
        )}
        
        {/* Topics */}
        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-1">Topics covered:</p>
          <div className="flex flex-wrap gap-1">
            {mode.topics.slice(0, 4).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs capitalize">
                {topic.replace(/_/g, ' ')}
              </Badge>
            ))}
            {mode.topics.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{mode.topics.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ModeSelector: React.FC<ModeSelectorProps> = ({ 
  userTier = 'freemium',
  onModeSelect 
}) => {
  const { language, t } = useLanguage();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [avatarTier, setAvatarTier] = useState<'none' | 'basic' | 'enhanced' | 'premium' | 'high_quality' | 'exclusive'>('none');
  
  // Map user tier to avatar tier
  React.useEffect(() => {
    const tierMap: Record<string, typeof avatarTier> = {
      'freemium': 'none',
      'bronze': 'basic',
      'silver': 'enhanced',
      'gold': 'premium',
      'diamond': 'high_quality',
      'vip_millionaire': 'exclusive'
    };
    setAvatarTier(tierMap[userTier] || 'none');
  }, [userTier]);
  
  const handleModeSelect = (mode: LanguageMode) => {
    setSelectedMode(mode.id);
    onModeSelect?.(mode);
  };
  
  return (
    <DashboardLayout>
      <div className="min-h-screen py-8 px-4">
        {/* Header with Avatar */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <AnimatedAvatarShowcase 
              tier={avatarTier}
              size="large"
              state="speaking"
              message="Choose your learning style! Each mode offers a unique Spanish experience."
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Choose Your Learning Mode
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From formal business Spanish to street slang - master every aspect of the language
          </p>
          
          {/* Current Tier Badge */}
          <div className="mt-4">
            <Badge variant="outline" className="text-lg px-4 py-1">
              Your Plan: <span className="font-bold capitalize ml-1">{userTier}</span>
            </Badge>
          </div>
        </div>
        
        {/* Mode Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {LANGUAGE_MODES.map((mode) => (
            <ModeCard
              key={mode.id}
              mode={mode}
              isAccessible={canAccessMode(userTier, mode.id)}
              isSelected={selectedMode === mode.id}
              onSelect={() => handleModeSelect(mode)}
              language={language}
            />
          ))}
        </div>
        
        {/* Selected Mode Actions */}
        {selectedMode && (
          <div className="mt-12 text-center">
            <div className="inline-block bg-card border border-border rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                Ready to learn in {getModeById(selectedMode)?.name} mode?
              </h3>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedMode(null)}
                >
                  Change Mode
                </Button>
                <Button 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90"
                  onClick={() => {
                    // Navigate to lessons with selected mode
                    window.location.href = `/curriculum?mode=${selectedMode}`;
                  }}
                >
                  Start Learning →
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Upgrade CTA for Limited Access */}
        {userTier === 'freemium' && (
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">🔓 Unlock All Modes</h3>
              <p className="text-muted-foreground mb-4">
                Upgrade to access Slang, Adult, and Expert modes with animated avatar tutoring
              </p>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500"
                onClick={() => window.location.href = '/pricing'}
              >
                View Pricing Plans
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// Helper function to get mode by ID
function getModeById(id: string): LanguageMode | undefined {
  return LANGUAGE_MODES.find(mode => mode.id === id);
}

export default ModeSelector;
