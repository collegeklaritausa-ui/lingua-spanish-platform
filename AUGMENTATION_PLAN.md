# Prize2Pride Spanish Platform - A1 to C2 Augmentation Plan

## Overview

This document outlines the comprehensive augmentation plan to expand the Prize2Pride Spanish learning platform from its current A1-C1 coverage to include all CEFR levels (A1-C2).

## Current State Analysis

### Existing Features
- TikTok-like feed with lessons and conversations
- AI-powered Chat Arena with CEFR-level adaptation
- Multi-language UI support (8 languages)
- Autonomous content scraping from Spanish news sources
- User authentication system
- Database schema for lessons, vocabulary, exercises, and progress tracking

### Gaps Identified
1. **C2 Level Missing**: Schema and content only support A1-C1
2. **Limited Structured Curriculum**: Content is scraped/mock, not systematically organized
3. **No Level Selection Page**: Users cannot browse by CEFR level
4. **No Lesson Detail View**: Individual lesson pages not implemented
5. **No Exercise System UI**: Exercises defined in schema but no UI
6. **No Progress Dashboard**: User progress tracking not visualized

---

## Augmentation Components

### 1. Database Schema Updates

#### Update CEFR Level Support
- Add C2 level to enum types
- Update `cefrLevels` table to include C2

#### New Tables (if needed)
- `linguistic_registers` - For register conversion feature (slang, informal, formal, diplomatic)

### 2. New Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/levels` | LevelSelector | Browse all CEFR levels A1-C2 |
| `/level/:code` | LevelDashboard | View lessons for specific level |
| `/lesson/:slug` | LessonDetail | Full lesson content with exercises |
| `/vocabulary` | VocabularyPractice | Flashcard-style vocabulary review |
| `/progress` | ProgressDashboard | User learning statistics |
| `/exercises/:lessonId` | ExerciseSession | Interactive exercise completion |

### 3. CEFR Level Content Structure

#### A1 - Breakthrough (Principiante)
**Topics:**
- Greetings and introductions
- Numbers 1-100
- Colors and basic adjectives
- Family members
- Days, months, seasons
- Basic food and drinks
- Simple present tense (ser, estar, tener)

**Skills Focus:** Basic survival Spanish, simple phrases

#### A2 - Waystage (Elemental)
**Topics:**
- Daily routines and habits
- Describing people and places
- Shopping and prices
- Directions and transportation
- Weather expressions
- Past tense introduction (pretérito indefinido)
- Reflexive verbs

**Skills Focus:** Everyday situations, simple past narratives

#### B1 - Threshold (Intermedio)
**Topics:**
- Expressing opinions and preferences
- Travel and accommodation
- Health and body
- Work and professions
- Future tense and conditional
- Subjunctive introduction (present)
- Comparatives and superlatives

**Skills Focus:** Independent communication, handling most travel situations

#### B2 - Vantage (Intermedio Alto)
**Topics:**
- Abstract concepts and ideas
- Current events and news
- Environmental issues
- Technology and innovation
- Subjunctive (all tenses)
- Passive voice
- Complex sentence structures
- Idiomatic expressions

**Skills Focus:** Fluent interaction, understanding complex texts

#### C1 - Effective Operational Proficiency (Avanzado)
**Topics:**
- Professional and academic contexts
- Literature and arts
- Politics and society
- Advanced grammar nuances
- Regional variations (Spain vs Latin America)
- Formal register and business Spanish
- Colloquialisms and slang

**Skills Focus:** Near-native fluency, implicit meanings

#### C2 - Mastery (Maestría)
**Topics:**
- Literary analysis and critique
- Philosophical discourse
- Legal and technical Spanish
- Historical Spanish texts
- Dialectal variations
- Stylistic writing
- Simultaneous interpretation skills
- Cultural subtleties and humor

**Skills Focus:** Native-like precision, any context mastery

### 4. New Components

#### LevelCard.tsx
- Visual card for each CEFR level
- Progress indicator
- Lesson count
- Estimated time to complete

#### LessonPlayer.tsx
- Main content display
- Audio/video integration
- Vocabulary highlights
- Grammar notes sidebar

#### ExerciseRenderer.tsx
- Multiple choice questions
- Fill-in-the-blank
- Translation exercises
- Listening comprehension
- Speaking practice (with recording)
- Matching exercises

#### ProgressChart.tsx
- Visual progress by level
- Time spent statistics
- Vocabulary mastery
- Exercise scores

#### RegisterConverter.tsx
- AI-powered linguistic register conversion
- Slang ↔ Formal ↔ Diplomatic conversion
- Real-time examples

### 5. API Endpoints (tRPC Routers)

#### levelRouter.ts
```typescript
- getLevels() - All CEFR levels with metadata
- getLevelByCode(code) - Single level details
- getLevelProgress(userId, levelCode) - User progress for level
```

#### curriculumRouter.ts
```typescript
- getLessonsByLevel(levelCode) - All lessons for a level
- getLessonBySlug(slug) - Full lesson content
- getVocabularyByLesson(lessonId) - Vocabulary items
- getExercisesByLesson(lessonId) - Exercises for lesson
```

#### progressRouter.ts
```typescript
- getUserProgress(userId) - Overall progress
- updateLessonProgress(userId, lessonId, data) - Update progress
- getVocabularyMastery(userId) - Vocabulary stats
```

#### registerRouter.ts
```typescript
- convertRegister(text, fromRegister, toRegister) - AI conversion
```

### 6. Content Generation Strategy

1. **Seed Data**: Create comprehensive seed data for all levels
2. **AI-Generated Content**: Use LLM to generate level-appropriate content
3. **Scraped Content**: Continue autonomous scraping with C2 level classification
4. **Community Content**: Future feature for user-contributed content

---

## Implementation Priority

### Phase 1: Core Infrastructure
1. Update database schema for C2
2. Create level router and API
3. Build LevelSelector page
4. Build LevelDashboard page

### Phase 2: Lesson System
1. Create LessonDetail page
2. Build vocabulary display
3. Implement grammar notes
4. Add cultural notes section

### Phase 3: Exercise System
1. Build ExerciseRenderer component
2. Create exercise session flow
3. Implement scoring system
4. Add progress tracking

### Phase 4: Advanced Features
1. Register conversion feature
2. Progress dashboard
3. Vocabulary practice mode
4. Achievement system

---

## File Structure (New/Modified)

```
client/src/
├── pages/
│   ├── LevelSelector.tsx (NEW)
│   ├── LevelDashboard.tsx (NEW)
│   ├── LessonDetail.tsx (NEW)
│   ├── VocabularyPractice.tsx (NEW)
│   ├── ProgressDashboard.tsx (NEW)
│   └── ExerciseSession.tsx (NEW)
├── components/
│   ├── LevelCard.tsx (NEW)
│   ├── LessonPlayer.tsx (NEW)
│   ├── ExerciseRenderer.tsx (NEW)
│   ├── ProgressChart.tsx (NEW)
│   └── RegisterConverter.tsx (NEW)
├── const/
│   └── curriculumData.ts (NEW - seed data)
└── contexts/
    └── ProgressContext.tsx (NEW)

server/
├── levelRouter.ts (NEW)
├── curriculumRouter.ts (NEW)
├── progressRouter.ts (NEW)
├── registerRouter.ts (NEW)
└── seed/
    └── curriculumSeed.ts (NEW)

drizzle/
└── schema.ts (MODIFIED - add C2)
```

---

## Success Metrics

- All 6 CEFR levels accessible and navigable
- Minimum 10 lessons per level (60+ total)
- Exercise system functional for all types
- Progress tracking operational
- AI chat adapted for C2 level
- Register conversion working

---

## Timeline Estimate

- Phase 1: 2-3 hours
- Phase 2: 2-3 hours
- Phase 3: 2-3 hours
- Phase 4: 1-2 hours

**Total: 7-11 hours of development**
