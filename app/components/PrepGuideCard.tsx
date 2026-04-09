import Link from "next/link";
import { FiBriefcase, FiAperture, FiBookOpen, FiBookmark } from "react-icons/fi";

interface PrepGuideCardProps {
  guide: {
    _id: string;
    type: "company" | "role";
    title: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    tags: string[];
    bookmarksCount: number;
    // We only need a summary for the card, not the entire content object
  };
}

export default function PrepGuideCard({ guide }: PrepGuideCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Beginner":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Intermediate":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Advanced":
        return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  const IconType = guide.type === "company" ? FiAperture : FiBriefcase;

  return (
    <Link href={`/prep-guide/${guide._id}`} className="group block">
      <div className="flex flex-col h-full rounded-2xl bg-[#0a0a0f]/80 backdrop-blur-sm border border-slate-800/80 p-6 transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-900/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] relative overflow-hidden">
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header row */}
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-xl border ${guide.type === "company" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"}`}>
              <IconType className="w-6 h-6" />
            </div>
            
            <div className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${getDifficultyColor(guide.difficulty)}`}>
              {guide.difficulty}
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
            {guide.title}
          </h3>
          
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
            {guide.type === "company" ? "Company Guide" : "Role Guide"}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {guide.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-slate-800/60 border border-slate-700/50 rounded-md text-xs text-slate-300 font-mono">
                {tag}
              </span>
            ))}
            {guide.tags?.length > 3 && (
              <span className="px-2 py-1 bg-slate-800/60 border border-slate-700/50 rounded-md text-xs text-slate-400 font-mono">
                +{guide.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* Footer stats */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 mt-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-emerald-400/80 transition-colors">
              <FiBookOpen className="w-4 h-4" />
              <span>Read Guide</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <FiBookmark className="w-3.5 h-3.5" />
              <span>{guide.bookmarksCount} saves</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
