/**
 * Prize2Pride Lingua Spanish Platform
 * AI Tutor Engine - Autonomous Intelligent Tutoring System
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * The brain of the platform - like Manus, but for Spanish learning
 */

import OpenAI from 'openai';

// Initialize OpenAI client (uses environment variables)
const openai = new OpenAI();

// Types
export interface TutorContext {
  userId: string;
  userLevel: string; // A1-C2
  userMode: string; // formal, informal, slang, dirty, expert
  userLanguage: string; // en, fr, de, it, ar, zh
  conversationHistory: ConversationMessage[];
  currentTopic?: string;
  learningGoals?: string[];
  weakAreas?: string[];
  strongAreas?: string[];
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    corrections?: Correction[];
    suggestions?: string[];
    vocabulary?: VocabularyItem[];
    grammarPoints?: string[];
  };
}

export interface Correction {
  original: string;
  corrected: string;
  explanation: string;
  type: 'spelling' | 'grammar' | 'vocabulary' | 'style';
}

export interface VocabularyItem {
  spanish: string;
  pronunciation: string;
  translation: string;
  example: string;
}

export interface TutorResponse {
  message: string;
  formattedMessage: FormattedContent[];
  corrections?: Correction[];
  suggestions?: string[];
  vocabulary?: VocabularyItem[];
  grammarPoints?: string[];
  encouragement?: string;
  nextSteps?: string[];
}

export interface FormattedContent {
  text: string;
  type: 'normal' | 'spanish' | 'translation' | 'pronunciation' | 'important' | 'example' | 'grammar' | 'cultural';
  bold?: boolean;
  newLine?: boolean;
}

// System prompts for different modes
const SYSTEM_PROMPTS: Record<string, string> = {
  formal: `You are an expert Spanish tutor specializing in formal, professional Spanish.
Your role is to teach formal Spanish used in business, academic, and professional settings.
Always use "usted" form and formal vocabulary.
Correct any informal language and explain the formal alternative.
Focus on: professional greetings, formal letter writing, business vocabulary, academic Spanish.`,

  informal: `You are a friendly Spanish tutor teaching everyday conversational Spanish.
Your role is to teach casual, everyday Spanish used with friends and family.
Use "tú" form and natural, conversational vocabulary.
Make learning fun and relatable with everyday examples.
Focus on: casual greetings, slang basics, everyday expressions, social situations.`,

  slang: `You are a cool Spanish tutor teaching street Spanish and regional slang.
Your role is to teach authentic slang from different Spanish-speaking countries.
Explain regional variations (Spain, Mexico, Argentina, etc.).
Always clarify context and appropriateness of slang terms.
Focus on: regional expressions, youth slang, internet Spanish, colloquialisms.`,

  dirty: `You are an adult Spanish tutor teaching mature language content (18+).
Your role is to teach adult vocabulary and expressions in a responsible way.
Always include context about when and where such language is appropriate.
Warn about potentially offensive terms and regional differences.
Focus on: adult expressions, vulgar vocabulary, curse words, romantic language.`,

  expert: `You are a master Spanish linguist teaching native-level Spanish.
Your role is to teach advanced linguistic concepts and dialectal variations.
Cover voseo, vosotros, regional dialects, and specialized vocabulary.
Discuss etymology, linguistic history, and subtle nuances.
Focus on: dialectal variations, literary Spanish, professional jargon, linguistic analysis.`,
};

// Format response with colors and styling
function formatResponse(text: string): FormattedContent[] {
  const formatted: FormattedContent[] = [];
  const lines = text.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (!trimmed) {
      formatted.push({ text: '', type: 'normal', newLine: true });
      continue;
    }

    // Section headers
    if (trimmed.match(/^(📚|🎯|💡|🌍|📖|⚠️|✨|🔥|👑)/)) {
      formatted.push({ text: trimmed, type: 'important', bold: true, newLine: true });
      continue;
    }

    // Spanish words with translations (→ or =)
    if (trimmed.includes('→') || trimmed.includes('=')) {
      const separator = trimmed.includes('→') ? '→' : '=';
      const parts = trimmed.split(separator);
      if (parts.length >= 2) {
        formatted.push({ text: parts[0].trim(), type: 'spanish', bold: true });
        formatted.push({ text: ` ${separator} `, type: 'normal' });
        formatted.push({ text: parts[1].trim(), type: 'translation', newLine: true });
        continue;
      }
    }

    // Pronunciation guides
    if (trimmed.toLowerCase().startsWith('pronunciación:') || trimmed.toLowerCase().startsWith('pronunciation:')) {
      formatted.push({ text: trimmed, type: 'pronunciation', newLine: true });
      continue;
    }

    // Bold text **text**
    if (trimmed.includes('**')) {
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/);
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part.startsWith('**') && part.endsWith('**')) {
          formatted.push({ text: part.slice(2, -2), type: 'spanish', bold: true });
        } else if (part) {
          formatted.push({ text: part, type: 'normal' });
        }
      }
      formatted.push({ text: '', type: 'normal', newLine: true });
      continue;
    }

    // Default
    formatted.push({ text: trimmed, type: 'normal', newLine: true });
  }

  return formatted;
}

// Analyze user input for errors
async function analyzeUserInput(
  input: string,
  context: TutorContext
): Promise<{ corrections: Correction[]; analysis: string }> {
  const corrections: Correction[] = [];
  
  // Basic Spanish error detection (can be enhanced with NLP)
  const commonErrors: [RegExp, string, string, string][] = [
    [/\byo soy tengo\b/i, 'yo soy tengo', 'yo tengo', 'Don\'t combine "ser" and "tener"'],
    [/\bestoy bien\b/i, 'estoy bien', 'estoy bien', 'Correct! "Estar" is used for temporary states'],
    [/\bmucho bueno\b/i, 'mucho bueno', 'muy bueno', 'Use "muy" before adjectives, "mucho" before nouns'],
    [/\byo gusto\b/i, 'yo gusto', 'me gusta', 'Use "gustar" with indirect object pronouns'],
  ];

  for (const [pattern, original, corrected, explanation] of commonErrors) {
    if (pattern.test(input) && original !== corrected) {
      corrections.push({
        original,
        corrected,
        explanation,
        type: 'grammar',
      });
    }
  }

  return {
    corrections,
    analysis: corrections.length > 0 
      ? `Found ${corrections.length} area(s) for improvement` 
      : 'Great Spanish! Keep it up!',
  };
}

// Generate tutor response using AI
export async function generateTutorResponse(
  userInput: string,
  context: TutorContext
): Promise<TutorResponse> {
  // Analyze user input
  const { corrections } = await analyzeUserInput(userInput, context);

  // Build conversation history for context
  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    {
      role: 'system',
      content: `${SYSTEM_PROMPTS[context.userMode] || SYSTEM_PROMPTS.formal}

Current student level: ${context.userLevel}
Student's interface language: ${context.userLanguage}
Current topic: ${context.currentTopic || 'general conversation'}

IMPORTANT FORMATTING RULES:
1. Use **bold** for Spanish words and important terms
2. Use → for translations (Spanish → English)
3. Use [SYLLABLE] for stressed syllables in pronunciation
4. Add emojis for section headers: 📚 VOCABULARIO, 🎯 IMPORTANTE, 💡 EJEMPLO, 📖 GRAMÁTICA, 🌍 CULTURAL
5. Put each new concept on a new line
6. Be encouraging and supportive
7. Include humor when appropriate
8. Always provide pronunciation guides for new vocabulary`,
    },
  ];

  // Add conversation history (last 10 messages)
  const recentHistory = context.conversationHistory.slice(-10);
  for (const msg of recentHistory) {
    messages.push({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    });
  }

  // Add current user input
  messages.push({
    role: 'user',
    content: userInput,
  });

  try {
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini', // Using the available model
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content || 
      '¡Hola! I\'m having trouble understanding. Could you rephrase that?';

    // Format the response
    const formattedMessage = formatResponse(responseText);

    // Extract vocabulary from response
    const vocabulary: VocabularyItem[] = [];
    const vocabMatches = responseText.matchAll(/\*\*([^*]+)\*\*\s*→\s*([^\n]+)/g);
    for (const match of vocabMatches) {
      vocabulary.push({
        spanish: match[1],
        pronunciation: '',
        translation: match[2],
        example: '',
      });
    }

    return {
      message: responseText,
      formattedMessage,
      corrections: corrections.length > 0 ? corrections : undefined,
      vocabulary: vocabulary.length > 0 ? vocabulary : undefined,
      encouragement: getEncouragement(context.userLevel),
      nextSteps: getNextSteps(context),
    };
  } catch (error) {
    console.error('AI Tutor Error:', error);
    
    // Fallback response
    return {
      message: generateFallbackResponse(userInput, context),
      formattedMessage: formatResponse(generateFallbackResponse(userInput, context)),
      corrections,
    };
  }
}

// Generate fallback response when AI is unavailable
function generateFallbackResponse(userInput: string, context: TutorContext): string {
  const input = userInput.toLowerCase();

  if (input.includes('hola') || input.includes('hello') || input.includes('hi')) {
    return `¡Hola! 👋

📚 VOCABULARIO - Saludos

**Hola** → Hello
Pronunciación: [Ó-la]

**¿Cómo estás?** → How are you?
Pronunciación: [KÓ-mo] es-[TÁS]

💡 EJEMPLO

— ¡Hola! ¿Cómo estás?
— ¡Muy bien, gracias! ¿Y tú?

🎯 IMPORTANTE

In Spanish, we use **¡** and **¿** at the beginning of exclamations and questions!`;
  }

  if (input.includes('gracias') || input.includes('thank')) {
    return `¡De nada! 😊

📚 VOCABULARIO - Agradecimientos

**Gracias** → Thank you
Pronunciación: [GRA-sias]

**Muchas gracias** → Thank you very much
Pronunciación: [MU-chas] [GRA-sias]

**De nada** → You're welcome
Pronunciación: [de] [NA-da]

💡 EJEMPLO

— Muchas gracias por tu ayuda.
— ¡De nada! Siempre es un placer.`;
  }

  return `¡Interesante! 🤔

I see you wrote: **"${userInput}"**

📚 Let me help you with some useful vocabulary:

**Por favor** → Please
Pronunciación: [por] fa-[VOR]

**Perdón** → Sorry / Excuse me
Pronunciación: [per-DÓN]

💡 PRÁCTICA

Try using these words in a sentence!

🎯 TIP

The more you practice, the better you'll get. ¡Sigue adelante! (Keep going!)`;
}

// Get encouraging message based on level
function getEncouragement(level: string): string {
  const encouragements: Record<string, string[]> = {
    A1: [
      '¡Muy bien! You\'re making great progress!',
      '¡Excelente! Keep up the good work!',
      '¡Fantástico! Every word you learn is a step forward!',
    ],
    A2: [
      '¡Genial! Your Spanish is improving!',
      '¡Increíble! You\'re getting better every day!',
      '¡Bravo! Keep practicing!',
    ],
    B1: [
      '¡Impresionante! Your Spanish is really coming along!',
      '¡Maravilloso! You\'re becoming more fluent!',
      '¡Estupendo! Great job!',
    ],
    B2: [
      '¡Fenomenal! Your Spanish is advanced!',
      '¡Sobresaliente! Excellent work!',
      '¡Magnífico! You\'re almost fluent!',
    ],
    C1: [
      '¡Extraordinario! Your Spanish is near-native!',
      '¡Espectacular! Impressive skills!',
      '¡Sublime! You\'re mastering the language!',
    ],
    C2: [
      '¡Perfecto! Native-level Spanish!',
      '¡Excepcional! You\'ve mastered Spanish!',
      '¡Brillante! Truly impressive!',
    ],
  };

  const levelEncouragements = encouragements[level] || encouragements.A1;
  return levelEncouragements[Math.floor(Math.random() * levelEncouragements.length)];
}

// Get next steps based on context
function getNextSteps(context: TutorContext): string[] {
  const steps: string[] = [];

  if (context.currentTopic) {
    steps.push(`Continue practicing ${context.currentTopic}`);
  }

  if (context.weakAreas && context.weakAreas.length > 0) {
    steps.push(`Review: ${context.weakAreas[0]}`);
  }

  steps.push('Try a vocabulary quiz');
  steps.push('Practice with a new lesson');

  return steps.slice(0, 3);
}

// Export the tutor engine
export const tutorEngine = {
  generateTutorResponse,
  analyzeUserInput,
  formatResponse,
  getEncouragement,
  getNextSteps,
};

export default tutorEngine;
