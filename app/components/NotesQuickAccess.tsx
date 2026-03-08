// components/NotesQuickAccess.tsx
export default function NotesQuickAccess() {
  const items = [
    { name: "DSA Notes", sub: "Global notebook + per-card notes", icon: "🧮", color: "#00ff88", href: "/interview-prep/dsa-tracker" },
    { name: "OOPs Notes", sub: "Global notebook + per-card notes", icon: "🧩", color: "#a78bfa", href: "/interview-prep/oops-tracker" },
    { name: "DBMS Notes", sub: "Global notebook + per-card notes", icon: "🗄️", color: "#38bdf8", href: "/interview-prep/dbms-tracker" },
    { name: "OS Notes", sub: "Global notebook + per-card notes", icon: "💻", color: "#fb923c", href: "/interview-prep/os-tracker" },
    { name: "System Design Notes", sub: "Global notebook + per-card notes", icon: "🏗️", color: "#34d399", href: "/interview-prep/system-design-tracker" },
  ];

  return (
    <section id="notes-sec" className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto border-t border-slate-800">
      <div className="text-emerald-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
        07 — Notes
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
        Your Study Notebooks
      </h2>
      <p className="text-slate-400 font-mono mb-10">
        Each tracker has its own global notebook plus per-card notes. Click to open and review.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((item, i) => (
          <a
            key={item.name}
            href={`${item.href}#notes`}
            className="bg-[#16161f] border border-slate-800 rounded-xl p-6 hover:border-slate-500 hover:-translate-y-1 transition-all animate-fade-up flex flex-col gap-3"
            style={{ animationDelay: `${i * 50}ms`, borderTop: `2px solid ${item.color}30` }}
          >
            <div className="text-4xl">{item.icon}</div>
            <div className="text-lg font-bold">{item.name}</div>
            <div className="text-xs font-mono text-slate-500">{item.sub}</div>
          </a>
        ))}
      </div>
    </section>
  );
}