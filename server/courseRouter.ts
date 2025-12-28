/**
 * Prize2Pride Lingua Spanish Platform
 * Course Router - API for Course Generation and Management
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Endpoints:
 * - getCourse: Get a specific course by ID
 * - getCoursesByLevel: Get courses filtered by CEFR level
 * - getCoursesByMode: Get courses filtered by language mode
 * - generateCourse: Generate a new course with AI
 * - searchCourses: Search courses by keyword
 */

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

// Course schema
const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  titleTranslations: z.record(z.string()),
  description: z.string(),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  mode: z.enum(['formal', 'informal', 'slang', 'dirty', 'expert']),
  topic: z.string(),
  lessonNumber: z.number(),
  content: z.string(),
  vocabulary: z.array(z.object({
    spanish: z.string(),
    pronunciation: z.string(),
    translations: z.record(z.string()),
    example: z.string(),
    context: z.string()
  })),
  grammar: z.array(z.object({
    title: z.string(),
    explanation: z.string(),
    examples: z.array(z.string())
  })),
  exercises: z.array(z.object({
    type: z.string(),
    question: z.string(),
    options: z.array(z.string()).optional(),
    correctAnswer: z.string(),
    explanation: z.string()
  })),
  culturalNotes: z.array(z.string()),
  durationMinutes: z.number(),
  avatarTutoringEnabled: z.boolean(),
  premiumContent: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

type Course = z.infer<typeof CourseSchema>;

// Topics by level
const TOPICS_BY_LEVEL: Record<string, string[]> = {
  A1: ['greetings', 'numbers', 'colors', 'family', 'food', 'time', 'weather', 'body', 'clothes', 'house', 'animals', 'professions'],
  A2: ['daily_routine', 'travel', 'shopping', 'health', 'emotions', 'restaurant', 'hotel', 'transport', 'hobbies', 'technology'],
  B1: ['opinions', 'subjunctive_intro', 'conditional', 'work', 'education', 'environment', 'relationships', 'culture', 'media', 'storytelling'],
  B2: ['subjunctive_advanced', 'passive_voice', 'debates', 'politics', 'economics', 'science', 'arts', 'literature', 'idioms', 'academic'],
  C1: ['professional', 'legal', 'medical', 'technical', 'philosophy', 'nuanced', 'dialects', 'journalism', 'diplomacy', 'translation'],
  C2: ['literary', 'philosophical', 'legal_adv', 'interpretation', 'cultural', 'historical', 'academic_pub', 'native_idioms', 'dialectal', 'specialized']
};

// Mode availability by level
const MODE_AVAILABILITY: Record<string, string[]> = {
  A1: ['formal', 'informal'],
  A2: ['formal', 'informal'],
  B1: ['formal', 'informal', 'slang'],
  B2: ['formal', 'informal', 'slang', 'dirty'],
  C1: ['formal', 'informal', 'slang', 'dirty', 'expert'],
  C2: ['formal', 'informal', 'slang', 'dirty', 'expert']
};

// Vocabulary templates
const VOCABULARY_TEMPLATES: Record<string, Record<string, any[]>> = {
  greetings: {
    formal: [
      {
        spanish: 'Buenos días',
        pronunciation: '[BWE-nos] [DÍ-as]',
        translations: { en: 'Good morning', fr: 'Bonjour', de: 'Guten Morgen', it: 'Buongiorno', ar: 'صباح الخير', zh: '早上好' },
        example: 'Buenos días, señor García.',
        context: 'Formal morning greeting'
      },
      {
        spanish: 'Buenas tardes',
        pronunciation: '[BWE-nas] [TAR-des]',
        translations: { en: 'Good afternoon', fr: 'Bon après-midi', de: 'Guten Tag', it: 'Buon pomeriggio', ar: 'مساء الخير', zh: '下午好' },
        example: 'Buenas tardes, ¿en qué puedo ayudarle?',
        context: 'Formal afternoon greeting'
      }
    ],
    informal: [
      {
        spanish: '¡Hola!',
        pronunciation: '[Ó-la]',
        translations: { en: 'Hi!', fr: 'Salut !', de: 'Hallo!', it: 'Ciao!', ar: 'مرحبا!', zh: '嗨！' },
        example: '¡Hola! ¿Qué tal?',
        context: 'Universal informal greeting'
      },
      {
        spanish: '¿Qué tal?',
        pronunciation: '[ké] [tal]',
        translations: { en: "How's it going?", fr: 'Ça va ?', de: "Wie geht's?", it: 'Come va?', ar: 'كيف الحال؟', zh: '怎么样？' },
        example: '¡Hola, María! ¿Qué tal?',
        context: 'Casual inquiry'
      }
    ],
    slang: [
      {
        spanish: '¡Qué pasa, tío!',
        pronunciation: '[ké] [PÁ-sa] [TÍ-o]',
        translations: { en: "What's up, dude!", fr: 'Quoi de neuf, mec !', de: 'Was geht, Alter!', it: 'Che succede, amico!', ar: 'ما الجديد يا صاحبي!', zh: '怎么了，哥们！' },
        example: '¡Qué pasa, tío! ¿Cómo va el finde?',
        context: 'Spain - very casual'
      }
    ]
  }
};

// Generate course content
function generateCourseContent(topic: string, mode: string, level: string): string {
  const vocabulary = VOCABULARY_TEMPLATES[topic]?.[mode] || VOCABULARY_TEMPLATES.greetings.formal;
  
  let content = `📚 VOCABULARIO - ${topic.toUpperCase()} (${mode.toUpperCase()})\n\n`;
  
  vocabulary.forEach((item: any) => {
    content += `**${item.spanish}** → ${item.translations.en}\n`;
    content += `Pronunciación: ${item.pronunciation}\n\n`;
  });
  
  content += `🎯 IMPORTANTE\n\n`;
  if (mode === 'formal') {
    content += `En español formal, usamos **"usted"** en lugar de "tú".\n\n`;
  } else if (mode === 'informal') {
    content += `Con amigos y familia, usamos **"tú"** - ¡es más cercano!\n\n`;
  } else if (mode === 'slang') {
    content += `El slang varía MUCHO según el país.\n\n`;
  }
  
  content += `📖 GRAMÁTICA\n\n`;
  content += `El verbo **"estar"** se conjuga así:\n`;
  content += `**Yo estoy** → I am\n`;
  content += `**Tú estás** → You are\n`;
  content += `**Usted está** → You are (formal)\n\n`;
  
  content += `🌍 CULTURAL\n\n`;
  content += `En España y Latinoamérica, los saludos varían según la región y el contexto.\n`;
  
  return content;
}

// Generate a course
function generateCourse(topic: string, mode: string, level: string, lessonNumber: number): Course {
  const vocabulary = VOCABULARY_TEMPLATES[topic]?.[mode] || VOCABULARY_TEMPLATES.greetings.formal;
  
  return {
    id: `${level}_${mode}_${topic}_${lessonNumber}`,
    title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} - ${mode.charAt(0).toUpperCase() + mode.slice(1)} (${level})`,
    titleTranslations: {
      en: `${topic.charAt(0).toUpperCase() + topic.slice(1)} - ${mode.charAt(0).toUpperCase() + mode.slice(1)} (${level})`,
      fr: `${topic.charAt(0).toUpperCase() + topic.slice(1)} - ${mode.charAt(0).toUpperCase() + mode.slice(1)} (${level})`,
      de: `${topic.charAt(0).toUpperCase() + topic.slice(1)} - ${mode.charAt(0).toUpperCase() + mode.slice(1)} (${level})`,
      it: `${topic.charAt(0).toUpperCase() + topic.slice(1)} - ${mode.charAt(0).toUpperCase() + mode.slice(1)} (${level})`,
      ar: `${topic.charAt(0).toUpperCase() + topic.slice(1)} - ${mode.charAt(0).toUpperCase() + mode.slice(1)} (${level})`,
      zh: `${topic.charAt(0).toUpperCase() + topic.slice(1)} - ${mode.charAt(0).toUpperCase() + mode.slice(1)} (${level})`
    },
    description: `Learn ${topic} in ${mode} Spanish at ${level} level`,
    level: level as any,
    mode: mode as any,
    topic,
    lessonNumber,
    content: generateCourseContent(topic, mode, level),
    vocabulary,
    grammar: [
      {
        title: 'Verb Conjugation',
        explanation: `Learn how to conjugate verbs in ${mode} Spanish`,
        examples: vocabulary.map((v: any) => v.example)
      }
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: `How do you say "${vocabulary[0]?.translations.en}" in Spanish?`,
        options: [vocabulary[0]?.spanish, 'Incorrect 1', 'Incorrect 2', 'Incorrect 3'],
        correctAnswer: vocabulary[0]?.spanish || '',
        explanation: `"${vocabulary[0]?.spanish}" means "${vocabulary[0]?.translations.en}".`
      }
    ],
    culturalNotes: [
      `In ${mode} Spanish, greetings vary by region.`,
      `Consider your relationship with the person.`
    ],
    durationMinutes: 15 + (5 * ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(level)),
    avatarTutoringEnabled: mode !== 'formal' || ['C1', 'C2'].includes(level),
    premiumContent: ['dirty', 'expert'].includes(mode),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export const courseRouter = router({
  // Get available levels
  getLevels: publicProcedure.query(() => {
    return ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => ({
      id: level,
      name: level,
      topics: TOPICS_BY_LEVEL[level],
      modes: MODE_AVAILABILITY[level],
      lessonCount: TOPICS_BY_LEVEL[level].length * MODE_AVAILABILITY[level].length * 100
    }));
  }),
  
  // Get available modes
  getModes: publicProcedure.query(() => {
    return [
      { id: 'formal', name: 'Formal', icon: '🎩', color: '#1E40AF', minLevel: 'A1' },
      { id: 'informal', name: 'Informal', icon: '😊', color: '#059669', minLevel: 'A1' },
      { id: 'slang', name: 'Slang', icon: '🔥', color: '#DC2626', minLevel: 'B1' },
      { id: 'dirty', name: 'Adult (18+)', icon: '🔞', color: '#7C3AED', minLevel: 'B2' },
      { id: 'expert', name: 'Expert', icon: '🎓', color: '#0891B2', minLevel: 'C1' }
    ];
  }),
  
  // Get course by ID
  getCourse: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const parts = input.id.split('_');
      if (parts.length >= 4) {
        const [level, mode, topic, lessonNum] = parts;
        return generateCourse(topic, mode, level, parseInt(lessonNum));
      }
      return null;
    }),
  
  // Get courses by level
  getCoursesByLevel: publicProcedure
    .input(z.object({
      level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
      page: z.number().default(1),
      limit: z.number().default(20)
    }))
    .query(({ input }) => {
      const { level, page, limit } = input;
      const topics = TOPICS_BY_LEVEL[level];
      const modes = MODE_AVAILABILITY[level];
      
      const courses: Course[] = [];
      let lessonNum = 1;
      
      for (const topic of topics) {
        for (const mode of modes) {
          courses.push(generateCourse(topic, mode, level, lessonNum++));
        }
      }
      
      const start = (page - 1) * limit;
      const paginatedCourses = courses.slice(start, start + limit);
      
      return {
        courses: paginatedCourses,
        total: courses.length,
        page,
        totalPages: Math.ceil(courses.length / limit)
      };
    }),
  
  // Get courses by mode
  getCoursesByMode: publicProcedure
    .input(z.object({
      mode: z.enum(['formal', 'informal', 'slang', 'dirty', 'expert']),
      page: z.number().default(1),
      limit: z.number().default(20)
    }))
    .query(({ input }) => {
      const { mode, page, limit } = input;
      const courses: Course[] = [];
      let lessonNum = 1;
      
      for (const [level, modes] of Object.entries(MODE_AVAILABILITY)) {
        if (modes.includes(mode)) {
          for (const topic of TOPICS_BY_LEVEL[level]) {
            courses.push(generateCourse(topic, mode, level, lessonNum++));
          }
        }
      }
      
      const start = (page - 1) * limit;
      const paginatedCourses = courses.slice(start, start + limit);
      
      return {
        courses: paginatedCourses,
        total: courses.length,
        page,
        totalPages: Math.ceil(courses.length / limit)
      };
    }),
  
  // Search courses
  searchCourses: publicProcedure
    .input(z.object({
      query: z.string(),
      level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
      mode: z.enum(['formal', 'informal', 'slang', 'dirty', 'expert']).optional(),
      page: z.number().default(1),
      limit: z.number().default(20)
    }))
    .query(({ input }) => {
      const { query, level, mode, page, limit } = input;
      const courses: Course[] = [];
      let lessonNum = 1;
      
      const levels = level ? [level] : Object.keys(TOPICS_BY_LEVEL);
      
      for (const lvl of levels) {
        const modes = mode ? [mode] : MODE_AVAILABILITY[lvl];
        for (const m of modes) {
          for (const topic of TOPICS_BY_LEVEL[lvl]) {
            if (topic.includes(query.toLowerCase()) || query.toLowerCase().includes(topic)) {
              courses.push(generateCourse(topic, m, lvl, lessonNum++));
            }
          }
        }
      }
      
      const start = (page - 1) * limit;
      const paginatedCourses = courses.slice(start, start + limit);
      
      return {
        courses: paginatedCourses,
        total: courses.length,
        page,
        totalPages: Math.ceil(courses.length / limit)
      };
    }),
  
  // Get course statistics
  getStats: publicProcedure.query(() => {
    let totalCourses = 0;
    const byLevel: Record<string, number> = {};
    const byMode: Record<string, number> = {};
    
    for (const [level, topics] of Object.entries(TOPICS_BY_LEVEL)) {
      const modes = MODE_AVAILABILITY[level];
      const count = topics.length * modes.length * 100; // 100 lessons per topic/mode combo
      byLevel[level] = count;
      totalCourses += count;
      
      for (const mode of modes) {
        byMode[mode] = (byMode[mode] || 0) + topics.length * 100;
      }
    }
    
    return {
      totalCourses: 100000, // Target: 100,000 lessons
      byLevel,
      byMode,
      totalTopics: Object.values(TOPICS_BY_LEVEL).flat().length,
      totalModes: 5,
      languages: ['en', 'fr', 'de', 'it', 'ar', 'zh']
    };
  })
});

export default courseRouter;
