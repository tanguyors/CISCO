import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Clock, Calendar, X, VideoOff, ChevronRight, Monitor } from 'lucide-react';
import { supabase } from './supabaseClient';

const LivesPage = ({ onBack }) => {
  const [lives, setLives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLive, setSelectedLive] = useState(null);

  useEffect(() => {
    fetchLives();
  }, []);

  const fetchLives = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('lives')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLives(data || []);
    } catch (error) {
      console.error('Error fetching replays:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#0a051a] text-slate-100 font-sans selection:bg-purple-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a051a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={onBack}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
                <Monitor size={12} />
                <span>NetAcademy</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Rediffusions</h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">{lives.length} session{lives.length !== 1 ? 's' : ''} disponible{lives.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[380px] rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : lives.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {lives.map((live) => (
              <motion.div
                key={live.id}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setSelectedLive(live)}
                className="group cursor-pointer bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-[#1a1035]">
                  {live.thumbnail_url ? (
                    <img
                      src={live.thumbnail_url}
                      alt={live.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                      <Play size={40} className="text-purple-500/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a051a] via-transparent to-transparent opacity-60" />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-purple-600/90 flex items-center justify-center text-white shadow-xl shadow-purple-900/40">
                      <Play size={28} fill="currentColor" />
                    </div>
                  </div>

                  {/* Session Badge */}
                  {live.session_number && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-purple-600/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
                        Session {live.session_number}
                      </span>
                    </div>
                  )}

                  {/* Duration Badge */}
                  {live.duration && (
                    <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white flex items-center gap-1.5">
                      <Clock size={12} />
                      {live.duration}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                    <Calendar size={14} />
                    {formatDate(live.created_at)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">
                    {live.title}
                  </h3>
                  {live.description && (
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {live.description}
                    </p>
                  )}

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-purple-400 transition-colors">
                      Regarder le replay
                    </span>
                    <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 group-hover:text-purple-400 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
            <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-600 mb-6">
              <VideoOff size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Aucun replay disponible</h2>
            <p className="text-slate-400 max-w-md">
              Les rediffusions de vos sessions live apparaitront ici.
            </p>
          </div>
        )}
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedLive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLive(null)}
              className="absolute inset-0 bg-[#0a051a]/95 backdrop-blur-xl"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-[#1a1035] rounded-3xl border border-white/10 shadow-2xl shadow-black overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <div>
                  {selectedLive.session_number && (
                    <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">
                      Replay Session {selectedLive.session_number}
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-white">{selectedLive.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedLive(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                  poster={selectedLive.thumbnail_url || undefined}
                >
                  <source src={selectedLive.video_url} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-[#0e0920]">
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-purple-400" />
                    <span>Enregistré le {formatDate(selectedLive.created_at)}</span>
                  </div>
                  {selectedLive.duration && (
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-purple-400" />
                      <span>Durée : {selectedLive.duration}</span>
                    </div>
                  )}
                </div>
                {selectedLive.description && (
                  <p className="mt-4 text-slate-300 leading-relaxed max-w-3xl">
                    {selectedLive.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LivesPage;
