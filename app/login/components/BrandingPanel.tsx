// components/BrandingPanel.tsx
export default function BrandingPanel() {
  return (
    <div className="hidden lg:flex flex-col sticky top-[58px] min-h-[calc(100vh-58px)] p-10 xl:p-16 border-r border-slate-800 overflow-hidden relative">
      {/* Glows – keep them absolute to panel */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/10 to-transparent animate-pulse-slow pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-gradient-radial from-violet-600/10 to-transparent animate-pulse-slow delay-1000 pointer-events-none" />

      {/* Content – no fixed height, let it grow */}
      <div className="relative z-10 flex flex-col justify-center flex-1">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-blink" />
          Interview Prep Hub · 2026
        </div>

        <h1 className="text-5xl xl:text-6xl font-black tracking-tighter leading-none mb-8">
          One login.<br />
          <span className="text-emerald-500">All your prep.</span>
        </h1>

        <p className="text-lg text-slate-400 font-mono max-w-xl mb-12 leading-relaxed">
          Your personal command centre for mastering technical interviews — DSA, OOPs, DBMS, OS & System Design, all in one place.
        </p>

        <div className="space-y-4 mb-12">
          {[
            { color: "var(--dsa)", text: <><strong>5 Trackers in 1</strong> — DSA, OOPs, DBMS, OS & System Design with live progress across all subjects</> },
            { color: "var(--oops)", text: <><strong>Per-card notes</strong> — write your approach, mistakes & key insights directly on every topic card</> },
            { color: "var(--dbms)", text: <><strong>Smart review system</strong> — flag topics for spaced repetition and track favourites across all subjects</> },
            { color: "var(--os)", text: <><strong>Interview-ready</strong> — 200+ curated topics with direct GFG & LeetCode links, zero distractions</> },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white/3 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
            >
              <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
              <div className="text-sm font-mono text-slate-300 leading-relaxed">{item.text}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-auto">
          {["DSA", "OOPs", "DBMS", "OS", "System Design"].map((tag, i) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-xs font-mono font-bold rounded-full border"
              style={{
                borderColor: `rgba(${i === 0 ? "0,255,136" : i === 1 ? "167,139,250" : i === 2 ? "56,189,248" : i === 3 ? "251,146,60" : "52,211,153"},0.3)`,
                color: `rgb(${i === 0 ? "0,255,136" : i === 1 ? "167,139,250" : i === 2 ? "56,189,248" : i === 3 ? "251,146,60" : "52,211,153"})`,
                backgroundColor: `rgba(${i === 0 ? "0,255,136" : i === 1 ? "167,139,250" : i === 2 ? "56,189,248" : i === 3 ? "251,146,60" : "52,211,153"},0.08)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}