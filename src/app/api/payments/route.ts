import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processPayment, completePayment, generateUPIQR } from '@/lib/payments/razorpay';

export async function POST(request: NextRequest) {
  try {
    const { bookingId, amount, method, partial } = await request.json();

    if (!bookingId || !amount || !method) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await processPayment({
      bookingId,
      amount,
      method,
      partial,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (method === 'CASH') {
      return NextResponse.json({
        success: true,
        transactionId: result.transactionId,
        method: 'CASH',
      });
    }

    const order = await import('@/lib/payments/razorpay').then(m => 
      m.createPaymentOrder(amount, bookingId)
    );

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      upiQR: method === 'UPI' ? generateUPIQR(amount, bookingId) : null,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { bookingId, transactionId, method, isPartial, razorpayOrderId, razorpayPaymentId, razorpaySignature } = 
      await request.json();

    if (method !== 'CASH' && razorpayOrderId && razorpayPaymentId && razorpaySignature) {
      const { verifyPayment } = await import('@/lib/payments/razorpay');
      const isValid = await verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
      
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
      }
    }

    const result = await completePayment(
      bookingId,
      transactionId || razorpayPaymentId,
      method,
      isPartial
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Payment completion error:', error);
    return NextResponse.json(
      { error: 'Failed to complete payment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({
      bookingId,
      totalAmount: booking.totalAmount,
      advancePaid: booking.advancePaid,
      balanceDue: booking.totalAmount - booking.advancePaid,
      payment: booking.payment,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payment info' }, { status: 500 });
  }
}
