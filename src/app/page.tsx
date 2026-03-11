import Link from "next/link";
import {
  Sparkles,
  Zap,
  BarChart3,
  RefreshCw,
  Hash,
  CheckCircle2,
  ArrowRight,
  Target,
  Users,
  TrendingUp,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Hook Generator",
    desc: "Five distinct hook variants (question, statistic, story, bold claim, contrast) crafted for your content.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "Content Scoring",
    desc: "Clarity, engagement, and originality scores with actionable breakdowns and benchmarks.",
    color: "text-brand-600",
    bg: "bg-brand-50",
  },
  {
    icon: RefreshCw,
    title: "Rewrite Variants",
    desc: "Three tone-shifted rewrites (punchy, story-driven, authority) to test different creative angles.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Hash,
    title: "Smart Hashtags",
    desc: "Auto-generated hashtag mix balancing broad reach with niche discovery for maximum visibility.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: CheckCircle2,
    title: "Content Checklist",
    desc: "Six-point quality audit: hook timing, value clarity, emotional triggers, CTA, and more.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Target,
    title: "Version Comparison",
    desc: "Side-by-side comparison across analysis runs to track iterative improvements over time.",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
];

const STATS = [
  { value: "2,847", label: "Beta Users", icon: Users },
  { value: "+18%", label: "Avg Score Lift", icon: TrendingUp },
  { value: "18.4K", label: "Analyses Run", icon: BarChart3 },
  { value: "4m 32s", label: "Avg Session", icon: Zap },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-violet-50/30" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl" />

        <div className="relative container-narrow py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 badge-brand mb-6 animate-fade-up opacity-0">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Content Optimization
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-ink-900 tracking-tight leading-[1.1] mb-6 animate-fade-up opacity-0 delay-100">
            Ship better content,<br />
            <span className="text-gradient">every single time.</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-500 max-w-2xl mx-auto mb-10 animate-fade-up opacity-0 delay-200">
            Creator Content Coach analyzes your TikTok scripts, captions, and hooks
            with AI scoring, rewrite generation, and a structured quality checklist
            so you can iterate faster and post with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0 delay-300">
            <Link href="/demo" className="btn-primary text-base px-8 py-4">
              Try the Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/product" className="btn-secondary text-base px-8 py-4">
              Read the PRD
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-surface-200 bg-surface-50">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="font-display font-bold text-xl text-ink-900">{stat.value}</p>
                  <p className="text-xs text-ink-300 font-medium uppercase tracking-wide">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container-wide py-20">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-3">Everything you need to optimize content</h2>
          <p className="section-subheading mx-auto">
            From first draft to final post, the Coach gives you scoring, suggestions, and structure at every step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-hover group">
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="font-display font-bold text-lg text-ink-900 mb-2">{f.title}</h3>
              <p className="text-ink-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface-50 border-y border-surface-200 py-20">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-3">How it works</h2>
            <p className="section-subheading mx-auto">Three steps. Under a minute. Better content.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Paste your content", desc: "Drop in a caption, script, or hook. Select the content type so the AI knows what to optimize for." },
              { step: "02", title: "Get instant analysis", desc: "Receive scores, hook ideas, rewrite variants, hashtags, structure guidance, and a quality checklist." },
              { step: "03", title: "Iterate and compare", desc: "Refine your content, re-analyze, and compare versions side by side to see measurable improvement." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white font-display font-bold text-xl flex items-center justify-center mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-lg text-ink-900 mb-2">{item.title}</h3>
                <p className="text-ink-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-narrow py-20 text-center">
        <h2 className="section-heading mb-4">Ready to level up your content?</h2>
        <p className="section-subheading mx-auto mb-8">
          Try the interactive demo with example inputs or paste your own content.
        </p>
        <Link href="/demo" className="btn-primary text-base px-8 py-4">
          Launch Demo
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </section>
    </div>
  );
}
