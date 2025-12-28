/**
 * Prize2Pride Lingua Spanish Platform
 * Database Schema - Full Stack Architecture
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Complete database schema for the Manus-twin platform
 */

import { 
  pgTable, 
  serial, 
  text, 
  varchar, 
  integer, 
  boolean, 
  timestamp, 
  json, 
  decimal,
  uuid,
  index,
  uniqueIndex
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// USER MANAGEMENT
// ============================================

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash'),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  displayName: varchar('display_name', { length: 100 }),
  avatarUrl: text('avatar_url'),
  preferredLanguage: varchar('preferred_language', { length: 5 }).default('en'),
  currentLevel: varchar('current_level', { length: 2 }).default('A1'),
  preferredMode: varchar('preferred_mode', { length: 20 }).default('formal'),
  timezone: varchar('timezone', { length: 50 }).default('UTC'),
  isEmailVerified: boolean('is_email_verified').default(false),
  isActive: boolean('is_active').default(true),
  role: varchar('role', { length: 20 }).default('user'), // user, premium, admin, superadmin
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: uniqueIndex('users_email_idx').on(table.email),
  roleIdx: index('users_role_idx').on(table.role),
}));

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  bio: text('bio'),
  nativeLanguage: varchar('native_language', { length: 50 }),
  learningGoals: json('learning_goals').$type<string[]>(),
  interests: json('interests').$type<string[]>(),
  dailyGoalMinutes: integer('daily_goal_minutes').default(15),
  notificationsEnabled: boolean('notifications_enabled').default(true),
  soundEnabled: boolean('sound_enabled').default(true),
  darkModeEnabled: boolean('dark_mode_enabled').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ============================================
// SUBSCRIPTION & PAYMENTS
// ============================================

export const subscriptionPlans = pgTable('subscription_plans', {
  id: varchar('id', { length: 50 }).primaryKey(), // freemium, bronze, silver, gold, diamond, vip_millionaire
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  priceMonthly: decimal('price_monthly', { precision: 10, scale: 2 }).notNull(),
  priceYearly: decimal('price_yearly', { precision: 10, scale: 2 }),
  features: json('features').$type<string[]>(),
  maxDailyChats: integer('max_daily_chats').default(10),
  maxLessonsPerDay: integer('max_lessons_per_day').default(5),
  avatarTier: varchar('avatar_tier', { length: 20 }).default('basic'),
  hasOfflineAccess: boolean('has_offline_access').default(false),
  hasPrioritySupport: boolean('has_priority_support').default(false),
  hasFamilySharing: boolean('has_family_sharing').default(false),
  hasLiveTutoring: boolean('has_live_tutoring').default(false),
  hasCertificates: boolean('has_certificates').default(false),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userSubscriptions = pgTable('user_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  planId: varchar('plan_id', { length: 50 }).references(() => subscriptionPlans.id).notNull(),
  status: varchar('status', { length: 20 }).default('active'), // active, cancelled, expired, paused
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  stripeCustomerId: varchar('stripe_customer_id', { length: 100 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdx: index('subscriptions_user_idx').on(table.userId),
  statusIdx: index('subscriptions_status_idx').on(table.status),
}));

export const paymentHistory = pgTable('payment_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  subscriptionId: uuid('subscription_id').references(() => userSubscriptions.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  status: varchar('status', { length: 20 }).notNull(), // succeeded, pending, failed, refunded
  paymentMethod: varchar('payment_method', { length: 50 }),
  stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 100 }),
  description: text('description'),
  metadata: json('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ============================================
// LESSONS & CONTENT
// ============================================

export const lessons = pgTable('lessons', {
  id: varchar('id', { length: 100 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  titleTranslations: json('title_translations').$type<Record<string, string>>(),
  description: text('description'),
  level: varchar('level', { length: 2 }).notNull(), // A1, A2, B1, B2, C1, C2
  mode: varchar('mode', { length: 20 }).notNull(), // formal, informal, slang, dirty, expert
  topic: varchar('topic', { length: 100 }).notNull(),
  content: text('content').notNull(),
  vocabulary: json('vocabulary'),
  grammar: json('grammar'),
  exercises: json('exercises'),
  culturalNotes: json('cultural_notes'),
  humor: text('humor'),
  durationMinutes: integer('duration_minutes').default(15),
  difficulty: integer('difficulty').default(1), // 1-10
  isPremium: boolean('is_premium').default(false),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  levelIdx: index('lessons_level_idx').on(table.level),
  modeIdx: index('lessons_mode_idx').on(table.mode),
  topicIdx: index('lessons_topic_idx').on(table.topic),
}));

// ============================================
// USER PROGRESS & GAMIFICATION
// ============================================

export const userProgress = pgTable('user_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  lessonId: varchar('lesson_id', { length: 100 }).references(() => lessons.id).notNull(),
  status: varchar('status', { length: 20 }).default('not_started'), // not_started, in_progress, completed
  score: integer('score').default(0),
  timeSpentSeconds: integer('time_spent_seconds').default(0),
  completedAt: timestamp('completed_at'),
  lastAccessedAt: timestamp('last_accessed_at'),
  attempts: integer('attempts').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userLessonIdx: uniqueIndex('progress_user_lesson_idx').on(table.userId, table.lessonId),
  statusIdx: index('progress_status_idx').on(table.status),
}));

export const userAchievements = pgTable('user_achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  achievementId: varchar('achievement_id', { length: 50 }).notNull(),
  unlockedAt: timestamp('unlocked_at').defaultNow(),
  metadata: json('metadata'),
});

export const achievements = pgTable('achievements', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  nameTranslations: json('name_translations').$type<Record<string, string>>(),
  description: text('description'),
  descriptionTranslations: json('description_translations').$type<Record<string, string>>(),
  iconUrl: text('icon_url'),
  category: varchar('category', { length: 50 }), // streak, lessons, vocabulary, level, social
  requirement: json('requirement'), // { type: 'lessons_completed', value: 100 }
  xpReward: integer('xp_reward').default(0),
  isSecret: boolean('is_secret').default(false),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userStreaks = pgTable('user_streaks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull().unique(),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  lastActivityDate: timestamp('last_activity_date'),
  freezesRemaining: integer('freezes_remaining').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userXP = pgTable('user_xp', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull().unique(),
  totalXP: integer('total_xp').default(0),
  currentLevelXP: integer('current_level_xp').default(0),
  level: integer('level').default(1),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const xpTransactions = pgTable('xp_transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  amount: integer('amount').notNull(),
  source: varchar('source', { length: 50 }).notNull(), // lesson, achievement, streak, bonus
  sourceId: varchar('source_id', { length: 100 }),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ============================================
// VOCABULARY & FLASHCARDS
// ============================================

export const vocabularyItems = pgTable('vocabulary_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  spanish: varchar('spanish', { length: 255 }).notNull(),
  pronunciation: varchar('pronunciation', { length: 255 }),
  translations: json('translations').$type<Record<string, string>>().notNull(),
  example: text('example'),
  context: text('context'),
  level: varchar('level', { length: 2 }),
  topic: varchar('topic', { length: 100 }),
  audioUrl: text('audio_url'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  spanishIdx: index('vocab_spanish_idx').on(table.spanish),
  levelIdx: index('vocab_level_idx').on(table.level),
}));

export const userVocabulary = pgTable('user_vocabulary', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  vocabularyId: uuid('vocabulary_id').references(() => vocabularyItems.id).notNull(),
  status: varchar('status', { length: 20 }).default('learning'), // learning, reviewing, mastered
  correctCount: integer('correct_count').default(0),
  incorrectCount: integer('incorrect_count').default(0),
  lastReviewedAt: timestamp('last_reviewed_at'),
  nextReviewAt: timestamp('next_review_at'),
  easeFactor: decimal('ease_factor', { precision: 3, scale: 2 }).default('2.5'),
  interval: integer('interval').default(1), // days
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userVocabIdx: uniqueIndex('user_vocab_idx').on(table.userId, table.vocabularyId),
  nextReviewIdx: index('user_vocab_next_review_idx').on(table.nextReviewAt),
}));

// ============================================
// CHAT & AI TUTORING
// ============================================

export const chatSessions = pgTable('chat_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }),
  level: varchar('level', { length: 2 }),
  mode: varchar('mode', { length: 20 }),
  topic: varchar('topic', { length: 100 }),
  messageCount: integer('message_count').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdx: index('chat_sessions_user_idx').on(table.userId),
}));

export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => chatSessions.id).notNull(),
  role: varchar('role', { length: 20 }).notNull(), // user, assistant, system
  content: text('content').notNull(),
  formattedContent: json('formatted_content'),
  metadata: json('metadata'), // corrections, suggestions, etc.
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  sessionIdx: index('chat_messages_session_idx').on(table.sessionId),
}));

// ============================================
// ANALYTICS & TRACKING
// ============================================

export const userActivity = pgTable('user_activity', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  activityType: varchar('activity_type', { length: 50 }).notNull(), // lesson_started, lesson_completed, chat_message, vocabulary_review
  activityId: varchar('activity_id', { length: 100 }),
  metadata: json('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userIdx: index('activity_user_idx').on(table.userId),
  typeIdx: index('activity_type_idx').on(table.activityType),
  createdIdx: index('activity_created_idx').on(table.createdAt),
}));

export const dailyStats = pgTable('daily_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  date: timestamp('date').notNull(),
  lessonsCompleted: integer('lessons_completed').default(0),
  vocabularyReviewed: integer('vocabulary_reviewed').default(0),
  chatMessages: integer('chat_messages').default(0),
  timeSpentMinutes: integer('time_spent_minutes').default(0),
  xpEarned: integer('xp_earned').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userDateIdx: uniqueIndex('daily_stats_user_date_idx').on(table.userId, table.date),
}));

// ============================================
// LEADERBOARDS
// ============================================

export const leaderboards = pgTable('leaderboards', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  period: varchar('period', { length: 20 }).notNull(), // daily, weekly, monthly, all_time
  periodStart: timestamp('period_start').notNull(),
  xp: integer('xp').default(0),
  lessonsCompleted: integer('lessons_completed').default(0),
  streak: integer('streak').default(0),
  rank: integer('rank'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  periodIdx: index('leaderboard_period_idx').on(table.period, table.periodStart),
  xpIdx: index('leaderboard_xp_idx').on(table.xp),
}));

// ============================================
// RELATIONS
// ============================================

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  subscription: one(userSubscriptions, {
    fields: [users.id],
    references: [userSubscriptions.userId],
  }),
  progress: many(userProgress),
  achievements: many(userAchievements),
  streak: one(userStreaks, {
    fields: [users.id],
    references: [userStreaks.userId],
  }),
  xp: one(userXP, {
    fields: [users.id],
    references: [userXP.userId],
  }),
  chatSessions: many(chatSessions),
  vocabulary: many(userVocabulary),
  activities: many(userActivity),
}));

export const lessonsRelations = relations(lessons, ({ many }) => ({
  progress: many(userProgress),
}));

export const chatSessionsRelations = relations(chatSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [chatSessions.userId],
    references: [users.id],
  }),
  messages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [chatMessages.sessionId],
    references: [chatSessions.id],
  }),
}));

// Export all tables
export const schema = {
  users,
  userProfiles,
  subscriptionPlans,
  userSubscriptions,
  paymentHistory,
  lessons,
  userProgress,
  userAchievements,
  achievements,
  userStreaks,
  userXP,
  xpTransactions,
  vocabularyItems,
  userVocabulary,
  chatSessions,
  chatMessages,
  userActivity,
  dailyStats,
  leaderboards,
};

export default schema;
