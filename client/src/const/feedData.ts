import { LanguageCode } from "@/contexts/LanguageContext";

export interface FeedItem {
  id: string;
  type: 'lesson' | 'conversation' | 'quiz';
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  hostImage: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  duration: number; // in seconds
}

export const MOCK_FEED_DATA: FeedItem[] = [
  {
    id: 'feed-1',
    type: 'conversation',
    title: {
      en: 'Ordering Tapas Like a Pro',
      es: 'Pedir Tapas Como un Profesional',
      ar: 'طلب المقبلات كالمحترفين',
      fr: 'Commander des Tapas comme un Pro',
      it: 'Ordinare Tapas come un Professionista',
      de: 'Tapas wie ein Profi bestellen',
      zh: '像专业人士一样点小吃',
      ru: 'Заказ тапас как профессионал',
    },
    description: {
      en: 'Practice your A1 vocabulary in a lively restaurant setting with our host.',
      es: 'Practica tu vocabulario A1 en un ambiente de restaurante animado con nuestro anfitrión.',
      ar: 'تدرب على مفردات A1 الخاصة بك في مطعم حيوي مع مضيفنا.',
      fr: 'Pratiquez votre vocabulaire A1 dans un restaurant animé avec notre hôte.',
      it: 'Esercita il tuo vocabolario A1 in un vivace ristorante con il nostro ospite.',
      de: 'Üben Sie Ihr A1-Vokabular in einer lebhaften Restaurantumgebung mit unserem Gastgeber.',
      zh: '在我们的主持人的带领下，在热闹的餐厅环境中练习您的 A1 词汇。',
      ru: 'Практикуйте свой словарный запас A1 в оживленной обстановке ресторана с нашим ведущим.',
    },
    hostImage: '/assets/avatars/prize2pride_poster_02_hosts_closeup.png',
    cefrLevel: 'A1',
    duration: 60,
  },
  {
    id: 'feed-2',
    type: 'lesson',
    title: {
      en: 'The Subjunctive Mood: When to Use It',
      es: 'El Subjuntivo: Cuándo Usarlo',
      ar: 'صيغة الشرط: متى تستخدمها',
      fr: 'Le Subjonctif : Quand l\'Utiliser',
      it: 'Il Congiuntivo: Quando Usarlo',
      de: 'Der Subjunktiv: Wann man ihn benutzt',
      zh: '虚拟语气：何时使用',
      ru: 'Сослагательное наклонение: когда его использовать',
    },
    description: {
      en: 'A deep dive into the B2-level grammar topic of the Spanish subjunctive.',
      es: 'Una inmersión profunda en el tema gramatical de nivel B2 del subjuntivo español.',
      ar: 'تعمق في موضوع قواعد اللغة الإسبانية للمستوى B2: صيغة الشرط.',
      fr: 'Une plongée profonde dans le sujet de grammaire de niveau B2 du subjonctif espagnol.',
      it: 'Un\'immersione profonda nell\'argomento grammaticale di livello B2 del congiuntivo spagnolo.',
      de: 'Ein tiefer Einblick in das B2-Grammatikthema des spanischen Subjunktivs.',
      zh: '深入探讨西班牙语虚拟语气 B2 级语法主题。',
      ru: 'Глубокое погружение в грамматическую тему B2 уровня испанского сослагательного наклонения.',
    },
    hostImage: '/assets/avatars/prize2pride_poster_05_branding_hero.png',
    cefrLevel: 'B2',
    duration: 120,
  },
  {
    id: 'feed-3',
    type: 'quiz',
    title: {
      en: 'Quick Quiz: Spanish Slang from Mexico',
      es: 'Cuestionario Rápido: Jerga Mexicana',
      ar: 'اختبار سريع: العامية المكسيكية',
      fr: 'Quiz Rapide : Argot Mexicain',
      it: 'Quiz Veloce: Slang Messicano',
      de: 'Kurz-Quiz: Mexikanischer Slang',
      zh: '快速测验：墨西哥俚语',
      ru: 'Быстрый тест: Мексиканский сленг',
    },
    description: {
      en: 'Test your knowledge of common C1-level Mexican slang phrases.',
      es: 'Pon a prueba tu conocimiento de frases comunes de jerga mexicana de nivel C1.',
      ar: 'اختبر معلوماتك عن العبارات العامية المكسيكية الشائعة على مستوى C1.',
      fr: 'Testez vos connaissances des expressions d\'argot mexicain courantes de niveau C1.',
      it: 'Metti alla prova la tua conoscenza delle frasi gergali messicane comuni di livello C1.',
      de: 'Testen Sie Ihr Wissen über gängige mexikanische Slang-Phrasen auf C1-Niveau.',
      zh: '测试您对 C1 级常见墨西哥俚语短语的了解。',
      ru: 'Проверьте свои знания распространенных мексиканских сленговых фраз уровня C1.',
    },
    hostImage: '/assets/avatars/prize2pride_poster_02_hosts_closeup.png',
    cefrLevel: 'C1',
    duration: 45,
  },
];
