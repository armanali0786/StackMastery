"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiBookmark, FiShare2, FiCheckCircle, FiBookOpen, FiTerminal, FiFileText } from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { staticGuides } from "../staticData";
import { fetchWithAuth } from "../../../lib/api";

export default function PrepGuideDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [guide, setGuide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id) {
      fetchGuideDetail();
    }
  }, [id]);

  const fetchGuideDetail = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithAuth(`/api/prep-guides/${id}`);
      let foundGuide = null;

      if (res.ok) {
        const json = await res.json();
        foundGuide = json.guide;
      }

      // Fallback to static data
      if (!foundGuide) {
        foundGuide = staticGuides.find((g: any) => g._id === id);
      }

      if (foundGuide) {
        setGuide(foundGuide);
      } else {
        toast.error("Failed to load guide");
      }
    } catch (error) {
      console.error(error);
      const backup = staticGuides.find((g: any) => g._id === id);
      if (backup) setGuide(backup);
      else toast.error("Failed to load guide");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved guides" : "Guide saved!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050508] pt-[58px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#050508] pt-[58px] flex flex-col items-center justify-center text-slate-300">
        <h1 className="text-3xl font-bold mb-4">Guide Not Found</h1>
        <button onClick={() => router.back()} className="text-emerald-400 hover:underline">
          Go back
        </button>
      </div>
    );
  }

  const isCompany = guide.type === "company";
  const isTip = guide.type === "tips";

  const badgeLabel = isTip ? "Interview Tip" : isCompany ? "Company Preparation" : "Role Preparation";
  const badgeColor = isTip
    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
    : isCompany
    ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
    : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400";

  // ── TIPS / README viewer ─────────────────────────────────────────────
  if (isTip) {
    return (
      <div className="min-h-screen bg-[#050508] text-slate-200">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-emerald-900/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 pt-[58px]">
          {/* Top Nav */}
          <div className="border-b border-slate-800/80 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-[58px] z-30">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/prep-guide" className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors font-mono uppercase tracking-wide">
                <FiArrowLeft className="w-4 h-4" />
                Back to Guides
              </Link>
              <div className="flex gap-3">
                <button onClick={handleShare} className="p-2 rounded-lg border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors" aria-label="Share">
                  <FiShare2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition-colors ${
                    isSaved
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                      : "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  <FiBookmark className={`w-4 h-4 ${isSaved ? "fill-emerald-400" : ""}`} />
                  {isSaved ? "Saved" : "Save Guide"}
                </button>
              </div>
            </div>
          </div>

          <main className="max-w-5xl mx-auto px-4 md:px-6 py-10">
            {/* Tip Header */}
            <div className="mb-8">
              <div className={`inline-block px-3 py-1 mb-4 text-xs font-mono font-bold tracking-widest uppercase rounded-full border ${badgeColor}`}>
                {badgeLabel}
              </div>
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <FiFileText className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-100">{guide.title}</h1>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 bg-slate-800/80 rounded border border-slate-700/50 text-xs font-mono text-slate-300">
                      Difficulty: <span className="text-emerald-400">{guide.difficulty}</span>
                    </span>
                    <span className="px-3 py-1 bg-slate-800/80 rounded border border-slate-700/50 text-xs font-mono text-slate-300">
                      {guide.bookmarksCount} saves
                    </span>
                    {guide.tags?.map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-md text-xs font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* README-style Markdown Renderer */}
            <div className="bg-[#0d1117] border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl">
              {/* GitHub-style filename bar */}
              <div className="flex items-center gap-3 px-5 py-3 bg-[#161b22] border-b border-slate-700/60">
                <FiFileText className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-mono text-slate-300">README.md</span>
                <span className="ml-auto text-xs text-slate-500 font-mono">Markdown</span>
              </div>

              {/* Markdown Content */}
              <div className="p-6 md:p-10 markdown-readme">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {guide.content?.markdown || ""}
                </ReactMarkdown>
              </div>
            </div>
          </main>
        </div>

        {/* Scoped Markdown Styles */}
        <style>{`
          .markdown-readme {
            color: #c9d1d9;
            font-size: 0.95rem;
            line-height: 1.75;
          }
          .markdown-readme h1 {
            font-size: 2em;
            font-weight: 800;
            color: #f0f6fc;
            border-bottom: 1px solid #30363d;
            padding-bottom: 0.4em;
            margin-top: 0;
            margin-bottom: 0.8em;
          }
          .markdown-readme h2 {
            font-size: 1.4em;
            font-weight: 700;
            color: #e6edf3;
            border-bottom: 1px solid #21262d;
            padding-bottom: 0.3em;
            margin-top: 2em;
            margin-bottom: 0.75em;
          }
          .markdown-readme h3 {
            font-size: 1.15em;
            font-weight: 700;
            color: #d2dae2;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          .markdown-readme h4 {
            font-size: 1em;
            font-weight: 600;
            color: #c9d1d9;
            margin-top: 1.2em;
            margin-bottom: 0.4em;
          }
          .markdown-readme p {
            margin-bottom: 1em;
          }
          .markdown-readme a {
            color: #58a6ff;
            text-decoration: underline;
          }
          .markdown-readme a:hover {
            color: #79c0ff;
          }
          .markdown-readme strong {
            color: #f0f6fc;
            font-weight: 700;
          }
          .markdown-readme em {
            color: #c9d1d9;
            font-style: italic;
          }
          .markdown-readme ul {
            list-style: disc;
            padding-left: 1.6em;
            margin-bottom: 1em;
          }
          .markdown-readme ol {
            list-style: decimal;
            padding-left: 1.6em;
            margin-bottom: 1em;
          }
          .markdown-readme li {
            margin-bottom: 0.25em;
          }
          .markdown-readme hr {
            border: none;
            border-top: 1px solid #30363d;
            margin: 2em 0;
          }
          .markdown-readme blockquote {
            border-left: 4px solid #388bfd;
            padding: 0.5em 1em;
            margin: 1em 0;
            background: rgba(56,139,253,0.05);
            border-radius: 0 8px 8px 0;
            color: #8b949e;
          }
          .markdown-readme code {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 4px;
            padding: 0.15em 0.45em;
            font-family: 'JetBrains Mono', 'Fira Code', monospace;
            font-size: 0.85em;
            color: #79c0ff;
          }
          .markdown-readme pre {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 10px;
            padding: 1.2em 1.4em;
            overflow-x: auto;
            margin: 1.2em 0;
          }
          .markdown-readme pre code {
            background: transparent;
            border: none;
            padding: 0;
            font-size: 0.9em;
            color: #e6edf3;
          }
          .markdown-readme table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5em 0;
            font-size: 0.9em;
            overflow-x: auto;
            display: block;
          }
          .markdown-readme thead {
            background: rgba(48,54,61,0.6);
          }
          .markdown-readme th {
            padding: 0.6em 1em;
            border: 1px solid #30363d;
            color: #f0f6fc;
            font-weight: 700;
            text-align: left;
            white-space: nowrap;
          }
          .markdown-readme td {
            padding: 0.55em 1em;
            border: 1px solid #21262d;
            color: #c9d1d9;
            vertical-align: top;
          }
          .markdown-readme tr:nth-child(even) {
            background: rgba(22,27,34,0.5);
          }
          .markdown-readme tr:hover {
            background: rgba(56,139,253,0.04);
          }
          .markdown-readme img {
            max-width: 100%;
            border-radius: 8px;
          }
        `}</style>
      </div>
    );
  }

  // ── Company / Role guide ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050508] text-slate-200">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-emerald-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 pt-[58px]">
        {/* Top Navigation */}
        <div className="border-b border-slate-800/80 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-[58px] z-30">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/prep-guide" className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors font-mono uppercase tracking-wide">
              <FiArrowLeft className="w-4 h-4" />
              Back to Guides
            </Link>

            <div className="flex gap-3">
              <button onClick={handleShare} className="p-2 rounded-lg border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors" aria-label="Share">
                <FiShare2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition-colors ${
                  isSaved
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
                }`}
              >
                <FiBookmark className={`w-4 h-4 ${isSaved ? "fill-emerald-400" : ""}`} />
                {isSaved ? "Saved" : "Save Guide"}
              </button>
            </div>
          </div>
        </div>

        <main className="max-w-5xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <div className={`inline-block px-3 py-1 mb-6 text-xs font-mono font-bold tracking-widest uppercase rounded-full border ${badgeColor}`}>
              {badgeLabel}
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              {guide.title} <span className="text-slate-500">Guide</span>
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
              <div className="px-3 py-1 bg-slate-800/80 rounded border border-slate-700/50 text-sm font-mono text-slate-300">
                Difficulty: <span className="text-emerald-400">{guide.difficulty}</span>
              </div>
              <div className="px-3 py-1 bg-slate-800/80 rounded border border-slate-700/50 text-sm font-mono text-slate-300">
                {guide.bookmarksCount} saves
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {guide.tags.map((tag: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-md text-xs font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column (Main Content) */}
            <div className="md:col-span-2 space-y-10">
              {isCompany ? (
                <>
                  <section className="bg-[#0a0a0f]/60 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-slate-100">
                      <FiTerminal className="text-emerald-400" />
                      Interview Process Overview
                    </h2>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-5 border border-slate-800 rounded-xl">
                      {guide.content.processOverview}
                    </p>
                  </section>

                  <section className="bg-[#0a0a0f]/60 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-slate-100">
                      <FiBookOpen className="text-cyan-400" />
                      Common Questions
                    </h2>
                    <div className="space-y-4">
                      {guide.content.commonQuestions?.map((q: any, i: number) => (
                        <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
                          <h3 className="font-bold text-slate-200 mb-2">Q: {q.question}</h3>
                          <p className="text-slate-400 text-sm">A: {q.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section className="bg-[#0a0a0f]/60 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-slate-100">
                      <FiCheckCircle className="text-emerald-400" />
                      Preparation Roadmap
                    </h2>
                    <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl text-slate-300 leading-relaxed whitespace-pre-line font-mono text-sm">
                      {guide.content.roadmap?.split('->').map((step: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 mb-4 last:mb-0">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                            {i + 1}
                          </div>
                          <div className="pt-1">{step.trim()}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-[#0a0a0f]/60 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-slate-100">
                      <FiBookOpen className="text-cyan-400" />
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {guide.content.faqs?.map((q: any, i: number) => (
                        <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
                          <h3 className="font-bold text-slate-200 mb-2">Q: {q.question}</h3>
                          <p className="text-slate-400 text-sm">A: {q.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6">
              {isCompany ? (
                <>
                  <div className="bg-[#0a0a0f]/80 border border-slate-800/80 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4 text-emerald-400 border-b border-slate-800 pb-2">Technical Topics</h3>
                    <ul className="space-y-2">
                      {guide.content.codingTopics?.map((topic: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                          <FiCheckCircle className="text-emerald-500/50 w-3.5 h-3.5 shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#0a0a0f]/80 border border-slate-800/80 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4 text-indigo-400 border-b border-slate-800 pb-2">Behavioral</h3>
                    <ul className="space-y-3">
                      {guide.content.behavioralQuestions?.map((q: string, i: number) => (
                        <li key={i} className="text-sm text-slate-400 bg-slate-900 p-3 rounded border border-slate-800">
                          &quot;{q}&quot;
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-900/10 border border-amber-900/30 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-2 text-amber-500">Pro Tip</h3>
                    <p className="text-sm text-amber-200/70">{guide.content.tips}</p>
                  </div>
                </>
              ) : (
                <div className="bg-[#0a0a0f]/80 border border-slate-800/80 rounded-2xl p-6 sticky top-[100px]">
                  <h3 className="font-bold text-lg mb-4 text-emerald-400 border-b border-slate-800 pb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.content.requiredSkills?.map((skill: string, i: number) => (
                      <span key={i} className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
