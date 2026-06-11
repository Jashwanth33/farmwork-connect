import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        farmer: {
          select: { id: true, name: true, phone: true, avatar: true },
        },
        provider: {
          select: { id: true, name: true, phone: true, avatar: true },
        },
        service: true,
        payment: true,
        review: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Booking fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status: status.toUpperCase(),
        ...(status === 'COMPLETED' && { completedAt: new Date() }),
      },
      include: {
        farmer: { select: { name: true, phone: true } },
        provider: { select: { name: true, phone: true } },
      },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Booking update error:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
