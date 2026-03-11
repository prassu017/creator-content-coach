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
            <WireframeLanding />
            <WireframeDemo />
            <WireframeResults />
            <WireframeComparison />
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

/* ===== Wireframe Components ===== */

function WireframeLanding() {
  return (
    <div className="card">
      <p className="text-xs font-display font-bold text-ink-300 uppercase tracking-wider mb-4">Landing Page</p>
      <div className="bg-surface-50 rounded-xl p-5 space-y-3 border border-surface-200">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-surface-300" />
          <div className="h-3 w-20 rounded bg-surface-300" />
          <div className="ml-auto flex gap-2">
            <div className="h-3 w-10 rounded bg-surface-200" />
            <div className="h-3 w-10 rounded bg-surface-200" />
            <div className="h-3 w-10 rounded bg-surface-200" />
          </div>
        </div>
        <div className="py-10 text-center space-y-3">
          <div className="h-3 w-24 rounded bg-brand-200 mx-auto" />
          <div className="h-6 w-64 rounded bg-surface-300 mx-auto" />
          <div className="h-6 w-48 rounded bg-surface-300 mx-auto" />
          <div className="h-3 w-72 rounded bg-surface-200 mx-auto" />
          <div className="flex gap-3 justify-center mt-4">
            <div className="h-8 w-24 rounded-lg bg-brand-400" />
            <div className="h-8 w-24 rounded-lg bg-surface-300" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 pt-4 border-t border-surface-200">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-1">
              <div className="h-6 w-6 rounded bg-surface-300 mx-auto" />
              <div className="h-2 w-10 rounded bg-surface-200 mx-auto" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-lg border border-dashed border-surface-300 space-y-1">
              <div className="w-5 h-5 rounded bg-surface-200" />
              <div className="h-2 w-16 rounded bg-surface-200" />
              <div className="h-2 w-full rounded bg-surface-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WireframeDemo() {
  return (
    <div className="card">
      <p className="text-xs font-display font-bold text-ink-300 uppercase tracking-wider mb-4">Demo / Analyzer Page</p>
      <div className="bg-surface-50 rounded-xl p-5 border border-surface-200">
        <div className="grid grid-cols-[140px_1fr] gap-3">
          {/* Left: Input */}
          <div className="space-y-2">
            <div className="p-2 rounded-lg border border-dashed border-surface-300 space-y-1.5">
              <div className="h-2 w-16 rounded bg-surface-300" />
              <div className="grid grid-cols-3 gap-1">
                <div className="h-4 rounded bg-brand-200" />
                <div className="h-4 rounded bg-surface-200" />
                <div className="h-4 rounded bg-surface-200" />
              </div>
              <div className="h-2 w-12 rounded bg-surface-300" />
              <div className="h-20 rounded bg-white border border-surface-200" />
              <div className="h-6 rounded bg-brand-400" />
            </div>
            <div className="p-2 rounded-lg border border-dashed border-surface-300 space-y-1">
              <div className="h-2 w-14 rounded bg-surface-300" />
              <div className="h-5 rounded bg-surface-100 border border-surface-200" />
              <div className="h-5 rounded bg-surface-100 border border-surface-200" />
            </div>
          </div>
          {/* Right: Output */}
          <div className="space-y-2">
            <div className="flex gap-1">
              {["Scores", "Hooks", "Rewrites", "Struct", "Tags", "Check"].map((t) => (
                <div key={t} className={`h-5 px-2 rounded text-[8px] flex items-center ${t === "Scores" ? "bg-brand-100 text-brand-600" : "bg-surface-100 text-ink-300"}`}>
                  {t}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg border border-dashed border-surface-300">
              <div className="flex justify-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full border-4 border-brand-300 flex items-center justify-center text-[10px] font-bold text-brand-600">78</div>
              </div>
              <div className="flex justify-center gap-6">
                <div className="w-8 h-8 rounded-full border-3 border-emerald-300 flex items-center justify-center text-[8px] font-bold">72</div>
                <div className="w-8 h-8 rounded-full border-3 border-amber-300 flex items-center justify-center text-[8px] font-bold">81</div>
                <div className="w-8 h-8 rounded-full border-3 border-violet-300 flex items-center justify-center text-[8px] font-bold">65</div>
              </div>
              <div className="mt-3 pt-2 border-t border-surface-200 space-y-1">
                <div className="h-2 w-20 rounded bg-surface-300" />
                <div className="h-2 w-full rounded bg-surface-100" />
                <div className="h-2 w-3/4 rounded bg-surface-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WireframeResults() {
  return (
    <div className="card">
      <p className="text-xs font-display font-bold text-ink-300 uppercase tracking-wider mb-4">Results / Metrics Page</p>
      <div className="bg-surface-50 rounded-xl p-5 border border-surface-200 space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-2 rounded-lg bg-white border border-surface-200 text-center">
              <div className="h-4 w-10 rounded bg-surface-300 mx-auto" />
              <div className="h-2 w-12 rounded bg-surface-200 mx-auto mt-1" />
            </div>
          ))}
        </div>
        <div className="h-28 rounded-lg bg-white border border-surface-200 flex items-end justify-around px-4 pb-2">
          {[30, 50, 70, 85, 95, 80, 60, 90].map((h, i) => (
            <div key={i} className="w-4 rounded-t bg-brand-200" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-20 rounded-lg bg-white border border-surface-200 p-2">
            <div className="h-2 w-16 rounded bg-surface-300 mb-2" />
            <div className="space-y-1">
              {[80, 65, 50, 40].map((w, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="h-2 w-12 rounded bg-surface-200" />
                  <div className="h-2 rounded bg-brand-200" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="h-20 rounded-lg bg-white border border-surface-200 p-2">
            <div className="h-2 w-20 rounded bg-surface-300 mb-2" />
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-surface-100" />
              <div className="h-2 w-3/4 rounded bg-surface-100" />
              <div className="h-2 w-full rounded bg-surface-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WireframeComparison() {
  return (
    <div className="card">
      <p className="text-xs font-display font-bold text-ink-300 uppercase tracking-wider mb-4">Comparison View</p>
      <div className="bg-surface-50 rounded-xl p-5 border border-surface-200">
        <div className="grid grid-cols-2 gap-3">
          {["Version A", "Version B"].map((v) => (
            <div key={v} className="space-y-2">
              <div className="text-[10px] font-display font-bold text-ink-300 uppercase">{v}</div>
              <div className="p-2 rounded-lg bg-white border border-surface-200 text-center">
                <div className="w-10 h-10 rounded-full border-4 border-brand-300 mx-auto flex items-center justify-center text-[10px] font-bold">
                  {v === "Version A" ? "62" : "78"}
                </div>
              </div>
              <div className="space-y-1">
                {["Clarity", "Engage", "Original"].map((m) => (
                  <div key={m} className="flex items-center gap-1">
                    <div className="text-[8px] text-ink-300 w-10">{m}</div>
                    <div className="flex-1 h-2 rounded bg-surface-200">
                      <div className="h-2 rounded bg-brand-300" style={{ width: `${Math.random() * 40 + 40}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-surface-200 text-center">
          <div className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
            +16 points improvement
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Mermaid Diagram ===== */

function MermaidDiagram({ title, chart }: { title: string; chart: string }) {
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
    <div className="card">
      <h3 className="text-lg font-display font-bold text-ink-900 mb-4">{title}</h3>
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
