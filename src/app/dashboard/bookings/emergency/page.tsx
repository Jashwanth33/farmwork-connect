'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  AlertTriangle, Calendar, Clock, MapPin, Tractor, Users,
  Truck, ArrowRight, Loader2, Check
} from 'lucide-react';

const EMERGENCY_SERVICES = [
  { id: '1', name: 'Emergency Harvesting', icon: Tractor, avgTime: '4 hours' },
  { id: '2', name: 'Urgent Transport', icon: Truck, avgTime: '2 hours' },
  { id: '3', name: 'Immediate Spraying', icon: Users, avgTime: '3 hours' },
];

export default function EmergencyBookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    cropType: '',
    farmSize: '',
    urgency: 'emergency',
    address: '',
    notes: '',
    latitude: 13.0827,
    longitude: 80.2707,
  });

  const handleSubmit = async () => {
    if (!formData.serviceType || !formData.cropType || !formData.farmSize) {
      toast.error('Please fill required fields');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Emergency booking created! Providers have been notified.');
      router.push('/dashboard/bookings');
    } catch {
      toast.error('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Emergency Booking</h1>
          </div>
          <p className="text-red-100">
            Get immediate help from nearby providers. Priority notification will be sent to available service providers.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                s <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 mx-2 ${s < step ? 'bg-primary-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">What service do you need?</h2>
              <div className="space-y-3">
                {EMERGENCY_SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setFormData({ ...formData, serviceType: service.name })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition ${
                      formData.serviceType === service.name
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          formData.serviceType === service.name ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <service.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold">{service.name}</p>
                          <p className="text-sm text-gray-500">Avg. response: {service.avgTime}</p>
                        </div>
                      </div>
                      {formData.serviceType === service.name && (
                        <Check className="w-6 h-6 text-primary-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!formData.serviceType}
                className="w-full py-4 gradient-bg text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Farm Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type *</label>
                <select
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                >
                  <option value="">Select crop</option>
                  <option value="RICE">Rice / Paddy</option>
                  <option value="WHEAT">Wheat</option>
                  <option value="MAIZE">Maize</option>
                  <option value="SUGARCANE">Sugarcane</option>
                  <option value="COTTON">Cotton</option>
                  <option value="VEGETABLES">Vegetables</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (Acres) *</label>
                <input
                  type="number"
                  value={formData.farmSize}
                  onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                  placeholder="Enter acres"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Location *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Village, District"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl"
                  />
                  <button className="px-4 py-3 bg-primary-100 text-primary-600 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.cropType || !formData.farmSize}
                  className="flex-1 py-4 gradient-bg text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Confirm Emergency Request</h2>
              
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-center gap-2 text-red-800 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Emergency Priority</span>
                </div>
                <p className="text-sm text-red-700">
                  This booking will be sent to all available providers within 10km immediately.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Service</span>
                  <span className="font-medium">{formData.serviceType}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Crop</span>
                  <span className="font-medium">{formData.cropType}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Size</span>
                  <span className="font-medium">{formData.farmSize} acres</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Priority</span>
                  <span className="font-medium text-red-600">EMERGENCY</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific requirements..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl h-24 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5" />
                      Send Emergency Request
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
