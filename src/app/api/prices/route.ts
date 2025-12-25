import { NextResponse } from 'next/server';
import { getPrices } from '@/lib/fetchPrices';

export async function GET() {
    const prices = await getPrices();
    if (!prices) {
        return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
    }
    return NextResponse.json(prices);
}
