import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { Streamdown } from 'streamdown';
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AvatarHost } from "@/components/AvatarHost";

/**
 * All content in this page are only for example, replace with your own feature implementation
 * When building pages, remember your instructions in Frontend Workflow, Frontend Best Practices, Design Guide and Common Pitfalls
 */
export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();

  // If theme is switchable in App.tsx, we can implement theme toggling like this:
  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow">
        {/* Example: lucide-react for icons */}
        <div className="flex justify-end p-4">
          <LanguageSelector />
        </div>
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">{t('app.title')}</h1>
          <p className="text-xl mb-8">{t('welcome.message')}</p>
          <Button variant="default" size="lg">
            {t('button.start')}
          </Button>
          {/* Example: lucide-react for icons */}
          <div className="mt-8">
            <AvatarHost message={t('host.default_message')} state="idle" />
          </div>
          <Loader2 className="animate-spin mt-8" />
          {/* Example: Streamdown for markdown rendering */}
          <Streamdown className="mt-4">
            {t('nav.home')} - {t('nav.lessons')} - {t('nav.profile')}
          </Streamdown>
        </div>
      </main>
    </div>
  );
}
