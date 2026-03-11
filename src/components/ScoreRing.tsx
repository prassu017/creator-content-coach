"use client";

interface ScoreRingProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
}

function getColor(score: number): string {
  if (score >= 75) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

export function ScoreRing({ score, label, size = "md" }: ScoreRingProps) {
  const color = getColor(score);
  const dims = size === "lg" ? "w-24 h-24" : size === "sm" ? "w-16 h-16" : "w-20 h-20";
  const innerDims = size === "lg" ? "w-20 h-20" : size === "sm" ? "w-12 h-12" : "w-16 h-16";
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${dims} rounded-full flex items-center justify-center`}
        style={{
          background: `conic-gradient(${color} ${score * 3.6}deg, #e8ebef ${score * 3.6}deg)`,
        }}
      >
        <div className={`${innerDims} rounded-full bg-white flex items-center justify-center`}>
          <span className={`font-display font-bold ${textSize}`} style={{ color }}>
            {score}
          </span>
        </div>
      </div>
      <span className="text-xs font-medium text-ink-500 uppercase tracking-wide">{label}</span>
    </div>
  );
}
