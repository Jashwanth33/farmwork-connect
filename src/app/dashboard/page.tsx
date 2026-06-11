'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Tractor, Sprout, Truck, Users, Calendar, Plus,
  TrendingUp, Clock, Star, ArrowRight, MapPin, ChevronRight
} from 'lucide-react';

const DEMO_USER = {
  name: 'Ramesh Kumar',
  role: 'FARMER',
};

const STATS = [
  { label: 'Active Bookings', value: '3', icon: Calendar, color: 'bg-blue-500' },
  { label: 'Completed', value: '24', icon: TrendingUp, color: 'bg-green-500' },
  { label: 'Total Spend', value: '₹45,600', icon: Tractor, color: 'bg-purple-500' },
  { label: 'Rating', value: '4.8', icon: Star, color: 'bg-yellow-500' },
];

const RECENT_BOOKINGS = [
  {
    id: '1',
    service: 'Land Ploughing',
    provider: 'Krishna Farms',
    date: 'Today, 9:00 AM',
    status: 'IN_PROGRESS',
    amount: '₹2,500',
  },
  {
    id: '2',
    service: 'Pesticide Spraying',
    provider: 'Green Spray Team',
    date: 'Tomorrow, 7:00 AM',
    status: 'ACCEPTED',
    amount: '₹1,800',
  },
  {
    id: '3',
    service: 'Rice Harvesting',
    provider: 'Happy Harvesters',
    date: 'Mar 20, 2024',
    status: 'COMPLETED',
    amount: '₹4,000',
  },
];

const QUICK_SERVICES = [
  { icon: Tractor, label: 'Land Preparation', count: 12, color: 'from-amber-500 to-amber-600' },
  { icon: Sprout, label: 'Sowing & Planting', count: 8, color: 'from-green-500 to-green-600' },
  { icon: Users, label: 'Crop Maintenance', count: 15, color: 'from-blue-500 to-blue-600' },
  { icon: Truck, label: 'Transport', count: 6, color: 'from-purple-500 to-purple-600' },
];

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  ACCEPTED: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-orange-100 text-orange-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function FarmerDashboard() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {DEMO_USER.name}!</h1>
            <p className="text-primary-100 mt-1">
              Find workers and equipment for your farm
            </p>
          </div>
          <Link
            href="/dashboard/search"
            className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Book Service
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Quick Book</h2>
          <Link href="/dashboard/search" className="text-primary-600 text-sm font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_SERVICES.map((service, i) => (
            <Link
              key={i}
              href={`/dashboard/search?category=${service.label.toUpperCase().replace(' ', '_')}`}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-gray-900">{service.label}</h3>
              <p className="text-sm text-gray-500">{service.count} providers nearby</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          <Link href="/dashboard/bookings" className="text-primary-600 text-sm font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {RECENT_BOOKINGS.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Tractor className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.service}</h3>
                    <p className="text-sm text-gray-500">{booking.provider}</p>
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {booking.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{booking.amount}</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[booking.status]}`}>
                    {booking.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Your Farm Location</p>
              <p className="text-sm text-gray-500">Thiruvallur, Tamil Nadu</p>
            </div>
          </div>
          <button className="text-primary-600 text-sm font-medium">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
