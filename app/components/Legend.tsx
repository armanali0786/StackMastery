// import { Theme } from "@/types/theme"
import { Theme } from "../components/types/theme"

export default function Legend({ theme }: { theme: Theme }) {
  return (
    <div className="flex flex-wrap gap-5 items-center mb-8">
      <LegendItem label="Solved" color={theme.solved} />
      <LegendItem label="Review" color={theme.review} />
      <LegendItem label="Favourite" color={theme.fav} shape="circle" />
    </div>
  )
}

function LegendItem({
  label,
  color,
  shape = "square",
}: {
  label: string
  color: string
  shape?: "square" | "circle"
}) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
      <div
        className={`w-2.5 h-2.5 ${color} ${
          shape === "circle" ? "rounded-full" : "rounded-sm"
        }`}
      />
      {label}
    </div>
  )
}