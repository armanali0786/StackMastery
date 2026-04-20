"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../lib/api";
import { toast } from "react-hot-toast";

export default function NavigationAdmin() {
  const [navJson, setNavJson] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWithAuth("/api/navigation")
      .then(res => res.json())
      .then(data => {
        if (data?.navigation?.items) {
          setNavJson(JSON.stringify(data.navigation.items, null, 2));
        }
      })
      .catch(err => {
        console.error("Failed to load nav config", err);
        toast.error("Failed to load navigation configuration");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const items = JSON.parse(navJson);
      
      const res = await fetchWithAuth("/api/admin/navigation", {
        method: "PUT",
        body: JSON.stringify({ items }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to save config");
      }
      
      toast.success("Navigation configuration updated successfully");
    } catch (e: any) {
      toast.error(e.message || "Invalid JSON or server error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-400">Loading configuration...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Navigation Configuration</h1>
          <p className="text-slate-400 text-sm">
            Edit the JSON structure of the dynamic navigation tree. 
            Ensure your array only contains `label`, `href`, and `children` nodes.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase tracking-wide text-sm rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Config"}
        </button>
      </div>

      <div className="bg-[#16161f] border border-slate-800 rounded-xl overflow-hidden">
        <textarea
          value={navJson}
          onChange={(e) => setNavJson(e.target.value)}
          className="w-full h-[600px] bg-transparent p-6 text-emerald-400 font-mono text-sm focus:outline-none resize-y"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
