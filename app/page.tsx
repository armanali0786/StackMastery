// app/page.tsx
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import GlobalProgress from "./components/GlobalProgress";
import TrackerCards from "./components/TrackerCards";
import HowItWorks from "./components/HowItWorks";
import DailyGoals from "./components/DailyGoals";
import FavoritesSummary from "./components/FavoritesSummary";
import NotesQuickAccess from "./components/NotesQuickAccess";
import Footer from "./components/Footer";

export default function InterviewPrepHome() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-emerald opacity-[0.025]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      <div className="relative z-10">

        <HeroSection />

        <main>
          <GlobalProgress />
          <TrackerCards />
          <HowItWorks />
          <DailyGoals />
          <FavoritesSummary />
          <NotesQuickAccess />
        </main>

        <Footer />
      </div>
    </div>
  );
}