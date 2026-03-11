"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/product", label: "Product" },
  { href: "/design", label: "Design" },
  { href: "/tech", label: "Tech" },
  { href: "/results", label: "Results" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-surface-200">
      <div className="container-wide flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center group-hover:bg-brand-700 transition-colors">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-ink-900">
            Content<span className="text-brand-600">Coach</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-display font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-500 hover:text-ink-900 hover:bg-surface-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/demo" className="btn-primary text-sm py-2">
            Try Demo
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-surface-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-surface-200 bg-white px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-display font-medium ${
                pathname === link.href ? "bg-brand-50 text-brand-700" : "text-ink-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
