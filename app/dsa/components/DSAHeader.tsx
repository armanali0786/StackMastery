// components/DSAHeader.tsx
"use client";

import { Dispatch, SetStateAction } from "react";

interface DSAHeaderProps {
  currentTab: "all" | "fav";
  setCurrentTab: Dispatch<SetStateAction<"all" | "fav">>;
  favCount: number;
}

const DSAHeader = ({ currentTab, setCurrentTab, favCount }: DSAHeaderProps) => {
  return (
    <header className="pb-8 mt-10 border-b border-slate-800 mb-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 flex-wrap">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center font-mono font-bold text-black text-xl">
            DSA
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Mastery <span className="text-emerald-500">Tracker</span>
            </h1>
            <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
              6-Month Roadmap · 2026
            </div>
          </div>
        </div>

        {/* Tabs + Legend */}
        <div className="flex flex-col items-end gap-4">
          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCurrentTab("all")}
              className={`
                px-4 py-1.5 text-xs font-mono rounded-lg border transition-all
                ${
                  currentTab === "all"
                    ? "bg-emerald-500 border-emerald-500 text-black font-bold"
                    : "border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-400"
                }
              `}
            >
              All Problems
            </button>

            <button
              onClick={() => setCurrentTab("fav")}
              className={`
                px-4 py-1.5 text-xs font-mono rounded-lg border transition-all flex items-center gap-2
                ${
                  currentTab === "fav"
                    ? "bg-emerald-500 border-emerald-500 text-black font-bold"
                    : "border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-400"
                }
              `}
            >
              <span className="w-2 h-2 rounded-full bg-pink-500 inline-block" />
              Favourites
              <span className="text-slate-300 opacity-80">({favCount})</span>
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-5 items-center">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              Solved
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <div className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
              Review
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              Favourite
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DSAHeader;