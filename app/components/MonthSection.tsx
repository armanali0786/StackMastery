"use client";

import { useState } from "react";
import { Theme } from "./types/theme";
import ProblemCard from "./ProblemCard";

export default function MonthSection({
  month,
  monthIndex,
  theme,
  state,
  favs,
  notes,
  openNotes,
  toggleSolve,
  toggleReview,
  toggleFav,
  toggleNoteOpen,
  updateNote,
  onBlurNote,
}: any) {

  const [collapsed, setCollapsed] = useState(false);

  let solved = 0;
  let total = 0;

  month.topics.forEach((topic: any, ti: number) => {
    total += topic.problems.length;
    topic.problems.forEach((_: any, pi: number) => {
      const k = `${monthIndex}_${ti}_${pi}`;
      if (state[k] === "done") solved++;
    });
  });

  return (
    <div className="mb-12">

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-4 mb-5"
      >
        <div className={`font-mono text-xs font-bold text-white px-3 py-1 rounded-md ${theme.primary}`}>
          {month.month}
        </div>

        <h2 className="text-lg font-bold flex-1 text-left">
          {month.theme}
        </h2>

        <div className={`${theme.primaryText} text-sm font-mono`}>
          {solved}/{total}
        </div>

        <div className={`transition-transform ${collapsed ? "rotate-180" : ""}`}>
          ▾
        </div>
      </button>

      {!collapsed && (
        <div className="space-y-8">

          {month.topics.map((topic: any, topicIdx: number) => (

            <div key={topicIdx}>

              <div className={`text-xs font-mono uppercase tracking-widest text-slate-500 mb-3 border-l-2 ${theme.primaryBorder} pl-2`}>
                {topic.label}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {topic.problems.map((problem: any, probIdx: number) => {

                  const k = `${monthIndex}_${topicIdx}_${probIdx}`;

                  return (
                    <ProblemCard
                      key={k}
                      problem={problem}
                      theme={theme}
                      monthIdx={monthIndex}
                      topicIdx={topicIdx}
                      probIdx={probIdx}
                      status={state[k] || "todo"}
                      isFav={!!favs[k]}
                      note={notes[k]}
                      isNoteOpen={!!openNotes[k]}
                      toggleSolve={toggleSolve}
                      toggleReview={toggleReview}
                      toggleFav={toggleFav}
                      toggleNoteOpen={toggleNoteOpen}
                      updateNote={updateNote}
                      onBlurNote={onBlurNote}
                    />
                  );
                })}
              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}