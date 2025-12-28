import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Feed from "./pages/Feed";
import ChatArena from "./pages/ChatArena";
import Curriculum from "./pages/Curriculum";
import LessonDetail from "./pages/LessonDetail";
import VocabularyPractice from "./pages/VocabularyPractice";
import ProgressDashboard from "./pages/ProgressDashboard";
import Tools from "./pages/Tools";
import LevelSelector from "./pages/LevelSelector";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Feed} />
      <Route path={"/chat"} component={ChatArena} />
      <Route path={"/curriculum"} component={Curriculum} />
      <Route path={"/lesson/:slug"} component={LessonDetail} />
      <Route path={"/vocabulary"} component={VocabularyPractice} />
      <Route path={"/progress"} component={ProgressDashboard} />
      <Route path={"/tools"} component={Tools} />
      <Route path={"/levels"} component={LevelSelector} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="dark"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
