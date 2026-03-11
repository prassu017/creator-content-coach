import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ data: [], fallback: true });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    const { data, error, count } = await supabase
      .from("analyses")
      .select("id, created_at, input_content, content_type, mode, word_count, score_clarity, score_engagement, score_originality, score_overall", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("History fetch error:", error.message);
      return NextResponse.json({ data: [], fallback: true });
    }

    return NextResponse.json({ data, total: count, fallback: false });
  } catch (err) {
    console.error("History error:", err);
    return NextResponse.json({ data: [], fallback: true });
  }
}
