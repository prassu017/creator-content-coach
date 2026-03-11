import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50 py-10 mt-20">
      <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="font-display font-semibold text-sm text-ink-700">
            Creator Content Coach
          </span>
        </div>
        <p className="text-sm text-ink-300 text-center">
          Built by Prasanna Jain as a portfolio project for AI Product Management.
        </p>
        <p className="text-xs text-ink-300">2026</p>
      </div>
    </footer>
  );
}
