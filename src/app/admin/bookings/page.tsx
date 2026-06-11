'use client';

import { useState } from 'react';
import {
  Search, Calendar, Filter, Eye, CheckCircle, XCircle,
  AlertTriangle, Download, MoreVertical, Tractor, Truck
} from 'lucide-react';

const MOCK_BOOKINGS = [
  { id: 'B001', bookingNumber: 'FWC-ABC123-XY', service: 'Land Ploughing', farmer: 'Ramesh Kumar', provider: 'Krishna Farms', amount: 2500, status: 'COMPLETED', date: '2024-03-15' },
  { id: 'B002', bookingNumber: 'FWC-DEF456-ZW', service: 'Rice Harvesting', farmer: 'Venkat Rao', provider: 'Happy Harvesters', amount: 4000, status: 'IN_PROGRESS', date: '2024-03-18' },
  { id: 'B003', bookingNumber: 'FWC-GHI789-UV', service: 'Crop Transport', farmer: 'Lakshmi Devi', provider: 'Ravi Transport', amount: 1500, status: 'PENDING', date: '2024-03-19' },
  { id: 'B004', bookingNumber: 'FWC-JKL012-RS', service: 'Pesticide Spraying', farmer: 'Suresh P', provider: 'Green Spray Team', amount: 1200, status: 'DISPUTED', date: '2024-03-16' },
  { id: 'B005', bookingNumber: 'FWC-MNO345-TQ', service: 'Land Levelling', farmer: 'Kumar S', provider: 'Balaji Agriculture', amount: 1800, status: 'CANCELLED', date: '2024-03-14' },
  { id: 'B006', bookingNumber: 'FWC-PQR678-OP', service: 'Threshing', farmer: 'Priya M', provider: 'Happy Harvesters', amount: 2200, status: 'COMPLETED', date: '2024-03-13' },
];

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  ACCEPTED: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-orange-100 text-orange-700',
  COMPLETED: 'bg-green-100 text-green-700',
  DISPUTED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-700',
};

export default function AdminBookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    const matchesSearch = booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: MOCK_BOOKINGS.length,
    pending: MOCK_BOOKINGS.filter(b => b.status === 'PENDING').length,
    active: MOCK_BOOKINGS.filter(b => ['ACCEPTED', 'IN_PROGRESS'].includes(b.status)).length,
    completed: MOCK_BOOKINGS.filter(b => b.status === 'COMPLETED').length,
    disputed: MOCK_BOOKINGS.filter(b => b.status === 'DISPUTED').length,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600">{stats.total} total bookings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
          onClick={() => setStatusFilter('')}>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
          onClick={() => setStatusFilter('PENDING')}>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
          onClick={() => setStatusFilter('IN_PROGRESS')}>
          <p className="text-2xl font-bold text-orange-600">{stats.active}</p>
          <p className="text-sm text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
          onClick={() => setStatusFilter('COMPLETED')}>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
          onClick={() => setStatusFilter('DISPUTED')}>
          <p className="text-2xl font-bold text-red-600">{stats.disputed}</p>
          <p className="text-sm text-gray-500">Disputed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by booking ID, service or farmer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="DISPUTED">Disputed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm text-gray-600">{booking.bookingNumber}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {booking.service.includes('Transport') ? (
                      <Truck className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Tractor className="w-5 h-5 text-primary-600" />
                    )}
                    <span className="font-medium text-gray-900">{booking.service}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{booking.farmer}</td>
                <td className="px-6 py-4 text-gray-600">{booking.provider}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">₹{booking.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[booking.status]}`}>
                    {booking.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{booking.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50">
                      <Eye className="w-4 h-4" />
                    </button>
                    {booking.status === 'DISPUTED' && (
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
