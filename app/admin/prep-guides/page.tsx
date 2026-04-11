"use client";

import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../lib/api';
import toast from 'react-hot-toast';

export default function AdminPrepGuidesPage() {
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGuide, setEditingGuide] = useState<any | null>(null);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth('/api/prep-guides');
      if (res.ok) {
        const data = await res.json();
        setGuides(data.guides || []);
      }
    } catch {
      toast.error('Failed to load prep guides');
    } finally {
      setLoading(false);
    }
  };

  const deleteGuide = async (id: string) => {
    if (!window.confirm('Delete this guide?')) return;
    try {
      const res = await fetchWithAuth(`/api/admin/prep-guides/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Guide deleted');
        loadGuides();
      } else {
        toast.error('Failed to delete');
      }
    } catch {
      toast.error('Error deleting guide');
    }
  };

  if (loading && !guides.length) return <div className="text-slate-400">Loading guides...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Prep Guides</h1>
          <p className="text-slate-400 text-sm mt-1">Manage company and role specific prep guides.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setEditingGuide([{
              type: 'company',
              title: 'New Guide',
              difficulty: 'Intermediate',
              tags: [],
              bookmarksCount: 0,
              content: {}
            }])}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors"
          >
            + Add Company/Role (JSON)
          </button>
          <button
            onClick={() => setEditingGuide({
              type: 'tips',
              title: 'New Interview Tip',
              difficulty: 'Intermediate',
              tags: ["Interview", "Tips"],
              bookmarksCount: 0,
              content: { markdown: "" }
            })}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            + Add Interview Tip
          </button>
        </div>
      </div>

      {editingGuide ? (
        <PrepGuideEditor
          guide={editingGuide}
          onClose={() => setEditingGuide(null)}
          onRefresh={() => { setEditingGuide(null); loadGuides(); }}
        />
      ) : (
        <div className="bg-[#16161f] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Difficulty</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {guides.map(guide => (
                <tr key={guide._id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{guide.title}</td>
                  <td className="px-6 py-4 capitalize">{guide.type}</td>
                  <td className="px-6 py-4">{guide.difficulty}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => setEditingGuide(guide)} className="text-emerald-400 hover:text-emerald-300">Edit</button>
                    <button onClick={() => deleteGuide(guide._id)} className="text-pink-400 hover:text-pink-300">Delete</button>
                  </td>
                </tr>
              ))}
              {guides.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No prep guides found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PrepGuideEditor({ guide, onClose, onRefresh }: { guide: any, onClose: () => void, onRefresh: () => void }) {
  const isTip = guide && guide.type === 'tips';
  
  const [jsonText, setJsonText] = useState(JSON.stringify(guide, null, 2));
  
  // For Tip editor
  const [tipData, setTipData] = useState({
    _id: guide._id,
    type: 'tips',
    title: guide.title || '',
    difficulty: guide.difficulty || 'Intermediate',
    tags: Array.isArray(guide.tags) ? guide.tags.join(', ') : '',
    content: { markdown: guide.content?.markdown || '' }
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const saveGuide = async () => {
    setIsSaving(true);
    try {
      if (isTip) {
        const payload = {
          ...tipData,
          tags: tipData.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        };
        
        let url = "/api/admin/prep-guides";
        let method = "POST";
        
        if (payload._id) {
          url = `/api/admin/prep-guides/${payload._id}`;
          method = "PUT";
        }
        
        const res = await fetchWithAuth(url, {
          method,
          body: JSON.stringify(payload)
        });
        
        if (!res.ok) throw new Error("Failed to save tip");
        toast.success("Tip saved successfully");
        onRefresh();
        onClose();
        return;
      }
      
      // JSON flow
      const parsed = JSON.parse(jsonText);
      const isArray = Array.isArray(parsed);
      const items = isArray ? parsed : [parsed];
      
      const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

      const cleaned = items.map((item: any) => {
        const newItem = { ...item };
        if (!isValidObjectId(newItem._id)) delete newItem._id;
        return newItem;
      });

      if (isArray) {
        const CHUNK_SIZE = 500;
        let successCount = 0;
        for (let i = 0; i < cleaned.length; i += CHUNK_SIZE) {
          const chunk = cleaned.slice(i, i + CHUNK_SIZE);
          const res = await fetchWithAuth("/api/admin/prep-guides/bulk", {
            method: "POST",
            body: JSON.stringify({ data: chunk }),
          });
          if (!res.ok) throw new Error("Bulk insert failed");
          successCount += chunk.length;
        }
        toast.success(`Inserted ${successCount} guides 🚀`);
      } else {
        const item = cleaned[0];
        let url = "/api/admin/prep-guides";
        let method = "POST";
        if (item._id) {
          url = `/api/admin/prep-guides/${item._id}`;
          method = "PUT";
        }
        const res = await fetchWithAuth(url, { method, body: JSON.stringify(item) });
        if (!res.ok) throw new Error("Save failed");
        toast.success("Saved successfully");
      }
      onRefresh();
      onClose();
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#16161f] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="bg-slate-900/50 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <span className="text-sm font-medium text-white">{guide._id ? 'Edit' : 'New'} {isTip ? 'Interview Tip' : 'Guide (JSON)'}</span>
        <div className="space-x-3">
          <button onClick={onClose} className="px-3 py-1.5 text-slate-400 hover:text-white transition-colors">Cancel</button>
          <button
            onClick={saveGuide}
            disabled={isSaving}
            className={`px-4 py-1.5 ${isTip ? 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700' : 'bg-pink-500 hover:bg-pink-600 active:bg-pink-700'} text-white font-medium rounded-lg transition-colors disabled:opacity-50`}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      
      {isTip ? (
        <div className="p-4 space-y-4 text-slate-300 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Title</label>
              <input 
                type="text" 
                value={tipData.title}
                onChange={e => setTipData({...tipData, title: e.target.value})}
                className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="Ex: Google Interview Guide"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Tags (comma separated)</label>
              <input 
                type="text" 
                value={tipData.tags}
                onChange={e => setTipData({...tipData, tags: e.target.value})}
                className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                placeholder="Google, Interview, Swe"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Difficulty</label>
              <select 
                value={tipData.difficulty}
                onChange={e => setTipData({...tipData, difficulty: e.target.value})}
                className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-slate-400 mb-1 flex items-center justify-between">
              Markdown Content 
              <span className="text-xs text-emerald-500">Supports tables, bold, lists, etc.</span>
            </label>
            <textarea
              value={tipData.content.markdown}
              onChange={e => setTipData({...tipData, content: { markdown: e.target.value }})}
              className="w-full h-[400px] bg-[#0a0a0f] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 resize-y font-mono"
              placeholder="# Markdown Text Here"
              spellCheck="false"
            />
          </div>
        </div>
      ) : (
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full h-[500px] bg-transparent text-pink-400 font-mono text-sm p-4 focus:outline-none resize-y"
          spellCheck="false"
        />
      )}
    </div>
  );
}
