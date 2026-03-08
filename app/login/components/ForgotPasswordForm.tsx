// components/ForgotPasswordForm.tsx
"use client";

import { useState } from "react";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setLoading(true);

    // Demo forgot password flow
    setTimeout(() => {
      setMessage({ type: "success", text: "✓ If that email exists, a reset link has been sent." });
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Reset password 🔑</h2>
        <p className="text-sm text-slate-400 mt-2 font-mono">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-mono ${
            message.type === "error" ? "bg-red-950/30 border border-red-800/40 text-red-300" : "bg-emerald-950/30 border border-emerald-800/40 text-emerald-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label htmlFor="forgotEmail" className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            id="forgotEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-[#0f0f17] border border-slate-700 rounded-xl px-4 py-3 pl-11 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 7 10-7" />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-4 font-mono font-bold uppercase tracking-wider rounded-xl transition-all
          ${loading ? "bg-emerald-600/50 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-400 hover:shadow-emerald-500/30 hover:-translate-y-0.5 text-black"}
        `}
      >
        {loading ? "Sending…" : "Send Reset Link"}
      </button>

      <p className="text-center text-sm text-slate-500 mt-6">
        Remembered it?{" "}
        <button type="button" onClick={onBackToLogin} className="text-emerald-400 font-bold hover:underline">
          Back to Login
        </button>
      </p>
    </form>
  );
}