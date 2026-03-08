// components/Legend.tsx
export default function Legend() {
  return (
    <div className="flex flex-wrap gap-5 items-center mb-8">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
        Done
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <div className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
        Review
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
        Favourite
      </div>
    </div>
  );
}