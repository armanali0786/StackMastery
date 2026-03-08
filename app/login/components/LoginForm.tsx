// components/LoginForm.tsx
interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  // Add your state, validation, submit logic here (same as original JS)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back 👋</h2>
        <p className="text-sm text-slate-400 mt-2 font-mono">
          Pick up right where you left off. Your progress is waiting.
        </p>
      </div>

      {/* Social buttons, email/password fields, remember me, forgot link */}
      {/* ... implement similar to your original HTML/JS ... */}

      <button className="w-full py-4 bg-emerald-500 text-black font-mono font-bold rounded-xl hover:bg-emerald-400 transition-all hover:shadow-emerald-500/30 hover:-translate-y-0.5">
        Sign In
      </button>

      <p className="text-center text-sm text-slate-500 mt-6">
        Don't have an account?{" "}
        <button className="text-emerald-400 font-bold hover:underline" onClick={onSwitchToSignup}>
          Create one free
        </button>
      </p>
    </div>
  );
}