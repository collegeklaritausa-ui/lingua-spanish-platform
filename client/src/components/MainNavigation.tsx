import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  BookOpen, 
  MessageSquare, 
  GraduationCap,
  Brain,
  BarChart3,
  Wrench,
  Menu,
  Home,
  Layers,
  User,
  LogOut,
  Settings,
  ChevronDown
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
  { label: 'Levels', path: '/levels', icon: <Layers className="w-4 h-4" /> },
  { label: 'Curriculum', path: '/curriculum', icon: <BookOpen className="w-4 h-4" />, badge: '10K+' },
  { label: 'Vocabulary', path: '/vocabulary', icon: <Brain className="w-4 h-4" /> },
  { label: 'Chat Arena', path: '/chat', icon: <MessageSquare className="w-4 h-4" /> },
  { label: 'Tools', path: '/tools', icon: <Wrench className="w-4 h-4" />, badge: 'New' },
  { label: 'Progress', path: '/progress', icon: <BarChart3 className="w-4 h-4" /> },
];

export default function MainNavigation() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setLocation('/')}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Prize2Pride</h1>
              <p className="text-xs text-gray-400">Spanish A1-C2</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => setLocation(item.path)}
                className={`
                  relative px-3 h-10
                  ${isActive(item.path) 
                    ? 'text-white bg-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
                {item.badge && (
                  <Badge className="ml-2 bg-purple-500/20 text-purple-300 border-0 text-xs px-1.5 py-0">
                    {item.badge}
                  </Badge>
                )}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-purple-500 rounded-full" />
                )}
              </Button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-white/10">
                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 focus:text-white focus:bg-white/10"
                  onClick={() => setLocation('/progress')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  My Progress
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-gray-400 hover:text-white">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-slate-900 border-white/10 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">Prize2Pride</h2>
                        <p className="text-xs text-gray-400">Spanish Learning Platform</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Nav Items */}
                  <div className="flex-1 py-4">
                    {navItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          setLocation(item.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                          ${isActive(item.path) 
                            ? 'text-white bg-purple-500/20 border-l-2 border-purple-500' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge className="ml-auto bg-purple-500/20 text-purple-300 border-0 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Guest User</p>
                        <p className="text-xs text-gray-400">Sign in for progress tracking</p>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Sign In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
