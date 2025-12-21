import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AvatarHost } from "@/components/AvatarHost";
import { MOCK_FEED_DATA, FeedItem } from "@/const/feedData";
import { trpc } from "@/lib/trpc";
import { FeedItemCard } from "@/components/FeedItemCard";
import { Loader2 } from "lucide-react";

/**
 * The main TikTok-like feed page for the Prize2Pride platform.
 */
export default function Feed() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();

  const { data: scrapedLessons, isLoading: isLessonsLoading } = trpc.lesson.getLessons.useQuery();

  // Combine mock data with scraped data for a richer feed
  const feedData: FeedItem[] = [
    ...MOCK_FEED_DATA,
    ...(scrapedLessons || []).map(lesson => ({
      id: lesson.slug,
      type: 'lesson' as const,
      title: { en: lesson.title, es: lesson.title }, // Simplified for now
      description: { en: lesson.contentEnglish.substring(0, 100) + '...', es: lesson.content.substring(0, 100) + '...' },
      hostImage: '/assets/avatars/prize2pride_poster_05_branding_hero.png',
      cefrLevel: lesson.cefrLevel,
      duration: 90, // Placeholder duration
    }))
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full bg-card/90 backdrop-blur-sm border-b border-border p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">{t('app.title')}</h1>
        <LanguageSelector />
      </header>

      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full max-w-lg mb-8">
          <AvatarHost message={t('host.default_message')} state="idle" />
        </div>

        <h2 className="text-2xl font-semibold text-secondary mb-4">
          {t('nav.lessons')}
        </h2>

        {loading || isLessonsLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="animate-spin w-8 h-8 text-primary" />
            <p className="mt-2 text-muted-foreground">Loading Feed and Autonomous Content...</p>
          </div>
        ) : (
          <div className="w-full max-w-lg space-y-6">
            {feedData.map((item) => (
              <FeedItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      <footer className="w-full bg-card/90 backdrop-blur-sm border-t border-border p-4 text-center text-xs text-muted-foreground">
        © 2025 Prize2Pride. All rights reserved.
      </footer>
    </div>
  );
}
