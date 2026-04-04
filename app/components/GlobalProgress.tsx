// components/GlobalProgress.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../lib/api";

type TrackerStats = {
  done: number;
  review: number;
  fav: number;
  total: number;
};

const trackers = [
  { key: "dsa", name: "DSA", color: "#00ff88", total: 75 },
  { key: "oops", name: "OOPs", color: "#a78bfa", total: 44 },
  { key: "dbms", name: "DBMS", color: "#38bdf8", total: 44 },
  { key: "os", name: "OS", color: "#fb923c", total: 41 },
  { key: "sd", name: "System Design", color: "#34d399", total: 48 },
];

export default function GlobalProgress() {
  const [stats, setStats] = useState({
    totalAll: 0,
    doneAll: 0,
    reviewAll: 0,
    favAll: 0,
    pct: 0,
  });

  const [subjectProgress, setSubjectProgress] = useState<
    { name: string; pct: number; color: string }[]
  >([]);

  useEffect(() => {
    let totalAll = 0;
    let doneAll = 0;
    let reviewAll = 0;
    let favAll = 0;

    const subjProg: { name: string; pct: number; color: string }[] = [];

    const loadData = async () => {
      let backendTrackers: any[] = [];
      try {
        const res = await fetchWithAuth("/api/tracker/all");
        if (res.ok) {
          const data = await res.json();
          backendTrackers = data.trackers;
        }
      } catch (err) {}

      trackers.forEach((t) => {
        let S: Record<string, string> = {};
        let FAV: Record<string, boolean> = {};

        const dbTracker = backendTrackers.find(b => b.subject === t.key);
        if (dbTracker) {
          S = dbTracker.states || {};
          FAV = dbTracker.favs || {};
        }

        const done = Object.values(S).filter((v) => v === "done").length;
        const review = Object.values(S).filter((v) => v === "review").length;
        const fav = Object.values(FAV).filter(Boolean).length;

        const pct = t.total > 0 ? Math.round((done / t.total) * 100) : 0;

        totalAll += t.total;
        doneAll += done;
        reviewAll += review;
        favAll += fav;

        subjProg.push({ name: t.name, pct, color: t.color });
      });

      const pct = totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0;

      setStats({ totalAll, doneAll, reviewAll, favAll, pct });
      setSubjectProgress(subjProg);
    };

    loadData();
  }, []);

  const remaining = stats.totalAll - stats.doneAll;

  return (
    <section id="progress" className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="text-emerald-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
        02 — Global Progress
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
        Your Preparation Overview
      </h2>
      <p className="text-slate-400 font-mono text-sm md:text-base max-w-xl mb-12">
        Live stats pulled from all your trackers. Every card you mark updates these numbers.
      </p>

      {/* Overall Progress Bar */}
      <div className="bg-[#16161f] border border-slate-800 rounded-2xl p-8 md:p-10 mb-10 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6 flex-wrap">
          <div>
            <div className="text-lg font-bold">Overall Completion</div>
            <div className="text-xs font-mono text-slate-500 mt-1">
              {stats.doneAll} of {stats.totalAll} topics completed across all 5 subjects
            </div>
          </div>
          <div className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tight">
            {stats.pct}%
          </div>
        </div>

        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-emerald-500 transition-all duration-1000"
            style={{ width: `${stats.pct}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {subjectProgress.map((s) => (
            <span
              key={s.name}
              className="text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-2"
              style={{
                color: s.color,
                backgroundColor: `${s.color}15`,
                border: `1px solid ${s.color}30`,
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              {s.name} {s.pct}%
            </span>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {[
          { label: "Total Topics", value: stats.totalAll, color: "text-white", sub: "across all subjects" },
          { label: "Completed", value: stats.doneAll, color: "text-emerald-400", sub: "marked as done" },
          { label: "For Review", value: stats.reviewAll, color: "text-yellow-400", sub: "flagged to revisit" },
          { label: "Favourites", value: stats.favAll, color: "text-pink-500", sub: "starred topics" },
          { label: "Remaining", value: remaining, color: "text-slate-400", sub: "topics left" },
        ].map((item, i) => (
          <div
            key={item.label}
            className="bg-[#16161f] border border-slate-800 rounded-xl p-6 relative overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: item.color.replace("text-", "") }} />
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
              {item.label}
            </div>
            <div className={`text-4xl md:text-5xl font-black ${item.color}`}>
              {item.value}
            </div>
            <div className="text-xs font-mono text-slate-500 mt-2">{item.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}