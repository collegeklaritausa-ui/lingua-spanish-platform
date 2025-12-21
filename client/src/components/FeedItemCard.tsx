import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { FeedItem } from '@/const/feedData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { Play, MessageSquare, BookOpen, Zap } from 'lucide-react';

interface FeedItemCardProps {
  item: FeedItem;
}

const CEFR_COLORS: Record<FeedItem['cefrLevel'], string> = {
  A1: 'bg-green-500',
  A2: 'bg-lime-500',
  B1: 'bg-yellow-500',
  B2: 'bg-orange-500',
  C1: 'bg-red-500',
};

const TYPE_ICONS: Record<FeedItem['type'], React.ReactNode> = {
  lesson: <BookOpen className="w-4 h-4" />,
  conversation: <MessageSquare className="w-4 h-4" />,
  quiz: <Zap className="w-4 h-4" />,
};

export const FeedItemCard: React.FC<FeedItemCardProps> = ({ item }) => {
  const { language, t } = useLanguage();

  const title = item.title[language] || item.title.en;
  const description = item.description[language] || item.description.en;

  return (
    <Card className="w-full max-w-md mx-auto my-4 overflow-hidden shadow-2xl border-primary/50 bg-card/90">
      <CardHeader className="p-0 relative">
        {/* Host Image - Placeholder for animated avatar */}
        <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${item.hostImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-4">
            <div className="flex justify-between items-center w-full">
              <span className={`px-3 py-1 text-xs font-bold rounded-full text-black ${CEFR_COLORS[item.cefrLevel]}`}>
                {item.cefrLevel}
              </span>
              <span className="text-sm text-foreground/80">
                {Math.floor(item.duration / 60)}m {item.duration % 60}s
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle className="text-xl font-bold text-primary mb-2">{title}</CardTitle>
        <p className="text-sm text-foreground/70">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-secondary">
          {TYPE_ICONS[item.type]}
          <span className="text-sm capitalize">{item.type}</span>
        </div>
        <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Play className="w-4 h-4 mr-2" />
          {t('button.start')}
        </Button>
      </CardFooter>
    </Card>
  );
};
