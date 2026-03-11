"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Sparkles,
  Zap,
  RefreshCw,
  Hash,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Copy,
  Download,
  Clock,
  ArrowLeftRight,
  Loader2,
  Lightbulb,
  ListChecks,
  LayoutList,
  Database,
} from "lucide-react";
import { ScoreRing } from "@/components/ScoreRing";
import { EXAMPLE_INPUTS } from "@/lib/mockData";
import type { AnalysisResult, HistoryEntry } from "@/lib/types";

type Tab = "scores" | "hooks" | "rewrites" | "structure" | "hashtags" | "checklist";

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "scores", label: "Scores", icon: Sparkles },
  { key: "hooks", label: "Hooks", icon: Zap },
  { key: "rewrites", label: "Rewrites", icon: RefreshCw },
  { key: "structure", label: "Structure", icon: LayoutList },
  { key: "hashtags", label: "Hashtags", icon: Hash },
  { key: "checklist", label: "Checklist", icon: ListChecks },
];

const STYLE_COLORS: Record<string, string> = {
  question: "bg-sky-50 text-sky-700 border-sky-200",
  statistic: "bg-amber-50 text-amber-700 border-amber-200",
  story: "bg-violet-50 text-violet-700 border-violet-200",
  "bold-claim": "bg-rose-50 text-rose-700 border-rose-200",
  contrast: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

interface DBHistoryItem {
  id: string;
  created_at: string;
  input_content: string;
  content_type: string;
  score_overall: number;
  score_clarity: number;
  score_engagement: number;
  score_originality: number;
}

export default function DemoPage() {
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<"caption" | "script" | "hook">("caption");
  const [mode, setMode] = useState<"demo" | "live">("demo");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("scores");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [compareResult, setCompareResult] = useState<AnalysisResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [allResults, setAllResults] = useState<Map<string, AnalysisResult>>(new Map());
  const [copied, setCopied] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Load persistent history from DB on mount
  useEffect(() => {
    async function loadHistory() {
      setLoadingHistory(true);
      try {
        const res = await fetch("/api/history?limit=30");
        const json = await res.json();
        if (!json.fallback && json.data?.length > 0) {
          setDbConnected(true);
          const entries: HistoryEntry[] = json.data.map((row: DBHistoryItem) => ({
            id: row.id,
            timestamp: row.created_at,
            preview: row.input_content.slice(0, 60) + (row.input_content.length > 60 ? "..." : ""),
            scores: {
              clarity: row.score_clarity,
              engagement: row.score_engagement,
              originality: row.score_originality,
              overall: row.score_overall,
            },
          }));
          setHistory(entries);
        }
      } catch {
        // DB not available, that's fine
      } finally {
        setLoadingHistory(false);
      }
    }
    loadHistory();
  }, []);

  const analyze = useCallback(async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), contentType, mode }),
      });
      const data: AnalysisResult = await res.json();
      if (res.ok) {
        setResult(data);
        setActiveTab("scores");
        setCompareResult(null);
        setAllResults((prev) => new Map(prev).set(data.id, data));
        setHistory((prev) => [
          { id: data.id, timestamp: data.timestamp, preview: content.trim().slice(0, 60) + "...", scores: data.scores },
          ...prev.slice(0, 29),
        ]);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [content, contentType, mode]);

  const loadExample = (idx: number) => {
    const ex = EXAMPLE_INPUTS[idx];
    setContent(ex.text);
    setContentType(ex.contentType);
  };

  const selectCompare = async (id: string) => {
    if (id === result?.id) return;

    // Check local cache first
    const cached = allResults.get(id);
    if (cached) {
      setCompareResult(cached);
      return;
    }

    // Try fetching from DB
    try {
      const res = await fetch(`/api/history/${id}`);
      if (res.ok) {
        const data: AnalysisResult = await res.json();
        setAllResults((prev) => new Map(prev).set(id, data));
        setCompareResult(data);
      }
    } catch {
      // silent
    }
  };

  const exportJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `content-analysis-${result.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyOutput = () => {
    if (!result) return;
    const text = [
      `Content Score: ${result.scores.overall}/100`,
      `Clarity: ${result.scores.clarity} | Engagement: ${result.scores.engagement} | Originality: ${result.scores.originality}`,
      "",
      "Hooks:",
      ...result.hooks.map((h) => `  [${h.style}] ${h.text}`),
      "",
      "Hashtags: " + result.hashtags.join(" "),
      "",
      "Recommendations:",
      ...result.recommendations.map((r) => `  - ${r}`),
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <div className="bg-white border-b border-surface-200">
        <div className="container-wide py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="section-heading text-3xl mb-1">Content Analyzer</h1>
              <p className="text-ink-500">Paste your content, get AI-powered analysis and optimization suggestions.</p>
            </div>
            <div className="flex items-center gap-3">
              {dbConnected && (
                <span className="flex items-center gap-1.5 text-[10px] font-display font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <Database className="w-3 h-3" />
                  DB Connected
                </span>
              )}
              <div className="flex items-center gap-2 bg-surface-100 rounded-lg p-1">
                <button
                  onClick={() => setMode("demo")}
                  className={`px-3 py-1.5 rounded-md text-xs font-display font-semibold transition-all ${
                    mode === "demo" ? "bg-white shadow text-brand-600" : "text-ink-500 hover:text-ink-700"
                  }`}
                >
                  Demo Mode
                </button>
                <button
                  onClick={() => setMode("live")}
                  className={`px-3 py-1.5 rounded-md text-xs font-display font-semibold transition-all ${
                    mode === "live" ? "bg-white shadow text-brand-600" : "text-ink-500 hover:text-ink-700"
                  }`}
                >
                  Live Mode
                </button>
              </div>
              {history.length > 0 && (
                <button onClick={() => setShowHistory(!showHistory)} className="btn-ghost gap-1.5">
                  <Clock className="w-4 h-4" />
                  History ({history.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="card">
              <label className="block text-sm font-display font-semibold text-ink-700 mb-2">Content Type</label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(["caption", "script", "hook"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setContentType(t)}
                    className={`py-2 rounded-lg text-sm font-display font-medium transition-all border ${
                      contentType === t
                        ? "bg-brand-50 border-brand-300 text-brand-700"
                        : "bg-white border-surface-200 text-ink-500 hover:border-surface-300"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <label className="block text-sm font-display font-semibold text-ink-700 mb-2">Your Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your TikTok caption, script, or hook here..."
                className="input-field min-h-[200px] resize-y text-sm"
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-ink-300">{content.length}/5000 characters</span>
                <span className="text-xs text-ink-300">{content.split(/\s+/).filter(Boolean).length} words</span>
              </div>

              <button
                onClick={analyze}
                disabled={loading || !content.trim()}
                className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" /> Analyze Content
                  </>
                )}
              </button>
            </div>

            {/* Examples */}
            <div className="card">
              <p className="text-sm font-display font-semibold text-ink-700 mb-3">Try an example</p>
              <div className="space-y-2">
                {EXAMPLE_INPUTS.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => loadExample(i)}
                    className="w-full text-left px-3 py-2.5 rounded-lg border border-surface-200 hover:border-brand-300 hover:bg-brand-50/50 transition-all group"
                  >
                    <span className="text-xs font-display font-semibold text-brand-600 uppercase tracking-wide">
                      {ex.label}
                    </span>
                    <p className="text-xs text-ink-500 mt-0.5 line-clamp-2">{ex.text}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* History Panel */}
            {showHistory && (
              <div className="card">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-display font-semibold text-ink-700">
                    Run History
                    {dbConnected && <span className="text-[10px] text-ink-300 ml-1">(from database)</span>}
                  </p>
                  <button onClick={() => setShowHistory(false)} className="text-ink-300 hover:text-ink-500">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                {loadingHistory ? (
                  <div className="flex items-center justify-center py-6 text-ink-300 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading history...
                  </div>
                ) : history.length === 0 ? (
                  <p className="text-xs text-ink-300 py-4 text-center">No analyses yet. Run one to see it here.</p>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {history.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => selectCompare(h.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                          compareResult?.id === h.id
                            ? "border-brand-300 bg-brand-50"
                            : "border-surface-200 hover:border-surface-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-ink-700 font-medium truncate max-w-[200px]">{h.preview}</span>
                          <span className="font-display font-bold text-brand-600">{h.scores.overall}</span>
                        </div>
                        <span className="text-ink-300 text-[10px]">
                          {new Date(h.timestamp).toLocaleString()}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Output Panel */}
          <div>
            {!result ? (
              <div className="card flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-ink-300" />
                </div>
                <h3 className="font-display font-bold text-lg text-ink-700 mb-2">No analysis yet</h3>
                <p className="text-sm text-ink-500 max-w-sm">
                  Paste your content on the left and click Analyze to get AI-powered scoring, hook ideas, rewrite variants, and more.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Tab Bar */}
                <div className="card p-2">
                  <div className="flex gap-1 overflow-x-auto">
                    {TABS.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-display font-medium whitespace-nowrap transition-all ${
                          activeTab === tab.key
                            ? "bg-brand-50 text-brand-700"
                            : "text-ink-500 hover:text-ink-700 hover:bg-surface-100"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-2 justify-end">
                  <button onClick={copyOutput} className="btn-ghost text-xs gap-1.5">
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button onClick={exportJSON} className="btn-ghost text-xs gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    Export JSON
                  </button>
                  {history.length > 1 && (
                    <button
                      onClick={() => setShowHistory(true)}
                      className="btn-ghost text-xs gap-1.5"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      Compare
                    </button>
                  )}
                </div>

                {/* Tab Content */}
                <div className="card">
                  {activeTab === "scores" && (
                    <div>
                      <div className={`grid ${compareResult ? "grid-cols-2 divide-x divide-surface-200" : ""}`}>
                        <ScoresPanel result={result} label={compareResult ? "Current" : undefined} />
                        {compareResult && <ScoresPanel result={compareResult} label="Previous" />}
                      </div>
                      {result.recommendations.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-surface-200">
                          <h4 className="text-sm font-display font-bold text-ink-700 mb-3">Recommendations</h4>
                          <div className="space-y-2">
                            {result.recommendations.map((rec, i) => (
                              <div key={i} className="flex gap-3 text-sm text-ink-700">
                                <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                {rec}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "hooks" && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-display font-bold text-ink-700 mb-1">Hook Variants</h4>
                      <p className="text-xs text-ink-500 mb-4">Five approaches to stop the scroll. Pick the style that fits your voice.</p>
                      {result.hooks.map((hook, i) => (
                        <div
                          key={i}
                          className={`p-4 rounded-xl border ${STYLE_COLORS[hook.style] || "bg-surface-50 text-ink-700 border-surface-200"}`}
                        >
                          <span className="text-[10px] font-display font-bold uppercase tracking-wider opacity-70">{hook.style}</span>
                          <p className="mt-1 text-sm font-medium">{hook.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "rewrites" && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-display font-bold text-ink-700 mb-1">Rewrite Variants</h4>
                      <p className="text-xs text-ink-500 mb-4">Same message, different energy. Test which tone resonates with your audience.</p>
                      {result.rewrites.map((rw, i) => (
                        <div key={i} className="p-4 rounded-xl bg-surface-50 border border-surface-200">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="badge-brand text-[10px]">{rw.label}</span>
                            <span className="text-[10px] text-ink-300">{rw.tone}</span>
                          </div>
                          <p className="text-sm text-ink-700 leading-relaxed">{rw.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "structure" && (
                    <div>
                      <h4 className="text-sm font-display font-bold text-ink-700 mb-1">Suggested Structure</h4>
                      <p className="text-xs text-ink-500 mb-4">A step-by-step flow optimized for this content type.</p>
                      <div className="space-y-3">
                        {result.structure.map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">
                                {i + 1}
                              </div>
                              {i < result.structure.length - 1 && (
                                <div className="w-px h-full bg-surface-200 my-1" />
                              )}
                            </div>
                            <p className="text-sm text-ink-700 pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "hashtags" && (
                    <div>
                      <h4 className="text-sm font-display font-bold text-ink-700 mb-1">Suggested Hashtags</h4>
                      <p className="text-xs text-ink-500 mb-4">A curated mix of broad-reach and niche-discovery tags.</p>
                      <div className="flex flex-wrap gap-2">
                        {result.hashtags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 rounded-full bg-surface-100 border border-surface-200 text-sm font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50 cursor-pointer transition-all"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "checklist" && (
                    <div>
                      <h4 className="text-sm font-display font-bold text-ink-700 mb-1">Content Checklist</h4>
                      <p className="text-xs text-ink-500 mb-4">Quality gates to pass before you hit post.</p>
                      <div className="space-y-3">
                        {result.checklist.map((item, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-xl border flex gap-3 ${
                              item.passed ? "bg-emerald-50/50 border-emerald-200" : "bg-red-50/50 border-red-200"
                            }`}
                          >
                            {item.passed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p className="text-sm font-medium text-ink-900">{item.label}</p>
                              <p className="text-xs text-ink-500 mt-0.5">{item.tip}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoresPanel({ result, label }: { result: AnalysisResult; label?: string }) {
  return (
    <div className={label ? "px-6 py-2" : ""}>
      {label && <p className="text-xs font-display font-bold text-ink-300 uppercase tracking-wide mb-4">{label}</p>}
      <div className="flex items-center gap-8 justify-center mb-6">
        <ScoreRing score={result.scores.overall} label="Overall" size="lg" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ScoreRing score={result.scores.clarity} label="Clarity" size="sm" />
        <ScoreRing score={result.scores.engagement} label="Engagement" size="sm" />
        <ScoreRing score={result.scores.originality} label="Originality" size="sm" />
      </div>
    </div>
  );
}
