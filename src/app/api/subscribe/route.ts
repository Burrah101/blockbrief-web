import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const { error } = await supabase
      .from("subscribers")
      .insert({
        email: cleanEmail,
      });

    if (error) {
      console.error("Supabase error:", error);

      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Already subscribed." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Welcome to BlockBrief!",
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}