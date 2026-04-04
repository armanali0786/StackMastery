// components/Footer.tsx
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-10 px-6 md:px-8 text-slate-500 text-sm font-mono max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
      <div>
        <strong className="text-emerald-400">StackMastery</strong> · All rights reserved · 2026
      </div>

      <div className="flex flex-wrap gap-6 md:gap-10">
        <Link href="/dsa" className="hover:text-emerald-400 transition-colors">DSA</Link>
        <Link href="/oops" className="hover:text-emerald-400 transition-colors">OOPs</Link>
        <Link href="/dbms" className="hover:text-emerald-400 transition-colors">DBMS</Link>
        <Link href="/os" className="hover:text-emerald-400 transition-colors">OS</Link>
        <Link href="/system-design" className="hover:text-emerald-400 transition-colors">System Design</Link>
      </div>
    </footer>
  );
}