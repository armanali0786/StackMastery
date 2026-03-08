// components/types.ts
export interface Link {
  l: "GFG" | "YT" | "Web";
  u: string;
  t: "gfg" | "yt" | "web";
}

export interface Problem {
  name: string;
  links: Link[];
  tags?: string[];
}

export interface Topic {
  label: string;
  problems: Problem[];
}

export interface Month {
  month: string;
  theme: string;
  topics: Topic[];
}

export type ProblemData = Month;

export type StateValue = "todo" | "done" | "review";
export type State = Record<string, StateValue>;

export type Fav = Record<string, boolean>;

export type Notes = Record<string, string>;