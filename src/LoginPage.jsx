import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Lock, Mail, ChevronRight, Loader2, AlertCircle, Monitor, Code2, BarChart3, Shield } from 'lucide-react';
import { useAuth } from './AuthContext';

const errorMap = {
  'Invalid login credentials': 'Email ou mot de passe incorrect',
  'Email not confirmed': 'Veuillez confirmer votre email avant de vous connecter',
  'Signup requires a valid password': 'Veuillez entrer un mot de passe valide',
};

function translateError(msg) {
  return errorMap[msg] || msg;
}

const TerminalWindow = ({ children, title, className = '' }) => (
  <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col ${className}`}>
    <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      {title && <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{title}</span>}
      <div className="w-12" />
    </div>
    <div className="flex-1 p-6 font-mono">{children}</div>
  </div>
);

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const text = 'Bienvenue sur NetAcademy_';
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) setError(translateError(error.message));
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#0a051a] text-slate-100 overflow-clip selection:bg-purple-600/30">
      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_3px]" />

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-8 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-4">
            <Monitor className="w-3 h-3" /><span>SYSTEM STATUS: OPERATIONAL</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tighter">
            <span className="text-emerald-400">&gt;</span> {displayedText}
            <span className="inline-block w-3 h-10 ml-2 bg-emerald-400 animate-pulse align-middle" />
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            className="text-slate-400 max-w-2xl text-lg font-mono leading-relaxed">
            La plateforme d'apprentissage Cisco nouvelle génération. Maîtrisez les réseaux avec une approche immersive et pratique.
          </motion.p>
        </header>

        {/* Login Section */}
        <div className="flex justify-center items-center -mt-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full max-w-md">
            <TerminalWindow title="auth_system.sh">
              {/* Error */}
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <span className="text-red-400 text-sm">{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-emerald-400 font-mono flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" />USER_IDENTITY
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@netacademy.io"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-sm placeholder:text-slate-700 text-slate-100" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-emerald-400 font-mono flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" />MOT_DE_PASSE
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-sm placeholder:text-slate-700 text-slate-100" required />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-mono disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>EXÉCUTER CONNEXION <ChevronRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </form>
            </TerminalWindow>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <TerminalWindow title="simulateur_cli.exe" className="h-full">
              <div className="flex flex-col h-full space-y-4">
                <div className="p-3 rounded-xl bg-purple-600/10 w-fit"><Terminal className="text-purple-500 w-6 h-6" /></div>
                <h3 className="text-xl font-bold">Simulateur CLI Cisco</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Pratiquez sur un terminal virtuel identique à l'IOS Cisco. Configurez vos switches et routeurs en temps réel.</p>
                <div className="pt-4 flex items-center text-emerald-400 text-xs gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /><span>READY_TO_BOOT</span>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <TerminalWindow title="labs_engine.vmdk" className="h-full">
              <div className="flex flex-col h-full space-y-4">
                <div className="p-3 rounded-xl bg-blue-600/10 w-fit"><Code2 className="text-blue-500 w-6 h-6" /></div>
                <h3 className="text-xl font-bold">Labs Interactifs</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Des scénarios de pannes réels à résoudre. Testez vos compétences sur des topologies réseau complexes.</p>
                <div className="pt-4 text-xs font-mono text-blue-400">[LOAD_MODULE: TOPOLOGY_BUILDER]</div>
              </div>
            </TerminalWindow>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <TerminalWindow title="stats_monitor.log" className="h-full">
              <div className="flex flex-col h-full space-y-4">
                <div className="p-3 rounded-xl bg-emerald-600/10 w-fit"><BarChart3 className="text-emerald-500 w-6 h-6" /></div>
                <h3 className="text-xl font-bold">Suivi de Progression</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Visualisez votre montée en compétences. Préparez vos certifications avec des indicateurs de réussite précis.</p>
                <div className="mt-auto h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "65%" }} viewport={{ once: true }} className="h-full bg-emerald-500" />
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        </div>

      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 w-full px-12 flex justify-between items-center text-[10px] font-mono text-slate-700 z-10 select-none">
        <div className="flex gap-6"><span>HOST: NETACADEMY-MAIN-SRV</span><span>UPTIME: 99.9%</span></div>
        <div className="flex gap-6"><span>LOC: [REGION_EU_WEST]</span><span>© 2024 NETACADEMY</span></div>
      </footer>
    </section>
  );
}
