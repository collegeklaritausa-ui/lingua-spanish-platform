/**
 * Prize2Pride Lingua Spanish Platform
 * Luxury Chat Arena - Beautiful Interactive Learning Interface
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Features:
 * - Stunning luxury design (gold, royal blue, black)
 * - Animated avatar tutors always visible
 * - Multi-colored formatting for explanations
 * - Bold important words, stressed syllables highlighted
 * - Line breaks after expressions for comfortable reading
 * - Course generation integrated with chat
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Mic, 
  Volume2, 
  Settings, 
  BookOpen, 
  Sparkles,
  Crown,
  Star,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedAvatarShowcase } from '@/components/AnimatedAvatarShowcase';
import { LANGUAGE_MODES } from '@/const/languageModes';

// Types
interface ChatMessage {
  id: string;
  type: 'user' | 'avatar' | 'lesson' | 'system';
  content: string;
  formattedContent?: FormattedContent[];
  timestamp: Date;
  avatarState?: 'speaking' | 'thinking' | 'celebrating';
}

interface FormattedContent {
  text: string;
  style: 'normal' | 'bold' | 'stressed' | 'important' | 'example' | 'translation' | 'grammar' | 'cultural';
  color?: string;
  newLine?: boolean;
  spacing?: 'normal' | 'large' | 'extra';
}

// Color palette for different content types
const CONTENT_COLORS = {
  normal: '#E5E7EB',
  bold: '#FBBF24',      // Gold
  stressed: '#F97316',   // Orange for stressed syllables
  important: '#EF4444',  // Red for very important
  example: '#34D399',    // Green for examples
  translation: '#60A5FA', // Blue for translations
  grammar: '#A78BFA',    // Purple for grammar
  cultural: '#F472B6',   // Pink for cultural notes
};

// Format Spanish lesson content with colors and styling
const formatLessonContent = (text: string): FormattedContent[] => {
  const formatted: FormattedContent[] = [];
  
  // Parse the text and apply formatting
  const lines = text.split('\n');
  
  lines.forEach((line, lineIndex) => {
    // Detect and format different content types
    if (line.startsWith('📚') || line.startsWith('VOCABULARIO') || line.startsWith('VOCABULARY')) {
      formatted.push({ text: line, style: 'bold', color: CONTENT_COLORS.bold, newLine: true, spacing: 'large' });
    }
    else if (line.startsWith('🎯') || line.startsWith('IMPORTANTE') || line.startsWith('IMPORTANT')) {
      formatted.push({ text: line, style: 'important', color: CONTENT_COLORS.important, newLine: true, spacing: 'large' });
    }
    else if (line.startsWith('💡') || line.startsWith('EJEMPLO') || line.startsWith('EXAMPLE')) {
      formatted.push({ text: line, style: 'example', color: CONTENT_COLORS.example, newLine: true, spacing: 'normal' });
    }
    else if (line.startsWith('🌍') || line.startsWith('CULTURAL') || line.startsWith('CULTURA')) {
      formatted.push({ text: line, style: 'cultural', color: CONTENT_COLORS.cultural, newLine: true, spacing: 'normal' });
    }
    else if (line.startsWith('📖') || line.startsWith('GRAMÁTICA') || line.startsWith('GRAMMAR')) {
      formatted.push({ text: line, style: 'grammar', color: CONTENT_COLORS.grammar, newLine: true, spacing: 'large' });
    }
    else if (line.includes('→') || line.includes('=')) {
      // Translation line
      const parts = line.split(/[→=]/);
      if (parts.length >= 2) {
        formatted.push({ text: parts[0].trim(), style: 'bold', color: CONTENT_COLORS.bold, newLine: false });
        formatted.push({ text: ' → ', style: 'normal', color: CONTENT_COLORS.normal, newLine: false });
        formatted.push({ text: parts[1].trim(), style: 'translation', color: CONTENT_COLORS.translation, newLine: true, spacing: 'normal' });
      } else {
        formatted.push({ text: line, style: 'normal', color: CONTENT_COLORS.normal, newLine: true });
      }
    }
    else if (line.match(/\*\*.*\*\*/)) {
      // Bold text with **
      const parts = line.split(/(\*\*.*?\*\*)/);
      parts.forEach((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          formatted.push({ 
            text: part.slice(2, -2), 
            style: 'bold', 
            color: CONTENT_COLORS.bold, 
            newLine: i === parts.length - 1 
          });
        } else if (part) {
          formatted.push({ 
            text: part, 
            style: 'normal', 
            color: CONTENT_COLORS.normal, 
            newLine: i === parts.length - 1 
          });
        }
      });
    }
    else if (line.match(/\[.*\]/)) {
      // Stressed syllables in brackets
      const parts = line.split(/(\[.*?\])/);
      parts.forEach((part, i) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          formatted.push({ 
            text: part.slice(1, -1), 
            style: 'stressed', 
            color: CONTENT_COLORS.stressed, 
            newLine: false 
          });
        } else if (part) {
          formatted.push({ 
            text: part, 
            style: 'normal', 
            color: CONTENT_COLORS.normal, 
            newLine: i === parts.length - 1 
          });
        }
      });
      if (parts.length > 0) {
        formatted[formatted.length - 1].newLine = true;
      }
    }
    else if (line.trim()) {
      formatted.push({ text: line, style: 'normal', color: CONTENT_COLORS.normal, newLine: true, spacing: 'normal' });
    }
    else {
      // Empty line for spacing
      formatted.push({ text: '', style: 'normal', newLine: true, spacing: 'large' });
    }
  });
  
  return formatted;
};

// Render formatted content
const FormattedText: React.FC<{ content: FormattedContent[] }> = ({ content }) => {
  return (
    <div className="leading-relaxed">
      {content.map((item, index) => (
        <React.Fragment key={index}>
          <span
            style={{ 
              color: item.color || CONTENT_COLORS.normal,
              fontWeight: item.style === 'bold' || item.style === 'important' ? 'bold' : 'normal',
              fontStyle: item.style === 'cultural' ? 'italic' : 'normal',
              textDecoration: item.style === 'stressed' ? 'underline' : 'none',
              fontSize: item.style === 'important' ? '1.1em' : '1em',
              backgroundColor: item.style === 'stressed' ? 'rgba(249, 115, 22, 0.2)' : 'transparent',
              padding: item.style === 'stressed' ? '0 4px' : '0',
              borderRadius: item.style === 'stressed' ? '4px' : '0',
            }}
          >
            {item.text}
          </span>
          {item.newLine && <br />}
          {item.spacing === 'large' && <div className="h-4" />}
          {item.spacing === 'extra' && <div className="h-6" />}
        </React.Fragment>
      ))}
    </div>
  );
};

// Sample lesson generator
const generateSampleLesson = (topic: string, mode: string, level: string): string => {
  const lessons: Record<string, string> = {
    greetings_formal: `
📚 VOCABULARIO - Saludos Formales

**Buenos días** → Good morning
Pronunciación: [BWE-nos] [DÍ-as]

**Buenas tardes** → Good afternoon
Pronunciación: [BWE-nas] [TAR-des]

**Buenas noches** → Good evening/night
Pronunciación: [BWE-nas] [NO-ches]

🎯 IMPORTANTE

En español formal, usamos **"usted"** en lugar de "tú".

**¿Cómo está usted?** → How are you? (formal)
Pronunciación: [KÓ-mo] es-[TÁ] us-[TED]

💡 EJEMPLO

— Buenos días, señor García. ¿Cómo está usted?
— Muy bien, gracias. ¿Y usted?

📖 GRAMÁTICA

El verbo **"estar"** se conjuga así con usted:
**Usted está** → You are (formal)

🌍 CULTURAL

En España y Latinoamérica, es importante usar el tratamiento formal con:
• Personas mayores
• En contextos profesionales
• Con desconocidos
`,
    greetings_informal: `
📚 VOCABULARIO - Saludos Informales

**¡Hola!** → Hi!
Pronunciación: [Ó-la]

**¿Qué tal?** → How's it going?
Pronunciación: [ké] [tal]

**¿Qué pasa?** → What's up?
Pronunciación: [ké] [PÁ-sa]

**¿Cómo estás?** → How are you?
Pronunciación: [KÓ-mo] es-[TÁS]

🎯 IMPORTANTE

Con amigos y familia, usamos **"tú"** - ¡es más cercano!

💡 EJEMPLO

— ¡Hola, María! ¿Qué tal?
— ¡Muy bien! ¿Y tú?
— Genial, gracias.

📖 GRAMÁTICA

El verbo **"estar"** con tú:
**Tú estás** → You are (informal)

**Despedidas informales:**
• ¡Hasta luego! → See you later!
• ¡Nos vemos! → See you!
• ¡Chao! → Bye!
`,
    greetings_slang: `
📚 VOCABULARIO - Saludos Callejeros 🔥

**¡Qué pasa, tío!** → What's up, dude! (España)
Pronunciación: [ké] [PÁ-sa] [TÍ-o]

**¡Qué onda, güey!** → What's up, dude! (México)
Pronunciación: [ké] [ÓN-da] [güey]

**¡Che, qué hacés!** → Hey, what's up! (Argentina)
Pronunciación: [che] [ké] a-[SÉS]

🎯 IMPORTANTE

El slang varía MUCHO según el país:
• **España**: tío, tía, mola, guay
• **México**: güey, chido, padre
• **Argentina**: che, boludo, copado

💡 EJEMPLO

España:
— ¡Ey, tío! ¿Qué tal el finde?
— ¡Mola mazo! Fuimos de

 

fiesta.

México:
— ¡Qué onda, güey! ¿Qué haces?
— Aquí nomás, ¿y tú qué?

🌍 CULTURAL

⚠️ Cuidado: algunas palabras son ofensivas en ciertos países.
"Coger" significa "tomar" en España, pero es vulgar en Latinoamérica.
`,
  };
  
  const key = `${topic}_${mode}`;
  return lessons[key] || lessons['greetings_formal'];
};

const LuxuryChatArena: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking' | 'listening' | 'thinking'>('idle');
  const [selectedMode, setSelectedMode] = useState('formal');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [currentTopic, setCurrentTopic] = useState('greetings');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initial welcome message with lesson
  useEffect(() => {
    const welcomeLesson = generateSampleLesson(currentTopic, selectedMode, selectedLevel);
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'avatar',
      content: `¡Bienvenido a Prize2Pride! 👑\n\nSoy tu tutor de español. Hoy aprenderemos sobre **saludos en modo ${selectedMode}**.\n\n${welcomeLesson}`,
      formattedContent: formatLessonContent(`¡Bienvenido a Prize2Pride! 👑\n\nSoy tu tutor de español. Hoy aprenderemos sobre **saludos en modo ${selectedMode}**.\n\n${welcomeLesson}`),
      timestamp: new Date(),
      avatarState: 'speaking'
    };
    setMessages([welcomeMessage]);
    setAvatarState('speaking');
    setTimeout(() => setAvatarState('idle'), 3000);
  }, []);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setAvatarState('thinking');

    // Simulate AI response with lesson content
    setTimeout(() => {
      const responseContent = generateAIResponse(inputValue, selectedMode, selectedLevel);
      const avatarMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'avatar',
        content: responseContent,
        formattedContent: formatLessonContent(responseContent),
        timestamp: new Date(),
        avatarState: 'speaking'
      };

      setMessages(prev => [...prev, avatarMessage]);
      setIsLoading(false);
      setAvatarState('speaking');
      setTimeout(() => setAvatarState('idle'), 3000);
    }, 1500);
  };

  // Generate AI response based on user input
  const generateAIResponse = (userInput: string, mode: string, level: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hola') || input.includes('hello') || input.includes('hi')) {
      return `
¡Excelente! Has dicho **"${userInput}"** 🎉

📚 RESPUESTAS POSIBLES

**Formal:**
— Hola, ¿cómo está usted?
— Buenos días, encantado de conocerle.

**Informal:**
— ¡Hola! ¿Qué tal?
— ¡Hey! ¿Cómo estás?

💡 PRÁCTICA

Intenta responder a este saludo:
"¡Hola! ¿Cómo te llamas?"

🎯 RECUERDA

En español, **"¡"** y **"¿"** van al principio de exclamaciones y preguntas.
`;
    }
    
    if (input.includes('gracias') || input.includes('thank')) {
      return `
¡Muy bien! **"Gracias"** es una palabra muy importante 👏

📚 FORMAS DE DAR LAS GRACIAS

**Gracias** → Thanks
Pronunciación: [GRA-sias]

**Muchas gracias** → Thank you very much
Pronunciación: [MU-chas] [GRA-sias]

**Muchísimas gracias** → Thank you so much
Pronunciación: [mu-CHÍ-si-mas] [GRA-sias]

💡 RESPUESTAS A "GRACIAS"

**De nada** → You're welcome
**No hay de qué** → Don't mention it
**A ti** → Thank you (returning thanks)

🌍 CULTURAL

En España también se dice **"¡De

 

buen rollo!"** (informal)
En México: **"¡No hay bronca!"**
`;
    }
    
    // Default response with new lesson
    return `
¡Interesante pregunta! 🤔

Veo que has escrito: **"${userInput}"**

📚 CONTINUEMOS CON LA LECCIÓN

Aquí tienes más vocabulario útil:

**Por favor** → Please
Pronunciación: [por] fa-[VOR]

**Perdón** → Sorry / Excuse me
Pronunciación: [per-DÓN]

**Lo siento** → I'm sorry
Pronunciación: [lo] [SIEN-to]

💡 EJEMPLO EN CONTEXTO

— Perdón, ¿puede repetir?
— Sí, claro. Buenos días.
— Muchas gracias.
— De nada.

🎯 EJERCICIO

Intenta formar una oración usando **"por favor"** y **"gracias"**.
`;
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Generate new lesson
  const handleNewLesson = () => {
    const topics = ['greetings', 'numbers', 'colors', 'food', 'travel'];
    const newTopic = topics[Math.floor(Math.random() * topics.length)];
    setCurrentTopic(newTopic);
    
    const lessonContent = generateSampleLesson(newTopic, selectedMode, selectedLevel);
    const lessonMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'lesson',
      content: `📖 NUEVA LECCIÓN: ${newTopic.toUpperCase()}\n\n${lessonContent}`,
      formattedContent: formatLessonContent(`📖 NUEVA LECCIÓN: ${newTopic.toUpperCase()}\n\n${lessonContent}`),
      timestamp: new Date(),
      avatarState: 'speaking'
    };
    
    setMessages(prev => [...prev, lessonMessage]);
    setAvatarState('speaking');
    setTimeout(() => setAvatarState('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Luxury Header */}
      <header className="bg-gradient-to-r from-yellow-600/20 via-yellow-500/10 to-yellow-600/20 border-b border-yellow-500/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Crown className="w-8 h-8 text-yellow-500" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Prize2Pride Chat Arena
                </h1>
                <p className="text-sm text-gray-400">Interactive Spanish Learning</p>
              </div>
            </div>
            
            {/* Mode & Level Selectors */}
            <div className="flex items-center gap-4">
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="bg-gray-800 border border-yellow-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="formal">🎩 Formal</option>
                <option value="informal">😊 Informal</option>
                <option value="slang">🔥 Slang</option>
                <option value="dirty">🔞 Adult (18+)</option>
                <option value="expert">🎓 Expert</option>
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-gray-800 border border-yellow-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper Int.</option>
                <option value="C1">C1 - Advanced</option>
                <option value="C2">C2 - Mastery</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          
          {/* Avatar Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-yellow-500/20 backdrop-blur-sm overflow-hidden">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-yellow-500 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Tu Tutor Avatar
                  </h2>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${avatarState === 'speaking' ? 'bg-green-500/20 text-green-400 border-green-500' : ''}
                      ${avatarState === 'thinking' ? 'bg-purple-500/20 text-purple-400 border-purple-500' : ''}
                      ${avatarState === 'listening' ? 'bg-blue-500/20 text-blue-400 border-blue-500' : ''}
                      ${avatarState === 'idle' ? 'bg-gray-500/20 text-gray-400 border-gray-500' : ''}
                    `}
                  >
                    {avatarState === 'speaking' && '🗣️ Hablando'}
                    {avatarState === 'thinking' && '🤔 Pensando'}
                    {avatarState === 'listening' && '👂 Escuchando'}
                    {avatarState === 'idle' && '😊 Listo'}
                  </Badge>
                </div>
                
                {/* Avatar Display */}
                <div className="flex-1 flex items-center justify-center">
                  <div className={`
                    relative rounded-2xl overflow-hidden border-4 transition-all duration-500
                    ${avatarState === 'speaking' ? 'border-green-500 shadow-lg shadow-green-500/30 animate-pulse' : ''}
                    ${avatarState === 'thinking' ? 'border-purple-500 shadow-lg shadow-purple-500/30' : ''}
                    ${avatarState === 'idle' ? 'border-yellow-500/50' : ''}
                  `}>
                    <img
                      src="/Prize2Pride_Posters/poster_006.png"
                      alt="Avatar Tutor"
                      className="w-full h-auto max-h-80 object-cover"
                    />
                    
                    {/* Speaking Animation Overlay */}
                    {avatarState === 'speaking' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent animate-pulse" />
                    )}
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-500"
                    onClick={handleNewLesson}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Nueva Lección
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-500/30 hover:bg-blue-500/10 text-blue-500"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Escuchar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Chat Panel */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-yellow-500/20 backdrop-blur-sm flex flex-col overflow-hidden">
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[85%] rounded-2xl p-5 shadow-lg
                        ${message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                          : 'bg-gradient-to-r from-gray-700/90 to-gray-800/90 border border-yellow-500/20'
                        }
                      `}
                    >
                      {message.type !== 'user' && (
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-yellow-500/20">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-500 font-semibold text-sm">
                            Tutor Prize2Pride
                          </span>
                        </div>
                      )}
                      
                      {message.formattedContent ? (
                        <FormattedText content={message.formattedContent} />
                      ) : (
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      )}
                      
                      <div className="mt-3 pt-2 border-t border-white/10 text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-gray-700/90 to-gray-800/90 border border-yellow-500/20 rounded-2xl p-5 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-yellow-500 text-sm">El tutor está pensando...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area */}
              <div className="p-4 border-t border-yellow-500/20 bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe en español o en tu idioma..."
                      className="w-full bg-gray-800 border border-yellow-500/30 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-6 py-4 rounded-xl transition-all disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-yellow-500/30 hover:bg-yellow-500/10 px-4 py-4 rounded-xl"
                  >
                    <Mic className="w-5 h-5 text-yellow-500" />
                  </Button>
                </div>
                
                {/* Quick Phrases */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {['¡Hola!', '¿Cómo estás?', 'Gracias', 'Por favor', 'No entiendo'].map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => setInputValue(phrase)}
                      className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 hover:border-yellow-500/50 hover:text-yellow-500 transition-all"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryChatArena;
