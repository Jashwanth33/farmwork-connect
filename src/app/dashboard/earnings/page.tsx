'use client';

import { useState } from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, Calendar, Download,
  CreditCard, ArrowUpRight, ArrowDownRight, Wallet, Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

const DEMO_EARNINGS = {
  totalEarnings: 45680,
  pendingPayout: 8500,
  thisMonth: 12400,
  lastMonth: 11200,
  weeklyEarnings: [2100, 3400, 2800, 4100],
  transactions: [
    { id: '1', type: 'EARNING', amount: 2500, description: 'Land Ploughing - Ramesh Kumar', date: 'Mar 18, 2024' },
    { id: '2', type: 'EARNING', amount: 1800, description: 'Pesticide Spraying - Venkat Rao', date: 'Mar 17, 2024' },
    { id: '3', type: 'PAYOUT', amount: -5000, description: 'Payout to Bank', date: 'Mar 15, 2024' },
    { id: '4', type: 'EARNING', amount: 3200, description: 'Rice Harvesting - Lakshmi Devi', date: 'Mar 14, 2024' },
    { id: '5', type: 'COMMISSION', amount: -250, description: 'Platform Commission', date: 'Mar 14, 2024' },
  ],
  serviceBreakdown: [
    { service: 'Land Ploughing', count: 15, amount: 37500 },
    { service: 'Pesticide Spraying', count: 8, amount: 12800 },
    { service: 'Levelling', count: 5, amount: 10000 },
  ],
};

export default function EarningsPage() {
  const [earnings] = useState(DEMO_EARNINGS);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const handleRequestPayout = async () => {
    try {
      toast.success('Payout request submitted successfully!');
      setShowPayoutModal(false);
    } catch {
      toast.error('Failed to request payout');
    }
  };

  const monthOverMonth = ((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth * 100).toFixed(1);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600">Track your income and payouts</p>
        </div>
        <button
          onClick={() => setShowPayoutModal(true)}
          className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <Wallet className="w-5 h-5" />
          Request Payout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">₹{earnings.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Payout</p>
              <p className="text-2xl font-bold text-gray-900">₹{earnings.pendingPayout.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900">₹{earnings.thisMonth.toLocaleString()}</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />+{monthOverMonth}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Month</p>
              <p className="text-2xl font-bold text-gray-900">₹{earnings.lastMonth.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Weekly Earnings</h2>
        </div>
        <div className="flex items-end justify-between h-40 gap-4">
          {earnings.weeklyEarnings.map((amount, i) => {
            const maxAmount = Math.max(...earnings.weeklyEarnings);
            const height = (amount / maxAmount) * 100;
            const weeks = ['Week 1', 'Week 2', 'Week 3', 'This Week'];
            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-lg relative" style={{ height: '140px' }}>
                  <div
                    className="absolute bottom-0 w-full gradient-bg rounded-lg transition-all"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">₹{amount.toLocaleString()}</p>
                <p className="text-xs text-gray-400">{weeks[i]}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Earnings by Service</h2>
        <div className="space-y-3">
          {earnings.serviceBreakdown.map((service, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{service.service}</p>
                  <p className="text-sm text-gray-500">{service.count} jobs</p>
                </div>
              </div>
              <p className="font-bold text-primary-600">₹{service.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <button className="flex items-center gap-2 text-primary-600 text-sm font-medium hover:underline">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {earnings.transactions.map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tx.type === 'EARNING' ? 'bg-green-100 text-green-600' :
                  tx.type === 'PAYOUT' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {tx.type === 'EARNING' ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : tx.type === 'PAYOUT' ? (
                    <CreditCard className="w-5 h-5" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{tx.description}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>
              <p className={`font-bold ${
                tx.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Request Payout</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Available for payout</p>
                <p className="text-2xl font-bold text-gray-900">₹{earnings.pendingPayout.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  defaultValue={earnings.pendingPayout}
                  max={earnings.pendingPayout}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payout Method</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Wallet</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPayoutModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestPayout}
                className="flex-1 py-3 gradient-bg text-white rounded-xl font-semibold hover:opacity-90"
              >
                Request Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
