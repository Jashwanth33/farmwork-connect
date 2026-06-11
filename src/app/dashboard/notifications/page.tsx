'use client';

import { useState } from 'react';
import {
  Bell, Check, CheckCheck, Trash2, Filter, Calendar,
  Tractor, DollarSign, AlertTriangle, CloudRain, MessageCircle
} from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Booking Accepted!',
    message: 'Krishna Farms has accepted your booking for Land Ploughing',
    type: 'BOOKING',
    isRead: false,
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Payment Received',
    message: '₹500 advance payment received for booking FWC-ABC123',
    type: 'PAYMENT',
    isRead: false,
    createdAt: '4 hours ago',
  },
  {
    id: '3',
    title: 'Weather Alert: Rain Expected',
    message: 'Heavy rainfall expected tomorrow. Consider rescheduling outdoor work.',
    type: 'WEATHER',
    isRead: true,
    createdAt: '6 hours ago',
  },
  {
    id: '4',
    title: 'Work Completed',
    message: 'Rice Harvesting completed. Please rate the service.',
    type: 'BOOKING',
    isRead: true,
    createdAt: '1 day ago',
  },
  {
    id: '5',
    title: 'New Message',
    message: 'Green Spray Team sent you a message regarding your booking',
    type: 'SYSTEM',
    isRead: true,
    createdAt: '2 days ago',
  },
];

const TYPE_ICONS: Record<string, typeof Bell> = {
  BOOKING: Tractor,
  PAYMENT: DollarSign,
  WEATHER: CloudRain,
  ALERT: AlertTriangle,
  SYSTEM: Bell,
};

const TYPE_COLORS: Record<string, string> = {
  BOOKING: 'bg-blue-100 text-blue-600',
  PAYMENT: 'bg-green-100 text-green-600',
  WEATHER: 'bg-cyan-100 text-cyan-600',
  ALERT: 'bg-red-100 text-red-600',
  SYSTEM: 'bg-gray-100 text-gray-600',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">{unreadCount} unread notifications</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition"
          >
            <CheckCheck className="w-5 h-5" />
            Mark all read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
            filter === 'unread'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('BOOKING')}
          className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition flex items-center gap-2 ${
            filter === 'BOOKING'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Tractor className="w-4 h-4" /> Bookings
        </button>
        <button
          onClick={() => setFilter('PAYMENT')}
          className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition flex items-center gap-2 ${
            filter === 'PAYMENT'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Payments
        </button>
        <button
          onClick={() => setFilter('WEATHER')}
          className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition flex items-center gap-2 ${
            filter === 'WEATHER'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <CloudRain className="w-4 h-4" /> Weather
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = TYPE_ICONS[notification.type] || Bell;
          const colorClass = TYPE_COLORS[notification.type] || 'bg-gray-100 text-gray-600';

          return (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition ${
                !notification.isRead ? 'border-l-4 border-l-primary-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {notification.createdAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {filter === 'unread' ? 'All caught up!' : 'No notifications yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
