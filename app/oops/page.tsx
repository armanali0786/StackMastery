// app/oops/page.tsx
"use client";

import { useEffect, useState } from "react";
import { oopsTheme } from "../components/constants/themes";
import TrackerHeader from "../components/TrackerHeader";
import TipBanner from "../components/TipBanner";
import StatsBar from "../components/StatsBar";
import Legend from "../components/Legend";
import FavPanel from "../components/FavPanel";
import MonthSection from "../components/MonthSection";
import GlobalNotebook from "../components/GlobalNotebook";
import { ProblemData, State, Fav, Notes } from "./types";


// ── OOPs DATA ── (pasted from your HTML)
const DATA: ProblemData[] = [
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
      {
        label: "Abstraction",
        problems: [
          { name: "What is Abstraction?", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/abstraction-in-java-2/", t: "gfg" }], tags: ["concept"] },
          { name: "Abstract Classes", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/abstract-classes-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Interfaces vs Abstract Classes", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Pure Virtual Functions (C++)", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/pure-virtual-functions-and-abstract-classes/", t: "gfg" }], tags: ["concept"] },
        ],
      },
      {
        label: "Inheritance",
        problems: [
          { name: "What is Inheritance?", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/inheritance-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Single Inheritance", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/java-and-multiple-inheritance/", t: "gfg" }], tags: ["concept"] },
          { name: "Multiple Inheritance & Diamond Problem", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/multiple-inheritance-in-c/", t: "gfg" }], tags: ["concept"] },
          { name: "Multilevel Inheritance", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/multilevel-inheritance-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Hierarchical Inheritance", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/hierarchical-inheritance-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Method Overriding", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/overriding-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "super / base class keyword", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/super-keyword/", t: "gfg" }], tags: ["concept"] },
        ],
      },
      {
        label: "Polymorphism",
        problems: [
          { name: "What is Polymorphism?", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/polymorphism-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Compile-time Polymorphism (Overloading)", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/method-overloading-in-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Runtime Polymorphism (Overriding + vtable)", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/dynamic-method-dispatch-runtime-polymorphism-java/", t: "gfg" }], tags: ["concept"] },
          { name: "Virtual Functions & vtable (C++)", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/virtual-function-cpp/", t: "gfg" }], tags: ["concept"] },
          { name: "Operator Overloading", links: [{ l: "GFG", u: "https://www.geeksforgeeks.org/operator-overloading-c/", t: "gfg" }], tags: ["concept"] },
        ],
      },
    ],
  },
  // ... paste the remaining months here (Class Internals, Advanced OOP, Interview Q&A)
  // You can copy-paste the rest from your HTML DATA array
];

const TRACKER_KEY = "oops";

export default function OOPsTrackerPage() {
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
      console.error("Failed to load OOPs tracker state", err);
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

        <TipBanner theme={oopsTheme} />

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
          />
        )}

        {currentTab === "all" &&
          DATA.map((month, mi) => (
            <MonthSection
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
            />
          ))}

        <GlobalNotebook
          theme={oopsTheme}
          value={globalNote}
          onChange={(e) => setGlobalNote(e.target.value)}
        />
      </div>
    </div>
  );
}