import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Clock, BookOpen, Search, ChevronDown, ChevronUp, Copy, Check, Loader2, Link as LinkIcon, Plus, Calendar, X, ToggleLeft, ToggleRight, GraduationCap } from 'lucide-react';
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

function formatPromoDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export default function AdminDashboard({ onBack }) {
  const { profile } = useAuth();
  const [students, setStudents] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [expandedPromos, setExpandedPromos] = useState({});

  // Create promo state
  const [showCreatePromo, setShowCreatePromo] = useState(false);
  const [promoName, setPromoName] = useState('');
  const [promoDate, setPromoDate] = useState('');
  const [promoCreating, setPromoCreating] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Copy link state
  const [copiedPromoId, setCopiedPromoId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [profilesRes, progressRes, promosRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('student_progress').select('*'),
      supabase.from('promos').select('*').order('date', { ascending: false }),
    ]);

    const profiles = profilesRes.data || [];
    const progress = progressRes.data || [];
    const promosData = promosRes.data || [];

    const merged = profiles.map(p => ({
      ...p,
      progress: progress.find(pr => pr.user_id === p.id) || null
    }));

    setStudents(merged);
    setPromos(promosData);

    // Auto-expand all promos
    const expanded = {};
    promosData.forEach(p => { expanded[p.id] = true; });
    expanded['other'] = true;
    setExpandedPromos(expanded);

    setLoading(false);
  }

  async function handleCreatePromo(e) {
    e.preventDefault();
    setPromoError('');
    if (!promoName.trim() || !promoDate) {
      setPromoError('Nom et date requis');
      return;
    }
    setPromoCreating(true);
    const { error } = await supabase.from('promos').insert({
      name: promoName.trim(),
      date: promoDate,
      created_by: profile?.id,
    });
    if (error) {
      setPromoError(error.message);
    } else {
      setPromoName('');
      setPromoDate('');
      setShowCreatePromo(false);
      await loadData();
    }
    setPromoCreating(false);
  }

  async function togglePromoActive(promoId, currentActive) {
    await supabase.from('promos').update({ is_active: !currentActive }).eq('id', promoId);
    await loadData();
  }

  function copyPromoLink(promo) {
    const link = `${window.location.origin}?promo=${promo.token}`;
    navigator.clipboard.writeText(link);
    setCopiedPromoId(promo.id);
    setTimeout(() => setCopiedPromoId(null), 2000);
  }

  function togglePromoExpand(promoId) {
    setExpandedPromos(prev => ({ ...prev, [promoId]: !prev[promoId] }));
  }

  const allStudents = students.filter(s => s.role === 'student');
  const filtered = allStudents.filter(s =>
    s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Group students by promo
  const studentsByPromo = {};
  promos.forEach(p => { studentsByPromo[p.id] = []; });
  studentsByPromo['other'] = [];
  filtered.forEach(s => {
    if (s.promo_id && studentsByPromo[s.promo_id]) {
      studentsByPromo[s.promo_id].push(s);
    } else {
      studentsByPromo['other'].push(s);
    }
  });

  const totalStudents = allStudents.length;
  const activeStudents = allStudents.filter(s => s.progress?.stats?.totalTimeSpent > 0).length;

  if (profile?.role !== 'admin' && profile?.role !== 'prof') {
    return (
      <div className="min-h-screen bg-[#0f0a1e] flex items-center justify-center">
        <p className="text-red-400">Accès refusé</p>
      </div>
    );
  }

  const StudentRow = ({ student }) => {
    const stats = student.progress?.stats || {};
    const completed = student.progress?.completed_sessions || [];
    const isExpanded = expandedId === student.id;

    return (
      <motion.div layout className={`transition-colors ${isExpanded ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}>
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
  };

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
            { label: "Promos actives", value: promos.filter(p => p.is_active).length, icon: GraduationCap, color: "text-emerald-400" },
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

        {/* Promos management section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30">
                <GraduationCap size={16} className="text-purple-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Gestion des Promos</h2>
                <p className="text-slate-500 text-xs">Créez un lien d'invitation par promo</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreatePromo(!showCreatePromo)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-900/30 flex items-center gap-2"
            >
              {showCreatePromo ? <X size={14} /> : <Plus size={14} />}
              {showCreatePromo ? 'Annuler' : 'Nouvelle Promo'}
            </button>
          </div>

          {/* Create promo form */}
          <AnimatePresence>
            {showCreatePromo && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleCreatePromo}
                className="overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-3 mb-4 p-4 rounded-xl bg-black/20 border border-white/5">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5 block">Nom de la promo</label>
                    <input
                      type="text"
                      placeholder="ex: Promo 24 Février 2026"
                      value={promoName}
                      onChange={e => setPromoName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                      required
                    />
                  </div>
                  <div className="sm:w-56">
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5"><Calendar size={10} /> Date de début</label>
                    <input
                      type="date"
                      value={promoDate}
                      onChange={e => setPromoDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm [color-scheme:dark]"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={promoCreating}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-sm hover:bg-emerald-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {promoCreating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                      Créer
                    </button>
                  </div>
                </div>
                {promoError && (
                  <p className="text-red-400 text-sm mb-3">{promoError}</p>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {/* Promos list */}
          {promos.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap size={24} className="text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">Aucune promo créée</p>
            </div>
          ) : (
            <div className="space-y-2">
              {promos.map(promo => {
                const studentCount = allStudents.filter(s => s.promo_id === promo.id).length;
                const isCopied = copiedPromoId === promo.id;
                return (
                  <div key={promo.id} className={`rounded-xl border p-4 transition-all ${promo.is_active ? 'border-white/10 bg-white/[0.02]' : 'border-white/5 bg-white/[0.01] opacity-60'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg ${promo.is_active ? 'bg-purple-500/15 text-purple-400' : 'bg-white/5 text-slate-500'}`}>
                          <GraduationCap size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-slate-200 truncate">{promo.name}</p>
                          <p className="text-slate-500 text-xs">{formatPromoDate(promo.date)} — {studentCount} étudiant{studentCount !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => copyPromoLink(promo)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${isCopied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-slate-200'}`}
                          title="Copier le lien d'inscription"
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          {isCopied ? 'Copié !' : 'Copier le lien'}
                        </button>
                        <button
                          onClick={() => togglePromoActive(promo.id, promo.is_active)}
                          className={`p-1.5 rounded-lg transition-all ${promo.is_active ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-slate-500 hover:bg-white/5'}`}
                          title={promo.is_active ? 'Désactiver la promo' : 'Réactiver la promo'}
                        >
                          {promo.is_active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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

        {/* Student list grouped by promo */}
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
          <div className="space-y-4">
            {/* Promos groups */}
            {promos.map(promo => {
              const promoStudents = studentsByPromo[promo.id] || [];
              if (promoStudents.length === 0 && search) return null;
              const isOpen = expandedPromos[promo.id];

              return (
                <div key={promo.id} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                  <button
                    onClick={() => togglePromoExpand(promo.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400">
                        <GraduationCap size={16} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white">{promo.name}</h3>
                        <p className="text-slate-500 text-xs">{formatPromoDate(promo.date)}</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-400 font-mono ml-2">{promoStudents.length}</span>
                    </div>
                    {isOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                  </button>

                  {isOpen && (
                    <>
                      {promoStudents.length === 0 ? (
                        <div className="px-6 pb-4">
                          <p className="text-slate-600 text-sm text-center py-4">Aucun étudiant dans cette promo</p>
                        </div>
                      ) : (
                        <>
                          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] text-slate-500 uppercase tracking-[0.15em] font-bold border-t border-b border-white/[0.06]">
                            <div className="col-span-4">Étudiant</div>
                            <div className="col-span-2">Temps total</div>
                            <div className="col-span-2 text-center">Sessions</div>
                            <div className="col-span-2">Quiz moyen</div>
                            <div className="col-span-2">Commandes</div>
                          </div>
                          <div className="divide-y divide-white/[0.06]">
                            {promoStudents.map(student => (
                              <StudentRow key={student.id} student={student} />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              );
            })}

            {/* "Autres" group for students without promo */}
            {studentsByPromo['other'].length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                <button
                  onClick={() => togglePromoExpand('other')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-slate-400">
                      <Users size={16} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">Autres</h3>
                      <p className="text-slate-500 text-xs">Étudiants sans promo assignée</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-400 font-mono ml-2">{studentsByPromo['other'].length}</span>
                  </div>
                  {expandedPromos['other'] ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                </button>

                {expandedPromos['other'] && (
                  <>
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] text-slate-500 uppercase tracking-[0.15em] font-bold border-t border-b border-white/[0.06]">
                      <div className="col-span-4">Étudiant</div>
                      <div className="col-span-2">Temps total</div>
                      <div className="col-span-2 text-center">Sessions</div>
                      <div className="col-span-2">Quiz moyen</div>
                      <div className="col-span-2">Commandes</div>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                      {studentsByPromo['other'].map(student => (
                        <StudentRow key={student.id} student={student} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
