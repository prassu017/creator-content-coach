"use client";

import { useEffect, useRef, useState } from "react";
import { Server, Cpu, Database, ArrowRight, Globe, Layers, Workflow, Shield } from "lucide-react";
import Link from "next/link";

export default function TechPage() {
  return (
    <div className="bg-white">
      <div className="bg-surface-50 border-b border-surface-200">
        <div className="container-narrow py-12">
          <span className="badge-brand mb-4 inline-block">Technical Architecture</span>
          <h1 className="section-heading text-4xl mb-3">System Design &amp; Data Flow</h1>
          <p className="section-subheading">
            How Creator Content Coach is built: stack decisions, architecture, AI pipeline, and deployment.
          </p>
        </div>
      </div>

      <div className="container-wide py-16">
        {/* Stack Overview */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
              <Layers className="w-5 h-5 text-brand-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink-900">Tech Stack</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { layer: "Frontend", items: ["Next.js 14 (App Router)", "React 18 + TypeScript", "Tailwind CSS", "Framer Motion"], icon: Globe, color: "text-brand-600", bg: "bg-brand-50" },
              { layer: "API Layer", items: ["Next.js API Routes", "Edge-compatible handlers", "Rate limiting (in-memory)", "Input validation"], icon: Server, color: "text-violet-500", bg: "bg-violet-50" },
              { layer: "AI Pipeline", items: ["OpenAI GPT-4o-mini (Live)", "Deterministic mock engine (Demo)", "Structured JSON output", "Prompt engineering"], icon: Cpu, color: "text-amber-500", bg: "bg-amber-50" },
              { layer: "State & Storage", items: ["React state (client)", "In-memory history log", "JSON export for persistence", "No external database"], icon: Database, color: "text-emerald-500", bg: "bg-emerald-50" },
            ].map((s) => (
              <div key={s.layer} className="card">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <h3 className="font-display font-bold text-ink-900 mb-2">{s.layer}</h3>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="text-xs text-ink-500 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-ink-300 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* System Architecture Diagram */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
              <Server className="w-5 h-5 text-violet-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink-900">System Architecture</h2>
          </div>

          <MermaidDiagram
            id="sys-arch"
            chart={`graph TB
    subgraph Client["Client (Browser)"]
        A[React Frontend] --> B[Content Input Form]
        A --> C[Analysis Display]
        A --> D[History Manager]
        A --> E[Comparison View]
    end

    subgraph API["Next.js API Routes (Vercel Edge)"]
        F["/api/analyze"] --> G{Mode Check}
        G -->|Demo| H[Mock Analysis Engine]
        G -->|Live| I[OpenAI Adapter]
        F --> J[Rate Limiter]
        F --> K[Input Validator]
    end

    subgraph AI["AI Layer"]
        I --> L[GPT-4o-mini]
        L --> M[JSON Parser]
        H --> N[Deterministic Scorer]
        H --> O[Template Engine]
    end

    B -->|POST /api/analyze| F
    M --> C
    N --> C
    O --> C
    D -->|Client State| A

    style Client fill:#f0f7ff,stroke:#026bc7
    style API fill:#faf5ff,stroke:#7c3aed
    style AI fill:#fefce8,stroke:#ca8a04`}
          />
        </section>

        {/* AI Pipeline */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Workflow className="w-5 h-5 text-amber-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink-900">AI Analysis Pipeline</h2>
          </div>

          <MermaidDiagram
            id="ai-pipeline"
            chart={`graph LR
    A[Raw Content Input] --> B[Input Validation]
    B --> C[Content Type Detection]
    C --> D{Mode?}
    D -->|Demo| E[Hash-Based Scoring]
    D -->|Live| F[Prompt Assembly]
    E --> G[Template Selection]
    G --> H[Mock Output Build]
    F --> I[OpenAI API Call]
    I --> J[JSON Response Parse]
    J --> K[Schema Validation]
    H --> L[Unified Result Object]
    K --> L
    L --> M[Client Render]

    style A fill:#e0effe,stroke:#026bc7
    style M fill:#d1fae5,stroke:#059669
    style D fill:#fef3c7,stroke:#d97706`}
          />

          <div className="mt-8 card">
            <h3 className="font-display font-bold text-ink-900 mb-4">How the AI Scoring Works</h3>
            <div className="prose-section">
              <p className="text-sm text-ink-700 leading-relaxed">
                In <strong>Demo Mode</strong>, the analysis engine uses a deterministic scoring algorithm based on content hashing. The input text is hashed to produce a seed value. That seed drives the scoring, hook selection, and rewrite generation. The same input always produces the same output, which makes it reliable for demos and testing. Scoring factors include word count, sentence structure, presence of questions, numbers, emotional triggers, and hashtags.
              </p>
              <p className="text-sm text-ink-700 leading-relaxed">
                In <strong>Live Mode</strong>, the engine sends the content along with a system prompt to OpenAI&apos;s GPT-4o-mini model. The prompt instructs the model to return a structured JSON object with scores, hooks, rewrites, structure steps, hashtags, checklist items, and recommendations. The response is parsed, validated against the expected schema, and rendered in the UI. Temperature is set to 0.7 for a balance of creativity and consistency.
              </p>
            </div>
          </div>
        </section>

        {/* Data Flow */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink-900">Data Flow</h2>
          </div>

          <MermaidDiagram
            id="data-flow"
            chart={`sequenceDiagram
    participant U as User
    participant UI as React Frontend
    participant API as /api/analyze
    participant AI as AI Engine

    U->>UI: Paste content + select type
    UI->>UI: Validate input (length, type)
    UI->>API: POST {content, contentType, mode}
    API->>API: Rate limit check
    API->>API: Input sanitization
    alt Demo Mode
        API->>AI: generateMockAnalysis()
        AI-->>API: Deterministic result
    else Live Mode
        API->>AI: OpenAI API call
        AI-->>API: JSON response
        API->>API: Parse + validate schema
    end
    API-->>UI: AnalysisResult JSON
    UI->>UI: Update state + render tabs
    UI->>UI: Append to history
    U->>UI: Click Compare
    UI->>UI: Side-by-side render
    U->>UI: Click Export
    UI-->>U: Download JSON file`}
          />
        </section>

        {/* Security */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink-900">Security &amp; Privacy</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "No persistent storage", desc: "All analysis history lives in client-side React state. Nothing is saved to a database. Data disappears when the tab closes." },
              { title: "API key isolation", desc: "The OpenAI API key is stored server-side via environment variables and never exposed to the client. Demo mode requires no key at all." },
              { title: "Rate limiting", desc: "The API enforces 20 requests per minute per IP using an in-memory rate limiter to prevent abuse and control costs." },
              { title: "Input validation", desc: "All inputs are validated server-side: content must be a string under 5000 characters, content type must be one of three allowed values." },
            ].map((s) => (
              <div key={s.title} className="card">
                <h3 className="font-display font-bold text-ink-900 text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-ink-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deployment */}
        <section className="mb-16">
          <div className="card bg-surface-50">
            <h3 className="font-display font-bold text-ink-900 text-lg mb-4">Deployment Architecture</h3>
            <MermaidDiagram
              id="deploy"
              chart={`graph LR
    A[GitHub Repo] -->|Push| B[Vercel CI/CD]
    B --> C[Build Next.js]
    C --> D[Deploy Static + Edge]
    D --> E[CDN: Frontend Assets]
    D --> F[Edge Functions: API Routes]
    F -->|Live Mode Only| G[OpenAI API]

    style A fill:#e0effe,stroke:#026bc7
    style E fill:#d1fae5,stroke:#059669
    style F fill:#faf5ff,stroke:#7c3aed`}
            />
            <div className="mt-6 p-4 bg-white rounded-xl border border-surface-200">
              <p className="text-sm text-ink-700 font-mono leading-relaxed">
                <span className="text-ink-300"># Deploy in one command</span><br />
                $ npx vercel --prod<br /><br />
                <span className="text-ink-300"># Or connect GitHub repo for auto-deploy</span><br />
                <span className="text-ink-300"># Set OPENAI_API_KEY in Vercel env vars for Live Mode</span>
              </p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link href="/results" className="btn-primary text-base px-8 py-4">
            View Impact Results
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MermaidDiagram({ id, chart }: { id: string; chart: string }) {
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
            fontSize: "12px",
          },
        });
        if (ref.current && !cancelled) {
          const { svg } = await mermaid.render(`mermaid-${id}`, chart);
          ref.current.innerHTML = svg;
          setRendered(true);
        }
      } catch {
        if (ref.current && !cancelled) {
          ref.current.innerHTML = `<pre class="text-xs text-ink-500 bg-surface-50 p-4 rounded-lg overflow-auto whitespace-pre-wrap">${chart}</pre>`;
          setRendered(true);
        }
      }
    }
    render();
    return () => { cancelled = true; };
  }, [chart, id]);

  return (
    <div className="card">
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
