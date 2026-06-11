import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { phone, otp, name, role } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'Phone and OTP are required' },
        { status: 400 }
      );
    }

    const validOTP = '123456';
    
    if (otp !== validOTP) {
      return NextResponse.json(
        { error: 'Invalid OTP. Use 123456 for demo.' },
        { status: 401 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      if (!name || !role) {
        return NextResponse.json(
          { error: 'Name and role required for new users', requiresRegistration: true },
          { status: 400 }
        );
      }

      user = await prisma.user.create({
        data: {
          phone,
          name,
          role: role.toUpperCase(),
          isVerified: true,
          language: 'en',
        },
      });

      if (role.toUpperCase() === 'FARMER') {
        await prisma.farmerProfile.create({
          data: { userId: user.id, farmSize: 5 },
        });
      } else if (role.toUpperCase() === 'WORKER') {
        await prisma.workerProfile.create({
          data: { 
            userId: user.id, 
            skills: 'Land Preparation, Harvesting, Sowing',
            dailyWage: 500,
          },
        });
      } else if (role.toUpperCase() === 'EQUIPMENT_OWNER') {
        await prisma.equipmentProfile.create({
          data: {
            userId: user.id,
            equipmentType: 'TRACTOR',
            equipmentName: 'Mahindra 575 DI',
            pricePerHour: 500,
          },
        });
      } else if (role.toUpperCase() === 'TRANSPORT_PROVIDER') {
        await prisma.transportProfile.create({
          data: {
            userId: user.id,
            vehicleType: 'TRUCK',
            vehicleNumber: '',
            capacity: 1000,
            pricePerKm: 15,
          },
        });
      }
    }

    const token = generateToken({
      userId: user.id,
      role: user.role,
      phone: user.phone,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log(`[Login] User: ${user.name}, Role: ${user.role}`);

    return response;
  } catch (error) {
    console.error('[Verify Error]:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}