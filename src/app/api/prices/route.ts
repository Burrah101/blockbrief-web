import { NextResponse } from 'next/server';
import { getPrices, getMarketData, getGlobalMetrics } from '@/lib/fetchData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const extended = searchParams.get('extended') === 'true';

  if (extended) {
    // Return extended market data
    const [marketData, globalMetrics] = await Promise.all([
      getMarketData(),
      getGlobalMetrics(),
    ]);

    if (!marketData) {
      return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
    }

    return NextResponse.json({
      assets: marketData,
      global: globalMetrics,
      timestamp: new Date().toISOString(),
    });
  }

  // Return simple prices for backward compatibility
  const prices = await getPrices();
  if (!prices) {
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
  return NextResponse.json(prices);
}
