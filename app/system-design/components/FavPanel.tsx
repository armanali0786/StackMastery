// components/FavPanel.tsx
import { ProblemData, State, Fav, Notes } from "./types";
import ProblemCard from "./ProblemCard";

interface FavPanelProps {
  data: ProblemData[];
  favs: Fav;
  state: State;
  notes: Notes;
  openNotes: Record<string, boolean>;
  toggleSolve: (m: number, t: number, p: number) => void;
  toggleReview: (m: number, t: number, p: number) => void;
  toggleFav: (m: number, t: number, p: number) => void;
  toggleNoteOpen: (key: string) => void;
  updateNote: (key: string, val: string) => void;
}

const FavPanel = ({
  data,
  favs,
  state,
  notes,
  openNotes,
  toggleSolve,
  toggleReview,
  toggleFav,
  toggleNoteOpen,
  updateNote,
}: FavPanelProps) => {
  const favouriteItems: Array<{
    problem: any;
    monthIdx: number;
    topicIdx: number;
    probIdx: number;
  }> = [];

  data.forEach((month, mi) =>
    month.topics.forEach((topic, ti) =>
      topic.problems.forEach((problem, pi) => {
        const k = `${mi}_${ti}_${pi}`;
        if (favs[k]) {
          favouriteItems.push({ problem, monthIdx: mi, topicIdx: ti, probIdx: pi });
        }
      })
    )
  );

  const count = favouriteItems.length;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-pink-600 text-white font-mono text-xs font-bold px-3 py-1 rounded-md">
          ♥ FAVOURITES
        </div>
        <h2 className="text-xl font-bold flex-1">Your Starred Problems</h2>
        <div className="text-sm font-mono text-emerald-400">
          {count} problem{count !== 1 ? "s" : ""}
        </div>
      </div>

      {count === 0 ? (
        <div className="text-center py-20 text-slate-500 font-mono text-sm">
          <div className="text-5xl mb-4">♡</div>
          No favourites yet.<br />
          Click the <span className="text-pink-500">♥</span> icon on any problem card to add it here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favouriteItems.map(({ problem, monthIdx, topicIdx, probIdx }) => {
            const k = `${monthIdx}_${topicIdx}_${probIdx}`;
            return (
              <ProblemCard
                key={k}
                problem={problem}
                monthIdx={monthIdx}
                topicIdx={topicIdx}
                probIdx={probIdx}
                status={state[k] || "todo"}
                isFav={true}
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
      )}
    </div>
  );
};

export default FavPanel;