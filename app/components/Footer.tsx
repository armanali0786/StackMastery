// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-10 px-6 md:px-8 text-slate-500 text-sm font-mono max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
      <div>
        <strong className="text-emerald-400">InterviewPrep Hub</strong> · All data saved locally in your browser · 2026
      </div>

      <div className="flex flex-wrap gap-6 md:gap-10">
        <a href="/dsa" className="hover:text-emerald-400 transition-colors">DSA</a>
        <a href="/oops" className="hover:text-emerald-400 transition-colors">OOPs</a>
        <a href="/dbms" className="hover:text-emerald-400 transition-colors">DBMS</a>
        <a href="/os" className="hover:text-emerald-400 transition-colors">OS</a>
        <a href="/system-design" className="hover:text-emerald-400 transition-colors">System Design</a>
      </div>
    </footer>
  );
}