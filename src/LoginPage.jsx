import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Lock, User, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext';

const errorMap = {
  'Invalid login credentials': 'Email ou mot de passe incorrect',
  'Email not confirmed': 'Veuillez confirmer votre email avant de vous connecter',
  'Signup requires a valid password': 'Veuillez entrer un mot de passe valide',
};

function translateError(msg) {
  return errorMap[msg] || msg;
}

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) setError(translateError(error.message));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a051a] flex flex-col items-center justify-center p-6 selection:bg-purple-500/30 relative overflow-hidden">
      {/* Background glows */}
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Terminal window */}
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] shadow-purple-900/20">
          {/* Title bar */}
          <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-widest opacity-60">
              <Terminal size={14} />
              <span>auth_provider.sh — 80×24</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Terminal body */}
          <div className="p-8 font-mono">
            {/* Welcome text */}
            <div className="mb-8 space-y-1">
              <p className="text-emerald-400 text-sm">[SYSTEM] Connection established to [NetAcademy] Node...</p>
              <p className="text-slate-500 text-xs">Last login: {new Date().toLocaleDateString('fr-FR')} on ttys004</p>
            </div>

            {/* Error message */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-start gap-2">
                <span className="text-red-400 text-sm font-mono">[ERROR]</span>
                <span className="text-red-400 text-sm">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <span className="opacity-50">user@netacademy:~$</span>
                  <span className="font-bold">sudo login --user</span>
                </div>
                <div className="relative flex items-center">
                  <User size={16} className="absolute left-0 text-emerald-400" />
                  <input
                    type="email"
                    placeholder="[votre_email@domaine.com]"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none text-emerald-400 pl-7 py-1 focus:ring-0 focus:outline-none placeholder:text-emerald-900/50 text-base"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <span className="opacity-50">user@netacademy:~$</span>
                  <span className="font-bold">enter password --secure</span>
                </div>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-0 text-emerald-400" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-transparent border-none text-emerald-400 pl-7 py-1 focus:ring-0 focus:outline-none placeholder:text-emerald-900/50 text-base"
                    required
                  />
                  <div className="w-2 h-5 bg-emerald-400/80 animate-pulse ml-1" />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 p-px rounded-xl overflow-hidden shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="bg-[#0a051a]/40 hover:bg-transparent transition-colors py-4 px-6 rounded-[11px] flex items-center justify-center gap-2">
                    {loading ? (
                      <Loader2 size={18} className="text-white animate-spin" />
                    ) : (
                      <>
                        <span className="text-white font-bold tracking-widest uppercase text-sm">Se connecter</span>
                        <ChevronRight size={18} className="text-white" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SECURE SHELL (AES-256)</span>
                </div>
                <span>NET_ACAD_V.03</span>
              </div>
              <p className="text-slate-600 text-[10px] font-mono text-center mt-3">
                Contactez votre formateur pour obtenir un accès
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
