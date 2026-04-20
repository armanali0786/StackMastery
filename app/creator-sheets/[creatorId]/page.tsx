"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchWithAuth } from "../../../lib/api";
import { FiExternalLink, FiCheckCircle } from "react-icons/fi";

type SheetProblem = {
  _id: string;
  topic: string;
  name: string;
  link: string;
  difficulty?: string;
};

type TopicGroup = {
  topic: string;
  problems: SheetProblem[];
};

export default function CreatorSheetPage() {
  const { creatorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [sheetName, setSheetName] = useState("");
  const [topics, setTopics] = useState<TopicGroup[]>([]);
  const [rawFile, setRawFile] = useState<{data: string, name: string, type: string} | null>(null);

  useEffect(() => {
    fetchWithAuth(`/api/creator-sheets/${creatorId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.sheet) {
          setSheetName(data.sheet.name || creatorId);
          
          if (data.sheet.fileData) {
            setRawFile({
              data: data.sheet.fileData,
              name: data.sheet.fileName || 'document.pdf',
              type: data.sheet.fileType
            });
          }

          if (data.sheet.problems && data.sheet.problems.length > 0) {
            // Group by topic
            const grouped: Record<string, SheetProblem[]> = {};
            data.sheet.problems.forEach((p: SheetProblem) => {
              if (!grouped[p.topic]) grouped[p.topic] = [];
              grouped[p.topic].push(p);
            });

            const groups = Object.keys(grouped).map(k => ({
              topic: k,
              problems: grouped[k]
            }));

            setTopics(groups);
          }
        }
      })
      .catch(err => console.error("Missing sheet", err))
      .finally(() => setLoading(false));
  }, [creatorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] text-slate-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (topics.length === 0 && !rawFile) {
    return (
      <div className="min-h-screen bg-[#050508] text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">No Sheet Found</h1>
          <p className="text-slate-400">The admin hasn't uploaded this creator's sheet yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 pt-24 pb-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[30%] h-[40%] bg-emerald-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black mb-8 capitalize tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">{sheetName}</span> Tracker
        </h1>
        
        {topics.length === 0 && rawFile && (
          <div className="bg-[#16161f]/80 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden shadow-xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Document Available</h2>
            <p className="text-slate-400 mb-8">This creator sheet was uploaded directly as a document file.</p>
            <a 
              href={rawFile.data} 
              download={rawFile.name}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold uppercase tracking-wide text-sm rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Download {rawFile.name}
            </a>
          </div>
        )}

        {topics.length > 0 && (
          <div className="space-y-8">
          {topics.map((t, idx) => (
            <div key={idx} className="bg-[#16161f]/80 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="px-6 py-4 bg-slate-800/40 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">{t.topic}</h2>
                <span className="text-xs font-mono text-slate-400 uppercase">{t.problems.length} problems</span>
              </div>
              <div className="divide-y divide-slate-800">
                {t.problems.map((p, pIdx) => (
                  <div key={pIdx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <button className="w-6 h-6 rounded-md border border-slate-600 flex items-center justify-center text-slate-800 hover:border-emerald-500 transition-colors">
                        <FiCheckCircle className="opacity-0 w-4 h-4" />
                      </button>
                      <span className="font-medium text-slate-200">{p.name}</span>
                      {p.difficulty && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wide
                          ${p.difficulty.toLowerCase() === 'easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          p.difficulty.toLowerCase() === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                          'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                          {p.difficulty}
                        </span>
                      )}
                    </div>
                    <a href={p.link} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors">
                      <FiExternalLink />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}
