'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Sprout, ArrowLeft, Loader2, Check } from 'lucide-react';

const ROLES = [
  { value: 'FARMER', label: 'Farmer', desc: 'Book labor & services' },
  { value: 'WORKER', label: 'Worker', desc: 'Find farm work' },
  { value: 'EQUIPMENT_OWNER', label: 'Equipment Owner', desc: 'Rent your machinery' },
  { value: 'TRANSPORT_PROVIDER', label: 'Transport Provider', desc: 'Offer transport services' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'kn', label: 'ಕನ್ನಡ' },
];

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedRole = searchParams.get('role')?.toUpperCase();
  const preFilledPhone = searchParams.get('phone');

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: preFilledPhone || '',
    role: preSelectedRole || '',
    language: 'en',
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      toast.error('Enter valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone }),
      });

      if (res.ok) {
        toast.success('OTP sent successfully!');
        setStep(2);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to send OTP');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          otp: otpValue,
          name: formData.name,
          role: formData.role,
        }),
      });

      if (res.ok) {
        toast.success('Registration successful!');
        router.push('/dashboard');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Verification failed');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Create Account</h1>
            <p className="text-gray-600 mt-2">
              {step === 1 && 'Select your role'}
              {step === 2 && 'Verify your mobile'}
              {step === 3 && 'Complete your profile'}
            </p>
          </div>

          {/* Progress */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition ${
                  s <= step ? 'gradient-bg' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {ROLES.map((role) => (
                      <button
                        key={role.value}
                        onClick={() => setFormData({ ...formData, role: role.value })}
                        className={`p-4 rounded-xl border-2 text-left transition ${
                          formData.role === role.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${
                            formData.role === role.value ? 'bg-primary-600' : 'bg-gray-300'
                          }`} />
                          <span className="font-semibold">{role.label}</span>
                        </div>
                        <p className="text-xs text-gray-500">{role.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    placeholder="Enter mobile number"
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={loading || !formData.name || !formData.role || !formData.phone}
                  className="w-full gradient-bg text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600">
                    Enter OTP sent to <span className="font-semibold">+91 {formData.phone}</span>
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="text-primary-600 text-sm mt-1 hover:underline"
                  >
                    Change number
                  </button>
                </div>

                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="tel"
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      className="w-12 h-14 text-center text-2xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full gradient-bg text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Verify & Complete
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Didn't receive OTP?{' '}
                  <button
                    onClick={handleSendOTP}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Resend
                  </button>
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 font-medium hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
    </div>}>
      <RegisterContent />
    </Suspense>
  );
}
