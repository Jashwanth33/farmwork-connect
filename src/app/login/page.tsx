'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Sprout, ArrowLeft, Phone, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState<number | null>(null);

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      toast.error('Enter valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('OTP sent successfully!');
        setStep('otp');
      } else {
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

    if (value && index < 5) {
      setShowOtpInput(index + 1);
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setShowOtpInput(index - 1);
    }
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
          phone, 
          otp: otpValue,
          name: 'Demo User',
          role: 'FARMER'
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Login successful!');
        router.push('/dashboard');
      } else if (data.requiresRegistration) {
        toast.error('Please register first');
        router.push(`/register?phone=${phone}`);
      } else {
        toast.error(data.error || 'Invalid OTP. Use 123456');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Login to FarmWork Connect</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {step === 'phone' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="absolute left-14 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter mobile number"
                      className="w-full pl-24 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full gradient-bg text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600">
                    Enter OTP sent to <span className="font-semibold">+91 {phone}</span>
                  </p>
                  <button
                    onClick={() => setStep('phone')}
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
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      ref={(el) => {
                        if (el && index === showOtpInput) {
                          el.focus();
                        }
                      }}
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
                    'Verify & Login'
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

            <div className="mt-6 text-center text-sm text-gray-500">
              New to FarmWork Connect?{' '}
              <Link href="/register" className="text-primary-600 font-medium hover:underline">
                Create Account
              </Link>
            </div>
          </div>

          {/* Demo Hint */}
          <div className="mt-6 p-4 bg-primary-50 rounded-xl text-center">
            <p className="text-sm text-primary-700">
              Demo OTP: <span className="font-mono font-bold">123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
