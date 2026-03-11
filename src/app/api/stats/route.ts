import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ fallback: true });
  }

  try {
    // Fetch aggregate stats from the view
    const { data: stats, error: statsError } = await supabase
      .from("analysis_stats")
      .select("*")
      .single();

    if (statsError) {
      console.error("Stats fetch error:", statsError.message);
      return NextResponse.json({ fallback: true });
    }

    // Fetch score distribution (buckets)
    const { data: analyses } = await supabase
      .from("analyses")
      .select("score_overall");

    const distribution = [
      { range: "0-20", count: 0 },
      { range: "21-40", count: 0 },
      { range: "41-60", count: 0 },
      { range: "61-80", count: 0 },
      { range: "81-100", count: 0 },
    ];

    if (analyses) {
      for (const row of analyses) {
        const s = row.score_overall;
        if (s <= 20) distribution[0].count++;
        else if (s <= 40) distribution[1].count++;
        else if (s <= 60) distribution[2].count++;
        else if (s <= 80) distribution[3].count++;
        else distribution[4].count++;
      }
    }

    // Fetch recent analyses for a "growth" chart (count per day, last 14 days)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const { data: recent } = await supabase
      .from("analyses")
      .select("created_at")
      .gte("created_at", fourteenDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    const dailyCounts: Record<string, number> = {};
    if (recent) {
      for (const row of recent) {
        const day = new Date(row.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        dailyCounts[day] = (dailyCounts[day] || 0) + 1;
      }
    }
    const dailyActivity = Object.entries(dailyCounts).map(([day, count]) => ({ day, count }));

    return NextResponse.json({
      fallback: false,
      stats,
      distribution,
      dailyActivity,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json({ fallback: true });
  }
}
