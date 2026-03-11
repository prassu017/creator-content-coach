import { NextRequest, NextResponse } from "next/server";
import { generateMockAnalysis } from "@/lib/mockData";
import { AnalysisResult } from "@/lib/types";
import { getServerSupabase } from "@/lib/supabase";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Please wait a moment." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { content, contentType, mode } = body;

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required and must be a string." }, { status: 400 });
    }
    if (content.length > 5000) {
      return NextResponse.json({ error: "Content must be under 5000 characters." }, { status: 400 });
    }
    if (!["caption", "script", "hook"].includes(contentType)) {
      return NextResponse.json({ error: "Content type must be caption, script, or hook." }, { status: 400 });
    }

    let result: AnalysisResult;

    if (mode === "live" && process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "sk-your-openai-api-key-here") {
      result = await analyzeLive(content, contentType);
    } else {
      result = generateMockAnalysis(content, contentType);
    }

    // Persist to Supabase (non-blocking so the response is not delayed)
    saveToDatabase(result, mode || "demo").catch((err) =>
      console.error("DB save failed (non-blocking):", err)
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json({ error: "Failed to analyze content." }, { status: 500 });
  }
}

async function saveToDatabase(result: AnalysisResult, mode: string) {
  const supabase = getServerSupabase();
  if (!supabase) return; // Supabase not configured, skip silently

  const wordCount = result.inputContent.split(/\s+/).filter(Boolean).length;

  const { error } = await supabase.from("analyses").insert({
    input_content: result.inputContent,
    content_type: result.contentType,
    mode,
    word_count: wordCount,
    score_clarity: result.scores.clarity,
    score_engagement: result.scores.engagement,
    score_originality: result.scores.originality,
    score_overall: result.scores.overall,
    result_json: {
      hooks: result.hooks,
      rewrites: result.rewrites,
      structure: result.structure,
      hashtags: result.hashtags,
      checklist: result.checklist,
      recommendations: result.recommendations,
    },
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
  }
}

async function analyzeLive(content: string, contentType: string): Promise<AnalysisResult> {
  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = `You are a TikTok content strategist AI. Analyze the following ${contentType} and return a JSON object with this exact structure (no markdown, no code fences, just raw JSON):
{
  "scores": { "clarity": <0-100>, "engagement": <0-100>, "originality": <0-100>, "overall": <0-100> },
  "hooks": [
    { "text": "<hook idea>", "style": "<question|statistic|story|bold-claim|contrast>" }
  ],
  "rewrites": [
    { "label": "<variant name>", "text": "<rewritten version>", "tone": "<tone description>" }
  ],
  "structure": ["<step 1>", "<step 2>", ...],
  "hashtags": ["#tag1", "#tag2", ...],
  "checklist": [
    { "label": "<check item>", "passed": <true|false>, "tip": "<improvement tip>" }
  ],
  "recommendations": ["<rec 1>", "<rec 2>", ...]
}
Provide exactly 5 hooks (one per style), 3 rewrites, 4-6 structure steps, 5-6 hashtags, 5-6 checklist items, and 2-4 recommendations.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const raw = completion.choices[0]?.message?.content || "";
  const cleaned = raw.replace(/```json\n?|```\n?/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return {
    id: `live-${Date.now()}`,
    timestamp: new Date().toISOString(),
    inputContent: content,
    contentType,
    ...parsed,
  };
}
