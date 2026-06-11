'use client';

import { useState } from 'react';
import {
  Users, Building2, TrendingUp, Calendar, MapPin, Phone,
  Plus, ChevronRight, DollarSign, Tractor, AlertTriangle, CheckCircle
} from 'lucide-react';

const FPO_INFO = {
  name: 'Thiruvallur Farmers Producer Company',
  regNumber: 'FPO/TN/2023/001',
  members: 450,
  totalLand: 1250,
  location: 'Thiruvallur, Tamil Nadu',
  contact: '+91 98765 43210',
  activeBookings: 23,
  monthlyTransactions: 156,
};

const MEMBER_FARMERS = [
  { id: '1', name: 'Ramesh Kumar', phone: '9876543210', acres: 5, bookings: 12, pending: 1 },
  { id: '2', name: 'Venkat Rao', phone: '9876543211', acres: 8, bookings: 18, pending: 0 },
  { id: '3', name: 'Lakshmi Devi', phone: '9876543212', acres: 3, bookings: 8, pending: 2 },
  { id: '4', name: 'Muthu K', phone: '9876543213', acres: 12, bookings: 24, pending: 0 },
];

const AGGREGATE_BOOKINGS = [
  { id: 'B001', service: 'Bulk Rice Harvesting', farmerCount: 15, totalAcres: 45, amount: 36000, status: 'IN_PROGRESS' },
  { id: 'B002', service: 'Group Pesticide Spraying', farmerCount: 20, totalAcres: 60, amount: 24000, status: 'PENDING' },
  { id: 'B003', service: 'Collective Land Preparation', farmerCount: 25, totalAcres: 80, amount: 32000, status: 'COMPLETED' },
];

export default function FPOPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'bookings'>('overview');

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-6 h-6" />
              <h1 className="text-xl font-bold">{FPO_INFO.name}</h1>
            </div>
            <p className="text-primary-100 text-sm mb-4">Reg: {FPO_INFO.regNumber}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {FPO_INFO.location}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {FPO_INFO.contact}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary-100 text-sm">Total Members</p>
            <p className="text-3xl font-bold">{FPO_INFO.members}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Users className="w-8 h-8 text-primary-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{FPO_INFO.members}</p>
          <p className="text-sm text-gray-500">Member Farmers</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Tractor className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{FPO_INFO.totalLand}</p>
          <p className="text-sm text-gray-500">Total Acres</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Calendar className="w-8 h-8 text-amber-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{FPO_INFO.activeBookings}</p>
          <p className="text-sm text-gray-500">Active Bookings</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">₹{FPO_INFO.monthlyTransactions}</p>
          <p className="text-sm text-gray-500">Monthly Txns</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'members', label: 'Members' },
          { key: 'bookings', label: 'Bulk Bookings' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'overview' | 'members' | 'bookings')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === tab.key
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Benefits */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">FPO Benefits</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Bulk Discounts</h3>
                <p className="text-sm text-gray-600">15-25% savings on group bookings</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Better Rates</h3>
                <p className="text-sm text-gray-600">Negotiated prices with providers</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl">
                <Users className="w-8 h-8 text-amber-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Collective Voice</h3>
                <p className="text-sm text-gray-600">Unified representation</p>
              </div>
            </div>
          </div>

          {/* Recent Bulk Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Bulk Bookings</h2>
              <button className="flex items-center gap-2 text-primary-600 font-medium hover:underline">
                <Plus className="w-5 h-5" />
                New Bulk Booking
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {AGGREGATE_BOOKINGS.map((booking) => (
                <div key={booking.id} className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.service}</h3>
                    <p className="text-sm text-gray-500">
                      {booking.farmerCount} farmers • {booking.totalAcres} acres
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600">₹{booking.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      booking.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      booking.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Member Farmers ({MEMBER_FARMERS.length})</h2>
            <button className="flex items-center gap-2 text-primary-600 font-medium hover:underline">
              <Plus className="w-5 h-5" />
              Add Member
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {MEMBER_FARMERS.map((farmer) => (
              <div key={farmer.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                    {farmer.name[0]}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{farmer.name}</h3>
                    <p className="text-sm text-gray-500">{farmer.acres} acres • +91 {farmer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{farmer.bookings}</p>
                    <p className="text-gray-500">Bookings</p>
                  </div>
                  {farmer.pending > 0 && (
                    <div className="text-center">
                      <p className="font-bold text-amber-600">{farmer.pending}</p>
                      <p className="text-gray-500">Pending</p>
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bulk Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Bulk Booking Requests</h2>
              <button className="gradient-bg text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:opacity-90">
                <Plus className="w-5 h-5" />
                Create Bulk Booking
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acres</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {AGGREGATE_BOOKINGS.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{booking.service}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.farmerCount}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.totalAcres}</td>
                    <td className="px-6 py-4 font-bold text-primary-600">₹{booking.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        booking.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
