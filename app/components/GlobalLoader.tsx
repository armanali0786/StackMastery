"use client";

import { useEffect, useState } from "react";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Initial delay for the smooth feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Completely remove after animation completes
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f] transition-opacity duration-500 ease-in-out ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-grid-emerald" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="relative flex flex-col items-center">
        {/* Animated Circular Ring */}
        <div className="relative w-28 h-28 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
          <div className="absolute inset-0 rounded-full border-t-4 border-emerald-400 animate-spin" />
          
          {/* Inner ring spinning opposite */}
          <div className="absolute inset-4 rounded-full border-4 border-slate-900" />
          <div className="absolute inset-4 rounded-full border-b-4 border-emerald-500/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          
          {/* Central Logo/S */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              S
            </span>
          </div>
        </div>

        {/* Brand Text */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Stack<span className="text-emerald-400">Mastery</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-[0.2em] font-mono uppercase animate-pulse">
            Tech Interview & CS Concepts Tracker
          </p>
        </div>
      </div>

      {/* Loading progress bar at bottom */}
      <div className="absolute bottom-20 w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-400 animate-progress" />
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 2s linear infinite;
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2.2s ease-in-out infinite;
        }
        .bg-grid-emerald {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}
