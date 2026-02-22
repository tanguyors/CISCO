import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthContext';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import NetMasterClass from './NetMasterClass';
import AdminDashboard from './AdminDashboard';
import StudentStats from './StudentStats';
import LivesPage from './LivesPage';
import { Terminal, Loader2, Lock, ChevronRight } from 'lucide-react';

function getPromoToken() {
  const params = new URLSearchParams(window.location.search);
  return params.get('promo') || null;
}

function SetPasswordPage() {
  const { setupPassword, profile } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    const { error } = await setupPassword(password);
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a051a] flex flex-col items-center justify-center p-6 selection:bg-purple-500/30 relative overflow-hidden">
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
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
              <span>setup_password.sh</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Terminal body */}
          <div className="p-8 font-mono">
            <div className="mb-8 space-y-1">
              <p className="text-emerald-400 text-sm">[SYSTEM] Invitation accepted — Welcome{profile?.full_name ? ` ${profile.full_name}` : ''} !</p>
              <p className="text-emerald-400 text-sm">[SYSTEM] Password setup required before accessing the platform...</p>
              <p className="text-slate-500 text-xs mt-2">Session initialized: {new Date().toLocaleDateString('fr-FR')}</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-start gap-2">
                <span className="text-red-400 text-sm font-mono">[ERROR]</span>
                <span className="text-red-400 text-sm">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <span className="opacity-50">user@netacademy:~$</span>
                  <span className="font-bold">set password --new</span>
                </div>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-0 text-emerald-400" />
                  <input
                    type="password"
                    placeholder="[nouveau_mot_de_passe]"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-transparent border-none text-emerald-400 pl-7 py-1 focus:ring-0 focus:outline-none placeholder:text-emerald-900/50 text-base"
                    required
                  />
                </div>
              </div>

              {/* Confirm password */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <span className="opacity-50">user@netacademy:~$</span>
                  <span className="font-bold">confirm password --verify</span>
                </div>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-0 text-emerald-400" />
                  <input
                    type="password"
                    placeholder="[confirmer_mot_de_passe]"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
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
                        <span className="text-white font-bold tracking-widest uppercase text-sm">Définir mon mot de passe</span>
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
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const { user, profile, loading, needsPasswordSetup } = useAuth();
  const [page, setPage] = useState('stats'); // 'stats' | 'courses' | 'admin' | 'lives'
  const [promoToken] = useState(getPromoToken);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a051a] flex flex-col items-center justify-center gap-4">
        <Terminal className="w-8 h-8 text-purple-400" />
        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        <p className="text-slate-500 text-sm font-mono">Initializing connection...</p>
      </div>
    );
  }

  if (!user && promoToken) {
    return (
      <RegisterPage
        promoToken={promoToken}
        onGoLogin={() => {
          window.history.replaceState({}, '', window.location.pathname);
          window.location.reload();
        }}
      />
    );
  }

  if (!user) return <LoginPage />;

  if (needsPasswordSetup) return <SetPasswordPage />;

  if (page === 'admin' && profile?.role && ['admin', 'prof'].includes(profile.role)) {
    return <AdminDashboard onBack={() => setPage('stats')} />;
  }

  if (page === 'lives') {
    return <LivesPage onBack={() => setPage('stats')} />;
  }

  if (page === 'courses') {
    return <NetMasterClass onShowStats={() => setPage('stats')} onShowAdmin={() => setPage('admin')} />;
  }

  return (
    <StudentStats
      onContinue={() => setPage('courses')}
      onShowAdmin={() => setPage('admin')}
      onShowLives={() => setPage('lives')}
    />
  );
}
