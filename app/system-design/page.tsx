// app/system-design/page.tsx
"use client";

import { useState } from "react";
import { useTrackerData } from "../../lib/hooks/useTrackerData";
import StatsBar from "../components/StatsBar";
import TipBanner from "../components/TipBanner";
import Legend from "../components/Legend";
import FavPanel from "../components/FavPanel";
import MonthSection from "../components/MonthSection";
import GlobalNotebook from "../components/GlobalNotebook";
import TrackerSkeleton from "../components/TrackerSkeleton";
import { ProblemData, State, Fav, Notes } from "./types";
import { useTopicContent } from "../../lib/hooks/useTopicContent";
import { systemDesignTheme } from "../components/constants/themes";
import TrackerHeader from "../components/TrackerHeader";

// ── System Design DATA ── (from your HTML)
export const FALLBACK_DATA: ProblemData[] = [
  {
    month: "Fundamentals",
    theme: "CORE CONCEPTS & BUILDING BLOCKS",
    topics: [
      {
        label: "Basics",
        problems: [
          { name: "Horizontal vs Vertical Scaling", links: [{ l: "Web", u: "https://www.geeksforgeeks.org/horizontal-and-vertical-scaling-in-databases/", t: "gfg" }], tags: ["concept"] },
          { name: "Latency vs Throughput", links: [{ l: "Web", u: "https://www.geeksforgeeks.org/difference-between-latency-and-throughput/", t: "gfg" }], tags: ["concept"] },
          { name: "Availability vs Consistency", links: [{ l: "Web", u: "https://www.geeksforgeeks.org/consistency-and-availability-in-distributed-systems/", t: "gfg" }], tags: ["concept"] },
          { name: "CAP Theorem (deep dive)", links: [{ l: "Web", u: "https://www.geeksforgeeks.org/the-cap-theorem-in-dbms/", t: "gfg" }], tags: ["concept"] },
          { name: "PACELC Theorem", links: [{ l: "Web", u: "https://www.geeksforgeeks.org/pacelc-theorem/", t: "gfg" }], tags: ["concept"] },
          { name: "SLA, SLO, SLI", links: [{ l: "Web", u: "https://www.geeksforgeeks.org/sla-slo-and-sli-in-cloud-computing/", t: "gfg" }], tags: ["concept"] },
        ],
      },
    ],
  },
];

const TRACKER_KEY = "sd";

export default function SystemDesignTrackerPage() {
  const { topicData, loading: contentLoading } = useTopicContent("sd");
  const DATA: ProblemData[] = (topicData as ProblemData[]) || FALLBACK_DATA;

  const { state, setState, favs, setFavs, notes, setNotes, globalNote, setGlobalNote, loading: trackerLoading } = useTrackerData<State, Fav, Notes>(TRACKER_KEY);
  const [currentTab, setCurrentTab] = useState<"all" | "fav">("all");
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  const loading = contentLoading || trackerLoading;

  const keyGen = (m: number, t: number, p: number) => `${m}_${t}_${p}`;

  const toggleSolve = (m: number, t: number, p: number) => {
    const k = keyGen(m, t, p);
    setState((prev: State) => ({
      ...prev,
      [k]: prev[k] === "done" ? "todo" : "done",
    }));
  };

  const toggleReview = (m: number, t: number, p: number) => {
    const k = keyGen(m, t, p);
    setState((prev: State) => ({
      ...prev,
      [k]: prev[k] === "review" ? "todo" : "review",
    }));
  };

  const toggleFav = (m: number, t: number, p: number) => {
    const k = keyGen(m, t, p);
    setFavs((prev: Fav) => ({ ...prev, [k]: !prev[k] }));
  };

  const toggleNoteOpen = (k: string) => {
    setOpenNotes((prev: Record<string, boolean>) => ({ ...prev, [k]: !prev[k] }));
  };

  const updateNote = (k: string, value: string) => {
    setNotes((prev: Notes) => ({ ...prev, [k]: value }));
  };

  const calculateStats = () => {
    let total = 0, solved = 0, review = 0, favCount = 0;

    DATA.forEach((month, mi) =>
      month.topics.forEach((topic, ti) =>
        topic.problems.forEach((_, pi) => {
          total++;
          const k = keyGen(mi, ti, pi);
          if (state[k] === "done") solved++;
          if (state[k] === "review") review++;
          if (favs[k]) favCount++;
        })
      )
    );

    return {
      total,
      solved,
      review,
      fav: favCount,
      remaining: total - solved,
      progress: total > 0 ? (solved / total) * 100 : 0,
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
        <div className="fixed inset-0 pointer-events-none z-0 bg-grid-emerald opacity-5" />
        <TrackerSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-emerald opacity-5" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <TrackerHeader
          title="System Design Mastery"
          subtitle="3 Month Roadmap"
          badge="Sys Des"
          theme={systemDesignTheme}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          favCount={stats.fav}
        />

        {/* <TipBanner theme={systemDesignTheme} /> */}

        <StatsBar stats={stats} theme={systemDesignTheme} />

        <Legend theme={systemDesignTheme} />

        {currentTab === "fav" && (
          <FavPanel
            theme={systemDesignTheme}
            data={DATA}
            favs={favs}
            state={state}
            notes={notes}
            openNotes={openNotes}
            toggleSolve={toggleSolve}
            toggleReview={toggleReview}
            toggleFav={toggleFav}
            toggleNoteOpen={toggleNoteOpen}
            updateNote={updateNote}
          />
        )}

        {currentTab === "all" &&
          DATA.map((month, mi) => (
            <MonthSection
              theme={systemDesignTheme}
              month={month}
              monthIndex={mi}
              state={state}
              favs={favs}
              notes={notes}
              openNotes={openNotes}
              toggleSolve={toggleSolve}
              toggleReview={toggleReview}
              toggleFav={toggleFav}
              toggleNoteOpen={toggleNoteOpen}
              updateNote={updateNote}
            />
          ))}

        <GlobalNotebook
          theme={systemDesignTheme}
          value={globalNote}
          onChange={(e) => setGlobalNote(e.target.value)}
        />
      </div>
    </div>
  );
}