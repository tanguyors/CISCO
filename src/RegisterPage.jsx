import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Lock, Mail, ChevronRight, Loader2, AlertCircle, User, UserPlus, CheckCircle2 } from 'lucide-react';
import { supabase } from './supabaseClient';

const errorMap = {
  'User already registered': 'Cet email est déjà utilisé',
  'Signup requires a valid password': 'Veuillez entrer un mot de passe valide',
  'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères',
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

export default function RegisterPage({ promoToken, onGoLogin }) {
  const [promo, setPromo] = useState(null);
  const [promoLoading, setPromoLoading] = useState(true);
  const [promoError, setPromoError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchPromo() {
      if (!promoToken) {
        setPromoError("Aucun lien d'invitation fourni.");
        setPromoLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('promos')
        .select('*')
        .eq('token', promoToken)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        setPromoError("Lien d'invitation invalide ou expiré.");
      } else {
        setPromo(data);
      }
      setPromoLoading(false);
    }
    fetchPromo();
  }, [promoToken]);

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
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName,
          promo_id: promo.id,
        }
      }
    });

    if (signUpError) {
      setError(translateError(signUpError.message));
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#0a051a] text-slate-100 overflow-clip selection:bg-purple-600/30">
      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_3px]" />

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-4 pt-8 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono">
            <UserPlus className="w-3 h-3" /><span>INSCRIPTION</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter">
            <span className="text-emerald-400">&gt;</span> Rejoindre NetAcademy_
            <span className="inline-block w-3 h-8 ml-2 bg-emerald-400 animate-pulse align-middle" />
          </h1>
        </header>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full max-w-lg">
          <TerminalWindow title="register_user.sh">
            {promoLoading ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <Loader2 size={24} className="text-purple-400 animate-spin" />
                <p className="text-slate-500 text-sm">Vérification du lien d'invitation...</p>
              </div>
            ) : promoError ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <AlertCircle size={32} className="text-red-400" />
                <p className="text-red-400 text-sm text-center">{promoError}</p>
                <button onClick={onGoLogin}
                  className="mt-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 transition-colors">
                  Retour à la connexion
                </button>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <CheckCircle2 size={32} className="text-emerald-400" />
                <p className="text-emerald-400 text-sm text-center font-semibold">Inscription réussie !</p>
                <p className="text-slate-400 text-xs text-center">Vous êtes maintenant connecté. Redirection en cours...</p>
              </div>
            ) : (
              <>
                {/* Promo info */}
                <div className="mb-6 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-purple-400 text-xs font-mono mb-1">[PROMO] {promo.name}</p>
                  <p className="text-slate-500 text-[10px]">Date de début : {new Date(promo.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>

                {/* Error */}
                {error && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertCircle size={14} className="text-red-400 shrink-0" />
                    <span className="text-red-400 text-sm">{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nom / Prénom */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3" />PRENOM
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jean"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-sm placeholder:text-slate-700 text-slate-100" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3" />NOM
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Dupont"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-sm placeholder:text-slate-700 text-slate-100" required />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3" />USER_IDENTITY
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jean.dupont@email.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-sm placeholder:text-slate-700 text-slate-100" required />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3" />MOT_DE_PASSE
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-sm placeholder:text-slate-700 text-slate-100" required />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3" />CONFIRMER_MDP
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-sm placeholder:text-slate-700 text-slate-100" required />
                    </div>
                  </div>

                  <div className="pt-3">
                    <button type="submit" disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-mono disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>CRÉER MON COMPTE <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-5 text-center">
                  <button onClick={onGoLogin} className="text-slate-500 text-xs hover:text-slate-300 transition-colors font-mono">
                    Déjà inscrit ? Se connecter
                  </button>
                </div>
              </>
            )}
          </TerminalWindow>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 w-full px-12 flex justify-between items-center text-[10px] font-mono text-slate-700 z-10 select-none">
        <div className="flex gap-6"><span>HOST: NETACADEMY-MAIN-SRV</span><span>UPTIME: 99.9%</span></div>
        <div className="flex gap-6"><span>LOC: [REGION_EU_WEST]</span><span>© 2024 NETACADEMY</span></div>
      </footer>
    </section>
  );
}
