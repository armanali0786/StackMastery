// components/TrackerCards.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../lib/api";
import { useTopicContent } from "../../lib/hooks/useTopicContent";
import { TRACKER_META, countProblems, TrackerMonth } from "../../lib/trackerMeta";

// ── Per-tracker data hook wrapper ──────────────────────────────────────────
function useAllTopicData() {
  const dsa  = useTopicContent("dsa");
  const oops = useTopicContent("oops");
  const dbms = useTopicContent("dbms");
  const os   = useTopicContent("os");
  const sd   = useTopicContent("sd");

  return { dsa, oops, dbms, os, sd };
}

export default function TrackerCards() {
  const [stats, setStats] = useState<Record<string, { done: number; review: number; fav: number }>>({});

  const topicContents = useAllTopicData();

  // Map tracker id → live topic data (or null while loading)
  const topicDataMap: Record<string, TrackerMonth[] | null> = {
    dsa:  topicContents.dsa.topicData  as TrackerMonth[] | null,
    oops: topicContents.oops.topicData as TrackerMonth[] | null,
    dbms: topicContents.dbms.topicData as TrackerMonth[] | null,
    os:   topicContents.os.topicData   as TrackerMonth[] | null,
    sd:   topicContents.sd.topicData   as TrackerMonth[] | null,
  };

  const loadingMap: Record<string, boolean> = {
    dsa:  topicContents.dsa.loading,
    oops: topicContents.oops.loading,
    dbms: topicContents.dbms.loading,
    os:   topicContents.os.loading,
    sd:   topicContents.sd.loading,
  };

  useEffect(() => {
    const loadData = async () => {
      let backendTrackers: any[] = [];
      try {
        const res = await fetchWithAuth("/api/tracker/all");
        if (res.ok) {
          const data = await res.json();
          backendTrackers = data.trackers;
        }
      } catch (err) {}

      const newStats: Record<string, { done: number; review: number; fav: number }> = {};

      TRACKER_META.forEach((t) => {
        let S: Record<string, string> = {};
        let FAV: Record<string, boolean> = {};

        const dbTracker = backendTrackers.find((b) => b.subject === t.id);
        if (dbTracker) {
          S   = dbTracker.states || {};
          FAV = dbTracker.favs   || {};
        }

        const done   = Object.values(S).filter((v) => v === "done").length;
        const review = Object.values(S).filter((v) => v === "review").length;
        const fav    = Object.values(FAV).filter(Boolean).length;

        newStats[t.id] = { done, review, fav };
      });

      setStats(newStats);
    };

    loadData();
  }, []);

  return (
    <section id="trackers" className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="text-emerald-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
        03 — Trackers
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
        All Subject Trackers
      </h2>
      <p className="text-slate-400 font-mono mb-12">
        Click any tracker to open it. Progress shown live from your saved data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRACKER_META.map((t, i) => {
          const s = stats[t.id] || { done: 0, review: 0, fav: 0 };

          // Dynamically compute total from live API data, fall back to fallback data count
          const isLoading = loadingMap[t.id];
          const liveData  = topicDataMap[t.id];
          const total     = countProblems(liveData ?? t.fallback as TrackerMonth[]);
          const pct       = total > 0 ? Math.round((s.done / total) * 100) : 0;
          const remaining = total - s.done;

          return (
            <a
              key={t.id}
              href={t.href}
              className="bg-[#16161f] border border-slate-800 rounded-2xl p-8 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 group animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, "--tc": t.color } as any}
            >
              <div className="flex items-center gap-5 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-black text-lg flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.abbr}
                </div>
                <div>
                  <div className="text-xl font-extrabold">{t.name}</div>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">{t.desc}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: t.color }}
                />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-5 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-black" style={{ color: t.color }}>
                    {s.done}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                    Done
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-yellow-400">{s.review}</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                    Review
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-pink-500">{s.fav}</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                    Favs
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-400">
                    {isLoading ? <span className="text-slate-600 text-lg">…</span> : remaining}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                    Left
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color: t.color }}>
                    {isLoading ? <span className="text-slate-600 text-lg">…</span> : `${pct}%`}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                    Complete
                  </div>
                </div>
              </div>

              {/* Total badge */}
              <div className="flex items-center justify-between">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs font-bold"
                  style={{ color: t.color, border: `1px solid ${t.color}60` }}
                >
                  Open Tracker
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-[10px] font-mono text-slate-600">
                  {isLoading ? "loading…" : `${total} total`}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}