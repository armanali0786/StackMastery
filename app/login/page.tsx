// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import AuthTabs from "./components/AuthTabs";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import BrandingPanel from "./components/BrandingPanel";
import NavBar from "../components/NavBar"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "forgot">("login");

  // Redirect if already logged in (demo)
  useEffect(() => {
    const session = localStorage.getItem("iph_session");
    if (session) {
      window.location.href = "/"; 
    }
  }, []);

  const switchTab = (tab: "login" | "signup" | "forgot") => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans flex flex-col">
      {/* Background grid + noise */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-emerald opacity-[0.025]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Main content - split layout */}
      <div className="flex-1 grid lg:grid-cols-2 min-h-[calc(100vh-58px)] pt-[58px]">
        {/* Left: Branding & Features */}
        <BrandingPanel />

        {/* Right: Auth Forms */}
        <div className="flex items-start justify-center p-6 lg:p-10 mt-10">
          <div className="w-full max-w-md animate-fade-up">
            <div className="bg-[#16161f] border border-[#1e1e2e] rounded-2xl p-8 md:p-10 relative overflow-hidden">
              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-emerald-500" />

              <AuthTabs activeTab={activeTab} onTabChange={switchTab} />

              {activeTab === "login" && <LoginForm onSwitchToSignup={() => switchTab("signup")} />}
              {activeTab === "signup" && <SignupForm onSwitchToLogin={() => switchTab("login")} />}
              {activeTab === "forgot" && <ForgotPasswordForm onBackToLogin={() => switchTab("login")} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}