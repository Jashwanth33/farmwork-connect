import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getExpiryTime } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone || phone.length !== 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const otp = '123456';
    const expiresAt = getExpiryTime(10);

    await prisma.oTP.upsert({
      where: { phone },
      update: {
        otp,
        expiresAt,
        isUsed: false,
      },
      create: {
        phone,
        otp,
        expiresAt,
      },
    });

    console.log(`[OTP] Phone: ${phone}, OTP: ${otp}`);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      phone: phone.slice(0, 3) + '****' + phone.slice(7),
    });
  } catch (error) {
    console.error('[OTP Error]:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}