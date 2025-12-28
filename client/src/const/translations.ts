/**
 * Prize2Pride Lingua Spanish Platform
 * Complete Multilingual Translations
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Supported Languages:
 * - English (en)
 * - French (fr)
 * - German (de)
 * - Italian (it)
 * - Arabic (ar)
 * - Chinese (zh)
 */

export type SupportedLanguage = 'en' | 'fr' | 'de' | 'it' | 'ar' | 'zh';

export interface TranslationSet {
  [key: string]: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationSet> = {
  en: {
    // App General
    'app.title': 'Prize2Pride Spanish Platform',
    'app.tagline': 'Master Spanish with Animated Avatar Tutors',
    'app.description': 'The ultimate Spanish learning experience with 100,000 lessons',
    
    // Navigation
    'nav.home': 'Home',
    'nav.lessons': 'Lessons',
    'nav.curriculum': 'Curriculum',
    'nav.chat': 'Chat Arena',
    'nav.modes': 'Learning Modes',
    'nav.pricing': 'Pricing',
    'nav.profile': 'Profile',
    'nav.progress': 'Progress',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    
    // Welcome & Home
    'welcome.title': 'Welcome to Prize2Pride',
    'welcome.subtitle': 'Your journey to Spanish mastery begins here',
    'welcome.cta': 'Start Learning Now',
    'welcome.features.lessons': '100,000+ Lessons',
    'welcome.features.modes': '5 Learning Modes',
    'welcome.features.avatars': 'Animated Avatar Tutors',
    'welcome.features.languages': '6 Interface Languages',
    
    // Subscription Plans
    'subscription.title': 'Choose Your Plan',
    'subscription.freemium': 'Freemium',
    'subscription.bronze': 'Pro Bronze',
    'subscription.silver': 'Pro Silver',
    'subscription.gold': 'Pro Gold',
    'subscription.diamond': 'Pro Diamond',
    'subscription.vip_millionaire': 'VIP Millionaire',
    'subscription.per_month': '/month',
    'subscription.free': 'Free',
    'subscription.subscribe': 'Subscribe',
    'subscription.current_plan': 'Current Plan',
    'subscription.upgrade': 'Upgrade',
    'subscription.downgrade': 'Downgrade',
    
    // Features
    'feature.animated_avatar': 'Animated Avatar Tutor',
    'feature.lessons_access': 'Lessons Access',
    'feature.chat_limit': 'Daily Chat Limit',
    'feature.support': 'Support Level',
    'feature.offline': 'Offline Downloads',
    'feature.certificate': 'Completion Certificate',
    'feature.live_tutoring': 'Live Tutoring',
    'feature.family': 'Family Account',
    
    // Language Modes
    'mode.title': 'Learning Modes',
    'mode.formal': 'Formal Spanish',
    'mode.formal.desc': 'Professional and academic Spanish',
    'mode.informal': 'Informal Spanish',
    'mode.informal.desc': 'Casual everyday Spanish',
    'mode.slang': 'Spanish Slang',
    'mode.slang.desc': 'Street Spanish and regional expressions',
    'mode.dirty': 'Adult Spanish (18+)',
    'mode.dirty.desc': 'Adult language for mature learners',
    'mode.expert': 'Expert Spanish',
    'mode.expert.desc': 'Native-level mastery',
    'mode.locked': 'Upgrade to unlock',
    
    // CEFR Levels
    'level.a1': 'A1 - Beginner',
    'level.a2': 'A2 - Elementary',
    'level.b1': 'B1 - Intermediate',
    'level.b2': 'B2 - Upper Intermediate',
    'level.c1': 'C1 - Advanced',
    'level.c2': 'C2 - Mastery',
    
    // Lessons
    'lesson.start': 'Start Lesson',
    'lesson.continue': 'Continue',
    'lesson.complete': 'Complete',
    'lesson.next': 'Next Lesson',
    'lesson.previous': 'Previous Lesson',
    'lesson.vocabulary': 'Vocabulary',
    'lesson.grammar': 'Grammar',
    'lesson.exercises': 'Exercises',
    'lesson.cultural_notes': 'Cultural Notes',
    'lesson.duration': 'Duration',
    'lesson.minutes': 'minutes',
    
    // Chat
    'chat.title': 'Chat Arena',
    'chat.placeholder': 'Type your message in Spanish or English...',
    'chat.send': 'Send',
    'chat.clear': 'Clear Chat',
    'chat.avatar_speaking': 'Avatar is speaking...',
    'chat.avatar_thinking': 'Avatar is thinking...',
    'chat.remaining': 'Messages remaining today',
    'chat.unlimited': 'Unlimited',
    'chat.upgrade_for_more': 'Upgrade for more messages',
    
    // Avatar
    'avatar.tutor': 'Your Avatar Tutor',
    'avatar.greeting': 'Hello! I\'m your Spanish tutor. How can I help you today?',
    'avatar.encourage': 'Great job! Keep practicing!',
    'avatar.correct': 'Correct! Excellent work!',
    'avatar.incorrect': 'Not quite. Let\'s try again!',
    'avatar.hint': 'Here\'s a hint...',
    
    // Progress
    'progress.title': 'Your Progress',
    'progress.lessons_completed': 'Lessons Completed',
    'progress.vocabulary_learned': 'Words Learned',
    'progress.streak': 'Day Streak',
    'progress.time_spent': 'Time Spent',
    'progress.level': 'Current Level',
    'progress.next_level': 'Next Level',
    
    // Errors & Messages
    'error.generic': 'An error occurred. Please try again.',
    'error.network': 'Network error. Check your connection.',
    'error.unauthorized': 'Please log in to continue.',
    'error.upgrade_required': 'Upgrade your plan to access this feature.',
    'success.saved': 'Changes saved successfully.',
    'success.completed': 'Lesson completed!',
    
    // Footer
    'footer.copyright': '© 2025 Prize2Pride. All rights reserved.',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact Us',
  },
  
  fr: {
    // App General
    'app.title': 'Plateforme d\'Espagnol Prize2Pride',
    'app.tagline': 'Maîtrisez l\'espagnol avec des tuteurs avatars animés',
    'app.description': 'L\'expérience ultime d\'apprentissage de l\'espagnol avec 100 000 leçons',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.lessons': 'Leçons',
    'nav.curriculum': 'Programme',
    'nav.chat': 'Arène de Chat',
    'nav.modes': 'Modes d\'apprentissage',
    'nav.pricing': 'Tarifs',
    'nav.profile': 'Profil',
    'nav.progress': 'Progression',
    'nav.settings': 'Paramètres',
    'nav.logout': 'Déconnexion',
    'nav.login': 'Connexion',
    'nav.signup': 'S\'inscrire',
    
    // Welcome & Home
    'welcome.title': 'Bienvenue sur Prize2Pride',
    'welcome.subtitle': 'Votre voyage vers la maîtrise de l\'espagnol commence ici',
    'welcome.cta': 'Commencer à apprendre',
    'welcome.features.lessons': '100 000+ Leçons',
    'welcome.features.modes': '5 Modes d\'apprentissage',
    'welcome.features.avatars': 'Tuteurs avatars animés',
    'welcome.features.languages': '6 Langues d\'interface',
    
    // Subscription Plans
    'subscription.title': 'Choisissez votre plan',
    'subscription.freemium': 'Freemium',
    'subscription.bronze': 'Pro Bronze',
    'subscription.silver': 'Pro Argent',
    'subscription.gold': 'Pro Or',
    'subscription.diamond': 'Pro Diamant',
    'subscription.vip_millionaire': 'VIP Millionnaire',
    'subscription.per_month': '/mois',
    'subscription.free': 'Gratuit',
    'subscription.subscribe': 'S\'abonner',
    'subscription.current_plan': 'Plan actuel',
    'subscription.upgrade': 'Améliorer',
    'subscription.downgrade': 'Rétrograder',
    
    // Features
    'feature.animated_avatar': 'Tuteur avatar animé',
    'feature.lessons_access': 'Accès aux leçons',
    'feature.chat_limit': 'Limite de chat quotidienne',
    'feature.support': 'Niveau de support',
    'feature.offline': 'Téléchargements hors ligne',
    'feature.certificate': 'Certificat de complétion',
    'feature.live_tutoring': 'Tutorat en direct',
    'feature.family': 'Compte familial',
    
    // Language Modes
    'mode.title': 'Modes d\'apprentissage',
    'mode.formal': 'Espagnol formel',
    'mode.formal.desc': 'Espagnol professionnel et académique',
    'mode.informal': 'Espagnol informel',
    'mode.informal.desc': 'Espagnol quotidien décontracté',
    'mode.slang': 'Argot espagnol',
    'mode.slang.desc': 'Espagnol de rue et expressions régionales',
    'mode.dirty': 'Espagnol adulte (18+)',
    'mode.dirty.desc': 'Langage adulte pour apprenants matures',
    'mode.expert': 'Espagnol expert',
    'mode.expert.desc': 'Maîtrise de niveau natif',
    'mode.locked': 'Améliorez pour débloquer',
    
    // CEFR Levels
    'level.a1': 'A1 - Débutant',
    'level.a2': 'A2 - Élémentaire',
    'level.b1': 'B1 - Intermédiaire',
    'level.b2': 'B2 - Intermédiaire supérieur',
    'level.c1': 'C1 - Avancé',
    'level.c2': 'C2 - Maîtrise',
    
    // Lessons
    'lesson.start': 'Commencer la leçon',
    'lesson.continue': 'Continuer',
    'lesson.complete': 'Terminer',
    'lesson.next': 'Leçon suivante',
    'lesson.previous': 'Leçon précédente',
    'lesson.vocabulary': 'Vocabulaire',
    'lesson.grammar': 'Grammaire',
    'lesson.exercises': 'Exercices',
    'lesson.cultural_notes': 'Notes culturelles',
    'lesson.duration': 'Durée',
    'lesson.minutes': 'minutes',
    
    // Chat
    'chat.title': 'Arène de Chat',
    'chat.placeholder': 'Tapez votre message en espagnol ou en français...',
    'chat.send': 'Envoyer',
    'chat.clear': 'Effacer le chat',
    'chat.avatar_speaking': 'L\'avatar parle...',
    'chat.avatar_thinking': 'L\'avatar réfléchit...',
    'chat.remaining': 'Messages restants aujourd\'hui',
    'chat.unlimited': 'Illimité',
    'chat.upgrade_for_more': 'Améliorez pour plus de messages',
    
    // Avatar
    'avatar.tutor': 'Votre tuteur avatar',
    'avatar.greeting': 'Bonjour ! Je suis votre tuteur d\'espagnol. Comment puis-je vous aider ?',
    'avatar.encourage': 'Excellent travail ! Continuez à pratiquer !',
    'avatar.correct': 'Correct ! Excellent travail !',
    'avatar.incorrect': 'Pas tout à fait. Essayons encore !',
    'avatar.hint': 'Voici un indice...',
    
    // Progress
    'progress.title': 'Votre progression',
    'progress.lessons_completed': 'Leçons terminées',
    'progress.vocabulary_learned': 'Mots appris',
    'progress.streak': 'Jours consécutifs',
    'progress.time_spent': 'Temps passé',
    'progress.level': 'Niveau actuel',
    'progress.next_level': 'Prochain niveau',
    
    // Errors & Messages
    'error.generic': 'Une erreur s\'est produite. Veuillez réessayer.',
    'error.network': 'Erreur réseau. Vérifiez votre connexion.',
    'error.unauthorized': 'Veuillez vous connecter pour continuer.',
    'error.upgrade_required': 'Améliorez votre plan pour accéder à cette fonctionnalité.',
    'success.saved': 'Modifications enregistrées avec succès.',
    'success.completed': 'Leçon terminée !',
    
    // Footer
    'footer.copyright': '© 2025 Prize2Pride. Tous droits réservés.',
    'footer.terms': 'Conditions d\'utilisation',
    'footer.privacy': 'Politique de confidentialité',
    'footer.contact': 'Contactez-nous',
  },
  
  de: {
    // App General
    'app.title': 'Prize2Pride Spanisch-Plattform',
    'app.tagline': 'Meistern Sie Spanisch mit animierten Avatar-Tutoren',
    'app.description': 'Das ultimative Spanisch-Lernerlebnis mit 100.000 Lektionen',
    
    // Navigation
    'nav.home': 'Startseite',
    'nav.lessons': 'Lektionen',
    'nav.curriculum': 'Lehrplan',
    'nav.chat': 'Chat-Arena',
    'nav.modes': 'Lernmodi',
    'nav.pricing': 'Preise',
    'nav.profile': 'Profil',
    'nav.progress': 'Fortschritt',
    'nav.settings': 'Einstellungen',
    'nav.logout': 'Abmelden',
    'nav.login': 'Anmelden',
    'nav.signup': 'Registrieren',
    
    // Welcome & Home
    'welcome.title': 'Willkommen bei Prize2Pride',
    'welcome.subtitle': 'Ihre Reise zur Spanisch-Meisterschaft beginnt hier',
    'welcome.cta': 'Jetzt lernen',
    'welcome.features.lessons': '100.000+ Lektionen',
    'welcome.features.modes': '5 Lernmodi',
    'welcome.features.avatars': 'Animierte Avatar-Tutoren',
    'welcome.features.languages': '6 Oberflächensprachen',
    
    // Subscription Plans
    'subscription.title': 'Wählen Sie Ihren Plan',
    'subscription.freemium': 'Freemium',
    'subscription.bronze': 'Pro Bronze',
    'subscription.silver': 'Pro Silber',
    'subscription.gold': 'Pro Gold',
    'subscription.diamond': 'Pro Diamant',
    'subscription.vip_millionaire': 'VIP Millionär',
    'subscription.per_month': '/Monat',
    'subscription.free': 'Kostenlos',
    'subscription.subscribe': 'Abonnieren',
    'subscription.current_plan': 'Aktueller Plan',
    'subscription.upgrade': 'Upgrade',
    'subscription.downgrade': 'Downgrade',
    
    // Language Modes
    'mode.title': 'Lernmodi',
    'mode.formal': 'Formelles Spanisch',
    'mode.formal.desc': 'Professionelles und akademisches Spanisch',
    'mode.informal': 'Informelles Spanisch',
    'mode.informal.desc': 'Lockeres Alltagsspanisch',
    'mode.slang': 'Spanischer Slang',
    'mode.slang.desc': 'Straßenspanisch und regionale Ausdrücke',
    'mode.dirty': 'Erwachsenen-Spanisch (18+)',
    'mode.dirty.desc': 'Erwachsenensprache für reife Lernende',
    'mode.expert': 'Experten-Spanisch',
    'mode.expert.desc': 'Muttersprachliches Niveau',
    'mode.locked': 'Upgrade zum Freischalten',
    
    // CEFR Levels
    'level.a1': 'A1 - Anfänger',
    'level.a2': 'A2 - Grundstufe',
    'level.b1': 'B1 - Mittelstufe',
    'level.b2': 'B2 - Obere Mittelstufe',
    'level.c1': 'C1 - Fortgeschritten',
    'level.c2': 'C2 - Meisterschaft',
    
    // Chat
    'chat.title': 'Chat-Arena',
    'chat.placeholder': 'Geben Sie Ihre Nachricht auf Spanisch oder Deutsch ein...',
    'chat.send': 'Senden',
    'chat.avatar_speaking': 'Avatar spricht...',
    'chat.avatar_thinking': 'Avatar denkt nach...',
    
    // Avatar
    'avatar.tutor': 'Ihr Avatar-Tutor',
    'avatar.greeting': 'Hallo! Ich bin Ihr Spanisch-Tutor. Wie kann ich Ihnen helfen?',
    
    // Footer
    'footer.copyright': '© 2025 Prize2Pride. Alle Rechte vorbehalten.',
  },
  
  it: {
    // App General
    'app.title': 'Piattaforma Spagnola Prize2Pride',
    'app.tagline': 'Padroneggia lo spagnolo con tutor avatar animati',
    'app.description': 'L\'esperienza definitiva di apprendimento dello spagnolo con 100.000 lezioni',
    
    // Navigation
    'nav.home': 'Home',
    'nav.lessons': 'Lezioni',
    'nav.curriculum': 'Curriculum',
    'nav.chat': 'Arena Chat',
    'nav.modes': 'Modalità di apprendimento',
    'nav.pricing': 'Prezzi',
    'nav.profile': 'Profilo',
    'nav.progress': 'Progressi',
    'nav.settings': 'Impostazioni',
    'nav.logout': 'Esci',
    'nav.login': 'Accedi',
    'nav.signup': 'Registrati',
    
    // Welcome & Home
    'welcome.title': 'Benvenuto su Prize2Pride',
    'welcome.subtitle': 'Il tuo viaggio verso la padronanza dello spagnolo inizia qui',
    'welcome.cta': 'Inizia ad imparare',
    'welcome.features.lessons': '100.000+ Lezioni',
    'welcome.features.modes': '5 Modalità di apprendimento',
    'welcome.features.avatars': 'Tutor avatar animati',
    'welcome.features.languages': '6 Lingue dell\'interfaccia',
    
    // Subscription Plans
    'subscription.title': 'Scegli il tuo piano',
    'subscription.freemium': 'Freemium',
    'subscription.bronze': 'Pro Bronzo',
    'subscription.silver': 'Pro Argento',
    'subscription.gold': 'Pro Oro',
    'subscription.diamond': 'Pro Diamante',
    'subscription.vip_millionaire': 'VIP Milionario',
    'subscription.per_month': '/mese',
    'subscription.free': 'Gratuito',
    'subscription.subscribe': 'Abbonati',
    
    // Language Modes
    'mode.title': 'Modalità di apprendimento',
    'mode.formal': 'Spagnolo formale',
    'mode.informal': 'Spagnolo informale',
    'mode.slang': 'Slang spagnolo',
    'mode.dirty': 'Spagnolo per adulti (18+)',
    'mode.expert': 'Spagnolo esperto',
    
    // Avatar
    'avatar.tutor': 'Il tuo tutor avatar',
    'avatar.greeting': 'Ciao! Sono il tuo tutor di spagnolo. Come posso aiutarti?',
    
    // Footer
    'footer.copyright': '© 2025 Prize2Pride. Tutti i diritti riservati.',
  },
  
  ar: {
    // App General
    'app.title': 'منصة Prize2Pride للإسبانية',
    'app.tagline': 'أتقن الإسبانية مع معلمين أفاتار متحركين',
    'app.description': 'تجربة تعلم الإسبانية النهائية مع 100,000 درس',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.lessons': 'الدروس',
    'nav.curriculum': 'المنهج',
    'nav.chat': 'ساحة الدردشة',
    'nav.modes': 'أوضاع التعلم',
    'nav.pricing': 'الأسعار',
    'nav.profile': 'الملف الشخصي',
    'nav.progress': 'التقدم',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    
    // Welcome & Home
    'welcome.title': 'مرحباً بك في Prize2Pride',
    'welcome.subtitle': 'رحلتك نحو إتقان الإسبانية تبدأ هنا',
    'welcome.cta': 'ابدأ التعلم الآن',
    'welcome.features.lessons': '100,000+ درس',
    'welcome.features.modes': '5 أوضاع تعلم',
    'welcome.features.avatars': 'معلمون أفاتار متحركون',
    'welcome.features.languages': '6 لغات للواجهة',
    
    // Subscription Plans
    'subscription.title': 'اختر خطتك',
    'subscription.freemium': 'مجاني',
    'subscription.bronze': 'برو برونزي',
    'subscription.silver': 'برو فضي',
    'subscription.gold': 'برو ذهبي',
    'subscription.diamond': 'برو ماسي',
    'subscription.vip_millionaire': 'VIP مليونير',
    'subscription.per_month': '/شهر',
    'subscription.free': 'مجاني',
    'subscription.subscribe': 'اشترك',
    
    // Language Modes
    'mode.title': 'أوضاع التعلم',
    'mode.formal': 'الإسبانية الرسمية',
    'mode.informal': 'الإسبانية غير الرسمية',
    'mode.slang': 'العامية الإسبانية',
    'mode.dirty': 'الإسبانية للبالغين (18+)',
    'mode.expert': 'الإسبانية المتقدمة',
    
    // Avatar
    'avatar.tutor': 'معلمك الأفاتار',
    'avatar.greeting': 'مرحباً! أنا معلم الإسبانية الخاص بك. كيف يمكنني مساعدتك؟',
    
    // Footer
    'footer.copyright': '© 2025 Prize2Pride. جميع الحقوق محفوظة.',
  },
  
  zh: {
    // App General
    'app.title': 'Prize2Pride 西班牙语平台',
    'app.tagline': '通过动画头像导师掌握西班牙语',
    'app.description': '拥有100,000节课程的终极西班牙语学习体验',
    
    // Navigation
    'nav.home': '首页',
    'nav.lessons': '课程',
    'nav.curriculum': '课程表',
    'nav.chat': '聊天竞技场',
    'nav.modes': '学习模式',
    'nav.pricing': '价格',
    'nav.profile': '个人资料',
    'nav.progress': '进度',
    'nav.settings': '设置',
    'nav.logout': '退出',
    'nav.login': '登录',
    'nav.signup': '注册',
    
    // Welcome & Home
    'welcome.title': '欢迎来到 Prize2Pride',
    'welcome.subtitle': '您的西班牙语精通之旅从这里开始',
    'welcome.cta': '立即开始学习',
    'welcome.features.lessons': '100,000+ 课程',
    'welcome.features.modes': '5种学习模式',
    'welcome.features.avatars': '动画头像导师',
    'welcome.features.languages': '6种界面语言',
    
    // Subscription Plans
    'subscription.title': '选择您的计划',
    'subscription.freemium': '免费版',
    'subscription.bronze': '专业铜牌',
    'subscription.silver': '专业银牌',
    'subscription.gold': '专业金牌',
    'subscription.diamond': '专业钻石',
    'subscription.vip_millionaire': 'VIP百万富翁',
    'subscription.per_month': '/月',
    'subscription.free': '免费',
    'subscription.subscribe': '订阅',
    
    // Language Modes
    'mode.title': '学习模式',
    'mode.formal': '正式西班牙语',
    'mode.informal': '非正式西班牙语',
    'mode.slang': '西班牙语俚语',
    'mode.dirty': '成人西班牙语 (18+)',
    'mode.expert': '专家级西班牙语',
    
    // Avatar
    'avatar.tutor': '您的头像导师',
    'avatar.greeting': '你好！我是你的西班牙语导师。我今天能帮你什么？',
    
    // Footer
    'footer.copyright': '© 2025 Prize2Pride. 保留所有权利。',
  }
};

// Helper function to get translation
export function getTranslation(language: SupportedLanguage, key: string): string {
  const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];
  return translations[key] || TRANSLATIONS['en'][key] || key;
}

// Language metadata
export const LANGUAGE_METADATA: Record<SupportedLanguage, { name: string; nativeName: string; direction: 'ltr' | 'rtl'; flag: string }> = {
  en: { name: 'English', nativeName: 'English', direction: 'ltr', flag: '🇬🇧' },
  fr: { name: 'French', nativeName: 'Français', direction: 'ltr', flag: '🇫🇷' },
  de: { name: 'German', nativeName: 'Deutsch', direction: 'ltr', flag: '🇩🇪' },
  it: { name: 'Italian', nativeName: 'Italiano', direction: 'ltr', flag: '🇮🇹' },
  ar: { name: 'Arabic', nativeName: 'العربية', direction: 'rtl', flag: '🇸🇦' },
  zh: { name: 'Chinese', nativeName: '中文', direction: 'ltr', flag: '🇨🇳' }
};

export default TRANSLATIONS;
