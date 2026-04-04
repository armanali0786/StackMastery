"use client";

import { ProblemData, State, Fav, Notes } from "./types/problem";
import { Theme } from "./types/theme";
import ProblemCard from "./ProblemCard";

type Props = {
  data: ProblemData[];

  state: State;
  favs: Fav;
  notes: Notes;

  openNotes: Record<string, boolean>;

  theme: Theme;

  toggleSolve: (m: number, t: number, p: number) => void;
  toggleReview: (m: number, t: number, p: number) => void;
  toggleFav: (m: number, t: number, p: number) => void;

  toggleNoteOpen: (key: string) => void;
  updateNote: (key: string, val: string) => void;
  onBlurNote?: () => void;
};

export default function FavPanel({
  data,
  state,
  favs,
  notes,
  openNotes,
  theme,
  toggleSolve,
  toggleReview,
  toggleFav,
  toggleNoteOpen,
  updateNote,
  onBlurNote,
}: Props) {

  const favItems: any[] = [];

  data.forEach((month, mi) =>
    month.topics.forEach((topic, ti) =>
      topic.problems.forEach((problem, pi) => {
        const key = `${mi}_${ti}_${pi}`;

        if (favs[key]) {
          favItems.push({
            problem,
            monthIdx: mi,
            topicIdx: ti,
            probIdx: pi,
            key,
          });
        }
      })
    )
  );

  if (favItems.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 font-mono">
        No favourites yet ⭐
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {favItems.map((item) => {

        const { problem, monthIdx, topicIdx, probIdx, key } = item;

        return (
          <ProblemCard
            key={key}
            theme={theme}
            problem={problem}
            monthIdx={monthIdx}
            topicIdx={topicIdx}
            probIdx={probIdx}
            status={state[key] || "todo"}
            isFav={!!favs[key]}
            note={notes[key]}
            isNoteOpen={!!openNotes[key]}
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
  );
}