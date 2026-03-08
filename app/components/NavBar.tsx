"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "DSA", href: "/dsa" },
  { label: "OOPs", href: "/oops" },
  { label: "DBMS", href: "/dbms" },
  { label: "OS", href: "/os" },
  { label: "System Design", href: "/system-design" },
  { label: "Login", href: "/login" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-slate-800/80 h-[58px] flex items-center px-6 md:px-8">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-extrabold text-lg tracking-tight"
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-mono font-black text-black text-sm">
            AR
          </div>
          <span>
            Prep<span className="text-emerald-500">Stack</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  px-3 py-1.5 text-xs font-mono uppercase tracking-wide rounded-md border transition-all
                  ${
                    isActive
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700/50"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-5 h-0.5 bg-slate-400 rounded-full" />
          <span className="w-5 h-0.5 bg-slate-400 rounded-full" />
          <span className="w-5 h-0.5 bg-slate-400 rounded-full" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[58px] left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-slate-800 px-6 py-5 flex flex-col gap-2 z-40">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`py-2 text-sm font-mono ${
                  isActive
                    ? "text-emerald-400"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}