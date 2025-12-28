/**
 * Prize2Pride Lingua Spanish Platform
 * Eternal Lessons API Router
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * API for accessing the 10,000 eternal Spanish lessons
 */

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import * as fs from "fs";
import * as path from "path";

// Types
interface Vocabulary {
  es: string;
  pron: string;
  en: string;
  fr: string;
  de: string;
  it: string;
  ar: string;
  zh: string;
}

interface Exercise {
  type: string;
  question: string;
  options?: string[];
  correct: number | string;
}

interface Lesson {
  id: string;
  title: string;
  level: string;
  mode: string;
  topic: string;
  content: string;
  vocabulary: Vocabulary[];
  exercises: Exercise[];
  humor: string;
  cultural_note: string;
  duration_minutes: number;
  premium: boolean;
  created: string;
  immutable: boolean;
}

interface LessonBatch {
  batch_id: string;
  batch_name: string;
  total_lessons: number;
  start_lesson: number;
  end_lesson: number;
  created: string;
  immutable: boolean;
  lessons: Lesson[];
}

// Cache for loaded lessons
const lessonsCache: Map<string, Lesson> = new Map();
const batchesLoaded: Set<string> = new Set();

// Load a batch of lessons
function loadBatch(batchNum: number): LessonBatch | null {
  const batchId = batchNum.toString().padStart(3, '0');
  
  if (batchesLoaded.has(batchId)) {
    return null; // Already loaded
  }
  
  const startLesson = (batchNum - 1) * 1000 + 1;
  const endLesson = startLesson + 999;
  const filename = `batch_${batchId}_lessons_${startLesson.toString().padStart(5, '0')}_${endLesson.toString().padStart(5, '0')}.json`;
  const filepath = path.join(__dirname, '..', 'eternal_lessons', filename);
  
  try {
    if (fs.existsSync(filepath)) {
      const data = fs.readFileSync(filepath, 'utf-8');
      const batch: LessonBatch = JSON.parse(data);
      
      // Cache all lessons from this batch
      batch.lessons.forEach(lesson => {
        lessonsCache.set(lesson.id, lesson);
      });
      
      batchesLoaded.add(batchId);
      return batch;
    }
  } catch (error) {
    console.error(`Error loading batch ${batchId}:`, error);
  }
  
  return null;
}

// Get lesson by ID
function getLessonById(lessonId: string): Lesson | null {
  // Check cache first
  if (lessonsCache.has(lessonId)) {
    return lessonsCache.get(lessonId) || null;
  }
  
  // Try to determine which batch to load
  const parts = lessonId.split('_');
  if (parts.length >= 4) {
    const lessonNum = parseInt(parts[parts.length - 1]);
    if (!isNaN(lessonNum)) {
      const batchNum = Math.ceil(lessonNum / 1000);
      loadBatch(batchNum);
      return lessonsCache.get(lessonId) || null;
    }
  }
  
  // Load all batches if needed
  for (let i = 1; i <= 10; i++) {
    loadBatch(i);
    if (lessonsCache.has(lessonId)) {
      return lessonsCache.get(lessonId) || null;
    }
  }
  
  return null;
}

// Get lessons by criteria
function getLessonsByCriteria(
  level?: string,
  mode?: string,
  topic?: string,
  page: number = 1,
  limit: number = 20
): { lessons: Lesson[]; total: number; page: number; totalPages: number } {
  // Ensure all batches are loaded
  for (let i = 1; i <= 10; i++) {
    loadBatch(i);
  }
  
  // Filter lessons
  let filtered = Array.from(lessonsCache.values());
  
  if (level) {
    filtered = filtered.filter(l => l.level === level);
  }
  if (mode) {
    filtered = filtered.filter(l => l.mode === mode);
  }
  if (topic) {
    filtered = filtered.filter(l => l.topic.includes(topic));
  }
  
  // Paginate
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const lessons = filtered.slice(start, start + limit);
  
  return { lessons, total, page, totalPages };
}

export const eternalLessonsRouter = router({
  // Get total lesson count
  getStats: publicProcedure.query(() => {
    // Load all batches to get accurate count
    for (let i = 1; i <= 10; i++) {
      loadBatch(i);
    }
    
    const allLessons = Array.from(lessonsCache.values());
    
    const byLevel: Record<string, number> = {};
    const byMode: Record<string, number> = {};
    const byTopic: Record<string, number> = {};
    
    allLessons.forEach(lesson => {
      byLevel[lesson.level] = (byLevel[lesson.level] || 0) + 1;
      byMode[lesson.mode] = (byMode[lesson.mode] || 0) + 1;
      byTopic[lesson.topic] = (byTopic[lesson.topic] || 0) + 1;
    });
    
    return {
      totalLessons: lessonsCache.size,
      byLevel,
      byMode,
      topTopics: Object.entries(byTopic)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([topic, count]) => ({ topic, count })),
      batchesLoaded: batchesLoaded.size,
      totalBatches: 10,
      immutable: true,
      created: '2025-12-29'
    };
  }),
  
  // Get a single lesson by ID
  getLesson: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return getLessonById(input.id);
    }),
  
  // Get lessons by level
  getLessonsByLevel: publicProcedure
    .input(z.object({
      level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
      page: z.number().default(1),
      limit: z.number().default(20)
    }))
    .query(({ input }) => {
      return getLessonsByCriteria(input.level, undefined, undefined, input.page, input.limit);
    }),
  
  // Get lessons by mode
  getLessonsByMode: publicProcedure
    .input(z.object({
      mode: z.enum(['formal', 'informal', 'slang', 'dirty', 'expert']),
      page: z.number().default(1),
      limit: z.number().default(20)
    }))
    .query(({ input }) => {
      return getLessonsByCriteria(undefined, input.mode, undefined, input.page, input.limit);
    }),
  
  // Get lessons by topic
  getLessonsByTopic: publicProcedure
    .input(z.object({
      topic: z.string(),
      page: z.number().default(1),
      limit: z.number().default(20)
    }))
    .query(({ input }) => {
      return getLessonsByCriteria(undefined, undefined, input.topic, input.page, input.limit);
    }),
  
  // Search lessons
  searchLessons: publicProcedure
    .input(z.object({
      query: z.string(),
      level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
      mode: z.enum(['formal', 'informal', 'slang', 'dirty', 'expert']).optional(),
      page: z.number().default(1),
      limit: z.number().default(20)
    }))
    .query(({ input }) => {
      // Load all batches
      for (let i = 1; i <= 10; i++) {
        loadBatch(i);
      }
      
      const query = input.query.toLowerCase();
      let filtered = Array.from(lessonsCache.values()).filter(lesson => 
        lesson.title.toLowerCase().includes(query) ||
        lesson.topic.toLowerCase().includes(query) ||
        lesson.content.toLowerCase().includes(query)
      );
      
      if (input.level) {
        filtered = filtered.filter(l => l.level === input.level);
      }
      if (input.mode) {
        filtered = filtered.filter(l => l.mode === input.mode);
      }
      
      const total = filtered.length;
      const totalPages = Math.ceil(total / input.limit);
      const start = (input.page - 1) * input.limit;
      const lessons = filtered.slice(start, start + input.limit);
      
      return { lessons, total, page: input.page, totalPages };
    }),
  
  // Get random lesson
  getRandomLesson: publicProcedure
    .input(z.object({
      level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
      mode: z.enum(['formal', 'informal', 'slang', 'dirty', 'expert']).optional()
    }).optional())
    .query(({ input }) => {
      // Load all batches
      for (let i = 1; i <= 10; i++) {
        loadBatch(i);
      }
      
      let lessons = Array.from(lessonsCache.values());
      
      if (input?.level) {
        lessons = lessons.filter(l => l.level === input.level);
      }
      if (input?.mode) {
        lessons = lessons.filter(l => l.mode === input.mode);
      }
      
      if (lessons.length === 0) return null;
      
      const randomIndex = Math.floor(Math.random() * lessons.length);
      return lessons[randomIndex];
    }),
  
  // Get available topics
  getTopics: publicProcedure.query(() => {
    // Load all batches
    for (let i = 1; i <= 10; i++) {
      loadBatch(i);
    }
    
    const topics = new Set<string>();
    lessonsCache.forEach(lesson => topics.add(lesson.topic));
    
    return Array.from(topics).sort();
  }),
  
  // Get lesson progression (next/previous)
  getLessonProgression: publicProcedure
    .input(z.object({ currentId: z.string() }))
    .query(({ input }) => {
      const current = getLessonById(input.currentId);
      if (!current) return null;
      
      // Get all lessons with same level and mode
      const { lessons } = getLessonsByCriteria(current.level, current.mode, undefined, 1, 10000);
      
      const currentIndex = lessons.findIndex(l => l.id === input.currentId);
      
      return {
        current,
        previous: currentIndex > 0 ? lessons[currentIndex - 1] : null,
        next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null,
        progress: {
          current: currentIndex + 1,
          total: lessons.length,
          percentage: Math.round(((currentIndex + 1) / lessons.length) * 100)
        }
      };
    })
});

export default eternalLessonsRouter;
