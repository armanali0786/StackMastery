"use client"

// import { Theme } from "../components/types/theme"

export default function ProblemCard({
  problem,
  status,
  isFav,
  theme,
  toggleSolve,
  toggleReview,
  toggleFav,
}: any) {
  return (
    <div
      className={`group bg-[#16161f] border border-[#1e1e2e] rounded-xl overflow-hidden transition-all hover:shadow-lg`}
    >
      <div
        className="flex items-center gap-3 px-4 pt-3 pb-2 cursor-pointer"
        onClick={toggleSolve}
      >
        <div
          className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs
          ${
            status === "done"
              ? `${theme.primary} border-none`
              : "border-slate-700"
          }`}
        />

        <div className="flex-1">
          <p
            className={`text-sm font-semibold ${
              status === "done" ? "line-through text-slate-500" : ""
            }`}
          >
            {problem.name}
          </p>
        </div>

        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFav()
            }}
            className={`p-1 ${isFav ? "text-pink-500" : "text-slate-500"}`}
          >
            ♥
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleReview()
            }}
            className="p-1 text-amber-400"
          >
            ★
          </button>

          <a
            href={problem.links?.[0]?.u}
            target="_blank"
            className={`p-1 ${theme.primaryText}`}
          >
            ↗
          </a>
        </div>
      </div>
    </div>
  )
}