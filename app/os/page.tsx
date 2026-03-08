// app/interview-prep/os-tracker/page.tsx
"use client";

import { useEffect, useState } from "react";
import OSHeader from "./components/OSHeader";
import StatsBar from "../components/StatsBar";
import TipBanner from "../components/TipBanner";
import Legend from "../components/Legend";
import FavPanel from "./components/FavPanel";
import MonthSection from "./components/MonthSection";
import GlobalNotebook from "./components/GlobalNotebook";
import { ProblemData, State, Fav, Notes } from "./components/types";
import { osTheme } from "../components/constants/themes";
import TrackerHeader from "../components/TrackerHeader";

// ── OS DATA ── (pasted from your HTML)
const DATA: ProblemData[] = [
  {
    month: "Fundamentals",
    theme: "OS BASICS & PROCESS MANAGEMENT",
    topics: [
      {
        label: "OS Introduction",
        problems: [
          { name: "What is an OS? Types of OS", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/introduction-of-operating-system-set-1/", t: "gfg" }], tags: ["concept"] },
          { name: "Kernel vs User Space", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/difference-between-user-mode-and-kernel-mode/", t: "gfg" }], tags: ["concept"] },
          { name: "System Calls", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/introduction-of-system-call/", t: "gfg" }], tags: ["concept"] },
          { name: "Monolithic vs Microkernel", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/monolithic-kernel-and-key-differences-from-microkernel/", t: "gfg" }], tags: ["concept"] },
          { name: "Booting Process", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/what-happens-when-we-turn-on-computer/", t: "gfg" }], tags: ["concept"] },
        ],
      },
      {
        label: "Processes",
        problems: [
          { name: "Process vs Thread", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/difference-between-process-and-thread/", t: "gfg" }], tags: ["concept"] },
          { name: "Process States & State Diagram", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/states-of-a-process-in-operating-systems/", t: "gfg" }], tags: ["concept"] },
          { name: "PCB (Process Control Block)", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/process-table-and-process-control-block-pcb/", t: "gfg" }], tags: ["concept"] },
          { name: "Context Switching", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/context-switch-in-operating-system/", t: "gfg" }], tags: ["concept"] },
          { name: "Zombie & Orphan Processes", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/zombie-and-orphan-processes-in-c/", t: "gfg" }], tags: ["concept"] },
          { name: "fork() and exec()", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/fork-system-call/", t: "gfg" }], tags: ["concept"] },
        ],
      },
    ],
  },
  // ... paste the remaining months here (Scheduling, Synchronization, Memory, Storage)
  // You can copy-paste the full DATA array from your HTML
];

const TRACKER_KEY = "os";

export default function OSTrackerPage() {
  const [state, setState] = useState<State>({});
  const [favs, setFavs] = useState<Fav>({});
  const [notes, setNotes] = useState<Notes>({});
  const [globalNote, setGlobalNote] = useState("");
  const [currentTab, setCurrentTab] = useState<"all" | "fav">("all");
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  // Load from localStorage
  useEffect(() => {
    try {
      setState(JSON.parse(localStorage.getItem(`${TRACKER_KEY}_s`) || "{}"));
      setFavs(JSON.parse(localStorage.getItem(`${TRACKER_KEY}_f`) || "{}"));
      setNotes(JSON.parse(localStorage.getItem(`${TRACKER_KEY}_n`) || "{}"));
      setGlobalNote(localStorage.getItem(`${TRACKER_KEY}_gn`) || "");
    } catch (err) {
      console.error("Failed to load OS tracker state", err);
    }
  }, []);

  // Save whenever state changes
  useEffect(() => {
    localStorage.setItem(`${TRACKER_KEY}_s`, JSON.stringify(state));
    localStorage.setItem(`${TRACKER_KEY}_f`, JSON.stringify(favs));
    localStorage.setItem(`${TRACKER_KEY}_n`, JSON.stringify(notes));
    localStorage.setItem(`${TRACKER_KEY}_gn`, globalNote);
  }, [state, favs, notes, globalNote]);

  const keyGen = (m: number, t: number, p: number) => `${m}_${t}_${p}`;

  const toggleSolve = (m: number, t: number, p: number) => {
    const k = keyGen(m, t, p);
    setState((prev) => ({
      ...prev,
      [k]: prev[k] === "done" ? "todo" : "done",
    }));
  };

  const toggleReview = (m: number, t: number, p: number) => {
    const k = keyGen(m, t, p);
    setState((prev) => ({
      ...prev,
      [k]: prev[k] === "review" ? "todo" : "review",
    }));
  };

  const toggleFav = (m: number, t: number, p: number) => {
    const k = keyGen(m, t, p);
    setFavs((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const toggleNoteOpen = (k: string) => {
    setOpenNotes((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const updateNote = (k: string, value: string) => {
    setNotes((prev) => ({ ...prev, [k]: value }));
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-orange opacity-5" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <TrackerHeader
          title="OS Mastery"
          subtitle="3 Month Roadmap"
          badge="OS"
          theme={osTheme}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          favCount={stats.fav}
        />

        <TipBanner theme={osTheme} />

        <StatsBar stats={stats} theme={osTheme} />

        <Legend theme={osTheme} />


        {currentTab === "fav" && (
          <FavPanel
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
              key={mi}
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
          value={globalNote}
          onChange={(e) => setGlobalNote(e.target.value)}
        />
      </div>
    </div>
  );
}