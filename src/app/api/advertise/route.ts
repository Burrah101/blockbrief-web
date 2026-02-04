import { NextResponse } from 'next/server';

// In production, this would connect to a database or CRM
// For now, we store in memory and log
const inquiries: Array<{
  id: string;
  company: string;
  email: string;
  budget: string;
  message: string;
  submittedAt: Date;
  status: 'new' | 'contacted' | 'active' | 'declined';
}> = [];

function generateId(): string {
  return `adv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, email, budget, message } = body;

    // Validate required fields
    if (!company || !email || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create inquiry
    const inquiry = {
      id: generateId(),
      company,
      email,
      budget,
      message: message || '',
      submittedAt: new Date(),
      status: 'new' as const,
    };

    inquiries.push(inquiry);

    console.log(`New advertiser inquiry from ${company} (${email}) - Budget: ${budget}`);

    // In production, send notification email to sales team
    // await sendNotificationEmail(inquiry);

    return NextResponse.json({
      message: 'Inquiry submitted successfully',
      id: inquiry.id,
    });
  } catch (error) {
    console.error('Advertiser inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return inquiry count and stats (for admin dashboard)
  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    active: inquiries.filter(i => i.status === 'active').length,
    totalBudget: inquiries.reduce((sum, i) => {
      const match = i.budget.match(/\$?([\d,]+)/);
      return sum + (match ? parseInt(match[1].replace(',', '')) : 0);
    }, 0),
  };

  return NextResponse.json(stats);
}
