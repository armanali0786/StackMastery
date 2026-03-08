// components/TipBanner.tsx
export default function TipBanner() {
  return (
    <div className="bg-gradient-to-br from-sky-950/30 to-sky-950/10 border border-sky-800/30 rounded-xl p-5 mb-10 flex flex-wrap items-center gap-4">
      <div className="text-2xl">🗄️</div>
      <div className="text-sm font-mono text-slate-400 leading-relaxed">
        <strong className="text-sky-400">Click card</strong> → mark Done
        &nbsp;·&nbsp;
        <strong className="text-amber-400">★</strong> → flag for review
        &nbsp;·&nbsp;
        <strong className="text-pink-500">♥</strong> → Favourite
        &nbsp;·&nbsp;
        <strong className="text-sky-400">↗</strong> → open resource
        &nbsp;·&nbsp;
        <strong className="text-sky-400">✏</strong> → add note
      </div>
    </div>
  );
}