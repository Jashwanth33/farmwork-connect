import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '13.0827');
    const lon = parseFloat(searchParams.get('lon') || '80.2707');
    const type = searchParams.get('type') || 'current';
    const cropType = searchParams.get('cropType');
    const days = parseInt(searchParams.get('days') || '7');

    const { getCurrentWeather, getForecast, getWeatherAlerts, getCropRecommendations } = await import('@/lib/weather');

    if (type === 'forecast') {
      const forecast = await getForecast(lat, lon, days);
      return NextResponse.json({ forecast });
    }

    if (type === 'alerts') {
      const alerts = await getWeatherAlerts(lat, lon);
      return NextResponse.json({ alerts });
    }

    if (type === 'recommendations' && cropType) {
      const weather = await getCurrentWeather(lat, lon);
      const recommendations = getCropRecommendations(cropType, weather);
      return NextResponse.json({ recommendations, weather });
    }

    const weather = await getCurrentWeather(lat, lon);
    return NextResponse.json({ weather });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}
