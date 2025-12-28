/**
 * Prize2Pride Lingua Spanish Platform
 * Pricing Page - Subscription Plans Display
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Gem, Star, Award, MessageCircle, Sparkles } from 'lucide-react';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '@/const/subscriptionPlans';
import { useLanguage } from '@/contexts/LanguageContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AnimatedAvatarShowcase } from '@/components/AnimatedAvatarShowcase';

const iconMap: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-8 h-8" />,
  Award: <Award className="w-8 h-8" />,
  Star: <Star className="w-8 h-8" />,
  Crown: <Crown className="w-8 h-8" />,
  Gem: <Gem className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />
};

interface PricingCardProps {
  plan: SubscriptionPlan;
  isPopular?: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isPopular, onSelect }) => {
  const { t } = useLanguage();
  
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isPopular ? 'border-2 border-yellow-500 shadow-yellow-500/20' : 'border border-border'
      }`}
      style={{
        background: `linear-gradient(135deg, ${plan.color}15, transparent)`
      }}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      
      <CardHeader className="text-center pb-2">
        <div 
          className="mx-auto mb-4 p-4 rounded-full w-fit"
          style={{ backgroundColor: `${plan.color}30` }}
        >
          <div style={{ color: plan.color }}>
            {iconMap[plan.icon]}
          </div>
        </div>
        
        <Badge variant="outline" className="mb-2 text-lg">
          {plan.badge}
        </Badge>
        
        <CardTitle className="text-2xl font-bold">
          {plan.name}
        </CardTitle>
        
        <CardDescription>
          <span className="text-4xl font-bold text-foreground">
            ${plan.price}
          </span>
          {plan.price > 0 && (
            <span className="text-muted-foreground">/month</span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Avatar Preview */}
        {plan.avatarTier !== 'none' && (
          <div className="bg-card/50 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-2 text-center">
              Animated Avatar Tutor
            </p>
            <div className="h-24 flex items-center justify-center">
              <AnimatedAvatarShowcase tier={plan.avatarTier} size="small" />
            </div>
          </div>
        )}
        
        {/* Features List */}
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Modes Access */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Language Modes:</p>
          <div className="flex flex-wrap gap-1">
            {plan.modesAccess.map((mode) => (
              <Badge 
                key={mode} 
                variant="secondary" 
                className="text-xs capitalize"
              >
                {mode}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Lessons Access */}
        <div className="text-center pt-2">
          <span className="text-2xl font-bold" style={{ color: plan.color }}>
            {plan.lessonsAccess.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground"> lessons</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full font-bold ${
            plan.price === 0 
              ? 'bg-gray-600 hover:bg-gray-700' 
              : `bg-gradient-to-r ${plan.gradient} hover:opacity-90`
          }`}
          onClick={() => onSelect(plan)}
        >
          {plan.price === 0 ? 'Start Free' : `Subscribe - $${plan.price}/mo`}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    // TODO: Integrate with payment system
    console.log('Selected plan:', plan);
  };
  
  return (
    <DashboardLayout>
      <div className="min-h-screen py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Prize2Pride Subscription Plans
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your path to Spanish mastery with animated avatar tutors
          </p>
          
          {/* Animated Avatar Banner */}
          <div className="mt-8 max-w-4xl mx-auto">
            <AnimatedAvatarShowcase tier="exclusive" size="large" showAll />
          </div>
        </div>
        
        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isPopular={plan.id === 'gold'}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
        
        {/* Features Comparison */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Compare All Features
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4">Feature</th>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <th key={plan.id} className="text-center p-4">
                      <span className="text-lg">{plan.badge}</span>
                      <br />
                      <span className="text-sm">{plan.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Animated Avatar</td>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center p-4">
                      {plan.avatarTier === 'none' ? '❌' : '✅'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Lessons Access</td>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center p-4">
                      {plan.lessonsAccess.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Chat Limit</td>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center p-4">
                      {plan.chatLimit === 'unlimited' ? '∞' : plan.chatLimit}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Slang Mode</td>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center p-4">
                      {plan.modesAccess.includes('slang') ? '✅' : '❌'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Adult/Dirty Mode</td>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center p-4">
                      {plan.modesAccess.includes('dirty') ? '✅' : '❌'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Expert Mode</td>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center p-4">
                      {plan.modesAccess.includes('expert') ? '✅' : '❌'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Support Level</td>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <td key={plan.id} className="text-center p-4 capitalize">
                      {plan.supportLevel}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-2xl p-8 border border-yellow-500/30">
            <h3 className="text-2xl font-bold mb-2">💰 30-Day Money Back Guarantee</h3>
            <p className="text-muted-foreground">
              Try any plan risk-free. If you're not satisfied, get a full refund within 30 days.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pricing;
