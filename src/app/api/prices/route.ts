import { NextResponse } from 'next/server';
import { getMarketData, getMacroData } from '@/lib/fetchData';

export async function GET() {
  try {
    const market = await getMarketData();
    const macro = await getMacroData();

    return NextResponse.json({
      market,
      macro,
      updatedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Prices API error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch price data' },
      { status: 500 }
    );
  }
}