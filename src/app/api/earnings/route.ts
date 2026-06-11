import { NextRequest, NextResponse } from 'next/server';
import { getProviderEarnings, requestPayout } from '@/lib/earnings';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const earnings = await getProviderEarnings(userId);
    return NextResponse.json(earnings);
  } catch (error) {
    console.error('Earnings fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch earnings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, amount, method } = await request.json();

    if (!userId || !amount || !method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const payout = await requestPayout(userId, amount, method);
    return NextResponse.json({ success: true, payout });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Payout request failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
