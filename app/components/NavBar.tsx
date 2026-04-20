"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../lib/contexts/AuthContext";
import { API_BASE_URL } from "../../lib/api";

export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Topics", children: [
    { label: "DSA", href: "/dsa" },
    { label: "OOPS", href: "/oops" },
    { label: "DBMS", href: "/dbms" },
    { label: "OS", href: "/os" },
    { label: "System Design", href: "/system-design" }
  ]},
  { label: "Prep Guide", children: [
    { label: "All Guides", href: "/prep-guide" },
    { label: "Company-wise", href: "/prep-guide/company-wise" },
    { label: "Interview Tips", href: "/prep-guide/interview-tips" },
    { label: "Roles", href: "/prep-guide/roles" },
    { label: "Trending", href: "/prep-guide/trending" }
  ]},
  { label: "Creator Sheets", children: [
    { label: "Striver Sheets", href: "/creator-sheets/striver" },
    { label: "Love Babbar Sheets", href: "/creator-sheets/love-babbar" },
    { label: "Padho with Pratyush", href: "/creator-sheets/padho-with-pratyush" },
    { label: "Coder with Soni", href: "/creator-sheets/coder-with-soni" }
  ]},
  { label: "Jobs", children: [
    { label: "All Jobs", href: "/jobs" },
    { label: "Role-wise Jobs", href: "/jobs/role-wise" }
  ]},
  { label: "Roadmap", children: [
    { label: "Company Roadmap", href: "/roadmap/company" },
    { label: "Role-wise Roadmap", href: "/roadmap/role-wise" }
  ]}
];

function DesktopNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = item.href ? pathname === item.href : false;
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div className="relative group">
        <button
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wide rounded-md border border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700/50 transition-all flex items-center gap-1`}
        >
          {item.label}
          <svg className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div className="absolute top-full left-0 mt-1 w-48 bg-[#0a0a0f]/95 backdrop-blur-lg border border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-1 pointer-events-none group-hover:pointer-events-auto">
          {item.children!.map((child, idx) => (
            <DesktopDropdownItem key={idx} item={child} pathname={pathname} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
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
}

function DesktopDropdownItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasChildren = item.children && item.children.length > 0;
  
  if (hasChildren) {
    return (
      <div className="relative group/sub">
        <button className="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-800/50 hover:text-emerald-400 transition-colors flex justify-between items-center">
          {item.label}
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute top-0 left-full ml-1 w-48 bg-[#0a0a0f]/95 backdrop-blur-lg border border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50 flex flex-col py-1 pointer-events-none group-hover/sub:pointer-events-auto">
          {item.children!.map((child, idx) => (
            <DesktopDropdownItem key={idx} item={child} pathname={pathname} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      className="block px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-800/50 hover:text-emerald-400 transition-colors"
    >
      {item.label}
    </Link>
  );
}

function MobileNavItem({ item, pathname, setMobileOpen, depth = 0 }: { item: NavItem; pathname: string; setMobileOpen: (v: boolean) => void; depth?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = item.href ? pathname === item.href : false;
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`py-2 text-sm font-mono flex justify-between items-center text-slate-300 hover:text-emerald-400`}
          style={{ paddingLeft: `${depth * 1}rem` }}
        >
          {item.label}
          <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="flex flex-col border-l-2 border-slate-800 ml-2">
            {item.children!.map((child, idx) => (
              <MobileNavItem 
                key={idx} 
                item={child} 
                pathname={pathname} 
                setMobileOpen={setMobileOpen} 
                depth={depth + 1} 
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      className={`py-2 text-sm font-mono ${isActive ? "text-emerald-400" : "text-slate-300 hover:text-emerald-400"}`}
      style={{ paddingLeft: `${depth * 1}rem` }}
      onClick={() => setMobileOpen(false)}
    >
      {item.label}
    </Link>
  );
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Attempt to load dynamic navigation from backend
    fetch(`${API_BASE_URL}/api/navigation`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.navigation && data.navigation.items && data.navigation.items.length > 0) {
          setNavItems(data.navigation.items);
        }
      })
      .catch((err) => {
        // Fallback to default structure
        console.error("Failed to fetch navigation dynamically", err);
      });
  }, []);
  
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-slate-800/80 h-[58px] flex items-center px-6 md:px-8">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-extrabold text-lg tracking-tight"
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-mono font-black text-black text-sm">
            SM
          </div>
          <span>
            Stack<span className="text-emerald-500">Mastery</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, idx) => (
            <DesktopNavItem key={idx} item={item} pathname={pathname} />
          ))}

          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wide rounded-md border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-all mr-2"
            >
              Admin Panel
            </Link>
          )}

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
          <div className="flex-1 overflow-y-auto max-h-[70vh] pb-4">
            {navItems.map((item, idx) => (
              <MobileNavItem 
                key={idx} 
                item={item} 
                pathname={pathname} 
                setMobileOpen={setMobileOpen} 
              />
            ))}
          </div>

          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="py-2 text-sm font-mono text-purple-400 font-bold"
              onClick={() => setMobileOpen(false)}
            >
              ADMIN PANEL
            </Link>
          )}

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