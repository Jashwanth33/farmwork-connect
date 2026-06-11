'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  ArrowLeft, Calendar, Clock, MapPin, Phone, MessageCircle,
  Star, Tractor, Truck, AlertCircle, CheckCircle2, XCircle,
  Download, Share2
} from 'lucide-react';

const BOOKING = {
  id: '1',
  bookingNumber: 'FWC-ABC123-XY',
  service: 'Land Ploughing',
  category: 'LAND_PREPARATION',
  provider: {
    id: 'p1',
    name: 'Krishna Farms',
    phone: '9876543210',
    avatar: null,
    rating: 4.8,
    reviews: 124,
    totalJobs: 340,
  },
  farmer: {
    name: 'Ramesh Kumar',
    phone: '9876500000',
  },
  cropType: 'RICE',
  farmSize: 5,
  scheduledDate: '2024-03-18',
  scheduledTime: '9:00 AM',
  status: 'IN_PROGRESS',
  urgency: 'normal',
  notes: 'Plough the field twice, need deep tilling',
  amount: 2500,
  advancePaid: 500,
  farmAddress: '123, Farm Road, Village Thuraipakkam, Thiruvallur, Tamil Nadu - 602001',
  farmLatitude: 13.0827,
  farmLongitude: 80.2707,
  createdAt: '2024-03-15T10:30:00',
  completedAt: null,
  payment: {
    method: 'UPI',
    status: 'PARTIAL',
    transactionId: 'UPI123456789',
  },
};

const STATUS_TIMELINE = [
  { status: 'PENDING', label: 'Booking Created', date: 'Mar 15, 10:30 AM', completed: true },
  { status: 'ACCEPTED', label: 'Provider Accepted', date: 'Mar 15, 11:00 AM', completed: true },
  { status: 'IN_PROGRESS', label: 'Work Started', date: 'Mar 18, 9:00 AM', completed: true },
  { status: 'COMPLETED', label: 'Work Completed', date: null, completed: false },
];

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; bgColor: string }> = {
  PENDING: { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  ACCEPTED: { icon: CheckCircle2, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  IN_PROGRESS: { icon: Tractor, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  COMPLETED: { icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-100' },
  CANCELLED: { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
};

export default function BookingDetailPage() {
  const params = useParams();
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const booking = BOOKING;
  const statusConfig = STATUS_CONFIG[booking.status];

  const handleCancel = () => {
    toast.success('Booking cancelled successfully');
  };

  const handleSubmitReview = () => {
    toast.success('Review submitted successfully!');
    setShowReview(false);
  };

  const handleCall = () => {
    window.open(`tel:+91${booking.provider.phone}`);
  };

  const handleMessage = () => {
    toast.success('Opening chat...');
  };

  const handleNavigate = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${booking.farmLatitude},${booking.farmLongitude}`,
      '_blank'
    );
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/bookings"
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-300 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Booking Details</h1>
          <p className="text-sm text-gray-500 font-mono">{booking.bookingNumber}</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor}`}>
          <statusConfig.icon className={`w-4 h-4 ${statusConfig.color}`} />
          <span className={`text-sm font-medium ${statusConfig.color}`}>
            {booking.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Provider Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Service Provider</h2>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl">
            {booking.provider.name[0]}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{booking.provider.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-900">{booking.provider.rating}</span>
              <span>({booking.provider.reviews} reviews)</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{booking.provider.totalJobs} jobs completed</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCall}
              className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={handleMessage}
              className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200 transition"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Service Details</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Service</span>
            <span className="font-medium text-gray-900">{booking.service}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Crop Type</span>
            <span className="font-medium text-gray-900">{booking.cropType}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Farm Size</span>
            <span className="font-medium text-gray-900">{booking.farmSize} acres</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Scheduled Date</span>
            <span className="font-medium text-gray-900">
              {new Date(booking.scheduledDate).toLocaleDateString('en-IN', {
                weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">Scheduled Time</span>
            <span className="font-medium text-gray-900">{booking.scheduledTime}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-500">Urgency</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              booking.urgency === 'high' ? 'bg-red-100 text-red-700' :
              booking.urgency === 'emergency' ? 'bg-red-200 text-red-800' :
              'bg-gray-100 text-gray-700'
            }`}>
              {booking.urgency.toUpperCase()}
            </span>
          </div>
        </div>

        {booking.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Notes:</p>
            <p className="text-gray-700">{booking.notes}</p>
          </div>
        )}
      </div>

      {/* Farm Location */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Farm Location</h2>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary-600 mt-1" />
          <div className="flex-1">
            <p className="text-gray-700">{booking.farmAddress}</p>
          </div>
        </div>
        <button
          onClick={handleNavigate}
          className="mt-4 w-full py-3 border border-primary-600 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          Navigate to Farm
        </button>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Booking Timeline</h2>
        <div className="space-y-4">
          {STATUS_TIMELINE.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed ? 'gradient-bg' : 'bg-gray-200'
                }`}>
                  {step.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
                {i < STATUS_TIMELINE.length - 1 && (
                  <div className={`w-0.5 h-8 ${step.completed ? 'bg-primary-500' : 'bg-gray-200'}`} />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-sm text-gray-500">{step.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Payment Summary</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Service Cost</span>
            <span className="font-medium">₹{booking.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Advance Paid</span>
            <span className="font-medium text-green-600">- ₹{booking.advancePaid.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="font-semibold text-gray-900">Balance Due</span>
            <span className="font-bold text-xl text-gray-900">
              ₹{(booking.amount - booking.advancePaid).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">
            Payment Method: <span className="font-medium text-gray-700">{booking.payment.method}</span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {booking.status === 'IN_PROGRESS' && (
          <button
            onClick={() => toast.success('Work marked as complete!')}
            className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Mark as Completed
          </button>
        )}

        {booking.status === 'COMPLETED' && !showReview && (
          <button
            onClick={() => setShowReview(true)}
            className="w-full bg-white border-2 border-primary-600 text-primary-600 py-4 rounded-xl font-semibold hover:bg-primary-50 transition"
          >
            Rate & Review
          </button>
        )}

        {showReview && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold mb-4">Rate your experience</h3>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience (optional)"
              className="w-full p-3 border border-gray-200 rounded-xl mb-4 h-24 resize-none"
            />
            <button
              onClick={handleSubmitReview}
              className="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Submit Review
            </button>
          </div>
        )}

        {['PENDING', 'ACCEPTED'].includes(booking.status) && (
          <button
            onClick={handleCancel}
            className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-semibold hover:bg-red-100 transition"
          >
            Cancel Booking
          </button>
        )}

        <div className="flex gap-3">
          <button className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Invoice
          </button>
          <button className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
