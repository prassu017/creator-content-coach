-- Creator Content Coach: Supabase Schema
-- Run this in your Supabase project's SQL Editor (Dashboard > SQL Editor > New query)

-- Main analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  input_content TEXT NOT NULL,
  content_type  TEXT NOT NULL CHECK (content_type IN ('caption', 'script', 'hook')),
  mode          TEXT NOT NULL DEFAULT 'demo' CHECK (mode IN ('demo', 'live')),
  word_count    INT NOT NULL DEFAULT 0,

  -- Scores
  score_clarity     INT NOT NULL DEFAULT 0,
  score_engagement  INT NOT NULL DEFAULT 0,
  score_originality INT NOT NULL DEFAULT 0,
  score_overall     INT NOT NULL DEFAULT 0,

  -- Full result blob (hooks, rewrites, structure, hashtags, checklist, recommendations)
  result_json   JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Index for fast ordering and filtering
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analyses_content_type ON analyses (content_type);

-- Enable Row Level Security (all reads are public for the demo, writes go through server)
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (this is a portfolio demo, no user auth)
CREATE POLICY "Public read access" ON analyses
  FOR SELECT USING (true);

-- Only the service role can insert (our API route uses the service key)
CREATE POLICY "Service role insert" ON analyses
  FOR INSERT WITH CHECK (true);

-- Optional: a view for aggregate stats (used on the Results page)
CREATE OR REPLACE VIEW analysis_stats AS
SELECT
  COUNT(*)::INT                                         AS total_analyses,
  COUNT(DISTINCT DATE_TRUNC('day', created_at))::INT    AS active_days,
  ROUND(AVG(score_overall), 1)                          AS avg_score,
  ROUND(AVG(score_clarity), 1)                          AS avg_clarity,
  ROUND(AVG(score_engagement), 1)                       AS avg_engagement,
  ROUND(AVG(score_originality), 1)                      AS avg_originality,
  MAX(score_overall)::INT                               AS best_score,
  COUNT(*) FILTER (WHERE content_type = 'caption')::INT AS caption_count,
  COUNT(*) FILTER (WHERE content_type = 'script')::INT  AS script_count,
  COUNT(*) FILTER (WHERE content_type = 'hook')::INT    AS hook_count,
  COUNT(*) FILTER (WHERE mode = 'live')::INT            AS live_count,
  COUNT(*) FILTER (WHERE mode = 'demo')::INT            AS demo_count
FROM analyses;
