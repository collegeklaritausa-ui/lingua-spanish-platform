import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// Define supported languages and their codes
export type LanguageCode = 'en' | 'es' | 'ar' | 'fr' | 'it' | 'de' | 'zh' | 'ru';

export const SUPPORTED_LANGUAGES: Record<LanguageCode, string> = {
  en: 'English',
  es: 'Español',
  ar: 'العربية',
  fr: 'Français',
  it: 'Italiano',
  de: 'Deutsch',
  zh: '中文',
  ru: 'Русский',
};

// Define the structure for UI translations
interface Translations {
  [key: string]: string;
}

// Placeholder for actual translations. In a real app, this would be loaded dynamically.
// For now, we'll just use English as the base and add a few key translations.
const uiTranslations: Record<LanguageCode, Translations> = {
  en: {
    'app.title': 'Prize2Pride Spanish Platform',
    'nav.home': 'Home',
    'nav.lessons': 'Lessons',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'welcome.message': 'Welcome to the Prize2Pride Knowledge Arena.',
    'button.start': 'Start Learning',
    'host.alt_text': 'Prize2Pride Host Avatar',
    'host.default_message': 'Welcome to the Prize2Pride Knowledge Arena. How can I assist you today?',
    'chat.arena_title': 'Chat Arena',
    'chat.host_title': 'Autonomous Host',
    'chat.conversation_title': 'Conversation',
    'chat.input_placeholder': 'Type your message in Spanish or English...',
    'chat.host_typing': 'Host is thinking...',
    'chat.error_message': 'An error occurred. Please try again.',
  },
  es: {
    'app.title': 'Plataforma de Español Prize2Pride',
    'nav.home': 'Inicio',
    'nav.lessons': 'Lecciones',
    'nav.profile': 'Perfil',
    'nav.login': 'Iniciar Sesión',
    'welcome.message': 'Bienvenido a la Arena del Conocimiento Prize2Pride.',
    'button.start': 'Empezar a Aprender',
    'host.alt_text': 'Avatar del Anfitrión Prize2Pride',
    'host.default_message': 'Bienvenido a la Arena del Conocimiento Prize2Pride. ¿Cómo puedo ayudarte hoy?',
    'chat.arena_title': 'Arena de Chat',
    'chat.host_title': 'Anfitrión Autónomo',
    'chat.conversation_title': 'Conversación',
    'chat.input_placeholder': 'Escribe tu mensaje en español o inglés...',
    'chat.host_typing': 'El anfitrión está pensando...',
    'chat.error_message': 'Ocurrió un error. Por favor, inténtalo de nuevo.',
  },
  // Add other languages as needed
  ar: {
    'app.title': 'منصة برايز تو برايد لتعليم الإسبانية',
    'nav.home': 'الرئيسية',
    'nav.lessons': 'الدروس',
    'nav.profile': 'الملف الشخصي',
    'nav.login': 'تسجيل الدخول',
    'welcome.message': 'مرحبًا بك في ساحة المعرفة Prize2Pride.',
    'button.start': 'ابدأ التعلم',
    'host.alt_text': 'صورة المضيف Prize2Pride',
    'host.default_message': 'مرحبًا بك في ساحة المعرفة Prize2Pride. كيف يمكنني مساعدتك اليوم؟',
    'chat.arena_title': 'ساحة الدردشة',
    'chat.host_title': 'المضيف المستقل',
    'chat.conversation_title': 'المحادثة',
    'chat.input_placeholder': 'اكتب رسالتك بالإسبانية أو الإنجليزية...',
    'chat.host_typing': 'المضيف يفكر...',
    'chat.error_message': 'حدث خطأ. الرجاء المحاولة مرة أخرى.',
  },
  fr: {
    'app.title': 'Plateforme d\'Espagnol Prize2Pride',
    'nav.home': 'Accueil',
    'nav.lessons': 'Leçons',
    'nav.profile': 'Profil',
    'nav.login': 'Connexion',
    'welcome.message': 'Bienvenue dans l\'Arène du Savoir Prize2Pride.',
    'button.start': 'Commencer à Apprendre',
    'host.alt_text': 'Avatar de l\'Hôte Prize2Pride',
    'host.default_message': 'Bienvenue dans l\'Arène du Savoir Prize2Pride. Comment puis-je vous aider aujourd\'hui ?',
    'chat.arena_title': 'Arène de Chat',
    'chat.host_title': 'Hôte Autonome',
    'chat.conversation_title': 'Conversation',
    'chat.input_placeholder': 'Tapez votre message en espagnol ou en anglais...',
    'chat.host_typing': 'L\'hôte réfléchit...',
    'chat.error_message': 'Une erreur s\'est produite. Veuillez réessayer.',
  },
  it: {
    'app.title': 'Piattaforma Spagnola Prize2Pride',
    'nav.home': 'Home',
    'nav.lessons': 'Lezioni',
    'nav.profile': 'Profilo',
    'nav.login': 'Accedi',
    'welcome.message': 'Benvenuto nell\'Arena della Conoscenza Prize2Pride.',
    'button.start': 'Inizia ad Imparare',
    'host.alt_text': 'Avatar dell\'Ospite Prize2Pride',
    'host.default_message': 'Benvenuto nell\'Arena della Conoscenza Prize2Pride. Come posso assisterti oggi?',
    'chat.arena_title': 'Arena di Chat',
    'chat.host_title': 'Ospite Autonomo',
    'chat.conversation_title': 'Conversazione',
    'chat.input_placeholder': 'Digita il tuo messaggio in spagnolo o inglese...',
    'chat.host_typing': 'L\'ospite sta pensando...',
    'chat.error_message': 'Si è verificato un errore. Per favore riprova.',
  },
  de: {
    'app.title': 'Prize2Pride Spanisch-Plattform',
    'nav.home': 'Startseite',
    'nav.lessons': 'Lektionen',
    'nav.profile': 'Profil',
    'nav.login': 'Anmelden',
    'welcome.message': 'Willkommen in der Prize2Pride Wissensarena.',
    'button.start': 'Mit dem Lernen beginnen',
    'host.alt_text': 'Prize2Pride Host Avatar',
    'host.default_message': 'Willkommen in der Prize2Pride Wissensarena. Wie kann ich Ihnen heute behilflich sein?',
    'chat.arena_title': 'Chat-Arena',
    'chat.host_title': 'Autonomer Host',
    'chat.conversation_title': 'Konversation',
    'chat.input_placeholder': 'Geben Sie Ihre Nachricht auf Spanisch oder Englisch ein...',
    'chat.host_typing': 'Der Host denkt nach...',
    'chat.error_message': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
  },
  zh: {
    'app.title': 'Prize2Pride 西班牙语平台',
    'nav.home': '首页',
    'nav.lessons': '课程',
    'nav.profile': '个人资料',
    'nav.login': '登录',
    'welcome.message': '欢迎来到 Prize2Pride 知识竞技场。',
    'button.start': '开始学习',
    'host.alt_text': 'Prize2Pride 主持人头像',
    'host.default_message': '欢迎来到 Prize2Pride 知识竞技场。我今天能为您提供什么帮助？',
    'chat.arena_title': '聊天竞技场',
    'chat.host_title': '自主主持人',
    'chat.conversation_title': '对话',
    'chat.input_placeholder': '用西班牙语或英语输入您的消息...',
    'chat.host_typing': '主持人正在思考...',
    'chat.error_message': '发生了一个错误。请再试一次。',
  },
  ru: {
    'app.title': 'Prize2Pride Платформа Испанского Языка',
    'nav.home': 'Главная',
    'nav.lessons': 'Уроки',
    'nav.profile': 'Профиль',
    'nav.login': 'Войти',
    'welcome.message': 'Добро пожаловать на Арену Знаний Prize2Pride.',
    'button.start': 'Начать Обучение',
    'host.alt_text': 'Аватар Ведущего Prize2Pride',
    'host.default_message': 'Добро пожаловать на Арену Знаний Prize2Pride. Чем я могу вам помочь сегодня?',
    'chat.arena_title': 'Чат-Арена',
    'chat.host_title': 'Автономный Ведущий',
    'chat.conversation_title': 'Разговор',
    'chat.input_placeholder': 'Введите ваше сообщение на испанском или английском...',
    'chat.host_typing': 'Ведущий думает...',
    'chat.error_message': 'Произошла ошибка. Пожалуйста, попробуйте снова.',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use 'en' as default, or try to load from user settings/local storage later
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = useMemo(() => {
    return (key: string): string => {
      const translations = uiTranslations[language] || uiTranslations['en'];
      return translations[key] || key; // Fallback to key if translation is missing
    };
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
