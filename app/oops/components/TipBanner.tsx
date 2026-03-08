// components/StatsBar.tsx
import { FC } from "react";

interface Stats {
  total: number;
  solved: number;
  review: number;
  fav: number;
  remaining: number;
  progress: number;
}

interface StatsBarProps {
  stats: Stats;
}

const StatsBar: FC<StatsBarProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
      <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-violet-500" />
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
          Covered
        </div>
        <div className="text-3xl font-extrabold text-violet-400">
          {stats.solved}
        </div>
        <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full transition-all duration-700"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </div>

      <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
          Favourites
        </div>
        <div className="text-3xl font-extrabold text-pink-500">
          {stats.fav}
        </div>
      </div>

      <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
          For Review
        </div>
        <div className="text-3xl font-extrabold text-amber-500">
          {stats.review}
        </div>
      </div>

      <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
          Remaining
        </div>
        <div className="text-3xl font-extrabold text-slate-400">
          {stats.remaining}
        </div>
      </div>

      <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-5">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
          Total
        </div>
        <div className="text-3xl font-extrabold text-slate-200">
          {stats.total}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;