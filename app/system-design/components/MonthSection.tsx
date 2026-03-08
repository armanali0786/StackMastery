// components/MonthSection.tsx
"use client";

import { useState } from "react";
import { ProblemData, State, Fav, Notes } from "./types";
import ProblemCard from "./ProblemCard";

interface MonthSectionProps {
    month: ProblemData;
    monthIndex: number;
    state: State;
    favs: Fav;
    notes: Notes;
    openNotes: Record<string, boolean>;
    toggleSolve: (m: number, t: number, p: number) => void;
    toggleReview: (m: number, t: number, p: number) => void;
    toggleFav: (m: number, t: number, p: number) => void;
    toggleNoteOpen: (key: string) => void;
    updateNote: (key: string, val: string) => void;
}

const colors = [
  "#059669", // emerald-700
  "#10b981", // emerald-500
  "#34d399", // emerald-400
  "#6ee7b7", // emerald-300
  "#047857", // emerald-800
  "#065f46", // emerald-900
];

const MonthSection = ({
    month,
    monthIndex,
    state,
    favs,
    notes,
    openNotes,
    toggleSolve,
    toggleReview,
    toggleFav,
    toggleNoteOpen,
    updateNote,
}: MonthSectionProps) => {
    const [collapsed, setCollapsed] = useState(false);

    let solved = 0;
    let total = 0;

    month.topics.forEach((topic) => {
        total += topic.problems.length;
        topic.problems.forEach((_, pi) => {
            const k = `${monthIndex}_${month.topics.indexOf(topic)}_${pi}`;
            if (state[k] === "done") solved++;
        });
    });

    return (
        <div
            className="mb-12 animate-fade-in"
            style={{ animationDelay: `${monthIndex * 70}ms` }}
        >
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="w-full flex items-center gap-4 mb-5 group"
            >
                <div
                    className="font-mono text-xs font-bold text-white px-3 py-1 rounded-md"
                    style={{ backgroundColor: colors[monthIndex % colors.length] }}
                >
                    {month.month}
                </div>
                <h2 className="text-lg font-bold flex-1 text-left">{month.theme}</h2>
                <div className="text-sm font-mono text-emerald-400">
                    {solved}/{total}
                </div>
                <div
                    className={`text-slate-500 transition-transform duration-300 ${collapsed ? "rotate-180" : ""
                        }`}
                >
                    ▾
                </div>
            </button>

            {!collapsed && (
                <div className="space-y-8">
                    {month.topics.map((topic, topicIdx) => (
                        <div key={topicIdx}>
                            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3 border-l-2 border-amber-500 pl-2">
                                {topic.label}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {topic.problems.map((problem, probIdx) => {
                                    const k = `${monthIndex}_${topicIdx}_${probIdx}`;
                                    return (
                                        <ProblemCard
                                            key={k}
                                            problem={problem}
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
};

export default MonthSection;