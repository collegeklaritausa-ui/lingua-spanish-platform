/**
 * Prize2Pride Lingua Spanish Platform
 * Subscription Plans & Pricing System
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Tier Structure:
 * - Freemium: Free chat with basic features
 * - Bronze ($10): Animated avatar tutoring
 * - Silver ($20): Enhanced avatar + more lessons
 * - Gold ($50): Premium avatar + all modes
 * - Diamond ($100): High-quality avatar + priority support
 * - VIP Millionaire ($500): Exclusive luxury avatar + all features
 */

export interface SubscriptionPlan {
  id: string;
  name: string;
  nameKey: string;
  price: number;
  currency: string;
  features: string[];
  featuresKeys: string[];
  avatarTier: 'none' | 'basic' | 'enhanced' | 'premium' | 'high_quality' | 'exclusive';
  lessonsAccess: number;
  modesAccess: ('formal' | 'informal' | 'slang' | 'dirty' | 'expert')[];
  chatLimit: number | 'unlimited';
  supportLevel: 'community' | 'email' | 'priority' | 'vip' | 'dedicated';
  badge: string;
  color: string;
  gradient: string;
  icon: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    nameKey: 'subscription.freemium',
    price: 0,
    currency: 'USD',
    features: [
      'Basic chat with AI tutor',
      'Access to 1,000 lessons',
      'Formal mode only',
      'Community support',
      'No animated avatar'
    ],
    featuresKeys: [
      'subscription.freemium.feature1',
      'subscription.freemium.feature2',
      'subscription.freemium.feature3',
      'subscription.freemium.feature4',
      'subscription.freemium.feature5'
    ],
    avatarTier: 'none',
    lessonsAccess: 1000,
    modesAccess: ['formal'],
    chatLimit: 50,
    supportLevel: 'community',
    badge: '🆓',
    color: '#6B7280',
    gradient: 'from-gray-500 to-gray-700',
    icon: 'MessageCircle'
  },
  {
    id: 'bronze',
    name: 'Pro Bronze',
    nameKey: 'subscription.bronze',
    price: 10,
    currency: 'USD',
    features: [
      'Animated avatar tutor (Basic)',
      'Access to 10,000 lessons',
      'Formal + Informal modes',
      'Email support',
      'Progress tracking',
      'Vocabulary builder'
    ],
    featuresKeys: [
      'subscription.bronze.feature1',
      'subscription.bronze.feature2',
      'subscription.bronze.feature3',
      'subscription.bronze.feature4',
      'subscription.bronze.feature5',
      'subscription.bronze.feature6'
    ],
    avatarTier: 'basic',
    lessonsAccess: 10000,
    modesAccess: ['formal', 'informal'],
    chatLimit: 200,
    supportLevel: 'email',
    badge: '🥉',
    color: '#CD7F32',
    gradient: 'from-amber-600 to-amber-800',
    icon: 'Award'
  },
  {
    id: 'silver',
    name: 'Pro Silver',
    nameKey: 'subscription.silver',
    price: 20,
    currency: 'USD',
    features: [
      'Animated avatar tutor (Enhanced)',
      'Access to 25,000 lessons',
      'Formal + Informal + Slang modes',
      'Priority email support',
      'Advanced progress analytics',
      'Pronunciation practice',
      'Offline lessons download'
    ],
    featuresKeys: [
      'subscription.silver.feature1',
      'subscription.silver.feature2',
      'subscription.silver.feature3',
      'subscription.silver.feature4',
      'subscription.silver.feature5',
      'subscription.silver.feature6',
      'subscription.silver.feature7'
    ],
    avatarTier: 'enhanced',
    lessonsAccess: 25000,
    modesAccess: ['formal', 'informal', 'slang'],
    chatLimit: 500,
    supportLevel: 'priority',
    badge: '🥈',
    color: '#C0C0C0',
    gradient: 'from-gray-300 to-gray-500',
    icon: 'Star'
  },
  {
    id: 'gold',
    name: 'Pro Gold',
    nameKey: 'subscription.gold',
    price: 50,
    currency: 'USD',
    features: [
      'Animated avatar tutor (Premium)',
      'Access to 50,000 lessons',
      'All language modes including Dirty',
      'VIP support',
      'Real-time conversation practice',
      'Cultural immersion content',
      'Certificate of completion',
      'Custom learning paths'
    ],
    featuresKeys: [
      'subscription.gold.feature1',
      'subscription.gold.feature2',
      'subscription.gold.feature3',
      'subscription.gold.feature4',
      'subscription.gold.feature5',
      'subscription.gold.feature6',
      'subscription.gold.feature7',
      'subscription.gold.feature8'
    ],
    avatarTier: 'premium',
    lessonsAccess: 50000,
    modesAccess: ['formal', 'informal', 'slang', 'dirty'],
    chatLimit: 'unlimited',
    supportLevel: 'vip',
    badge: '🥇',
    color: '#FFD700',
    gradient: 'from-yellow-400 to-yellow-600',
    icon: 'Crown'
  },
  {
    id: 'diamond',
    name: 'Pro Diamond',
    nameKey: 'subscription.diamond',
    price: 100,
    currency: 'USD',
    features: [
      'Animated avatar tutor (High Quality)',
      'Access to 75,000 lessons',
      'All modes + Expert level',
      'Dedicated support agent',
      'Live tutoring sessions',
      'Business Spanish module',
      'Legal & Medical Spanish',
      'Personalized curriculum',
      'Family account (3 users)'
    ],
    featuresKeys: [
      'subscription.diamond.feature1',
      'subscription.diamond.feature2',
      'subscription.diamond.feature3',
      'subscription.diamond.feature4',
      'subscription.diamond.feature5',
      'subscription.diamond.feature6',
      'subscription.diamond.feature7',
      'subscription.diamond.feature8',
      'subscription.diamond.feature9'
    ],
    avatarTier: 'high_quality',
    lessonsAccess: 75000,
    modesAccess: ['formal', 'informal', 'slang', 'dirty', 'expert'],
    chatLimit: 'unlimited',
    supportLevel: 'dedicated',
    badge: '💎',
    color: '#B9F2FF',
    gradient: 'from-cyan-300 to-blue-500',
    icon: 'Gem'
  },
  {
    id: 'vip_millionaire',
    name: 'VIP Millionaire',
    nameKey: 'subscription.vip_millionaire',
    price: 500,
    currency: 'USD',
    features: [
      'Exclusive luxury animated avatar',
      'Access to ALL 100,000 lessons',
      'All modes at mastery level',
      'Personal concierge support 24/7',
      'Private live tutoring (unlimited)',
      'All specialized modules',
      'Native speaker conversation partners',
      'Luxury learning experience',
      'Family account (10 users)',
      'Lifetime updates',
      'Early access to new features',
      'VIP community access'
    ],
    featuresKeys: [
      'subscription.vip.feature1',
      'subscription.vip.feature2',
      'subscription.vip.feature3',
      'subscription.vip.feature4',
      'subscription.vip.feature5',
      'subscription.vip.feature6',
      'subscription.vip.feature7',
      'subscription.vip.feature8',
      'subscription.vip.feature9',
      'subscription.vip.feature10',
      'subscription.vip.feature11',
      'subscription.vip.feature12'
    ],
    avatarTier: 'exclusive',
    lessonsAccess: 100000,
    modesAccess: ['formal', 'informal', 'slang', 'dirty', 'expert'],
    chatLimit: 'unlimited',
    supportLevel: 'dedicated',
    badge: '👑',
    color: '#8B5CF6',
    gradient: 'from-purple-500 via-pink-500 to-yellow-500',
    icon: 'Sparkles'
  }
];

// Avatar configurations per subscription tier
export const AVATAR_CONFIGS = {
  none: {
    images: [],
    animations: [],
    voices: []
  },
  basic: {
    images: [
      '/Prize2Pride_Posters/poster_006.png',
      '/Prize2Pride_Posters/poster_007.png'
    ],
    animations: ['idle', 'speaking'],
    voices: ['standard']
  },
  enhanced: {
    images: [
      '/Prize2Pride_Posters/poster_006.png',
      '/Prize2Pride_Posters/poster_007.png',
      '/Prize2Pride_Posters/poster_008.png',
      '/Prize2Pride_Posters/poster_009.png'
    ],
    animations: ['idle', 'speaking', 'listening', 'celebrating'],
    voices: ['standard', 'warm']
  },
  premium: {
    images: [
      '/Prize2Pride_Posters/poster_006.png',
      '/Prize2Pride_Posters/poster_007.png',
      '/Prize2Pride_Posters/poster_008.png',
      '/Prize2Pride_Posters/poster_009.png',
      '/Prize2Pride_Posters/poster_010.png',
      '/Prize2Pride_Posters/poster_011.png',
      '/Prize2Pride_Posters/poster_012.png',
      '/Prize2Pride_Posters/poster_013.png'
    ],
    animations: ['idle', 'speaking', 'listening', 'celebrating', 'thinking', 'encouraging'],
    voices: ['standard', 'warm', 'professional']
  },
  high_quality: {
    images: Array.from({ length: 25 }, (_, i) => `/Prize2Pride_Posters/poster_${String(i + 6).padStart(3, '0')}.png`),
    animations: ['idle', 'speaking', 'listening', 'celebrating', 'thinking', 'encouraging', 'excited', 'empathetic'],
    voices: ['standard', 'warm', 'professional', 'native_spain', 'native_mexico']
  },
  exclusive: {
    images: Array.from({ length: 50 }, (_, i) => `/Prize2Pride_Posters/poster_${String(i + 6).padStart(3, '0')}.png`),
    animations: ['idle', 'speaking', 'listening', 'celebrating', 'thinking', 'encouraging', 'excited', 'empathetic', 'luxury_intro', 'vip_welcome'],
    voices: ['standard', 'warm', 'professional', 'native_spain', 'native_mexico', 'native_argentina', 'native_colombia', 'celebrity']
  }
};

// Language modes configuration
export const LANGUAGE_MODES = {
  formal: {
    id: 'formal',
    name: 'Formal',
    nameKey: 'mode.formal',
    description: 'Professional and academic Spanish',
    descriptionKey: 'mode.formal.description',
    icon: '🎩',
    color: '#1E40AF',
    examples: ['Usted', 'Buenos días', 'Le agradezco'],
    minTier: 'freemium'
  },
  informal: {
    id: 'informal',
    name: 'Informal',
    nameKey: 'mode.informal',
    description: 'Casual everyday Spanish',
    descriptionKey: 'mode.informal.description',
    icon: '😊',
    color: '#059669',
    examples: ['Tú', 'Hola', 'Gracias'],
    minTier: 'bronze'
  },
  slang: {
    id: 'slang',
    name: 'Slang',
    nameKey: 'mode.slang',
    description: 'Street Spanish and regional expressions',
    descriptionKey: 'mode.slang.description',
    icon: '🔥',
    color: '#DC2626',
    examples: ['Tío', 'Mola', 'Guay'],
    minTier: 'silver'
  },
  dirty: {
    id: 'dirty',
    name: 'Adult/Dirty',
    nameKey: 'mode.dirty',
    description: 'Adult language and expressions (18+)',
    descriptionKey: 'mode.dirty.description',
    icon: '🔞',
    color: '#7C3AED',
    examples: ['[Mature content]'],
    minTier: 'gold',
    ageRestricted: true
  },
  expert: {
    id: 'expert',
    name: 'Expert',
    nameKey: 'mode.expert',
    description: 'Native-level mastery with nuances',
    descriptionKey: 'mode.expert.description',
    icon: '🎓',
    color: '#0891B2',
    examples: ['Dialectal variations', 'Literary expressions', 'Historical Spanish'],
    minTier: 'diamond'
  }
};

// Utility functions
export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(plan => plan.id === planId);
}

export function getPlanByPrice(price: number): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(plan => plan.price === price);
}

export function canAccessMode(userPlan: string, mode: string): boolean {
  const plan = getPlanById(userPlan);
  if (!plan) return false;
  return plan.modesAccess.includes(mode as any);
}

export function canAccessLesson(userPlan: string, lessonNumber: number): boolean {
  const plan = getPlanById(userPlan);
  if (!plan) return false;
  return lessonNumber <= plan.lessonsAccess;
}

export function getAvatarConfig(userPlan: string) {
  const plan = getPlanById(userPlan);
  if (!plan) return AVATAR_CONFIGS.none;
  return AVATAR_CONFIGS[plan.avatarTier];
}

export default SUBSCRIPTION_PLANS;
