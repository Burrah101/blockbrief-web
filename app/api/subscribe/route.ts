// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";

// TODO: replace this with your actual Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/myzlvala";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toString().trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Forward the email to Formspree
    const fsRes = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        // You can add more fields if you like:
        source: "blockbrief.io",
      }),
    });

    if (!fsRes.ok) {
      console.error("Formspree error:", await fsRes.text());
      return NextResponse.json(
        {
          ok: false,
          message:
            "We couldn't save your email right now. Please try again in a moment.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { ok: true, message: "Thanks! You’re on the list. 💙" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
