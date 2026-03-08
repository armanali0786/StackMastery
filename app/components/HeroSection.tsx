// components/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-8 pt-24 pb-16 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/10 to-transparent animate-pulse-slow" />
      <div className="absolute -bottom-16 -right-16 w-[500px] h-[500px] bg-gradient-radial from-violet-600/10 to-transparent animate-pulse-slow delay-1000" />

      <div className="max-w-4xl text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-blink" />
          Interview Prep Hub · 2026
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-8">
          <span className="block">Master Your</span>
          <span className="block text-emerald-500">Technical Interviews</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 font-mono max-w-2xl mx-auto mb-12 leading-relaxed">
          Track your progress across DSA, OOPs, DBMS, OS, and System Design in one powerful dashboard.  
          Every concept. Every topic. One place.
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          <a
            href="#progress"
            className="bg-emerald-500 text-black font-mono font-bold px-8 py-4 rounded-xl hover:bg-emerald-400 transition-all hover:shadow-emerald-500/30 hover:-translate-y-1"
          >
            View My Progress
          </a>
          <a
            href="#trackers"
            className="border border-slate-700 text-slate-200 font-mono font-bold px-8 py-4 rounded-xl hover:border-slate-500 hover:-translate-y-1 transition-all"
          >
            Browse Trackers
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {["DSA", "OOPs", "DBMS", "OS", "System Design"].map((tag, i) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-xs font-mono font-bold rounded-full border text-sm"
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
    </section>
  );
}