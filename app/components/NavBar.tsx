"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../lib/contexts/AuthContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "DSA", href: "/dsa" },
  { label: "OOPs", href: "/oops" },
  { label: "DBMS", href: "/dbms" },
  { label: "OS", href: "/os" },
  { label: "System Design", href: "/system-design" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-slate-800/80 h-[58px] flex items-center px-6 md:px-8">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-extrabold text-lg tracking-tight"
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-mono font-black text-black text-sm">
            AR
          </div>
          <span>
            Prep<span className="text-emerald-500">Stack</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  px-3 py-1.5 text-xs font-mono uppercase tracking-wide rounded-md border transition-all
                  ${isActive
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700/50"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}

          {user ? (
            <div className="relative ml-2">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold uppercase">
                  {user.name.charAt(0)}
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#0a0a0f]/95 backdrop-blur-lg border border-slate-800 rounded-lg shadow-xl overflow-hidden flex flex-col z-50">
                  <div className="px-4 py-3 border-b border-slate-800">
                    <p className="text-sm font-semibold truncate text-slate-200">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logout();
                    }}
                    className="flex w-full px-4 py-3 text-sm text-left text-red-400 hover:bg-slate-800/50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-2 px-4 py-1.5 text-xs font-mono uppercase tracking-wide rounded-md border border-slate-700/50 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-5 h-0.5 bg-slate-400 rounded-full" />
          <span className="w-5 h-0.5 bg-slate-400 rounded-full" />
          <span className="w-5 h-0.5 bg-slate-400 rounded-full" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[58px] left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-slate-800 px-6 py-5 flex flex-col gap-2 z-40">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`py-2 text-sm font-mono ${isActive
                  ? "text-emerald-400"
                  : "text-slate-300 hover:text-emerald-400"
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          {user ? (
            <>
              <div className="h-px w-full bg-slate-800 my-2" />
              <div className="flex flex-col py-2">
                <span className="text-sm font-semibold text-slate-200">{user.name}</span>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="py-2 text-sm font-mono text-left text-red-400"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <div className="h-px w-full bg-slate-800 my-2" />
              <Link
                href="/login"
                className="py-2 text-sm font-mono text-slate-300 hover:text-emerald-400"
                onClick={() => setMobileOpen(false)}
              >
                LOGIN
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}