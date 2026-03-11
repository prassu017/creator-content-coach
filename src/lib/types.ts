export interface AnalysisRequest {
  content: string;
  contentType: "caption" | "script" | "hook";
  mode: "demo" | "live";
}

export interface ScoreBreakdown {
  clarity: number;
  engagement: number;
  originality: number;
  overall: number;
}

export interface HookIdea {
  text: string;
  style: "question" | "statistic" | "story" | "bold-claim" | "contrast";
}

export interface RewriteVariant {
  label: string;
  text: string;
  tone: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  inputContent: string;
  contentType: string;
  scores: ScoreBreakdown;
  hooks: HookIdea[];
  rewrites: RewriteVariant[];
  structure: string[];
  hashtags: string[];
  checklist: ChecklistItem[];
  recommendations: string[];
}

export interface ChecklistItem {
  label: string;
  passed: boolean;
  tip: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  preview: string;
  scores: ScoreBreakdown;
}
