"use client";

import { useEffect, useRef, useState } from "react";
import { Layers, GitBranch, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DesignPage() {
  return (
    <div className="bg-white">
      <div className="bg-surface-50 border-b border-surface-200">
        <div className="container-narrow py-12">
          <span className="badge-brand mb-4 inline-block">Design Artifacts</span>
          <h1 className="section-heading text-4xl mb-3">Wireframes &amp; User Flows</h1>
          <p className="section-subheading">
            Low-fidelity wireframes and user journey diagrams that guided the product from concept to implementation.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        {/* Wireframes */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
              <Layers className="w-5 h-5 text-violet-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink-900">Wireframes</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <WireframeCard
              title="Landing Page"
              description="Hero section with value proposition, CTA buttons, stats bar showing key metrics, and a 3x2 feature grid. Goal: communicate what the tool does in under 5 seconds and drive users to the demo."
            >
              <WireframeLanding />
            </WireframeCard>

            <WireframeCard
              title="Demo / Analyzer Page"
              description="Two-column layout: input panel (left) with content type selector, text area, and analyze button; output panel (right) with tabbed results. Designed for rapid iteration without page reloads."
            >
              <WireframeDemo />
            </WireframeCard>

            <WireframeCard
              title="Results / Metrics Page"
              description="Dashboard layout with KPI cards at top, bar charts for growth and distribution, horizontal progress bars for feature usage, and a 3-column roadmap. Built to tell a data story during the demo."
            >
              <WireframeResults />
            </WireframeCard>

            <WireframeCard
              title="Comparison View"
              description="Side-by-side score panels let users compare two analysis runs. Each version shows the overall score ring and per-dimension bars, with a delta summary at the bottom showing improvement."
            >
              <WireframeComparison />
            </WireframeCard>
          </div>
        </div>

        {/* User Flows */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink-900">User Flows</h2>
          </div>

          <div className="space-y-10">
            <MermaidDiagram
              title="Core Analysis Flow"
              description="The primary user journey from landing to export. New users read the overview first; returning users go straight to the demo. The key loop is analyze, review, edit, re-analyze until the user is satisfied."
              chart={`graph LR
    A[Open App] --> B[Landing Page]
    B --> C{New or Returning?}
    C -->|New| D[Read Overview]
    C -->|Returning| E[Go to Demo]
    D --> E
    E --> F[Select Content Type]
    F --> G[Paste Content]
    G --> H[Click Analyze]
    H --> I[View Scores]
    I --> J{Satisfied?}
    J -->|No| K[Review Recommendations]
    K --> L[Edit Content]
    L --> H
    J -->|Yes| M[Export / Copy]
    M --> N[Compare Versions]
    style A fill:#e0effe,stroke:#026bc7
    style M fill:#d1fae5,stroke:#059669
    style H fill:#fef3c7,stroke:#d97706`}
            />

            <MermaidDiagram
              title="Feature Discovery Flow"
              description="How users explore the six output tabs. Low-scoring content triggers the recommendation path (hooks, rewrites, structure, checklist). High-scoring content leads to lighter exploration before export."
              chart={`graph TD
    A[Scores Tab] --> B{Score < 60?}
    B -->|Yes| C[Read Recommendations]
    C --> D[Try Hook Variants]
    D --> E[Pick Rewrite]
    E --> F[Check Structure]
    F --> G[Run Checklist]
    G --> H[Re-analyze]
    B -->|No| I[Explore Hooks]
    I --> J[Copy Hashtags]
    J --> K[Export & Post]
    style A fill:#e0effe,stroke:#026bc7
    style K fill:#d1fae5,stroke:#059669
    style H fill:#fef3c7,stroke:#d97706`}
            />

            <MermaidDiagram
              title="Comparison and Iteration Flow"
              description="The version tracking loop. Each analysis is saved to the database and appears in the history panel. Users select any two runs for side-by-side comparison, driving iterative improvement."
              chart={`graph LR
    A[First Analysis] --> B[Save to History]
    B --> C[Edit Content]
    C --> D[Re-analyze]
    D --> E[Save V2 to History]
    E --> F[Open Compare View]
    F --> G[Side-by-Side Scores]
    G --> H{Improvement?}
    H -->|Yes| I[Export Final]
    H -->|No| C
    style A fill:#e0effe,stroke:#026bc7
    style I fill:#d1fae5,stroke:#059669`}
            />
          </div>
        </div>

        <div className="text-center">
          <Link href="/tech" className="btn-primary text-base px-8 py-4">
            View Technical Architecture
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ===== Wireframe Card Wrapper ===== */

function WireframeCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="card border-2 border-surface-200">
      <p className="text-xs font-display font-bold text-brand-600 uppercase tracking-wider mb-4">{title}</p>
      {children}
      <p className="text-sm text-ink-500 mt-4 leading-relaxed border-t border-surface-200 pt-4">{description}</p>
    </div>
  );
}

/* ===== Wireframe Components (with darker, more visible styling) ===== */

function WireframeLanding() {
  return (
    <div className="bg-gray-100 rounded-xl p-5 space-y-3 border-2 border-gray-300">
      {/* Nav */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-blue-400" />
        <div className="h-3 w-20 rounded bg-gray-400" />
        <div className="ml-auto flex gap-2">
          {["Home", "Demo", "Product", "Tech"].map((l) => (
            <div key={l} className="h-3 px-1 text-[7px] font-bold text-gray-500 bg-gray-200 rounded flex items-center">{l}</div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="py-8 text-center space-y-2 bg-white rounded-lg border border-gray-300">
        <div className="h-3 w-32 rounded-full bg-blue-200 mx-auto" />
        <div className="h-5 w-56 rounded bg-gray-400 mx-auto" />
        <div className="h-5 w-44 rounded bg-gray-400 mx-auto" />
        <div className="h-3 w-64 rounded bg-gray-200 mx-auto mt-1" />
        <div className="flex gap-3 justify-center mt-3">
          <div className="h-7 w-24 rounded-lg bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white">Try Demo</div>
          <div className="h-7 w-24 rounded-lg bg-gray-300 flex items-center justify-center text-[8px] font-bold text-gray-600">Read PRD</div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-2 bg-white rounded-lg border border-gray-300 p-2">
        {["2,847 Users", "+18% Lift", "18.4K Runs", "4m32s Avg"].map((s) => (
          <div key={s} className="text-center">
            <div className="text-[9px] font-bold text-gray-700">{s.split(" ")[0]}</div>
            <div className="text-[7px] text-gray-400">{s.split(" ").slice(1).join(" ")}</div>
          </div>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-3 gap-2">
        {["Hooks", "Scoring", "Rewrites", "Hashtags", "Checklist", "Compare"].map((f) => (
          <div key={f} className="p-2 rounded-lg border-2 border-gray-300 bg-white text-center">
            <div className="w-4 h-4 rounded bg-blue-200 mx-auto mb-1" />
            <div className="text-[8px] font-bold text-gray-600">{f}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WireframeDemo() {
  return (
    <div className="bg-gray-100 rounded-xl p-5 border-2 border-gray-300">
      <div className="grid grid-cols-[140px_1fr] gap-3">
        {/* Left: Input Panel */}
        <div className="space-y-2">
          <div className="p-2 rounded-lg border-2 border-gray-300 bg-white space-y-2">
            <div className="text-[8px] font-bold text-gray-600">Content Type</div>
            <div className="grid grid-cols-3 gap-1">
              <div className="h-5 rounded bg-blue-200 flex items-center justify-center text-[7px] font-bold text-blue-700">Caption</div>
              <div className="h-5 rounded bg-gray-200 flex items-center justify-center text-[7px] text-gray-500">Script</div>
              <div className="h-5 rounded bg-gray-200 flex items-center justify-center text-[7px] text-gray-500">Hook</div>
            </div>
            <div className="text-[8px] font-bold text-gray-600">Your Content</div>
            <div className="h-20 rounded bg-gray-100 border-2 border-gray-300 p-1">
              <div className="text-[7px] text-gray-400 leading-tight">Paste your TikTok caption, script, or hook here...</div>
            </div>
            <div className="h-7 rounded-lg bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white">Analyze</div>
          </div>
          <div className="p-2 rounded-lg border-2 border-gray-300 bg-white space-y-1">
            <div className="text-[8px] font-bold text-gray-600">Examples</div>
            <div className="h-5 rounded bg-gray-100 border border-gray-300 flex items-center px-1 text-[7px] text-gray-500">Travel caption</div>
            <div className="h-5 rounded bg-gray-100 border border-gray-300 flex items-center px-1 text-[7px] text-gray-500">Cooking script</div>
          </div>
        </div>

        {/* Right: Output Panel */}
        <div className="space-y-2">
          <div className="flex gap-1">
            {["Scores", "Hooks", "Rewrites", "Struct", "Tags", "Check"].map((t, i) => (
              <div key={t} className={`h-6 px-2 rounded text-[8px] font-bold flex items-center ${i === 0 ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-200 text-gray-500"}`}>
                {t}
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg border-2 border-gray-300 bg-white">
            <div className="flex justify-center gap-6 mb-3">
              <div className="w-14 h-14 rounded-full border-4 border-blue-400 flex items-center justify-center text-sm font-bold text-blue-600">78</div>
            </div>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="w-9 h-9 rounded-full border-3 border-green-400 flex items-center justify-center text-[10px] font-bold text-green-600 mx-auto">72</div>
                <div className="text-[7px] text-gray-500 mt-1">Clarity</div>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 rounded-full border-3 border-amber-400 flex items-center justify-center text-[10px] font-bold text-amber-600 mx-auto">81</div>
                <div className="text-[7px] text-gray-500 mt-1">Engage</div>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 rounded-full border-3 border-violet-400 flex items-center justify-center text-[10px] font-bold text-violet-600 mx-auto">65</div>
                <div className="text-[7px] text-gray-500 mt-1">Original</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t-2 border-gray-200 space-y-1">
              <div className="text-[8px] font-bold text-gray-600">Recommendations</div>
              <div className="h-2 w-full rounded bg-gray-200" />
              <div className="h-2 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WireframeResults() {
  return (
    <div className="bg-gray-100 rounded-xl p-5 border-2 border-gray-300 space-y-3">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-2">
        {["2,847 Users", "4m 32s Session", "18.4K Analyzed", "+18% Lift"].map((s) => (
          <div key={s} className="p-2 rounded-lg bg-white border-2 border-gray-300 text-center">
            <div className="text-xs font-bold text-gray-700">{s.split(" ")[0]}</div>
            <div className="text-[7px] text-gray-400">{s.split(" ").slice(1).join(" ")}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg border-2 border-gray-300 p-3">
        <div className="text-[8px] font-bold text-gray-600 mb-2">Weekly Active Users</div>
        <div className="h-24 flex items-end justify-around px-2">
          {[30, 50, 70, 85, 95, 80, 65, 90].map((h, i) => (
            <div key={i} className="w-5 rounded-t bg-blue-400" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-around mt-1">
          {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"].map((w) => (
            <div key={w} className="text-[7px] text-gray-400">{w}</div>
          ))}
        </div>
      </div>

      {/* Feature Usage Bars */}
      <div className="bg-white rounded-lg border-2 border-gray-300 p-3 space-y-1.5">
        <div className="text-[8px] font-bold text-gray-600 mb-1">Feature Usage</div>
        {[{ f: "Hooks", w: 89 }, { f: "Scoring", w: 84 }, { f: "Rewrites", w: 76 }, { f: "Compare", w: 52 }].map((item) => (
          <div key={item.f} className="flex items-center gap-2">
            <div className="text-[7px] text-gray-500 w-12">{item.f}</div>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-blue-400" style={{ width: `${item.w}%` }} />
            </div>
            <div className="text-[7px] font-bold text-gray-600">{item.w}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WireframeComparison() {
  return (
    <div className="bg-gray-100 rounded-xl p-5 border-2 border-gray-300">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Version A", score: 62, c: 58, e: 65, o: 52, color: "amber" },
          { label: "Version B", score: 78, c: 72, e: 81, o: 68, color: "green" },
        ].map((v) => (
          <div key={v.label} className="bg-white rounded-lg border-2 border-gray-300 p-3">
            <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2">{v.label}</div>
            <div className={`w-12 h-12 rounded-full border-4 ${v.color === "green" ? "border-green-400" : "border-amber-400"} mx-auto flex items-center justify-center text-sm font-bold ${v.color === "green" ? "text-green-600" : "text-amber-600"}`}>
              {v.score}
            </div>
            <div className="space-y-1.5 mt-3">
              {[
                { label: "Clarity", val: v.c },
                { label: "Engage", val: v.e },
                { label: "Original", val: v.o },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <div className="text-[7px] text-gray-500 w-10">{m.label}</div>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${v.color === "green" ? "bg-green-400" : "bg-amber-400"}`} style={{ width: `${m.val}%` }} />
                  </div>
                  <div className="text-[8px] font-bold text-gray-600">{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t-2 border-gray-200 text-center">
        <span className="inline-flex items-center gap-1 text-[11px] text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
          +16 points improvement
        </span>
      </div>
    </div>
  );
}

/* ===== Mermaid Diagram ===== */

function MermaidDiagram({ title, description, chart }: { title: string; description: string; chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#e0effe",
            primaryTextColor: "#111827",
            primaryBorderColor: "#026bc7",
            lineColor: "#a3adb8",
            secondaryColor: "#f3f5f7",
            tertiaryColor: "#fafbfc",
            fontFamily: "DM Sans, system-ui, sans-serif",
            fontSize: "13px",
          },
        });
        if (ref.current && !cancelled) {
          const { svg } = await mermaid.render(`mermaid-${title.replace(/\s+/g, "-").toLowerCase()}`, chart);
          ref.current.innerHTML = svg;
          setRendered(true);
        }
      } catch {
        if (ref.current && !cancelled) {
          ref.current.innerHTML = `<pre class="text-xs text-ink-500 bg-surface-50 p-4 rounded-lg overflow-auto">${chart}</pre>`;
          setRendered(true);
        }
      }
    }
    render();
    return () => { cancelled = true; };
  }, [chart, title]);

  return (
    <div className="card border-2 border-surface-200">
      <h3 className="text-lg font-display font-bold text-ink-900 mb-2">{title}</h3>
      <p className="text-sm text-ink-500 mb-4 leading-relaxed">{description}</p>
      <div
        ref={ref}
        className={`w-full overflow-x-auto transition-opacity duration-300 ${rendered ? "opacity-100" : "opacity-0"}`}
      />
      {!rendered && (
        <div className="flex items-center justify-center py-10 text-ink-300 text-sm">Loading diagram...</div>
      )}
    </div>
  );
}
