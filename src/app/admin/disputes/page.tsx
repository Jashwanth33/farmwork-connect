'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle, Clock, CheckCircle, XCircle, MessageSquare,
  FileText, ChevronRight, Search, Filter, Eye
} from 'lucide-react';

const DEMO_DISPUTES = [
  {
    id: 'D001',
    bookingId: 'B004',
    bookingNumber: 'FWC-JKL012-RS',
    service: 'Pesticide Spraying',
    farmer: { name: 'Suresh P', phone: '9876543210' },
    provider: { name: 'Green Spray Team', phone: '9876543213' },
    issue: 'Service Quality',
    description: 'The pesticide was not sprayed properly and many areas were missed. Crops are showing signs of pest attack.',
    amount: 1200,
    status: 'OPEN',
    createdAt: '2 days ago',
  },
  {
    id: 'D002',
    bookingId: 'B089',
    bookingNumber: 'FWC-MNO345-TQ',
    service: 'Land Levelling',
    farmer: { name: 'Muthu K', phone: '9876543200' },
    provider: { name: 'Balaji Agriculture', phone: '9876543215' },
    issue: 'Payment Dispute',
    description: 'Provider is demanding additional payment beyond the agreed amount.',
    amount: 1800,
    status: 'UNDER_REVIEW',
    createdAt: '3 days ago',
  },
  {
    id: 'D003',
    bookingId: 'B156',
    bookingNumber: 'FWC-PQR678-OP',
    service: 'Rice Harvesting',
    farmer: { name: 'Priya M', phone: '9876543201' },
    provider: { name: 'Happy Harvesters', phone: '9876543212' },
    issue: 'Equipment Damage',
    description: 'Equipment damaged some standing crops during harvesting.',
    amount: 4000,
    status: 'RESOLVED',
    resolution: 'Provider agreed to reduce payment by 30%',
    createdAt: '1 week ago',
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  OPEN: { label: 'Open', color: 'text-red-700', bgColor: 'bg-red-100' },
  UNDER_REVIEW: { label: 'Under Review', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  RESOLVED: { label: 'Resolved', color: 'text-green-700', bgColor: 'bg-green-100' },
  CLOSED: { label: 'Closed', color: 'text-gray-700', bgColor: 'bg-gray-100' },
};

export default function DisputesPage() {
  const [disputes] = useState(DEMO_DISPUTES);
  const [filter, setFilter] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState<typeof DEMO_DISPUTES[0] | null>(null);

  const filteredDisputes = disputes.filter((d) => {
    if (filter === 'all') return true;
    return d.status === filter;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Disputes</h1>
        <p className="text-gray-600">Manage and resolve booking disputes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-red-600">{disputes.filter(d => d.status === 'OPEN').length}</p>
          <p className="text-sm text-gray-500">Open</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-yellow-600">{disputes.filter(d => d.status === 'UNDER_REVIEW').length}</p>
          <p className="text-sm text-gray-500">Under Review</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-green-600">{disputes.filter(d => d.status === 'RESOLVED').length}</p>
          <p className="text-sm text-gray-500">Resolved</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-gray-600">{disputes.length}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {['all', 'OPEN', 'UNDER_REVIEW', 'RESOLVED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status === 'all' ? 'All' : STATUS_CONFIG[status]?.label}
          </button>
        ))}
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {filteredDisputes.map((dispute) => (
          <div
            key={dispute.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{dispute.issue}</p>
                    <p className="text-sm text-gray-500">{dispute.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${STATUS_CONFIG[dispute.status].bgColor} ${STATUS_CONFIG[dispute.status].color}`}>
                    {STATUS_CONFIG[dispute.status].label}
                  </span>
                  <span className="text-xs text-gray-400">{dispute.createdAt}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{dispute.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">
                    Booking: <span className="font-mono text-gray-700">{dispute.bookingNumber}</span>
                  </span>
                  <span className="text-gray-500">
                    Amount: <span className="font-semibold text-gray-700">₹{dispute.amount}</span>
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDispute(dispute)}
                  className="flex items-center gap-1 text-primary-600 font-medium hover:underline"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredDisputes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <CheckCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No disputes found</h3>
            <p className="text-gray-500">All clear! No disputes in this category.</p>
          </div>
        )}
      </div>

      {/* Dispute Detail Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Dispute Details</h2>
                <p className="text-sm text-gray-500 font-mono">{selectedDispute.bookingNumber}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${STATUS_CONFIG[selectedDispute.status].bgColor} ${STATUS_CONFIG[selectedDispute.status].color}`}>
                {STATUS_CONFIG[selectedDispute.status].label}
              </span>
            </div>

            <div className="p-6 space-y-6">
              {/* Issue */}
              <div className="p-4 bg-red-50 rounded-xl">
                <h3 className="font-semibold text-red-900 mb-1">{selectedDispute.issue}</h3>
                <p className="text-sm text-red-700">{selectedDispute.description}</p>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Farmer</p>
                  <p className="font-semibold text-gray-900">{selectedDispute.farmer.name}</p>
                  <p className="text-sm text-gray-500">+91 {selectedDispute.farmer.phone}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Provider</p>
                  <p className="font-semibold text-gray-900">{selectedDispute.provider.name}</p>
                  <p className="text-sm text-gray-500">+91 {selectedDispute.provider.phone}</p>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
                <span className="text-gray-700">Disputed Amount</span>
                <span className="text-2xl font-bold text-primary-700">₹{selectedDispute.amount}</span>
              </div>

              {/* Resolution */}
              {selectedDispute.resolution && (
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-600 font-medium mb-1">Resolution</p>
                  <p className="text-gray-700">{selectedDispute.resolution}</p>
                </div>
              )}

              {/* Actions */}
              {selectedDispute.status !== 'RESOLVED' && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Actions</h3>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Message Parties
                    </button>
                    <button className="flex-1 py-3 gradient-bg text-white rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5" />
                      Submit Decision
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100">
              <button
                onClick={() => setSelectedDispute(null)}
                className="w-full py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
