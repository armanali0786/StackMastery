// components/SignupForm.tsx
"use client";

import { useState } from "react";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!firstName || !lastName) return setMessage({ type: "error", text: "Please enter your full name." });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMessage({ type: "error", text: "Enter a valid email address." });
    if (password.length < 8) return setMessage({ type: "error", text: "Password must be at least 8 characters." });
    if (password !== confirmPassword) return setMessage({ type: "error", text: "Passwords do not match." });
    if (!agreeTerms) return setMessage({ type: "error", text: "Please agree to the Terms of Service." });

    setLoading(true);

    // Demo signup
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("iph_users") || "{}");
      if (users[email]) {
        setMessage({ type: "error", text: "An account with this email already exists." });
      } else {
        users[email] = { name: `${firstName} ${lastName}`, pw: btoa(password) };
        localStorage.setItem("iph_users", JSON.stringify(users));
        localStorage.setItem("iph_session", JSON.stringify({ email, name: `${firstName} ${lastName}` }));
        setMessage({ type: "success", text: "✓ Account created! Redirecting…" });
        setTimeout(() => {
          window.location.href = "/interview-prep";
        }, 1200);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Start your prep 🚀</h2>
        <p className="text-sm text-slate-400 mt-2 font-mono">
          Free forever. No credit card. 200+ topics across 5 subjects waiting for you.
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Arman"
            className="w-full bg-[#0f0f17] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ali"
            className="w-full bg-[#0f0f17] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-[#0f0f17] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            className="w-full bg-[#0f0f17] border border-slate-700 rounded-xl px-4 py-3 pr-16 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-sm font-mono"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your password"
          className="w-full bg-[#0f0f17] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="mt-1 accent-emerald-500"
        />
        <span className="text-sm text-slate-400 font-mono">
          I agree to the <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a> and{" "}
          <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-4 font-mono font-bold uppercase tracking-wider rounded-xl transition-all
          ${loading
            ? "bg-emerald-600/50 cursor-not-allowed"
            : "bg-emerald-500 hover:bg-emerald-400 hover:shadow-emerald-500/30 hover:-translate-y-0.5 text-black"}
        `}
      >
        {loading ? "Creating account…" : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin} className="text-emerald-400 font-bold hover:underline">
          Sign in
        </button>
      </p>
    </form>
  );
}