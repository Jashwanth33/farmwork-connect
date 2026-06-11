'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar, Tractor, Clock, MapPin, Star, ChevronRight,
  Filter, Search, Phone, MessageCircle
} from 'lucide-react';

const BOOKINGS = [
  {
    id: '1',
    bookingNumber: 'FWC-ABC123-XY',
    service: 'Land Ploughing',
    provider: { name: 'Krishna Farms', phone: '9876543210', avatar: null },
    cropType: 'RICE',
    farmSize: 5,
    scheduledDate: '2024-03-18',
    scheduledTime: '9:00 AM',
    status: 'IN_PROGRESS',
    amount: 2500,
    farmAddress: 'Village Thuraipakkam, Thiruvallur',
    progress: 60,
  },
  {
    id: '2',
    bookingNumber: 'FWC-DEF456-ZW',
    service: 'Pesticide Spraying',
    provider: { name: 'Green Spray Team', phone: '9876543211', avatar: null },
    cropType: 'RICE',
    farmSize: 3,
    scheduledDate: '2024-03-19',
    scheduledTime: '7:00 AM',
    status: 'ACCEPTED',
    amount: 1200,
    farmAddress: 'Village Thuraipakkam, Thiruvallur',
    progress: 0,
  },
  {
    id: '3',
    bookingNumber: 'FWC-GHI789-UV',
    service: 'Rice Harvesting',
    provider: { name: 'Happy Harvesters', phone: '9876543212', avatar: null },
    cropType: 'RICE',
    farmSize: 5,
    scheduledDate: '2024-03-15',
    scheduledTime: '6:00 AM',
    status: 'COMPLETED',
    amount: 4000,
    farmAddress: 'Village Thuraipakkam, Thiruvallur',
    progress: 100,
  },
  {
    id: '4',
    bookingNumber: 'FWC-JKL012-RS',
    service: 'Crop Transport',
    provider: { name: 'Ravi Transport', phone: '9876543213', avatar: null },
    cropType: 'RICE',
    farmSize: 5,
    scheduledDate: '2024-03-16',
    scheduledTime: '2:00 PM',
    status: 'COMPLETED',
    amount: 1500,
    farmAddress: 'Village Thuraipakkam to Koyambedu Market',
    progress: 100,
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  PENDING: { label: 'Pending', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  ACCEPTED: { label: 'Accepted', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  IN_PROGRESS: { label: 'In Progress', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  COMPLETED: { label: 'Completed', color: 'text-green-700', bgColor: 'bg-green-100' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100' },
};

type TabType = 'all' | 'active' | 'completed';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = BOOKINGS.filter((booking) => {
    const matchesSearch = booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && ['PENDING', 'ACCEPTED', 'IN_PROGRESS'].includes(booking.status);
    if (activeTab === 'completed') return matchesSearch && ['COMPLETED', 'CANCELLED'].includes(booking.status);
    return matchesSearch;
  });

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600">{BOOKINGS.length} total bookings</p>
        </div>
        <Link
          href="/dashboard/search"
          className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          New Booking
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {[
          { key: 'all', label: 'All', count: BOOKINGS.length },
          { key: 'active', label: 'Active', count: BOOKINGS.filter(b => ['PENDING', 'ACCEPTED', 'IN_PROGRESS'].includes(b.status)).length },
          { key: 'completed', label: 'Completed', count: BOOKINGS.filter(b => ['COMPLETED', 'CANCELLED'].includes(b.status)).length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabType)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === tab.key
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by service or booking ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Booking Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500 font-mono">{booking.bookingNumber}</p>
                  <h3 className="font-semibold text-gray-900 mt-1">{booking.service}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_CONFIG[booking.status].bgColor} ${STATUS_CONFIG[booking.status].color}`}>
                  {STATUS_CONFIG[booking.status].label}
                </span>
              </div>

              {/* Provider Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-semibold">
                  {booking.provider.name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{booking.provider.name}</p>
                  <p className="text-sm text-gray-500">{booking.farmSize} acres • {booking.cropType}</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200 transition">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  {new Date(booking.scheduledDate).toLocaleDateString('en-IN', {
                    weekday: 'short', month: 'short', day: 'numeric'
                  })}
                </span>
                <Clock className="w-5 h-5 text-gray-400 ml-4" />
                <span className="text-gray-600">{booking.scheduledTime}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 truncate flex-1">{booking.farmAddress}</span>
              </div>

              {/* Progress Bar for Active Bookings */}
              {booking.status === 'IN_PROGRESS' && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-primary-600">{booking.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-bg transition-all"
                      style={{ width: `${booking.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">₹{booking.amount.toLocaleString()}</p>
              </div>
              <Link
                href={`/dashboard/bookings/${booking.id}`}
                className="flex items-center gap-2 text-primary-600 font-medium hover:underline"
              >
                View Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try a different search term' : 'Book your first service'}
            </p>
            <Link
              href="/dashboard/search"
              className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold inline-block hover:opacity-90 transition"
            >
              Find Services
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
