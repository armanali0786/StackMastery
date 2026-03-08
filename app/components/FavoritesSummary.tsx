// components/FavoritesSummary.tsx
"use client";

import { useEffect, useState } from "react";

const trackers = [
  { key: "dsa", name: "DSA", icon: "🧮", color: "#00ff88", href: "/interview-prep/dsa-tracker" },
  { key: "oops", name: "OOPs", icon: "🧩", color: "#a78bfa", href: "/interview-prep/oops-tracker" },
  { key: "dbms", name: "DBMS", icon: "🗄️", color: "#38bdf8", href: "/interview-prep/dbms-tracker" },
  { key: "os", name: "OS", icon: "💻", color: "#fb923c", href: "/interview-prep/os-tracker" },
  { key: "sd", name: "System Design", icon: "🏗️", color: "#34d399", href: "/interview-prep/system-design-tracker" },
];

export default function FavoritesSummary() {
  const [favCounts, setFavCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const counts: Record<string, number> = {};

    trackers.forEach((t) => {
      let FAV: Record<string, boolean> = {};
      try {
        FAV = JSON.parse(localStorage.getItem(`${t.key}_f`) || "{}");
      } catch {}
      counts[t.key] = Object.values(FAV).filter(Boolean).length;
    });

    setFavCounts(counts);
  }, []);

  return (
    <section id="favs" className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto border-t border-slate-800">
      <div className="text-emerald-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
        06 — Favourites
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
        Quick Access to Starred Topics
      </h2>
      <p className="text-slate-400 font-mono mb-10">
        Jump directly to the Favourites tab in any tracker to review your starred topics.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trackers.map((t, i) => {
          const count = favCounts[t.key] || 0;
          return (
            <a
              key={t.key}
              href={`${t.href}#fav`}
              className="bg-[#16161f] border border-slate-800 rounded-xl p-6 flex items-center gap-5 hover:border-pink-500/30 hover:-translate-y-1 transition-all animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="text-3xl flex-shrink-0">{t.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold">{t.name} Favourites</div>
                <div className="text-xs font-mono text-slate-500 mt-1">
                  {count} starred topic{count !== 1 ? "s" : ""} · Open tracker → Favourites tab
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-pink-500 flex-shrink-0" />
            </a>
          );
        })}
      </div>
    </section>
  );
}