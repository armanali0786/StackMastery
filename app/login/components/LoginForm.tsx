// components/LoginForm.tsx
"use client";

import { useState } from "react";
import SocialButtons from "./SocialButtons";
import { API_BASE_URL } from "../../../lib/api";
import { useAuth } from "../../../lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

export default function LoginForm({ onSwitchToSignup, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address.");
      setLoading(false);
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome back!");
        login(data.user, data.token);
        router.push("/");
      } else {
        toast.error(data.error || "Invalid email or password.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back 👋</h2>
        <p className="text-sm text-slate-400 mt-2 font-mono">
          Pick up right where you left off. Your progress is waiting.
        </p>
      </div>

      <SocialButtons />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#16161f] px-4 text-slate-500">or sign in with email</span>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-[#0f0f17] border border-slate-700 rounded-xl px-4 py-3 pl-11 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 7 10-7" />
          </svg>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full bg-[#0f0f17] border border-slate-700 rounded-xl px-4 py-3 pl-11 pr-16 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-sm font-mono"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-emerald-500 w-4 h-4"
          />
          <span className="text-slate-400 font-mono">Keep me signed in</span>
        </label>

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-emerald-400 hover:text-emerald-300 transition-colors font-mono text-sm"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 font-mono font-bold uppercase tracking-wider rounded-xl transition-all ${loading
          ? "bg-emerald-600/50 cursor-not-allowed"
          : "bg-emerald-500 hover:bg-emerald-400 hover:shadow-emerald-500/30 hover:-translate-y-0.5 text-black"
          }`}
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>

      <p className="text-center text-sm text-slate-500 mt-6">
        Don't have an account?{" "}
        <button type="button" onClick={onSwitchToSignup} className="text-emerald-400 font-bold hover:underline">
          Create one free
        </button>
      </p>
    </form>
  );
}