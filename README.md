# Prize2Pride Autonomous Spanish Teaching Platform

This repository has been augmented under the **Prize2Pride** brand, adopting the theme of an **Ultra-Luxury Knowledge Casino Studio**. The platform has been transformed into a fully autonomous, multi-lingual Spanish learning application with a focus on interactive, real-time learning.

## Key Augmentations (Omega777 AGI Mode)

1.  **Prize2Pride Branding & Multi-Lingual UI:**
    *   The application's UI has been re-themed with a luxury aesthetic (Black, Gold, Deep Sapphire).
    *   The interface now supports **8 explanatory languages** (English, Spanish, Arabic, French, Italian, German, Chinese, and Russian) with a functional language selector.

2.  **TikTok-like Feed (Feed.tsx):**
    *   The main landing page has been replaced with a vertical, scrollable feed of lessons and content, inspired by the TikTok interface.
    *   Content items are displayed using the new `FeedItemCard` component.

3.  **Autonomous Avatar Host & Chat Arena (ChatArena.tsx):**
    *   **AvatarHost.tsx:** A component to display the Prize2Pride hosts (using the provided poster assets) with dynamic state indicators (idle, listening, speaking).
    *   **ChatArena.tsx:** A dedicated page for real-time, autonomous conversation with the AI host.
    *   **Real-time Interaction API (chatRouter.ts):** A new tRPC endpoint uses an LLM (gpt-4.1-mini) to generate CEFR-level-appropriate Spanish conversation, maintaining the luxury host persona.

4.  **Autonomous Content Enrichment (Web Scraping):**
    *   **scraper.py:** A Python script was created to autonomously scrape real-world Spanish news articles (from `practiceespanol.com`) and their English translations.
    *   **LLM-Powered CEFR Leveling:** The scraper uses an LLM to automatically determine the CEFR level (A1-C1) of the scraped Spanish content, ensuring quality and relevance.
    *   **Lesson API (lessonRouter.ts):** A new tRPC endpoint serves the scraped and leveled content, integrating it directly into the main feed alongside the mock lessons.

## Technical Details

*   **Frontend:** React, Vite, TypeScript, TailwindCSS (with Prize2Pride theme), Wouter, `lucide-react`.
*   **Backend:** Express, tRPC, Drizzle ORM (existing), new `chatRouter.ts` and `lessonRouter.ts`.
*   **Autonomous Components:** `server/scraper.py` (Python, BeautifulSoup, Requests, OpenAI API).

## Next Steps

The platform is now fully augmented with the requested features. To deploy and test:

1.  **Install Dependencies:**
    ```bash
    # Install Python dependencies for the scraper
    pip3 install requests beautifulsoup4 openai

    # Install Node.js dependencies
    pnpm install
    ```
2.  **Run Scraper (Optional):**
    ```bash
    cd server
    python3 scraper.py
    # This will generate scraped_lessons.json
    ```
3.  **Start Development Servers:**
    ```bash
    # In one terminal for the backend
    pnpm dev:server

    # In another terminal for the frontend
    pnpm dev:client
    ```
4.  **Access:** The client will be available at the exposed port (usually `http://localhost:5173`). Navigate to `/chat` to test the new Chat Arena.

This augmentation represents a significant leap towards a fully autonomous, data-driven Spanish learning experience under the Prize2Pride brand.
