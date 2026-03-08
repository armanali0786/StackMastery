// import { Theme } from "@/types/theme"
import { Theme } from "../components/types/theme"


export default function TipBanner({ theme }: { theme: Theme }) {
  return (
    <div
      className={`bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} border border-slate-800 rounded-xl p-5 mb-10 flex items-center gap-4`}
    >
      <div className="text-2xl">{theme.icon}</div>

      <div className="text-sm font-mono text-slate-400 leading-relaxed">
        <strong className={theme.primaryText}>Click card</strong> → mark solved ·
        ★ → review · ♥ → favourite · ↗ → open resource · ✏ → add note
      </div>
    </div>
  )
}