'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sprout, Home, Search, Calendar, Users, Truck, Tractor,
  BarChart3, Settings, Bell, LogOut, Menu, X, User, ChevronDown,
  Cloud, AlertTriangle, Crown, Building2, CreditCard, MessageCircle,
  DollarSign, CalendarDays
} from 'lucide-react';

const NAV_ITEMS = {
  FARMER: [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/search', icon: Search, label: 'Find Services' },
    { href: '/dashboard/bookings', icon: Calendar, label: 'My Bookings' },
    { href: '/dashboard/bookings/emergency', icon: AlertTriangle, label: 'Emergency', highlight: true },
    { href: '/dashboard/weather', icon: Cloud, label: 'Weather' },
    { href: '/dashboard/mandi', icon: DollarSign, label: 'Mandi Prices' },
    { href: '/dashboard/chat', icon: MessageCircle, label: 'Messages' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
  ],
  WORKER: [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/bookings', icon: Calendar, label: 'Jobs' },
    { href: '/dashboard/calendar', icon: CalendarDays, label: 'Availability' },
    { href: '/dashboard/earnings', icon: BarChart3, label: 'Earnings' },
    { href: '/dashboard/chat', icon: MessageCircle, label: 'Messages' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
  ],
  EQUIPMENT_OWNER: [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/bookings', icon: Calendar, label: 'Bookings' },
    { href: '/dashboard/equipment', icon: Tractor, label: 'My Equipment' },
    { href: '/dashboard/calendar', icon: CalendarDays, label: 'Availability' },
    { href: '/dashboard/earnings', icon: BarChart3, label: 'Earnings' },
    { href: '/dashboard/subscriptions', icon: Crown, label: 'Plans' },
    { href: '/dashboard/chat', icon: MessageCircle, label: 'Messages' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
  ],
  TRANSPORT_PROVIDER: [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/bookings', icon: Calendar, label: 'Bookings' },
    { href: '/dashboard/calendar', icon: CalendarDays, label: 'Availability' },
    { href: '/dashboard/earnings', icon: BarChart3, label: 'Earnings' },
    { href: '/dashboard/subscriptions', icon: Crown, label: 'Plans' },
    { href: '/dashboard/chat', icon: MessageCircle, label: 'Messages' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
  ],
  FPO: [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/fpo', icon: Building2, label: 'FPO Dashboard' },
    { href: '/dashboard/bookings', icon: Calendar, label: 'Bulk Bookings' },
    { href: '/dashboard/earnings', icon: BarChart3, label: 'Reports' },
    { href: '/dashboard/chat', icon: MessageCircle, label: 'Messages' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
  ],
};

const DEMO_USER = {
  id: '1',
  name: 'Ramesh Kumar',
  phone: '9876543210',
  role: 'FARMER' as const,
  avatar: null,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = NAV_ITEMS[DEMO_USER.role] || NAV_ITEMS.FARMER;

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method: 'DELETE' });
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary-600"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text hidden sm:block">
                  FarmWork Connect
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/notifications"
                className="relative p-2 text-gray-600 hover:text-primary-600 transition"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Link>

              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-semibold">
                  {DEMO_USER.name?.[0] || 'U'}
                </div>
                <div className="hidden sm:block">
                  <p className="font-medium text-gray-900">{DEMO_USER.name}</p>
                  <p className="text-xs text-gray-500">{DEMO_USER.role.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 lg:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold gradient-text">FarmWork</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive
                        ? 'gradient-bg text-white'
                        : item.highlight
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.highlight && (
                      <span className="ml-auto px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                        HOT
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
