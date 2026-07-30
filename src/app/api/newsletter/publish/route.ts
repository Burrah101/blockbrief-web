import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          error: "Newsletter ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Verify the draft exists
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("newsletters")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        {
          error: "Newsletter not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Optional safety check
    if (existing.status === "published") {
      return NextResponse.json({
        success: true,
        newsletter: existing,
        message: "Newsletter is already published.",
      });
    }

    // Publish this draft
    const { data: published, error: publishError } = await supabaseAdmin
      .from("newsletters")
      .update({
        status: "published",
      })
      .eq("id", id)
      .select()
      .single();

    if (publishError) {
      return NextResponse.json(
        {
          error: publishError.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      newsletter: published,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Unable to publish newsletter.",
      },
      {
        status: 500,
      }
    );
  }
}