import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import * as fs from 'fs';
import * as path from 'path';

// CEFR Level enum
const cefrLevelSchema = z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
type CEFRLevel = z.infer<typeof cefrLevelSchema>;

// Vocabulary item schema
const vocabularySchema = z.object({
  spanish: z.string(),
  english: z.string(),
  pronunciation: z.string(),
  pos: z.string(),
  example_es: z.string(),
  example_en: z.string(),
});

// Exercise schema
const exerciseSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple_choice', 'fill_blank', 'translation', 'matching']),
  question: z.string(),
  options: z.array(z.string()).optional(),
  correct_answer: z.string(),
  explanation: z.string(),
  points: z.number(),
});

// Full lesson schema
const lessonSchema = z.object({
  id: z.string(),
  slug: z.string(),
  cefr_level: cefrLevelSchema,
  category: z.string(),
  title_en: z.string(),
  title_es: z.string(),
  description_en: z.string(),
  description_es: z.string(),
  objectives: z.array(z.string()),
  estimated_minutes: z.number(),
  vocabulary: z.array(vocabularySchema),
  grammar_points: z.array(z.string()),
  cultural_note: z.string(),
  exercises: z.array(exerciseSchema),
});

type Lesson = z.infer<typeof lessonSchema>;

// Cache for loaded lessons
let lessonsCache: Map<CEFRLevel, Lesson[]> = new Map();

// Load lessons from JSON files
const loadLessonsForLevel = (level: CEFRLevel): Lesson[] => {
  if (lessonsCache.has(level)) {
    return lessonsCache.get(level)!;
  }

  const filePath = path.join(__dirname, '..', 'generated_lessons', `lessons_${level}.json`);
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lessons = JSON.parse(data) as Lesson[];
    lessonsCache.set(level, lessons);
    return lessons;
  } catch (error) {
    console.error(`Failed to load lessons for level ${level}:`, error);
    return [];
  }
};

// Get all lessons (lazy load)
const getAllLessons = (): Lesson[] => {
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  return levels.flatMap(level => loadLessonsForLevel(level));
};

export const curriculumRouter = router({
  // Get all CEFR levels with metadata
  getLevels: publicProcedure
    .output(z.array(z.object({
      code: cefrLevelSchema,
      name: z.string(),
      description: z.string(),
      lessonCount: z.number(),
      topics: z.array(z.string()),
    })))
    .query(() => {
      const levelInfo = [
        { code: 'A1' as const, name: 'Breakthrough', description: 'Basic phrases and everyday expressions' },
        { code: 'A2' as const, name: 'Waystage', description: 'Simple, routine tasks and direct exchanges' },
        { code: 'B1' as const, name: 'Threshold', description: 'Main points on familiar matters' },
        { code: 'B2' as const, name: 'Vantage', description: 'Complex texts and abstract topics' },
        { code: 'C1' as const, name: 'Effective Operational Proficiency', description: 'Demanding texts and implicit meaning' },
        { code: 'C2' as const, name: 'Mastery', description: 'Near-native fluency and precision' },
      ];

      return levelInfo.map(info => {
        const lessons = loadLessonsForLevel(info.code);
        const topics = [...new Set(lessons.map(l => l.category))];
        return {
          ...info,
          lessonCount: lessons.length,
          topics,
        };
      });
    }),

  // Get lessons by CEFR level
  getLessonsByLevel: publicProcedure
    .input(z.object({
      level: cefrLevelSchema,
      page: z.number().min(1).default(1),
      pageSize: z.number().min(1).max(100).default(20),
      category: z.string().optional(),
    }))
    .output(z.object({
      lessons: z.array(lessonSchema.pick({
        id: true,
        slug: true,
        cefr_level: true,
        category: true,
        title_en: true,
        title_es: true,
        description_en: true,
        description_es: true,
        estimated_minutes: true,
      })),
      total: z.number(),
      page: z.number(),
      pageSize: z.number(),
      totalPages: z.number(),
    }))
    .query(({ input }) => {
      let lessons = loadLessonsForLevel(input.level);
      
      // Filter by category if provided
      if (input.category) {
        lessons = lessons.filter(l => l.category === input.category);
      }

      const total = lessons.length;
      const totalPages = Math.ceil(total / input.pageSize);
      const start = (input.page - 1) * input.pageSize;
      const end = start + input.pageSize;

      const paginatedLessons = lessons.slice(start, end).map(l => ({
        id: l.id,
        slug: l.slug,
        cefr_level: l.cefr_level,
        category: l.category,
        title_en: l.title_en,
        title_es: l.title_es,
        description_en: l.description_en,
        description_es: l.description_es,
        estimated_minutes: l.estimated_minutes,
      }));

      return {
        lessons: paginatedLessons,
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages,
      };
    }),

  // Get a single lesson by slug
  getLessonBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .output(lessonSchema.nullable())
    .query(({ input }) => {
      const allLessons = getAllLessons();
      return allLessons.find(l => l.slug === input.slug) || null;
    }),

  // Get lessons by category across all levels
  getLessonsByCategory: publicProcedure
    .input(z.object({
      category: z.string(),
      page: z.number().min(1).default(1),
      pageSize: z.number().min(1).max(100).default(20),
    }))
    .output(z.object({
      lessons: z.array(lessonSchema.pick({
        id: true,
        slug: true,
        cefr_level: true,
        category: true,
        title_en: true,
        title_es: true,
        estimated_minutes: true,
      })),
      total: z.number(),
      page: z.number(),
      totalPages: z.number(),
    }))
    .query(({ input }) => {
      const allLessons = getAllLessons();
      const filtered = allLessons.filter(l => l.category === input.category);
      
      const total = filtered.length;
      const totalPages = Math.ceil(total / input.pageSize);
      const start = (input.page - 1) * input.pageSize;
      const end = start + input.pageSize;

      return {
        lessons: filtered.slice(start, end).map(l => ({
          id: l.id,
          slug: l.slug,
          cefr_level: l.cefr_level,
          category: l.category,
          title_en: l.title_en,
          title_es: l.title_es,
          estimated_minutes: l.estimated_minutes,
        })),
        total,
        page: input.page,
        totalPages,
      };
    }),

  // Search lessons
  searchLessons: publicProcedure
    .input(z.object({
      query: z.string().min(1),
      level: cefrLevelSchema.optional(),
      limit: z.number().min(1).max(50).default(20),
    }))
    .output(z.array(lessonSchema.pick({
      id: true,
      slug: true,
      cefr_level: true,
      category: true,
      title_en: true,
      title_es: true,
    })))
    .query(({ input }) => {
      let lessons = input.level 
        ? loadLessonsForLevel(input.level)
        : getAllLessons();

      const query = input.query.toLowerCase();
      const results = lessons.filter(l => 
        l.title_en.toLowerCase().includes(query) ||
        l.title_es.toLowerCase().includes(query) ||
        l.category.toLowerCase().includes(query) ||
        l.description_en.toLowerCase().includes(query)
      );

      return results.slice(0, input.limit).map(l => ({
        id: l.id,
        slug: l.slug,
        cefr_level: l.cefr_level,
        category: l.category,
        title_en: l.title_en,
        title_es: l.title_es,
      }));
    }),

  // Get curriculum statistics
  getStats: publicProcedure
    .output(z.object({
      totalLessons: z.number(),
      byLevel: z.record(cefrLevelSchema, z.number()),
      totalCategories: z.number(),
      totalVocabulary: z.number(),
      totalExercises: z.number(),
    }))
    .query(() => {
      const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const byLevel: Record<CEFRLevel, number> = {} as Record<CEFRLevel, number>;
      let totalLessons = 0;
      let totalVocabulary = 0;
      let totalExercises = 0;
      const categories = new Set<string>();

      levels.forEach(level => {
        const lessons = loadLessonsForLevel(level);
        byLevel[level] = lessons.length;
        totalLessons += lessons.length;
        lessons.forEach(l => {
          categories.add(l.category);
          totalVocabulary += l.vocabulary.length;
          totalExercises += l.exercises.length;
        });
      });

      return {
        totalLessons,
        byLevel,
        totalCategories: categories.size,
        totalVocabulary,
        totalExercises,
      };
    }),
});
