"use client";

import { Theme } from "./types/theme";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  theme: Theme;
  title?: string;
};

export default function GlobalNotebook({
  value,
  onChange,
  theme,
  title = "Global Notes",
}: Props) {
  return (
    <div className="mt-16 border-t border-slate-800 pt-8">

      <h2 className={`text-lg font-bold mb-4 ${theme.primaryText}`}>
        {title}
      </h2>

      <textarea
        value={value}
        onChange={onChange}
        placeholder="Write overall notes, patterns, mistakes, interview insights..."
        className="
          w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3
          text-sm font-mono text-slate-200 min-h-[140px]
          focus:outline-none
        "
      />
    </div>
  );
}