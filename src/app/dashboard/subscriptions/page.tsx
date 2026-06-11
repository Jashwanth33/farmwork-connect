'use client';

import { useState } from 'react';
import {
  Crown, Check, Star, Zap, Shield, Clock, X
} from 'lucide-react';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Up to 10 bookings/month',
      'Basic profile',
      'Standard support',
      'Standard visibility',
    ],
    limitations: [
      'No priority listing',
      'Basic analytics',
      'No featured badges',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    period: 'month',
    description: 'Best for growing providers',
    popular: true,
    features: [
      'Unlimited bookings',
      'Verified badge',
      'Priority support',
      'Top search ranking',
      'Advanced analytics',
      'Featured listings',
      'SMS notifications',
    ],
    limitations: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 2499,
    period: 'month',
    description: 'For large operations',
    features: [
      'Everything in Premium',
      'Multiple staff accounts',
      'Custom branding',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'Bulk booking management',
    ],
    limitations: [],
  },
];

export default function SubscriptionsPage() {
  const [currentPlan, setCurrentPlan] = useState('basic');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUpgrade = () => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan);
      setShowUpgradeModal(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
        <p className="text-gray-600">Choose the right plan for your business</p>
      </div>

      {/* Current Plan Badge */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 mb-1">Current Plan</p>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {PLANS.find(p => p.id === currentPlan)?.name}
              {currentPlan !== 'basic' && (
                <Crown className="w-6 h-6 text-yellow-400" />
              )}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-primary-100">Next billing</p>
            <p className="font-semibold">March 25, 2024</p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-2xl shadow-sm border-2 transition relative ${
              plan.popular ? 'border-primary-500' : 'border-gray-100'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 mt-1">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-gray-500">/{plan.period}</span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-center gap-3 opacity-50">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-gray-500">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  if (plan.id !== currentPlan) {
                    setSelectedPlan(plan.id);
                    setShowUpgradeModal(true);
                  }
                }}
                disabled={plan.id === currentPlan}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  plan.id === currentPlan
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : plan.popular
                    ? 'gradient-bg text-white hover:opacity-90'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.id === currentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Plan Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Feature</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Basic</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 bg-primary-50">Premium</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Monthly Bookings', '10', 'Unlimited', 'Unlimited'],
                ['Profile Verification', '✕', '✓', '✓'],
                ['Search Ranking', 'Standard', 'Top Priority', 'Top Priority'],
                ['Featured Listings', '✕', '✓', '✓'],
                ['Analytics Dashboard', 'Basic', 'Advanced', 'Advanced'],
                ['SMS Notifications', '✕', '✓', '✓'],
                ['Staff Accounts', '1', '1', '5'],
                ['API Access', '✕', '✕', '✓'],
                ['Support', 'Email', 'Priority', 'Dedicated'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-3 px-4 text-gray-700">{row[0]}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{row[1]}</td>
                  <td className="py-3 px-4 text-center bg-primary-50">
                    <span className={row[2] === '✓' ? 'text-green-600' : row[2] === '✕' ? 'text-gray-300' : 'text-gray-700'}>
                      {row[2]}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Upgrade to {PLANS.find(p => p.id === selectedPlan)?.name}
              </h2>
              <p className="text-gray-500 mt-2">
                Get access to premium features
              </p>
            </div>

            <div className="p-4 bg-primary-50 rounded-xl mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Plan Price</span>
                <span className="font-bold text-primary-700">
                  ₹{PLANS.find(p => p.id === selectedPlan)?.price}/{PLANS.find(p => p.id === selectedPlan)?.period}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Billing Cycle</span>
                <span className="text-gray-700">Monthly</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpgrade}
                className="flex-1 py-3 gradient-bg text-white rounded-xl font-semibold hover:opacity-90"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
