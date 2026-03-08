// components/DailyGoals.tsx
export default function DailyGoals() {
  return (
    <section id="daily" className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto border-t border-slate-800">
      <div className="text-emerald-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
        05 — Daily Goals
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
        Stay Consistent
      </h2>

      <div className="mt-10 bg-gradient-to-br from-emerald-950/20 to-violet-950/10 border border-emerald-500/15 rounded-3xl p-8 md:p-12 lg:p-16 animate-fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - motivational text */}
          <div>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
              Hit <span className="text-emerald-400">5–8</span><br />topics a day
            </h3>
            <p className="text-slate-300 font-mono text-base md:text-lg leading-relaxed max-w-xl mb-10">
              Consistency beats intensity. 6 topics per day clears the entire prep system in under 6 weeks. 
              Track every session, flag what's shaky, revisit what matters.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/interview-prep/dsa-tracker"
                className="bg-emerald-500 text-black font-mono font-bold px-7 py-3.5 rounded-xl hover:bg-emerald-400 transition-all hover:shadow-emerald-500/30 hover:-translate-y-0.5 text-sm"
              >
                Start Today →
              </a>
            </div>
          </div>

          {/* Right column - goal items */}
          <div className="space-y-4">
            {[
              { icon: "⚡", text: <><strong>5–8 topics/day</strong> — minimum viable daily target to complete prep in 6 weeks</> },
              { icon: "🔁", text: <><strong>Re-attempt flagged topics</strong> — revisit ★ review topics after 7 days for spaced repetition</> },
              { icon: "📝", text: <><strong>Write your notes</strong> — per-card notes + global notebook help cement understanding</> },
              { icon: "♥", text: <><strong>Curate favourites</strong> — star the must-revise topics before any mock or real interview</> },
              { icon: "📊", text: <><strong>Check this dashboard</strong> — watch your overall % grow daily to stay motivated</> },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/3 border border-slate-800 rounded-xl p-5 flex items-start gap-4 hover:border-emerald-500/30 transition-colors"
              >
                <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                <div className="text-sm font-mono text-slate-300 leading-relaxed">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}