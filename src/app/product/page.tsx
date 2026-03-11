import {
  Target,
  Users,
  Crosshair,
  TrendingUp,
  AlertTriangle,
  Shield,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-surface-50 border-b border-surface-200">
        <div className="container-narrow py-12">
          <span className="badge-brand mb-4 inline-block">Product Requirement Document</span>
          <h1 className="section-heading text-4xl mb-3">Creator Content Coach</h1>
          <p className="section-subheading">
            An AI-powered content optimization tool that helps TikTok creators analyze, iterate, and improve their scripts, captions, and hooks before posting.
          </p>
        </div>
      </div>

      <div className="container-narrow py-16 prose-section">
        {/* Problem */}
        <Section icon={Target} title="Problem Statement" color="text-red-500" bg="bg-red-50">
          <p>
            TikTok creators face a gap between effort and performance. They invest significant time writing scripts and captions but lack fast, structured feedback before posting. Current workflows rely on intuition, peer reviews that take hours, or expensive consulting. Creators often only learn what went wrong after posting, when it is too late to iterate. The result: wasted effort, inconsistent performance, and slow growth.
          </p>
          <p>
            According to internal creator surveys, 68% of creators say they would revise their content more often if they had instant, actionable feedback on what to improve. The gap between "first draft" and "optimized content" is where the Coach lives.
          </p>
        </Section>

        {/* Personas */}
        <Section icon={Users} title="User Personas" color="text-violet-500" bg="bg-violet-50">
          <div className="grid md:grid-cols-2 gap-5 not-prose">
            {[
              {
                name: "Mia, the Aspiring Creator",
                desc: "22, posts 3-4 times a week, 12K followers. Wants to grow but feels stuck. Needs guidance on what makes content perform well. Does not have budget for coaching.",
                needs: "Quick feedback loop, learn-by-doing, confidence before posting.",
              },
              {
                name: "Jordan, the Brand Content Lead",
                desc: "29, manages a brand TikTok account with 200K followers. Ships 10+ pieces per week. Needs consistency across team members and a quality bar that scales.",
                needs: "Standardized scoring, batch workflow, version comparison for team alignment.",
              },
              {
                name: "Alex, the Full-Time Creator",
                desc: "26, 1.2M followers, monetizes through brand deals. Every post matters. Wants to optimize hooks and captions for maximum retention and engagement.",
                needs: "Hook testing, A/B variant generation, data-backed structure advice.",
              },
            ].map((p) => (
              <div key={p.name} className="card">
                <h4 className="font-display font-bold text-ink-900 text-sm">{p.name}</h4>
                <p className="text-sm text-ink-500 mt-1 mb-3">{p.desc}</p>
                <p className="text-xs text-brand-600 font-medium">Needs: {p.needs}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* JTBD */}
        <Section icon={Crosshair} title="Jobs to Be Done" color="text-brand-600" bg="bg-brand-50">
          <div className="space-y-4 not-prose">
            {[
              "When I finish a draft, I want to know if it will perform well so I can post with confidence instead of guessing.",
              "When my engagement drops, I want to understand what I should change in my content formula so I can recover growth.",
              "When I am brainstorming hooks, I want multiple creative options fast so I do not waste 30 minutes staring at a blank screen.",
              "When I am managing a team, I want a consistent quality bar across content so brand voice stays coherent at scale.",
            ].map((jtbd, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-ink-700 italic">&quot;{jtbd}&quot;</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Success Metrics */}
        <Section icon={TrendingUp} title="Success Metrics" color="text-emerald-600" bg="bg-emerald-50">
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            {[
              { metric: "Adoption Rate", target: ">15% of onboarded creators use the tool within first week", type: "Primary" },
              { metric: "Iteration Rate", target: ">40% of users analyze the same content 2+ times per session", type: "Primary" },
              { metric: "Score Improvement", target: "Average overall score improves by >=10 points between first and final draft", type: "Primary" },
              { metric: "Session Duration", target: "Average session > 3 minutes (indicating real engagement, not bounce)", type: "Secondary" },
              { metric: "Feature Breadth", target: ">60% of users engage with 3+ feature tabs (hooks, rewrites, checklist, etc.)", type: "Secondary" },
              { metric: "NPS", target: ">50 among weekly active users", type: "North Star" },
            ].map((m) => (
              <div key={m.metric} className="card p-4">
                <span className={`text-[10px] font-display font-bold uppercase tracking-wider ${m.type === "Primary" ? "text-emerald-600" : m.type === "North Star" ? "text-amber-600" : "text-ink-300"}`}>
                  {m.type}
                </span>
                <h4 className="font-display font-bold text-ink-900 text-sm mt-1">{m.metric}</h4>
                <p className="text-xs text-ink-500 mt-1">{m.target}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Risks */}
        <Section icon={AlertTriangle} title="Risks and Mitigations" color="text-amber-500" bg="bg-amber-50">
          <div className="space-y-4 not-prose">
            {[
              {
                risk: "Score accuracy skepticism",
                impact: "High",
                mitigation: "Include transparent scoring criteria, let users see exactly why each score was given. Add calibration examples.",
              },
              {
                risk: "Over-reliance on AI suggestions",
                impact: "Medium",
                mitigation: "Frame outputs as suggestions, not prescriptions. Keep creator voice front and center. Add disclaimer copy.",
              },
              {
                risk: "Latency in live mode",
                impact: "Medium",
                mitigation: "Show progressive loading states. Cache recent analyses. Default to demo mode for instant feedback.",
              },
              {
                risk: "Content homogenization",
                impact: "High",
                mitigation: "Provide diverse rewrite styles (not one best answer). Rotate hook templates. Flag when content matches common patterns.",
              },
            ].map((r, i) => (
              <div key={i} className="card p-4 flex gap-4">
                <span className={`badge text-[10px] self-start ${r.impact === "High" ? "badge-coral" : "badge-amber"}`}>
                  {r.impact}
                </span>
                <div>
                  <h4 className="font-display font-bold text-ink-900 text-sm">{r.risk}</h4>
                  <p className="text-xs text-ink-500 mt-1">{r.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Ethics */}
        <Section icon={Shield} title="Ethical Considerations" color="text-sky-600" bg="bg-sky-50">
          <p>
            Creator Content Coach is designed as a creative assistant, not a replacement for authentic voice. Key ethical guardrails include:
          </p>
          <ul>
            <li>All AI outputs are framed as suggestions. The creator makes the final call.</li>
            <li>No content is stored permanently or used for model training. Session data stays local.</li>
            <li>The tool does not penalize authentic or niche content in favor of viral formulas. Scoring values clarity and originality equally to engagement potential.</li>
            <li>Accessibility is a priority: color contrast meets WCAG AA, all interactive elements are keyboard navigable, and screen reader labels are provided.</li>
            <li>No dark patterns: the tool does not pressure users to post, does not create FOMO, and does not gamify in ways that encourage unhealthy posting frequency.</li>
          </ul>
        </Section>

        {/* Future Vision */}
        <Section icon={Lightbulb} title="Future Vision" color="text-violet-500" bg="bg-violet-50">
          <p>
            The Coach starts as a pre-post optimization tool but the long-term vision is to become the creator&apos;s intelligent copilot across the entire content lifecycle:
          </p>
          <ul>
            <li>Post-publish performance tracking and retroactive analysis</li>
            <li>Personalized benchmarking based on niche, follower count, and content category</li>
            <li>Multi-platform optimization (adapt content for Instagram Reels, YouTube Shorts)</li>
            <li>Team collaboration: shared workspaces, approval workflows, version control</li>
            <li>Integration with TikTok Creator Tools API for direct publish and analytics sync</li>
          </ul>
        </Section>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/design" className="btn-primary text-base px-8 py-4">
            View Design Artifacts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  color,
  bg,
  children,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <h2 className="text-2xl font-display font-bold text-ink-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}
