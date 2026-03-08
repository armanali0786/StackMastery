// components/GlobalNotebook.tsx
import { ChangeEvent, FC } from "react";

interface GlobalNotebookProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const GlobalNotebook: FC<GlobalNotebookProps> = ({ value, onChange }) => {
    return (
        <div className="mt-12 mb-16 bg-[#16161f] border border-[#1e1e2e] rounded-2xl p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
                📓 Mistake Notebook
            </div>
            <textarea
                value={value}
                onChange={onChange}
                placeholder="SQL queries to remember, normalization tricks, transaction scenarios, ACID examples…"
                className="
                    w-full bg-[#0f0f17] border border-[#1e1e2e] rounded-lg px-4 py-3
                    text-sm font-mono text-slate-200 resize-y min-h-[140px]
                    focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600/50
                    placeholder:text-slate-600
                "
            />
        </div>
    );
};

export default GlobalNotebook;