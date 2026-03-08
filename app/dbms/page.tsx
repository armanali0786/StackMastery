// app/interview-prep/dbms-tracker/page.tsx
"use client";

import { useEffect, useState } from "react";
import DBMSHeader from "./components/DBMSHeader";
import StatsBar from "../components/StatsBar";
import TipBanner from "../components/TipBanner";
import Legend from "../components/Legend";
import MonthSection from "./components/MonthSection";
import GlobalNotebook from "./components/GlobalNotebook";
import FavPanel from "./components/FavPanel";
import { ProblemData, State, Fav, Notes } from "./components/types";
import { dbmsTheme } from "../components/constants/themes";
import TrackerHeader from "../components/TrackerHeader";

// ── DBMS DATA ── (same as your original)
const DATA: ProblemData[] = [
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
      {
        label: "ER Model",
        problems: [
          { name: "Entity, Attribute, Relationship", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/introduction-of-er-model/", t: "gfg" }], tags: ["concept"] },
          { name: "Strong vs Weak Entity", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/difference-between-strong-and-weak-entity/", t: "gfg" }], tags: ["concept"] },
          { name: "Cardinality (1:1, 1:N, M:N)", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/mapping-constraints-in-er-model/", t: "gfg" }], tags: ["concept"] },
          { name: "ER Diagram to Relational Schema", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/converting-er-diagram-to-relational-model/", t: "gfg" }], tags: ["concept"] },
        ],
      },
    ],
  },
  // ... paste the remaining months/topics/problems here ...
  // (Normalization, Transactions, Indexing, etc.)
];

const TRACKER_KEY = "dbms";

export default function DBMSTrackerPage() {
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
      console.error("Failed to load DBMS tracker state", err);
    }
  }, []);

  // Save to localStorage
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

        <TipBanner theme={dbmsTheme} />

        <StatsBar stats={stats} theme={dbmsTheme} />

        <Legend theme={dbmsTheme} />

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