import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import * as fs from 'fs';
import * as path from 'path';

// Define the schema for a scraped lesson item
const lessonSchema = z.object({
  title: z.string(),
  slug: z.string(),
  url: z.string().url(),
  content: z.string(),
  contentEnglish: z.string(),
  cefrLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1']),
});

export type ScrapedLesson = z.infer<typeof lessonSchema>;

// Load scraped data from the JSON file
const loadScrapedLessons = (): ScrapedLesson[] => {
  const filePath = path.join(__dirname, 'scraped_lessons.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(data);
    // Validate the loaded data against the schema
    return z.array(lessonSchema).parse(parsedData);
  } catch (error) {
    console.error("Failed to load or parse scraped lessons:", error);
    return [];
  }
};

export const lessonRouter = router({
  getLessons: publicProcedure
    .output(z.array(lessonSchema))
    .query(() => {
      // In a real application, this would query the database
      // For now, we serve the scraped JSON data as a mock feed
      return loadScrapedLessons();
    }),
});
