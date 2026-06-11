import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateBookingNumber } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const role = searchParams.get('role');

    const where: Record<string, unknown> = {};

    if (role === 'FARMER') {
      where.farmerId = 'current-user';
    } else if (role === 'PROVIDER') {
      where.providerId = 'current-user';
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        farmer: {
          select: { id: true, name: true, phone: true, avatar: true },
        },
        provider: {
          select: { id: true, name: true, phone: true, avatar: true },
        },
        service: true,
        review: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Bookings fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      serviceId,
      providerId,
      cropType,
      farmAddress,
      farmLatitude,
      farmLongitude,
      farmSize,
      scheduledDate,
      scheduledTime,
      urgency,
      notes,
      totalAmount,
    } = body;

    if (!serviceId || !providerId || !cropType || !farmSize || !scheduledDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        farmerId: body.farmerId,
        providerId,
        serviceId,
        cropType: cropType.toUpperCase(),
        farmAddress,
        farmLatitude,
        farmLongitude,
        farmSize,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        urgency,
        notes,
        totalAmount,
      },
      include: {
        service: true,
        farmer: { select: { name: true, phone: true } },
        provider: { select: { name: true, phone: true } },
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
