"use client";

import { useState } from "react";
import { useTrackerData } from "../../lib/hooks/useTrackerData";
import { dsaTheme } from "../components/constants/themes"
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



export const FALLBACK_DATA: ProblemData[] = [
  {
    month: "Month 1", theme: "FOUNDATIONS", topics: [
      {
        label: "Time & Space Complexity + Math", problems: [
          { name: "Count Digits", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/count-digits5716/1", t: "gfg" }] },
          { name: "Reverse Number", links: [{ l: "LC", u: "https://leetcode.com/problems/reverse-integer/", t: "lc" }, { l: "GFG", u: "https://practice.geeksforgeeks.org/problems/reverse-digit0316/1", t: "gfg" }] },
          { name: "Palindrome Number", links: [{ l: "LC", u: "https://leetcode.com/problems/palindrome-number/", t: "lc" }] },
          { name: "Fibonacci Number", links: [{ l: "LC", u: "https://leetcode.com/problems/fibonacci-number/", t: "lc" }] },
          { name: "GCD / HCF", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1", t: "gfg" }] },
          { name: "Prime Check", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/prime-number2314/1", t: "gfg" }] },
          { name: "Sieve of Eratosthenes", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1", t: "gfg" }] },
        ]
      },
      {
        label: "Arrays (Basics → Advanced)", problems: [
          { name: "Largest Element", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/largest-element-in-array4009/1", t: "gfg" }] },
          { name: "Second Largest", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/second-largest3735/1", t: "gfg" }] },
          { name: "Check Sorted", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1", t: "gfg" }] },
          { name: "Remove Duplicates", links: [{ l: "LC", u: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", t: "lc" }] },
          { name: "Rotate Array", links: [{ l: "LC", u: "https://leetcode.com/problems/rotate-array/", t: "lc" }] },
          { name: "Move Zeros", links: [{ l: "LC", u: "https://leetcode.com/problems/move-zeroes/", t: "lc" }] },
          { name: "Two Sum", links: [{ l: "LC", u: "https://leetcode.com/problems/two-sum/", t: "lc" }] },
          { name: "Best Time Buy & Sell Stock", links: [{ l: "LC", u: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", t: "lc" }] },
          { name: "Maximum Subarray (Kadane)", links: [{ l: "LC", u: "https://leetcode.com/problems/maximum-subarray/", t: "lc" }] },
          { name: "Subarray Sum Equals K", links: [{ l: "LC", u: "https://leetcode.com/problems/subarray-sum-equals-k/", t: "lc" }] },
          { name: "Majority Element", links: [{ l: "LC", u: "https://leetcode.com/problems/majority-element/", t: "lc" }] },
          { name: "Longest Consecutive Sequence", links: [{ l: "LC", u: "https://leetcode.com/problems/longest-consecutive-sequence/", t: "lc" }] },
        ]
      },
      {
        label: "Recursion & Backtracking", problems: [
          { name: "Reverse Array", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/reverse-an-array/0", t: "gfg" }] },
          { name: "Palindrome String", links: [{ l: "LC", u: "https://leetcode.com/problems/valid-palindrome/", t: "lc" }] },
          { name: "Power (xⁿ)", links: [{ l: "LC", u: "https://leetcode.com/problems/powx-n/", t: "lc" }] },
          { name: "Subsets", links: [{ l: "LC", u: "https://leetcode.com/problems/subsets/", t: "lc" }] },
          { name: "Subsequences", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/subsequences-of-string/0", t: "gfg" }] },
          { name: "Permutations", links: [{ l: "LC", u: "https://leetcode.com/problems/permutations/", t: "lc" }] },
          { name: "Tower of Hanoi", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1", t: "gfg" }] },
        ]
      },
      {
        label: "Sorting + Hashing", problems: [
          { name: "Sort Colors", links: [{ l: "LC", u: "https://leetcode.com/problems/sort-colors/", t: "lc" }] },
          { name: "Merge Sort", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/merge-sort/1", t: "gfg" }] },
          { name: "Count Inversions", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/inversion-of-array-1587115620/1", t: "gfg" }] },
          { name: "Frequency Count", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/frequency-of-array-elements-1587115620/1", t: "gfg" }] },
          { name: "First Non-Repeating", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/non-repeating-character-1587115620/1", t: "gfg" }] },
          { name: "Valid Anagram", links: [{ l: "LC", u: "https://leetcode.com/problems/valid-anagram/", t: "lc" }] },
        ]
      },
    ]
  },
];

export default function DSATrackerPage() {
  const { topicData, loading: contentLoading } = useTopicContent("dsa");
  const DATA: ProblemData[] = (topicData as ProblemData[]) || FALLBACK_DATA;

  const { state, setState, favs, setFavs, notes, setNotes, globalNote, setGlobalNote, markState, toggleFavMark, syncNotes, loading: trackerLoading } = useTrackerData<State, Fav, Notes>("dsa");
  const [currentTab, setCurrentTab] = useState<"all" | "fav">("all");
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  const loading = contentLoading || trackerLoading;

  // Key generator
  const key = (m: number, t: number, p: number) => `${m}_${t}_${p}`;

  // ── Actions ──
  const toggleSolve = (m: number, t: number, p: number) => {
    const k = key(m, t, p);
    markState(k, state[k] === "done" ? "todo" : "done");
  };

  const toggleReview = (m: number, t: number, p: number) => {
    const k = key(m, t, p);
    markState(k, state[k] === "review" ? "todo" : "review");
  };

  const toggleFav = (m: number, t: number, p: number) => {
    const k = key(m, t, p);
    toggleFavMark(k);
  };

  const toggleNoteOpen = (k: string) => {
    setOpenNotes((prev: Record<string, boolean>) => ({ ...prev, [k]: !prev[k] }));
  };

  const updateNote = (k: string, value: string) => {
    setNotes((prev: Notes) => ({ ...prev, [k]: value }));
  };

  // ── Stats calculation ──
  const calculateStats = () => {
    let total = 0;
    let solved = 0;
    let review = 0;
    let favCount = 0;

    DATA?.forEach((month, mi) =>
      month.topics.forEach((topic, ti) =>
        topic.problems.forEach((_, pi) => {
          total++;
          const k = key(mi, ti, pi);
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
        <div className="fixed inset-0 pointer-events-none z-0 bg-grid-accent opacity-5" />
        <TrackerSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-accent opacity-5" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <TrackerHeader
          title="DSA Mastery"
          subtitle="6 Month Roadmap"
          badge="DSA"
          theme={dsaTheme}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          favCount={stats.fav}
        />

        {/* <TipBanner theme={dsaTheme} /> */}

        <StatsBar stats={stats} theme={dsaTheme} />

        <Legend theme={dsaTheme} />

        {currentTab === "fav" && (
          <FavPanel
            theme={dsaTheme}
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
              theme={dsaTheme}
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
          theme={dsaTheme}
          value={globalNote}
          onChange={(e) => setGlobalNote(e.target.value)}
          onBlur={syncNotes}
        />
      </div>
    </div>
  );
}