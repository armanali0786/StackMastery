// app/dbms/page.tsx
"use client";

import { useState } from "react";
import { useTrackerData } from "../../lib/hooks/useTrackerData";
import StatsBar from "../components/StatsBar";
import TipBanner from "../components/TipBanner";
import Legend from "../components/Legend";
import MonthSection from "../components/MonthSection";
import GlobalNotebook from "../components/GlobalNotebook";
import FavPanel from "../components/FavPanel";
import TrackerSkeleton from "../components/TrackerSkeleton";
import { ProblemData, State, Fav, Notes } from "./types";
import { useTopicContent } from "../../lib/hooks/useTopicContent";
import { dbmsTheme } from "../components/constants/themes";
import TrackerHeader from "../components/TrackerHeader";

// ── DBMS DATA ── (same as your original)
export const FALLBACK_DATA: ProblemData[] = [
  {
    month: "Foundations",
    theme: "DBMS BASICS & ARCHITECTURE",
    topics: [
      {
        label: "Introduction",
        problems: [
          { name: "What is DBMS? DBMS vs File System", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/", t: "gfg" }], tags: ["concept"] },
          { name: "Types of DBMS (Relational, NoSQL, etc.)", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/types-of-databases/", t: "gfg" }], tags: ["concept"] },
          { name: "3-Tier Architecture of DBMS", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/dbms-architecture-2-level-3-level/", t: "gfg" }], tags: ["concept"] },
          { name: "Schema vs Instance", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/difference-between-schema-and-instance-in-dbms/", t: "gfg" }], tags: ["concept"] },
          { name: "DDL, DML, DCL, TCL Commands", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/", t: "gfg" }], tags: ["sql"] },
        ],
      },
    ],
  },
];

const TRACKER_KEY = "dbms";

export default function DBMSTrackerPage() {
  const { topicData, loading: contentLoading } = useTopicContent("dbms");
  const DATA: ProblemData[] = (topicData as ProblemData[]) || FALLBACK_DATA;

  const { state, setState, favs, setFavs, notes, setNotes, globalNote, setGlobalNote, markState, toggleFavMark, syncNotes, loading: trackerLoading } = useTrackerData<State, Fav, Notes>(TRACKER_KEY);
  const [currentTab, setCurrentTab] = useState<"all" | "fav">("all");
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  const loading = contentLoading || trackerLoading;

  const keyGen = (m: number, t: number, p: number) => `${m}_${t}_${p}`;

  const toggleSolve = (m: number, t: number, p: number) => {
    const k = keyGen(m, t, p);
    markState(k, state[k] === "done" ? "todo" : "done");
  };

  const toggleReview = (m: number, t: number, p: number) => {
    const k = keyGen(m, t, p);
    markState(k, state[k] === "review" ? "todo" : "review");
  };

  const toggleFav = (m: number, t: number, p: number) => {
    const k = keyGen(m, t, p);
    toggleFavMark(k);
  };

  const toggleNoteOpen = (k: string) => {
    setOpenNotes((prev: Record<string, boolean>) => ({ ...prev, [k]: !prev[k] }));
  };

  const updateNote = (k: string, value: string) => {
    setNotes((prev: Notes) => ({ ...prev, [k]: value }));
  };

  const calculateStats = () => {
    let total = 0, solved = 0, review = 0, favCount = 0;

    DATA?.forEach((month, mi) =>
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
        <div className="fixed inset-0 pointer-events-none z-0 bg-grid-blue opacity-5" />
        <TrackerSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-blue opacity-5" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <TrackerHeader
          title="DBMS Tracker"
          subtitle="3 Month Roadmap"
          badge="DBMS"
          theme={dbmsTheme}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          favCount={stats.fav}
        />

        {/* <TipBanner theme={dbmsTheme} /> */}

        <StatsBar stats={stats} theme={dbmsTheme} />

        <Legend theme={dbmsTheme} />

        {currentTab === "fav" && (
          <FavPanel
            theme={dbmsTheme}
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
            onBlurNote={syncNotes}
          />
        )}

        {currentTab === "all" &&
          DATA?.map((month, mi) => (
            <MonthSection
              key={mi}
              theme={dbmsTheme}
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
              onBlurNote={syncNotes}
            />
          ))}

        <GlobalNotebook
          theme={dbmsTheme}
          value={globalNote}
          onChange={(e) => setGlobalNote(e.target.value)}
          onBlur={syncNotes}
        />
      </div>
    </div>
  );
}