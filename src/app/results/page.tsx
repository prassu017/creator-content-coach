"use client";

import { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  BarChart3,
  Zap,
  Star,
  Clock,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Database,
  Loader2,
} from "lucide-react";
import { MOCK_METRICS } from "@/lib/mockData";
import Link from "next/link";

interface LiveStats {
  total_analyses: number;
  avg_score: number;
  avg_clarity: number;
  avg_engagement: number;
  avg_originality: number;
  best_score: number;
  caption_count: number;
  script_count: number;
  hook_count: number;
  live_count: number;
  demo_count: number;
}

interface StatsResponse {
  fallback: boolean;
  stats?: LiveStats;
  distribution?: { range: string; count: number }[];
  dailyActivity?: { day: string; count: number }[];
}

const ROADMAP = [
  {
    phase: "Phase 1 (Shipped)",
    status: "complete",
    items: [
      "Core analysis engine (demo + live mode)",
      "Hook generator with 5 style variants",
      "Rewrite generation (3 tones)",
      "Content scoring (clarity, engagement, originality)",
      "Hashtag suggestions and content checklist",
      "Persistent analysis history (Supabase)",
      "Run history with side-by-side comparison",
      "JSON export",
    ],
  },
  {
    phase: "Phase 2 (Next Quarter)",
    status: "active",
    items: [
      "Post-publish analytics integration",
      "Creator account onboarding and persistent profiles",
      "Batch analysis for content calendars",
      "Custom scoring weights per niche",
      "A/B hook testing with TikTok upload preview",
    ],
  },
  {
    phase: "Phase 3 (6-Month Vision)",
    status: "planned",
    items: [
      "Multi-platform support (Reels, Shorts)",
      "Team collaboration and approval workflows",
      "Personalized benchmarks by follower tier and niche",
      "TikTok Creator Tools API integration",
      "Content calendar with optimal posting schedule",
    ],
  },
];

export default function ResultsPage() {
  const [liveStats, setLiveStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const data: StatsResponse = await res.json();
        setLiveStats(data);
      } catch {
        setLiveStats({ fallback: true });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const useLive = liveStats && !liveStats.fallback && liveStats.stats;

  // Build hero metrics from live data or mock
  const heroMetrics = useLive
    ? [
        { label: "Total Analyses", value: liveStats!.stats!.total_analyses.toLocaleString(), icon: BarChart3, color: "text-brand-600", bg: "bg-brand-50" },
        { label: "Avg Score", value: String(liveStats!.stats!.avg_score), icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Best Score", value: String(liveStats!.stats!.best_score), icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Captions", value: String(liveStats!.stats!.caption_count), icon: Users, color: "text-violet-500", bg: "bg-violet-50" },
        { label: "Scripts", value: String(liveStats!.stats!.script_count), icon: Zap, color: "text-sky-500", bg: "bg-sky-50" },
        { label: "Hooks", value: String(liveStats!.stats!.hook_count), icon: Clock, color: "text-rose-500", bg: "bg-rose-50" },
      ]
    : [
        { label: "Beta Users", value: MOCK_METRICS.usersInBeta.toLocaleString(), icon: Users, color: "text-brand-600", bg: "bg-brand-50" },
        { label: "Avg Session", value: MOCK_METRICS.avgSessionTime, icon: Clock, color: "text-violet-500", bg: "bg-violet-50" },
        { label: "Content Analyzed", value: MOCK_METRICS.contentAnalyzed.toLocaleString(), icon: BarChart3, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Avg Score Lift", value: MOCK_METRICS.avgScoreImprovement, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Retention (D7)", value: MOCK_METRICS.retentionRate, icon: Star, color: "text-rose-500", bg: "bg-rose-50" },
        { label: "NPS", value: String(MOCK_METRICS.npsScore), icon: Zap, color: "text-sky-500", bg: "bg-sky-50" },
      ];

  const distribution = useLive && liveStats!.distribution
    ? liveStats!.distribution!
    : MOCK_METRICS.scoreDistribution;
  const maxDist = Math.max(...distribution.map((d) => d.count), 1);

  const dailyActivity = useLive && liveStats!.dailyActivity?.length
    ? liveStats!.dailyActivity!
    : MOCK_METRICS.weeklyActiveUsers.map((w) => ({ day: w.week, count: w.users }));
  const maxDaily = Math.max(...dailyActivity.map((d) => d.count), 1);

  return (
    <div className="bg-white">
      <div className="bg-surface-50 border-b border-surface-200">
        <div className="container-narrow py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-brand inline-block">Impact &amp; Roadmap</span>
            {useLive && (
              <span className="flex items-center gap-1.5 text-[10px] font-display font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <Database className="w-3 h-3" />
                Live Data
              </span>
            )}
            {!useLive && !loading && (
              <span className="text-[10px] font-display font-semibold text-ink-300 bg-surface-100 px-2.5 py-1 rounded-full">
                Mock Data (connect Supabase for live)
              </span>
            )}
          </div>
          <h1 className="section-heading text-4xl mb-3">
            {useLive ? "Live Analytics" : "Beta Results"} &amp; Future Vision
          </h1>
          <p className="section-subheading">
            {useLive
              ? "Real-time metrics from all analyses stored in the database."
              : "Realistic mock metrics from an 8-week beta with 2,847 creators, plus the product roadmap ahead."}
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-ink-300">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading metrics...
          </div>
        ) : (
          <>
            {/* Hero Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
              {heroMetrics.map((m) => (
                <div key={m.label} className="card text-center">
                  <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center mx-auto mb-3`}>
                    <m.icon className={`w-5 h-5 ${m.color}`} />
                  </div>
                  <p className="font-display font-bold text-2xl text-ink-900">{m.value}</p>
                  <p className="text-xs text-ink-300 font-medium uppercase tracking-wide mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Activity Chart */}
              <div className="card">
                <h3 className="font-display font-bold text-ink-900 mb-1">
                  {useLive ? "Daily Activity (Last 14 Days)" : "Weekly Active Users"}
                </h3>
                <p className="text-xs text-ink-300 mb-6">
                  {useLive ? "Analyses per day" : "8-week beta growth trajectory"}
                </p>
                <div className="flex items-end gap-2 h-48">
                  {dailyActivity.map((w, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                      <span className="text-[9px] font-display font-bold text-ink-700 truncate w-full text-center">
                        {w.count}
                      </span>
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-brand-500 to-brand-400 transition-all duration-500 min-h-[4px]"
                        style={{ height: `${Math.max((w.count / maxDaily) * 100, 3)}%` }}
                      />
                      <span className="text-[8px] text-ink-300 truncate w-full text-center">{w.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score Distribution */}
              <div className="card">
                <h3 className="font-display font-bold text-ink-900 mb-1">Score Distribution</h3>
                <p className="text-xs text-ink-300 mb-6">Distribution of overall content scores</p>
                <div className="flex items-end gap-3 h-48">
                  {distribution.map((d) => (
                    <div key={d.range} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] font-display font-bold text-ink-700">{d.count}</span>
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all duration-500 min-h-[4px]"
                        style={{ height: `${Math.max((d.count / maxDist) * 100, 3)}%` }}
                      />
                      <span className="text-[10px] text-ink-300">{d.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Score Averages (only when DB is connected) */}
            {useLive && (
              <div className="card bg-brand-50 border-brand-200 mb-16">
                <h3 className="font-display font-bold text-ink-900 mb-4">Score Averages Across All Analyses</h3>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: "Clarity", value: liveStats!.stats!.avg_clarity },
                    { label: "Engagement", value: liveStats!.stats!.avg_engagement },
                    { label: "Originality", value: liveStats!.stats!.avg_originality },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-display font-bold text-3xl text-ink-900">{s.value}</p>
                      <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feature Usage (mock only, since we don't track feature clicks in DB yet) */}
            {!useLive && (
              <div className="card mb-16">
                <h3 className="font-display font-bold text-ink-900 mb-1">Feature Usage Breakdown</h3>
                <p className="text-xs text-ink-300 mb-6">Percentage of users engaging with each feature</p>
                <div className="space-y-4">
                  {MOCK_METRICS.topFeatureUsage.map((f) => (
                    <div key={f.feature} className="flex items-center gap-4">
                      <span className="text-sm font-medium text-ink-700 w-40 flex-shrink-0">{f.feature}</span>
                      <div className="flex-1 h-6 bg-surface-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-700 flex items-center justify-end pr-3"
                          style={{ width: `${f.pct}%` }}
                        >
                          <span className="text-[10px] font-bold text-white">{f.pct}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Insights */}
            <div className="card bg-brand-50 border-brand-200 mb-16">
              <h3 className="font-display font-bold text-ink-900 mb-4">
                {useLive ? "Product Insights" : "Key Insights from Beta"}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Users who analyzed content 3+ times per session saw an average score improvement of 22 points across versions.",
                  "Hook Generator was the most used feature (89%), suggesting creators value top-of-funnel optimization most.",
                  "Version Comparison had the lowest adoption (52%) but highest correlation with retention, indicating it is a power-user signal.",
                  "73% of users returned within 7 days. Among those who used comparison, the 7-day return rate was 91%.",
                ].map((insight, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-brand-200 text-brand-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-ink-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-violet-500" />
                </div>
                <h2 className="text-2xl font-display font-bold text-ink-900">Product Roadmap</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {ROADMAP.map((phase) => (
                  <div key={phase.phase} className="card">
                    <div className="flex items-center gap-2 mb-4">
                      {phase.status === "complete" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : phase.status === "active" ? (
                        <Zap className="w-5 h-5 text-amber-500" />
                      ) : (
                        <Calendar className="w-5 h-5 text-ink-300" />
                      )}
                      <h3 className="font-display font-bold text-ink-900 text-sm">{phase.phase}</h3>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-ink-700">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            phase.status === "complete" ? "bg-emerald-400" : phase.status === "active" ? "bg-amber-400" : "bg-ink-300"
                          }`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <div className="text-center">
              <Link href="/demo" className="btn-primary text-base px-8 py-4">
                Try the Live Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
