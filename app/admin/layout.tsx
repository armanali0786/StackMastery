import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-[#0f0f16] flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            StackMastery Admin
          </h2>
          <Link href="/" className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <span>← Back to App</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-2">
            Curriculum
          </div>
          <SidebarLink href="/admin/topics/dsa" icon="⚡" label="DSA" />
          <SidebarLink href="/admin/topics/dbms" icon="🗄️" label="DBMS" />
          <SidebarLink href="/admin/topics/os" icon="💻" label="OS" />
          <SidebarLink href="/admin/topics/oops" icon="🧩" label="OOPS" />
          <SidebarLink href="/admin/topics/sd" icon="🏗️" label="System Design" />

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-8">
            Resources
          </div>
          <SidebarLink href="/admin/prep-guides" icon="📚" label="Prep Guides" />
          <SidebarLink href="/admin/creator-sheets" icon="📋" label="Creator Sheets" />
          <SidebarLink href="/admin/jobs" icon="💼" label="Job Board" />
          <SidebarLink href="/admin/roadmaps" icon="🛤️" label="Roadmaps" />
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-8">
            Settings
          </div>
          <SidebarLink href="/admin/navigation" icon="⚙️" label="Navigation Config" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-full overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-[#0f0f16] flex items-center px-6 md:hidden">
          <h2 className="text-lg font-bold text-emerald-400">Admin Panel</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-6 relative">
          <div className="fixed inset-0 pointer-events-none z-0 bg-grid-emerald opacity-5" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
