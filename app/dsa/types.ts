export interface Link {
  l: "LC" | "GFG";
  u: string;
  t: "lc" | "gfg";
}

export interface Problem {
  name: string;
  links: Link[];
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