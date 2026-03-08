// components/ProblemCard.tsx
"use client";

import { Problem, StateValue } from "./types";

type ProblemCardProps = {
  problem: Problem;
  monthIdx: number;
  topicIdx: number;
  probIdx: number;
  status: StateValue;
  isFav: boolean;
  note?: string;
  isNoteOpen: boolean;
  toggleSolve: (m: number, t: number, p: number) => void;
  toggleReview: (m: number, t: number, p: number) => void;
  toggleFav: (m: number, t: number, p: number) => void;
  toggleNoteOpen: (key: string) => void;
  updateNote: (key: string, val: string) => void;
};

export default function ProblemCard({
  problem,
  monthIdx,
  topicIdx,
  probIdx,
  status,
  isFav,
  note = "",
  isNoteOpen,
  toggleSolve,
  toggleReview,
  toggleFav,
  toggleNoteOpen,
  updateNote,
}: ProblemCardProps) {
  const key = `${monthIdx}_${topicIdx}_${probIdx}`;

  const checkContent =
    status === "done" ? (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ) : status === "review" ? (
      "★"
    ) : null;

  return (
    <div
      className={`
        group bg-[#16161f] border border-[#1e1e2e] rounded-xl overflow-hidden
        transition-all duration-200 hover:border-emerald-500/30 hover:shadow-emerald-500/5 hover:-translate-y-px
        ${status === "done" ? "border-emerald-700/30 bg-emerald-950/10" : ""}
        ${status === "review" ? "border-amber-600/30 bg-amber-950/10" : ""}
        ${isFav ? "outline outline-1 outline-pink-500/30" : ""}
      `}
    >
      {/* Top row */}
      <div
        className="flex items-center gap-3 px-4 pt-3 pb-2 cursor-pointer"
        onClick={() => toggleSolve(monthIdx, topicIdx, probIdx)}
      >
        <div
          className={`
            w-5 h-5 rounded-md border-2 flex items-center justify-center text-xs font-bold flex-shrink-0
            ${status === "done" ? "bg-emerald-500 border-emerald-500 text-white" : ""}
            ${status === "review" ? "bg-amber-500 border-amber-500 text-black" : "border-slate-700"}
          `}
        >
          {checkContent}
        </div>

        <div className="flex-1">
          <p
            className={`text-sm font-semibold leading-tight ${
              status === "done" ? "line-through text-slate-500" : ""
            }`}
          >
            {problem.name}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFav(monthIdx, topicIdx, probIdx);
            }}
            className={`p-1.5 rounded-md hover:bg-white/5 transition-colors ${
              isFav ? "text-pink-500" : "text-slate-500 hover:text-pink-400"
            }`}
            title={isFav ? "Remove from favourites" : "Add to favourites"}
          >
            {isFav ? "♥" : "♡"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleReview(monthIdx, topicIdx, probIdx);
            }}
            className={`p-1.5 rounded-md hover:bg-white/5 transition-colors ${
              status === "review" ? "text-amber-400" : "text-slate-500 hover:text-amber-400"
            }`}
            title={status === "review" ? "Remove review flag" : "Flag for review"}
          >
            {status === "review" ? "★" : "☆"}
          </button>

          {problem.links.length === 1 ? (
            <a
              href={problem.links[0].u}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-md text-slate-500 hover:text-emerald-400 hover:bg-white/5 transition-colors"
              title="Open resource"
            >
              ↗
            </a>
          ) : (
            <button
              className="p-1.5 rounded-md text-slate-500 hover:text-emerald-400 hover:bg-white/5 transition-colors"
              title="Open resource"
              // You can add dropdown logic here later if needed
            >
              ↗
            </button>
          )}
        </div>
      </div>

      {/* Chips / Tags */}
      <div className="flex gap-1.5 px-4 pb-2.5 flex-wrap">
        {(problem.tags || []).map((tag, i) => (
          <span
            key={`tag-${i}`}
            className={`
              text-[10px] font-bold px-1.5 py-0.5 rounded-sm
              ${tag === "concept" ? "bg-emerald-950/40 text-emerald-400" : ""}
              ${tag === "sql" ? "bg-emerald-950/40 text-emerald-400" : ""}
            `}
          >
            {tag.toUpperCase()}
          </span>
        ))}

        {problem.links.map((link, i) => (
          <span
            key={`link-${i}`}
            className={`
              text-[10px] font-bold px-1.5 py-0.5 rounded-sm
              ${link.t === "gfg" ? "bg-green-950/40 text-green-400" : ""}
              ${link.t === "web" ? "bg-emerald-950/40 text-emerald-400" : ""}
              ${link.t === "yt"  ? "bg-red-950/40 text-red-400" : ""}
            `}
          >
            {link.l}
          </span>
        ))}
      </div>

      {/* Note area */}
      <div className="border-t border-slate-800">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleNoteOpen(key);
          }}
          className={`
            w-full flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wide text-slate-500 hover:text-emerald-400
            ${note ? "text-emerald-400/90" : ""}
          `}
        >
          <span>✏</span>
          <span className="flex-1 text-left truncate">
            {note || "Add a note…"}
          </span>
          <span className="text-xs">{isNoteOpen ? "▲" : "▼"}</span>
        </button>

        {isNoteOpen && (
          <div className="px-4 pb-3">
            <textarea
              value={note}
              onChange={(e) => updateNote(key, e.target.value)}
              placeholder="Your understanding, queries, tricky parts, normalization examples…"
              className="
                w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2.5
                text-sm text-slate-200 font-mono resize-y min-h-[80px]
                focus:border-emerald-500 focus:outline-none
              "
            />
          </div>
        )}
      </div>
    </div>
  );
}