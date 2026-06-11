import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateDistance } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cropType = searchParams.get('cropType');
    const category = searchParams.get('category');
    const latitude = parseFloat(searchParams.get('latitude') || '0');
    const longitude = parseFloat(searchParams.get('longitude') || '0');
    const maxDistance = parseFloat(searchParams.get('distance') || '50');

    let providers: unknown[] = [];

    const workerProfiles = await prisma.workerProfile.findMany({
      where: {
        isAvailable: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatar: true,
            role: true,
          },
        },
      },
    });

    const equipmentProfiles = await prisma.equipmentProfile.findMany({
      where: { isAvailable: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatar: true,
            role: true,
          },
        },
      },
    });

    const transportProfiles = await prisma.transportProfile.findMany({
      where: { isAvailable: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatar: true,
            role: true,
          },
        },
      },
    });

    const allProviders: Array<{
      id: string;
      name: string | null;
      avatar: string | null;
      role: string;
      roleLabel: string;
      price: number;
      priceUnit: string;
      rating: number;
      reviewCount: number;
      distance: number;
      skills?: string[];
    }> = [
      ...workerProfiles.map((wp: typeof workerProfiles[0]) => ({
        id: wp.user.id,
        name: wp.user.name,
        avatar: wp.user.avatar,
        role: wp.user.role,
        roleLabel: 'Worker',
        price: wp.dailyWage || 500,
        priceUnit: 'day',
        rating: 4.5,
        reviewCount: 12,
        distance: latitude && longitude ? calculateDistance(latitude, longitude, 13.0827, 80.2707) : 10,
        skills: wp.skills ? wp.skills.split(',') : [],
      })),
      ...equipmentProfiles.map((ep: typeof equipmentProfiles[0]) => ({
        id: ep.user.id,
        name: ep.user.name,
        avatar: ep.user.avatar,
        role: ep.user.role,
        roleLabel: ep.equipmentType,
        price: ep.pricePerHour,
        priceUnit: 'hour',
        rating: 4.8,
        reviewCount: 8,
        distance: latitude && longitude ? calculateDistance(latitude, longitude, 13.0827, 80.2707) : 15,
      })),
      ...transportProfiles.map((tp: typeof transportProfiles[0]) => ({
        id: tp.user.id,
        name: tp.user.name,
        avatar: tp.user.avatar,
        role: tp.user.role,
        roleLabel: tp.vehicleType,
        price: tp.pricePerKm,
        priceUnit: 'km',
        rating: 4.2,
        reviewCount: 5,
        distance: latitude && longitude ? calculateDistance(latitude, longitude, 13.0827, 80.2707) : 20,
      })),
    ];

    providers = allProviders
      .filter((p) => !maxDistance || p.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    return NextResponse.json({
      providers,
      total: providers.length,
    });
  } catch (error) {
    console.error('Provider search error:', error);
    return NextResponse.json(
      { error: 'Failed to search providers' },
      { status: 500 }
    );
  }
}
