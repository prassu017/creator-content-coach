import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const { data, error } = await supabase
      .from("analyses")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    // Reconstruct AnalysisResult shape from DB row
    const result = {
      id: data.id,
      timestamp: data.created_at,
      inputContent: data.input_content,
      contentType: data.content_type,
      scores: {
        clarity: data.score_clarity,
        engagement: data.score_engagement,
        originality: data.score_originality,
        overall: data.score_overall,
      },
      ...data.result_json,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Fetch analysis error:", err);
    return NextResponse.json({ error: "Failed to fetch analysis" }, { status: 500 });
  }
}
