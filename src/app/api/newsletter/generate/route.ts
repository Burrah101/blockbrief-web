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

        // NEW
        ecosystems: newsletter.ecosystems,
        builder_opportunities: newsletter.builderOpportunities,
        macro: newsletter.macro,

        status: "draft",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      id: data.id,
      status: data.status,

      title: newsletter.title,
      date: newsletter.date,

      marketPulse: newsletter.marketPulse,
      summary: newsletter.summary,

      headlines: newsletter.headlines,

      // NEW
      ecosystems: newsletter.ecosystems,
      builderOpportunities: newsletter.builderOpportunities,
      macro: newsletter.macro,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Unable to generate newsletter." },
      { status: 500 }
    );
  }
}