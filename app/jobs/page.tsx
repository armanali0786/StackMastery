"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchWithAuth } from "../../lib/api";
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiExternalLink, FiSearch, FiFilter } from "react-icons/fi";

type Job = {
  _id: string;
  title: string;
  company: string;
  role: string;
  location: string;
  type: string;
  experience: string;
  salary?: string;
  description?: string;
  url: string;
  createdAt: string;
};

const ROLES = ["All", "Frontend", "Backend", "Fullstack", "Data Science", "DevOps"];

export default function JobsPage() {
  const pathname = usePathname();
  const isRoleWiseDefault = pathname.includes("role-wise");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState(isRoleWiseDefault ? "Frontend" : "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);

  useEffect(() => {
    fetchWithAuth("/api/jobs")
      .then(res => res.json())
      .then(data => {
        if (data.jobs) setJobs(data.jobs);
      })
      .catch(err => console.error("Failed to load jobs", err))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedJobs(prev => 
      prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRole === "All" || job.role === activeRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[30%] h-[50%] bg-cyan-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 pt-24 pb-20 max-w-6xl mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Tech Job</span> Board
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Discover the latest software engineering opportunities curated for our community.
            Filter precisely by role to build out your niche.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 space-y-6 flex-shrink-0">
            <div className="bg-[#16161f]/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl">
              <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-3.5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FiFilter className="w-3 h-3" /> Filter by Role
              </h3>
              <div className="flex flex-col gap-1">
                {ROLES.map(role => (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`text-left px-4 py-2 rounded-lg text-sm transition-all font-medium ${
                      activeRole === role 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="flex-1 w-full space-y-4">
            {loading ? (
              <div className="flex justify-center py-20 text-emerald-500"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2"></div></div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-[#16161f]/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 shadow-xl">
                No active jobs found for the selected criteria. Please check back later!
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job._id} className="bg-[#16161f]/80 backdrop-blur-md border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 text-xl font-black uppercase shadow-inner border border-slate-700/50">
                          {job.company.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{job.title}</h3>
                          <p className="text-slate-400 font-medium text-sm">{job.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5 bg-[#0a0a0f] border border-slate-800 px-3 py-1.5 rounded-full text-emerald-400">
                          <FiBriefcase className="w-3.5 h-3.5" /> {job.role}
                        </span>
                        <span className="flex items-center gap-1.5 bg-[#0a0a0f] border border-slate-800 px-3 py-1.5 rounded-full">
                          <FiMapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 bg-[#0a0a0f] border border-slate-800 px-3 py-1.5 rounded-full">
                          <FiClock className="w-3.5 h-3.5" /> {job.experience} / {job.type}
                        </span>
                        {job.salary && (
                           <span className="flex items-center gap-1.5 bg-[#0a0a0f] border border-slate-800 px-3 py-1.5 rounded-full text-yellow-400 border-yellow-400/20">
                             <FiDollarSign className="w-3.5 h-3.5" /> {job.salary}
                           </span>
                        )}
                      </div>

                      {job.description && (
                        <div className="mt-4">
                          <p className={`text-sm text-slate-400 leading-relaxed ${expandedJobs.includes(job._id) ? '' : 'line-clamp-2'}`}>
                            {job.description}
                          </p>
                          {job.description.length > 150 && (
                            <button 
                              onClick={() => toggleExpand(job._id)}
                              className="text-xs text-emerald-400 mt-1 hover:text-emerald-300 font-medium"
                            >
                              {expandedJobs.includes(job._id) ? "Show Less" : "Read More..."}
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start pt-2 md:pt-0 gap-4">
                      <span className="text-[10px] font-mono text-slate-500 hidden md:block">
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                      <a 
                        href={job.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full md:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase tracking-wide text-xs rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
                      >
                        Apply Now <FiExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
