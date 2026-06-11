import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';

export const RAZORPAY_KEY = process.env.RAZORPAY_KEY || 'rzp_test_key';
export const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET || 'test_secret';

export interface PaymentRequest {
  bookingId: string;
  amount: number;
  method: 'UPI' | 'NET_BANKING' | 'WALLET' | 'CASH';
  partial?: boolean;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export async function createPaymentOrder(amount: number, bookingId: string) {
  const orderId = `order_${Date.now()}_${bookingId}`;
  
  return {
    id: orderId,
    amount: amount * 100,
    currency: 'INR',
    receipt: bookingId,
  };
}

export async function verifyPayment(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): Promise<boolean> {
  const crypto = require('crypto');
  const generatedSignature = crypto
    .createHmac('sha256', RAZORPAY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');
  
  return generatedSignature === razorpaySignature;
}

export async function processPayment(request: PaymentRequest): Promise<PaymentResult> {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: request.bookingId },
      include: { payment: true },
    });

    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    if (request.method === 'CASH') {
      await prisma.payment.create({
        data: {
          bookingId: request.bookingId,
          amount: request.amount,
          method: 'CASH',
          status: 'PENDING',
        },
      });
      return { success: true, transactionId: `CASH_${Date.now()}` };
    }

    const order = await createPaymentOrder(request.amount, request.bookingId);
    
    return {
      success: true,
      transactionId: order.id,
    };
  } catch (error) {
    console.error('Payment error:', error);
    return { success: false, error: 'Payment processing failed' };
  }
}

export async function completePayment(
  bookingId: string,
  transactionId: string,
  method: string,
  isPartial: boolean = false
) {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error('Booking not found');

  await prisma.payment.create({
    data: {
      bookingId,
      amount: booking.totalAmount,
      method,
      status: isPartial ? 'PARTIAL' : 'COMPLETED',
      transactionId,
    },
  });

  if (!isPartial) {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { updatedAt: new Date() },
    });
  }

  await prisma.transaction.create({
    data: {
      userId: booking.providerId,
      type: 'EARNING',
      amount: booking.totalAmount,
      description: `Payment for booking ${booking.bookingNumber}`,
      referenceId: transactionId,
    },
  });

  return { success: true };
}

export async function refundPayment(bookingId: string, amount: number) {
  await prisma.payment.update({
    where: { bookingId },
    data: {
      status: 'REFUNDED',
    },
  });

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (booking) {
    await prisma.transaction.create({
      data: {
        userId: booking.farmerId,
        type: 'REFUND',
        amount,
        description: `Refund for booking ${booking.bookingNumber}`,
      },
    });
  }
}

export function generateUPIQR(amount: number, bookingId: string): string {
  const upiUrl = `upi://pay?pa=farmwork@upi&pn=FarmWork&am=${amount}&tn=Booking_${bookingId}&cu=INR`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
}
