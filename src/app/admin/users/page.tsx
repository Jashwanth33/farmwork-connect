'use client';

import { useState } from 'react';
import {
  Search, Filter, MoreVertical, Shield, XCircle, CheckCircle,
  AlertTriangle, ChevronDown, Phone, Mail, Eye
} from 'lucide-react';

const MOCK_USERS = [
  { id: '1', name: 'Ramesh Kumar', phone: '9876543210', role: 'FARMER', isVerified: true, joinedDate: '2024-01-15', bookings: 24, rating: 4.8 },
  { id: '2', name: 'Krishna Farms', phone: '9876543211', role: 'EQUIPMENT_OWNER', isVerified: true, joinedDate: '2024-02-20', bookings: 156, rating: 4.9 },
  { id: '3', name: 'Ravi Transport', phone: '9876543212', role: 'TRANSPORT_PROVIDER', isVerified: true, joinedDate: '2024-01-10', bookings: 89, rating: 4.5 },
  { id: '4', name: 'Green Spray Team', phone: '9876543213', role: 'WORKER', isVerified: false, joinedDate: '2024-03-01', bookings: 45, rating: 4.7 },
  { id: '5', name: 'Venkat Rao', phone: '9876543214', role: 'FARMER', isVerified: true, joinedDate: '2024-02-05', bookings: 12, rating: 4.6 },
  { id: '6', name: 'Balaji Agriculture', phone: '9876543215', role: 'EQUIPMENT_OWNER', isVerified: false, joinedDate: '2024-03-10', bookings: 23, rating: 4.4 },
];

const ROLE_COLORS: Record<string, string> = {
  FARMER: 'bg-blue-100 text-blue-700',
  WORKER: 'bg-green-100 text-green-700',
  EQUIPMENT_OWNER: 'bg-amber-100 text-amber-700',
  TRANSPORT_PROVIDER: 'bg-purple-100 text-purple-700',
};

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(null);

  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">{MOCK_USERS.length} total users</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-2 border border-gray-200 rounded-xl w-64 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl"
          >
            <option value="">All Roles</option>
            <option value="FARMER">Farmers</option>
            <option value="WORKER">Workers</option>
            <option value="EQUIPMENT_OWNER">Equipment Owners</option>
            <option value="TRANSPORT_PROVIDER">Transport Providers</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-gray-900">{MOCK_USERS.length}</p>
          <p className="text-sm text-gray-500">Total Users</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-blue-600">
            {MOCK_USERS.filter(u => u.role === 'FARMER').length}
          </p>
          <p className="text-sm text-gray-500">Farmers</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-green-600">
            {MOCK_USERS.filter(u => u.role === 'WORKER' || u.role === 'EQUIPMENT_OWNER').length}
          </p>
          <p className="text-sm text-gray-500">Providers</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-amber-600">
            {MOCK_USERS.filter(u => !u.isVerified).length}
          </p>
          <p className="text-sm text-gray-500">Pending Verification</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Stats</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-semibold">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">ID: {user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${ROLE_COLORS[user.role]}`}>
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Phone className="w-4 h-4" /> +91 {user.phone}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {user.isVerified ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-600">
                      <AlertTriangle className="w-4 h-4" /> Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p>{user.bookings} bookings</p>
                    <p className="text-gray-500">⭐ {user.rating}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {!user.isVerified && (
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedUser(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">User Details</h3>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-2xl">
                  {selectedUser.name[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{selectedUser.name}</h4>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${ROLE_COLORS[selectedUser.role]}`}>
                    {selectedUser.role.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">+91 {selectedUser.phone}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{selectedUser.joinedDate}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Bookings</p>
                  <p className="font-medium">{selectedUser.bookings}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="font-medium">⭐ {selectedUser.rating}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="flex-1 py-2 border border-gray-200 rounded-xl font-medium hover:bg-gray-50">
                  View Bookings
                </button>
                {selectedUser.isVerified ? (
                  <button className="flex-1 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100">
                    Suspend
                  </button>
                ) : (
                  <button className="flex-1 gradient-bg text-white rounded-xl font-medium hover:opacity-90">
                    Verify User
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
