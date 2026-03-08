"use client"

import { Dispatch, SetStateAction } from "react"
// import { Theme } from "@/types/theme"
import { Theme } from "../components/types/theme"


interface Props {
  title: string
  subtitle: string
  badge: string

  currentTab: "all" | "fav"
  setCurrentTab: Dispatch<SetStateAction<"all" | "fav">>
  favCount: number

  theme: Theme
}

export default function TrackerHeader({
  title,
  subtitle,
  badge,
  currentTab,
  setCurrentTab,
  favCount,
  theme,
}: Props) {
  return (
    <header className="pb-8 mt-10 border-b border-slate-800 mb-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 ${theme.primary} rounded-lg flex items-center justify-center font-mono font-bold text-black text-xl`}
          >
            {badge}
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {title} <span className={theme.primaryText}>Tracker</span>
            </h1>

            <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
              {subtitle}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCurrentTab("all")}
              className={`px-4 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                currentTab === "all"
                  ? `${theme.primary} ${theme.primaryBorder} text-black font-bold`
                  : "border-slate-700 text-slate-400 hover:text-white"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setCurrentTab("fav")}
              className={`px-4 py-1.5 text-xs font-mono rounded-lg border transition-all flex items-center gap-2 ${
                currentTab === "fav"
                  ? `${theme.primary} ${theme.primaryBorder} text-black font-bold`
                  : "border-slate-700 text-slate-400 hover:text-white"
              }`}
            >
              ♥ Favourites
              <span className="text-slate-300 opacity-80">({favCount})</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}