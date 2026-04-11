// app/oops/page.tsx
"use client";

import { useState } from "react";
import { useTrackerData } from "../../lib/hooks/useTrackerData";
import { oopsTheme } from "../components/constants/themes";
import TrackerHeader from "../components/TrackerHeader";
import TipBanner from "../components/TipBanner";
import StatsBar from "../components/StatsBar";
import Legend from "../components/Legend";
import FavPanel from "../components/FavPanel";
import MonthSection from "../components/MonthSection";
import GlobalNotebook from "../components/GlobalNotebook";
import TrackerSkeleton from "../components/TrackerSkeleton";
import { ProblemData, State, Fav, Notes } from "./types";
import { useTopicContent } from "../../lib/hooks/useTopicContent";


// ── OOPs DATA ── (pasted from your HTML)
export const FALLBACK_DATA: ProblemData[] = [
  {
    month: "Core Pillars",
    theme: "THE 4 PILLARS OF OOP",
    topics: [
      {
        label: "Encapsulation",
        problems: [
          { name: "What is Encapsulation?", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/encapsulation-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Access Modifiers (public/private/protected)", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/access-modifiers-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Getters & Setters", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/getter-and-setter-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Data Hiding vs Abstraction", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/difference-between-data-hiding-and-abstraction-in-oops/", t: "gfg" }], tags: ["concept"] },
        ],
      },
    ],
  },

];

const TRACKER_KEY = "oops";

export default function OOPsTrackerPage() {
  const { topicData, loading: contentLoading } = useTopicContent("oops");
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
        <div className="fixed inset-0 pointer-events-none z-0 bg-grid-violet opacity-5" />
        <TrackerSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-violet opacity-5" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        {/* <OOPsHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          favCount={stats.fav}
        />

        <StatsBar stats={stats} />

        <TipBanner stats={stats}/>

        <Legend /> */}
        <TrackerHeader
          title="OOPS Mastery"
          subtitle="3 Month Roadmap"
          badge="OOPs"
          theme={oopsTheme}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          favCount={stats.fav}
        />

        {/* <TipBanner theme={oopsTheme} /> */}

        <StatsBar stats={stats} theme={oopsTheme} />

        <Legend theme={oopsTheme} />

        {currentTab === "fav" && (
          <FavPanel
            theme={oopsTheme}
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
              theme={oopsTheme}
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
          theme={oopsTheme}
          value={globalNote}
          onChange={(e) => setGlobalNote(e.target.value)}
          onBlur={syncNotes}
        />
      </div>
    </div>
  );
}