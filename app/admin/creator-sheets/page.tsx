"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../lib/api";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import { FiUploadCloud, FiCheck, FiTrash2, FiPlus } from "react-icons/fi";

type SheetConfig = { creatorId: string, name: string };
const DEFAULT_CREATORS = [
  { creatorId: "striver", name: "Striver Sheets" },
  { creatorId: "love-babbar", name: "Love Babbar Sheets" },
  { creatorId: "padho-with-pratyush", name: "Padho with Pratyush" },
  { creatorId: "coder-with-soni", name: "Coder with Soni" }
];

export default function AdminCreatorSheets() {
  const [existingSheets, setExistingSheets] = useState<SheetConfig[]>([]);
  const [allCreators, setAllCreators] = useState<SheetConfig[]>(DEFAULT_CREATORS);
  
  const [activeCreator, setActiveCreator] = useState(DEFAULT_CREATORS[0].creatorId);
  const [sheetName, setSheetName] = useState(DEFAULT_CREATORS[0].name);
  const [isNew, setIsNew] = useState(false);
  const [customId, setCustomId] = useState("");

  const [parsedProblems, setParsedProblems] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [rawFile, setRawFile] = useState<{data: string, name: string, type: string} | null>(null);

  const fetchSheets = () => {
    fetchWithAuth("/api/creator-sheets")
      .then(res => res.json())
      .then(data => {
        if (data?.sheets) {
          setExistingSheets(data.sheets);
          // merge default with existing
          const merged = [...DEFAULT_CREATORS];
          data.sheets.forEach((s: any) => {
            if (!merged.find(c => c.creatorId === s.creatorId)) {
              merged.push({ creatorId: s.creatorId, name: s.name });
            }
          });
          setAllCreators(merged);
        }
      });
  };

  useEffect(() => {
    fetchSheets();
  }, []);

  const handleCreatorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "CREATE_NEW") {
      setIsNew(true);
      setCustomId("");
      setSheetName("");
      setActiveCreator("new");
    } else {
      setIsNew(false);
      setActiveCreator(val);
      setSheetName(allCreators.find(c => c.creatorId === val)?.name || "");
    }
    setParsedProblems([]);
    setRawFile(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const dataReader = new FileReader();
    dataReader.onload = (dataEvt) => {
      const base64Data = dataEvt.target?.result as string;
      setRawFile({
        data: base64Data,
        name: file.name,
        type: file.type || "application/octet-stream"
      });

      try {
        const base64 = base64Data.split(',')[1];
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const workbook = XLSX.read(bytes, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        let currentTopic = "General";
        const mapped: any[] = [];

        for (let row of json) {
          if (!row || row.length === 0) continue;
          
          const cols = row.filter(cell => cell !== undefined && cell !== null && cell !== "");
          if (cols.length === 0) continue;

          const linkCol = cols.find(c => typeof c === 'string' && (c.includes("http://") || c.includes("https://")));
          
          if (!linkCol && cols.length <= 2) {
            let topicText = cols[0].toString().trim();
            topicText = topicText.replace(/^\d+\.\s*/, "");
            currentTopic = topicText;
            continue;
          }

          if (linkCol) {
            let nameObj = cols[0] === linkCol && cols.length > 1 ? cols[1] : cols[0];
            let nameStr = nameObj ? nameObj.toString().trim() : "Problem";

            if (nameStr.toLowerCase() === "question" || nameStr.toLowerCase() === "problem" || nameStr.toLowerCase() === "question link") continue;

            let difficulty = "Medium"; 
            if (nameStr.toLowerCase().includes("(easy)")) difficulty = "Easy";
            else if (nameStr.toLowerCase().includes("(medium)")) difficulty = "Medium";
            else if (nameStr.toLowerCase().includes("(hard)")) difficulty = "Hard";

            nameStr = nameStr.replace(/\s*\(((easy)|(medium)|(hard))\)\s*/i, "").trim();

            mapped.push({ topic: currentTopic, name: nameStr, link: linkCol.toString(), difficulty });
          }
        }

        setParsedProblems(mapped);
        toast.success(`Attached ${file.name}. Parsed ${mapped.length} problems!`);
      } catch (err) {
        console.warn("Could not parse as Excel. Attaching as raw file.");
        setParsedProblems([]);
        toast.success(`Attached raw file: ${file.name}`);
      }
    };
    dataReader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (parsedProblems.length === 0 && !rawFile) {
      return toast.error("Please upload a file first");
    }

    const targetId = isNew ? customId.toLowerCase().replace(/\s+/g, '-') : activeCreator;
    if (!targetId || targetId === "new") return toast.error("Invalid creator ID");

    try {
      setIsUploading(true);
      const res = await fetchWithAuth(`/api/admin/creator-sheets/${targetId}`, {
        method: "PUT",
        body: JSON.stringify({ 
          name: sheetName, 
          problems: parsedProblems,
          fileData: rawFile?.data,
          fileName: rawFile?.name,
          fileType: rawFile?.type
        })
      });
      
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Sheet uploaded and synced successfully!");
      if (isNew) {
        setIsNew(false);
        setActiveCreator(targetId);
      }
      fetchSheets();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this creator's sheet permanently?")) return;
    try {
      setIsDeleting(true);
      const res = await fetchWithAuth(`/api/admin/creator-sheets/${activeCreator}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Sheet deleted!");
      
      // Reset state
      setIsNew(false);
      setActiveCreator(allCreators[0].creatorId);
      setSheetName(allCreators[0].name);
      setParsedProblems([]);
      setRawFile(null);
      fetchSheets();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const isSavedInDB = existingSheets.some(s => s.creatorId === activeCreator);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Creator Sheets Config</h1>
          <p className="text-slate-400 text-sm">
            Upload an Excel/CSV file containing mapping for community creator sheets. 
            The parser dynamically structures nested topics and maps URLs.
          </p>
        </div>
        {!isNew && isSavedInDB && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors rounded-lg flex items-center gap-2 text-sm font-semibold disabled:opacity-50"
          >
            <FiTrash2 /> {isDeleting ? "Deleting..." : "Delete Database Record"}
          </button>
        )}
      </div>

      <div className="bg-[#16161f] border border-slate-800 rounded-xl p-6 mb-6 shadow-xl relative z-10 overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Target Creator</label>
            <select
              value={isNew ? "CREATE_NEW" : activeCreator}
              onChange={handleCreatorSelect}
              className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2.5 px-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <optgroup label="Default & Existing">
                {allCreators.map(c => (
                  <option key={c.creatorId} value={c.creatorId}>{c.name}</option>
                ))}
              </optgroup>
              <optgroup label="Actions">
                <option value="CREATE_NEW">+ Add Custom Creator...</option>
              </optgroup>
            </select>
          </div>
          
          {isNew ? (
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Unique Slug ID (URL)</label>
              <input
                type="text"
                placeholder="e.g. neetcode-150"
                value={customId}
                onChange={(e) => setCustomId(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2.5 px-4 text-sm text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Status</label>
              <div className="h-[42px] flex items-center">
                {isSavedInDB ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono rounded-full uppercase">
                    <FiCheck /> Synced to Database
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-mono rounded-full uppercase">
                    Not Uploaded Yet
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Display Name</label>
            <input
              type="text"
              placeholder="e.g. NeetCode 150 Tracker"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              className="w-full bg-[#0a0a0f] border border-slate-700 rounded-lg py-2.5 px-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <input
            type="file"
            accept=".xlsx, .xls, .csv, application/pdf"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
            <FiUploadCloud className="w-6 h-6" />
          </div>
          {rawFile ? (
            <p className="text-sm font-medium text-emerald-400 mb-1">File Attached: {rawFile.name}</p>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-300 mb-1">Click or drag Excel/PDF file to upload</p>
              <p className="text-xs font-mono text-slate-500">.xlsx, .xls, .csv, .pdf (raw attachment)</p>
            </>
          )}
        </div>
        
        {/* Save button moves out of logic directly here if uploaded */}
        {rawFile && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isUploading || isNew && !customId}
              className="px-6 py-3 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold uppercase tracking-wide text-sm rounded-lg transition-colors"
            >
              <FiCheck />
              {isUploading ? "Saving to Database..." : isSavedInDB ? "Overwrite DB Record" : "Save Database Record"}
            </button>
          </div>
        )}
      </div>

      {parsedProblems.length > 0 && (
        <div className="bg-[#16161f] border border-slate-800 rounded-xl overflow-hidden shadow-xl animate-fade-up">
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
            <div>
              <h3 className="font-bold text-slate-200 text-sm">Preview ({parsedProblems.length} records)</h3>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto p-0">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[#0a0a0f] text-slate-500 font-mono text-xs uppercase sticky top-0 shadow-sm z-10">
                <tr>
                  <th className="py-3 px-6 border-b border-slate-800 w-1/4">Topic</th>
                  <th className="py-3 px-6 border-b border-slate-800 w-1/2">Problem</th>
                  <th className="py-3 px-6 border-b border-slate-800">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {parsedProblems.slice(0, 100).map((p, i) => (
                  <tr key={i} className="hover:bg-slate-800/20">
                    <td className="py-2.5 px-6 truncate max-w-[200px]">{p.topic}</td>
                    <td className="py-2.5 px-6 font-medium text-slate-200 truncate max-w-[300px]">
                      {p.name}
                    </td>
                    <td className="py-2.5 px-6">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400">
                        {p.difficulty || "-"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {parsedProblems.length > 100 && (
              <div className="p-4 text-center text-xs font-mono text-slate-500 border-t border-slate-800">
                And {parsedProblems.length - 100} more rows...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
