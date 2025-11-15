// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toString().trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, message: "Invalid email" },
        { status: 400 }
      );
    }

    // For now we just log it. Later we can plug this into Supabase, Notion, Sheets, etc.
    console.log("📨 New BlockBrief subscriber:", email);

    return NextResponse.json(
      { ok: true, message: "Thanks! You’re on the list." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
