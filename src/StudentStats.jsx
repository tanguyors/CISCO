import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Terminal, Award, Play, CheckCircle2, Zap, Settings, LogOut, Loader2, Lock, BookOpen, ChevronRight, Shield, Target, TrendingUp, Video } from 'lucide-react';
import { useAuth } from './AuthContext';
import { supabase } from './supabaseClient';

function formatTime(seconds) {
  if (!seconds) return '0h 0m';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs}h ${mins}m`;
}

const GlassCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="relative p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
  >
    <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/5 blur-2xl rounded-full group-hover:bg-purple-500/10 transition-colors" />
    {children}
  </motion.div>
);

const sessions = [
  { id: 1, title: "Sécurisation et SSH", desc: "Commandes fondamentales, modes CLI, mots de passe, SSH", week: 1 },
  { id: 2, title: "VLAN", desc: "Création et gestion des VLANs, switchport access", week: 1 },
  { id: 3, title: "Trunk et Routage Inter-VLAN", desc: "Trunk 802.1Q, routage inter-VLAN, router-on-a-stick", week: 1 },
  { id: 4, title: "DHCP & DNS", desc: "Configuration DHCP, serveur DNS, résolution de noms", week: 2 },
  { id: 5, title: "HTTP, FTP et ARP", desc: "Services réseau, transfert de fichiers, table ARP", week: 2 },
  { id: 6, title: "Syslog & SNMP", desc: "Journalisation, monitoring réseau, traps SNMP", week: 2 },
];

export default function StudentStats({ onContinue, onShowAdmin, onShowLives }) {
  const { user, profile, signOut } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (user?.id) {
      supabase
        .from('student_progress')
        .select('*')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          setProgress(data);
          setLoadingProgress(false);
        });
    }
  }, [user?.id]);

  const stats = progress?.stats || {};
  const completedSessions = progress?.completed_sessions || [];

  const averageScore = useMemo(() => {
    if (!stats.quizAttempts || stats.quizAttempts.length === 0) return 0;
    return Math.round(stats.quizAttempts.reduce((acc, curr) => acc + (curr.score || 0), 0) / stats.quizAttempts.length);
  }, [stats.quizAttempts]);

  const commandAccuracy = stats.commandsExecuted > 0
    ? Math.round((stats.commandsCorrect || 0) / stats.commandsExecuted * 100)
    : 0;

  const isAdmin = profile?.role === 'admin' || profile?.role === 'prof';
  const nextSession = Math.min(completedSessions.length + 1, 6);
  const globalProgress = Math.round((completedSessions.length / 6) * 100);

  return (
    <div className="min-h-screen bg-[#0a051a] relative">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-2"
            >
              <div className="h-px w-8 bg-purple-500" />
              <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Dashboard Étudiant</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
              Bonjour, <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{profile?.full_name || 'Étudiant'}</span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              Voici un aperçu de votre progression sur NetAcademy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onShowLives}
              className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium rounded-xl hover:bg-white/10 transition-all"
            >
              <Video size={16} />
              Rediffusions
            </button>
            {isAdmin && (
              <button
                onClick={onShowAdmin}
                className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium rounded-xl hover:bg-white/10 transition-all"
              >
                <Settings size={16} />
                Admin
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-900/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Continuer les cours</span>
              <Play size={16} fill="currentColor" className="relative z-10" />
            </motion.button>
          </div>
        </div>

        {/* Loading state */}
        {loadingProgress ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="text-purple-400 animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {/* Total Time */}
              <GlassCard delay={0.1}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Clock className="text-purple-400" size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Temps Total</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-100">{formatTime(stats.totalTimeSpent)}</h3>
                <p className="text-xs text-slate-500 mt-1">Temps d'apprentissage actif</p>
              </GlassCard>

              {/* Sessions */}
              <GlassCard delay={0.2}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <CheckCircle2 className="text-blue-400" size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Sessions</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-slate-100">{completedSessions.length} / 6</h3>
                  <span className="text-xs text-blue-400 font-medium">Complété</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                        completedSessions.includes(i)
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    />
                  ))}
                </div>
              </GlassCard>

              {/* Quiz Score */}
              <GlassCard delay={0.3}>
                <div className="flex items-center gap-4 h-full">
                  <div className="relative flex-shrink-0 w-16 h-16">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/5" strokeWidth="3" />
                      <motion.circle
                        cx="18" cy="18" r="16" fill="none"
                        stroke="url(#purpleGradient)"
                        strokeWidth="3"
                        strokeDasharray="100"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 100 - averageScore }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-100">{averageScore}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Award size={14} className="text-amber-400" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Score Moyen</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-100">Performance</h3>
                    <p className="text-[10px] text-slate-500 leading-none mt-1">
                      Sur {stats.quizAttempts?.length || 0} quiz tentés
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Commands */}
              <GlassCard delay={0.4}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <Terminal className="text-emerald-400" size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Simulateur</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-slate-100">{(stats.commandsExecuted || 0).toLocaleString()}</h3>
                  <span className="text-[10px] text-emerald-400 font-mono">CMD EXEC</span>
                </div>
                <div className="flex items-center justify-between text-[10px] mt-1">
                  <span className="text-slate-500">Précision de syntaxe</span>
                  <span className="text-slate-300 font-mono">{commandAccuracy}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${commandAccuracy}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-emerald-500/50"
                  />
                </div>
              </GlassCard>
            </div>

            {/* Progression globale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10 p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <TrendingUp className="text-purple-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">Progression Globale</h3>
                    <p className="text-[10px] text-slate-500">Formation Réseaux Cisco — NetAcademy</p>
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{globalProgress}%</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${globalProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] rounded-full"
                />
              </div>
            </motion.div>

            {/* Parcours - Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-purple-500" />
                <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Parcours de Formation</span>
              </div>

              {/* Semaine 1 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={14} className="text-purple-400" />
                  <span className="text-sm font-bold text-slate-200">Semaine 1 — Administration Cisco & VLAN</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sessions.filter(s => s.week === 1).map((session, i) => {
                    const isCompleted = completedSessions.includes(session.id);
                    const isCurrent = session.id === nextSession;
                    return (
                      <motion.button
                        key={session.id}
                        onClick={onContinue}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className={`relative text-left p-4 rounded-xl border transition-all group ${
                          isCompleted
                            ? 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50'
                            : isCurrent
                            ? 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-[10px] font-mono text-slate-500">SESSION {session.id}</span>
                          {isCompleted ? (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
                              <CheckCircle2 size={12} className="text-emerald-400" />
                              <span className="text-[9px] font-bold text-emerald-400 uppercase">Validé</span>
                            </div>
                          ) : isCurrent ? (
                            <Play size={14} className="text-blue-400" />
                          ) : (
                            <Lock size={14} className="text-slate-600" />
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-100 mb-1">{session.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{session.desc}</p>
                        {isCompleted && (
                          <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                            <Award size={12} />
                            <span>Validation réussie</span>
                          </div>
                        )}
                        {isCurrent && (
                          <div className="mt-3 flex items-center gap-1 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                            <span>Reprendre</span>
                            <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Semaine 2 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} className="text-blue-400" />
                  <span className="text-sm font-bold text-slate-200">Semaine 2 — Protocoles & Services Réseau</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sessions.filter(s => s.week === 2).map((session, i) => {
                    const isCompleted = completedSessions.includes(session.id);
                    const isCurrent = session.id === nextSession;
                    return (
                      <motion.button
                        key={session.id}
                        onClick={onContinue}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 + i * 0.1 }}
                        className={`relative text-left p-4 rounded-xl border transition-all group ${
                          isCompleted
                            ? 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50'
                            : isCurrent
                            ? 'bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-[10px] font-mono text-slate-500">SESSION {session.id}</span>
                          {isCompleted ? (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
                              <CheckCircle2 size={12} className="text-emerald-400" />
                              <span className="text-[9px] font-bold text-emerald-400 uppercase">Validé</span>
                            </div>
                          ) : isCurrent ? (
                            <Play size={14} className="text-blue-400" />
                          ) : (
                            <Lock size={14} className="text-slate-600" />
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-100 mb-1">{session.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{session.desc}</p>
                        {isCompleted && (
                          <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                            <Award size={12} />
                            <span>Validation réussie</span>
                          </div>
                        )}
                        {isCurrent && (
                          <div className="mt-3 flex items-center gap-1 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                            <span>Reprendre</span>
                            <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Quick Tips / Objectifs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
            >
              <div className="p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} className="text-amber-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Objectif Actuel</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Compléter la <span className="text-slate-200 font-medium">Session {nextSession}</span> et valider le quiz de fin de module.
                </p>
              </div>
              <div className="p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={16} className="text-emerald-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Astuce CLI</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Utilisez <span className="text-emerald-400 font-mono text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded">show running-config</span> pour vérifier la configuration active de votre équipement.
                </p>
              </div>
              <div className="p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={16} className="text-blue-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Rappel</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Les labs pratiques sont essentiels. Chaque commande exécutée dans le simulateur compte dans votre score de précision.
                </p>
              </div>
            </motion.div>
          </>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs text-slate-400">Statut: <span className="text-slate-200 font-medium">En progression</span></span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Zap size={14} className="text-blue-400" />
              <span className="text-xs text-slate-400">Prochain objectif: <span className="text-slate-200 font-medium">Session {nextSession}</span></span>
            </div>
          </div>

          <button
            onClick={signOut}
            className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
          >
            <LogOut size={12} />
            Déconnexion
          </button>
        </motion.div>
      </div>
    </div>
  );
}
