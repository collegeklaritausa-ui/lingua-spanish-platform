import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

// List of the main Prize2Pride host images
const HOST_IMAGES = [
  '/assets/avatars/prize2pride_poster_02_hosts_closeup.png',
  '/assets/avatars/prize2pride_poster_05_branding_hero.png',
  // We can add more specific host images later if they are isolated
];

interface AvatarHostProps {
  // The message the host is currently saying (for chat integration later)
  message: string;
  // A visual indicator of the host's state (e.g., listening, speaking, idle)
  state: 'idle' | 'listening' | 'speaking';
}

export const AvatarHost: React.FC<AvatarHostProps> = ({ message, state }) => {
  const { t } = useLanguage();
  const [currentHostIndex, setCurrentHostIndex] = useState(0);

  // Cycle through hosts every 10 seconds for a dynamic casino feel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHostIndex((prevIndex) => (prevIndex + 1) % HOST_IMAGES.length);
    }, 10000); // Change host every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const hostImage = HOST_IMAGES[currentHostIndex];

  // Determine the visual style based on the state
  const stateStyles = {
    idle: 'border-primary/50 shadow-lg',
    listening: 'border-secondary shadow-2xl shadow-secondary/50 animate-pulse',
    speaking: 'border-primary shadow-2xl shadow-primary/50 animate-bounce-slow',
  };

  return (
    <Card className={`relative w-full max-w-sm mx-auto overflow-hidden transition-all duration-500 ${stateStyles[state]}`}>
      <div className="aspect-square">
        <img
          src={hostImage}
          alt={t('host.alt_text')}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-4">
        <div className={`p-3 rounded-lg bg-card/90 backdrop-blur-sm border ${state === 'speaking' ? 'border-primary' : 'border-muted'}`}>
          <p className="text-sm text-foreground">
            {message || t('host.default_message')}
          </p>
        </div>
      </div>
    </Card>
  );
};
