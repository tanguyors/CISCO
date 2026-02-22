import React, { useState } from 'react';
import {
  Terminal, ChevronRight, ChevronDown, ChevronLeft, Shield, Layers, Network, Globe,
  CheckCircle2, Lock, ArrowLeft, ArrowRight, BookOpen, Monitor, MoreVertical,
  ShieldCheck, Settings, Cpu, Zap, Layout, Code, Check, PlayCircle, Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ═══════════════════════════════════════════
// VIBE 1 — Clean Emerald (Course Layout)
// ═══════════════════════════════════════════

const COURSE_STRUCTURE = [
  {
    id: 'w1', title: 'Semaine 1 - SSH & Sécurité',
    sessions: [
      { id: 's1-1', title: 'Introduction au protocole SSH', isCompleted: true, isLocked: false },
      { id: 's1-2', title: 'Configuration RSA Keys', isCompleted: true, isLocked: false },
      { id: 's1-3', title: 'VTY Lines & Login Local', isCompleted: false, isLocked: false },
    ]
  },
  {
    id: 'w2', title: 'Semaine 2 - VLANs & Trunk',
    sessions: [
      { id: 's2-1', title: 'Concept de Segmentation', isCompleted: false, isLocked: true },
      { id: 's2-2', title: '802.1Q Encapsulation', isCompleted: false, isLocked: true },
    ]
  },
  {
    id: 'w3', title: 'Semaine 3 - DHCP & DNS',
    sessions: [
      { id: 's3-1', title: 'DHCP Pool Configuration', isCompleted: false, isLocked: true },
      { id: 's3-2', title: 'Relay Agent Setup', isCompleted: false, isLocked: true },
    ]
  }
];

const Vibe1ProgressBar = ({ progress }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
      <span>Progression Globale</span>
      <span className="text-emerald-500">{progress}%</span>
    </div>
    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
    </div>
  </div>
);

const Vibe1SidebarItem = ({ week, isOpen, onToggle }) => (
  <div className="border-b border-zinc-800/50">
    <button onClick={onToggle} className="w-full flex items-center justify-between p-4 hover:bg-zinc-900/50 transition-colors group">
      <div className="flex items-center gap-3">
        <div className={cn("p-1.5 rounded-md border transition-colors", isOpen ? "border-emerald-500/50 bg-emerald-500/10" : "border-zinc-700 bg-zinc-800 group-hover:border-zinc-500")}>
          {week.id === 'w1' && <Shield size={14} className={isOpen ? "text-emerald-500" : "text-zinc-400"} />}
          {week.id === 'w2' && <Layers size={14} className={isOpen ? "text-emerald-500" : "text-zinc-400"} />}
          {week.id === 'w3' && <Globe size={14} className={isOpen ? "text-emerald-500" : "text-zinc-400"} />}
        </div>
        <span className={cn("text-xs font-semibold text-left transition-colors", isOpen ? "text-white" : "text-zinc-400")}>{week.title}</span>
      </div>
      <ChevronDown size={14} className={cn("text-zinc-500 transition-transform duration-300", isOpen && "rotate-180")} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-[#0c0c0c]">
          {week.sessions.map((session) => (
            <button key={session.id} disabled={session.isLocked}
              className={cn("w-full flex items-center gap-3 py-3 px-6 text-left hover:bg-zinc-900/80 transition-all border-l-2",
                session.id === 's1-1' ? "border-emerald-500 bg-emerald-500/5" : "border-transparent",
                session.isLocked && "opacity-40 cursor-not-allowed")}>
              {session.isCompleted ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                : session.isLocked ? <Lock size={14} className="text-zinc-600 shrink-0" />
                : <div className="w-3.5 h-3.5 rounded-full border border-zinc-600 shrink-0" />}
              <span className={cn("text-[11px] font-medium", session.id === 's1-1' ? "text-emerald-400" : "text-zinc-400")}>{session.title}</span>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Vibe1Terminal = ({ code }) => (
  <div className="relative group mt-6">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
    <div className="relative bg-black rounded-lg border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono"><Terminal size={10} /><span>cisco-ios-ssh-config</span></div>
      </div>
      <pre className="p-6 font-mono text-sm overflow-x-auto selection:bg-emerald-500/30">
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-zinc-700 select-none w-4 text-right">{i + 1}</span>
            <span className={cn(
              line.startsWith('!') ? 'text-zinc-600 italic' :
              line.includes('hostname') || line.includes('crypto') ? 'text-blue-400' :
              line.includes('enable') || line.includes('conf') ? 'text-emerald-400' : 'text-zinc-300'
            )}>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  </div>
);

const Vibe1 = () => {
  const [activeTab, setActiveTab] = useState('Théorie & Concepts');
  const [openWeek, setOpenWeek] = useState('w1');
  const tabs = ['Théorie & Concepts', 'Mémo Commandes', 'Validation'];
  const ciscoCode = `! Accéder au mode privilégié\nRouter> enable\nRouter# configure terminal\n! Définition du nom d'hôte\nRouter(config)# hostname R1\n! Configuration du domaine IP\nR1(config)# ip domain-name lab.netacademy.local\n! Génération de la paire de clés RSA\nR1(config)# crypto key generate rsa\nHow many bits in the modulus [512]: 1024`;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30">
      <aside className="w-[280px] border-r border-zinc-800 flex flex-col bg-[#0d0d0d] z-20">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center"><Terminal className="text-black" size={20} /></div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">NetAcademy</span>
          </div>
          <Vibe1ProgressBar progress={33} />
        </div>
        <nav className="flex-1 overflow-y-auto py-2 vibe-scrollbar">
          {COURSE_STRUCTURE.map((week) => (
            <Vibe1SidebarItem key={week.id} week={week} isOpen={openWeek === week.id} onToggle={() => setOpenWeek(openWeek === week.id ? null : week.id)} />
          ))}
        </nav>
        <div className="p-4 bg-zinc-900/30 border-t border-zinc-800">
          <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white">JD</div>
              <div className="text-left"><p className="text-xs font-semibold">Jean Dupont</p><p className="text-[10px] text-zinc-500">Etudiant CCNA</p></div>
            </div>
            <MoreVertical size={14} className="text-zinc-600" />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#0a0a0a]/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={cn("relative h-16 flex items-center text-xs font-bold uppercase tracking-widest transition-colors",
                  activeTab === tab ? "text-emerald-500" : "text-zinc-500 hover:text-zinc-300")}>
                {tab}
                {activeTab === tab && <motion.div layoutId="v1ActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_-4px_12px_rgba(16,185,129,0.8)]" />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-400">STATUS: CONNECTED</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 vibe-scrollbar">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 space-y-4">
              <div className="flex items-center gap-2 text-emerald-500/80 text-[10px] font-bold uppercase tracking-widest"><BookOpen size={12} /><span>Semaine 1 - Session 1.1</span></div>
              <h1 className="text-4xl font-black tracking-tight text-white leading-tight">
                Introduction au <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">protocole SSH</span>
              </h1>
              <p className="text-zinc-400 leading-relaxed text-lg max-w-2xl">Le Secure Shell (SSH) est un protocole de communication sécurisé. Contrairement à Telnet, tout le trafic est chiffré, empêchant l'interception de mots de passe en clair sur le réseau.</p>
            </div>
            <h3 className="text-white text-xl font-bold flex items-center gap-3 mb-2"><Monitor size={20} className="text-emerald-500" />Implémentation sur Cisco IOS</h3>
            <p className="text-zinc-400 mb-4">Pour activer SSH, le routeur doit posséder un <span className="text-zinc-200 font-mono bg-zinc-800 px-1 rounded">hostname</span> et un <span className="text-zinc-200 font-mono bg-zinc-800 px-1 rounded">domain-name</span>.</p>
            <Vibe1Terminal code={ciscoCode} />
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 flex gap-4 mt-8">
              <div className="p-2 h-fit bg-emerald-500/10 rounded-lg text-emerald-500"><CheckCircle2 size={20} /></div>
              <div>
                <h4 className="text-emerald-400 font-bold mb-1">Best Practice CCNA</h4>
                <p className="text-emerald-100/70 text-sm leading-relaxed">Utilisez toujours un module de clé d'au moins 1024 bits. SSH v2 est activé automatiquement si le module est supérieur ou égal à 768 bits.</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="h-20 border-t border-zinc-800 bg-[#0c0c0c] flex items-center px-8 z-10">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
            <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /><span className="text-xs font-bold uppercase tracking-widest">Précédent</span>
            </button>
            <div className="flex items-center gap-3">
              {[1,2,3,4,5].map((dot) => (<div key={dot} className={cn("h-1.5 rounded-full transition-all duration-300", dot === 1 ? "w-8 bg-emerald-500" : "w-1.5 bg-zinc-800")} />))}
            </div>
            <button className="flex items-center gap-3 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg transition-all group">
              <span className="text-xs font-black uppercase tracking-widest">Suivant</span><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

// ═══════════════════════════════════════════
// VIBE 2 — Purple Glassmorphism (Course Layout)
// ═══════════════════════════════════════════

const GlassCard = ({ children, className }) => (
  <div className={cn("bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden", className)}>{children}</div>
);

const Vibe2SidebarItem = ({ title, sessions, isOpen, toggle, icon: Icon, activeSession }) => (
  <div className="mb-2">
    <button onClick={toggle} className={cn("w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group",
      isOpen ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/[0.02] hover:text-slate-200")}>
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg transition-colors", isOpen ? "bg-purple-500/20 text-purple-400" : "bg-slate-800/50 group-hover:bg-slate-800")}><Icon size={18} /></div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-4 mt-1 border-l border-white/10">
          {sessions.map((session, idx) => (
            <button key={idx} className={cn("w-full text-left py-2 px-6 text-sm transition-colors relative flex items-center gap-3",
              session === activeSession ? "text-purple-400 font-medium" : "text-slate-500 hover:text-slate-300")}>
              {session === activeSession && <motion.div layoutId="v2ActiveSidebar" className="absolute left-0 w-1 h-4 bg-purple-500 rounded-full" />}
              {idx === 0 ? <CheckCircle2 size={14} className="text-emerald-500" /> : <PlayCircle size={14} />}
              {session}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Vibe2Terminal = ({ code }) => (
  <div className="w-full bg-[#0d0a1f] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono">
    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
      </div>
      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Cisco IOS - Console 0</div>
    </div>
    <div className="p-6 text-sm leading-relaxed">
      {code.map((line, i) => (
        <div key={i} className="flex gap-4">
          <span className="text-slate-700 select-none w-4 text-right">{i + 1}</span>
          <p className="text-slate-300">
            {line.startsWith('!') ? <span className="text-slate-600 italic">{line}</span>
              : line.includes('#') || line.includes('>') ? <><span className="text-emerald-400 font-bold">{line.split(' ')[0]}</span><span className="text-purple-400">{line.substring(line.indexOf(' '))}</span></>
              : <span className="text-blue-400">{line}</span>}
          </p>
        </div>
      ))}
      <div className="flex gap-4 mt-2"><span className="text-slate-700 select-none w-4 text-right">{code.length + 1}</span><div className="w-2 h-5 bg-purple-500/50 animate-pulse" /></div>
    </div>
  </div>
);

const Vibe2 = () => {
  const [openWeek, setOpenWeek] = useState(0);
  const [activeTab, setActiveTab] = useState('Théorie');
  const weeks = [
    { title: "Semaine 1 - SSH & Sécurité", icon: Shield, sessions: ["Introduction au protocole SSH", "Configuration VTY", "Génération de clés RSA"] },
    { title: "Semaine 2 - VLANs & Trunk", icon: Layers, sessions: ["Concepts VLAN", "Configuration Trunk 802.1Q", "Inter-VLAN Routing"] },
    { title: "Semaine 3 - DHCP & DNS", icon: Network, sessions: ["DHCP Server Config", "DHCP Relay Agent", "Client DNS"] }
  ];
  const ciscoCommands = ["! Accéder au mode privilégié","Router> enable","Router# configure terminal","! Définition du nom d'hôte","Router(config)# hostname R1","! Configuration du domaine IP pour SSH","R1(config)# ip domain-name academy.local","R1(config)# crypto key generate rsa","How many bits in the modulus [512]: 1024"];

  return (
    <div className="h-[calc(100vh-64px)] bg-[#0a051a] text-slate-200 selection:bg-purple-500/30 font-sans p-4 lg:p-6 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="mx-auto h-full flex gap-6 relative z-10">
        <aside className="w-[280px] hidden xl:flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20"><Terminal className="text-white" size={24} /></div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">NetAcademy</h1>
          </div>
          <GlassCard className="p-5 flex flex-col gap-4">
            <div className="flex justify-between items-end"><span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Progression Globale</span><span className="text-lg font-bold text-white">33%</span></div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "33%" }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_12px_rgba(168,85,247,0.4)]" />
            </div>
          </GlassCard>
          <nav className="flex-1 overflow-y-auto pr-2 vibe-scrollbar">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">Cursus Cisco CCNA</p>
            {weeks.map((week, idx) => (
              <Vibe2SidebarItem key={idx} {...week} isOpen={openWeek === idx} toggle={() => setOpenWeek(openWeek === idx ? null : idx)} activeSession="Introduction au protocole SSH" />
            ))}
          </nav>
          <GlassCard className="p-4 flex items-center gap-3 bg-purple-500/5 border-purple-500/20">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><BookOpen size={16} className="text-purple-400" /></div>
            <div><p className="text-xs font-medium text-white">Besoin d'aide ?</p><p className="text-[10px] text-slate-400">Consulter la documentation</p></div>
          </GlassCard>
        </aside>

        <main className="flex-1 flex flex-col gap-6">
          <header className="flex items-center justify-between">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              {['Théorie', 'Mémo Commandes', 'Validation'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={cn("px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative", activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300")}>
                  {activeTab === tab && <motion.div layoutId="v2TabBg" className="absolute inset-0 bg-white/10 rounded-lg shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab === 'Théorie' && <BookOpen size={14} />}{tab === 'Mémo Commandes' && <Command size={14} />}{tab === 'Validation' && <Check size={14} />}{tab}
                  </span>
                </button>
              ))}
            </div>
          </header>

          <GlassCard className="flex-1 p-8 sm:p-12 flex flex-col gap-8 overflow-y-auto vibe-scrollbar bg-gradient-to-b from-white/[0.04] to-transparent">
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex items-center gap-2 text-purple-400 mb-4"><span className="text-xs font-bold uppercase tracking-widest">Module 01</span><div className="w-1 h-1 rounded-full bg-slate-600" /><span className="text-xs font-medium text-slate-500">Sécurité des accès</span></div>
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Introduction au protocole SSH</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">Le protocole <span className="text-white font-semibold">Secure Shell (SSH)</span> est essentiel pour l'administration sécurisée des équipements réseau. Contrairement à Telnet, SSH crypte tout le trafic, y compris les mots de passe.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2"><CheckCircle2 size={16} /> Avantages</h4>
                  <ul className="space-y-2 text-sm text-slate-300"><li>- Chiffrement fort des données</li><li>- Authentification robuste</li><li>- Intégrité des messages</li></ul>
                </div>
                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2"><Shield size={16} /> Pré-requis</h4>
                  <ul className="space-y-2 text-sm text-slate-300"><li>- Hostname configuré</li><li>- Nom de domaine IP</li><li>- Paire de clés RSA générée</li></ul>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4"><Terminal size={20} className="text-purple-500" /> Configuration de base</h3>
              <Vibe2Terminal code={ciscoCommands} />
            </div>
          </GlassCard>

          <footer className="flex items-center justify-between gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all font-medium group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Précédent
            </button>
            <div className="flex items-center gap-3">
              {[...Array(6)].map((_, i) => (<div key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i === 0 ? "w-8 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" : "w-1.5 bg-white/10")} />))}
            </div>
            <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all group">
              Suivant <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// VIBE 3 — Cyberpunk Amber (Course Layout)
// ═══════════════════════════════════════════

const ScanlineOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
  </div>
);

const CyberBorder = ({ children, className }) => (
  <div className={cn("relative p-[1px] bg-amber-500/20", className)} style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500 z-10" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500 z-10" />
    <div className="bg-zinc-950/90 backdrop-blur-md h-full w-full" style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
      {children}
    </div>
  </div>
);

const Vibe3 = () => {
  const [expandedWeek, setExpandedWeek] = useState(0);
  const [activeTab, setActiveTab] = useState('theory');
  const weeks = [
    { id: 0, title: "SEMAINE 1 - SSH & SÉCURITÉ", sessions: ["Intro SSH", "Clés RSA", "Crypto Standards", "Lab 1.1"] },
    { id: 1, title: "SEMAINE 2 - VLANS & TRUNK", sessions: ["VTP Config", "Dot1Q Encapsulation", "Native VLAN"] },
    { id: 2, title: "SEMAINE 3 - DHCP & DNS", sessions: ["Pool Creation", "Relay Agent", "DNS Forwarding"] }
  ];

  return (
    <div className="h-[calc(100vh-64px)] bg-[#050505] text-amber-500 font-mono selection:bg-amber-500/30 overflow-hidden flex">
      <ScanlineOverlay />

      <aside className="w-[280px] h-full border-r border-amber-500/20 bg-zinc-950/50 flex flex-col relative z-10">
        <div className="p-6 border-b border-amber-500/20">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative"><Terminal className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" /><div className="absolute -inset-1 bg-amber-500/20 blur-md rounded-full group-hover:bg-amber-500/40" /></div>
            <div><h1 className="text-xl font-black tracking-tighter leading-none italic">NET<span className="text-amber-200">ACADEMY</span></h1><span className="text-[10px] text-amber-500/60 font-bold uppercase tracking-widest">Cisco Ops v4.0</span></div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider"><span>Progression Globale</span><span className="text-amber-200">33%</span></div>
          <div className="h-4 bg-amber-900/20 border border-amber-500/30 p-0.5 relative overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '33%' }} className="h-full bg-amber-500 relative" />
            <div className="absolute inset-0 flex justify-evenly pointer-events-none">{[...Array(10)].map((_, i) => (<div key={i} className="w-px h-full bg-zinc-950/50" />))}</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto vibe-scrollbar px-3 space-y-2">
          {weeks.map((week, idx) => (
            <div key={week.id} className="space-y-1">
              <button onClick={() => setExpandedWeek(expandedWeek === idx ? null : idx)}
                className={cn("w-full flex items-center justify-between p-3 text-[11px] font-bold uppercase transition-all duration-200 group border",
                  expandedWeek === idx ? "bg-amber-500/10 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]" : "bg-transparent border-transparent hover:bg-zinc-900/50 text-amber-500/60")}>
                <div className="flex items-center gap-3">
                  <div className={cn("w-1.5 h-1.5 rotate-45 border border-amber-500", expandedWeek === idx && "bg-amber-500")} />{week.title}
                </div>
                {expandedWeek === idx ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              <AnimatePresence>
                {expandedWeek === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-zinc-900/30 border-l-2 border-amber-500/30 ml-3.5">
                    {week.sessions.map((session, sIdx) => (
                      <button key={sIdx} className="w-full text-left p-3 pl-6 text-xs text-amber-500/50 hover:text-amber-200 hover:bg-amber-500/5 transition-colors flex items-center gap-2 group">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">_</span>{session}
                        {sIdx === 0 && week.id === 0 && <CheckCircle2 size={12} className="ml-auto text-amber-500" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-amber-500/20 bg-zinc-950">
          <div className="flex items-center gap-3 p-2 bg-amber-500/5 border border-amber-500/10">
            <div className="w-8 h-8 bg-amber-500/20 flex items-center justify-center"><Cpu size={16} /></div>
            <div className="text-[10px] font-bold"><div className="text-amber-200">ID_USER_882</div><div className="text-amber-500/50 uppercase">Student Tier 2</div></div>
            <Settings size={14} className="ml-auto opacity-50 hover:opacity-100" />
          </div>
        </div>
      </aside>

      <main className="flex-1 h-full flex flex-col relative overflow-hidden">
        <header className="h-16 border-b border-amber-500/20 px-8 flex items-center gap-1">
          {[
            { id: 'theory', label: 'Théorie & Concepts', icon: BookOpen },
            { id: 'memo', label: 'Mémo Commandes', icon: Code },
            { id: 'validation', label: 'Validation', icon: ShieldCheck }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn("relative h-full px-6 flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all",
                activeTab === tab.id ? "bg-amber-500 text-zinc-950" : "text-amber-500/40 hover:text-amber-500/80 hover:bg-amber-500/5")}
              style={{ transform: 'skewX(-12deg)' }}>
              <div style={{ transform: 'skewX(12deg)' }} className="flex items-center gap-2"><tab.icon size={16} />{tab.label}</div>
            </button>
          ))}
          <div className="ml-auto flex items-center gap-4 text-[10px] text-amber-500/40">
            <span className="flex items-center gap-2"><Zap size={12} /> LATENCY: 12ms</span>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-12 vibe-scrollbar relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="relative">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-500/50 mb-1"><span className="animate-pulse">●</span><span>SYSTEM.ROOT / SEC-1.1</span></div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter">Introduction au <br /><span className="text-amber-200 text-6xl">Protocole SSH</span></h2>
            </div>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-7 space-y-6">
                <p className="text-lg leading-relaxed text-amber-500/80 border-l-2 border-amber-500 pl-6">
                  Secure Shell (SSH) est le standard d'administration à distance sécurisé. Contrairement à Telnet, SSH chiffre tout le trafic, y compris les mots de passe.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[{ icon: Lock, title: "Encryption", desc: "Clés RSA/ECDSA" }, { icon: ShieldCheck, title: "Auth", desc: "User/Pass & Key-based" }].map((card, i) => (
                    <div key={i} className="bg-amber-500/5 border border-amber-500/20 p-4" style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}>
                      <div className="flex items-center gap-3 mb-2"><card.icon size={18} className="text-amber-200" /><span className="text-xs font-bold uppercase">{card.title}</span></div>
                      <p className="text-[10px] text-amber-500/60 uppercase">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-5">
                <CyberBorder className="h-full">
                  <div className="p-1 bg-amber-500 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-950 px-2 uppercase tracking-tighter flex items-center gap-1"><Layout size={10} /> CISCO_CLI_TERMINAL</span>
                  </div>
                  <div className="p-6 font-mono text-sm leading-6 relative">
                    <p className="text-amber-500/40">! Configuration de base</p>
                    <p><span className="text-amber-200">R1</span>&gt; <span className="text-amber-500">enable</span></p>
                    <p><span className="text-amber-200">R1</span># <span className="text-amber-500">configure terminal</span></p>
                    <p><span className="text-amber-200">R1(config)</span># <span className="text-amber-500">hostname R1_HQ</span></p>
                    <p><span className="text-amber-200">R1_HQ(config)</span># <span className="text-amber-500">ip domain-name lab.net</span></p>
                    <p className="pt-4 text-amber-500/40">! Génération de clé</p>
                    <p><span className="text-amber-200">R1_HQ(config)</span># <span className="text-amber-500">crypto key generate rsa</span></p>
                    <p className="text-zinc-500 text-xs italic">How many bits in the modulus [512]: 2048</p>
                    <div className="w-2 h-4 bg-amber-500 inline-block animate-[blink_1s_infinite] align-middle ml-1" />
                  </div>
                </CyberBorder>
              </div>
            </div>
          </div>
        </section>

        <footer className="h-24 border-t border-amber-500/20 bg-zinc-950/80 backdrop-blur-md px-12 flex items-center justify-between relative z-20">
          <button className="flex items-center gap-2 px-6 py-2 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-zinc-950 font-bold uppercase tracking-widest transition-all group"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}>
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Précédent
          </button>
          <div className="flex items-center gap-3">
            {[1,2,3,4,5,6].map((dot) => (<div key={dot} className={cn("w-2 h-2 rotate-45 border border-amber-500/50 transition-all duration-300", dot === 1 ? "bg-amber-500 scale-125 shadow-[0_0_10px_#f59e0b]" : "hover:border-amber-500")} />))}
          </div>
          <button className="flex items-center gap-2 px-8 py-2 bg-amber-500 text-zinc-950 font-black uppercase tracking-widest transition-all hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] group"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}>
            Suivant <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }` }} />
    </div>
  );
};

// ═══════════════════════════════════════════
// SELECTOR PAGE
// ═══════════════════════════════════════════
const VibesSelection = () => {
  const [selectedVibe, setSelectedVibe] = useState(1);

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-0 left-0 right-0 z-[60] bg-black/90 backdrop-blur-xl border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">Choisis ton vibe</h2>
          <div className="flex gap-3">
            <button onClick={() => setSelectedVibe(1)} className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${selectedVibe === 1 ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600'}`}>
              Vibe 1 — Clean Emerald
            </button>
            <button onClick={() => setSelectedVibe(2)} className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${selectedVibe === 2 ? 'bg-purple-500 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600'}`}>
              Vibe 2 — Purple Glass
            </button>
            <button onClick={() => setSelectedVibe(3)} className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${selectedVibe === 3 ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600'}`}>
              Vibe 3 — Cyberpunk Amber
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16">
        {selectedVibe === 1 && <Vibe1 />}
        {selectedVibe === 2 && <Vibe2 />}
        {selectedVibe === 3 && <Vibe3 />}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .vibe-scrollbar::-webkit-scrollbar { width: 4px; }
        .vibe-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .vibe-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        .vibe-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}} />
    </div>
  );
};

export default VibesSelection;
