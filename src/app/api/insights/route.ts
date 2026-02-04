import { NextResponse } from 'next/server';
import { getMarketData, getBuilderActivity, getDefiData, getWhaleActivity } from '@/lib/fetchData';
import { generateAllInsights } from '@/lib/generateInsights';

export async function GET() {
  try {
    // Fetch all data sources in parallel
    const [market, builders, defi, whales] = await Promise.all([
      getMarketData(),
      getBuilderActivity(),
      getDefiData(),
      getWhaleActivity(),
    ]);

    // Generate insights from data
    const insights = await generateAllInsights({
      market: market || undefined,
      builders: builders || undefined,
      defi: defi || undefined,
      whales: whales || undefined,
    });

    return NextResponse.json({
      insights,
      lastUpdate: new Date().toISOString(),
      sources: {
        market: !!market,
        builders: !!builders,
        defi: !!defi,
        whales: !!whales,
      },
    });
  } catch (error) {
    console.error('Error generating insights:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
