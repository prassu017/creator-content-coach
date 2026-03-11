# Creator Content Coach

An AI-powered content optimization tool for TikTok creators. Analyze scripts, captions, and hooks with scoring, hook generation, rewrite variants, hashtag suggestions, and a structured quality checklist.

Built by **Prasanna Jain** as a portfolio project for AI Product Management.

---

## Features

- **Content Scoring**: Clarity, engagement, and originality scores with overall rating
- **Hook Generator**: 5 style variants (question, statistic, story, bold claim, contrast)
- **Rewrite Variants**: 3 tone-shifted rewrites (punchy, story-driven, authority)
- **Smart Hashtags**: Auto-generated mix of broad-reach and niche tags
- **Content Checklist**: 6-point quality audit before posting
- **Version Comparison**: Side-by-side scoring across analysis runs
- **Dual Mode**: Demo Mode (deterministic, no API key) + Live Mode (OpenAI)

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4o-mini (Live Mode) / Deterministic mock engine (Demo Mode)
- **Diagrams**: Mermaid.js for architecture and flow diagrams
- **Deployment**: Vercel (one-click)

---

## Project Structure

```
creator-content-coach/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Global styles
│   │   ├── demo/page.tsx               # Interactive demo (loads DB history)
│   │   ├── product/page.tsx            # PRD (problem, personas, JTBD, metrics)
│   │   ├── design/page.tsx             # Wireframes + user flows
│   │   ├── tech/page.tsx               # Architecture + data flow diagrams
│   │   ├── results/page.tsx            # Live analytics + roadmap
│   │   └── api/
│   │       ├── analyze/route.ts        # POST: analyze content + save to DB
│   │       ├── history/route.ts        # GET: fetch analysis history
│   │       ├── history/[id]/route.ts   # GET: fetch single analysis
│   │       └── stats/route.ts          # GET: aggregate stats for Results page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ScoreRing.tsx
│   └── lib/
│       ├── types.ts                    # TypeScript interfaces
│       ├── mockData.ts                 # Mock data + deterministic analysis engine
│       └── supabase.ts                 # Supabase client (client + server)
├── supabase-schema.sql                 # Run this in Supabase SQL Editor
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── .env.example
├── DEMO_SCRIPT.md
└── README.md
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create env file (optional, Demo Mode works without it)
cp .env.example .env.local

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

Demo Mode works out of the box with no API key. To use Live Mode, add your OpenAI API key to `.env.local`.

---

## Deploy to Vercel

### Option A: One-click deploy

1. Push the project to a GitHub/GitLab repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo
4. Vercel auto-detects Next.js and configures the build
5. (Optional) Add `OPENAI_API_KEY` in Settings > Environment Variables
6. Click Deploy

### Option B: CLI deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set env var for Live Mode (optional)
vercel env add OPENAI_API_KEY
```

The app deploys as a static site with Edge Functions for the API route. No separate backend needed.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for Live Mode. Leave empty for Demo Mode. |
| `NEXT_PUBLIC_DEFAULT_MODE` | No | Default mode: `demo` or `live`. Defaults to `demo`. |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL. Enables persistent history and live analytics. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key (public, safe for client). |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role key (server-only, used for inserts). |

---

## Database Setup (Supabase)

The app works fully without a database (history stays in-memory). To enable persistent storage:

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Go to **Settings > API** and copy the URL, anon key, and service role key
4. Add them to your `.env.local` (or Vercel environment variables)

Once connected, every analysis is saved to PostgreSQL. The Demo page loads history from the DB on page load, and the Results page shows live aggregate stats (total analyses, avg scores, score distribution, daily activity).

---

## Demo Recording Tips

See `DEMO_SCRIPT.md` for a detailed 5-minute recording outline and checklist.

---

## License

This project is a portfolio demonstration. Not intended for commercial use.
