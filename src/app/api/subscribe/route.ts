import { NextResponse } from 'next/server';

// In production, this would connect to a database or email service
// For now, we store in memory and log (would use Supabase in production)
const subscribers: Map<string, { email: string; subscribedAt: Date; referralCode: string; referredBy?: string }> = new Map();

function generateReferralCode(): string {
  return `BB${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, referredBy } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.has(email)) {
      const existing = subscribers.get(email);
      return NextResponse.json({
        message: 'Already subscribed',
        referralCode: existing?.referralCode,
      });
    }

    // Create new subscriber
    const referralCode = generateReferralCode();
    const subscriber = {
      email,
      subscribedAt: new Date(),
      referralCode,
      referredBy,
    };

    subscribers.set(email, subscriber);

    // If referred, increment referrer's count (in production, update database)
    if (referredBy) {
      console.log(`New referral from code: ${referredBy}`);
    }

    console.log(`New subscriber: ${email} with code ${referralCode}`);

    return NextResponse.json({
      message: 'Successfully subscribed',
      referralCode,
      subscriberCount: subscribers.size + 10847, // Base count + new
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return subscriber count for social proof
  return NextResponse.json({
    count: subscribers.size + 10847,
  });
}
