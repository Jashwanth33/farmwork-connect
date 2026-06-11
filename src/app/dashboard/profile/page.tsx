'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  User, Phone, Mail, MapPin, Camera, Shield, Bell,
  Globe, ChevronRight, Save, Star, Calendar, Tractor
} from 'lucide-react';

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'kn', label: 'ಕನ್ನಡ' },
];

const DEMO_PROFILE = {
  name: 'Ramesh Kumar',
  phone: '9876543210',
  email: 'ramesh@farmer.com',
  role: 'FARMER',
  avatar: null,
  language: 'en',
  verified: true,
  addresses: [
    {
      id: '1',
      label: 'Home Farm',
      address: '123, Farm Road',
      city: 'Thiruvallur',
      district: 'Thiruvallur',
      state: 'Tamil Nadu',
      pincode: '602001',
      isDefault: true,
    },
  ],
  stats: {
    totalBookings: 24,
    completedBookings: 21,
    totalSpend: 45600,
    rating: 4.8,
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    sms: true,
    whatsapp: true,
    email: false,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account settings</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-primary-600 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 gradient-bg text-white rounded-xl font-medium hover:opacity-90 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-3xl">
              {profile.name[0]}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
              {profile.verified && (
                <Shield className="w-5 h-5 text-primary-600" />
              )}
            </div>
            <p className="text-gray-500">{profile.role.replace('_', ' ')}</p>
            <div className="flex items-center gap-4 mt-2 justify-center sm:justify-start">
              <span className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                {profile.stats.rating} Rating
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                {profile.stats.completedBookings} Jobs Completed
              </span>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Calendar className="w-8 h-8 text-primary-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{profile.stats.totalBookings}</p>
          <p className="text-sm text-gray-500">Total Bookings</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Tractor className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{profile.stats.completedBookings}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Star className="w-8 h-8 text-yellow-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{profile.stats.rating}</p>
          <p className="text-sm text-gray-500">Rating</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Shield className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{profile.verified ? 'Yes' : 'No'}</p>
          <p className="text-sm text-gray-500">Verified</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">+91 {profile.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Saved Addresses</h3>
          <button className="text-primary-600 text-sm font-medium">+ Add New</button>
        </div>
        <div className="space-y-3">
          {profile.addresses.map((addr) => (
            <div key={addr.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{addr.label}</p>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {addr.address}, {addr.city}, {addr.district}, {addr.state} - {addr.pincode}
                </p>
              </div>
              <button className="text-gray-400 hover:text-primary-600">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Language</p>
                <p className="text-sm text-gray-500">Select your preferred language</p>
              </div>
            </div>
            <select
              value={profile.language}
              onChange={(e) => setProfile({ ...profile, language: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive booking updates via SMS</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
              className={`w-12 h-6 rounded-full transition ${
                notifications.sms ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition ${
                notifications.sms ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Account</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition">
            <span className="text-gray-700">Help & Support</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition">
            <span className="text-gray-700">Privacy Policy</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-xl transition text-red-600">
            <span>Logout</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
