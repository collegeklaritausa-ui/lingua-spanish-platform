/**
 * Prize2Pride Lingua Spanish Platform
 * Animated Avatar Showcase Component
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * This component displays animated avatars that tutor learners.
 * Avatars are present everywhere in the platform for paid tiers.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { AVATAR_CONFIGS } from '@/const/subscriptionPlans';
import { useLanguage } from '@/contexts/LanguageContext';

type AvatarTier = 'none' | 'basic' | 'enhanced' | 'premium' | 'high_quality' | 'exclusive';
type AvatarState = 'idle' | 'speaking' | 'listening' | 'celebrating' | 'thinking' | 'encouraging' | 'excited' | 'empathetic';

interface AnimatedAvatarShowcaseProps {
  tier: AvatarTier;
  size?: 'small' | 'medium' | 'large' | 'full';
  state?: AvatarState;
  message?: string;
  showAll?: boolean;
  autoRotate?: boolean;
  rotateInterval?: number;
  onAvatarChange?: (index: number) => void;
  className?: string;
}

// Animation keyframes for different states
const stateAnimations: Record<AvatarState, string> = {
  idle: 'animate-pulse-slow',
  speaking: 'animate-bounce-gentle',
  listening: 'animate-glow-pulse',
  celebrating: 'animate-celebrate',
  thinking: 'animate-think',
  encouraging: 'animate-encourage',
  excited: 'animate-excited',
  empathetic: 'animate-empathetic'
};

// State-specific border colors
const stateBorderColors: Record<AvatarState, string> = {
  idle: 'border-primary/50',
  speaking: 'border-green-500 shadow-green-500/50',
  listening: 'border-blue-500 shadow-blue-500/50',
  celebrating: 'border-yellow-500 shadow-yellow-500/50',
  thinking: 'border-purple-500 shadow-purple-500/50',
  encouraging: 'border-pink-500 shadow-pink-500/50',
  excited: 'border-orange-500 shadow-orange-500/50',
  empathetic: 'border-cyan-500 shadow-cyan-500/50'
};

// Size configurations
const sizeConfig = {
  small: { container: 'w-20 h-20', image: 'w-full h-full' },
  medium: { container: 'w-32 h-32', image: 'w-full h-full' },
  large: { container: 'w-48 h-48', image: 'w-full h-full' },
  full: { container: 'w-full h-64', image: 'w-full h-full object-contain' }
};

export const AnimatedAvatarShowcase: React.FC<AnimatedAvatarShowcaseProps> = ({
  tier,
  size = 'medium',
  state = 'idle',
  message,
  showAll = false,
  autoRotate = true,
  rotateInterval = 5000,
  onAvatarChange,
  className = ''
}) => {
  const { t } = useLanguage();
  const config = AVATAR_CONFIGS[tier];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate avatars
  useEffect(() => {
    if (!autoRotate || config.images.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % config.images.length;
          onAvatarChange?.(next);
          return next;
        });
        setIsTransitioning(false);
      }, 300);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, config.images.length, rotateInterval, onAvatarChange]);

  // Manual avatar selection
  const selectAvatar = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      onAvatarChange?.(index);
      setIsTransitioning(false);
    }, 300);
  }, [onAvatarChange]);

  if (tier === 'none' || config.images.length === 0) {
    return (
      <div className={`flex items-center justify-center ${sizeConfig[size].container} ${className}`}>
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Upgrade to unlock</p>
          <p className="text-xs">Animated Avatar</p>
        </div>
      </div>
    );
  }

  // Show all avatars in a grid
  if (showAll) {
    return (
      <div className={`grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 ${className}`}>
        {config.images.slice(0, 16).map((image, index) => (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:scale-110 ${
              currentIndex === index ? 'border-yellow-500 shadow-lg shadow-yellow-500/30' : 'border-border'
            }`}
            onClick={() => selectAvatar(index)}
          >
            <img
              src={image}
              alt={`Avatar ${index + 1}`}
              className="w-full h-full object-cover aspect-square"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    );
  }

  // Single avatar display with animation
  return (
    <div className={`relative ${className}`}>
      <Card
        className={`
          relative overflow-hidden transition-all duration-500
          ${sizeConfig[size].container}
          ${stateBorderColors[state]}
          ${stateAnimations[state]}
          border-2 shadow-lg
        `}
      >
        {/* Avatar Image */}
        <div className={`relative ${sizeConfig[size].container}`}>
          <img
            src={config.images[currentIndex]}
            alt={t('avatar.tutor')}
            className={`
              ${sizeConfig[size].image}
              object-cover rounded-lg
              transition-all duration-300
              ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
            `}
          />
          
          {/* State Indicator */}
          <div className={`
            absolute bottom-2 right-2 w-3 h-3 rounded-full
            ${state === 'speaking' ? 'bg-green-500 animate-ping' : ''}
            ${state === 'listening' ? 'bg-blue-500 animate-pulse' : ''}
            ${state === 'thinking' ? 'bg-purple-500 animate-spin' : ''}
            ${state === 'idle' ? 'bg-gray-500' : ''}
          `} />
          
          {/* Luxury Glow Effect for Premium Tiers */}
          {(tier === 'high_quality' || tier === 'exclusive') && (
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent pointer-events-none" />
          )}
        </div>
      </Card>
      
      {/* Message Bubble */}
      {message && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 max-w-xs">
          <div className={`
            bg-card/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg
            ${state === 'speaking' ? 'border-green-500' : 'border-border'}
          `}>
            <p className="text-sm text-foreground">{message}</p>
          </div>
        </div>
      )}
      
      {/* Avatar Navigation Dots */}
      {config.images.length > 1 && (
        <div className="flex justify-center gap-1 mt-2">
          {config.images.slice(0, 8).map((_, index) => (
            <button
              key={index}
              onClick={() => selectAvatar(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${currentIndex === index ? 'bg-yellow-500 scale-125' : 'bg-gray-500 hover:bg-gray-400'}
              `}
              aria-label={`Select avatar ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Floating Avatar Component - Shows avatar in corner of screen
 */
export const FloatingAvatar: React.FC<{
  tier: AvatarTier;
  state?: AvatarState;
  message?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onClose?: () => void;
}> = ({
  tier,
  state = 'idle',
  message,
  position = 'bottom-right',
  onClose
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  if (tier === 'none') return null;

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <div
        className={`
          transition-all duration-300 cursor-pointer
          ${isExpanded ? 'scale-100' : 'scale-75 hover:scale-90'}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <AnimatedAvatarShowcase
          tier={tier}
          size={isExpanded ? 'large' : 'medium'}
          state={state}
          message={isExpanded ? message : undefined}
          autoRotate={!isExpanded}
        />
      </div>
      
      {onClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-600"
        >
          ×
        </button>
      )}
    </div>
  );
};

/**
 * Avatar Tutor Panel - Full tutoring interface with avatar
 */
export const AvatarTutorPanel: React.FC<{
  tier: AvatarTier;
  lessonTitle?: string;
  currentContent?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  onRepeat?: () => void;
}> = ({
  tier,
  lessonTitle,
  currentContent,
  onNext,
  onPrevious,
  onRepeat
}) => {
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [avatarMessage, setAvatarMessage] = useState('');
  const { t } = useLanguage();

  // Simulate avatar speaking when content changes
  useEffect(() => {
    if (currentContent) {
      setAvatarState('speaking');
      setAvatarMessage(currentContent);
      
      const timeout = setTimeout(() => {
        setAvatarState('idle');
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentContent]);

  if (tier === 'none') {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground mb-4">
          Upgrade to unlock animated avatar tutoring
        </p>
        <a href="/pricing" className="text-yellow-500 hover:underline">
          View Plans →
        </a>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/50">
      {/* Lesson Title */}
      {lessonTitle && (
        <h3 className="text-lg font-bold mb-4 text-center">{lessonTitle}</h3>
      )}
      
      {/* Avatar Display */}
      <div className="flex justify-center mb-6">
        <AnimatedAvatarShowcase
          tier={tier}
          size="large"
          state={avatarState}
          message={avatarMessage}
          autoRotate={avatarState === 'idle'}
        />
      </div>
      
      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Previous
          </button>
        )}
        
        {onRepeat && (
          <button
            onClick={() => {
              setAvatarState('speaking');
              onRepeat();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            🔄 Repeat
          </button>
        )}
        
        {onNext && (
          <button
            onClick={onNext}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
          >
            Next →
          </button>
        )}
      </div>
    </Card>
  );
};

export default AnimatedAvatarShowcase;
