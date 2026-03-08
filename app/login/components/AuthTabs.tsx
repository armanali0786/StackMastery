// components/AuthTabs.tsx
interface AuthTabsProps {
  activeTab: "login" | "signup" | "forgot";
  onTabChange: (tab: "login" | "signup" | "forgot") => void;
}

export default function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  if (activeTab === "forgot") return null;

  return (
    <div className="grid grid-cols-2 bg-[#0f0f17] border border-slate-800 rounded-xl p-1 mb-10">
      <button
        className={`
          py-3 px-6 font-mono text-sm font-bold uppercase tracking-wide rounded-lg transition-all
          ${activeTab === "login" ? "bg-[#16161f] text-white shadow-lg" : "text-slate-400 hover:text-slate-200"}
        `}
        onClick={() => onTabChange("login")}
      >
        Login
      </button>
      <button
        className={`
          py-3 px-6 font-mono text-sm font-bold uppercase tracking-wide rounded-lg transition-all
          ${activeTab === "signup" ? "bg-[#16161f] text-white shadow-lg" : "text-slate-400 hover:text-slate-200"}
        `}
        onClick={() => onTabChange("signup")}
      >
        Sign Up
      </button>
    </div>
  );
}