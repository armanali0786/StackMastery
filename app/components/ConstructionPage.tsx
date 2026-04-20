"use client";

import { FiTool, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function ConstructionPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[30%] h-[40%] bg-emerald-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[25%] h-[45%] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-20 h-20 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-center mb-8 mx-auto shadow-xl shadow-[#000000_50%] backdrop-blur-sm relative animate-fade-up">
           <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-lg rounded-2xl opacity-50" />
           <FiTool className="w-8 h-8 text-emerald-400 relative z-10" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight animate-fade-up" style={{ animationDelay: '100ms' }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">{title}</span>
        </h1>
        
        <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '200ms' }}>
          {description || "This feature is currently under active development. Our curriculum experts are curating the best materials for this section."}
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-black transition-all font-bold tracking-wide animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          Return Home <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
