import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, BookOpen, Globe, Search, ChevronDown, ChevronUp, Mail, User, Send, Copy, Check, Loader2, Link as LinkIcon } from 'lucide-react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';

function formatTime(seconds) {
  if (!seconds) return '0 min';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}min` : `${m} min`;
}

function avgQuizScore(attempts) {
  if (!attempts || attempts.length === 0) return '-';
  const avg = attempts.reduce((sum, a) => sum + (a.score || 0), 0) / attempts.length;
  return `${Math.round(avg)}%`;
}

export default function AdminDashboard({ onBack }) {
  const { profile } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Invite state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: progress } = await supabase
      .from('student_progress')
      .select('*');

    if (profiles && progress) {
      const merged = profiles.map(p => ({
        ...p,
        progress: progress.find(pr => pr.user_id === p.id) || null
      }));
      setStudents(merged);
    }
    setLoading(false);
  }

  async function handleInvite(e) {
    e.preventDefault();
    setInviteError('');
    setInviteLink('');
    setCopied(false);

    if (!inviteEmail.trim()) {
      setInviteError('Email requis');
      return;
    }

    setInviteLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('invite-user', {
        body: {
          email: inviteEmail.trim(),
          full_name: inviteName.trim(),
          redirectTo: window.location.origin
        }
      });

      if (error) {
        setInviteError(error.message || 'Erreur lors de l\'invitation');
      } else if (data?.error) {
        setInviteError(data.error);
      } else if (data?.link) {
        setInviteLink(data.link);
        setInviteEmail('');
        setInviteName('');
        loadStudents();
      }
    } catch (err) {
      setInviteError('Erreur réseau');
    }
    setInviteLoading(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const filtered = students.filter(s =>
    s.role === 'student' && (
      s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalStudents = students.filter(s => s.role === 'student').length;
  const activeStudents = students.filter(s => s.role === 'student' && s.progress?.stats?.totalTimeSpent > 0).length;

  if (profile?.role !== 'admin' && profile?.role !== 'prof') {
    return (
      <div className="min-h-screen bg-[#0f0a1e] flex items-center justify-center">
        <p className="text-red-400">Accès refusé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-slate-100 relative">
      {/* Background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[0%] right-[-5%] w-[30%] h-[30%] bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f0a1e]/60 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={onBack}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <ArrowLeft size={18} className="text-slate-300" />
          </button>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-400">
              Dashboard d'Administration
            </h1>
            <p className="text-slate-500 text-sm">NetAcademy — Suivi des étudiants</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Étudiants inscrits", value: totalStudents, icon: Users, color: "text-blue-400" },
            { label: "Étudiants actifs", value: activeStudents, icon: Clock, color: "text-purple-400" },
            { label: "Sessions disponibles", value: 6, icon: BookOpen, color: "text-emerald-400" },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${s.color}`}>
                    <s.icon size={20} />
                  </div>
                </div>
                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">{s.label}</p>
                <h3 className="text-3xl font-bold tracking-tight text-white">{s.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Invite section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30">
              <Send size={16} className="text-purple-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Inviter un étudiant</h2>
              <p className="text-slate-500 text-xs">Générez un lien d'invitation à envoyer</p>
            </div>
          </div>

          <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="Email de l'étudiant"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm"
                required
              />
            </div>
            <div className="relative flex-1">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Nom complet (optionnel)"
                value={inviteName}
                onChange={e => setInviteName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={inviteLoading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30 flex items-center gap-2 shrink-0"
            >
              {inviteLoading ? <Loader2 size={14} className="animate-spin" /> : <LinkIcon size={14} />}
              {inviteLoading ? 'Génération...' : 'Générer le lien'}
            </button>
          </form>

          {inviteError && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <p className="text-red-400 text-sm">{inviteError}</p>
            </motion.div>
          )}

          {inviteLink && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-emerald-400 text-xs font-semibold mb-2">Lien d'invitation généré :</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-slate-300 text-xs font-mono"
                />
                <button
                  onClick={copyLink}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copié !' : 'Copier'}
                </button>
              </div>
              <p className="text-slate-600 text-xs mt-2">Envoyez ce lien à l'étudiant. Il pourra définir son mot de passe lors de sa première connexion.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
          />
        </div>

        {/* Student list */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 size={24} className="text-purple-400 animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Chargement des étudiants...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <Users size={32} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">{search ? 'Aucun résultat' : 'Aucun étudiant inscrit'}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            {/* Table header */}
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="text-lg font-semibold flex items-center gap-3">
                Suivi des Étudiants
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-400 font-mono">{filtered.length}</span>
              </h2>
            </div>

            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] text-slate-500 uppercase tracking-[0.15em] font-bold border-b border-white/[0.06]">
              <div className="col-span-4">Étudiant</div>
              <div className="col-span-2">Temps total</div>
              <div className="col-span-2 text-center">Sessions</div>
              <div className="col-span-2">Quiz moyen</div>
              <div className="col-span-2">Commandes</div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {filtered.map(student => {
                const stats = student.progress?.stats || {};
                const completed = student.progress?.completed_sessions || [];
                const isExpanded = expandedId === student.id;

                return (
                  <motion.div key={student.id} layout
                    className={`transition-colors ${isExpanded ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : student.id)}
                      className="w-full grid grid-cols-12 gap-4 px-6 py-4 items-center text-left"
                    >
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold shrink-0 shadow-lg shadow-purple-500/20">
                          {student.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-200 truncate">{student.full_name || 'Sans nom'}</p>
                          <p className="text-slate-500 text-xs truncate">{student.email}</p>
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-slate-300">{formatTime(stats.totalTimeSpent)}</div>
                      <div className="col-span-2 flex flex-col items-center gap-1">
                        <div className="flex gap-1">
                          {[1,2,3,4,5,6].map(s => (
                            <div key={s} className={`w-1.5 h-1.5 rounded-full transition-all ${completed.includes(s) ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'bg-white/10'}`} />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500">{completed.length}/6</span>
                      </div>
                      <div className="col-span-2 text-sm text-slate-300 font-mono">{avgQuizScore(stats.quizAttempts)}</div>
                      <div className="col-span-2 flex items-center justify-between">
                        <span className="text-sm text-slate-300">{stats.commandsExecuted || 0}</span>
                        {isExpanded
                          ? <ChevronUp size={14} className="text-slate-500" />
                          : <ChevronDown size={14} className="text-slate-500" />
                        }
                      </div>
                    </button>

                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        className="px-6 pb-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { label: "Commandes correctes", value: `${stats.commandsCorrect || 0} / ${stats.commandsExecuted || 0}` },
                            { label: "Quiz tentés", value: stats.quizAttempts?.length || 0 },
                            { label: "Labs tentés", value: stats.labAttempts?.length || 0 },
                            { label: "Inscrit le", value: new Date(student.created_at).toLocaleDateString('fr-FR') },
                          ].map((d, i) => (
                            <div key={i} className="p-3 rounded-xl bg-black/20 border border-white/5">
                              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1">{d.label}</p>
                              <p className="font-medium text-sm text-slate-200">{d.value}</p>
                            </div>
                          ))}
                        </div>
                        {completed.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/[0.06]">
                            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-2">Sessions complétées</p>
                            <div className="flex gap-2">
                              {[1,2,3,4,5,6].map(s => (
                                <div key={s} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${completed.includes(s) ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'bg-white/5 text-slate-600 border border-white/10'}`}>
                                  {s}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
