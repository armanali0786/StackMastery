// components/HowItWorks.tsx
export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Pick a Subject", desc: "Open any tracker — DSA, OOPs, DBMS, OS, or System Design — from the nav or dashboard." },
    { num: "02", title: "Study the Topic", desc: "Click the ↗ icon on any card to open the linked GFG or LeetCode resource directly." },
    { num: "03", title: "Mark as Done", desc: "Click the card to mark it done. Green stripe = complete. Progress updates instantly across all stats." },
    { num: "04", title: "Add Your Notes", desc: "Expand the ✏ note section on each card to write your approach, mistakes, or key insights." },
    { num: "05", title: "Flag for Review", desc: "Hit ★ to flag topics that need a second pass. Come back to them in 7 days for spaced repetition." },
    { num: "06", title: "Favourite Key Topics", desc: "Press ♥ to star your most important topics. View all favourites from the Favourites tab in any tracker." },
  ];

  return (
    <section id="how" className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto border-t border-slate-800">
      <div className="text-emerald-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
        04 — How It Works
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
        Built for Focused Prep
      </h2>
      <p className="text-slate-400 font-mono mb-12">
        A system designed to take you from zero to interview-ready, one concept at a time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="bg-[#16161f] border border-slate-800 rounded-xl p-8 hover:border-emerald-500/30 hover:-translate-y-1 transition-all animate-fade-up"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center mb-6">
              {step.num}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-sm font-mono text-slate-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}