# Prize2Pride Spanish Platform 🇪🇸

## Ultra-Luxury Knowledge Casino Studio - Spanish Learning A1-C2

A comprehensive Spanish language learning platform covering all CEFR levels from absolute beginner (A1) to mastery (C2). Built with modern web technologies and featuring **10,000+ lessons**, AI-powered conversations, and an immersive TikTok-style learning feed.

![CEFR Levels](https://img.shields.io/badge/CEFR-A1--C2-blue)
![Lessons](https://img.shields.io/badge/Lessons-10%2C000+-green)
![Languages](https://img.shields.io/badge/UI%20Languages-8-orange)

---

## 🎯 Features

### 📚 Comprehensive Curriculum (10,000 Lessons)

| Level | Name | Lessons | Topics |
|-------|------|---------|--------|
| **A1** | Breakthrough | 2,000 | Greetings, Numbers, Colors, Family, Food, Time, Weather, Body, Clothes, House, Animals, Professions |
| **A2** | Waystage | 2,000 | Daily Routines, Travel, Shopping, Health, Emotions, Restaurant, Hotel, Transport, Hobbies, Technology |
| **B1** | Threshold | 1,800 | Opinions, Subjunctive Intro, Conditional, Work, Education, Environment, Relationships, Culture, Media, Storytelling |
| **B2** | Vantage | 1,700 | Subjunctive Advanced, Passive Voice, Debates, Politics, Economics, Science, Arts, Literature, Idioms, Academic Writing |
| **C1** | Effective Proficiency | 1,500 | Professional Spanish, Legal, Medical, Technical, Philosophy, Nuanced Expression, Dialects, Journalism, Diplomacy, Translation |
| **C2** | Mastery | 1,000 | Literary Analysis, Philosophical Discourse, Legal Advanced, Interpretation, Cultural Subtleties, Historical Texts, Academic Publishing, Native Idioms |

### 🎓 Each Lesson Includes

- **Vocabulary**: 6-8 items with pronunciations and example sentences
- **Grammar Points**: 2-4 concepts per lesson
- **Cultural Notes**: Authentic cultural insights
- **Exercises**: 4 interactive exercises (multiple choice, fill-in-blank, translation, matching)
- **Estimated Time**: 15-60 minutes depending on level

### 🤖 AI-Powered Features

- **Chat Arena**: Practice conversations with AI tutors
- **Level-Adaptive Responses**: AI adjusts complexity based on your CEFR level
- **Real-time Feedback**: Instant corrections and explanations
- **Autonomous Content Scraping**: Real-world Spanish news with LLM-powered CEFR leveling

### 📱 Modern UI/UX

- **TikTok-Style Feed**: Swipeable lesson cards for engaging learning
- **Dark Theme**: Beautiful gradient design with purple/slate tones
- **Responsive Design**: Works on desktop, tablet, and mobile
- **8 UI Languages**: English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Arabic, Russian

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS
- **Backend**: Express + tRPC + Node.js
- **Database**: MySQL/TiDB + Drizzle ORM
- **AI**: OpenAI-compatible API integration (gpt-4.1-mini, gemini-2.5-flash)
- **Authentication**: Manus OAuth

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm
- MySQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/collegeklaritausa-ui/lingua-spanish-platform.git
cd lingua-spanish-platform

# Install dependencies
pnpm install

# Install Python dependencies for scraper (optional)
pip3 install requests beautifulsoup4 openai

# Set up environment variables
cp .env.example .env
# Edit .env with your database and API credentials

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```
lingua-spanish-platform/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── AvatarHost.tsx
│   │   │   └── FeedItemCard.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── Feed.tsx     # TikTok-style lesson feed
│   │   │   ├── ChatArena.tsx # AI conversation practice
│   │   │   └── Curriculum.tsx # Full curriculum browser
│   │   ├── contexts/        # React contexts (Language, Theme)
│   │   └── const/           # Constants and data
│   │       ├── feedData.ts
│   │       └── curriculumData.ts
├── server/                   # Backend Express + tRPC
│   ├── _core/               # Core utilities (LLM, auth, etc.)
│   ├── routers.ts           # Main router
│   ├── lessonRouter.ts      # Lesson API
│   ├── chatRouter.ts        # AI Chat API
│   ├── curriculumRouter.ts  # Curriculum API (10K lessons)
│   ├── scraper.py           # Autonomous content scraper
│   ├── generate_all_lessons.py  # Bulk lesson generator
│   └── generate_lessons_batch.py
├── generated_lessons/        # 10,000 generated lessons
│   ├── lessons_A1.json      # 2,000 A1 lessons (8.3MB)
│   ├── lessons_A2.json      # 2,000 A2 lessons (8.8MB)
│   ├── lessons_B1.json      # 1,800 B1 lessons (8.1MB)
│   ├── lessons_B2.json      # 1,700 B2 lessons (7.8MB)
│   ├── lessons_C1.json      # 1,500 C1 lessons (7.1MB)
│   ├── lessons_C2.json      # 1,000 C2 lessons (4.8MB)
│   ├── all_lessons.json     # Combined (45MB)
│   └── summary.json         # Statistics
├── drizzle/                  # Database schema
└── shared/                   # Shared types and constants
```

---

## 🔌 API Endpoints

### Curriculum Router (`/api/trpc/curriculum.*`)

| Endpoint | Description |
|----------|-------------|
| `getLevels` | Get all CEFR levels with metadata |
| `getLessonsByLevel` | Paginated lessons by level |
| `getLessonBySlug` | Single lesson detail |
| `getLessonsByCategory` | Lessons by topic category |
| `searchLessons` | Full-text search |
| `getStats` | Curriculum statistics |

### Chat Router (`/api/trpc/chat.*`)

| Endpoint | Description |
|----------|-------------|
| `sendMessage` | Send message to AI tutor |
| `getHistory` | Get conversation history |

### Lesson Router (`/api/trpc/lesson.*`)

| Endpoint | Description |
|----------|-------------|
| `getAll` | Get all scraped lessons |
| `getByLevel` | Filter by CEFR level |

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| **Total Lessons** | 10,000 |
| **Total Vocabulary Items** | ~70,000 |
| **Total Exercises** | ~40,000 |
| **Topic Categories** | 62 |
| **CEFR Levels** | 6 (A1, A2, B1, B2, C1, C2) |
| **UI Languages** | 8+ |

---

## 🎨 Key Pages

### `/` - Feed
TikTok-style swipeable cards for engaging micro-learning with luxury casino aesthetic.

### `/curriculum` - Curriculum Browser
Browse all 10,000 lessons by CEFR level with search, pagination, and topic filtering.

### `/chat` - AI Chat Arena
Practice conversations with AI tutors adapted to your CEFR level.

---

## 🔧 Key Augmentations

1. **C2 Mastery Level Support** - Extended platform from A1-C1 to full A1-C2 coverage
2. **10,000 Lesson Generation** - Comprehensive curriculum with vocabulary, grammar, exercises
3. **Curriculum Browser UI** - Beautiful dark theme interface for lesson discovery
4. **Curriculum API** - Full tRPC router for lesson management
5. **Build Fixes** - Production-ready build configuration

---

## 📝 Recent Commits

```
🔧 Fix chatRouter import for LLM function
🎯 Integrate Curriculum System with UI
🎓 Generated 10,000 Spanish Lessons (A1-C2)
🚀 Major Augmentation: A1-C2 CEFR Level Support
```

---

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

**Prize2Pride Platform - Ultra-Luxury Knowledge Casino Studio**

**Built with ❤️ for Spanish learners worldwide**
