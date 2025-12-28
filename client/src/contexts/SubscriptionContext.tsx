/**
 * Prize2Pride Lingua Spanish Platform
 * Subscription Context - User Subscription State Management
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 */

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  SUBSCRIPTION_PLANS, 
  SubscriptionPlan, 
  getPlanById, 
  getAvatarConfig,
  canAccessMode,
  canAccessLesson
} from '@/const/subscriptionPlans';
import { LANGUAGE_MODES, getModesForTier } from '@/const/languageModes';

export type SubscriptionTier = 'freemium' | 'bronze' | 'silver' | 'gold' | 'diamond' | 'vip_millionaire';

export interface UserSubscription {
  tier: SubscriptionTier;
  plan: SubscriptionPlan;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
  autoRenew: boolean;
  paymentMethod?: string;
}

export interface SubscriptionContextType {
  subscription: UserSubscription;
  setSubscription: (tier: SubscriptionTier) => void;
  upgradeTo: (tier: SubscriptionTier) => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  canAccessMode: (modeId: string) => boolean;
  canAccessLesson: (lessonNumber: number) => boolean;
  getAvatarConfig: () => ReturnType<typeof getAvatarConfig>;
  getAccessibleModes: () => typeof LANGUAGE_MODES;
  isFeatureAvailable: (feature: string) => boolean;
  getRemainingChats: () => number | 'unlimited';
  incrementChatCount: () => void;
}

const defaultSubscription: UserSubscription = {
  tier: 'freemium',
  plan: SUBSCRIPTION_PLANS[0],
  startDate: null,
  endDate: null,
  isActive: true,
  autoRenew: false
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscription, setSubscriptionState] = useState<UserSubscription>(defaultSubscription);
  const [chatCount, setChatCount] = useState(0);

  // Load subscription from localStorage on mount
  useEffect(() => {
    const savedSubscription = localStorage.getItem('prize2pride_subscription');
    if (savedSubscription) {
      try {
        const parsed = JSON.parse(savedSubscription);
        const plan = getPlanById(parsed.tier);
        if (plan) {
          setSubscriptionState({
            ...parsed,
            plan,
            startDate: parsed.startDate ? new Date(parsed.startDate) : null,
            endDate: parsed.endDate ? new Date(parsed.endDate) : null
          });
        }
      } catch (e) {
        console.error('Failed to parse saved subscription:', e);
      }
    }

    // Load chat count
    const savedChatCount = localStorage.getItem('prize2pride_chat_count');
    if (savedChatCount) {
      setChatCount(parseInt(savedChatCount, 10));
    }
  }, []);

  // Save subscription to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('prize2pride_subscription', JSON.stringify({
      tier: subscription.tier,
      startDate: subscription.startDate?.toISOString(),
      endDate: subscription.endDate?.toISOString(),
      isActive: subscription.isActive,
      autoRenew: subscription.autoRenew,
      paymentMethod: subscription.paymentMethod
    }));
  }, [subscription]);

  // Save chat count
  useEffect(() => {
    localStorage.setItem('prize2pride_chat_count', chatCount.toString());
  }, [chatCount]);

  // Reset chat count daily
  useEffect(() => {
    const lastReset = localStorage.getItem('prize2pride_chat_reset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      setChatCount(0);
      localStorage.setItem('prize2pride_chat_reset', today);
    }
  }, []);

  const setSubscription = (tier: SubscriptionTier) => {
    const plan = getPlanById(tier);
    if (plan) {
      const now = new Date();
      const endDate = new Date(now);
      endDate.setMonth(endDate.getMonth() + 1);

      setSubscriptionState({
        tier,
        plan,
        startDate: now,
        endDate: tier === 'freemium' ? null : endDate,
        isActive: true,
        autoRenew: tier !== 'freemium'
      });
    }
  };

  const upgradeTo = async (tier: SubscriptionTier): Promise<boolean> => {
    // TODO: Integrate with payment processor (Stripe, etc.)
    // For now, simulate successful upgrade
    return new Promise((resolve) => {
      setTimeout(() => {
        setSubscription(tier);
        resolve(true);
      }, 1000);
    });
  };

  const cancelSubscription = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setSubscription('freemium');
        resolve(true);
      }, 500);
    });
  };

  const checkModeAccess = (modeId: string): boolean => {
    return canAccessMode(subscription.tier, modeId);
  };

  const checkLessonAccess = (lessonNumber: number): boolean => {
    return canAccessLesson(subscription.tier, lessonNumber);
  };

  const getAvatarConfigForUser = () => {
    return getAvatarConfig(subscription.tier);
  };

  const getAccessibleModes = () => {
    return getModesForTier(subscription.tier);
  };

  const isFeatureAvailable = (feature: string): boolean => {
    const featureMap: Record<string, SubscriptionTier[]> = {
      'animated_avatar': ['bronze', 'silver', 'gold', 'diamond', 'vip_millionaire'],
      'offline_download': ['silver', 'gold', 'diamond', 'vip_millionaire'],
      'pronunciation': ['silver', 'gold', 'diamond', 'vip_millionaire'],
      'live_tutoring': ['diamond', 'vip_millionaire'],
      'family_account': ['diamond', 'vip_millionaire'],
      'certificate': ['gold', 'diamond', 'vip_millionaire'],
      'custom_path': ['gold', 'diamond', 'vip_millionaire'],
      'business_spanish': ['diamond', 'vip_millionaire'],
      'native_partners': ['vip_millionaire'],
      'concierge': ['vip_millionaire']
    };

    const allowedTiers = featureMap[feature];
    if (!allowedTiers) return true; // Feature not restricted
    return allowedTiers.includes(subscription.tier);
  };

  const getRemainingChats = (): number | 'unlimited' => {
    const limit = subscription.plan.chatLimit;
    if (limit === 'unlimited') return 'unlimited';
    return Math.max(0, limit - chatCount);
  };

  const incrementChatCount = () => {
    setChatCount(prev => prev + 1);
  };

  const value = useMemo(() => ({
    subscription,
    setSubscription,
    upgradeTo,
    cancelSubscription,
    canAccessMode: checkModeAccess,
    canAccessLesson: checkLessonAccess,
    getAvatarConfig: getAvatarConfigForUser,
    getAccessibleModes,
    isFeatureAvailable,
    getRemainingChats,
    incrementChatCount
  }), [subscription, chatCount]);

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export default SubscriptionContext;
