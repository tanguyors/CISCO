import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Users, Terminal, Award, CheckCircle, Zap, Globe, Layers, Shield, Cpu, Network, ChevronRight, ShieldCheck, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RECRUITERS_DATA = [
  { abbr: 'GO', label: 'Google',     sector: 'Cloud & IA',     color: '#4285f4', domain: 'google.com' },
  { abbr: 'AW', label: 'Amazon AWS', sector: 'Cloud',          color: '#ff9900', domain: 'aws.amazon.com' },
  { abbr: 'MS', label: 'Microsoft',  sector: 'Azure & IA',     color: '#50e6ff', domain: 'microsoft.com' },
  { abbr: 'ME', label: 'Meta',       sector: 'Data Center',    color: '#0866ff', domain: 'meta.com' },
  { abbr: 'IB', label: 'IBM',        sector: 'Infrastructure', color: '#1f70c1', domain: 'ibm.com' },
  { abbr: 'OR', label: 'Oracle',     sector: 'Cloud & DB',     color: '#f80000', domain: 'oracle.com' },
  { abbr: 'CI', label: 'Cisco',      sector: 'Networking',     color: '#1ba0d7', domain: 'cisco.com' },
  { abbr: 'NO', label: 'Nokia',      sector: 'Télécoms',       color: '#124191', domain: 'nokia.com' },
  { abbr: 'OG', label: 'Orange',     sector: 'Télécoms FR',    color: '#ff8533', domain: 'orange.fr' },
  { abbr: 'OV', label: 'OVHcloud',   sector: 'Cloud FR',       color: '#123f6d', domain: 'ovhcloud.com' },
  { abbr: 'AC', label: 'Accenture',  sector: 'Conseil IT',     color: '#a100ff', domain: 'accenture.com' },
  { abbr: 'CA', label: 'Capgemini',  sector: 'Conseil IT',     color: '#0070ad', domain: 'capgemini.com' },
];

const JOB_PROFILES = [
  { title: 'Ingénieur Réseau',    range: '35–65K€', growth: '+18%/an', color: '#a855f7' },
  { title: 'Admin Sys & Réseau',  range: '32–55K€', growth: '+14%/an', color: '#3b82f6' },
  { title: 'Consultant Infra IT', range: '45–80K€', growth: '+22%/an', color: '#10b981' },
  { title: 'Technicien Télécom',  range: '28–45K€', growth: '+11%/an', color: '#f59e0b' },
];

/* ─── BADGE ─────────────────────────────────────────────────────────────── */
const VibeBadge = ({ n }) => (
  <div className="absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-purple-600/80 backdrop-blur text-white text-xs font-bold tracking-widest border border-purple-400/40">
    VIBE {n}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   VIBE 1 — Network Topology
═══════════════════════════════════════════════════════════════════════════ */
function Vibe1() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.v1-vous-glow', { scale: 1.3, opacity: 0.5, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
      tl.fromTo('.v1-line', { strokeDashoffset: 600, strokeDasharray: 600 }, { strokeDashoffset: 0, duration: 1.5, stagger: 0.05, ease: 'power2.out' });
      tl.fromTo('.v1-node', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.7)' }, '-=1');
      tl.fromTo('.v1-job', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.3');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0a051a] flex flex-col items-center justify-center py-20 overflow-hidden">
      <VibeBadge n="1 — Network Topology" />
      <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-purple-600/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl px-8 text-center mb-12">
        <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Débouchés</p>
        <h2 className="text-4xl font-black text-white mb-2">Ils recrutent.</h2>
        <p className="text-slate-500 text-sm">Les plus grandes entreprises tech du monde cherchent des profils réseau certifiés Cisco.</p>
      </div>

      {/* SVG Network */}
      <div className="relative w-full max-w-[780px] h-[420px] mx-auto mb-16">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 780 420">
          <defs>
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {RECRUITERS_DATA.map((_, i) => {
            const angle = (i / RECRUITERS_DATA.length) * Math.PI * 2 - Math.PI / 2;
            const x2 = 390 + Math.cos(angle) * 310;
            const y2 = 210 + Math.sin(angle) * 165;
            return <line key={i} className="v1-line" x1="390" y1="210" x2={x2} y2={y2} stroke="url(#lg1)" strokeWidth="1.5" strokeDasharray="600" strokeDashoffset="600" />;
          })}
        </svg>

        {/* Central node */}
        <div className="absolute z-20 flex items-center justify-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
          <div className="v1-vous-glow absolute w-28 h-28 bg-purple-500/25 rounded-full blur-xl" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/40 border-2 border-white/20">
            <span className="text-white font-black text-sm tracking-tight">VOUS</span>
          </div>
        </div>

        {/* Recruiter nodes */}
        {RECRUITERS_DATA.map((r, i) => {
          const angle = (i / RECRUITERS_DATA.length) * Math.PI * 2 - Math.PI / 2;
          const x = 390 + Math.cos(angle) * 310;
          const y = 210 + Math.sin(angle) * 165;
          return (
            <div key={r.label} className="v1-node absolute -translate-x-1/2 -translate-y-1/2 bg-[#1a1035] border border-white/10 px-3 py-1.5 rounded-full backdrop-blur flex items-center gap-1.5"
              style={{ left: `${(x / 780) * 100}%`, top: `${(y / 420) * 100}%` }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: r.color }} />
              <span className="text-slate-200 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">{r.label}</span>
            </div>
          );
        })}
      </div>

      {/* Job cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl px-8">
        {JOB_PROFILES.map((j, i) => (
          <div key={i} className="v1-job p-5 bg-white/[0.03] backdrop-blur border border-white/10 rounded-2xl hover:border-purple-500/40 transition-all">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: j.color }}>Opportunité</p>
            <p className="text-slate-100 font-bold text-sm mb-3 leading-tight">{j.title}</p>
            <p className="text-slate-200 font-mono font-semibold text-sm">{j.range}</p>
            <p className="text-emerald-400 font-mono text-xs font-bold">{j.growth}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VIBE 2 — Spotlight Reveal
═══════════════════════════════════════════════════════════════════════════ */
function Vibe2() {
  const ref = useRef(null);
  const spotRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.v2-card');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 55%', end: 'bottom 70%', scrub: 1.5 },
      });

      tl.to(spotRef.current, { opacity: 1, duration: 0.2 });
      cards.forEach((card, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        tl.to(spotRef.current, { left: `${15 + col * 22}%`, top: `${25 + row * 28}%`, duration: 0.12 }, i * 0.06);
        tl.to(card, { filter: 'grayscale(0)', opacity: 1, borderColor: 'rgba(168,85,247,0.5)', duration: 0.4, overwrite: 'auto' }, i * 0.06);
      });
      tl.to(spotRef.current, { opacity: 0, duration: 0.3 });

      gsap.fromTo('.v2-job', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.v2-jobs', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0a051a] flex flex-col items-center justify-center py-20 overflow-hidden">
      <VibeBadge n="2 — Spotlight Reveal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(88,28,135,0.06),transparent)]" />

      {/* Spotlight */}
      <div ref={spotRef} className="absolute w-[350px] h-[350px] rounded-full pointer-events-none opacity-0 z-0"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)', transform: 'translate(-50%,-50%)', left: '15%', top: '25%' }} />

      <div className="relative z-10 w-full max-w-5xl px-8 text-center mb-10">
        <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Débouchés</p>
        <h2 className="text-4xl font-black text-white mb-2">Ils recrutent.</h2>
        <p className="text-slate-500 text-sm">Les plus grandes entreprises tech du monde cherchent des profils réseau certifiés Cisco.</p>
      </div>

      <div className="relative z-10 grid grid-cols-4 md:grid-cols-6 gap-3 w-full max-w-5xl px-8 mb-8">
        {RECRUITERS_DATA.map((r, i) => (
          <div key={i} className="v2-card flex flex-col items-center gap-2 p-4 rounded-2xl border bg-white/[0.02] transition-all duration-500"
            style={{ borderColor: 'rgba(255,255,255,0.07)', filter: 'grayscale(1)', opacity: 0.12 }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${r.color}22`, border: `1px solid ${r.color}50` }}>
              <span className="text-white font-black text-[11px]">{r.abbr}</span>
            </div>
            <div className="text-white text-[10px] font-bold text-center leading-tight">{r.label}</div>
            <div className="text-[9px] text-center" style={{ color: `${r.color}70` }}>{r.sector}</div>
          </div>
        ))}
      </div>

      <div className="v2-jobs relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-5xl px-8">
        {JOB_PROFILES.map((j, i) => (
          <div key={i} className="v2-job flex items-center gap-3 p-4 rounded-xl border bg-white/[0.02]" style={{ borderColor: `${j.color}25` }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${j.color}15`, border: `1px solid ${j.color}30` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: j.color }} />
            </div>
            <div>
              <div className="text-white text-[11px] font-bold leading-tight">{j.title}</div>
              <div className="text-[10px] mt-0.5" style={{ color: j.color }}>{j.range}</div>
              <div className="text-slate-600 text-[9px]">{j.growth}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VIBE 3 — Cinematic Split
═══════════════════════════════════════════════════════════════════════════ */
function Vibe3() {
  const ref = useRef(null);
  const row1 = useRef(null);
  const row2 = useRef(null);
  const row3 = useRef(null);
  const statRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      [row1, row2, row3].forEach((r, i) => {
        const dir = i % 2 === 0 ? -250 : 250;
        gsap.fromTo(r.current, { x: dir, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: r.current, start: 'top 88%', scrub: 0.8 },
        });
      });

      const obj = { val: 0 };
      gsap.to(obj, {
        val: 2400, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: statRef.current, start: 'top 85%' },
        onUpdate: () => { if (statRef.current) statRef.current.textContent = `+${Math.floor(obj.val).toLocaleString()} offres réseau/mois`; },
      });

      gsap.fromTo('.v3-job', { scale: 0.85, opacity: 0, y: 30 }, {
        scale: 1, opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.v3-jobs', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const LogoCard = ({ r }) => (
    <div className="h-20 w-64 flex-shrink-0 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center gap-3 px-6 hover:border-purple-500/50 hover:bg-white/[0.06] transition-all group">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${r.color}25`, border: `1px solid ${r.color}40` }}>
        <span className="text-white font-black text-xs">{r.abbr}</span>
      </div>
      <span className="text-xl font-black text-slate-100 tracking-tighter group-hover:text-purple-300 transition-colors uppercase">{r.label}</span>
    </div>
  );

  const rows = [RECRUITERS_DATA.slice(0, 4), RECRUITERS_DATA.slice(4, 8), RECRUITERS_DATA.slice(8, 12)];
  const rowRefs = [row1, row2, row3];

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0a051a] flex flex-col items-center justify-center py-20 overflow-hidden">
      <VibeBadge n="3 — Cinematic Split" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/8 blur-[140px] rounded-full pointer-events-none" />

      {/* Watermark */}
      <h2 className="absolute top-8 left-0 right-0 text-[9rem] font-black text-white/[0.03] whitespace-nowrap text-center pointer-events-none select-none tracking-tighter">ILS RECRUTENT</h2>

      <div className="relative z-10 w-full max-w-7xl px-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Écosystème Partenaire</p>
          <h3 className="text-5xl font-black text-white tracking-tight">Propulsez votre carrière.</h3>
        </div>
        <p ref={statRef} className="text-3xl font-bold text-purple-300 tabular-nums italic">+0 offres réseau/mois</p>
      </div>

      <div className="relative z-10 w-full space-y-4 mb-16 overflow-hidden">
        {rows.map((row, ri) => (
          <div key={ri} ref={rowRefs[ri]} className="flex gap-4 justify-center">
            {row.map(r => <LogoCard key={r.label} r={r} />)}
          </div>
        ))}
      </div>

      <div className="v3-jobs relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl px-8">
        {JOB_PROFILES.map((j, i) => (
          <div key={i} className="v3-job p-6 rounded-2xl bg-[#1a1035] border border-white/10 hover:border-purple-500/40 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 blur-2xl opacity-0 group-hover:opacity-100 transition-all" style={{ background: j.color + '22' }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 font-bold text-white" style={{ background: j.color + '22', border: `1px solid ${j.color}40` }}>
              {i + 1}
            </div>
            <p className="text-white font-bold text-sm mb-2 leading-tight">{j.title}</p>
            <p className="font-mono font-semibold text-sm" style={{ color: j.color }}>{j.range}</p>
            <p className="text-emerald-400 font-mono text-xs font-bold">{j.growth}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VIBE 4 — Terminal Reveal
═══════════════════════════════════════════════════════════════════════════ */
function Vibe4() {
  const ref = useRef(null);
  const cmdRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressPctRef = useRef(null);
  const summaryRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 55%', end: 'bottom 20%', toggleActions: 'play none none none' },
      });

      // Typing effect via text content
      const cmd = '$ scan --target job-market --sector networking';
      let idx = 0;
      tl.call(() => { cmdRef.current.textContent = ''; });
      tl.to({}, {
        duration: 1.5,
        onUpdate() { const n = Math.floor(this.progress() * cmd.length); if (n !== idx) { idx = n; if (cmdRef.current) cmdRef.current.textContent = cmd.slice(0, n) + '▊'; } },
        onComplete() { if (cmdRef.current) cmdRef.current.textContent = cmd; },
      });

      tl.fromTo('.v4-line', { opacity: 0, y: 6 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.25, ease: 'power2.out' });
      tl.to(progressBarRef.current, { width: '100%', duration: 1.1, ease: 'power1.inOut' }, '-=0.9');
      tl.to({}, {
        duration: 1.1,
        onUpdate() { const p = Math.floor(this.progress() * 100); if (progressPctRef.current) progressPctRef.current.textContent = `${p}%`; },
      }, '-=1.1');

      tl.fromTo(summaryRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' });
      tl.fromTo('.v4-job', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.1');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0a051a] flex flex-col items-center justify-center py-20 overflow-hidden font-mono">
      <VibeBadge n="4 — Terminal Reveal" />

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
        style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 4px)' }} />

      <div className="relative z-20 w-full max-w-4xl px-8">
        {/* Window chrome */}
        <div className="bg-[#0d0a1f] border border-white/10 rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-purple-900/20">
          <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            <span className="text-slate-500 text-xs ml-4 tracking-widest uppercase">net_scanner v2.4 — NetMasterClass</span>
          </div>
          <div className="p-6 space-y-4">
            {/* Command */}
            <p ref={cmdRef} className="text-emerald-400 text-sm min-h-[1.4em]" />

            {/* Company lines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 pt-2">
              {RECRUITERS_DATA.map((r, i) => (
                <div key={i} className="v4-line flex items-center gap-2 text-xs border-l-2 pl-3 py-0.5" style={{ borderColor: r.color + '60' }}>
                  <span className="text-purple-400 font-bold">&gt;</span>
                  <span className="text-slate-400 uppercase tracking-widest text-[10px]">CONNECTING TO</span>
                  <span className="text-slate-100">{r.domain}...</span>
                  <span className="ml-auto text-emerald-400 font-bold text-[10px]">[OK]</span>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="pt-3">
              <div className="flex justify-between mb-1.5">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Scanning job-market packets</span>
                <span ref={progressPctRef} className="text-emerald-400 font-bold text-xs">0%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div ref={progressBarRef} className="h-full w-0 rounded-full bg-gradient-to-r from-purple-600 to-emerald-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div ref={summaryRef} className="opacity-0 text-center mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 border border-emerald-500/30 bg-emerald-500/8 rounded-lg">
            <span className="text-emerald-400 font-bold tracking-widest text-sm">✓ SCAN COMPLETE — 2,400+ OFFRES TROUVÉES</span>
          </div>
        </div>

        {/* Job profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JOB_PROFILES.map((j, i) => (
            <div key={i} className="v4-job p-5 bg-[#0d0a1f]/80 border border-white/10 hover:border-purple-500/40 rounded-xl transition-all group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: `linear-gradient(135deg, ${j.color}33, transparent)` }} />
              <div className="relative">
                <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-2">Target Profile</p>
                <p className="text-white font-bold mb-3">{j.title}</p>
                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                  <span className="text-emerald-400 font-bold text-sm">SALARY_EST: {j.range}</span>
                  <span className="text-emerald-400 font-bold text-xs">{j.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VIBE 5 — 3D Card Flip
═══════════════════════════════════════════════════════════════════════════ */
const JOB_COUNTS = ['120+ offres', '340+ offres', '210+ offres', '95+ offres', '180+ offres', '75+ offres', '290+ offres', '140+ offres', '220+ offres', '60+ offres', '400+ offres', '380+ offres'];
const SALARY_RANGES = ['45-90K€','38-75K€','40-80K€','42-85K€','50-95K€','35-70K€','45-90K€','38-72K€','32-65K€','36-68K€','48-92K€','44-88K€'];

function Vibe5() {
  const ref = useRef(null);
  const flippedRef = useRef(new Array(12).fill(false));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      RECRUITERS_DATA.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.v5-card-${i}`,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(`.v5-inner-${i}`, { rotateY: 180, duration: 0.7, ease: 'back.out(1.2)', delay: (i % 4) * 0.08 });
          },
          onLeaveBack: () => {
            gsap.to(`.v5-inner-${i}`, { rotateY: 0, duration: 0.5, ease: 'power2.inOut' });
          },
        });
      });

      gsap.fromTo('.v5-job', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.v5-jobs', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0a051a] flex flex-col items-center justify-center py-20 overflow-hidden">
      <VibeBadge n="5 — 3D Card Flip" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/8 blur-[140px] rounded-full pointer-events-none" />

      <style>{`.v5-backface { backface-visibility: hidden; -webkit-backface-visibility: hidden; }`}</style>

      <div className="relative z-10 w-full max-w-5xl px-8 text-center mb-12">
        <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-3">Débouchés</p>
        <h2 className="text-4xl font-black text-white italic mb-3">"Votre prochain employeur vous cherche déjà."</h2>
        <div className="h-0.5 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
      </div>

      <div className="relative z-10 grid grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-5xl px-8 mb-10">
        {RECRUITERS_DATA.map((r, i) => (
          <div key={i} className={`v5-card-${i} h-36`} style={{ perspective: '1000px' }}>
            <div className={`v5-inner-${i} relative w-full h-full`} style={{ transformStyle: 'preserve-3d', transition: 'transform 0.7s' }}>
              {/* Front */}
              <div className="v5-backface absolute inset-0 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 p-4 shadow-lg"
                style={{ boxShadow: `0 4px 20px ${r.color}10` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: r.color + '25', border: `1px solid ${r.color}50` }}>
                  <span className="text-white font-black text-xs">{r.abbr}</span>
                </div>
                <p className="text-white font-bold text-sm text-center leading-tight">{r.label}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: r.color + 'aa' }}>{r.sector}</p>
              </div>
              {/* Back */}
              <div className="v5-backface absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2 p-4 text-center"
                style={{ transform: 'rotateY(180deg)', background: '#1a1035', border: `1px solid ${r.color}40` }}>
                <p className="text-[10px] uppercase tracking-widest font-bold text-purple-400">Opportunités</p>
                <p className="text-white font-bold text-sm">{JOB_COUNTS[i]}</p>
                <p className="text-slate-300 text-xs">{SALARY_RANGES[i]}</p>
                <button className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full bg-purple-600/80 hover:bg-purple-500 transition-colors">
                  Voir →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="v5-jobs relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-5xl px-8">
        {JOB_PROFILES.map((j, i) => (
          <div key={i} className="v5-job p-[1px] rounded-2xl" style={{ background: `linear-gradient(135deg, ${j.color}60, transparent)` }}>
            <div className="bg-[#1a1035] rounded-[calc(1rem-1px)] p-4 h-full flex items-center justify-between group cursor-default">
              <div>
                <p className="text-slate-100 font-bold text-xs leading-tight mb-1">{j.title}</p>
                <p className="font-mono text-xs font-semibold" style={{ color: j.color }}>{j.range}</p>
              </div>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: j.color + '20' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: j.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   JOB STATS DATA
═══════════════════════════════════════════════════════════════════════════ */
const JOB_STATS = [
  { val: 47,  suffix: '%',   label: 'hausse des offres réseau',     desc: "liées à l'IA & data centers en 2 ans",       color: '#a855f7' },
  { val: 3.5, suffix: 'M',   label: 'postes non pourvus',           desc: 'en cybersécurité dans le monde (ISC² 2024)',  color: '#3b82f6' },
  { val: 52,  suffix: 'K€',  label: 'salaire moyen débutant',       desc: 'ingénieur réseau en France (APEC 2024)',      color: '#10b981' },
  { val: 8,   suffix: '/10', label: 'entreprises du CAC 40',        desc: 'recrutent activement en réseau & sécurité',   color: '#f59e0b' },
  { val: 400, suffix: 'K+',  label: 'data centers supplémentaires', desc: "prévus d'ici 2027 pour répondre à l'IA",     color: '#ec4899' },
  { val: 3,   suffix: 'e',   label: 'métier tech le + recherché',   desc: 'Réseau & infra en France, classement 2024',   color: '#6366f1' },
];

const GAUGE_FILL = [0.47, 0.75, 0.65, 0.80, 0.85, 0.40];

const JobVibeBadge = ({ n }) => (
  <div className="absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-emerald-600/80 backdrop-blur text-white text-xs font-bold tracking-widest border border-emerald-400/40">
    JOB VIBE {n}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   JOB VIBE 1 — Network Monitor Dashboard
═══════════════════════════════════════════════════════════════════════════ */
function JobVibe1() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const circ = 2 * Math.PI * 38;

      gsap.fromTo('.jv1-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 65%' } }
      );

      JOB_STATS.forEach((stat, i) => {
        const targetOffset = circ * (1 - GAUGE_FILL[i]);
        gsap.fromTo(`.jv1-gauge-${i}`,
          { strokeDashoffset: circ },
          { strokeDashoffset: targetOffset, duration: 1.5, ease: 'power2.out', delay: i * 0.12,
            scrollTrigger: { trigger: `.jv1-card-${i}`, start: 'top 85%' } }
        );
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.val, duration: 1.5, ease: 'power2.out', delay: i * 0.12,
          scrollTrigger: { trigger: `.jv1-card-${i}`, start: 'top 85%' },
          onUpdate() {
            const el = document.querySelector(`.jv1-num-${i}`);
            if (el) el.textContent = stat.val % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val);
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0a051a] flex flex-col items-center justify-center py-20 overflow-hidden">
      <JobVibeBadge n="1 — Network Monitor" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.12) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a051a] via-transparent to-[#0a051a] pointer-events-none" />

      <div className="absolute top-16 right-8 flex items-center gap-2 z-10">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        <span className="text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase">Live Market Data</span>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-8 text-center mb-12">
        <p className="text-emerald-400 text-xs tracking-[0.5em] uppercase font-mono mb-2">// market_analysis.sh</p>
        <h2 className="text-4xl font-black text-white mb-2">Pourquoi se former maintenant.</h2>
        <p className="text-slate-500 text-sm">Les chiffres du marché de l'emploi réseau en 2024.</p>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-5xl px-8">
        {JOB_STATS.map((stat, i) => {
          const circ = 2 * Math.PI * 38;
          return (
            <div key={i} className={`jv1-card jv1-card-${i} relative p-6 bg-[#0d0a1f]/80 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur hover:border-white/20 transition-all`}>
              <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 80% 20%, ${stat.color}, transparent 60%)` }} />
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-[88px] h-[88px] shrink-0">
                  <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
                    <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                    <circle className={`jv1-gauge-${i}`} cx="44" cy="44" r="38" fill="none"
                      stroke={stat.color} strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={circ} strokeDashoffset={circ}
                      style={{ filter: `drop-shadow(0 0 6px ${stat.color}80)` }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`jv1-num-${i} text-xl font-black tabular-nums`} style={{ color: stat.color }}>0</span>
                    <span className="text-[9px] text-slate-500 font-mono">{stat.suffix}</span>
                  </div>
                </div>
                <div className="pt-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-tight mb-1">{stat.label}</p>
                  <p className="text-slate-500 text-[10px] leading-relaxed">{stat.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: stat.color }} />
                <span className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">Verified 2024</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   JOB VIBE 2 — Bloomberg Ticker
═══════════════════════════════════════════════════════════════════════════ */
function JobVibe2() {
  const ref = useRef(null);
  const tickerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.jv2-stat',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 60%' } }
      );
      if (tickerRef.current) {
        const width = tickerRef.current.scrollWidth / 2;
        gsap.to(tickerRef.current, { x: -width, duration: 30, repeat: -1, ease: 'none' });
      }
      JOB_STATS.forEach((stat, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.val, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: `.jv2-stat-${i}`, start: 'top 85%' },
          onUpdate() {
            const el = document.querySelector(`.jv2-val-${i}`);
            if (el) el.textContent = stat.val % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val);
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#06040f] flex flex-col justify-center py-20 overflow-hidden">
      <JobVibeBadge n="2 — Bloomberg Ticker" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-10 mb-8 flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.6em] text-slate-600 mb-1">NetMasterClass / Market Intelligence</p>
          <h2 className="text-5xl font-black text-white tracking-tighter leading-none">Pourquoi<br />maintenant.</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Données 2024</p>
          <p className="text-emerald-400 font-mono text-sm font-bold mt-1">↑ Marché en hausse</p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-10">
        {JOB_STATS.map((stat, i) => (
          <div key={i} className={`jv2-stat jv2-stat-${i} flex items-center border-b py-5 group hover:bg-white/[0.02] transition-colors`}
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="w-1 h-12 rounded-full mr-6 shrink-0" style={{ background: stat.color }} />
            <div className="w-44 shrink-0">
              <span className={`jv2-val-${i} text-5xl font-black tabular-nums leading-none`} style={{ color: stat.color }}>0</span>
              <span className="text-2xl font-black text-white/30 ml-1">{stat.suffix}</span>
            </div>
            <div className="flex-1 min-w-0 ml-4">
              <p className="text-white font-bold text-base leading-tight">{stat.label}</p>
              <p className="text-slate-500 text-sm mt-0.5">{stat.desc}</p>
            </div>
            <span className="shrink-0 ml-6 text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-full border"
              style={{ color: stat.color, borderColor: stat.color + '40' }}>Source vérifiée</span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 border-t border-white/5 overflow-hidden flex items-center bg-[#06040f]">
        <div ref={tickerRef} className="flex whitespace-nowrap">
          {[...JOB_STATS, ...JOB_STATS].map((stat, i) => (
            <span key={i} className="text-[10px] font-mono text-slate-600 uppercase tracking-widest px-8 border-r border-white/5 inline-block">
              <span style={{ color: stat.color }}>▲ {stat.val}{stat.suffix}</span>{' '}{stat.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   JOB VIBE 3 — Scrollytelling One-by-One
═══════════════════════════════════════════════════════════════════════════ */
function JobVibe3() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.jv3-slide');
      gsap.set(slides, { opacity: 0, scale: 0.9 });
      gsap.set(slides[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.4, start: 'top top', end: '+=500%' },
      });

      slides.forEach((slide, i) => {
        if (i > 0) {
          tl.to(slides[i - 1], { opacity: 0, scale: 0.85, y: -40, duration: 0.5 });
          tl.fromTo(slide, { opacity: 0, scale: 1.08, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.5 });
        }
        tl.to({}, { duration: 1 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] flex items-center justify-center overflow-hidden">
      <JobVibeBadge n="3 — Scrollytelling" />

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {JOB_STATS.map((stat, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full opacity-40" style={{ background: stat.color }} />
        ))}
      </div>

      {JOB_STATS.map((stat, i) => (
        <div key={i} className="jv3-slide absolute inset-0 flex flex-col items-center justify-center px-8">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full blur-[180px]" style={{ background: `${stat.color}12` }} />
          </div>
          <div className="relative z-10 text-center max-w-3xl">
            <p className="text-xs tracking-[0.6em] uppercase font-mono mb-6 opacity-60" style={{ color: stat.color }}>
              Stat {i + 1} / {JOB_STATS.length}
            </p>
            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span className="text-[8rem] md:text-[11rem] font-black leading-none tabular-nums"
                style={{ color: stat.color, textShadow: `0 0 80px ${stat.color}50` }}>
                {stat.val}
              </span>
              <span className="text-4xl md:text-5xl font-black text-white/40">{stat.suffix}</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white mb-3">{stat.label}</p>
            <p className="text-slate-400 text-base">{stat.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   JOB VIBE 4 — Split Screen Narrative
═══════════════════════════════════════════════════════════════════════════ */
function JobVibe4() {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const descRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.jv4-card');
      gsap.set(cards, { opacity: 0, x: 120, rotate: 3 });
      gsap.set(cards[0], { opacity: 1, x: 0, rotate: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.5, start: 'top top', end: '+=500%' },
      });

      cards.forEach((card, i) => {
        const stat = JOB_STATS[i];
        if (i > 0) {
          tl.to(cards[i - 1], { x: -100, opacity: 0, rotate: -3, duration: 0.4 });
          tl.fromTo(card, { x: 120, opacity: 0, rotate: 3 }, { x: 0, opacity: 1, rotate: 0, duration: 0.5 });
          tl.call(() => {
            if (labelRef.current && descRef.current) {
              gsap.to([labelRef.current, descRef.current], {
                opacity: 0, y: -8, duration: 0.2,
                onComplete: () => {
                  labelRef.current.textContent = stat.label;
                  descRef.current.textContent = stat.desc;
                  gsap.to([labelRef.current, descRef.current], { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 });
                },
              });
            }
          }, null, '-=0.3');
        }
        tl.to({}, { duration: 0.8 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] flex overflow-hidden">
      <JobVibeBadge n="4 — Split Narrative" />

      <div className="w-[42%] h-full flex flex-col justify-center px-12 border-r border-white/5 shrink-0">
        <p className="text-[10px] font-mono uppercase tracking-[0.6em] text-slate-600 mb-6">Pourquoi maintenant ?</p>
        <h2 className="text-4xl font-black text-white mb-8 leading-tight">Le marché réseau<br />est en explosion.</h2>
        <div>
          <p ref={labelRef} className="text-xl font-bold text-white mb-3 min-h-[2.5rem]">{JOB_STATS[0].label}</p>
          <p ref={descRef} className="text-slate-400 text-sm min-h-[3rem]">{JOB_STATS[0].desc}</p>
        </div>
        <div className="flex gap-2 mt-10">
          {JOB_STATS.map((stat, i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: stat.color + '60' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 h-full flex items-center justify-center px-10 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent pointer-events-none" />
        <div className="relative w-full max-w-sm h-72">
          {JOB_STATS.map((stat, i) => (
            <div key={i} className="jv4-card absolute inset-0 flex flex-col items-center justify-center p-10 rounded-3xl border backdrop-blur"
              style={{ background: `${stat.color}08`, borderColor: `${stat.color}25`, boxShadow: `0 20px 60px ${stat.color}12` }}>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-7xl font-black tabular-nums" style={{ color: stat.color }}>{stat.val}</span>
                <span className="text-3xl font-black text-white/30">{stat.suffix}</span>
              </div>
              <p className="text-white font-bold text-lg mb-2 text-center">{stat.label}</p>
              <p className="text-slate-500 text-sm text-center">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   JOB VIBE 5 — Neon Explosion
═══════════════════════════════════════════════════════════════════════════ */
function JobVibe5() {
  const ref = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const text = 'Pourquoi maintenant.';
      let idx = 0;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 60%' } });
      tl.call(() => { if (titleRef.current) titleRef.current.textContent = ''; });
      tl.to({}, {
        duration: 1.2,
        onUpdate() {
          const n = Math.floor(this.progress() * text.length);
          if (n !== idx) { idx = n; if (titleRef.current) titleRef.current.textContent = text.slice(0, n) + '▊'; }
        },
        onComplete() { if (titleRef.current) titleRef.current.textContent = text; },
      });

      gsap.fromTo('.jv5-card',
        { opacity: 0, scale: 0.7, y: 40 },
        { opacity: 1, scale: 1, y: 0, stagger: { amount: 0.8, from: 'random' }, duration: 0.6, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.jv5-grid', start: 'top 70%' } }
      );

      JOB_STATS.forEach((stat, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.val, duration: 1.5, ease: 'power2.out', delay: i * 0.15,
          scrollTrigger: { trigger: `.jv5-card-${i}`, start: 'top 85%' },
          onUpdate() {
            const el = document.querySelector(`.jv5-val-${i}`);
            if (el) el.textContent = stat.val % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val);
          },
        });
        gsap.to(`.jv5-card-${i}`, {
          boxShadow: `0 0 25px ${stat.color}35, inset 0 0 25px ${stat.color}08`,
          duration: 1.5 + i * 0.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.25,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#030108] flex flex-col items-center justify-center py-20 overflow-hidden">
      <JobVibeBadge n="5 — Neon Explosion" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="absolute rounded-full animate-ping"
            style={{
              width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
              left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%`,
              background: JOB_STATS[i % JOB_STATS.length].color,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i * 0.3) % 3}s`,
              opacity: 0.25,
            }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl px-8 text-center mb-12">
        <p className="text-xs tracking-[0.6em] uppercase font-mono mb-4 text-slate-600">// analyse_marché_2024</p>
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-black text-white min-h-[1.3em]">Pourquoi maintenant.</h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          {JOB_STATS.map((stat, i) => <div key={i} className="w-1 h-1 rounded-full" style={{ background: stat.color }} />)}
        </div>
      </div>

      <div className="jv5-grid relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl px-8">
        {JOB_STATS.map((stat, i) => (
          <div key={i} className={`jv5-card jv5-card-${i} relative p-7 rounded-2xl border overflow-hidden group`}
            style={{ background: `${stat.color}06`, borderColor: `${stat.color}35` }}>
            <div className="absolute top-0 right-0 w-16 h-16 opacity-20"
              style={{ background: `radial-gradient(circle at top right, ${stat.color}, transparent)` }} />
            <div className="flex items-baseline gap-1 mb-3">
              <span className={`jv5-val-${i} text-5xl font-black tabular-nums`} style={{ color: stat.color }}>0</span>
              <span className="text-2xl font-black" style={{ color: stat.color + '80' }}>{stat.suffix}</span>
            </div>
            <p className="text-white font-bold text-sm leading-tight mb-2">{stat.label}</p>
            <p className="text-slate-600 text-[11px] leading-relaxed">{stat.desc}</p>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FORMATION STATS DATA
═══════════════════════════════════════════════════════════════════════════ */
const FORMATION_STATS = [
  { val: 10,  suffix: '',  label: 'Sessions enregistrées', desc: 'Du CLI de base à STP avancé',           color: '#a855f7' },
  { val: 193, suffix: '+', label: 'Questions de quiz',     desc: 'Avec explications détaillées',          color: '#3b82f6' },
  { val: 10,  suffix: '',  label: 'Labs Packet Tracer',    desc: 'Topologies réalistes NovaTech',         color: '#10b981' },
  { val: 12,  suffix: '',  label: 'Sessions live',         desc: '3 lives par semaine avec le formateur', color: '#f59e0b' },
];

const FORMATION_EXTRAS = [
  { label: '3 sessions live par semaine avec le formateur',  color: '#a855f7' },
  { label: 'Contenu maintenu à jour avec IOS 15.x',         color: '#3b82f6' },
  { label: 'Accès immédiat à tout le contenu dès l\'inscription', color: '#10b981' },
  { label: '474+ diapositives interactives et schémas réseau',    color: '#f59e0b' },
];

const StatsBadge = ({ n }) => (
  <div className="absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-cyan-600/80 backdrop-blur text-white text-xs font-bold tracking-widest border border-cyan-400/40">
    STATS VIBE {n}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   STATS VIBE 1 — Holographic Cascade (scrollytelling one-by-one + summary)
═══════════════════════════════════════════════════════════════════════════ */
function StatsVibe1() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.sv1-slide');
      gsap.set(slides, { opacity: 0, scale: 0.9 });
      if (slides[0]) gsap.set(slides[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.4, start: 'top top', end: '+=500%' },
      });

      slides.forEach((slide, i) => {
        if (i > 0) {
          tl.to(slides[i - 1], { opacity: 0, scale: 0.85, y: -50, duration: 0.5 });
          tl.fromTo(slide, { opacity: 0, scale: 1.1, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.5 });
        }
        tl.to({}, { duration: 1 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const allSlides = [
    ...FORMATION_STATS.map((s, i) => ({ type: 'stat', ...s, idx: i })),
    { type: 'summary' },
  ];

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] flex items-center justify-center overflow-hidden">
      <StatsBadge n="1 — Holographic Cascade" />

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {allSlides.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-30" />
        ))}
      </div>

      {allSlides.map((s, i) => (
        <div key={i} className="sv1-slide absolute inset-0 flex flex-col items-center justify-center px-8">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full blur-[160px]" style={{ background: `${s.color || '#a855f7'}10` }} />
          </div>
          {s.type === 'stat' ? (
            <div className="relative z-10 text-center">
              <p className="text-xs tracking-[0.6em] uppercase font-mono mb-4 opacity-50" style={{ color: s.color }}>{s.idx + 1} / {FORMATION_STATS.length}</p>
              <div className="w-40 h-40 mx-auto mb-6 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center"
                style={{ background: `${s.color}08`, borderColor: `${s.color}30`, boxShadow: `0 0 60px ${s.color}15, inset 0 0 30px ${s.color}05` }}>
                <span className="text-6xl font-black tabular-nums" style={{ color: s.color }}>{s.val}</span>
                <span className="text-lg font-bold text-white/40">{s.suffix}</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-2">{s.label}</p>
              <p className="text-slate-400">{s.desc}</p>
            </div>
          ) : (
            <div className="relative z-10 w-full max-w-3xl">
              <p className="text-center text-xs tracking-[0.5em] uppercase font-mono text-purple-400 mb-8">Résumé complet</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {FORMATION_STATS.map((fs, fi) => (
                  <div key={fi} className="p-5 rounded-2xl border text-center" style={{ background: `${fs.color}06`, borderColor: `${fs.color}25` }}>
                    <span className="text-3xl font-black tabular-nums" style={{ color: fs.color }}>{fs.val}{fs.suffix}</span>
                    <p className="text-white text-xs font-bold mt-2">{fs.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {FORMATION_EXTRAS.map((e, ei) => (
                  <div key={ei} className="flex items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
                    <span className="text-slate-400 text-xs">{e.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS VIBE 2 — Terminal Build
═══════════════════════════════════════════════════════════════════════════ */
function StatsVibe2() {
  const ref = useRef(null);
  const cmdRef = useRef(null);
  const progressRef = useRef(null);
  const pctRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.5, start: 'top top', end: '+=400%' },
      });

      // Typing command
      const cmd = '$ nmc --audit formation --verbose';
      tl.to({}, {
        duration: 0.3,
        onUpdate() {
          const n = Math.floor(this.progress() * cmd.length);
          if (cmdRef.current) cmdRef.current.textContent = cmd.slice(0, n) + '▊';
        },
        onComplete() { if (cmdRef.current) cmdRef.current.textContent = cmd; },
      });

      // Lines appear
      tl.fromTo('.sv2-line', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.06, duration: 0.15 });

      // Progress bar
      tl.to(progressRef.current, { width: '100%', duration: 0.4, ease: 'power1.inOut' });
      tl.to({}, {
        duration: 0.4,
        onUpdate() { if (pctRef.current) pctRef.current.textContent = Math.floor(this.progress() * 100) + '%'; },
      }, '<');

      // Success + extras
      tl.fromTo('.sv2-success', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.5)' });
      tl.fromTo('.sv2-extra', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.15 });

      // Hold
      tl.to({}, { duration: 0.5 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#06040f] flex items-center justify-center overflow-hidden font-mono">
      <StatsBadge n="2 — Terminal Build" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 4px)' }} />

      <div className="relative z-10 w-full max-w-3xl px-8">
        <div className="bg-[#0d0a1f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20">
          <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            <span className="text-slate-500 text-xs ml-4 tracking-widest uppercase">nmc audit v1.0 — NetMasterClass</span>
          </div>
          <div className="p-6 space-y-4">
            <p ref={cmdRef} className="text-emerald-400 text-sm min-h-[1.4em]">$</p>

            <div className="space-y-2 pt-2">
              {FORMATION_STATS.map((s, i) => (
                <div key={i} className="sv2-line flex items-center gap-3 text-xs border-l-2 pl-3 py-1" style={{ borderColor: s.color + '60' }}>
                  <span className="text-purple-400 font-bold">&gt;</span>
                  <span className="text-slate-400 uppercase tracking-widest text-[10px]">{s.label}</span>
                  <span className="ml-auto font-bold text-lg" style={{ color: s.color }}>{s.val}{s.suffix}</span>
                  <span className="text-emerald-400 font-bold text-[10px]">[OK]</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <div className="flex justify-between mb-1.5">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Auditing formation content</span>
                <span ref={pctRef} className="text-emerald-400 font-bold text-xs">0%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div ref={progressRef} className="h-full w-0 rounded-full bg-gradient-to-r from-purple-600 to-emerald-400" />
              </div>
            </div>

            <div className="sv2-success pt-3 text-center">
              <span className="inline-block px-5 py-2 border border-emerald-500/30 bg-emerald-500/10 rounded-lg text-emerald-400 font-bold text-sm tracking-widest">
                ✓ AUDIT COMPLETE — FORMATION VALIDÉE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {FORMATION_EXTRAS.map((e, i) => (
                <div key={i} className="sv2-extra flex items-center gap-2 text-[10px] text-slate-500">
                  <span style={{ color: e.color }}>●</span> {e.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS VIBE 3 — Radial Dashboard
═══════════════════════════════════════════════════════════════════════════ */
function StatsVibe3() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.4, start: 'top top', end: '+=400%' },
      });

      // Center badge
      tl.fromTo('.sv3-center', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

      // Each quadrant lights up
      FORMATION_STATS.forEach((stat, i) => {
        tl.fromTo(`.sv3-quad-${i}`, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' });
        // Count up
        tl.call(() => {
          const el = document.querySelector(`.sv3-num-${i}`);
          if (!el) return;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: stat.val, duration: 1.2, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.v) + stat.suffix; },
          });
        });
        tl.to({}, { duration: 0.5 });
      });

      // Extras
      tl.fromTo('.sv3-extra', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.2 });
      tl.to({}, { duration: 0.3 });
    }, ref);
    return () => ctx.revert();
  }, []);

  const positions = [
    { top: '8%', left: '50%', tx: '-50%', ty: '0' },
    { top: '50%', right: '5%', tx: '0', ty: '-50%' },
    { bottom: '8%', left: '50%', tx: '-50%', ty: '0' },
    { top: '50%', left: '5%', tx: '0', ty: '-50%' },
  ];

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] flex items-center justify-center overflow-hidden">
      <StatsBadge n="3 — Radial Dashboard" />

      {/* Radar circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[200, 300, 400].map(r => (
          <div key={r} className="absolute rounded-full border border-white/[0.04]" style={{ width: r, height: r }} />
        ))}
      </div>

      {/* Center badge */}
      <div className="sv3-center absolute z-20 w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 border-2 border-white/20"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        <span className="text-white font-black text-lg tracking-tight">CCST</span>
      </div>

      {/* Quadrant stats */}
      {FORMATION_STATS.map((s, i) => (
        <div key={i} className={`sv3-quad-${i} absolute z-10 w-52 text-center`}
          style={{ ...positions[i], transform: `translate(${positions[i].tx}, ${positions[i].ty})` }}>
          <div className="p-5 rounded-2xl border backdrop-blur-sm" style={{ background: `${s.color}08`, borderColor: `${s.color}25` }}>
            <span className={`sv3-num-${i} text-4xl font-black tabular-nums block mb-2`} style={{ color: s.color }}>0</span>
            <p className="text-white font-bold text-sm">{s.label}</p>
            <p className="text-slate-500 text-xs mt-1">{s.desc}</p>
          </div>
        </div>
      ))}

      {/* Bottom extras */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {FORMATION_EXTRAS.map((e, i) => (
          <div key={i} className="sv3-extra flex items-center gap-1.5 text-[10px] text-slate-500">
            <div className="w-1 h-1 rounded-full" style={{ background: e.color }} />
            {e.label}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS VIBE 4 — Card Stack Swipe
═══════════════════════════════════════════════════════════════════════════ */
function StatsVibe4() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.sv4-card');
      gsap.set(cards, { opacity: 0 });
      if (cards[0]) gsap.set(cards[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.4, start: 'top top', end: '+=400%' },
      });

      cards.forEach((card, i) => {
        if (i > 0) {
          tl.to(cards[i - 1], { x: -300, rotate: -12, opacity: 0, duration: 0.5, ease: 'power2.in' });
          tl.fromTo(card, { x: 200, rotate: 6, opacity: 0 }, { x: 0, rotate: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
        }
        tl.to({}, { duration: 0.8 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] flex items-center justify-center overflow-hidden">
      <StatsBadge n="4 — Card Stack" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(120,40,200,0.06),transparent)]" />

      <div className="relative z-10 w-full max-w-md text-center">
        <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-4 font-mono">En chiffres</p>
        <h2 className="text-3xl font-black text-white mb-10">Une formation complète.</h2>

        <div className="relative h-80">
          {[...FORMATION_STATS].reverse().map((s, ri) => {
            const i = FORMATION_STATS.length - 1 - ri;
            return (
              <div key={i} className={`sv4-card absolute inset-0 p-10 rounded-3xl border backdrop-blur flex flex-col items-center justify-center`}
                style={{ background: `${s.color}0a`, borderColor: `${s.color}30`, boxShadow: `0 25px 60px ${s.color}15` }}>
                <span className="text-8xl font-black tabular-nums mb-2" style={{ color: s.color, textShadow: `0 0 60px ${s.color}40` }}>
                  {s.val}{s.suffix}
                </span>
                <p className="text-2xl font-bold text-white mb-2">{s.label}</p>
                <p className="text-slate-400 text-sm">{s.desc}</p>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${s.color}20`, color: s.color }}>
                  {i + 1}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {FORMATION_STATS.map((s, i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: s.color + '50' }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS VIBE 5 — Magazine Spread (giant typography)
═══════════════════════════════════════════════════════════════════════════ */
function StatsVibe5() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.sv5-row');
      gsap.set(rows, { opacity: 0, x: -80 });
      if (rows[0]) gsap.set(rows[0], { opacity: 1, x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.4, start: 'top top', end: '+=500%' },
      });

      rows.forEach((row, i) => {
        if (i > 0) {
          tl.to(rows[i - 1], { opacity: 0.15, x: 0, duration: 0.3 });
          tl.fromTo(row, { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' });
        }
        tl.to({}, { duration: 0.8 });
      });

      // All visible at end
      tl.to(rows, { opacity: 1, duration: 0.3 });
      tl.fromTo('.sv5-extra', { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.2 });
      tl.to({}, { duration: 0.4 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#06040f] flex items-center justify-center overflow-hidden">
      <StatsBadge n="5 — Magazine Spread" />

      <div className="relative z-10 w-full max-w-5xl px-10">
        <p className="text-[10px] font-mono uppercase tracking-[0.6em] text-slate-600 mb-2">NetMasterClass / Formation</p>
        <h2 className="text-3xl font-black text-white mb-10 tracking-tight">En chiffres.</h2>

        <div className="space-y-2">
          {FORMATION_STATS.map((s, i) => (
            <div key={i} className="sv5-row flex items-baseline gap-6 border-b py-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <span className="text-[7rem] md:text-[9rem] font-black leading-none tabular-nums tracking-tighter" style={{ color: s.color, opacity: 0.9 }}>
                {s.val}{s.suffix}
              </span>
              <div>
                <p className="text-white text-2xl font-bold">{s.label}</p>
                <p className="text-slate-500 text-base mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {FORMATION_EXTRAS.map((e, i) => (
            <div key={i} className="sv5-extra flex items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: e.color }} />
              <span className="text-slate-400 text-xs">{e.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SESSIONS DATA
═══════════════════════════════════════════════════════════════════════════ */
const SESSIONS = [
  { id: 1,  title: 'Sécurisation & SSH',    slides: 73, quiz: 38, color: '#a855f7', week: 1, tag: 'S1',  keys: ['CLI 3 modes','SSH','Enable secret','TFTP'] },
  { id: 2,  title: 'VLANs',                  slides: 45, quiz: 15, color: '#a855f7', week: 1, tag: 'S2',  keys: ['Segmentation','VLAN 1','Plages','Config'] },
  { id: 3,  title: 'Trunk & Inter-VLAN',     slides: 39, quiz: 23, color: '#a855f7', week: 1, tag: 'S3',  keys: ['802.1Q','Dot1Q','Router-on-stick','SVI'] },
  { id: 4,  title: 'DHCP & DNS',             slides: 88, quiz: 26, color: '#3b82f6', week: 2, tag: 'S4',  keys: ['DORA','Pool DHCP','Relais','Résolution'] },
  { id: 5,  title: 'HTTP, FTP & ARP',        slides: 43, quiz: 25, color: '#3b82f6', week: 2, tag: 'S5',  keys: ['GET/POST','Codes HTTP','TFTP','Gratuitous ARP'] },
  { id: 6,  title: 'Syslog & SNMP',          slides: 39, quiz:  3, color: '#3b82f6', week: 2, tag: 'S6',  keys: ['8 niveaux','Trap SNMP','MIB','Logging'] },
  { id: 7,  title: 'Adressage IP & Masques', slides: 67, quiz: 23, color: '#10b981', week: 3, tag: 'S7',  keys: ['CIDR','VLSM','Binaire','Découpage'] },
  { id: 8,  title: 'Routage Statique',       slides: 29, quiz: 10, color: '#10b981', week: 3, tag: 'S8',  keys: ['ip route','Table routage','Default route','AD'] },
  { id: 9,  title: 'OSPF',                   slides: 23, quiz: 20, color: '#10b981', week: 3, tag: 'S9',  keys: ['Areas','Wildcard','Hello/Dead','DR/BDR'] },
  { id: 10, title: 'STP — Spanning Tree',    slides: 28, quiz: 10, color: '#f59e0b', week: 4, tag: 'S10', keys: ['Root Bridge','BPDU','PortFast','BPDU Guard'] },
];

const WEEKS = [
  { num: 1, title: 'Administration Cisco & VLAN', color: '#a855f7' },
  { num: 2, title: 'Protocoles & Services',       color: '#3b82f6' },
  { num: 3, title: 'Adressage IP & Routage',      color: '#10b981' },
  { num: 4, title: 'Commutation (STP)',            color: '#f59e0b' },
];

const SessBadge = ({ n }) => (
  <div className="absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-orange-600/80 backdrop-blur text-white text-xs font-bold tracking-widest border border-orange-400/40">
    SESS VIBE {n}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   SESS VIBE 1 — Week-by-Week Scrollytelling
   Pinned: 4 weeks, each shows its sessions, crossfade
═══════════════════════════════════════════════════════════════════════════ */
function SessVibe1() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.ss1-week');
      gsap.set(slides, { opacity: 0, y: 40 });
      if (slides[0]) gsap.set(slides[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.3, start: 'top top', end: '+=300%' },
      });

      slides.forEach((slide, i) => {
        if (i > 0) {
          tl.to(slides[i - 1], { opacity: 0, y: -30, duration: 0.4 });
          tl.fromTo(slide, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 });
        }
        tl.to({}, { duration: 0.6 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] flex items-center justify-center overflow-hidden">
      <SessBadge n="1 — Week by Week" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(88,28,135,0.08),transparent)]" />

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {WEEKS.map((w, i) => <div key={i} className="w-2 h-2 rounded-full" style={{ background: w.color, opacity: 0.4 }} />)}
      </div>

      {WEEKS.map((w, wi) => {
        const weekSessions = SESSIONS.filter(s => s.week === w.num);
        return (
          <div key={wi} className="ss1-week absolute inset-0 flex flex-col items-center justify-center px-8">
            <div className="w-full max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg" style={{ background: `${w.color}20`, color: w.color }}>
                  {w.num}
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-60" style={{ color: w.color }}>Semaine {w.num}</p>
                  <p className="text-2xl font-black text-white">{w.title}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {weekSessions.map(s => (
                  <div key={s.id} className="p-5 rounded-xl border bg-white/[0.02]" style={{ borderColor: `${s.color}25` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${s.color}20`, color: s.color }}>{s.tag}</span>
                      <span className="text-[10px] text-slate-600">{s.slides} slides · {s.quiz} quiz</span>
                    </div>
                    <p className="text-white font-bold text-sm mb-3">{s.title}</p>
                    <div className="flex flex-wrap gap-1">
                      {s.keys.map((k, ki) => <span key={ki} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-500">{k}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SESS VIBE 2 — Timeline Vertical
   Pinned: sessions appear one by one along a vertical timeline
═══════════════════════════════════════════════════════════════════════════ */
function SessVibe2() {
  const ref = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.3, start: 'top top', end: '+=400%' },
      });

      // Grow the vertical line
      tl.fromTo(lineRef.current, { height: '0%' }, { height: '100%', duration: 2, ease: 'none' });

      // Cards appear as line grows
      SESSIONS.forEach((_, i) => {
        tl.fromTo(`.ss2-card-${i}`,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          { opacity: 1, x: 0, duration: 0.15 },
          i * 0.2
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] flex items-center justify-center overflow-hidden">
      <SessBadge n="2 — Timeline" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(88,28,135,0.08),transparent)]" />

      <div className="relative z-10 w-full max-w-3xl px-8">
        <p className="text-purple-400 text-[10px] font-mono uppercase tracking-[0.6em] mb-1 text-center">Programme complet</p>
        <h2 className="text-2xl font-black text-white mb-8 text-center">10 sessions, 0 lacune.</h2>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2">
            <div ref={lineRef} className="w-full bg-gradient-to-b from-purple-500 to-amber-500" style={{ height: '0%' }} />
          </div>

          <div className="space-y-3">
            {SESSIONS.map((s, i) => (
              <div key={i} className={`ss2-card-${i} flex items-center gap-4 ${i % 2 === 0 ? 'flex-row pr-[52%]' : 'flex-row-reverse pl-[52%]'}`}>
                <div className="flex-1 p-3 rounded-lg border bg-white/[0.02]" style={{ borderColor: `${s.color}20` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: `${s.color}20`, color: s.color }}>{s.tag}</span>
                    <span className="text-white text-xs font-bold">{s.title}</span>
                  </div>
                  <span className="text-[9px] text-slate-600">{s.slides} slides · {s.quiz} quiz</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full shrink-0 border-2 z-10" style={{ borderColor: s.color, background: '#0a051a' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SESS VIBE 3 — Session Spotlight (one-by-one full focus)
   Pinned: each session gets a full-screen moment
═══════════════════════════════════════════════════════════════════════════ */
function SessVibe3() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.ss3-slide');
      gsap.set(slides, { opacity: 0, scale: 0.9 });
      if (slides[0]) gsap.set(slides[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.3, start: 'top top', end: '+=400%' },
      });

      slides.forEach((slide, i) => {
        if (i > 0) {
          tl.to(slides[i - 1], { opacity: 0, scale: 0.85, duration: 0.3 });
          tl.fromTo(slide, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.3 });
        }
        tl.to({}, { duration: 0.4 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] flex items-center justify-center overflow-hidden">
      <SessBadge n="3 — Spotlight" />

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        {SESSIONS.map((s, i) => <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: s.color, opacity: 0.3 }} />)}
      </div>

      {SESSIONS.map((s, i) => (
        <div key={i} className="ss3-slide absolute inset-0 flex items-center justify-center px-8">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] rounded-full blur-[150px]" style={{ background: `${s.color}10` }} />
          </div>
          <div className="relative z-10 text-center max-w-lg">
            <span className="inline-block text-[10px] font-black tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: `${s.color}20`, color: s.color }}>{s.tag} — Semaine {s.week}</span>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">{s.title}</h3>
            <div className="flex justify-center gap-6 mb-6">
              <span className="text-3xl font-black tabular-nums" style={{ color: s.color }}>{s.slides}<span className="text-sm text-white/30 ml-1">slides</span></span>
              <span className="text-3xl font-black tabular-nums" style={{ color: s.color }}>{s.quiz}<span className="text-sm text-white/30 ml-1">quiz</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {s.keys.map((k, ki) => <span key={ki} className="text-xs px-3 py-1 rounded-full border text-slate-300" style={{ borderColor: `${s.color}30`, background: `${s.color}08` }}>{k}</span>)}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SESS VIBE 4 — Horizontal Carousel
   Pinned: sessions scroll horizontally
═══════════════════════════════════════════════════════════════════════════ */
function SessVibe4() {
  const ref = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.3, start: 'top top', end: `+=${totalScroll}` },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] overflow-hidden">
      <SessBadge n="4 — Carousel" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(88,28,135,0.08),transparent)]" />

      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="px-10 mb-6">
          <p className="text-purple-400 text-[10px] font-mono uppercase tracking-[0.6em] mb-1">Programme complet</p>
          <h2 className="text-2xl font-black text-white">10 sessions, 0 lacune.</h2>
        </div>

        <div ref={trackRef} className="flex gap-4 px-10 will-change-transform">
          {SESSIONS.map(s => (
            <div key={s.id} className="w-72 shrink-0 p-5 rounded-2xl border bg-white/[0.02]" style={{ borderColor: `${s.color}20` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${s.color}20`, color: s.color }}>{s.tag}</span>
                <span className="text-[10px] text-slate-600">S{s.week}</span>
              </div>
              <h4 className="text-white font-bold text-base mb-2">{s.title}</h4>
              <div className="flex gap-3 mb-3 text-[10px] text-slate-500">
                <span>{s.slides} slides</span><span>{s.quiz} quiz</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {s.keys.map((k, ki) => <span key={ki} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-500">{k}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="px-10 mt-6 flex gap-4">
          {WEEKS.map((w, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <div className="w-2 h-2 rounded-full" style={{ background: w.color }} />{w.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SESS VIBE 5 — Stagger Grid Reveal
   Pinned: cards appear in a staggered grid animation
═══════════════════════════════════════════════════════════════════════════ */
function SessVibe5() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, pin: true, scrub: 0.3, start: 'top top', end: '+=250%' },
      });

      tl.fromTo('.ss5-hd', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 });
      tl.fromTo('.ss5-card',
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, stagger: { amount: 1, from: 'start' }, duration: 0.3, ease: 'back.out(1.3)' },
        0.1
      );
      tl.fromTo('.ss5-legend', { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.15 }, '-=0.3');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen bg-[#0a051a] flex flex-col justify-center px-8 md:px-16 overflow-hidden">
      <SessBadge n="5 — Stagger Grid" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(88,28,135,0.08),transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <p className="ss5-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Programme complet</p>
        <h2 className="ss5-hd text-3xl font-black text-white mb-8">10 sessions, 0 lacune.</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {SESSIONS.map(s => (
            <div key={s.id} className="ss5-card p-4 rounded-xl border bg-white/[0.02] hover:bg-white/[0.04] transition-colors" style={{ borderColor: `${s.color}25` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${s.color}20`, color: s.color }}>{s.tag}</span>
                <span className="text-[10px] text-slate-600">S{String(s.id).padStart(2, '0')}</span>
              </div>
              <h4 className="text-white text-xs font-bold leading-snug mb-2">{s.title}</h4>
              <div className="flex gap-3 mb-3 text-[10px] text-slate-500">
                <span>{s.slides} slides</span><span>{s.quiz} quiz</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {s.keys.map((k, ki) => <span key={ki} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-500">{k}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-6">
          {WEEKS.map((w, i) => (
            <div key={i} className="ss5-legend flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: w.color }} />{w.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW BADGE ────────────────────────────────────────────────────────── */
const HowVibeBadge = ({ n }) => (
  <div className="absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-amber-600/80 backdrop-blur text-white text-xs font-bold tracking-widest border border-amber-400/40">
    HOW {n}
  </div>
);

const HOW_STEPS = [
  { id: '01', num: '01', title: 'Cours enregistrés', icon: BookOpen, color: '#a855f7',
    body: 'Slides interactives, schémas réseau détaillés et exemples CLI Cisco commentés.',
    items: ['10 sessions structurées', '474+ diapositives', 'Exemples CLI annotés'],
    gradient: 'from-purple-500/20 to-transparent' },
  { id: '02', num: '02', title: 'Sessions live', icon: Users, color: '#3b82f6',
    body: '3 sessions live par semaine avec votre formateur.',
    items: ['12 lives au total', 'Q&A formateur en direct', 'Correction de labs live'],
    gradient: 'from-blue-500/20 to-transparent' },
  { id: '03', num: '03', title: 'Labs Packet Tracer', icon: Terminal, color: '#10b981',
    body: 'Topologies NovaTech guidées, correction détaillée.',
    items: ['10 labs guidés', 'Topologies réalistes', 'Corrections incluses'],
    gradient: 'from-emerald-500/20 to-transparent' },
  { id: '04', num: '04', title: 'Obtenez votre CCST', icon: Award, color: '#f59e0b',
    body: 'Quiz randomisés, flashcards de révision et générateur de commandes.',
    items: ['193+ questions CCST', 'Flashcards dynamiques', 'Générateur CLI interactif'],
    gradient: 'from-amber-500/20 to-transparent' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HOW VIBE 1 — Full-Screen Step Reveal (clip-path)
═══════════════════════════════════════════════════════════════════════════ */
function HowVibe1() {
  const componentRef = useRef(null);
  const containerRef = useRef(null);
  const slidesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slidesRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=350%',
          scrub: 0.3,
        },
      });

      slides.forEach((slide, index) => {
        if (index === 0) {
          gsap.fromTo(slide.querySelectorAll('.hv1-animate-in'),
            { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1, duration: 1 });
        } else {
          tl.fromTo(slide,
            { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
            { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, ease: 'none' },
            index - 0.5);
          tl.fromTo(slide.querySelectorAll('.hv1-animate-in'),
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4 },
            index - 0.2);
        }
      });
    }, componentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="relative bg-[#0a051a] overflow-hidden">
      <HowVibeBadge n="H1 — Clip Reveal" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>
      <div ref={containerRef} className="relative h-screen w-full flex flex-col justify-center items-center">
        {HOW_STEPS.map((step, idx) => (
          <div key={step.id} ref={el => (slidesRef.current[idx] = el)}
            className={`absolute inset-0 w-full h-full flex items-center justify-center px-6 lg:px-24 bg-[#0a051a] ${idx === 0 ? 'z-10' : 'z-20'}`}
            style={{ willChange: 'clip-path, opacity' }}>
            <span className="hv1-animate-in absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-black text-white/[0.02] leading-none select-none">{step.id}</span>
            <div className="relative z-30 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="hv1-animate-in flex flex-col items-center lg:items-start space-y-8">
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-3xl flex items-center justify-center relative group"
                  style={{ backgroundColor: `${step.color}15` }}>
                  <div className="absolute inset-0 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity" style={{ backgroundColor: step.color }} />
                  <step.icon className="w-10 h-10 lg:w-14 lg:h-14 relative z-10" style={{ color: step.color }} />
                </div>
                <div className="text-center lg:text-left">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border"
                    style={{ color: step.color, borderColor: `${step.color}40`, backgroundColor: `${step.color}10` }}>
                    Étape {step.id}
                  </span>
                  <h2 className="text-4xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">{step.title}</h2>
                </div>
              </div>
              <div className="hv1-animate-in space-y-8">
                <p className="text-xl lg:text-2xl text-slate-400 font-light leading-relaxed">{step.body}</p>
                <div className="space-y-4">
                  {step.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/[0.08] transition-colors">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${step.color}20` }}>
                        <CheckCircle className="w-4 h-4" style={{ color: step.color }} />
                      </div>
                      <span className="text-slate-200 font-medium lg:text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex justify-center lg:justify-start">
                  <div className="flex items-center gap-3">
                    {HOW_STEPS.map((_, i) => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === idx ? 'w-12' : 'w-3 opacity-20'}`}
                        style={{ backgroundColor: i === idx ? step.color : 'white' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW VIBE 2 — Vertical Timeline
═══════════════════════════════════════════════════════════════════════════ */
function HowVibe2() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const progressLineRef = useRef(null);
  const stepRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.3,
        },
      });

      tl.to(progressLineRef.current, { height: '100%', ease: 'none' }, 0);

      HOW_STEPS.forEach((_, index) => {
        const stepEl = stepRefs.current[index];
        const icon = stepEl.querySelector('.hv2-icon-wrapper');
        const card = stepEl.querySelector('.hv2-card');
        const dot = stepEl.querySelector('.hv2-dot');
        const startTime = (index / (HOW_STEPS.length - 1)) * 0.9;

        tl.to(icon, { scale: 1.2, backgroundColor: HOW_STEPS[index].color, boxShadow: `0 0 30px ${HOW_STEPS[index].color}66`, duration: 0.2 }, startTime)
          .to(dot, { scale: 2, backgroundColor: HOW_STEPS[index].color, duration: 0.2 }, startTime)
          .fromTo(card,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50, filter: 'blur(10px)' },
            { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.3 }, startTime);

        if (index < HOW_STEPS.length - 1) {
          const nextTime = ((index + 1) / (HOW_STEPS.length - 1)) * 0.9;
          tl.to(card, { opacity: 0.3, filter: 'blur(2px)', duration: 0.2 }, nextTime);
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#0a051a] text-white overflow-hidden"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.05) 0%, transparent 50%), radial-gradient(circle at 100% 50%, rgba(59,130,246,0.05) 0%, transparent 50%)' }}>
      <HowVibeBadge n="H2 — Timeline" />
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      </div>
      <div ref={triggerRef} className="relative min-h-screen flex flex-col items-center justify-center py-24">
        <div className="text-center mb-20 px-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">Le parcours vers votre certification</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">Une méthodologie structurée pour maîtriser les fondamentaux du réseau Cisco.</p>
        </div>
        <div className="relative w-full max-w-6xl px-4 flex flex-col">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block" />
          <div ref={progressLineRef} className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-orange-500 -translate-x-1/2 hidden md:block" style={{ height: '0%' }} />
          <div className="space-y-32 md:space-y-0 relative">
            {HOW_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} ref={el => (stepRefs.current[idx] = el)}
                  className={`relative flex flex-col md:flex-row items-center w-full md:min-h-[40vh] ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-1/2 px-4 md:px-12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="hv2-card p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-bold mb-4" style={{ backgroundColor: `${step.color}22`, color: step.color }}>ÉTAPE {step.num}</span>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{step.title}</h3>
                      <p className="text-gray-400 mb-6 text-lg leading-relaxed">{step.body}</p>
                      <ul className={`space-y-3 flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        {step.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            {isEven && <span>{item}</span>}
                            <CheckCircle className="w-4 h-4 shrink-0" style={{ color: step.color }} />
                            {!isEven && <span>{item}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10 hidden md:flex">
                    <div className="hv2-icon-wrapper w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl transition-all duration-500">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="hv2-dot w-3 h-3 rounded-full bg-white/20 mt-4 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW VIBE 3 — Card Stack
═══════════════════════════════════════════════════════════════════════════ */
function HowVibe3() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        tl.fromTo(card, { y: '100vh', rotateX: 5 }, { y: '0vh', rotateX: 0, ease: 'none' },
          index === 1 ? 0 : '>-0.2');
        if (index > 0) {
          tl.to(cards[index - 1], { scale: 0.94, opacity: 0.5, filter: 'blur(4px)', duration: 0.5 }, '<');
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#0a051a] text-white overflow-hidden" style={{ perspective: '1000px' }}>
      <HowVibeBadge n="H3 — Card Stack" />
      <div ref={triggerRef} className="relative h-screen flex flex-col items-center justify-center px-6">
        <div className="absolute top-16 text-center z-10 pointer-events-none">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-purple-500 mb-2">Processus</h2>
          <p className="text-4xl md:text-5xl font-black italic tracking-tighter">COMMENT ÇA MARCHE ?</p>
        </div>
        <div className="relative w-full max-w-4xl h-[65vh] mt-20">
          {HOW_STEPS.map((step, idx) => (
            <div key={idx} ref={el => (cardsRef.current[idx] = el)}
              className="absolute inset-0 w-full h-full flex items-center justify-center origin-bottom"
              style={{ zIndex: idx + 1, willChange: 'transform, opacity' }}>
              <div className="relative w-full h-full bg-[#130b2e]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center overflow-hidden shadow-2xl">
                <span className="absolute -bottom-10 -right-4 text-[18rem] font-black leading-none opacity-[0.03] select-none pointer-events-none">{step.num}</span>
                <div className="relative flex-shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group overflow-hidden">
                  <div className="absolute inset-0 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40" style={{ backgroundColor: step.color }} />
                  <step.icon size={64} strokeWidth={1.5} style={{ color: step.color }} className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                  <div className="absolute top-4 left-4 text-xs font-mono opacity-40">STEP // {step.num}</div>
                </div>
                <div className="flex-grow space-y-6 relative z-10">
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{step.title}</h3>
                    <p className="text-white/60 text-lg max-w-md leading-relaxed">{step.body}</p>
                  </div>
                  <ul className="grid grid-cols-1 gap-3">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 group">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: `${step.color}20` }}>
                          <CheckCircle size={14} style={{ color: step.color }} />
                        </div>
                        <span className="text-sm font-medium text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 flex items-center gap-4">
                    <div className="h-[1px] flex-grow bg-white/10" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/30 whitespace-nowrap">Formation CCST Cisco</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW VIBE 4 — Split Screen Journey
═══════════════════════════════════════════════════════════════════════════ */
function HowVibe4() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(progressLineRef.current, { height: '100%', ease: 'none' }, 0);

      const cards = gsap.utils.toArray('.hv4-step-card');
      const dots = gsap.utils.toArray('.hv4-dot');

      cards.forEach((card, i) => {
        if (i !== 0) gsap.set(card, { opacity: 0, y: 50, scale: 0.95 });
        if (i > 0) {
          tl.to(cards[i - 1], { opacity: 0, y: -50, scale: 0.9, pointerEvents: 'none' }, i);
          tl.to(card, { opacity: 1, y: 0, scale: 1, pointerEvents: 'all' }, i);
        }
        tl.to(dots[i], { backgroundColor: HOW_STEPS[i].color, scale: 1.4, boxShadow: `0 0 20px ${HOW_STEPS[i].color}`, duration: 0.2 }, i);
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0a051a] overflow-hidden">
      <HowVibeBadge n="H4 — Split Screen" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>
      <div className="flex w-full h-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="hidden md:flex w-1/2 flex-col justify-center pr-12 lg:pr-24">
          <div className="space-y-4">
            <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
              Comment ça <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 italic">marche ?</span>
            </h2>
            <p className="text-lg text-white/40 max-w-md font-light leading-relaxed">Une méthodologie immersive conçue pour vous propulser vers la certification Cisco CCST.</p>
          </div>
          <div className="mt-16 relative flex items-center h-64">
            <div className="absolute left-[7px] top-0 w-[2px] h-full bg-white/5 rounded-full" />
            <div ref={progressLineRef} className="absolute left-[7px] top-0 w-[2px] h-0 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full z-10" />
            <div className="flex flex-col justify-between h-full relative z-20">
              {HOW_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="hv4-dot w-4 h-4 rounded-full bg-white/20 border-2 border-[#0a051a] transition-all duration-300" />
                  <span className="text-xs font-bold tracking-[0.2em] text-white/20 uppercase group-hover:text-white/40 transition-colors">Étape {step.num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative flex items-center justify-center">
          <div className="absolute top-24 left-0 w-full md:hidden text-center">
            <h2 className="text-4xl font-black text-white mb-2">Comment ça marche ?</h2>
            <div className="w-12 h-1 bg-purple-500 mx-auto" />
          </div>
          <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square flex items-center justify-center">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className={`hv4-step-card absolute inset-0 flex flex-col justify-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-64 h-64 opacity-20 blur-[80px] transition-opacity group-hover:opacity-40" style={{ backgroundColor: step.color }} />
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-4 rounded-2xl shadow-lg" style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                      <step.icon size={32} style={{ color: step.color }} />
                    </div>
                    <span className="text-6xl font-black opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>{step.num}</span>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                      <p className="text-white/60 leading-relaxed text-lg">{step.body}</p>
                    </div>
                    <div className="pt-6 space-y-3 border-t border-white/5">
                      {step.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle size={16} style={{ color: step.color }} className="opacity-80" />
                          <span className="text-sm font-medium text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 transition-all duration-500" style={{ backgroundColor: step.color, width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-white">Scroll</span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW VIBE 5 — Horizontal Carousel
═══════════════════════════════════════════════════════════════════════════ */
function HowVibe5() {
  const component = useRef(null);
  const slider = useRef(null);
  const progressLine = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.hv5-panel');

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 0.5,
          end: () => '+=' + slider.current.offsetWidth,
          onUpdate: (self) => {
            gsap.to(progressLine.current, { scaleX: self.progress, duration: 0.1, ease: 'none' });
          },
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className="relative overflow-hidden bg-[#0a051a]">
      <HowVibeBadge n="H5 — Carousel" />
      <div className="absolute top-0 left-0 w-full h-1 z-40 bg-white/5">
        <div ref={progressLine} className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 origin-left scale-x-0" />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>
      <div ref={slider} className="flex w-[400vw] h-screen relative z-10">
        {HOW_STEPS.map((step, idx) => (
          <section key={idx} className="hv5-panel w-screen h-screen flex items-center justify-center px-6 md:px-20 lg:px-32 relative overflow-hidden flex-shrink-0">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="relative order-2 lg:order-1">
                <div className={`absolute -inset-10 bg-gradient-to-br ${step.gradient} blur-[80px] rounded-full opacity-50`} />
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-white/20 to-transparent rounded-3xl blur-sm group-hover:blur-md transition-all duration-500" />
                  <div className="relative bg-[#0d0725]/80 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-xl overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="p-4 rounded-2xl" style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}40` }}>
                        <step.icon size={32} style={{ color: step.color }} />
                      </div>
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">L'expérience NovaTech</h3>
                    <ul className="space-y-4">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-slate-300">
                          <CheckCircle size={18} style={{ color: step.color }} className="flex-shrink-0" />
                          <span className="text-sm md:text-base font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] md:text-xs text-emerald-400/70">
                      <div className="flex gap-1.5 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                      <div className="opacity-80">
                        Cisco_CCST# show interface status<br />
                        Port      Name               Status       Vlan<br />
                        Gi0/1     UPLINK_TO_CORE     connected    10
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-8xl md:text-[140px] font-black tracking-tighter opacity-10 select-none leading-none"
                    style={{ WebkitTextStroke: `1px ${step.color}`, color: 'transparent' }}>{step.num}</span>
                  <div className="h-0.5 w-12 bg-white/20" />
                  <span className="text-sm font-bold tracking-widest uppercase text-white/40">Step {step.num}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">{step.title}</h2>
                <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">{step.body}</p>
              </div>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-20 pointer-events-none hidden md:flex">
              {HOW_STEPS.map((s, idx2) => (
                <div key={idx2} className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${idx === idx2 ? 'text-white' : 'text-slate-500'}`}>{s.num}</span>
                  <div className={`w-1 h-1 rounded-full ${idx === idx2 ? 'bg-white' : 'bg-slate-800'}`} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ─── TOOLS BADGE ──────────────────────────────────────────────────────── */
const ToolsVibeBadge = ({ n }) => (
  <div className="absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-teal-600/80 backdrop-blur text-white text-xs font-bold tracking-widest border border-teal-400/40">
    TOOLS {n}
  </div>
);

const TOOLS_DATA = [
  { id: '01', title: 'Simulateur CLI', desc: 'Syntaxe Cisco IOS colorisée. Naviguez entre les modes User, Privileged, Config en live.', icon: Terminal, color: '#a855f7', img: '/validationtp.png' },
  { id: '02', title: 'Générateur de cmds', desc: 'Construisez pas-à-pas vos configs VLAN, OSPF, NAT avec le bon ordre de commandes garanti.', icon: Zap, color: '#3b82f6', img: '/validationtp.png' },
  { id: '03', title: 'Flashcards actives', desc: '100+ commandes clés. Mode retournement, mode examen, répétition des commandes ratées.', icon: BookOpen, color: '#10b981', img: '/flash.png' },
  { id: '04', title: 'Calculateur réseau', desc: 'Calculs CIDR/VLSM, conversions binaire/décimal, masques. Widget flottant.', icon: Globe, color: '#f59e0b', img: '/Calculateur.png' },
  { id: '05', title: 'Tableau interactif', desc: "Dessinez vos topologies réseau dans l'interface. Outils crayon, formes, texte.", icon: Layers, color: '#ec4899', img: '/Tableau interactif.png' },
  { id: '06', title: 'Quiz 193 questions', desc: 'Questions CCST avec explications détaillées. Mode session ciblée ou révision générale.', icon: Shield, color: '#6366f1', img: '/Quiz.png' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   TOOLS VIBE 1 — Immersive Gallery (horizontal scroll, 6 panels)
═══════════════════════════════════════════════════════════════════════════ */
function ToolsVibe1() {
  const componentRef = useRef(null);
  const sliderRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.tv1-panel');
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: { trigger: triggerRef.current, pin: true, scrub: 0.5, end: () => '+=' + sliderRef.current.offsetWidth },
      });
    }, componentRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="bg-[#0a051a] overflow-hidden">
      <ToolsVibeBadge n="T1 — Gallery" />
      <div className="pt-24 pb-12 px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">OUTILS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">INTÉGRÉS</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Une suite logicielle complète pour la réussite de votre certification Cisco CCST.</p>
      </div>
      <div ref={triggerRef} className="h-screen flex items-center">
        <div ref={sliderRef} className="flex h-[80vh] w-[600vw]">
          {TOOLS_DATA.map((tool) => (
            <section key={tool.id} className="tv1-panel w-screen h-full flex items-center justify-center relative px-4 md:px-20 flex-shrink-0">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-black text-white/[0.03] leading-none select-none pointer-events-none">{tool.id}</span>
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="order-2 lg:order-1 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl backdrop-blur-sm border border-white/10" style={{ backgroundColor: `${tool.color}15`, borderColor: `${tool.color}30` }}>
                      <tool.icon size={40} color={tool.color} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-mono tracking-widest text-gray-500 uppercase">Module {tool.id}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{tool.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-xl">{tool.desc}</p>
                </div>
                <div className="order-1 lg:order-2 relative group">
                  <div className="absolute -inset-4 rounded-[2rem] blur-3xl opacity-20" style={{ backgroundColor: tool.color }} />
                  <div className="relative bg-[#161129] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/50" /><div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <div className="aspect-video relative overflow-hidden bg-[#0a051a]">
                      <img src={tool.img} alt={tool.title} className="w-full h-full object-cover object-top opacity-90" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOOLS VIBE 2 — Split Showcase (left fixed, right scrolls)
═══════════════════════════════════════════════════════════════════════════ */
function ToolsVibe2() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const rightSideRef = useRef(null);
  const progressLineRef = useRef(null);
  const counterRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: triggerRef.current, start: 'top top', end: '+=400%', pin: true, scrub: 0.3, anticipatePin: 1 },
      });
      tl.to(rightSideRef.current, { yPercent: -83.33, ease: 'none' });

      const cards = gsap.utils.toArray('.tv2-card');
      cards.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: `top+=${(i * 400) / cards.length}% top`,
          end: `top+=${((i + 1) * 400) / cards.length}% top`,
          onToggle: self => {
            if (self.isActive) {
              gsap.to(counterRef.current, { innerText: i + 1, duration: 0.3, snap: { innerText: 1 } });
              gsap.to(progressLineRef.current, { scaleY: (i + 1) / cards.length, duration: 0.4, ease: 'power2.out', transformOrigin: 'top' });
            }
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#0a051a] overflow-hidden">
      <ToolsVibeBadge n="T2 — Split" />
      <div ref={triggerRef} className="flex flex-col md:flex-row h-screen w-full relative">
        <div className="w-full md:w-[45%] h-[40vh] md:h-full flex flex-col justify-center px-8 md:px-20 z-10 border-b md:border-b-0 md:border-r border-white/10 bg-[#0a051a]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-widest">Outils Intégrés</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">La plateforme <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400">qui vous fait avancer</span></h2>
            <div className="flex items-center gap-6 pt-8">
              <div className="flex items-baseline gap-1">
                <span ref={counterRef} className="text-5xl md:text-7xl font-bold text-white leading-none">1</span>
                <span className="text-xl md:text-2xl font-medium text-white/30">/ 6</span>
              </div>
              <div className="h-24 w-[2px] bg-white/10 relative rounded-full overflow-hidden">
                <div ref={progressLineRef} className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500 to-blue-500 scale-y-[0.16] origin-top" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[55%] h-[60vh] md:h-full relative overflow-hidden bg-[#0d0721]">
          <div ref={rightSideRef} className="flex flex-col h-full">
            {TOOLS_DATA.map((tool, index) => (
              <div key={index} className="tv2-card h-full min-h-screen w-full flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-2xl group">
                  <div className="relative p-[1px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent">
                    <div className="relative bg-[#0a051a]/90 backdrop-blur-xl rounded-[23px] p-8 md:p-10 overflow-hidden">
                      <div className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-20" style={{ backgroundColor: tool.color }} />
                      <div className="relative z-10 flex flex-col gap-8">
                        <div className="flex items-center gap-6">
                          <div className="p-4 rounded-2xl border" style={{ backgroundColor: `${tool.color}15`, borderColor: `${tool.color}30`, color: tool.color }}>
                            <tool.icon size={32} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{tool.title}</h3>
                            <div className="h-1 w-12 rounded-full" style={{ backgroundColor: tool.color }} />
                          </div>
                        </div>
                        <p className="text-lg text-slate-400 leading-relaxed">{tool.desc}</p>
                        <div className="relative aspect-video rounded-xl border border-white/10 overflow-hidden bg-[#05020a] shadow-2xl">
                          <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center gap-2 px-4">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/50" /><div className="w-2 h-2 rounded-full bg-green-500/50" />
                          </div>
                          <img src={tool.img} alt={tool.title} className="w-full h-full object-cover pt-8 opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOOLS VIBE 3 — Card Carousel with Screenshots (glassmorphism overlay)
═══════════════════════════════════════════════════════════════════════════ */
function ToolsVibe3() {
  const component = useRef(null);
  const slider = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.tv3-panel');
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: { trigger: component.current, pin: true, scrub: 0.5, end: () => '+=' + slider.current.offsetWidth },
      });
      gsap.to(progressRef.current, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: component.current, scrub: 0.5, start: 'top top', end: () => '+=' + slider.current.offsetWidth },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={component} className="relative overflow-hidden bg-[#0a051a]">
      <ToolsVibeBadge n="T3 — Carousel" />
      <div className="absolute top-0 left-0 w-full h-1.5 z-40 bg-white/5">
        <div ref={progressRef} className="h-full w-full origin-left bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-500 scale-x-0" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>
      <div ref={slider} className="flex w-[600vw] h-screen items-center">
        {TOOLS_DATA.map((tool, index) => (
          <div key={tool.id} className="tv3-panel relative w-screen h-screen flex items-center justify-center px-4 md:px-20 flex-shrink-0">
            <div className="relative w-full max-w-7xl h-[75vh] flex items-center">
              <div className="relative w-full lg:w-[75%] h-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a051a]/60 via-transparent to-transparent z-10" />
                <img src={tool.img} alt={tool.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">Module {tool.id}</span>
                </div>
              </div>
              <div className="absolute right-0 bottom-8 lg:bottom-16 w-full lg:w-[42%] z-20">
                <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-[60px]" style={{ backgroundColor: tool.color }} />
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ background: `${tool.color}20`, border: `1px solid ${tool.color}40` }}>
                    <tool.icon size={32} style={{ color: tool.color }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">{tool.title}</h3>
                  <p className="text-lg text-white/60 leading-relaxed mb-10 font-light">{tool.desc}</p>
                  <span className="text-4xl font-black text-white/5 select-none">0{index + 1}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOOLS VIBE 4 — Stacked Reveal (intro screenshots + stacking cards)
═══════════════════════════════════════════════════════════════════════════ */
function ToolsVibe4() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: triggerRef.current, start: 'top top', end: '+=600%', pin: true, scrub: 0.3, anticipatePin: 1 },
      });

      tl.to('.tv4-intro-ss-1', { y: -40, opacity: 1, duration: 1 }, 0)
        .to('.tv4-intro-ss-2', { y: -80, opacity: 1, duration: 1 }, 0.2)
        .to('.tv4-intro-ss-3', { y: -20, opacity: 1, duration: 1 }, 0.4)
        .to(introRef.current, { opacity: 0, scale: 0.9, filter: 'blur(10px)', duration: 1.5, pointerEvents: 'none' }, 1.5);

      TOOLS_DATA.forEach((_, index) => {
        const card = cardsRef.current[index];
        const isLast = index === TOOLS_DATA.length - 1;
        tl.fromTo(card, { y: '120vh', scale: 0.8 }, { y: 0, scale: 1 - index * 0.02, duration: 2, ease: 'power2.out' }, `card-${index}`);
        if (!isLast) {
          tl.to(card, { y: -30, scale: 0.95 - index * 0.02, filter: 'brightness(0.4) blur(2px)', duration: 2 }, `card-${index + 1}-=0.5`);
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#0a051a] overflow-hidden text-white">
      <ToolsVibeBadge n="T4 — Stacked" />
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
      </div>
      <div ref={triggerRef} className="relative h-screen w-full flex items-center justify-center">
        <div ref={introRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Des outils de pointe pour une maîtrise absolue.</h2>
          <div className="relative w-full max-w-5xl h-[300px] md:h-[400px] mt-12">
            <div className="tv4-intro-ss-1 absolute left-0 top-20 w-[45%] opacity-0 translate-y-5 rounded-xl overflow-hidden shadow-2xl border border-white/10 z-20">
              <img src="/validationtp.png" alt="Lab" className="w-full h-auto" />
            </div>
            <div className="tv4-intro-ss-2 absolute left-1/2 -translate-x-1/2 top-0 w-[55%] opacity-0 translate-y-5 rounded-xl overflow-hidden shadow-2xl border border-purple-500/30 z-30">
              <img src="/dasboardperso.png" alt="Dashboard" className="w-full h-auto" />
            </div>
            <div className="tv4-intro-ss-3 absolute right-0 top-24 w-[40%] opacity-0 translate-y-5 rounded-xl overflow-hidden shadow-2xl border border-white/10 z-20">
              <img src="/Capture d'écran 2026-03-02 121843.png" alt="Course" className="w-full h-auto" />
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center px-4">
          {TOOLS_DATA.map((tool, idx) => (
            <div key={tool.id} ref={el => (cardsRef.current[idx] = el)} className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 50 + idx, willChange: 'transform' }}>
              <div className="w-full bg-[#130d2b] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row gap-10 group overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)` }} />
                <div className="flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${tool.color}15`, border: `1px solid ${tool.color}40` }}>
                      <tool.icon className="w-7 h-7" style={{ color: tool.color }} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{tool.title}</h3>
                    <p className="text-lg text-white/60 leading-relaxed max-w-md">{tool.desc}</p>
                  </div>
                </div>
                <div className="flex-1 relative min-h-[250px] md:min-h-full">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/5 bg-[#0a051a]">
                    <img src={tool.img} alt={tool.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOOLS VIBE 5 — Cinematic Horizontal (3 panels, 2 tools each)
═══════════════════════════════════════════════════════════════════════════ */
function ToolsVibe5() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  const PANELS = [
    { title: 'Validation & Pratique Réelle', image: '/validationtp.png',
      tools: [
        { icon: Terminal, name: 'Simulateur CLI', color: '#a855f7', desc: 'Syntaxe Cisco IOS colorisée. Naviguez entre les modes User, Privileged, Config en live.', pos: 'top-1/4 left-12' },
        { icon: Zap, name: 'Générateur de cmds', color: '#3b82f6', desc: 'Construisez pas-à-pas vos configs VLAN, OSPF, NAT avec le bon ordre garanti.', pos: 'bottom-1/4 right-12' },
      ] },
    { title: 'Cours & Apprentissage', image: '/flash.png',
      tools: [
        { icon: BookOpen, name: 'Flashcards actives', color: '#10b981', desc: '100+ commandes clés. Mode retournement, mode examen, répétition intelligente.', pos: 'top-1/3 right-20' },
        { icon: Globe, name: 'Calculateur réseau', color: '#f59e0b', desc: 'Calculs CIDR/VLSM, conversions binaire/décimal, masques. Widget flottant.', pos: 'bottom-1/3 left-20' },
      ] },
    { title: 'Suivi & Progression', image: '/Tableau interactif.png',
      tools: [
        { icon: Layers, name: 'Tableau interactif', color: '#ec4899', desc: "Dessinez vos topologies réseau dans l'interface. Outils crayon, formes, texte.", pos: 'top-20 left-1/4' },
        { icon: Shield, name: 'Quiz 193 questions', color: '#6366f1', desc: 'Questions CCST avec explications détaillées. Mode session ciblée ou révision générale.', pos: 'bottom-20 right-1/4' },
      ] },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.tv5-panel');
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: { trigger: containerRef.current, pin: true, scrub: 0.5, end: () => `+=${containerRef.current.offsetWidth * 2}` },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-[#0a051a]">
      <ToolsVibeBadge n="T5 — Cinematic" />
      <div ref={horizontalRef} className="flex w-[300vw] h-screen overflow-hidden">
        {PANELS.map((panel, idx) => (
          <section key={idx} className="tv5-panel relative w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-8">
            <div className="absolute inset-0 z-0 p-12 md:p-24">
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <img src={panel.image} alt={panel.title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a051a]/40 via-transparent to-[#0a051a]" />
              </div>
            </div>
            <div className="relative z-10 w-full max-w-7xl h-full flex flex-col justify-center pointer-events-none">
              <div className="mb-auto mt-24">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-2xl leading-tight">{panel.title}</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-white/40 to-transparent mt-6" />
              </div>
              {panel.tools.map((tool, tIdx) => (
                <div key={tIdx} className={`absolute ${tool.pos} pointer-events-auto w-80 group`}>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-white/10 hover:-translate-y-2">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${tool.color}20`, color: tool.color }}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{tool.name}</h3>
                    <p className="text-sm text-white/60 leading-relaxed font-light">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
              {PANELS.map((_, i) => (
                <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${idx === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ─── PROG BADGE ───────────────────────────────────────────────────────── */
const ProgVibeBadge = ({ n }) => (
  <div className="absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-rose-600/80 backdrop-blur text-white text-xs font-bold tracking-widest border border-rose-400/40">
    PROG {n}
  </div>
);

const PROG_DATA = [
  { week: '01', title: 'Administration Cisco & VLAN', color: '#a855f7', icon: Cpu, sessions: 3, labs: 3, tags: ['Sécurisation & SSH', 'VLANs', 'Trunk & Inter-VLAN'], topics: ['3 modes du CLI Cisco', 'SSH & sécurisation complète', 'Segmentation par VLAN', 'Routage inter-VLAN 802.1Q'], cmd: 'Switch(config-if)# switchport access vlan 10\nSwitch(config-if)# switchport mode access', quote: 'Construisez le réseau NovaTech de zéro' },
  { week: '02', title: 'Protocoles & Services', color: '#3b82f6', icon: Globe, sessions: 3, labs: 3, tags: ['DHCP & DNS', 'HTTP/FTP/ARP', 'Syslog & SNMP'], topics: ['DHCP DORA en 4 étapes', 'Résolution DNS complète', '8 niveaux de sévérité Syslog', 'Supervision SNMP v2/v3'], cmd: 'Router(config)# ip dhcp pool LAN\nRouter(dhcp-config)# network 192.168.1.0 /24', quote: 'Maîtrisez toute la couche applicative' },
  { week: '03', title: 'Adressage IP & Routage', color: '#10b981', icon: Network, sessions: 3, labs: 3, tags: ['Adressage IP', 'Routage Statique', 'OSPF'], topics: ['CIDR, VLSM, calculs binaires', 'Tables de routage & ip route', 'OSPF multi-area & Wildcard Mask', 'Hello/Dead timers, DR/BDR'], cmd: 'Router(config-router)# network 10.0.0.0 0.0.0.255 area 0', quote: "De l'adresse IP à OSPF multi-area" },
  { week: '04', title: 'Commutation Avancée', color: '#f59e0b', icon: Layers, sessions: 1, labs: 1, tags: ['STP — Spanning Tree Protocol'], topics: ['Boucles Layer 2 & Root Bridge', 'Élection STP & rôles des ports', 'PortFast & BPDU Guard', 'États des ports & convergence'], cmd: 'Switch(config)# spanning-tree vlan 1 priority 4096\nSwitch(config-if)# spanning-tree portfast', quote: 'Éliminez définitivement les boucles Layer 2' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PROG VIBE 1 — Cinematic Timeline (vertical pin, crossfade weeks)
═══════════════════════════════════════════════════════════════════════════ */
function ProgVibe1() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const contentRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '+=400%', scrub: 0.5 } });
      PROG_DATA.forEach((_, index) => {
        const el = contentRefs.current[index];
        gsap.fromTo(el, { opacity: 0, x: 50, filter: 'blur(10px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', scrollTrigger: { trigger: containerRef.current, start: `${index * 25}% top`, end: `${(index + 1) * 25}% top`, scrub: true } });
        if (index > 0) {
          gsap.to(contentRefs.current[index - 1], { opacity: 0, scale: 0.9, filter: 'blur(10px)', scrollTrigger: { trigger: containerRef.current, start: `${index * 25}% top`, end: `${index * 25 + 5}% top`, scrub: true } });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0a051a] overflow-hidden">
      <ProgVibeBadge n="C1 — Timeline" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
      <div className="relative h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-12 gap-8 items-center h-full">
          <div className="col-span-1 flex flex-col items-center h-full relative">
            <div className="w-[2px] h-full bg-white/10 relative">
              <div ref={lineRef} className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500 via-blue-500 to-amber-500 origin-top" style={{ boxShadow: '0 0 15px rgba(168,85,247,0.5)' }} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between py-24">
              {PROG_DATA.map((item, idx) => (
                <div key={idx} className="w-4 h-4 rounded-full border-2 border-[#0a051a] z-10" style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}` }} />
              ))}
            </div>
          </div>
          <div className="col-span-11 relative h-[600px]">
            {PROG_DATA.map((item, index) => (
              <div key={index} ref={el => (contentRefs.current[index] = el)} className="absolute inset-0 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 space-y-8">
                  <span className="text-7xl lg:text-9xl font-black opacity-10 block leading-none" style={{ WebkitTextStroke: `1px ${item.color}` }}>{item.week}</span>
                  <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">{item.title}</h2>
                  <div className="flex gap-4 pt-2">
                    <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm flex items-center gap-2"><Layers size={14} /> {item.sessions} Sessions</span>
                    <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> {item.labs} Labs</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-3 text-white/80"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /><span className="text-lg font-light">{topic}</span></li>
                    ))}
                  </ul>
                  <p className="text-xl italic text-white/40 pt-8 border-t border-white/5">"{item.quote}"</p>
                </div>
                <div className="flex-1 w-full max-w-xl">
                  <div className="relative group">
                    <div className="absolute -inset-4 rounded-xl opacity-20 blur-2xl" style={{ backgroundColor: item.color }} />
                    <div className="relative bg-[#0d0d1f] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                        <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500/50" /><div className="w-3 h-3 rounded-full bg-yellow-500/50" /><div className="w-3 h-3 rounded-full bg-green-500/50" /></div>
                        <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest"><Terminal size={12} />Cisco IOS</div>
                      </div>
                      <div className="p-6 font-mono text-sm leading-relaxed">
                        {item.cmd.split('\n').map((line, lIdx) => (
                          <div key={lIdx} className="flex gap-4"><span className="text-white/20">{String(lIdx + 1).padStart(2, '0')}</span><span className="text-blue-400">{line}</span></div>
                        ))}
                        <div className="mt-4 flex gap-2 animate-pulse"><span className="text-green-400">Router(config)#</span><div className="w-2 h-5 bg-white/50" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROG VIBE 2 — Horizontal Scroll Cards
═══════════════════════════════════════════════════════════════════════════ */
function ProgVibe2() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(triggerRef.current, { x: 0 }, {
        x: () => -(triggerRef.current.scrollWidth - window.innerWidth), ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, pin: true, scrub: 0.5, start: 'top top', end: () => `+=${triggerRef.current.scrollWidth}`, invalidateOnRefresh: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#0a051a] text-slate-200">
      <ProgVibeBadge n="C2 — Horizontal" />
      <div ref={triggerRef} className="flex h-full w-fit flex-row flex-nowrap items-center">
        <div className="relative flex h-full w-screen shrink-0 items-center justify-center p-12">
          <div className="max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-purple-500">Le Parcours Expert</span>
            <h2 className="text-6xl font-black tracking-tight md:text-8xl">4 semaines. <br /><span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">1 objectif.</span></h2>
            <p className="mx-auto mt-8 max-w-xl text-lg text-slate-400 leading-relaxed">Un programme intensif conçu pour passer de débutant à certifié Cisco CCST.</p>
            <div className="mt-12 flex items-center justify-center gap-4 text-slate-500"><ChevronRight className="h-4 w-4" /> Scrollez pour explorer</div>
          </div>
        </div>
        {PROG_DATA.map((week, idx) => {
          const WeekIcon = week.icon;
          return (
            <div key={idx} className="relative flex h-full w-screen shrink-0 items-center justify-center p-6 md:p-12 lg:p-20">
              <div className="grid h-full max-h-[800px] w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <div className="relative flex flex-col justify-center">
                  <div className="absolute -top-12 -left-8 select-none text-[15rem] font-black leading-none opacity-5 blur-[2px]" style={{ color: week.color }}>0{idx + 1}</div>
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold" style={{ backgroundColor: `${week.color}20`, color: week.color, border: `1px solid ${week.color}40` }}>W{idx + 1}</span>
                      <div className="h-px w-12 bg-slate-800" />
                      <span className="text-sm font-semibold tracking-widest text-slate-500 uppercase">Module {idx + 1}</span>
                    </div>
                    <h3 className="text-4xl font-bold tracking-tight text-white md:text-6xl">{week.title}</h3>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-medium"><Cpu className="h-4 w-4 text-blue-400" />{week.sessions} Sessions Live</div>
                      <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-medium"><Zap className="h-4 w-4 text-amber-400" />{week.labs} Labs Pratiques</div>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {week.tags.map((tag, i) => (
                        <span key={i} className="rounded-md border border-slate-800 px-3 py-1 text-xs font-mono uppercase tracking-wider text-slate-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <h4 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400"><Layers className="h-4 w-4" /> Programme Détaillé</h4>
                    <ul className="space-y-4">
                      {week.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 shrink-0" style={{ color: week.color }} /><span className="text-slate-300 leading-snug">{topic}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#050510] shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-4 py-2">
                      <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500/50" /><div className="h-3 w-3 rounded-full bg-amber-500/50" /><div className="h-3 w-3 rounded-full bg-emerald-500/50" /></div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase"><Terminal className="h-3 w-3" /> Cisco_IOS</div>
                    </div>
                    <div className="p-5 font-mono text-sm leading-relaxed">
                      {week.cmd.split('\n').map((line, i) => (
                        <div key={i} className="flex gap-3"><span className="select-none text-slate-700">{i + 1}</span><span className="text-blue-400/80">{line}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROG VIBE 3 — Stacked Cards Reveal
═══════════════════════════════════════════════════════════════════════════ */
function ProgVibe3() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: `+=${cards.length * 100}%`, pin: true, scrub: 1, anticipatePin: 1 },
      });
      tl.to(titleRef.current, { opacity: 0, y: -100, scale: 0.9, duration: 0.5 }, 0);
      cards.forEach((card, index) => {
        if (index === 0) return;
        tl.fromTo(card, { y: '120vh' }, { y: `${index * 20}px`, duration: 1, ease: 'power2.inOut' }, index - 0.5);
        for (let j = 0; j < index; j++) {
          tl.to(cards[j], { scale: 1 - (index - j) * 0.04, y: (j * 20) - ((index - j) * 15), filter: `brightness(${1 - (index - j) * 0.2})`, duration: 1, ease: 'power2.inOut' }, index - 0.5);
        }
      });
      tl.to({}, { duration: 0.5 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#0a051a] overflow-hidden">
      <ProgVibeBadge n="C3 — Stacked" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
        <div ref={titleRef} className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-0 w-full">
          <h2 className="text-[clamp(4rem,15vw,12rem)] font-black tracking-tighter text-white/[0.03] uppercase leading-none select-none">Programme</h2>
          <p className="text-purple-400 font-mono tracking-widest uppercase text-sm -mt-4 opacity-50">4 Semaines d'Immersion Intensive</p>
        </div>
        <div className="relative w-full max-w-4xl h-[600px] mt-12">
          {PROG_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} ref={el => (cardsRef.current[idx] = el)} className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ zIndex: idx + 10 }}>
                <div className="w-full h-full bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row" style={{ borderLeft: `4px solid ${item.color}`, boxShadow: `inset 0 0 40px ${item.color}10` }}>
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-2xl bg-white/5 flex items-center justify-center" style={{ color: item.color }}><Icon size={32} strokeWidth={1.5} /></div>
                        <div><span className="text-xs font-mono text-white/40 tracking-widest uppercase">Semaine {item.week}</span><h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{item.title}</h3></div>
                      </div>
                      <p className="text-lg text-white/80 font-medium mb-8 leading-relaxed italic">"{item.quote}"</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {item.topics.map((topic, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-[11px] font-mono border border-white/10 bg-white/5 text-white/60 uppercase tracking-wider">{topic}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-8 items-center pt-6 border-t border-white/5">
                      <div className="flex flex-col"><span className="text-2xl font-bold text-white leading-none">{item.sessions}</span><span className="text-[10px] text-white/40 uppercase mt-1">Sessions Live</span></div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="flex flex-col"><span className="text-2xl font-bold text-white leading-none">{item.labs}</span><span className="text-[10px] text-white/40 uppercase mt-1">Labs Pratiques</span></div>
                    </div>
                  </div>
                  <div className="w-full md:w-[45%] bg-black/40 p-6 flex flex-col font-mono relative">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                      <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" /></div>
                      <div className="flex items-center gap-2 text-white/30 text-[10px]"><Terminal size={12} /><span>CISCO-CLI</span></div>
                    </div>
                    <pre className="text-sm leading-relaxed flex-1">
                      {item.cmd.split('\n').map((line, i) => (
                        <div key={i} className="flex gap-4"><span className="text-white/10 select-none w-4 inline-block text-right">{i + 1}</span><span className="text-blue-400/80">{line}</span></div>
                      ))}
                    </pre>
                    <div className="absolute bottom-6 right-6 text-7xl font-black opacity-10 select-none tracking-tighter italic" style={{ color: item.color }}>{item.week}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROG VIBE 4 — Accordion Expand
═══════════════════════════════════════════════════════════════════════════ */
function ProgVibe4() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: triggerRef.current, start: 'top top', end: '+=300%', pin: true, scrub: 1, anticipatePin: 1 },
      });
      PROG_DATA.forEach((_, index) => {
        if (index === 0) return;
        const prevItem = itemsRef.current[index - 1];
        const currentItem = itemsRef.current[index];
        if (prevItem?.content && currentItem?.content) {
          tl.to(prevItem.content, { height: 0, opacity: 0, duration: 1, ease: 'power2.inOut' }, `step-${index}`);
          tl.to(currentItem.content, { height: 'auto', opacity: 1, duration: 1, ease: 'power2.inOut' }, `step-${index}`);
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a051a] text-slate-200 overflow-hidden">
      <ProgVibeBadge n="C4 — Accordion" />
      <div ref={triggerRef} className="h-screen flex flex-col justify-center items-center px-6 lg:px-24 py-12">
        <div className="w-full max-w-6xl mx-auto flex flex-col h-full max-h-[85vh]">
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold mb-3 block">Curriculum d'Excellence</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-2">Le Programme <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">CCST Cisco</span></h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
          </div>
          <div className="flex flex-col gap-3 flex-grow">
            {PROG_DATA.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="rounded-2xl border border-white/10 overflow-hidden backdrop-blur-md" style={{ borderLeft: `4px solid ${item.color}` }}>
                  <div ref={el => { if (el) itemsRef.current[idx] = { ...itemsRef.current[idx], header: el }; }} className={`px-8 py-5 flex items-center justify-between ${idx === 0 ? 'bg-white/10' : 'bg-white/5'}`}>
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-sm opacity-40 font-bold">{item.week}</span>
                      <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">{item.title}<div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }} /></h3>
                    </div>
                    <div className="hidden md:flex gap-2">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div ref={el => { if (el) itemsRef.current[idx] = { ...itemsRef.current[idx], content: el }; }} className="overflow-hidden bg-white/[0.02]" style={{ height: idx === 0 ? 'auto' : 0, opacity: idx === 0 ? 1 : 0 }}>
                    <div className="p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-7 space-y-8">
                        <div className="flex items-start gap-6">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0" style={{ color: item.color }}><Icon size={32} strokeWidth={1.5} /></div>
                          <div>
                            <p className="text-lg text-slate-300 italic leading-relaxed mb-4">"{item.quote}"</p>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-2 text-sm font-medium text-white/60"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{item.sessions} Sessions</span>
                              <span className="flex items-center gap-2 text-sm font-medium text-white/60"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />{item.labs} Labs</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {item.topics.map((topic, i) => (
                            <div key={i} className="flex items-center gap-3"><CheckCircle size={18} style={{ color: item.color }} className="shrink-0" /><span className="text-sm text-slate-400">{topic}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-5 relative">
                        <div className="relative bg-[#05020d] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/30" /><div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" /></div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest"><Terminal size={10} />Console</div>
                          </div>
                          <div className="p-5 font-mono text-[13px] leading-relaxed">
                            {item.cmd.split('\n').map((line, i) => (
                              <div key={i} className="flex gap-3 mb-1"><span className="text-slate-600 select-none">{i + 1}</span><span className="text-slate-300">{line}</span></div>
                            ))}
                            <div className="w-2 h-4 bg-emerald-500 inline-block align-middle animate-pulse ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROG VIBE 5 — Split Screen Journey
═══════════════════════════════════════════════════════════════════════════ */
function ProgVibe5() {
  const containerRef = useRef(null);
  const rightPanelRef = useRef(null);
  const weekNumRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const weeks = gsap.utils.toArray('.pv5-week');
      ScrollTrigger.create({ trigger: containerRef.current, start: 'top top', end: `+=${weeks.length * 100}%`, pin: true, scrub: true });
      gsap.to(rightPanelRef.current, {
        y: () => -(rightPanelRef.current.offsetHeight - window.innerHeight), ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: `+=${weeks.length * 100}%`, scrub: 0.5,
          onUpdate: (self) => {
            const index = Math.min(Math.floor(self.progress * weeks.length), weeks.length - 1);
            const d = PROG_DATA[index];
            if (weekNumRef.current) { weekNumRef.current.textContent = `W${d.week}`; weekNumRef.current.style.color = d.color; weekNumRef.current.style.textShadow = `0 0 40px ${d.color}66`; }
            if (progressRef.current) { const offset = 377 - (377 * (index + 1)) / 4; progressRef.current.style.strokeDashoffset = offset; progressRef.current.style.color = d.color; }
          },
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0a051a] text-white flex overflow-hidden">
      <ProgVibeBadge n="C5 — Split" />
      <div className="w-1/2 h-full relative flex flex-col items-center justify-center border-r border-white/5 z-10">
        <div className="absolute top-12 left-12">
          <h2 className="text-sm font-mono tracking-widest text-white/40 uppercase">Curriculum détaillé</h2>
          <p className="text-2xl font-bold mt-1">4 semaines. 1 objectif.</p>
        </div>
        <div className="relative">
          <div className="text-[24rem] font-black leading-none tracking-tighter opacity-10 select-none text-purple-500">01</div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div ref={weekNumRef} className="text-8xl font-black mb-2" style={{ color: '#a855f7', textShadow: '0 0 40px rgba(168,85,247,0.4)' }}>W01</div>
            <div className="relative w-32 h-32 mt-4">
              <svg className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/10" />
                <circle ref={progressRef} cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={377} className="text-purple-500 transition-all duration-700 ease-out" style={{ strokeDashoffset: 377 - 377 / 4 }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold">1/4</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-12 flex items-center gap-4">
          <div className="flex -space-x-2">
            {PROG_DATA.map((p, idx) => (
              <div key={idx} className="w-3 h-3 rounded-full border border-[#0a051a]" style={{ backgroundColor: p.color }} />
            ))}
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-white/40">Progression du parcours</span>
        </div>
      </div>
      <div className="w-1/2 h-full relative overflow-hidden">
        <div ref={rightPanelRef} className="flex flex-col">
          {PROG_DATA.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="pv5-week min-h-screen flex flex-col justify-center p-20 relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10" style={{ color: item.color }}><Icon size={32} strokeWidth={1.5} /></div>
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider opacity-40 mb-1">Semaine {item.week}</div>
                    <h3 className="text-4xl font-bold tracking-tight">{item.title}</h3>
                  </div>
                </div>
                <p className="text-xl text-white/60 mb-8 border-l-2 pl-6" style={{ borderColor: item.color }}>"{item.quote}"</p>
                <div className="flex gap-3 mb-10">
                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium">{item.sessions} Sessions Live</span>
                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium">{item.labs} Labs Pratiques</span>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {item.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-3"><CheckCircle className="w-5 h-5" style={{ color: item.color }} /><span className="text-white/80">{topic}</span></div>
                  ))}
                </div>
                <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-black/60 font-mono text-sm shadow-2xl">
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-white/30 text-xs flex items-center gap-2"><Terminal size={12} />cisco-terminal</span>
                  </div>
                  <div className="p-4 leading-relaxed">
                    {item.cmd.split('\n').map((line, i) => (
                      <div key={i} className="flex gap-3"><span className="text-white/20 select-none w-4">{i + 1}</span><span className="text-white/70"><span style={{ color: item.color }}>$</span> {line}</span></div>
                    ))}
                    <div className="mt-1 w-2 h-4 bg-white/50 animate-pulse inline-block align-middle" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-20 right-20 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            );
          })}
          <div className="h-[20vh]" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARTNER VIBES DATA
═══════════════════════════════════════════════════════════════════════════ */
const PARTNER_VB_DATA = [
  { name: 'Cisco', tag: 'Partenaire réseau', desc: 'Certification CCST & CCNA officielle', accent: '#049fd9', type: 'img', src: 'https://cdn.simpleicons.org/cisco/ffffff' },
  { name: 'Qualiopi', tag: 'Certification qualité', desc: 'Label qualité formation professionnelle', accent: '#1a56db', type: 'badge', abbr: 'Q' },
  { name: 'NET Academy', tag: 'Centre de formation', desc: 'Centre agréé Cisco Networking', accent: '#a855f7', type: 'badge', abbr: 'NA' },
];

const PartnerVibeBadge = ({ n }) => (
  <div className="absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur text-white text-xs font-bold tracking-widest border border-blue-400/40">
    PARTNER {n}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   PARTNER L1 — Horizontal Logo Bar (Glassmorphism Cards)
═══════════════════════════════════════════════════════════════════════════ */
function PartnerVibe1() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 70%', end: '+=80%', scrub: 0.15 },
      });
      tl.fromTo('.l1-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
      tl.fromTo('.l1-card', { y: 60, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.2');
      tl.fromTo('.l1-footer', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, '-=0.2');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full min-h-screen bg-[#0a051a] flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      <PartnerVibeBadge n="L1 — Logo Bar" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#049fd9]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="l1-header flex flex-col items-center mb-16 opacity-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20" />
            <h2 className="text-[11px] uppercase tracking-[0.3em] font-medium text-white/40">Nos partenaires</h2>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-white/5 to-transparent mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PARTNER_VB_DATA.map((p, i) => (
            <div key={i} className="l1-card group relative opacity-0">
              <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${p.accent}33 0%, transparent 70%)` }} />
              <div className="relative h-full flex items-center p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.05] group-hover:-translate-y-1">
                <div className="flex-shrink-0 mr-6">
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-lg bg-black/40 border border-white/[0.05] shadow-inner overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    {p.type === 'img' ? (
                      <img src={p.src} alt={p.name} className="w-8 h-8 object-contain brightness-110 contrast-125" />
                    ) : (
                      <span className="text-lg font-bold tracking-tighter" style={{ color: p.accent }}>{p.abbr}</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08]" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white tracking-tight leading-none">{p.name}</h3>
                    <div className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: p.accent }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: p.accent }}>{p.tag}</span>
                  <p className="text-[12px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-500 line-clamp-2">{p.desc}</p>
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${p.accent}22, transparent 70%)`, borderRadius: '0 0.75rem 0 0' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="l1-footer mt-16 flex justify-center opacity-0">
          <div className="px-4 py-2 rounded-full border border-white/[0.03] bg-white/[0.01] flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Accréditations vérifiées 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARTNER L2 — Floating Cards Grid (Asymmetric, Cisco Hero)
═══════════════════════════════════════════════════════════════════════════ */
function PartnerVibe2() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 70%', end: '+=90%', scrub: 0.15 },
      });
      tl.fromTo('.l2-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
      tl.fromTo('.l2-title', { y: 40, opacity: 0, letterSpacing: '0.5em' }, { y: 0, opacity: 1, letterSpacing: '0.15em', duration: 0.5 }, '-=0.1');
      tl.fromTo('.l2-line', { scaleX: 0 }, { scaleX: 1, duration: 0.3 }, '-=0.3');
      tl.fromTo('.l2-card', { y: 80, opacity: 0, rotateX: 8 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out' }, '-=0.1');
      tl.fromTo('.l2-footer', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, '-=0.3');
    }, ref);
    return () => ctx.revert();
  }, []);

  const partners = [
    { id: 'cisco', name: 'Cisco', tag: 'Partenaire réseau', desc: 'Leader mondial des technologies réseau, fournissant le cadre officiel et les certifications CCST.', accent: '#049fd9', isMain: true,
      logo: <img src="https://cdn.simpleicons.org/cisco/ffffff" alt="Cisco" className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" /> },
    { id: 'qualiopi', name: 'Qualiopi', tag: 'Certification qualité', desc: 'Atteste de la qualité du processus mis en œuvre par les prestataires d\'actions concourant au développement des compétences.', accent: '#1a56db', isMain: false,
      logo: <div className="w-full h-full flex items-center justify-center bg-[#1a56db] rounded-xl text-white font-black text-2xl group-hover:shadow-[0_0_20px_rgba(26,86,219,0.4)] transition-all">Q</div> },
    { id: 'netacademy', name: 'NET Academy', tag: 'Centre de formation', desc: 'Centre d\'excellence académique spécialisé dans le déploiement des infrastructures Cisco de nouvelle génération.', accent: '#a855f7', isMain: false,
      logo: <div className="w-full h-full flex items-center justify-center bg-[#a855f7] rounded-xl text-white font-bold text-xl group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">NA</div> },
  ];

  const PartnerCard = ({ partner, icon: Icon }) => (
    <div className={`l2-card relative group opacity-0 ${partner.isMain ? 'lg:col-span-4 lg:-mt-4' : 'lg:col-span-3 lg:mt-4'}`}>
      <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[2px] blur-[2px] z-20"
        style={{ background: `linear-gradient(90deg, transparent, ${partner.accent}, transparent)` }} />
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1/2 h-8 blur-2xl opacity-20 z-10"
        style={{ backgroundColor: partner.accent }} />
      <div className="relative overflow-hidden h-full bg-[#110c26]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 transition-all duration-500 ease-out hover:border-white/10 hover:bg-[#150f30]/80 hover:-translate-y-2 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${partner.isMain ? 'w-20 h-20' : 'w-16 h-16'} bg-white/5`}>
            {partner.logo ? partner.logo : <Icon size={partner.isMain ? 40 : 32} style={{ color: partner.accent }} strokeWidth={1.5} />}
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border bg-white/5 border-white/10 text-white/60 group-hover:text-white group-hover:border-white/20">{partner.tag}</span>
        </div>
        <div className="mt-auto space-y-3">
          <h3 className={`font-medium text-white tracking-tight ${partner.isMain ? 'text-2xl' : 'text-xl'}`}>{partner.name}</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">{partner.desc}</p>
        </div>
        <div className="absolute -bottom-12 -right-12 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20"
          style={{ backgroundColor: partner.accent }} />
      </div>
    </div>
  );

  return (
    <section ref={ref} className="relative min-h-screen py-24 px-6 overflow-hidden bg-[#0a051a] flex flex-col items-center justify-center">
      <PartnerVibeBadge n="L2 — Floating Cards" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center space-y-4">
          <div className="l2-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2 opacity-0">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-blue-400">Collaborations</span>
          </div>
          <h2 className="l2-title text-4xl md:text-5xl font-light text-white tracking-widest uppercase opacity-0">
            Nos <span className="font-semibold">partenaires</span>
          </h2>
          <div className="l2-line w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-6 origin-center" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
          <PartnerCard partner={partners[1]} icon={ShieldCheck} />
          <PartnerCard partner={partners[0]} icon={Network} />
          <PartnerCard partner={partners[2]} icon={GraduationCap} />
        </div>

        <div className="l2-footer mt-20 flex justify-center opacity-0">
          <p className="text-slate-500 text-[11px] tracking-[0.4em] uppercase font-medium">Formations certifiantes reconnues par l'état</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARTNER L3 — Inline Trust Strip
═══════════════════════════════════════════════════════════════════════════ */
function PartnerVibe3() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 70%', end: '+=70%', scrub: 0.15 },
      });
      tl.fromTo('.l3-label', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
      tl.fromTo('.l3-sep', { scaleY: 0 }, { scaleY: 1, duration: 0.2, transformOrigin: 'top' }, '-=0.1');
      tl.fromTo('.l3-partner', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'power2.out' }, '-=0.1');
      tl.fromTo('.l3-cta', { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 }, '-=0.2');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0a051a] flex items-center justify-center overflow-hidden">
      <PartnerVibeBadge n="L3 — Trust Strip" />
      <div className="w-full border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4 md:h-16">
            <div className="l3-label flex items-center gap-3 shrink-0 opacity-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#049fd9] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 whitespace-nowrap">Nos partenaires</span>
            </div>

            <div className="l3-sep hidden md:block h-6 w-px bg-white/10 mx-4 origin-top" />

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4 md:gap-x-12 flex-1">
              {/* Cisco */}
              <div className="l3-partner flex items-center gap-3 group opacity-0">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#049fd9]/40 transition-colors duration-300">
                  <img src="https://cdn.simpleicons.org/cisco/ffffff" alt="Cisco" className="w-5 h-5 object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-white/90 leading-tight">Cisco</span>
                  <span className="text-[9px] font-medium text-[#049fd9] uppercase tracking-wider opacity-80">Certification Official</span>
                </div>
              </div>

              <div className="hidden lg:block h-4 w-px bg-white/5" />

              {/* Qualiopi */}
              <div className="l3-partner flex items-center gap-3 group opacity-0">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#1a56db]/40 transition-colors duration-300">
                  <ShieldCheck className="w-4 h-4 text-white group-hover:text-[#1a56db] transition-colors" strokeWidth={2.5} />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1a56db] opacity-40" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1a56db]" />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-white/90 leading-tight">Qualiopi</span>
                  <div className="inline-flex items-center bg-[#1a56db]/10 px-1.5 py-0.5 rounded border border-[#1a56db]/20">
                    <span className="text-[8px] font-bold text-[#1a56db] uppercase tracking-tighter italic">Processus certifié</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block h-4 w-px bg-white/5" />

              {/* NET Academy */}
              <div className="l3-partner flex items-center gap-3 group opacity-0">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#a855f7]/40 transition-colors duration-300 overflow-hidden">
                  <GraduationCap className="w-4 h-4 text-white group-hover:text-[#a855f7] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#a855f7] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-white/90 leading-tight">NET Academy</span>
                    <Award className="w-3 h-3 text-[#a855f7]" />
                  </div>
                  <span className="text-[9px] font-medium text-[#a855f7] uppercase tracking-wider opacity-80">Partner Elite</span>
                </div>
              </div>
            </div>

            <div className="l3-cta hidden xl:flex items-center gap-2 group cursor-pointer opacity-0">
              <span className="text-[10px] text-white/20 group-hover:text-white/40 transition-colors uppercase tracking-widest font-medium">Voir accréditations</span>
              <div className="w-4 h-px bg-white/10 group-hover:bg-[#049fd9] group-hover:w-6 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PREVIEW PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function VibesPreview() {
  return (
    <div className="bg-[#0a051a]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a051a]/90 backdrop-blur border-b border-white/10 px-8 py-3 flex items-center justify-between">
        <p className="text-purple-400 text-xs font-bold uppercase tracking-widest hidden md:block">Preview — Vibes</p>
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[9px] text-slate-600 font-mono">Recrut→</span>
          {[1,2,3,4,5].map(n => (
            <a key={n} href={`#vibe-${n}`} className="text-[9px] font-bold text-slate-400 hover:text-purple-400 px-1 py-0.5 border border-white/10 rounded hover:border-purple-500/40">V{n}</a>
          ))}
          <span className="text-[9px] text-slate-600 font-mono mx-0.5">|Jobs→</span>
          {[1,2,3,4,5].map(n => (
            <a key={n} href={`#jobvibe-${n}`} className="text-[9px] font-bold text-slate-400 hover:text-emerald-400 px-1 py-0.5 border border-white/10 rounded hover:border-emerald-500/40">J{n}</a>
          ))}
          <span className="text-[9px] text-slate-600 font-mono mx-0.5">|Stats→</span>
          {[1,2,3,4,5].map(n => (
            <a key={n} href={`#statsvibe-${n}`} className="text-[9px] font-bold text-slate-400 hover:text-cyan-400 px-1 py-0.5 border border-white/10 rounded hover:border-cyan-500/40">S{n}</a>
          ))}
          <span className="text-[9px] text-slate-600 font-mono mx-0.5">|Sess→</span>
          {[1,2,3,4,5].map(n => (
            <a key={n} href={`#sessvibe-${n}`} className="text-[9px] font-bold text-slate-400 hover:text-orange-400 px-1 py-0.5 border border-white/10 rounded hover:border-orange-500/40">P{n}</a>
          ))}
          <span className="text-[9px] text-slate-600 font-mono mx-0.5">|How→</span>
          {[1,2,3,4,5].map(n => (
            <a key={n} href={`#howvibe-${n}`} className="text-[9px] font-bold text-slate-400 hover:text-amber-400 px-1 py-0.5 border border-white/10 rounded hover:border-amber-500/40">H{n}</a>
          ))}
          <span className="text-[9px] text-slate-600 font-mono mx-0.5">|Tools→</span>
          {[1,2,3,4,5].map(n => (
            <a key={n} href={`#toolsvibe-${n}`} className="text-[9px] font-bold text-slate-400 hover:text-teal-400 px-1 py-0.5 border border-white/10 rounded hover:border-teal-500/40">T{n}</a>
          ))}
          <span className="text-[9px] text-slate-600 font-mono mx-0.5">|Prog→</span>
          {[1,2,3,4,5].map(n => (
            <a key={n} href={`#progvibe-${n}`} className="text-[9px] font-bold text-slate-400 hover:text-rose-400 px-1 py-0.5 border border-white/10 rounded hover:border-rose-500/40">C{n}</a>
          ))}
          <span className="text-[9px] text-slate-600 font-mono mx-0.5">|Partners→</span>
          {[1,2,3].map(n => (
            <a key={n} href={`#partnervibe-${n}`} className="text-[9px] font-bold text-slate-400 hover:text-sky-400 px-1 py-0.5 border border-white/10 rounded hover:border-sky-500/40">L{n}</a>
          ))}
        </div>
      </div>

      <div id="vibe-1"><Vibe1 /></div>
      <div id="vibe-2"><Vibe2 /></div>
      <div id="vibe-3"><Vibe3 /></div>
      <div id="vibe-4"><Vibe4 /></div>
      <div id="vibe-5"><Vibe5 /></div>

      <div className="h-16 bg-[#0a051a] border-y border-white/5 flex items-center justify-center">
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">↓ Job Stats</p>
      </div>

      <div id="jobvibe-1"><JobVibe1 /></div>
      <div id="jobvibe-2"><JobVibe2 /></div>
      <div id="jobvibe-3"><JobVibe3 /></div>
      <div id="jobvibe-4"><JobVibe4 /></div>
      <div id="jobvibe-5"><JobVibe5 /></div>

      <div className="h-16 bg-[#0a051a] border-y border-white/5 flex items-center justify-center">
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">↓ En chiffres</p>
      </div>

      <div id="statsvibe-1"><StatsVibe1 /></div>
      <div id="statsvibe-2"><StatsVibe2 /></div>
      <div id="statsvibe-3"><StatsVibe3 /></div>
      <div id="statsvibe-4"><StatsVibe4 /></div>
      <div id="statsvibe-5"><StatsVibe5 /></div>

      <div className="h-16 bg-[#0a051a] border-y border-white/5 flex items-center justify-center">
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">↓ Sessions / Programme</p>
      </div>

      <div id="sessvibe-1"><SessVibe1 /></div>
      <div id="sessvibe-2"><SessVibe2 /></div>
      <div id="sessvibe-3"><SessVibe3 /></div>
      <div id="sessvibe-4"><SessVibe4 /></div>
      <div id="sessvibe-5"><SessVibe5 /></div>

      <div className="h-16 bg-[#0a051a] border-y border-white/5 flex items-center justify-center">
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">↓ Comment ça marche</p>
      </div>

      <div id="howvibe-1"><HowVibe1 /></div>
      <div id="howvibe-2"><HowVibe2 /></div>
      <div id="howvibe-3"><HowVibe3 /></div>
      <div id="howvibe-4"><HowVibe4 /></div>
      <div id="howvibe-5"><HowVibe5 /></div>

      <div className="h-16 bg-[#0a051a] border-y border-white/5 flex items-center justify-center">
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">↓ Outils intégrés</p>
      </div>

      <div id="toolsvibe-1"><ToolsVibe1 /></div>
      <div id="toolsvibe-2"><ToolsVibe2 /></div>
      <div id="toolsvibe-3"><ToolsVibe3 /></div>
      <div id="toolsvibe-4"><ToolsVibe4 /></div>
      <div id="toolsvibe-5"><ToolsVibe5 /></div>

      <div className="h-16 bg-[#0a051a] border-y border-white/5 flex items-center justify-center">
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">↓ Programme Vibes</p>
      </div>

      <div id="progvibe-1"><ProgVibe1 /></div>
      <div id="progvibe-2"><ProgVibe2 /></div>
      <div id="progvibe-3"><ProgVibe3 /></div>
      <div id="progvibe-4"><ProgVibe4 /></div>
      <div id="progvibe-5"><ProgVibe5 /></div>

      <div className="h-16 bg-[#0a051a] border-y border-white/5 flex items-center justify-center">
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">↓ Partenaires Vibes</p>
      </div>

      <div id="partnervibe-1"><PartnerVibe1 /></div>
      <div id="partnervibe-2"><PartnerVibe2 /></div>
      <div id="partnervibe-3"><PartnerVibe3 /></div>

      <div className="h-20 bg-[#0a051a] flex items-center justify-center">
        <p className="text-slate-600 text-xs font-mono">← Choisis ton vibe et dis-le moi</p>
      </div>
    </div>
  );
}
