'use client';

import { useState } from 'react';
import { CreditCard, QrCode, Wallet, Building2, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  bookingId: string;
  amount: number;
  isPartial?: boolean;
  partialAmount?: number;
  onSuccess: () => void;
  onClose: () => void;
}

const PAYMENT_METHODS = [
  { id: 'UPI', label: 'UPI', icon: QrCode, description: 'Pay using any UPI app' },
  { id: 'NET_BANKING', label: 'Net Banking', icon: Building2, description: 'Internet banking' },
  { id: 'WALLET', label: 'Wallet', icon: Wallet, description: 'FarmWork Wallet' },
  { id: 'CASH', label: 'Cash on Service', icon: CreditCard, description: 'Pay after service' },
];

export default function PaymentModal({
  bookingId,
  amount,
  isPartial,
  partialAmount,
  onSuccess,
  onClose,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('UPI');
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [upiQR, setUpiQR] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (selectedMethod === 'CASH') {
        const res = await fetch('/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId,
            amount: isPartial ? partialAmount : amount,
            method: 'CASH',
          }),
        });

        if (res.ok) {
          toast.success('Payment method selected! Pay cash on service');
          onSuccess();
        }
        return;
      }

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          amount: isPartial ? partialAmount : amount,
          method: selectedMethod,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.upiQR) {
          setUpiQR(data.upiQR);
          setShowQR(true);
        } else {
          setPaymentStatus('processing');
          setTimeout(() => {
            setPaymentStatus('success');
            toast.success('Payment successful!');
            onSuccess();
          }, 2000);
        }
      }
    } catch {
      toast.error('Payment failed');
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const confirmUPIPayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          transactionId: `UPI_${Date.now()}`,
          method: 'UPI',
          isPartial,
        }),
      });

      if (res.ok) {
        setPaymentStatus('success');
        toast.success('Payment successful!');
        onSuccess();
      }
    } catch {
      toast.error('Payment verification failed');
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
          <p className="text-gray-500 mt-1">
            {isPartial ? `Pay advance: ₹${partialAmount}` : `Total: ₹${amount}`}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {showQR && upiQR ? (
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                <img src={upiQR} alt="UPI QR Code" className="w-full h-full" />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Scan QR code with any UPI app
              </p>
              <div className="space-y-3">
                <button
                  onClick={confirmUPIPayment}
                  disabled={loading}
                  className="w-full py-3 gradient-bg text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      I've Paid
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowQR(false)}
                  className="w-full py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Back
                </button>
              </div>
            </div>
          ) : paymentStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-500">Your payment has been processed</p>
            </div>
          ) : paymentStatus === 'failed' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✕</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h3>
              <p className="text-gray-500 mb-4">Please try again</p>
              <button
                onClick={() => setPaymentStatus('idle')}
                className="w-full py-3 gradient-bg text-white rounded-xl font-semibold"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-gray-900 mb-4">Select Payment Method</h3>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition ${
                      selectedMethod === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedMethod === method.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">{method.label}</p>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                    {selectedMethod === method.id && (
                      <Check className="w-5 h-5 text-primary-600" />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full mt-6 py-4 gradient-bg text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${isPartial ? partialAmount : amount}`
                )}
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        {!showQR && paymentStatus === 'idle' && (
          <div className="px-6 pb-6">
            <p className="text-xs text-gray-400 text-center">
              Secure payment powered by FarmWork Connect
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
