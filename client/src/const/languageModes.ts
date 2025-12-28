/**
 * Prize2Pride Lingua Spanish Platform
 * Language Learning Modes Configuration
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Modes:
 * - Formal: Professional and academic Spanish
 * - Informal: Casual everyday Spanish
 * - Slang: Street Spanish and regional expressions
 * - Dirty: Adult language and expressions (18+)
 * - Expert: Native-level mastery with nuances
 */

export interface LanguageMode {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
  description: string;
  descriptionTranslations: Record<string, string>;
  icon: string;
  color: string;
  gradient: string;
  examples: SpanishExample[];
  minimumTier: string;
  ageRestricted: boolean;
  cefrLevels: string[];
  topics: string[];
  vocabulary: VocabularyItem[];
  grammarFocus: string[];
  culturalNotes: string[];
}

export interface SpanishExample {
  spanish: string;
  english: string;
  french: string;
  german: string;
  italian: string;
  arabic: string;
  chinese: string;
  context: string;
  audioUrl?: string;
}

export interface VocabularyItem {
  word: string;
  translation: Record<string, string>;
  pronunciation: string;
  partOfSpeech: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  region?: string;
}

export const LANGUAGE_MODES: LanguageMode[] = [
  {
    id: 'formal',
    name: 'Formal Spanish',
    nameTranslations: {
      en: 'Formal Spanish',
      fr: 'Espagnol Formel',
      de: 'Formelles Spanisch',
      it: 'Spagnolo Formale',
      ar: 'الإسبانية الرسمية',
      zh: '正式西班牙语'
    },
    description: 'Professional and academic Spanish for business, legal, and formal settings',
    descriptionTranslations: {
      en: 'Professional and academic Spanish for business, legal, and formal settings',
      fr: 'Espagnol professionnel et académique pour les affaires, le juridique et les contextes formels',
      de: 'Professionelles und akademisches Spanisch für Geschäft, Recht und formelle Situationen',
      it: 'Spagnolo professionale e accademico per affari, legale e contesti formali',
      ar: 'الإسبانية المهنية والأكاديمية للأعمال والقانون والسياقات الرسمية',
      zh: '用于商务、法律和正式场合的专业学术西班牙语'
    },
    icon: '🎩',
    color: '#1E40AF',
    gradient: 'from-blue-700 to-blue-900',
    examples: [
      {
        spanish: 'Buenos días, ¿cómo está usted?',
        english: 'Good morning, how are you? (formal)',
        french: 'Bonjour, comment allez-vous ?',
        german: 'Guten Morgen, wie geht es Ihnen?',
        italian: 'Buongiorno, come sta?',
        arabic: 'صباح الخير، كيف حالك؟',
        chinese: '早上好，您好吗？',
        context: 'Formal greeting in business setting'
      },
      {
        spanish: 'Le agradezco su atención',
        english: 'I appreciate your attention',
        french: 'Je vous remercie de votre attention',
        german: 'Ich danke Ihnen für Ihre Aufmerksamkeit',
        italian: 'La ringrazio per la sua attenzione',
        arabic: 'أشكرك على اهتمامك',
        chinese: '感谢您的关注',
        context: 'Formal thank you'
      },
      {
        spanish: 'Quisiera solicitar una reunión',
        english: 'I would like to request a meeting',
        french: 'Je souhaiterais demander une réunion',
        german: 'Ich möchte um ein Treffen bitten',
        italian: 'Vorrei richiedere una riunione',
        arabic: 'أود طلب اجتماع',
        chinese: '我想请求一次会议',
        context: 'Business request'
      }
    ],
    minimumTier: 'freemium',
    ageRestricted: false,
    cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    topics: ['business', 'legal', 'academic', 'diplomacy', 'correspondence', 'presentations'],
    vocabulary: [],
    grammarFocus: ['subjunctive', 'conditional', 'formal_imperatives', 'passive_voice'],
    culturalNotes: ['Use "usted" for formal address', 'Titles are important in formal settings']
  },
  {
    id: 'informal',
    name: 'Informal Spanish',
    nameTranslations: {
      en: 'Informal Spanish',
      fr: 'Espagnol Informel',
      de: 'Informelles Spanisch',
      it: 'Spagnolo Informale',
      ar: 'الإسبانية غير الرسمية',
      zh: '非正式西班牙语'
    },
    description: 'Casual everyday Spanish for friends, family, and social situations',
    descriptionTranslations: {
      en: 'Casual everyday Spanish for friends, family, and social situations',
      fr: 'Espagnol décontracté pour les amis, la famille et les situations sociales',
      de: 'Lockeres Alltagsspanisch für Freunde, Familie und soziale Situationen',
      it: 'Spagnolo casual per amici, famiglia e situazioni sociali',
      ar: 'الإسبانية اليومية للأصدقاء والعائلة والمواقف الاجتماعية',
      zh: '用于朋友、家人和社交场合的日常西班牙语'
    },
    icon: '😊',
    color: '#059669',
    gradient: 'from-green-600 to-green-800',
    examples: [
      {
        spanish: '¡Hola! ¿Qué tal?',
        english: 'Hi! How\'s it going?',
        french: 'Salut ! Ça va ?',
        german: 'Hallo! Wie geht\'s?',
        italian: 'Ciao! Come va?',
        arabic: 'مرحبا! كيف الحال؟',
        chinese: '嗨！怎么样？',
        context: 'Casual greeting'
      },
      {
        spanish: '¿Quedamos mañana?',
        english: 'Shall we meet tomorrow?',
        french: 'On se voit demain ?',
        german: 'Treffen wir uns morgen?',
        italian: 'Ci vediamo domani?',
        arabic: 'هل نلتقي غدا؟',
        chinese: '明天见面吗？',
        context: 'Making plans with friends'
      },
      {
        spanish: 'Me mola mucho esta canción',
        english: 'I really like this song',
        french: 'J\'adore cette chanson',
        german: 'Ich mag dieses Lied sehr',
        italian: 'Mi piace molto questa canzone',
        arabic: 'أحب هذه الأغنية كثيرا',
        chinese: '我很喜欢这首歌',
        context: 'Expressing preference casually'
      }
    ],
    minimumTier: 'bronze',
    ageRestricted: false,
    cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    topics: ['daily_life', 'friends', 'family', 'hobbies', 'social_media', 'dating'],
    vocabulary: [],
    grammarFocus: ['tu_form', 'colloquial_expressions', 'contractions'],
    culturalNotes: ['Use "tú" with friends and peers', 'Kissing on cheeks is common greeting']
  },
  {
    id: 'slang',
    name: 'Spanish Slang',
    nameTranslations: {
      en: 'Spanish Slang',
      fr: 'Argot Espagnol',
      de: 'Spanischer Slang',
      it: 'Slang Spagnolo',
      ar: 'العامية الإسبانية',
      zh: '西班牙语俚语'
    },
    description: 'Street Spanish, regional expressions, and youth language',
    descriptionTranslations: {
      en: 'Street Spanish, regional expressions, and youth language',
      fr: 'Espagnol de rue, expressions régionales et langage des jeunes',
      de: 'Straßenspanisch, regionale Ausdrücke und Jugendsprache',
      it: 'Spagnolo di strada, espressioni regionali e linguaggio giovanile',
      ar: 'الإسبانية الشارعية والتعبيرات الإقليمية ولغة الشباب',
      zh: '街头西班牙语、地区表达和青年语言'
    },
    icon: '🔥',
    color: '#DC2626',
    gradient: 'from-red-600 to-red-800',
    examples: [
      {
        spanish: '¡Qué guay, tío!',
        english: 'That\'s so cool, dude!',
        french: 'Trop cool, mec !',
        german: 'Voll cool, Alter!',
        italian: 'Che figo, amico!',
        arabic: 'رائع جدا يا صاحبي!',
        chinese: '太酷了，哥们！',
        context: 'Spain - expressing excitement'
      },
      {
        spanish: '¡Está chido!',
        english: 'It\'s awesome!',
        french: 'C\'est génial !',
        german: 'Das ist geil!',
        italian: 'È fantastico!',
        arabic: 'هذا رائع!',
        chinese: '太棒了！',
        context: 'Mexico - expressing approval'
      },
      {
        spanish: '¡Qué boludo!',
        english: 'What an idiot!',
        french: 'Quel idiot !',
        german: 'Was für ein Idiot!',
        italian: 'Che idiota!',
        arabic: 'يا له من أحمق!',
        chinese: '真是个傻瓜！',
        context: 'Argentina - mild insult among friends'
      },
      {
        spanish: 'Vamos a echar unas birras',
        english: 'Let\'s grab some beers',
        french: 'Allons boire des bières',
        german: 'Lass uns ein paar Bier trinken',
        italian: 'Andiamo a bere delle birre',
        arabic: 'لنذهب لشرب بعض البيرة',
        chinese: '我们去喝几杯啤酒吧',
        context: 'Casual invitation'
      },
      {
        spanish: 'Estoy flipando',
        english: 'I\'m freaking out / amazed',
        french: 'Je suis scotché',
        german: 'Ich flippe aus',
        italian: 'Sto impazzendo',
        arabic: 'أنا مندهش',
        chinese: '我惊呆了',
        context: 'Expressing shock or amazement'
      }
    ],
    minimumTier: 'silver',
    ageRestricted: false,
    cefrLevels: ['B1', 'B2', 'C1', 'C2'],
    topics: ['street_talk', 'youth_culture', 'music', 'nightlife', 'social_media', 'regional_dialects'],
    vocabulary: [],
    grammarFocus: ['colloquialisms', 'regional_variations', 'abbreviated_forms'],
    culturalNotes: [
      'Slang varies greatly by country and region',
      'Spain slang differs from Latin American slang',
      'Some words are offensive in certain countries but not others'
    ]
  },
  {
    id: 'dirty',
    name: 'Adult Spanish (18+)',
    nameTranslations: {
      en: 'Adult Spanish (18+)',
      fr: 'Espagnol Adulte (18+)',
      de: 'Erwachsenen-Spanisch (18+)',
      it: 'Spagnolo per Adulti (18+)',
      ar: 'الإسبانية للبالغين (18+)',
      zh: '成人西班牙语 (18+)'
    },
    description: 'Adult language, expressions, and vocabulary for mature learners',
    descriptionTranslations: {
      en: 'Adult language, expressions, and vocabulary for mature learners',
      fr: 'Langage adulte, expressions et vocabulaire pour apprenants matures',
      de: 'Erwachsenensprache, Ausdrücke und Vokabular für reife Lernende',
      it: 'Linguaggio adulto, espressioni e vocabolario per studenti maturi',
      ar: 'لغة البالغين والتعبيرات والمفردات للمتعلمين الناضجين',
      zh: '成人语言、表达和词汇，适合成熟学习者'
    },
    icon: '🔞',
    color: '#7C3AED',
    gradient: 'from-purple-600 to-purple-900',
    examples: [
      {
        spanish: '¡Joder!',
        english: 'F**k! (exclamation)',
        french: 'Putain !',
        german: 'Scheiße!',
        italian: 'Cazzo!',
        arabic: 'اللعنة!',
        chinese: '该死！',
        context: 'Common Spanish expletive'
      },
      {
        spanish: '¡Me cago en...!',
        english: 'I sh*t on...! (strong expression)',
        french: 'Je ch** sur...!',
        german: 'Ich sch** auf...!',
        italian: 'Mi ca** su...!',
        arabic: '!...أنا أل',
        chinese: '我去...！',
        context: 'Very strong Spanish expression of frustration'
      },
      {
        spanish: 'Está buenísimo/a',
        english: 'He/She is really hot',
        french: 'Il/Elle est super canon',
        german: 'Er/Sie ist echt heiß',
        italian: 'È bellissimo/a',
        arabic: 'هو/هي جذاب/ة جدا',
        chinese: '他/她真性感',
        context: 'Commenting on attractiveness'
      }
    ],
    minimumTier: 'gold',
    ageRestricted: true,
    cefrLevels: ['B2', 'C1', 'C2'],
    topics: ['profanity', 'adult_expressions', 'dating', 'mature_humor', 'taboo_topics'],
    vocabulary: [],
    grammarFocus: ['intensifiers', 'vulgar_expressions', 'euphemisms'],
    culturalNotes: [
      'Spanish profanity is very colorful and creative',
      'Context matters - some words are acceptable among friends',
      'Religious references are common in Spanish swearing'
    ]
  },
  {
    id: 'expert',
    name: 'Expert Spanish',
    nameTranslations: {
      en: 'Expert Spanish',
      fr: 'Espagnol Expert',
      de: 'Experten-Spanisch',
      it: 'Spagnolo Esperto',
      ar: 'الإسبانية المتقدمة',
      zh: '专家级西班牙语'
    },
    description: 'Native-level mastery with dialectal variations, literary expressions, and cultural nuances',
    descriptionTranslations: {
      en: 'Native-level mastery with dialectal variations, literary expressions, and cultural nuances',
      fr: 'Maîtrise de niveau natif avec variations dialectales, expressions littéraires et nuances culturelles',
      de: 'Muttersprachliches Niveau mit dialektalen Variationen, literarischen Ausdrücken und kulturellen Nuancen',
      it: 'Padronanza a livello nativo con variazioni dialettali, espressioni letterarie e sfumature culturali',
      ar: 'إتقان على مستوى اللغة الأم مع الاختلافات اللهجية والتعبيرات الأدبية والفروق الثقافية',
      zh: '母语级掌握，包括方言变体、文学表达和文化细微差别'
    },
    icon: '🎓',
    color: '#0891B2',
    gradient: 'from-cyan-600 to-cyan-900',
    examples: [
      {
        spanish: 'El que mucho abarca, poco aprieta',
        english: 'He who grasps at too much holds nothing fast',
        french: 'Qui trop embrasse mal étreint',
        german: 'Wer zu viel will, bekommt nichts',
        italian: 'Chi troppo vuole nulla stringe',
        arabic: 'من يريد الكثير لا يحصل على شيء',
        chinese: '贪多嚼不烂',
        context: 'Spanish proverb about overreaching'
      },
      {
        spanish: 'Vosotros habéis llegado tarde',
        english: 'You all have arrived late (Spain)',
        french: 'Vous êtes arrivés en retard',
        german: 'Ihr seid spät angekommen',
        italian: 'Siete arrivati in ritardo',
        arabic: 'لقد وصلتم متأخرين',
        chinese: '你们来晚了',
        context: 'Vosotros form - Spain only'
      },
      {
        spanish: 'Che, ¿vos tenés un mango?',
        english: 'Hey, do you have any money? (Argentina)',
        french: 'Hé, tu as de l\'argent ?',
        german: 'Hey, hast du Geld?',
        italian: 'Ehi, hai dei soldi?',
        arabic: 'هل لديك نقود؟',
        chinese: '嘿，你有钱吗？',
        context: 'Argentine voseo and slang'
      },
      {
        spanish: 'La pluma es más poderosa que la espada',
        english: 'The pen is mightier than the sword',
        french: 'La plume est plus puissante que l\'épée',
        german: 'Die Feder ist mächtiger als das Schwert',
        italian: 'La penna è più potente della spada',
        arabic: 'القلم أقوى من السيف',
        chinese: '笔比剑更有力量',
        context: 'Literary expression'
      }
    ],
    minimumTier: 'diamond',
    ageRestricted: false,
    cefrLevels: ['C1', 'C2'],
    topics: [
      'literature', 'philosophy', 'dialectology', 'historical_spanish',
      'academic_writing', 'translation', 'interpretation', 'linguistics'
    ],
    vocabulary: [],
    grammarFocus: [
      'voseo', 'leismo_laismo_loismo', 'subjunctive_advanced',
      'literary_tenses', 'regional_grammar', 'archaic_forms'
    ],
    culturalNotes: [
      'Spanish has 20+ national varieties',
      'Voseo is used in Argentina, Uruguay, and parts of Central America',
      'Literary Spanish preserves forms not used in everyday speech'
    ]
  }
];

// Mode selection helper functions
export function getModeById(modeId: string): LanguageMode | undefined {
  return LANGUAGE_MODES.find(mode => mode.id === modeId);
}

export function getModesForTier(tier: string): LanguageMode[] {
  const tierOrder = ['freemium', 'bronze', 'silver', 'gold', 'diamond', 'vip_millionaire'];
  const tierIndex = tierOrder.indexOf(tier);
  
  return LANGUAGE_MODES.filter(mode => {
    const modeIndex = tierOrder.indexOf(mode.minimumTier);
    return modeIndex <= tierIndex;
  });
}

export function canAccessMode(userTier: string, modeId: string): boolean {
  const mode = getModeById(modeId);
  if (!mode) return false;
  
  const tierOrder = ['freemium', 'bronze', 'silver', 'gold', 'diamond', 'vip_millionaire'];
  const userTierIndex = tierOrder.indexOf(userTier);
  const modeTierIndex = tierOrder.indexOf(mode.minimumTier);
  
  return userTierIndex >= modeTierIndex;
}

export default LANGUAGE_MODES;
