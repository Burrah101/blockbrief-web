import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generateNewsletter } from "@/lib/generateNewsletter";

export async function GET() {
  try {
    const newsletter = await generateNewsletter();

    const { data, error } = await supabaseAdmin
      .from("newsletters")
      .insert({
        title: newsletter.title,
        summary: newsletter.summary,
        market_pulse: newsletter.marketPulse,
        headlines: newsletter.headlines,
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      ...newsletter,
      id: data.id,
      status: data.status,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Unable to generate newsletter." },
      { status: 500 }
    );
  }
}