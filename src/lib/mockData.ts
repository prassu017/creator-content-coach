import { AnalysisResult, HookIdea, RewriteVariant, ChecklistItem } from "./types";

export const EXAMPLE_INPUTS = [
  {
    label: "Travel caption",
    contentType: "caption" as const,
    text: "Just got back from Bali and honestly it changed my perspective on everything. The sunsets, the people, the food. If you haven't been, you need to go. Life is too short to not travel. #bali #travel #wanderlust",
  },
  {
    label: "Cooking script",
    contentType: "script" as const,
    text: "Hey guys, today I'm going to show you how to make the perfect carbonara. So first you need to get your pasta water boiling. While that's happening, let's prep our ingredients. You'll need guanciale, eggs, pecorino, and black pepper. The trick is in the technique, not the ingredients. Let me show you.",
  },
  {
    label: "Tech hook",
    contentType: "hook" as const,
    text: "Stop scrolling. This AI tool just replaced 3 hours of my editing workflow. And no, it's not what you think.",
  },
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededScore(seed: number, min: number, max: number): number {
  const range = max - min;
  return min + (seed % (range + 1));
}

export function generateMockAnalysis(content: string, contentType: string): AnalysisResult {
  const seed = hashCode(content);
  const wordCount = content.split(/\s+/).length;
  const hasQuestion = content.includes("?");
  const hasNumber = /\d/.test(content);
  const sentenceCount = content.split(/[.!?]+/).filter(Boolean).length;

  const clarity = Math.min(95, Math.max(35, seededScore(seed, 45, 85) + (sentenceCount > 2 ? 5 : -5)));
  const engagement = Math.min(95, Math.max(35, seededScore(seed + 1, 40, 80) + (hasQuestion ? 10 : 0) + (hasNumber ? 5 : 0)));
  const originality = Math.min(95, Math.max(30, seededScore(seed + 2, 35, 75) + (wordCount > 40 ? 5 : -3)));
  const overall = Math.round((clarity * 0.3 + engagement * 0.4 + originality * 0.3));

  const hookStyles: HookIdea["style"][] = ["question", "statistic", "story", "bold-claim", "contrast"];
  const hookTemplates: Record<HookIdea["style"], string[]> = {
    question: [
      "What if everything you knew about this was wrong?",
      "Have you ever wondered why most people get this backwards?",
      "What would change if you tried this for just 7 days?",
    ],
    statistic: [
      "93% of creators miss this one detail, and it costs them thousands of views.",
      "I tested this across 50 posts. The results surprised me.",
      "This takes 10 seconds but increases retention by 40%.",
    ],
    story: [
      "Last Tuesday I almost gave up on this. Then something clicked.",
      "Three months ago, I had zero followers. Here is what actually worked.",
      "My friend sent me a video that completely changed my approach.",
    ],
    "bold-claim": [
      "This is the most underrated strategy in content creation right now.",
      "Forget everything the gurus told you. Here is what actually matters.",
      "I should not be sharing this for free.",
    ],
    contrast: [
      "Everyone is doing X. The top 1% are doing Y instead.",
      "It looks simple, but the technique behind it is anything but.",
      "What sounds boring is actually the secret weapon of every viral creator.",
    ],
  };

  const hooks: HookIdea[] = hookStyles.map((style, i) => ({
    text: hookTemplates[style][(seed + i) % hookTemplates[style].length],
    style,
  }));

  const rewrites: RewriteVariant[] = [
    {
      label: "Punchy & Direct",
      tone: "High energy, short sentences",
      text: truncateAndRewrite(content, "punchy", seed),
    },
    {
      label: "Story-Driven",
      tone: "Narrative arc, emotional pull",
      text: truncateAndRewrite(content, "story", seed),
    },
    {
      label: "Authority Voice",
      tone: "Expert framing, credibility signals",
      text: truncateAndRewrite(content, "authority", seed),
    },
  ];

  const structureSteps = contentType === "script"
    ? ["Hook (0-3s): Pattern interrupt or bold claim", "Context (3-8s): Set up the problem or promise", "Core Value (8-40s): Deliver the main insight with visual proof", "Callback (40-50s): Reference the hook to close the loop", "CTA (50-60s): Clear next action for the viewer"]
    : contentType === "hook"
    ? ["Interrupt Pattern: Stop the scroll in under 2 seconds", "Curiosity Gap: Create tension that demands resolution", "Payoff Preview: Hint at the value without giving it away"]
    : ["Opening Line: Lead with emotion or intrigue, not description", "Body: One core insight per sentence, keep under 150 characters", "Social Proof: Add a subtle credibility signal", "Hashtags: Mix broad reach (1-2) with niche discovery (3-4)", "CTA: End with a question or soft prompt to engage"];

  const hashtagPool = [
    "#fyp", "#viral", "#trending", "#learnontiktok", "#tiktoktips",
    "#contentcreator", "#growthhacks", "#storytime", "#motivation",
    "#lifehack", "#creator", "#socialmedia", "#reels", "#explore",
  ];
  const topicHashtags = extractTopicHashtags(content);
  const hashtags = [...topicHashtags, ...hashtagPool.slice(0, 6 - topicHashtags.length)];

  const checklist: ChecklistItem[] = [
    { label: "Hook in first 3 seconds", passed: wordCount > 3 && content.split(/[.!?]/)[0].split(/\s+/).length <= 15, tip: "Keep your opening line under 15 words to hook fast." },
    { label: "Clear value proposition", passed: wordCount > 10, tip: "State what the viewer will gain within the first two sentences." },
    { label: "Emotional trigger present", passed: hasQuestion || /!/.test(content) || /\b(love|hate|shocked|amazing|insane|wild)\b/i.test(content), tip: "Add an emotion word or rhetorical question to drive engagement." },
    { label: "Concise (under 200 words)", passed: wordCount <= 200, tip: "TikTok captions perform best under 200 words. Trim the fat." },
    { label: "Call-to-action included", passed: /\b(comment|share|follow|save|try|link|check|watch)\b/i.test(content) || hasQuestion, tip: "End with a CTA: ask a question, invite a save, or prompt a follow." },
    { label: "At least one hashtag", passed: /#\w+/.test(content), tip: "Include 3-5 relevant hashtags for discoverability." },
  ];

  const recommendations: string[] = [];
  if (clarity < 60) recommendations.push("Simplify sentence structure. Aim for one idea per sentence to improve clarity.");
  if (engagement < 60) recommendations.push("Open with a question or surprising fact. Current hook needs more stopping power.");
  if (originality < 60) recommendations.push("Avoid overused phrases like 'life is too short' or 'you need to try this'. Find a fresher angle.");
  if (!hasQuestion) recommendations.push("Consider adding a question to boost comment engagement. Questions drive 2x more replies.");
  if (wordCount > 150) recommendations.push("Your content is on the longer side. Consider trimming to the essential points for better retention.");
  if (recommendations.length === 0) recommendations.push("Strong content overall. Test 2-3 hook variants to find the highest retention opener.");

  return {
    id: `analysis-${seed}-${Date.now()}`,
    timestamp: new Date().toISOString(),
    inputContent: content,
    contentType,
    scores: { clarity, engagement, originality, overall },
    hooks,
    rewrites,
    structure: structureSteps,
    hashtags,
    checklist,
    recommendations,
  };
}

function truncateAndRewrite(content: string, style: string, seed: number): string {
  const words = content.split(/\s+/);
  const core = words.slice(0, Math.min(words.length, 30)).join(" ");

  switch (style) {
    case "punchy":
      return `Here is the thing. ${core.split(". ")[0]}. Full stop. Most people overcomplicate this. Do not. Try it today and see what happens.`;
    case "story":
      return `I used to think I had this figured out. Then I tried something different. ${core.split(". ")[0]}. That single shift changed everything about how I approach this.`;
    case "authority":
      return `After studying hundreds of examples, one pattern stands out. ${core.split(". ")[0]}. The data is clear: this works, and here is why.`;
    default:
      return core;
  }
}

function extractTopicHashtags(content: string): string[] {
  const existing = content.match(/#\w+/g) || [];
  if (existing.length > 0) return existing.slice(0, 3);

  const topics: Record<string, string> = {
    travel: "#travel", food: "#foodtok", cook: "#cookingtiktok",
    ai: "#ai", tech: "#techtok", fitness: "#fittok",
    beauty: "#beautytok", fashion: "#ootd", music: "#musictok",
  };

  const found: string[] = [];
  const lower = content.toLowerCase();
  for (const [keyword, tag] of Object.entries(topics)) {
    if (lower.includes(keyword)) found.push(tag);
  }
  return found.length > 0 ? found.slice(0, 3) : ["#foryou", "#tiktok"];
}

export const MOCK_METRICS = {
  usersInBeta: 2847,
  avgSessionTime: "4m 32s",
  contentAnalyzed: 18420,
  avgScoreImprovement: "+18%",
  retentionRate: "73%",
  npsScore: 62,
  topFeatureUsage: [
    { feature: "Hook Generator", pct: 89 },
    { feature: "Score Analysis", pct: 84 },
    { feature: "Rewrite Variants", pct: 76 },
    { feature: "Hashtag Suggestions", pct: 71 },
    { feature: "Content Checklist", pct: 68 },
    { feature: "Version Comparison", pct: 52 },
  ],
  weeklyActiveUsers: [
    { week: "W1", users: 320 },
    { week: "W2", users: 580 },
    { week: "W3", users: 890 },
    { week: "W4", users: 1240 },
    { week: "W5", users: 1650 },
    { week: "W6", users: 2100 },
    { week: "W7", users: 2510 },
    { week: "W8", users: 2847 },
  ],
  scoreDistribution: [
    { range: "0-20", count: 12 },
    { range: "21-40", count: 89 },
    { range: "41-60", count: 342 },
    { range: "61-80", count: 1560 },
    { range: "81-100", count: 844 },
  ],
};
