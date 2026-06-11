'use client';

import Link from 'next/link';
import {
  Users, Tractor, Calendar, DollarSign, TrendingUp,
  AlertTriangle, ArrowUpRight, ArrowDownRight, Shield, Clock
} from 'lucide-react';

const STATS = [
  {
    label: 'Total Users',
    value: '12,458',
    change: '+12%',
    positive: true,
    icon: Users,
    color: 'bg-blue-500',
    href: '/admin/users',
  },
  {
    label: 'Active Providers',
    value: '3,247',
    change: '+8%',
    positive: true,
    icon: Tractor,
    color: 'bg-green-500',
    href: '/admin/providers',
  },
  {
    label: 'Total Bookings',
    value: '8,924',
    change: '+15%',
    positive: true,
    icon: Calendar,
    color: 'bg-purple-500',
    href: '/admin/bookings',
  },
  {
    label: 'Revenue',
    value: '₹24.5L',
    change: '+22%',
    positive: true,
    icon: DollarSign,
    color: 'bg-yellow-500',
    href: '/admin/payments',
  },
];

const RECENT_BOOKINGS = [
  {
    id: 'B001',
    service: 'Land Ploughing',
    farmer: 'Ramesh Kumar',
    provider: 'Krishna Farms',
    amount: 2500,
    status: 'COMPLETED',
    date: '2 hours ago',
  },
  {
    id: 'B002',
    service: 'Rice Harvesting',
    farmer: 'Venkat Rao',
    provider: 'Happy Harvesters',
    amount: 4000,
    status: 'IN_PROGRESS',
    date: '4 hours ago',
  },
  {
    id: 'B003',
    service: 'Crop Transport',
    farmer: 'Lakshmi Devi',
    provider: 'Ravi Transport',
    amount: 1500,
    status: 'PENDING',
    date: '6 hours ago',
  },
  {
    id: 'B004',
    service: 'Pesticide Spraying',
    farmer: 'Suresh P',
    provider: 'Green Spray Team',
    amount: 1200,
    status: 'DISPUTED',
    date: '8 hours ago',
  },
];

const TOP_PROVIDERS = [
  { name: 'Krishna Farms', service: 'Land Preparation', rating: 4.9, jobs: 456, earnings: '₹2.3L' },
  { name: 'Happy Harvesters', service: 'Harvesting', rating: 4.8, jobs: 312, earnings: '₹1.8L' },
  { name: 'Green Spray Team', service: 'Spraying', rating: 4.7, jobs: 289, earnings: '₹1.2L' },
  { name: 'Ravi Transport', service: 'Transport', rating: 4.6, jobs: 198, earnings: '₹95K' },
];

const DISPUTES = [
  { id: 'D001', booking: 'B004', farmer: 'Suresh P', provider: 'Green Spray Team', issue: 'Service quality', status: 'OPEN' },
  { id: 'D002', booking: 'B089', farmer: 'Muthu K', provider: 'Balaji Agri', issue: 'Payment dispute', status: 'UNDER_REVIEW' },
];

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  DISPUTED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-700',
};

export default function AdminDashboard() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of FarmWork Connect platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.positive ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-4">{stat.value}</p>
            <p className="text-gray-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-primary-600 text-sm font-medium hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {RECENT_BOOKINGS.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{booking.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.farmer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.provider}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{booking.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[booking.status]}`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disputes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Active Disputes</h2>
            <Link href="/admin/disputes" className="text-primary-600 text-sm font-medium hover:underline">
              View All
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {DISPUTES.map((dispute) => (
              <div key={dispute.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-sm text-gray-500">{dispute.booking}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    dispute.status === 'OPEN' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {dispute.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="font-medium text-gray-900">{dispute.issue}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {dispute.farmer} vs {dispute.provider}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Providers */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Top Rated Providers</h2>
          <Link href="/admin/providers" className="text-primary-600 text-sm font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {TOP_PROVIDERS.map((provider, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                  {provider.name[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{provider.name}</p>
                  <p className="text-xs text-gray-500">{provider.service}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-yellow-500">
                  <Shield className="w-4 h-4 fill-current" />
                  {provider.rating}
                </span>
                <span className="text-gray-500">{provider.jobs} jobs</span>
                <span className="font-medium text-green-600">{provider.earnings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:shadow-md transition">
          <Shield className="w-8 h-8 text-primary-600 mb-2" />
          <p className="font-medium text-gray-900">Verify Users</p>
          <p className="text-sm text-gray-500">12 pending</p>
        </button>
        <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:shadow-md transition">
          <Clock className="w-8 h-8 text-orange-600 mb-2" />
          <p className="font-medium text-gray-900">Pending Payouts</p>
          <p className="text-sm text-gray-500">₹45,600</p>
        </button>
        <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:shadow-md transition">
          <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
          <p className="font-medium text-gray-900">Flagged Content</p>
          <p className="text-sm text-gray-500">3 items</p>
        </button>
        <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:shadow-md transition">
          <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
          <p className="font-medium text-gray-900">Growth Report</p>
          <p className="text-sm text-gray-500">View insights</p>
        </button>
      </div>
    </div>
  );
}
