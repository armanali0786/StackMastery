// import { Theme } from "@/types/theme"
import { Theme } from "../components/types/theme"

interface Stats {
  total: number
  solved: number
  review: number
  fav: number
  remaining: number
  progress: number
}

interface Props {
  stats: Stats
  theme: Theme
}

export default function StatsBar({ stats, theme }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
      <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-5 relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-0.5 ${theme.primary}`} />

        <div className="text-xs font-mono uppercase text-slate-500 mb-2">
          Solved
        </div>

        <div className={`text-3xl font-extrabold ${theme.primaryText}`}>
          {stats.solved}
        </div>

        <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`${theme.primary} h-full transition-all duration-700`}
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </div>

      <StatCard title="Favourites" value={stats.fav} color="text-pink-500" />
      <StatCard title="Review" value={stats.review} color="text-amber-500" />
      <StatCard title="Remaining" value={stats.remaining} color="text-slate-400" />
      <StatCard title="Total" value={stats.total} color="text-slate-200" />
    </div>
  )
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string
  value: number
  color: string
}) {
  return (
    <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-5">
      <div className="text-xs font-mono uppercase text-slate-500 mb-2">
        {title}
      </div>
      <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
    </div>
  )
}