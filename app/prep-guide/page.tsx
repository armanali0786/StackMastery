"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiTrendingUp } from "react-icons/fi";
import PrepGuideCard from "../components/PrepGuideCard";
import { staticGuides } from "./staticData";

interface PrepGuide {
  _id: string;
  type: "company" | "role";
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  bookmarksCount: number;
}

export default function PrepGuidePage() {
  const [guides, setGuides] = useState<PrepGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "company" | "role" | "trending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    filterStaticGuides();
  }, [debouncedSearch, activeTab, difficultyFilter]);

  const filterStaticGuides = () => {
    setIsLoading(true);

    // Simulate network delay for UI smoothness
    setTimeout(() => {
      let filtered = [...staticGuides] as unknown as PrepGuide[];

      if (activeTab === "trending") {
        filtered = filtered.sort((a, b) => b.bookmarksCount - a.bookmarksCount).slice(0, 5);
      } else {
        if (activeTab !== "all") {
          filtered = filtered.filter(g => g.type === activeTab);
        }
        if (difficultyFilter !== "All") {
          filtered = filtered.filter(g => g.difficulty === difficultyFilter);
        }
        if (debouncedSearch) {
          filtered = filtered.filter(g => g.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
        }
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
      }

      setGuides(filtered);
      setIsLoading(false);
    }, 300);
  };

  const tabs = [
    { id: "all", label: "All Guides" },
    { id: "company", label: "Companies" },
    { id: "role", label: "Roles" },
    { id: "trending", label: "Trending", icon: <FiTrendingUp className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 pt-[58px]">
        <main className="max-w-7xl mx-auto px-6 md:px-8 py-10">

          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Prep Guides</span>
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg relative pl-4 border-l-2 border-emerald-500/50">
              Curated roadmaps, frequent questions, and inside tips for top companies and engineering roles.
            </p>
          </div>

          {/* Controls Bar: Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">

            {/* Tabs */}
            <div className="flex flex-wrap bg-[#0a0a0f]/80 p-1 rounded-xl border border-slate-800/80 backdrop-blur-md">
              {tabs.map((tab) => (
                <button
                  suppressHydrationWarning
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono tracking-wide transition-all ${activeTab === tab.id
                    ? "bg-slate-800 text-emerald-400 shadow-lg"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                >
                  {tab.icon && tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-64">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0a0a0f]/80 border border-slate-800/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
                  disabled={activeTab === "trending"}
                />
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                  <FiFilter className="text-slate-500 w-4 h-4" />
                </div>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-[#0a0a0f]/80 border border-slate-800/80 rounded-xl py-2.5 pl-10 pr-8 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono appearance-none"
                  disabled={activeTab === "trending"}
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Guides Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-slate-800/20 border border-slate-800/40 animate-pulse" />
              ))}
            </div>
          ) : guides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {guides.map((guide) => (
                <PrepGuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#0a0a0f]/50 rounded-2xl border border-slate-800/50 border-dashed">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                <FiSearch className="text-slate-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">No guides found</h3>
              <p className="text-slate-500 font-mono text-sm">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
