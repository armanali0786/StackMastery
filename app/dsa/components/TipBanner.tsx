// components/TipBanner.tsx
const TipBanner = () => {
  return (
    <div className="bg-gradient-to-br from-violet-950/30 to-emerald-950/20 border border-violet-800/30 rounded-xl p-5 mb-10 flex flex-wrap items-center gap-4">
      <div className="text-2xl">⚡</div>
      <div className="text-sm font-mono text-slate-400 leading-relaxed">
        <strong className="text-emerald-400">Click card</strong> → mark Solved
        &nbsp;·&nbsp;
        <strong className="text-amber-400">★</strong> → flag for review
        &nbsp;·&nbsp;
        <strong className="text-pink-500">♥</strong> → add to Favourites
        &nbsp;·&nbsp;
        <strong className="text-emerald-400">↗</strong> → open on LeetCode / GFG
        &nbsp;·&nbsp;
        <strong className="text-violet-400">✏</strong> → add your note
      </div>
    </div>
  );
};

export default TipBanner;