"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../lib/api";
import { toast } from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase, FiMapPin, FiLink, FiPercent, FiDollarSign } from "react-icons/fi";

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
  isActive: boolean;
};

const DEFAULT_JOB: Partial<Job> = {
  title: "",
  company: "",
  role: "Frontend",
  location: "",
  type: "Full-Time",
  experience: "Fresher",
  salary: "",
  description: "",
  url: "",
  isActive: true
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Job>>(DEFAULT_JOB);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await fetchWithAuth("/api/admin/jobs");
      const data = await res.json();
      if (data.jobs) setJobs(data.jobs);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (job: Job) => {
    setEditingId(job._id);
    setFormData(job);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;
    try {
      const res = await fetchWithAuth(`/api/admin/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Job deleted successfully");
      fetchJobs();
      if (editingId === id) handleCancel();
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(DEFAULT_JOB);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const isEdit = !!editingId;
      const url = isEdit ? `/api/admin/jobs/${editingId}` : `/api/admin/jobs`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Save failed");
      
      toast.success(`Job ${isEdit ? 'updated' : 'posted'} successfully!`);
      handleCancel();
      fetchJobs();
    } catch (err) {
      toast.error("Failed to save job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-[#16161f] border border-slate-800 rounded-xl p-6 shadow-xl sticky top-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            {editingId ? <FiEdit2 className="text-emerald-400" /> : <FiPlus className="text-emerald-400" />}
            {editingId ? "Edit Job Listing" : "Post New Job"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Company *</label>
              <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
            </div>
            
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Job Title *</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Role *</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500">
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Fullstack">Fullstack</option>
                  <option value="Data Science">Data Science</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Type *</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Experience *</label>
                <input required type="text" placeholder="0-2 Years" name="experience" value={formData.experience} onChange={handleChange} className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Salary</label>
                <input type="text" placeholder="15-20 LPA" name="salary" value={formData.salary} onChange={handleChange} className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Location *</label>
              <input required type="text" placeholder="Remote / Bangalore" name="location" value={formData.location} onChange={handleChange} className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Apply URL *</label>
              <input required type="url" name="url" value={formData.url} onChange={handleChange} className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Description</label>
              <textarea rows={3} name="description" value={formData.description} onChange={handleChange} className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"></textarea>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-4 h-4 accent-emerald-500" />
              <label htmlFor="isActive" className="text-sm text-slate-300">Status: Active</label>
            </div>

            <div className="pt-4 flex gap-3">
              {editingId && (
                <button type="button" onClick={handleCancel} className="flex-1 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-bold">
                  Cancel
                </button>
              )}
              <button disabled={submitting} type="submit" className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase tracking-wide text-sm transition-colors shadow-lg disabled:opacity-50">
                {submitting ? "Saving..." : editingId ? "Save Changes" : "Post Job"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main List */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Job Listings Config</h1>
          <p className="text-slate-400 text-sm">Create, edit, and delete real-time software engineering jobs to broadcast to the community.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-emerald-500"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"></div></div>
        ) : jobs.length === 0 ? (
          <div className="bg-[#16161f] border border-slate-800 rounded-xl p-12 text-center text-slate-500">
            No jobs posted yet. Use the form to post your first job!
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job._id} className="bg-[#16161f] border border-slate-800 hover:border-emerald-500/30 rounded-xl p-5 shadow-xl transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-200 mb-1 flex items-center gap-2">
                      {job.title}
                      {!job.isActive && <span className="px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] uppercase font-mono rounded-full">Inactive</span>}
                    </h3>
                    <p className="text-emerald-400 font-medium text-sm mb-3">{job.company}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-4">
                      <span className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded"><FiBriefcase /> {job.role} ({job.type})</span>
                      <span className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded"><FiMapPin /> {job.location}</span>
                      <span className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded"><FiPercent /> Exp: {job.experience}</span>
                      {job.salary && <span className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded"><FiDollarSign /> {job.salary}</span>}
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <button onClick={() => handleEdit(job)} className="px-3 py-1.5 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors">
                      <FiEdit2 /> Edit
                    </button>
                    <button onClick={() => handleDelete(job._id)} className="px-3 py-1.5 flex items-center justify-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded text-xs transition-colors">
                      <FiTrash2 /> Delete
                    </button>
                    <a href={job.url} target="_blank" rel="noreferrer" className="px-3 py-1.5 flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black rounded text-xs transition-colors font-medium">
                      <FiLink /> Apply Link
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
