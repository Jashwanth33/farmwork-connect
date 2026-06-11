import { NextRequest, NextResponse } from 'next/server';
import { getMandiPrices, getCommodityHistory, getMarketTrends, COMMODITIES } from '@/lib/market/mandi';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district');
    const commodity = searchParams.get('commodity');
    const history = searchParams.get('history');
    const trends = searchParams.get('trends');

    if (history && commodity) {
      const data = await getCommodityHistory(commodity);
      return NextResponse.json({ history: data });
    }

    if (trends === 'true') {
      const data = await getMarketTrends();
      return NextResponse.json({ trends: data });
    }

    const prices = await getMandiPrices(district || undefined, commodity || undefined);
    return NextResponse.json({ prices, commodities: COMMODITIES });
  } catch (error) {
    console.error('Mandi API error:', error);
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
}
