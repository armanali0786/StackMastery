"use client";

import { useEffect, useState } from "react";
import { dsaTheme } from "../components/constants/themes"
import TrackerHeader from "../components/TrackerHeader";
import TipBanner from "../components/TipBanner";
import StatsBar from "../components/StatsBar";
import Legend from "../components/Legend";
import FavPanel from "./components/FavPanel";
import MonthSection from "../components/MonthSection";
import GlobalNotebook from "./components/GlobalNotebook";
import { ProblemData, State, Fav, Notes } from "./components/types";



const DATA: ProblemData[] = [
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
  {
    month: "Month 2", theme: "STRINGS & LINKED LIST", topics: [
      {
        label: "Strings", problems: [
          { name: "Reverse String", links: [{ l: "LC", u: "https://leetcode.com/problems/reverse-string/", t: "lc" }] },
          { name: "Longest Common Prefix", links: [{ l: "LC", u: "https://leetcode.com/problems/longest-common-prefix/", t: "lc" }] },
          { name: "Isomorphic Strings", links: [{ l: "LC", u: "https://leetcode.com/problems/isomorphic-strings/", t: "lc" }] },
          { name: "Longest Substring Without Repeat", links: [{ l: "LC", u: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", t: "lc" }] },
          { name: "Minimum Window Substring", links: [{ l: "LC", u: "https://leetcode.com/problems/minimum-window-substring/", t: "lc" }] },
          { name: "Check Subsequence", links: [{ l: "LC", u: "https://leetcode.com/problems/is-subsequence/", t: "lc" }] },
        ]
      },
      {
        label: "Linked List", problems: [
          { name: "Reverse Linked List", links: [{ l: "LC", u: "https://leetcode.com/problems/reverse-linked-list/", t: "lc" }] },
          { name: "Middle of Linked List", links: [{ l: "LC", u: "https://leetcode.com/problems/middle-of-the-linked-list/", t: "lc" }] },
          { name: "Detect Cycle", links: [{ l: "LC", u: "https://leetcode.com/problems/linked-list-cycle/", t: "lc" }] },
          { name: "Merge Two Sorted Lists", links: [{ l: "LC", u: "https://leetcode.com/problems/merge-two-sorted-lists/", t: "lc" }] },
          { name: "Remove Nth Node", links: [{ l: "LC", u: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", t: "lc" }] },
          { name: "Palindrome Linked List", links: [{ l: "LC", u: "https://leetcode.com/problems/palindrome-linked-list/", t: "lc" }] },
        ]
      },
    ]
  },
  {
    month: "Month 3", theme: "STACK & QUEUE", topics: [
      {
        label: "Stack", problems: [
          { name: "Valid Parentheses", links: [{ l: "LC", u: "https://leetcode.com/problems/valid-parentheses/", t: "lc" }] },
          { name: "Min Stack", links: [{ l: "LC", u: "https://leetcode.com/problems/min-stack/", t: "lc" }] },
          { name: "Next Greater Element", links: [{ l: "LC", u: "https://leetcode.com/problems/next-greater-element-i/", t: "lc" }] },
          { name: "Stock Span", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/stock-span-problem-1587115621/1", t: "gfg" }] },
          { name: "Largest Rectangle Histogram", links: [{ l: "LC", u: "https://leetcode.com/problems/largest-rectangle-in-histogram/", t: "lc" }] },
          { name: "Trapping Rain Water", links: [{ l: "LC", u: "https://leetcode.com/problems/trapping-rain-water/", t: "lc" }] },
        ]
      },
      {
        label: "Queue / Deque", problems: [
          { name: "Sliding Window Maximum", links: [{ l: "LC", u: "https://leetcode.com/problems/sliding-window-maximum/", t: "lc" }] },
          { name: "First Negative in Window", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1", t: "gfg" }] },
          { name: "LRU Cache", links: [{ l: "LC", u: "https://leetcode.com/problems/lru-cache/", t: "lc" }] },
        ]
      },
    ]
  },
  {
    month: "Month 4", theme: "TREES", topics: [
      {
        label: "Binary Tree", problems: [
          { name: "Preorder Traversal", links: [{ l: "LC", u: "https://leetcode.com/problems/binary-tree-preorder-traversal/", t: "lc" }] },
          { name: "Inorder Traversal", links: [{ l: "LC", u: "https://leetcode.com/problems/binary-tree-inorder-traversal/", t: "lc" }] },
          { name: "Postorder Traversal", links: [{ l: "LC", u: "https://leetcode.com/problems/binary-tree-postorder-traversal/", t: "lc" }] },
          { name: "Level Order Traversal", links: [{ l: "LC", u: "https://leetcode.com/problems/binary-tree-level-order-traversal/", t: "lc" }] },
          { name: "Height of Tree", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/height-of-binary-tree/1", t: "gfg" }] },
          { name: "Diameter of Binary Tree", links: [{ l: "LC", u: "https://leetcode.com/problems/diameter-of-binary-tree/", t: "lc" }] },
          { name: "LCA (Lowest Common Ancestor)", links: [{ l: "LC", u: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", t: "lc" }] },
        ]
      },
      {
        label: "BST", problems: [
          { name: "Validate BST", links: [{ l: "LC", u: "https://leetcode.com/problems/validate-binary-search-tree/", t: "lc" }] },
          { name: "Kth Smallest Element", links: [{ l: "LC", u: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", t: "lc" }] },
        ]
      },
    ]
  },
  {
    month: "Month 5", theme: "GRAPHS & DP", topics: [
      {
        label: "Graphs", problems: [
          { name: "Number of Islands", links: [{ l: "LC", u: "https://leetcode.com/problems/number-of-islands/", t: "lc" }] },
          { name: "Flood Fill", links: [{ l: "LC", u: "https://leetcode.com/problems/flood-fill/", t: "lc" }] },
          { name: "Course Schedule", links: [{ l: "LC", u: "https://leetcode.com/problems/course-schedule/", t: "lc" }] },
          { name: "Topological Sort", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/topological-sort/1", t: "gfg" }] },
        ]
      },
      {
        label: "Dynamic Programming", problems: [
          { name: "Climbing Stairs", links: [{ l: "LC", u: "https://leetcode.com/problems/climbing-stairs/", t: "lc" }] },
          { name: "House Robber", links: [{ l: "LC", u: "https://leetcode.com/problems/house-robber/", t: "lc" }] },
          { name: "Coin Change", links: [{ l: "LC", u: "https://leetcode.com/problems/coin-change/", t: "lc" }] },
          { name: "LIS (Longest Increasing Subsequence)", links: [{ l: "LC", u: "https://leetcode.com/problems/longest-increasing-subsequence/", t: "lc" }] },
          { name: "LCS (Longest Common Subsequence)", links: [{ l: "LC", u: "https://leetcode.com/problems/longest-common-subsequence/", t: "lc" }] },
        ]
      },
    ]
  },
  {
    month: "Month 6", theme: "ADVANCED", topics: [
      {
        label: "Advanced Topics", problems: [
          { name: "Binary Search on Answer (Koko)", links: [{ l: "LC", u: "https://leetcode.com/problems/koko-eating-bananas/", t: "lc" }] },
          { name: "Allocate Books", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1", t: "gfg" }] },
          { name: "Aggressive Cows", links: [{ l: "GFG", u: "https://practice.geeksforgeeks.org/problems/aggressive-cows/1", t: "gfg" }] },
          { name: "Bit Manipulation (Single Number)", links: [{ l: "LC", u: "https://leetcode.com/problems/single-number/", t: "lc" }] },
        ]
      },
    ]
  },
];

export default function DSATrackerPage() {
  const [state, setState] = useState<State>({});
  const [favs, setFavs] = useState<Fav>({});
  const [notes, setNotes] = useState<Notes>({});
  const [globalNote, setGlobalNote] = useState("");
  const [currentTab, setCurrentTab] = useState<"all" | "fav">("all");
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  // Load from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem("dsa_s");
      const f = localStorage.getItem("dsa_f");
      const n = localStorage.getItem("dsa_n");
      const gn = localStorage.getItem("dsa_gn");

      if (s) setState(JSON.parse(s));
      if (f) setFavs(JSON.parse(f));
      if (n) setNotes(JSON.parse(n));
      if (gn) setGlobalNote(gn);
    } catch (err) {
      console.error("Failed to load DSA tracker state", err);
    }
  }, []);

  // Save whenever state changes
  useEffect(() => {
    localStorage.setItem("dsa_s", JSON.stringify(state));
    localStorage.setItem("dsa_f", JSON.stringify(favs));
    localStorage.setItem("dsa_n", JSON.stringify(notes));
    localStorage.setItem("dsa_gn", globalNote);
  }, [state, favs, notes, globalNote]);

  // Key generator
  const key = (m: number, t: number, p: number) => `${m}_${t}_${p}`;

  // ── Actions ──
  const toggleSolve = (m: number, t: number, p: number) => {
    const k = key(m, t, p);
    setState((prev) => ({
      ...prev,
      [k]: prev[k] === "done" ? "todo" : "done",
    }));
  };

  const toggleReview = (m: number, t: number, p: number) => {
    const k = key(m, t, p);
    setState((prev) => ({
      ...prev,
      [k]: prev[k] === "review" ? "todo" : "review",
    }));
  };

  const toggleFav = (m: number, t: number, p: number) => {
    const k = key(m, t, p);
    setFavs((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const toggleNoteOpen = (k: string) => {
    setOpenNotes((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const updateNote = (k: string, value: string) => {
    setNotes((prev) => ({ ...prev, [k]: value }));
  };

  // ── Stats calculation ──
  const calculateStats = () => {
    let total = 0;
    let solved = 0;
    let review = 0;
    let favCount = 0;

    DATA.forEach((month, mi) =>
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

        <TipBanner theme={dsaTheme} />

        <StatsBar stats={stats} theme={dsaTheme} />

        <Legend theme={dsaTheme} />

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