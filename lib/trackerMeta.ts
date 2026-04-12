// lib/trackerMeta.ts
// Shared tracker metadata and helpers used by TrackerCards and GlobalProgress

export type TrackerTopic = {
  label: string;
  problems: { name: string; links?: any[]; tags?: string[] }[];
};

export type TrackerMonth = {
  month: string;
  theme?: string;
  topics: TrackerTopic[];
};

/** Count total problems across all months/topics in a data array */
export function countProblems(data: TrackerMonth[] | null | undefined): number {
  if (!data || data.length === 0) return 0;
  let count = 0;
  data.forEach((month) =>
    month.topics?.forEach((topic) => {
      count += topic.problems?.length ?? 0;
    })
  );
  return count;
}

// ────────────────────────────────────────────────
// Fallback data for each subject (minimal samples)
// Full data is always fetched from the API.
// ────────────────────────────────────────────────

export const DSA_FALLBACK: TrackerMonth[] = [
  {
    month: "Month 1", theme: "FOUNDATIONS", topics: [
      {
        label: "Time & Space Complexity + Math", problems: [
          { name: "Count Digits" }, { name: "Reverse Number" }, { name: "Palindrome Number" },
          { name: "Fibonacci Number" }, { name: "GCD / HCF" }, { name: "Prime Check" },
          { name: "Sieve of Eratosthenes" },
        ]
      },
      {
        label: "Arrays (Basics → Advanced)", problems: [
          { name: "Largest Element" }, { name: "Second Largest" }, { name: "Check Sorted" },
          { name: "Remove Duplicates" }, { name: "Rotate Array" }, { name: "Move Zeros" },
          { name: "Two Sum" }, { name: "Best Time Buy & Sell Stock" },
          { name: "Maximum Subarray (Kadane)" }, { name: "Subarray Sum Equals K" },
          { name: "Majority Element" }, { name: "Longest Consecutive Sequence" },
        ]
      },
      {
        label: "Recursion & Backtracking", problems: [
          { name: "Reverse Array" }, { name: "Palindrome String" }, { name: "Power (xⁿ)" },
          { name: "Subsets" }, { name: "Subsequences" }, { name: "Permutations" },
          { name: "Tower of Hanoi" },
        ]
      },
      {
        label: "Sorting + Hashing", problems: [
          { name: "Sort Colors" }, { name: "Merge Sort" }, { name: "Count Inversions" },
          { name: "Frequency Count" }, { name: "First Non-Repeating" }, { name: "Valid Anagram" },
        ]
      },
    ]
  },
];

export const OOPS_FALLBACK: TrackerMonth[] = [
  {
    month: "Core Pillars", theme: "THE 4 PILLARS OF OOP", topics: [
      {
        label: "Encapsulation", problems: [
          { name: "What is Encapsulation?" },
          { name: "Access Modifiers (public/private/protected)" },
          { name: "Getters & Setters" },
          { name: "Data Hiding vs Abstraction" },
        ]
      },
    ]
  },
];

export const DBMS_FALLBACK: TrackerMonth[] = [
  {
    month: "Foundations", theme: "DBMS BASICS & ARCHITECTURE", topics: [
      {
        label: "Introduction", problems: [
          { name: "What is DBMS? DBMS vs File System" },
          { name: "Types of DBMS (Relational, NoSQL, etc.)" },
          { name: "3-Tier Architecture of DBMS" },
          { name: "Schema vs Instance" },
          { name: "DDL, DML, DCL, TCL Commands" },
        ]
      },
    ]
  },
];

export const OS_FALLBACK: TrackerMonth[] = [
  {
    month: "Fundamentals", theme: "OS BASICS & PROCESS MANAGEMENT", topics: [
      {
        label: "OS Introduction", problems: [
          { name: "What is an OS? Types of OS" }, { name: "Kernel vs User Space" },
          { name: "System Calls" }, { name: "Monolithic vs Microkernel" },
          { name: "Booting Process" },
        ]
      },
      {
        label: "Processes", problems: [
          { name: "Process vs Thread" }, { name: "Process States & State Diagram" },
          { name: "PCB (Process Control Block)" }, { name: "Context Switching" },
          { name: "Zombie & Orphan Processes" }, { name: "fork() and exec()" },
        ]
      },
    ]
  },
];

export const SD_FALLBACK: TrackerMonth[] = [
  {
    month: "Fundamentals", theme: "CORE CONCEPTS & BUILDING BLOCKS", topics: [
      {
        label: "Basics", problems: [
          { name: "Horizontal vs Vertical Scaling" }, { name: "Latency vs Throughput" },
          { name: "Availability vs Consistency" }, { name: "CAP Theorem (deep dive)" },
          { name: "PACELC Theorem" }, { name: "SLA, SLO, SLI" },
        ]
      },
    ]
  },
];

/** Static tracker metadata (without hardcoded totals — those are computed dynamically) */
export const TRACKER_META = [
  {
    id: "dsa",
    name: "DSA",
    abbr: "DSA",
    desc: "6-Month · Arrays, DP, Graphs, Trees & more",
    color: "#00ff88",
    href: "/dsa",
    icon: "🧮",
    fallback: DSA_FALLBACK,
  },
  {
    id: "oops",
    name: "OOPs",
    abbr: "OOP",
    desc: "4 Pillars · SOLID · Design Patterns",
    color: "#a78bfa",
    href: "/oops",
    icon: "🧩",
    fallback: OOPS_FALLBACK,
  },
  {
    id: "dbms",
    name: "DBMS",
    abbr: "DB",
    desc: "SQL · Normalization · Transactions · NoSQL",
    color: "#38bdf8",
    href: "/dbms",
    icon: "🗄️",
    fallback: DBMS_FALLBACK,
  },
  {
    id: "os",
    name: "Operating Systems",
    abbr: "OS",
    desc: "Processes · Scheduling · Memory · File Systems",
    color: "#fb923c",
    href: "/os",
    icon: "💻",
    fallback: OS_FALLBACK,
  },
  {
    id: "sd",
    name: "System Design",
    abbr: "SD",
    desc: "HLD · LLD · 12 Classic Designs · Scalability",
    color: "#34d399",
    href: "/system-design",
    icon: "🏗️",
    fallback: SD_FALLBACK,
  },
] as const;
