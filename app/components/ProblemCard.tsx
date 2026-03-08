"use client";

import { Theme } from "./types/theme";
import { Problem, StateValue } from "./types/problem";

type Props = {
  problem: Problem;
  monthIdx: number;
  topicIdx: number;
  probIdx: number;

  status: StateValue;
  isFav: boolean;

  note?: string;
  isNoteOpen: boolean;

  theme: Theme;

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
  theme,
  toggleSolve,
  toggleReview,
  toggleFav,
  toggleNoteOpen,
  updateNote,
}: Props) {

  const key = `${monthIdx}_${topicIdx}_${probIdx}`;

  return (
    <div
      className={`
        group bg-[#16161f] border border-[#1e1e2e] rounded-xl overflow-hidden
        transition-all duration-200 hover:${theme.primaryBorder}/30 hover:-translate-y-px
        ${status === "done" ? "border-emerald-700/30 bg-emerald-950/10" : ""}
        ${status === "review" ? "border-amber-600/30 bg-amber-950/10" : ""}
        ${isFav ? "outline outline-1 outline-pink-500/30" : ""}
      `}
    >
      {/* Top Row */}
      <div
        className="flex items-center gap-3 px-4 pt-3 pb-2 cursor-pointer"
        onClick={() => toggleSolve(monthIdx, topicIdx, probIdx)}
      >
        <div
          className={`
            w-5 h-5 rounded-md border-2 flex items-center justify-center text-xs
            ${status === "done" ? `${theme.primary} ${theme.primaryBorder} text-black` : ""}
            ${status === "review" ? "bg-amber-500 border-amber-500 text-black" : "border-slate-700"}
          `}
        >
          {status === "done" && "✓"}
          {status === "review" && "★"}
        </div>

        <div className="flex-1">
          <p
            className={`text-sm font-semibold ${
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
            className={`p-1.5 ${
              isFav ? "text-pink-500" : "text-slate-500 hover:text-pink-400"
            }`}
          >
            {isFav ? "♥" : "♡"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleReview(monthIdx, topicIdx, probIdx);
            }}
            className={`p-1.5 ${
              status === "review"
                ? "text-amber-400"
                : "text-slate-500 hover:text-amber-400"
            }`}
          >
            {status === "review" ? "★" : "☆"}
          </button>

          {problem.links?.length > 0 && (
            <a
              href={problem.links[0].u}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`p-1.5 text-slate-500 hover:${theme.primaryText}`}
            >
              ↗
            </a>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-1.5 px-4 pb-2 flex-wrap">
        {(problem.tags || []).map((tag, i) => (
          <span
            key={i}
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-slate-900 text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Notes */}
      <div className="border-t border-slate-800">

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleNoteOpen(key);
          }}
          className={`w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-500 hover:${theme.primaryText}`}
        >
          ✏ {note || "Add note"}
        </button>

        {isNoteOpen && (
          <div className="px-4 pb-3">
            <textarea
              value={note}
              onChange={(e) => updateNote(key, e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}