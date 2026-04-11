"use client";

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold text-white tracking-tight mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="DSA Tracker"
          desc="Manage Data Structures and Algorithms curriculum."
          href="/admin/topics/dsa"
          icon="⚡"
          color="emerald"
        />
        <DashboardCard
          title="DBMS Tracker"
          desc="Manage Database Management Systems curriculum."
          href="/admin/topics/dbms"
          icon="🗄️"
          color="sky"
        />
        <DashboardCard
          title="OS Tracker"
          desc="Manage Operating Systems curriculum."
          href="/admin/topics/os"
          icon="💻"
          color="orange"
        />
        <DashboardCard
          title="OOPS Tracker"
          desc="Manage Object Oriented Programming curriculum."
          href="/admin/topics/oops"
          icon="🧩"
          color="violet"
        />
        <DashboardCard
          title="System Design"
          desc="Manage System Design curriculum."
          href="/admin/topics/system-design"
          icon="🏗️"
          color="emerald"
        />
        <DashboardCard
          title="Prep Guides"
          desc="Manage Company and Role specific Prep Guides."
          href="/admin/prep-guides"
          icon="📚"
          color="pink"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, desc, href, icon, color }: { title: string; desc: string; href: string; icon: string; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:border-emerald-500/40",
    sky: "bg-sky-500/10 border-sky-500/20 text-sky-400 group-hover:border-sky-500/40",
    orange: "bg-orange-500/10 border-orange-500/20 text-orange-400 group-hover:border-orange-500/40",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400 group-hover:border-violet-500/40",
    pink: "bg-pink-500/10 border-pink-500/20 text-pink-400 group-hover:border-pink-500/40",
  };

  return (
    <Link href={href} className="group block">
      <div className={`p-6 rounded-2xl border transition-all duration-300 ${colorMap[color]} bg-opacity-50 hover:bg-opacity-100 backdrop-blur-sm h-full`}>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}
