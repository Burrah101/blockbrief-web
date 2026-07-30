import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { buildNewsletterEmail } from "@/lib/emailTemplate";
import { sendNewsletter } from "@/lib/sendNewsletter";

export async function POST() {
  try {
    // Send the latest PUBLISHED newsletter only
    const { data: newsletter, error: newsletterError } = await supabaseAdmin
      .from("newsletters")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (newsletterError || !newsletter) {
      return NextResponse.json(
        {
          error: "No published newsletter found.",
        },
        {
          status: 404,
        }
      );
    }

    // Active subscribers
    const { data: subscribers, error: subscriberError } =
      await supabaseAdmin
        .from("subscribers")
        .select("email")
        .eq("unsubscribed", false);

    if (subscriberError) {
      return NextResponse.json(
        {
          error: subscriberError.message,
        },
        {
          status: 500,
        }
      );
    }

    const emails = subscribers.map((s) => s.email);

    if (emails.length === 0) {
      return NextResponse.json(
        {
          error: "No active subscribers.",
        },
        {
          status: 400,
        }
      );
    }

    const html = buildNewsletterEmail({
      title: newsletter.title,
      summary: newsletter.summary,
      market_pulse: newsletter.market_pulse,
      headlines: newsletter.headlines,
    });

    const result = await sendNewsletter({
      to: emails,
      subject: newsletter.title,
      html,
    });

    return NextResponse.json({
      success: true,
      newsletterId: newsletter.id,
      sent: emails.length,
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to send newsletter.",
      },
      {
        status: 500,
      }
    );
  }
}