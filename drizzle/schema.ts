import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  preferredLanguage: varchar("preferredLanguage", { length: 10 }).default("en"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * CEFR Levels for Spanish learning
 */
export const cefrLevels = mysqlTable("cefr_levels", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 2 }).notNull().unique(), // A1, A2, B1, B2, C1
  name: varchar("name", { length: 50 }).notNull(),
  description: text("description"),
  order: int("order").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CefrLevel = typeof cefrLevels.$inferSelect;
export type InsertCefrLevel = typeof cefrLevels.$inferInsert;

/**
 * Lesson categories/topics
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Spanish lessons
 */
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  cefrLevelId: int("cefrLevelId").notNull(),
  categoryId: int("categoryId"),
  description: text("description"),
  content: text("content"), // Main lesson content in Spanish
  contentArabic: text("contentArabic"),
  contentFrench: text("contentFrench"),
  contentItalian: text("contentItalian"),
  contentGerman: text("contentGerman"),
  contentChinese: text("contentChinese"),
  grammarNotes: text("grammarNotes"),
  culturalNotes: text("culturalNotes"),
  order: int("order").default(0),
  estimatedMinutes: int("estimatedMinutes").default(15),
  isPublished: boolean("isPublished").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

/**
 * Vocabulary items
 */
export const vocabulary = mysqlTable("vocabulary", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull(),
  spanish: varchar("spanish", { length: 255 }).notNull(),
  pronunciation: varchar("pronunciation", { length: 255 }),
  arabic: varchar("arabic", { length: 255 }),
  french: varchar("french", { length: 255 }),
  italian: varchar("italian", { length: 255 }),
  german: varchar("german", { length: 255 }),
  chinese: varchar("chinese", { length: 255 }),
  exampleSentence: text("exampleSentence"),
  audioUrl: varchar("audioUrl", { length: 500 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  partOfSpeech: varchar("partOfSpeech", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Vocabulary = typeof vocabulary.$inferSelect;
export type InsertVocabulary = typeof vocabulary.$inferInsert;

/**
 * Exercises for lessons
 */
export const exercises = mysqlTable("exercises", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull(),
  type: mysqlEnum("type", ["multiple_choice", "fill_blank", "translation", "listening", "speaking", "matching"]).notNull(),
  question: text("question").notNull(),
  options: json("options"), // For multiple choice
  correctAnswer: text("correctAnswer").notNull(),
  explanation: text("explanation"),
  points: int("points").default(10),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = typeof exercises.$inferInsert;

/**
 * User progress tracking
 */
export const userProgress = mysqlTable("user_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  completed: boolean("completed").default(false),
  score: int("score").default(0),
  timeSpentMinutes: int("timeSpentMinutes").default(0),
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/**
 * User vocabulary learning status
 */
export const userVocabulary = mysqlTable("user_vocabulary", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  vocabularyId: int("vocabularyId").notNull(),
  mastery: int("mastery").default(0), // 0-100 mastery level
  timesReviewed: int("timesReviewed").default(0),
  lastReviewedAt: timestamp("lastReviewedAt"),
  nextReviewAt: timestamp("nextReviewAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserVocabulary = typeof userVocabulary.$inferSelect;
export type InsertUserVocabulary = typeof userVocabulary.$inferInsert;
