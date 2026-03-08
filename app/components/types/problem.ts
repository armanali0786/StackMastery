export type Link = {
  l: string; // label (LC, GFG, etc.)
  u: string; // url
  t?: string; // type (optional)
};

export type Problem = {
  name: string;
  links: Link[];
  tags?: string[];
};

export type StateValue = "todo" | "done" | "review";

export type State = Record<string, StateValue>;

export type Fav = Record<string, boolean>;

export type Notes = Record<string, string>;

export type Topic = {
  label: string;
  problems: Problem[];
};

export type ProblemData = {
  month: string;
  theme: string;
  topics: Topic[];
};