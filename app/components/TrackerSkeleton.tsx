"use client";

import Skeleton from "./Skeleton";

export default function TrackerSkeleton() {
  return (
    <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl animate-fade-in">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <Skeleton className="h-10 w-64 mb-3" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>

      {/* Stats Bar Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>

      {/* Legend Skeleton */}
      <div className="flex flex-wrap gap-4 mb-12">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>

      {/* Month Section Skeleton */}
      <div className="space-y-12">
        {[...Array(2)].map((_, mi) => (
          <div key={mi} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-5 w-56" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
              {[...Array(2)].map((_, ti) => (
                <div key={ti}>
                  <Skeleton className="h-6 w-32 mb-6" />
                  <div className="space-y-4">
                    {[...Array(3)].map((_, pi) => (
                      <div key={pi} className="flex items-center gap-4 p-3 bg-slate-900/50 border border-slate-800/50 rounded-lg">
                        <Skeleton className="h-6 w-6 rounded-md shrink-0" />
                        <Skeleton className="h-5 flex-grow" />
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
