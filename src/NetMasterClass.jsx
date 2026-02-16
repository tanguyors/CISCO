import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Terminal, CheckCircle, Award, 
  ChevronRight, ChevronLeft, Lock, Shield, 
  Cpu, RotateCcw, Menu, X, Globe,
  Clock, Save, Power, AlertCircle, Eye, AlertTriangle, Lightbulb, HardDrive, Microscope, Router as RouterIcon, Network, ArrowUpDown, Monitor, Command, MessageCircle, HelpCircle,
  BarChart3, TrendingUp, History, Target, Zap, Activity, Send, Key, User, Layout, Plus, Trash2, Link, Server, Video, Calendar, Wrench
} from 'lucide-react';

// Constante pour activer/désactiver la section Validation des acquis
const QUIZ_ENABLED = false; // Mettre à true pour réactiver le quiz et les exercices pratiques

// --- COMPOSANTS UI UTILITAIRES ---

const ProTip = ({ children }) => (
  <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-4 my-6 rounded-r-lg shadow-sm">
    <h5 className="text-emerald-400 font-bold flex items-center gap-2 mb-2 text-lg">
      <Lightbulb className="w-5 h-5" /> L'Astuce Pro
    </h5>
    <div className="text-emerald-100/90 text-base leading-relaxed">{children}</div>
  </div>
);

const DangerZone = ({ children }) => (
  <div className="bg-red-500/10 border-l-4 border-red-500 p-4 my-6 rounded-r-lg shadow-sm">
    <h5 className="text-red-400 font-bold flex items-center gap-2 mb-2 text-lg">
      <AlertTriangle className="w-5 h-5" /> Zone de Danger
    </h5>
    <div className="text-red-100/90 text-base leading-relaxed">{children}</div>
  </div>
);

// --- COMPOSANT : TRADUCTEUR HUMAIN ---
const HumanCommand = ({ cmd, human, context }) => (
  <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden my-4 shadow-md group hover:border-blue-500/50 transition-all">
    <div className="flex flex-col md:flex-row">
      {/* Partie Code */}
      <div className="bg-black/40 p-4 md:w-5/12 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-center">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
          <Terminal size={10}/> Langue Cisco (CLI)
        </span>
        <code className="text-emerald-400 font-bold text-lg font-mono">{cmd}</code>
      </div>

      {/* Partie Humaine */}
      <div className="p-4 md:w-7/12 bg-slate-800/50 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute right-0 top-0 text-slate-800 transform translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
          <MessageCircle size={100} />
        </div>
        <span className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
          <MessageCircle size={10}/> Traduction Humaine
        </span>
        <p className="text-slate-200 text-base italic leading-relaxed">"{human}"</p>
        {context && (
          <p className="text-slate-500 text-xs mt-2 border-t border-slate-700/50 pt-2">
            ℹ️ {context}
          </p>
        )}
      </div>
    </div>
  </div>
);

// --- TIMELINE : étapes numérotées 1-, 2-, 3- ---
const Timeline = ({ steps, className = '' }) => (
  <div className={`border-l-2 border-blue-500/50 pl-5 ml-1 space-y-3 ${className}`}>
    {steps.map((step, i) => (
      <div key={i} className="flex gap-3 items-start -ml-7">
        <span className="flex-shrink-0 w-7 text-right font-bold text-blue-400 tabular-nums">{i + 1}-</span>
        <div className="flex-1 text-slate-300">{step}</div>
      </div>
    ))}
  </div>
);

// --- COMPOSANT : SOUS LE CAPOT (Deep Dive) ---
const DeepDiveSection = ({ title, items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-3 my-8 border-t border-b border-slate-800 py-6">
      <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-4">
        <Microscope className="w-4 h-4" /> Pour les curieux (Détails Techniques)
      </h4>
      {items.map((item, idx) => (
        <div key={idx} className="border border-slate-700 rounded-lg bg-slate-800/30 overflow-hidden">
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-700/50 transition-colors"
          >
            <span className="font-bold text-slate-400 flex items-center gap-3 text-sm">
              <span className="bg-slate-800 w-6 h-6 rounded flex items-center justify-center text-xs text-slate-500 font-mono">{idx + 1}</span>
              {item.summary}
            </span>
            <ChevronRight className={`transform transition-transform ${openIndex === idx ? 'rotate-90' : ''} text-slate-500`} />
          </button>
          {openIndex === idx && (
            <div className="p-4 bg-black/20 border-t border-slate-700 text-slate-300 leading-relaxed text-sm font-mono">
              {item.details}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// --- COMPOSANTS INTERACTIFS ---

const ModeExplorer = () => {
  const [level, setLevel] = useState('user');

  const levels = {
    user: {
      title: "Mode Utilisateur",
      analogy: "Le Hall d'Entrée",
      desc: "Vous êtes dans le hall. Vous pouvez regarder les affiches au mur, mais toutes les portes sont fermées à clé.",
      human: "Je peux juste observer, pas toucher.",
      color: "bg-slate-600",
      prompt: "Router>"
    },
    priv: {
      title: "Mode Privilégié",
      analogy: "Le Bureau du Directeur",
      desc: "Vous avez le badge VIP. Vous pouvez ouvrir les dossiers confidentiels, redémarrer le système, tout voir.",
      human: "Je suis le chef ici.",
      color: "bg-blue-600",
      prompt: "Router#"
    },
    config: {
      title: "Mode Configuration",
      analogy: "Le Chantier",
      desc: "Vous avez mis votre casque de chantier. Vous cassez les murs, changez la peinture. C'est ici qu'on modifie le routeur.",
      human: "Je suis en train de bricoler les réglages.",
      color: "bg-red-600",
      prompt: "Router(config)#"
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col lg:flex-row gap-8 items-start shadow-xl">
      <div className="flex flex-col gap-3 w-full lg:w-1/3">
        <p className="text-xs text-slate-400 mb-2 uppercase font-bold tracking-wider">Choisissez votre badge :</p>
        {['config', 'priv', 'user'].map((lvl) => (
          <button 
            key={lvl}
            onClick={() => setLevel(lvl)} 
            className={`p-4 rounded-lg border-2 text-left transition-all relative overflow-hidden ${level === lvl ? 'border-blue-500 bg-blue-500/10 text-white shadow-lg scale-105' : 'border-slate-700 text-slate-500 hover:bg-slate-800'}`}
          >
            <div className="font-bold z-10 relative">{levels[lvl].title}</div>
            <div className="text-xs opacity-70 z-10 relative font-mono mt-1">{levels[lvl].prompt}</div>
          </button>
        ))}
      </div>
      
      <div className="flex-1 bg-slate-800 p-8 rounded-xl border border-slate-600 w-full relative overflow-hidden min-h-[300px]">
        <div className={`absolute top-0 left-0 w-2 h-full ${levels[level].color} transition-colors duration-500`} />
        
        <div className="space-y-6 pl-4">
          <div>
            <h4 className="text-3xl font-bold text-white mb-2">{levels[level].title}</h4>
            <div className="flex items-center gap-2">
              <span className="font-mono text-emerald-400 bg-black/50 px-3 py-1 rounded border border-emerald-500/30">Prompt: {levels[level].prompt}</span>
            </div>
          </div>
          
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700/50">
            <span className="text-blue-400 font-bold text-xs uppercase block mb-2 tracking-wider">L'Analogie</span>
            <p className="text-xl text-slate-200 font-light italic">"{levels[level].human}"</p>
            <p className="text-slate-400 mt-2 text-sm leading-relaxed">{levels[level].analogy} : {levels[level].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemorySimulator = () => {
  const [power, setPower] = useState(true);
  const [ramData, setRamData] = useState("Votre Travail en Cours");
  const [nvramData, setNvramData] = useState("Votre Sauvegarde");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    if (!power) {
      setRamData(""); 
      setUnsavedChanges(false);
    } else {
      setRamData(nvramData); 
    }
  }, [power]);

  const handleSave = () => {
    if (power) {
      setNvramData(ramData);
      setUnsavedChanges(false);
    }
  };

  const handleModify = () => {
    if (power) {
      setUnsavedChanges(true);
      setRamData("Travail en cours (NON SAUVÉ)");
    }
  }

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h4 className="font-bold text-white flex items-center gap-2 text-lg"><Save className="w-5 h-5 text-blue-500" /> Labo : Pourquoi sauvegarder ?</h4>
          <p className="text-sm text-slate-400 mt-1">Simulez une coupure de courant pour comprendre.</p>
        </div>
        <button 
          onClick={() => setPower(!power)}
          className={`px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg ${power ? 'bg-emerald-600 text-white shadow-emerald-500/30 hover:bg-emerald-500' : 'bg-red-600 text-white shadow-red-500/30 hover:bg-red-500'}`}
        >
          <Power className="w-4 h-4" /> {power ? "COURANT ON" : "COURANT OFF"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8 relative mb-8">
        <div className={`p-6 rounded-xl border-2 transition-all z-10 flex flex-col items-center gap-3 text-center ${power ? 'border-blue-500 bg-blue-900/10' : 'border-slate-800 bg-slate-950 opacity-50 grayscale'}`}>
          <div className="text-sm font-bold text-blue-400 uppercase tracking-widest">RAM (Le Cerveau)</div>
          <Cpu size={32} className="text-blue-500"/>
          <p className="text-xs text-slate-400">Si je m'éteins, j'oublie tout instantanément.</p>
          <div className={`w-full py-2 rounded font-bold ${power ? 'text-white bg-blue-600/20' : 'text-transparent bg-slate-900'}`}>
            {power ? ramData : "VIDE"}
          </div>
        </div>
        
        <div className="p-6 rounded-xl border-2 border-emerald-500 bg-emerald-900/10 z-10 flex flex-col items-center gap-3 text-center">
          <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest">NVRAM (Le Disque Dur)</div>
          <HardDrive size={32} className="text-emerald-500"/>
          <p className="text-xs text-slate-400">Je garde les infos même sans électricité.</p>
          <div className="w-full py-2 rounded font-bold text-white bg-emerald-600/20">
            {nvramData}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-800">
        <button onClick={handleModify} disabled={!power} className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white py-4 rounded-lg text-sm transition-all">
          1. Travailler (Configurer)
        </button>
        <button onClick={handleSave} disabled={!power} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all">
          2. Sauvegarder (copy run start)
        </button>
      </div>
      
      {!power && unsavedChanges && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200 text-sm flex items-start gap-3 animate-pulse">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 text-red-500" /> 
          <div>
            <span className="font-bold block text-red-400 text-lg mb-1">CATASTROPHE !</span>
            Vous avez coupé le courant avant de sauvegarder. Tout le travail fait en RAM est perdu à jamais.
          </div>
        </div>
      )}
    </div>
  );
};

// --- FLASHCARDS ---

const FlashCards = ({ cards, mode = 'question_to_answer' }) => {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => setCurrent((c) => (c + 1) % cards.length), 250);
  };

  const isCommandFirst = mode === 'command_to_definition';

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative h-64 w-full cursor-pointer group"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.7s',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 bg-slate-800 border-2 border-slate-700 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-2xl group-hover:border-blue-500/50 transition-colors"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {isCommandFirst ? (
              <>
                <Terminal className="w-10 h-10 text-emerald-500 mb-4" />
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">Commande Cisco</span>
                <code className="text-3xl font-mono text-white bg-black/40 px-6 py-4 rounded-xl shadow-inner border border-white/10 break-all w-full">
                  {cards[current].q}
                </code>
              </>
            ) : (
              <>
                <HelpCircle className="w-10 h-10 text-blue-500 mb-4" />
                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">Question / Objectif</span>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  "{cards[current].q}"
                </h3>
              </>
            )}
            <p className="text-slate-500 text-xs mt-auto flex items-center gap-2 opacity-60">
              <RotateCcw size={12}/> Cliquer pour voir la {isCommandFirst ? 'définition' : 'commande'}
            </p>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-2xl border-2 border-blue-400/50"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {isCommandFirst ? (
              <>
                <span className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-2">
                  Définition
                </span>
                <h3 className="text-xl font-bold text-white leading-tight mb-2">
                  "{cards[current].a}"
                </h3>
                <p className="text-[11px] text-slate-400 mt-4">
                  Cliquer à nouveau pour revoir la commande.
                </p>
              </>
            ) : (
              <>
                <span className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-2">
                  Commande Cisco
                </span>
                <code className="text-2xl font-mono text-emerald-400 bg-black/40 px-6 py-4 rounded-xl shadow-inner border border-white/10 break-all w-full mb-4">
                  {cards[current].a}
                </code>
                <div className="mt-auto pt-4 border-t border-blue-400/30 w-full opacity-80">
                  <span className="text-[10px] uppercase text-blue-300 font-bold block mb-1">
                    Rappel Objectif
                  </span>
                  <p className="text-blue-200 text-xs italic">"{cards[current].q}"</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <span className="text-slate-400 font-mono">Carte {current + 1} / {cards.length}</span>
        <button onClick={nextCard} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 transition-all font-bold border border-slate-700 hover:border-blue-500">
          Suivant <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

// --- COMPOSANTS DE VISUALISATION ---

// Diagramme réseau interactif pour SSH/Telnet
const NetworkDiagram = ({ mode = 'ssh' }) => {
  const [selected, setSelected] = useState(null);
  const [showFlow, setShowFlow] = useState(false);

  const devices = [
    { id: 'pc', x: 50, y: 200, label: 'PC Admin', icon: Monitor },
    { id: 'switch', x: 300, y: 200, label: 'Switch', icon: Network },
    { id: 'router', x: 550, y: 200, label: 'Router', icon: RouterIcon }
  ];

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Network className="w-6 h-6 text-blue-400" /> Diagramme Réseau
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFlow(!showFlow)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              showFlow ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {showFlow ? 'Masquer Flux' : 'Montrer Flux'}
          </button>
        </div>
      </div>

      <div className="relative bg-slate-900 rounded-lg p-8 border border-slate-700" style={{ minHeight: '400px' }}>
        <svg width="100%" height="400" className="overflow-visible">
          {/* Connexions */}
          <line
            x1="150"
            y1="200"
            x2="250"
            y2="200"
            stroke={showFlow && mode === 'ssh' ? '#10b981' : showFlow && mode === 'telnet' ? '#ef4444' : '#475569'}
            strokeWidth="3"
            strokeDasharray={showFlow ? "0" : "5,5"}
            className="transition-all duration-500"
          />
          <line
            x1="400"
            y1="200"
            x2="500"
            y2="200"
            stroke={showFlow && mode === 'ssh' ? '#10b981' : showFlow && mode === 'telnet' ? '#ef4444' : '#475569'}
            strokeWidth="3"
            strokeDasharray={showFlow ? "0" : "5,5"}
            className="transition-all duration-500"
          />

          {/* Animation de flux de données */}
          {showFlow && (
            <>
              <circle
                r="8"
                fill={mode === 'ssh' ? '#10b981' : '#ef4444'}
                className="animate-pulse"
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path="M 150 200 L 250 200"
                />
              </circle>
              <circle
                r="8"
                fill={mode === 'ssh' ? '#10b981' : '#ef4444'}
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path="M 400 200 L 500 200"
                />
              </circle>
            </>
          )}

          {/* Appareils */}
          {devices.map((device) => {
            const Icon = device.icon;
            const isSelected = selected === device.id;
            return (
              <g key={device.id}>
                <circle
                  cx={device.x}
                  cy={device.y}
                  r="50"
                  fill={isSelected ? (mode === 'ssh' ? '#065f46' : '#7f1d1d') : '#1e293b'}
                  stroke={isSelected ? (mode === 'ssh' ? '#10b981' : '#ef4444') : '#475569'}
                  strokeWidth={isSelected ? "3" : "2"}
                  className="cursor-pointer transition-all hover:scale-110"
                  onClick={() => setSelected(isSelected ? null : device.id)}
                />
                <foreignObject x={device.x - 40} y={device.y - 15} width="80" height="30">
                  <div className="flex justify-center">
                    <Icon className={`w-6 h-6 ${isSelected ? (mode === 'ssh' ? 'text-emerald-400' : 'text-red-400') : 'text-slate-400'}`} />
                  </div>
                </foreignObject>
                <text
                  x={device.x}
                  y={device.y + 80}
                  textAnchor="middle"
                  className="fill-slate-300 text-sm font-semibold"
                >
                  {device.label}
                </text>
                {device.id === 'pc' && (
                  <text
                    x={device.x}
                    y={device.y + 100}
                    textAnchor="middle"
                    className="fill-slate-500 text-xs"
                  >
                    {mode === 'ssh' ? '192.168.1.10' : '192.168.1.10'}
                  </text>
                )}
                {device.id === 'router' && (
                  <text
                    x={device.x}
                    y={device.y + 100}
                    textAnchor="middle"
                    className="fill-slate-500 text-xs"
                  >
                    {mode === 'ssh' ? '192.168.1.1' : '192.168.1.1'}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Légende */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${mode === 'ssh' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span className="text-slate-300 text-sm">
              {mode === 'ssh' ? 'SSH (Chiffré)' : 'Telnet (Non sécurisé)'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-slate-600" />
            <span className="text-slate-400 text-sm">Connexion réseau</span>
          </div>
        </div>
      </div>

      {selected && (
        <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
          <p className="text-slate-300 text-sm">
            {selected === 'pc' && '💻 PC Admin : Point de départ de la connexion SSH/Telnet'}
            {selected === 'switch' && '🔀 Switch : Équipement intermédiaire qui route les données'}
            {selected === 'router' && '🌐 Router : Destination finale de la connexion'}
          </p>
        </div>
      )}
    </div>
  );
};

// Animation du flux de données SSH vs Telnet
const DataFlowAnimation = () => {
  const [mode, setMode] = useState('ssh');
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-400" /> Flux de Données : SSH vs Telnet
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('telnet')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              mode === 'telnet' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            Telnet
          </button>
          <button
            onClick={() => setMode('ssh')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              mode === 'ssh' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            SSH
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-8 border border-slate-700">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30 mb-2">
              <Monitor className="w-8 h-8 text-blue-400 mx-auto" />
            </div>
            <p className="text-slate-300 text-sm font-semibold mt-2">PC Admin</p>
            <p className="text-slate-500 text-xs">192.168.1.10</p>
          </div>

          <div className="flex-1 mx-8 relative">
            <div className="h-1 bg-slate-700 rounded-full relative overflow-hidden">
              {isAnimating && (
                <div
                  className={`absolute h-full w-1/3 rounded-full ${
                    mode === 'ssh' ? 'bg-emerald-500' : 'bg-red-500'
                  } animate-pulse`}
                  style={{
                    animation: `slide 2s infinite`,
                  }}
                />
              )}
              <style>{`
                @keyframes slide {
                  0% { left: -33%; }
                  100% { left: 100%; }
                }
              `}</style>
            </div>
            <div className="mt-4 text-center">
              <div className={`inline-block px-4 py-2 rounded-lg ${
                mode === 'ssh' ? 'bg-emerald-900/30 border border-emerald-500/30' : 'bg-red-900/30 border border-red-500/30'
              }`}>
                <p className={`text-sm font-mono ${mode === 'ssh' ? 'text-emerald-300' : 'text-red-300'}`}>
                  {mode === 'ssh' ? '🔒 Données Chiffrées' : '⚠️ Données en Clair'}
                </p>
                {mode === 'ssh' && (
                  <p className="text-xs text-emerald-400 mt-1">AES-256 • RSA • Port 22</p>
                )}
                {mode === 'telnet' && (
                  <p className="text-xs text-red-400 mt-1">Aucun chiffrement • Port 23</p>
                )}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30 mb-2">
              <RouterIcon className="w-8 h-8 text-purple-400 mx-auto" />
            </div>
            <p className="text-slate-300 text-sm font-semibold mt-2">Router</p>
            <p className="text-slate-500 text-xs">192.168.1.1</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-800 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-300 font-semibold">Exemple de données envoyées :</p>
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {isAnimating ? 'Pause' : 'Démarrer Animation'}
            </button>
          </div>
          <div className="space-y-2">
            <div className={`p-3 rounded-lg border ${
              mode === 'ssh' ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-red-900/20 border-red-500/30'
            }`}>
              <p className="text-xs text-slate-400 mb-1">Commande :</p>
              <code className={`text-sm font-mono ${mode === 'ssh' ? 'text-emerald-300' : 'text-red-300'}`}>
                {mode === 'ssh' ? 'a8f3c9d2e1b4...' : 'show running-config'}
              </code>
            </div>
            <div className={`p-3 rounded-lg border ${
              mode === 'ssh' ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-red-900/20 border-red-500/30'
            }`}>
              <p className="text-xs text-slate-400 mb-1">Mot de passe :</p>
              <code className={`text-sm font-mono ${mode === 'ssh' ? 'text-emerald-300' : 'text-red-300'}`}>
                {mode === 'ssh' ? 'x7k2m9p4q1w...' : 'admin123'}
              </code>
            </div>
          </div>
          {mode === 'telnet' && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm">
                ⚠️ <strong>Danger :</strong> Avec Telnet, tout est visible en clair ! N'importe qui peut intercepter et lire vos mots de passe.
              </p>
            </div>
          )}
          {mode === 'ssh' && (
            <div className="mt-4 p-3 bg-emerald-900/30 border border-emerald-500/30 rounded-lg">
              <p className="text-emerald-300 text-sm">
                ✅ <strong>Sécurisé :</strong> Avec SSH, toutes les données sont chiffrées. Même si quelqu'un intercepte, il ne peut rien lire.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Animation du flux DORA (DHCP)
const DoraFlowAnimation = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { letter: 'D', label: 'Discover', desc: 'Le client envoie une demande de configuration (broadcast)', color: 'blue' },
    { letter: 'O', label: 'Offer', desc: 'Le serveur propose une adresse IP au client', color: 'emerald' },
    { letter: 'R', label: 'Request', desc: 'Le client accepte l\'offre et la demande officiellement', color: 'amber' },
    { letter: 'A', label: 'Acknowledge', desc: 'Le serveur confirme l\'attribution et enregistre le bail', color: 'violet' }
  ];

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
        <Activity className="w-6 h-6 text-amber-400" /> Flux DORA – Attribution DHCP
      </h3>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="text-center flex-1">
          <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
            <Monitor className="w-10 h-10 text-blue-400 mx-auto" />
          </div>
          <p className="text-slate-300 font-semibold mt-2">Client (PC)</p>
          <p className="text-slate-500 text-xs">0.0.0.0 au départ</p>
        </div>
        <div className="flex-1 flex justify-center gap-2">
          {steps.map((s, i) => (
            <div
              key={s.letter}
              className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold transition-all cursor-pointer border-2 ${
                step >= i
                  ? s.color === 'blue' ? 'bg-blue-600 border-blue-400 text-white'
                  : s.color === 'emerald' ? 'bg-emerald-600 border-emerald-400 text-white'
                  : s.color === 'amber' ? 'bg-amber-600 border-amber-400 text-white'
                  : 'bg-violet-600 border-violet-400 text-white'
                  : 'bg-slate-700 border-slate-600 text-slate-500'
              }`}
              onClick={() => setStep(i)}
            >
              <span className="text-lg">{s.letter}</span>
              <span className="text-[9px] opacity-90">{s.label.slice(0, 3)}</span>
            </div>
          ))}
        </div>
        <div className="text-center flex-1">
          <div className="bg-amber-900/30 p-4 rounded-lg border border-amber-500/30">
            <Server className="w-10 h-10 text-amber-400 mx-auto" />
          </div>
          <p className="text-slate-300 font-semibold mt-2">Serveur DHCP</p>
          <p className="text-slate-500 text-xs">Pool d'adresses</p>
        </div>
      </div>
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
        <p className="text-amber-300 font-bold mb-2">{steps[step].label}</p>
        <p className="text-slate-300 text-sm">{steps[step].desc}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">← Précédent</button>
        <button onClick={() => setStep(Math.min(3, step + 1))} className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm">Suivant →</button>
      </div>
    </div>
  );
};

// Schéma de configuration avant/après
const ConfigComparison = ({ before, after, title }) => {
  const [viewMode, setViewMode] = useState('split'); // 'split', 'before', 'after'

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Eye className="w-6 h-6 text-blue-400" /> {title || 'Comparaison de Configuration'}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('before')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'before' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            Avant
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'split' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            Comparer
          </button>
          <button
            onClick={() => setViewMode('after')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'after' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            Après
          </button>
        </div>
      </div>

      <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {(viewMode === 'before' || viewMode === 'split') && (
          <div className="bg-slate-900 rounded-lg p-6 border border-red-500/30">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <h4 className="text-lg font-bold text-red-400">Avant (Non Sécurisé)</h4>
            </div>
            <div className="space-y-2">
              {before.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-red-400 font-mono text-xs">-</span>
                  <code className="text-red-300 font-mono text-sm flex-1">{line}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {(viewMode === 'after' || viewMode === 'split') && (
          <div className="bg-slate-900 rounded-lg p-6 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h4 className="text-lg font-bold text-emerald-400">Après (Sécurisé)</h4>
            </div>
            <div className="space-y-2">
              {after.map((line, idx) => {
                const isNew = !before.includes(line);
                return (
                  <div key={idx} className={`flex items-start gap-2 ${isNew ? 'bg-emerald-900/20 p-2 rounded' : ''}`}>
                    <span className={`font-mono text-xs ${isNew ? 'text-emerald-400' : 'text-emerald-400'}`}>
                      {isNew ? '+' : ' '}
                    </span>
                    <code className="text-emerald-300 font-mono text-sm flex-1">{line}</code>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {viewMode === 'split' && (
        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-200 text-sm">
            💡 <strong>Différences clés :</strong> Les lignes en vert sont les nouvelles configurations ajoutées pour sécuriser l'équipement.
          </p>
        </div>
      )}
    </div>
  );
};

// Schéma interactif : Sauvegarde vs Restauration TFTP (sens du flux)
const TFTPFlow = () => {
  const [highlight, setHighlight] = useState(null); // 'save' | 'restore' | null

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 my-6">
      <h4 className="text-slate-300 font-bold mb-4 flex items-center gap-2">
        <ArrowUpDown className="w-5 h-5 text-blue-400" /> Qui envoie quoi à qui ?
      </h4>
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <div className="bg-slate-900 rounded-xl p-6 border-2 border-slate-600 text-center min-w-[140px]">
          <RouterIcon className="w-10 h-10 text-blue-400 mx-auto mb-2" />
          <p className="text-white font-bold">Routeur</p>
          <p className="text-slate-500 text-xs">running-config</p>
        </div>

        <div className="flex flex-col gap-4 flex-1 max-w-md">
          <button
            onClick={() => setHighlight(highlight === 'save' ? null : 'save')}
            className={`text-left p-4 rounded-xl border-2 transition-all ${highlight === 'save' ? 'bg-emerald-900/30 border-emerald-500' : 'bg-slate-900 border-slate-700 hover:border-emerald-500/50'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-400 font-bold">→ Sauvegarde</span>
            </div>
            <code className="text-emerald-300 font-mono text-sm">copy running-config tftp:</code>
            <p className="text-slate-400 text-xs mt-2">Le routeur envoie sa config vers le serveur TFTP.</p>
          </button>
          <button
            onClick={() => setHighlight(highlight === 'restore' ? null : 'restore')}
            className={`text-left p-4 rounded-xl border-2 transition-all ${highlight === 'restore' ? 'bg-amber-900/30 border-amber-500' : 'bg-slate-900 border-slate-700 hover:border-amber-500/50'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-400 font-bold">← Restauration</span>
            </div>
            <code className="text-amber-300 font-mono text-sm">copy tftp: running-config</code>
            <p className="text-slate-400 text-xs mt-2">Le routeur reçoit une config depuis le serveur (écrase l’actuelle).</p>
          </button>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border-2 border-slate-600 text-center min-w-[140px]">
          <Globe className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
          <p className="text-white font-bold">Serveur TFTP</p>
          <p className="text-slate-500 text-xs">fichier .cfg</p>
        </div>
      </div>
      {highlight === 'restore' && (
        <div className="mt-4 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg text-amber-200 text-sm">
          ⚠️ Avant de restaurer : sauvegardez votre config actuelle avec <code className="font-mono">copy running-config startup-config</code>, sinon vous la perdez.
        </div>
      )}
    </div>
  );
};

// Visualisation du flux de connexion SSH étape par étape
const SSHConnectionFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: '1. Demande de Connexion', desc: 'Le PC envoie une demande de connexion SSH au routeur', icon: Network },
    { title: '2. Échange des Clés', desc: 'Le routeur envoie sa clé publique RSA au PC', icon: Key },
    { title: '3. Chiffrement Établi', desc: 'Une connexion chiffrée est établie entre les deux appareils', icon: Lock },
    { title: '4. Authentification', desc: 'Le PC envoie les identifiants (chiffrés) au routeur', icon: User },
    { title: '5. Session Active', desc: 'La connexion SSH est établie, toutes les commandes sont chiffrées', icon: CheckCircle }
  ];

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
        <Activity className="w-6 h-6 text-blue-400" /> Flux de Connexion SSH
      </h3>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          const Icon = step.icon || CheckCircle;

          return (
            <div
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isActive
                  ? 'bg-blue-900/30 border-blue-500 scale-105'
                  : isCompleted
                  ? 'bg-emerald-900/20 border-emerald-500/30'
                  : 'bg-slate-900 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  isActive ? 'bg-blue-600' : isCompleted ? 'bg-emerald-600' : 'bg-slate-700'
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold mb-1 ${
                    isActive ? 'text-blue-300' : isCompleted ? 'text-emerald-300' : 'text-slate-300'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
                {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Précédent
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentStep === steps.length - 1 ? 'Terminé' : 'Suivant'}
        </button>
      </div>
    </div>
  );
};

// --- COMPOSANTS INTERACTIFS ---

// Simulateur de configuration SSH étape par étape
const SSHConfigurator = () => {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState({
    hostname: '',
    domain: '',
    username: '',
    privilege: '15',
    password: '',
    rsaGenerated: false,
    sshEnabled: false
  });
  const [feedback, setFeedback] = useState('');

  const steps = [
    { title: "Nom d'hôte", cmd: "hostname", field: "hostname", placeholder: "SW-SSH", example: "SW-SSH" },
    { title: "Nom de domaine", cmd: "ip domain-name", field: "domain", placeholder: "novatech.local", example: "novatech.local" },
    { title: "Utilisateur", cmd: "username", field: "username", placeholder: "admin", example: "admin" },
    { title: "Privilège", cmd: "privilege", field: "privilege", placeholder: "15", example: "15" },
    { title: "Mot de passe", cmd: "secret", field: "password", placeholder: "admin123", example: "admin123" },
    { title: "Générer clé RSA", cmd: "crypto key generate rsa", field: "rsaGenerated", placeholder: "", example: "" },
    { title: "Activer SSH", cmd: "transport input ssh", field: "sshEnabled", placeholder: "", example: "" }
  ];

  const handleInput = (field, value) => {
    setConfig({ ...config, [field]: value });
    setFeedback('');
  };

  const handleNext = () => {
    const currentStep = steps[step];
    if (currentStep.field === 'rsaGenerated' || currentStep.field === 'sshEnabled') {
      setConfig({ ...config, [currentStep.field]: true });
      setFeedback(`✅ ${currentStep.cmd} exécuté avec succès !`);
    } else if (config[currentStep.field]) {
      setFeedback(`✅ ${currentStep.cmd} ${config[currentStep.field]} configuré !`);
    } else {
      setFeedback('⚠️ Veuillez remplir ce champ avant de continuer.');
      return;
    }
    setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1);
        setFeedback('');
      }
    }, 1000);
  };

  const generateCommand = () => {
    if (step === 0) return `hostname ${config.hostname || 'SW-SSH'}`;
    if (step === 1) return `ip domain-name ${config.domain || 'novatech.local'}`;
    if (step === 2) return `username ${config.username || 'admin'} privilege ${config.privilege || '15'} secret ${config.password || 'admin123'}`;
    if (step === 3) return `username ${config.username || 'admin'} privilege ${config.privilege || '15'} secret ${config.password || 'admin123'}`;
    if (step === 4) return `username ${config.username || 'admin'} privilege ${config.privilege || '15'} secret ${config.password || 'admin123'}`;
    if (step === 5) return `crypto key generate rsa`;
    if (step === 6) return `line vty 0 4\nlogin local\ntransport input ssh`;
    return '';
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Simulateur de Configuration SSH</h3>
        <span className="text-sm text-slate-400">Étape {step + 1} / {steps.length}</span>
      </div>

      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-slate-400 font-mono text-sm">R-Sec(config)#</span>
          <code className="text-emerald-400 font-mono font-bold">{generateCommand()}</code>
        </div>
        {feedback && (
          <div className={`p-3 rounded-lg ${feedback.includes('✅') ? 'bg-emerald-900/30 border border-emerald-500/30' : 'bg-yellow-900/30 border border-yellow-500/30'}`}>
            <p className={feedback.includes('✅') ? 'text-emerald-300' : 'text-yellow-300'}>{feedback}</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-slate-300 font-semibold mb-2 block">{steps[step].title}</span>
          {steps[step].field === 'privilege' ? (
            <select
              value={config.privilege}
              onChange={(e) => handleInput('privilege', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="0">Niveau 0 - Accès ultra-limité</option>
              <option value="1">Niveau 1 - Accès utilisateur (par défaut)</option>
              <option value="15">Niveau 15 - Administrateur</option>
            </select>
          ) : steps[step].field === 'rsaGenerated' || steps[step].field === 'sshEnabled' ? (
            <button
              onClick={() => handleInput(steps[step].field, true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Exécuter : {steps[step].cmd}
            </button>
          ) : (
            <input
              type={steps[step].field === 'password' ? 'password' : 'text'}
              value={config[steps[step].field]}
              onChange={(e) => handleInput(steps[step].field, e.target.value)}
              placeholder={steps[step].placeholder}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          )}
          {steps[step].example && (
            <p className="text-xs text-slate-500 mt-1">Exemple : {steps[step].example}</p>
          )}
        </label>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Précédent
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          {step === steps.length - 1 ? 'Terminer' : 'Suivant'}
        </button>
      </div>

      {step === steps.length - 1 && config.sshEnabled && (
        <div className="bg-emerald-900/30 border border-emerald-500/30 p-4 rounded-lg">
          <p className="text-emerald-300 font-bold">🎉 Configuration SSH complète !</p>
          <p className="text-emerald-200 text-sm mt-2">Votre équipement est maintenant sécurisé avec SSH.</p>
        </div>
      )}
    </div>
  );
};

// Diagramme VLAN interactif : switch avec ports, clic pour affecter VLAN
const VLANDiagram = () => {
  const [portVlans, setPortVlans] = useState({ 1: null, 2: null, 3: null, 4: null, 5: null, 6: null });
  const [selectedPort, setSelectedPort] = useState(null);

  const cycleVlan = (port) => {
    const current = portVlans[port];
    if (current === null) setPortVlans((p) => ({ ...p, [port]: 10 }));
    else if (current === 10) setPortVlans((p) => ({ ...p, [port]: 20 }));
    else setPortVlans((p) => ({ ...p, [port]: null }));
    setSelectedPort(port);
  };

  const getPortLabel = (vlan) => {
    if (vlan === 10) return 'Admin';
    if (vlan === 20) return 'Commercial';
    return '—';
  };

  const getPortColor = (vlan) => {
    if (vlan === 10) return 'bg-blue-600 border-blue-400';
    if (vlan === 20) return 'bg-amber-600 border-amber-400';
    return 'bg-slate-700 border-slate-600';
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
        <Network className="w-6 h-6 text-blue-400" /> Switch : Attribution des Ports aux VLANs
      </h3>
      <p className="text-slate-400 text-sm mb-6">Clique sur un port pour lui attribuer un VLAN (non assigné → VLAN 10 → VLAN 20).</p>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
          <div className="text-center text-slate-400 font-bold text-sm mb-4">SW-Core</div>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5, 6].map((port) => (
              <button
                key={port}
                onClick={() => cycleVlan(port)}
                className={`w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-all hover:scale-110 ${getPortColor(portVlans[port])} ${selectedPort === port ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}
              >
                <span className="text-white font-mono font-bold text-lg">Fa0/{port}</span>
                <span className="text-[10px] text-white/90 font-semibold mt-0.5">{getPortLabel(portVlans[port])}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 min-w-[200px]">
          <p className="text-slate-400 text-xs font-bold uppercase mb-3">Légende</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-slate-700 border-2 border-slate-600" />
              <span className="text-slate-400 text-sm">Non assigné</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-blue-600 border-2 border-blue-400" />
              <span className="text-blue-300 text-sm">VLAN 10 (Admin)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-600 border-2 border-amber-400" />
              <span className="text-amber-300 text-sm">VLAN 20 (Commercial)</span>
            </div>
          </div>
          {selectedPort !== null && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-slate-400 text-xs">Port Fa0/{selectedPort} → VLAN {portVlans[selectedPort] || '—'}</p>
              <code className="text-emerald-400 text-xs font-mono mt-1 block">
                {portVlans[selectedPort] ? `switchport access vlan ${portVlans[selectedPort]}` : 'interface fa0/' + selectedPort}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Diagramme Trunk + Router-on-a-Stick interactif
const TrunkDiagram = () => {
  const [highlight, setHighlight] = useState(null); // 'trunk' | 'sub10' | 'sub20' | null

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
        <Network className="w-6 h-6 text-blue-400" /> Trunk et Routage Inter-VLAN
      </h3>
      <p className="text-slate-400 text-sm mb-6">Clique sur un élément pour le mettre en évidence.</p>

      <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 overflow-x-auto">
        <div className="flex items-center justify-center gap-6 min-w-[600px]">
          <div className="bg-slate-800 rounded-xl p-6 border-2 border-slate-600 text-center">
            <div className="text-blue-400 font-bold mb-2">SW1</div>
            <div className="text-slate-500 text-xs">VLAN 10, 20</div>
            <div className="mt-2 w-3 h-8 bg-slate-600 rounded mx-auto" />
          </div>

          <button
            onClick={() => setHighlight(highlight === 'trunk' ? null : 'trunk')}
            className={`flex flex-col items-center justify-center px-6 py-4 rounded-xl border-2 transition-all ${highlight === 'trunk' ? 'bg-emerald-900/50 border-emerald-500' : 'bg-slate-800 border-slate-600 hover:border-emerald-500/50'}`}
          >
            <div className="text-emerald-400 font-mono text-sm font-bold">Trunk 802.1Q</div>
            <div className="text-slate-500 text-xs mt-1">VLAN 10, 20 étiquetés</div>
          </button>

          <div className="bg-slate-800 rounded-xl p-6 border-2 border-slate-600 text-center">
            <div className="text-blue-400 font-bold mb-2">SW2</div>
            <div className="text-slate-500 text-xs">VLAN 10, 20</div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border-2 border-slate-600 text-center min-w-[140px]">
            <div className="text-amber-400 font-bold mb-2 flex items-center gap-1 justify-center">
              <RouterIcon className="w-4 h-4" /> R-Core
            </div>
            <button
              onClick={() => setHighlight(highlight === 'sub10' ? null : 'sub10')}
              className={`block w-full mt-2 py-2 rounded text-xs font-mono ${highlight === 'sub10' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              g0/0.10 → 192.168.10.1
            </button>
            <button
              onClick={() => setHighlight(highlight === 'sub20' ? null : 'sub20')}
              className={`block w-full mt-1 py-2 rounded text-xs font-mono ${highlight === 'sub20' ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              g0/0.20 → 192.168.20.1
            </button>
          </div>
        </div>

        {highlight && (
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            {highlight === 'trunk' && (
              <p className="text-blue-200 text-sm">
                <strong>Trunk :</strong> <code className="text-emerald-400 font-mono">switchport mode trunk</code> — Le lien transporte plusieurs VLANs avec des étiquettes 802.1Q.
              </p>
            )}
            {highlight === 'sub10' && (
              <p className="text-blue-200 text-sm">
                <strong>Sous-interface VLAN 10 :</strong> <code className="text-emerald-400 font-mono">interface g0/0.10</code> + <code className="text-emerald-400 font-mono">encapsulation dot1Q 10</code> + <code className="text-emerald-400 font-mono">ip address 192.168.10.1 255.255.255.0</code>
              </p>
            )}
            {highlight === 'sub20' && (
              <p className="text-blue-200 text-sm">
                <strong>Sous-interface VLAN 20 :</strong> <code className="text-emerald-400 font-mono">interface g0/0.20</code> + <code className="text-emerald-400 font-mono">encapsulation dot1Q 20</code> + <code className="text-emerald-400 font-mono">ip address 192.168.20.1 255.255.255.0</code>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Quiz interactif intégré dans les slides
const InteractiveQuiz = ({ questions }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === questions[currentQ].a) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
        <div className="text-6xl mb-4">{score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '📚'}</div>
        <h3 className="text-2xl font-bold text-white mb-2">Quiz terminé !</h3>
        <p className="text-slate-300 mb-4">Score : {score} / {questions.length}</p>
        <p className="text-slate-400 text-sm">
          {score === questions.length ? 'Parfait ! Tu maîtrises SSH !' :
           score >= questions.length / 2 ? 'Bien joué ! Continue comme ça !' :
           'Pas mal ! Continue à réviser.'}
        </p>
        <button
          onClick={() => {
            setCurrentQ(0);
            setSelected(null);
            setScore(0);
            setShowResult(false);
            setAnswered(false);
          }}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          Recommencer
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Quiz Interactif</h3>
        <span className="text-sm text-slate-400">Question {currentQ + 1} / {questions.length}</span>
      </div>

      <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4">{q.q}</h4>
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answered
                  ? idx === q.a
                    ? 'bg-emerald-900/30 border-emerald-500 text-emerald-300'
                    : idx === selected && idx !== q.a
                    ? 'bg-red-900/30 border-red-500 text-red-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-blue-500 hover:bg-slate-750'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {answered && (
        <div className={`p-4 rounded-lg ${selected === q.a ? 'bg-emerald-900/30 border border-emerald-500/30' : 'bg-red-900/30 border border-red-500/30'}`}>
          <p className={selected === q.a ? 'text-emerald-300 font-bold' : 'text-red-300 font-bold'}>
            {selected === q.a ? '✅ Correct !' : '❌ Incorrect'}
          </p>
          {selected !== q.a && (
            <p className="text-slate-300 text-sm mt-2">La bonne réponse est : {q.options[q.a]}</p>
          )}
        </div>
      )}

      <button
        onClick={nextQuestion}
        disabled={!answered}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {currentQ === questions.length - 1 ? 'Voir les résultats' : 'Question suivante'}
      </button>
    </div>
  );
};

// Constructeur de commandes avec validation
const CommandBuilder = ({ steps, title }) => {
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [feedback, setFeedback] = useState('');

  const handleStepClick = (step) => {
    if (selectedSteps.includes(step)) {
      setSelectedSteps(selectedSteps.filter(s => s !== step));
    } else {
      setSelectedSteps([...selectedSteps, step]);
    }
    setFeedback('');
  };

  const validateOrder = () => {
    const correctOrder = steps.map(s => s.cmd);
    const userOrder = selectedSteps.map(s => s.cmd);
    
    if (userOrder.length !== correctOrder.length) {
      setFeedback('⚠️ Tu n\'as pas sélectionné toutes les étapes.');
      return;
    }

    const isCorrect = userOrder.every((cmd, idx) => cmd === correctOrder[idx]);
    
    if (isCorrect) {
      setFeedback('✅ Parfait ! L\'ordre est correct.');
    } else {
      setFeedback('❌ L\'ordre n\'est pas correct. Réessaie !');
    }
  };

  const reset = () => {
    setSelectedSteps([]);
    setFeedback('');
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
      <h3 className="text-xl font-bold text-white">{title || 'Construire la Configuration'}</h3>
      <p className="text-slate-400">Clique sur les étapes dans le bon ordre :</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {steps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => handleStepClick(step)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedSteps.includes(step)
                ? 'bg-blue-900/30 border-blue-500 text-blue-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {selectedSteps.includes(step) && (
                <span className="text-blue-400 font-bold">
                  {selectedSteps.indexOf(step) + 1}.
                </span>
              )}
              <code className="text-emerald-400 font-mono font-bold text-sm">{step.cmd}</code>
            </div>
            <p className="text-xs text-slate-500">{step.desc}</p>
          </button>
        ))}
      </div>

      {selectedSteps.length > 0 && (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm mb-2">Ordre sélectionné :</p>
          <div className="flex flex-wrap gap-2">
            {selectedSteps.map((step, idx) => (
              <span key={idx} className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded font-mono text-sm">
                {idx + 1}. {step.cmd}
              </span>
            ))}
          </div>
        </div>
      )}

      {feedback && (
        <div className={`p-4 rounded-lg ${
          feedback.includes('✅') ? 'bg-emerald-900/30 border border-emerald-500/30' : 'bg-yellow-900/30 border border-yellow-500/30'
        }`}>
          <p className={feedback.includes('✅') ? 'text-emerald-300' : 'text-yellow-300'}>{feedback}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={validateOrder}
          disabled={selectedSteps.length === 0}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Valider l'ordre
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

// Explorateur interactif des niveaux de privilège
const PrivilegeExplorer = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const levels = [
    {
      level: 0,
      name: "Accès ultra-limité",
      colorClass: "red",
      bgClass: "bg-red-900/30",
      borderClass: "border-red-500",
      textClass: "text-red-400",
      textLightClass: "text-red-300",
      commands: ["ping", "logout", "exit"],
      description: "Accès minimal, seulement les commandes de base"
    },
    {
      level: 1,
      name: "Accès utilisateur",
      colorClass: "yellow",
      bgClass: "bg-yellow-900/30",
      borderClass: "border-yellow-500",
      textClass: "text-yellow-400",
      textLightClass: "text-yellow-300",
      commands: ["show", "ping", "traceroute", "telnet", "ssh"],
      description: "Accès par défaut, peut consulter mais pas modifier"
    },
    {
      level: 15,
      name: "Administrateur",
      colorClass: "emerald",
      bgClass: "bg-emerald-900/30",
      borderClass: "border-emerald-500",
      textClass: "text-emerald-400",
      textLightClass: "text-emerald-300",
      commands: ["configure terminal", "copy", "reload", "erase", "toutes les commandes"],
      description: "Accès total, peut tout faire"
    }
  ];

  const selectedLevelData = selectedLevel !== null ? levels[selectedLevel] : null;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
      <h3 className="text-xl font-bold text-white">Explorateur de Niveaux de Privilège</h3>
      <p className="text-slate-400">Clique sur un niveau pour voir ses capacités :</p>

      <div className="grid grid-cols-3 gap-4">
        {levels.map((lvl) => (
          <button
            key={lvl.level}
            onClick={() => setSelectedLevel(lvl.level === selectedLevel ? null : lvl.level)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedLevel === lvl.level
                ? `${lvl.bgClass} ${lvl.borderClass}`
                : 'bg-slate-900 border-slate-700 hover:border-blue-500'
            }`}
          >
            <div className={`text-3xl font-bold ${lvl.textClass} mb-2`}>{lvl.level}</div>
            <div className={`text-sm font-semibold ${lvl.textLightClass}`}>{lvl.name}</div>
          </button>
        ))}
      </div>

      {selectedLevelData && (
        <div className={`${selectedLevelData.bgClass} border ${selectedLevelData.borderClass}/30 rounded-lg p-6`}>
          <h4 className={`text-xl font-bold ${selectedLevelData.textClass} mb-2`}>
            Niveau {selectedLevelData.level} : {selectedLevelData.name}
          </h4>
          <p className="text-slate-300 mb-4">{selectedLevelData.description}</p>
          <div>
            <p className="text-slate-400 text-sm mb-2">Commandes disponibles :</p>
            <div className="flex flex-wrap gap-2">
              {selectedLevelData.commands.map((cmd, idx) => (
                <code key={idx} className="bg-black/40 text-emerald-400 px-3 py-1 rounded font-mono text-sm">
                  {cmd}
                </code>
              ))}
            </div>
          </div>
          <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
            <p className="text-slate-400 text-sm mb-1">Exemple de création :</p>
            <code className="text-emerald-400 font-mono text-sm">
              username user{selectedLevelData.level} privilege {selectedLevelData.level} secret password123
            </code>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Bloc commande + explication (lisibilité) ---
const CmdLine = ({ cmd, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-2 py-2 border-b border-slate-700/50 last:border-b-0">
    <code className="font-mono text-emerald-400 bg-black/40 px-3 py-1.5 rounded text-sm shrink-0 whitespace-nowrap">{cmd}</code>
    <p className="text-slate-400 text-sm pl-0 sm:pl-2">{children}</p>
  </div>
);

// Bloc de commandes compact (style Lab DHCP & DNS) - lines: {prompt, cmd} ou string
const CmdBlock = ({ lines }) => (
  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-1">
    {lines.map((l, i) => (
      <p key={i}>
        {typeof l === 'string' ? <span className="text-emerald-400">{l}</span> : (
          <><span className="text-slate-500">{l.prompt} </span><span className="text-emerald-400">{l.cmd}</span></>
        )}
      </p>
    ))}
  </div>
);

// --- Composant pédagogique : Commande détaillée ---
const CommandStep = ({ number, command, why, result, prompt }) => (
  <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 hover:bg-slate-800/60 transition-all">
    <div className="flex items-start gap-4">
      <div className="bg-blue-500/20 text-blue-400 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
        {number}
      </div>
      <div className="flex-1 space-y-3">
        {/* Commande */}
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Commande</p>
          <div className="bg-black/60 rounded-lg p-3 font-mono">
            {prompt && <span className="text-slate-500">{prompt} </span>}
            <span className="text-emerald-400 font-bold">{command}</span>
          </div>
        </div>
        
        {/* Pourquoi */}
        <div>
          <p className="text-xs text-amber-400 uppercase tracking-wider font-bold mb-1.5">💡 Pourquoi cette commande ?</p>
          <p className="text-slate-300 text-sm leading-relaxed">{why}</p>
        </div>
        
        {/* Résultat */}
        {result && (
          <div>
            <p className="text-xs text-emerald-400 uppercase tracking-wider font-bold mb-1.5">✓ Résultat attendu</p>
            <p className="text-slate-400 text-sm leading-relaxed">{result}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- CORRECTION LAB 1 SESSION 2 (Introduction VLAN) – Format compact ---
const CorrectionLab1Session2 = () => (
  <div className="space-y-10 text-slate-200 text-base leading-relaxed pb-16">
    <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-xl p-5">
      <p className="text-emerald-200 font-semibold text-lg mb-2">Correction Lab 1 – Introduction VLANs</p>
      <p className="text-slate-300 text-sm">1 switch, 4 PC. Commande par commande.</p>
    </div>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">1. Créer les VLANs</h4>
      <CmdBlock lines={[
        { prompt: "Switch>", cmd: "enable" },
        { prompt: "Switch#", cmd: "configure terminal" },
        { prompt: "Switch(config)#", cmd: "vlan 10" },
        { prompt: "Switch(config-vlan)#", cmd: "name Administration" },
        { prompt: "Switch(config-vlan)#", cmd: "exit" },
        { prompt: "Switch(config)#", cmd: "vlan 20" },
        { prompt: "Switch(config-vlan)#", cmd: "name Commercial" },
        { prompt: "Switch(config-vlan)#", cmd: "exit" },
        { prompt: "Switch(config)#", cmd: "show vlan brief" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">2. Attribuer les ports</h4>
      <CmdBlock lines={[
        { prompt: "Switch(config)#", cmd: "interface range fastEthernet0/1 - 2" },
        { prompt: "Switch(config-if-range)#", cmd: "switchport mode access" },
        { prompt: "Switch(config-if-range)#", cmd: "switchport access vlan 10" },
        { prompt: "Switch(config-if-range)#", cmd: "exit" },
        { prompt: "Switch(config)#", cmd: "interface range fastEthernet0/3 - 4" },
        { prompt: "Switch(config-if-range)#", cmd: "switchport mode access" },
        { prompt: "Switch(config-if-range)#", cmd: "switchport access vlan 20" },
        { prompt: "Switch(config-if-range)#", cmd: "exit" },
        { prompt: "Switch(config)#", cmd: "show vlan brief" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">3. Vérifications</h4>
      <p className="text-slate-300 text-sm">PC-Admin1 ping 192.168.1.11 ✓ | PC-Com1 ping 192.168.1.21 ✓ | PC-Admin1 ping 192.168.1.20 ✗ (VLANs isolés)</p>
    </section>
  </div>
);

const _CorrectionLab1Session2Verbose = () => (
  <div className="max-w-5xl mx-auto space-y-8 pb-16 hidden">
    <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis:</span>
        {[
          { id: 'lab1s2-cablage', label: 'Câblage', icon: '🟦' },
          { id: 'lab1s2-ip', label: 'Config PC', icon: '🟨' },
          { id: 'lab1s2-vlan', label: 'Créer VLANs', icon: '🟥' },
          { id: 'lab1s2-ports', label: 'Attribuer ports', icon: '🟩' },
          { id: 'lab1s2-verif', label: 'Vérif + ping', icon: '🟪' },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-emerald-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
          >
            <span className="text-[10px]">{icon}</span> {label}
          </button>
        ))}
      </div>
    </nav>

    <div className="space-y-6">
      {/* MATÉRIEL */}
      <section>
        <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">🧩 Matériel</h2>
        <p className="text-slate-300 text-sm">1 switch (2960), 4 PC : PC-Admin1, PC-Admin2, PC-Com1, PC-Com2.</p>
      </section>

      {/* ÉTAPE 1 — CÂBLAGE */}
      <section id="lab1s2-cablage" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">🟦 Étape 1 — Câblage</h2>
        <p className="text-slate-300 text-sm">Branche chaque PC sur un port du switch (câble droit ou auto). Exemple : PC-Admin1 → Fa0/1, PC-Admin2 → Fa0/2, PC-Com1 → Fa0/3, PC-Com2 → Fa0/4. Vérif : liens 🟢 verts.</p>
      </section>

      {/* ÉTAPE 2 — IP (PC) */}
      <section id="lab1s2-ip" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">🟨 Étape 2 — IP sur les PC</h2>
        <p className="text-slate-300 text-sm mb-2">Sur chaque PC : Desktop → IP Configuration. Même réseau pour tous (pour bien voir l’effet des VLANs). Sur chaque PC : Desktop → IP Configuration.</p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm text-slate-300 border border-slate-600 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-700/50"><th className="p-2 text-left">PC</th><th className="p-2 text-left">IP</th><th className="p-2 text-left">Masque</th></tr></thead>
            <tbody>
              <tr className="border-t border-slate-600"><td className="p-2">PC-Admin1</td><td className="p-2 font-mono text-emerald-400">192.168.1.10</td><td className="p-2 font-mono">255.255.255.0</td></tr>
              <tr className="border-t border-slate-600"><td className="p-2">PC-Admin2</td><td className="p-2 font-mono text-emerald-400">192.168.1.11</td><td className="p-2 font-mono">255.255.255.0</td></tr>
              <tr className="border-t border-slate-600"><td className="p-2">PC-Com1</td><td className="p-2 font-mono text-emerald-400">192.168.1.20</td><td className="p-2 font-mono">255.255.255.0</td></tr>
              <tr className="border-t border-slate-600"><td className="p-2">PC-Com2</td><td className="p-2 font-mono text-emerald-400">192.168.1.21</td><td className="p-2 font-mono">255.255.255.0</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-amber-300/90 text-xs border-l-2 border-amber-500/50 pl-3 py-1">⚠️ PAS de gateway (pas de routeur dans ce lab). Les VLANs agissent au niveau du switch ; même réseau IP, mais réseaux VLAN séparés.</p>
      </section>

      {/* ÉTAPE 3 — CRÉER LES VLANs */}
      <section id="lab1s2-vlan" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">🟥 Étape 3 — Créer les VLANs (switch, CLI)</h2>
        <p className="text-slate-300 text-sm mb-3">Ouvre le switch → CLI.</p>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0 mb-4">
          <CmdLine cmd="enable">Passe en mode privilégié (prompt #).</CmdLine>
          <CmdLine cmd="configure terminal">Entre en mode configuration globale.</CmdLine>
          <CmdLine cmd="vlan 10">Crée le VLAN 10. Le switch passe en (config-vlan)#.</CmdLine>
          <CmdLine cmd="name Administration">Donne le nom Administration au VLAN 10.</CmdLine>
          <CmdLine cmd="exit">Sort du VLAN 10.</CmdLine>
          <CmdLine cmd="vlan 20">Crée le VLAN 20.</CmdLine>
          <CmdLine cmd="name Commercial">Donne le nom Commercial au VLAN 20.</CmdLine>
          <CmdLine cmd="exit">Sort du VLAN 20.</CmdLine>
          <CmdLine cmd="show vlan brief">Vérif : tu vois VLAN 10 et 20. Aucun port dedans pour l'instant, c'est normal.</CmdLine>
        </div>
        <p className="text-slate-400 text-xs mb-2 hidden"> <code className="text-emerald-400 font-mono">show vlan brief</code> → tu dois voir 10 Administration et 20 Commercial. Pour l’instant aucun port n’est dedans, c’est normal.</p>
      </section>

      {/* ÉTAPE 4 — ATTRIBUER LES PORTS (commande par commande) */}
      <section id="lab1s2-ports" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">🟩 Étape 4 — Attribuer les ports aux VLANs</h2>
        <p className="text-slate-300 text-sm mb-2">Ports Admin (1 et 2) → VLAN 10. Ports Commercial (3 et 4) → VLAN 20.</p>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0 mb-3">
          <CmdLine cmd="interface range fastEthernet0/1 - 2">Sélectionne les ports 1 et 2 (PC Admin).</CmdLine>
          <CmdLine cmd="switchport mode access">Met les ports en mode accès (un VLAN par port, pour les PC).</CmdLine>
          <CmdLine cmd="switchport access vlan 10">Assigne ces deux ports au VLAN 10 (Administration).</CmdLine>
          <CmdLine cmd="exit">Quitte la plage de ports.</CmdLine>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
          <CmdLine cmd="interface range fastEthernet0/3 - 4">Sélectionne les ports 3 et 4 (PC Commercial).</CmdLine>
          <CmdLine cmd="switchport mode access">Mode accès.</CmdLine>
          <CmdLine cmd="switchport access vlan 20">Assigne ces ports au VLAN 20 (Commercial).</CmdLine>
          <CmdLine cmd="exit">Quitte la plage.</CmdLine>
          <CmdLine cmd="show vlan brief">Vérif : 10 Administration → Fa0/1, Fa0/2 ; 20 Commercial → Fa0/3, Fa0/4.</CmdLine>
        </div>
      </section>

      {/* ÉTAPE 5 & 6 — VÉRIF + PING */}
      <section id="lab1s2-verif" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-2">🟪 Étape 5 & 6 — Vérification et tests ping</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">1.</span>
            <div><strong>VLAN Administration :</strong> depuis PC-Admin1, <code className="text-emerald-400 font-mono">ping 192.168.1.11</code> → ✅ Réponse OK.</div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">2.</span>
            <div><strong>VLAN Commercial :</strong> depuis PC-Com1, <code className="text-emerald-400 font-mono">ping 192.168.1.21</code> → ✅ Réponse OK.</div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-bold">3.</span>
            <div><strong>Entre VLANs :</strong> depuis PC-Admin1, <code className="text-emerald-400 font-mono">ping 192.168.1.20</code> → ❌ Aucune réponse. C’est normal : les VLANs sont isolés.</div>
          </div>
        </div>
      </section>
    </div>

    <div className="bg-emerald-900/20 border-t border-emerald-500/30 p-4">
      <p className="text-emerald-400 text-sm font-medium flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Lab complété : VLANs créés, ports assignés, isolation vérifiée.</p>
    </div>
  </div>
);

// --- CORRECTION LAB 2 SESSION 2 (VLAN avancés) – Format compact ---
const CorrectionLab2Session2 = () => (
  <div className="space-y-10 text-slate-200 text-base leading-relaxed pb-16">
    <div className="bg-blue-900/20 border border-blue-500/40 rounded-xl p-5">
      <p className="text-blue-200 font-semibold text-lg mb-2">Correction Lab 2 – VLAN avancés et sécurisation</p>
      <p className="text-slate-300 text-sm">SW-Core, SW-Dist. VLAN 99, trunk, ports désactivés.</p>
    </div>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">1. VLAN 99 Management (sur chaque switch)</h4>
      <CmdBlock lines={[
        { prompt: "Switch(config)#", cmd: "vlan 99" },
        { prompt: "Switch(config-vlan)#", cmd: "name Management" },
        { prompt: "Switch(config-vlan)#", cmd: "exit" },
        { prompt: "Switch(config)#", cmd: "interface vlan 99" },
        { prompt: "Switch(config-if)#", cmd: "ip address 192.168.1.x 255.255.255.0" },
        { prompt: "Switch(config-if)#", cmd: "no shutdown" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">2. Trunk sécurisé</h4>
      <CmdBlock lines={[
        { prompt: "Switch(config)#", cmd: "interface fa0/24" },
        { prompt: "Switch(config-if)#", cmd: "switchport mode trunk" },
        { prompt: "Switch(config-if)#", cmd: "switchport trunk allowed vlan 99" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">3. Ports inutilisés désactivés</h4>
      <CmdBlock lines={[
        { prompt: "Switch(config)#", cmd: "interface range fa0/1-23" },
        { prompt: "Switch(config-if-range)#", cmd: "shutdown" }
      ]} />
    </section>
  </div>
);

const _CorrectionLab2Session2Verbose = () => (
  <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-xl relative hidden">
    <nav className="sticky top-0 z-50 bg-slate-800/98 backdrop-blur-md border-b border-slate-700 py-2 shadow-lg">
      <div className="flex items-center gap-3 flex-wrap px-2">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis:</span>
        {[
          { id: 'lab2s2-etape0', label: 'Setup Base', icon: '🔵' },
          { id: 'lab2s2-etape1', label: 'VLAN 99', icon: '🟪' },
          { id: 'lab2s2-etape2', label: 'Trunk', icon: '🔗' },
          { id: 'lab2s2-etape3', label: 'Ports off', icon: '🔒' },
          { id: 'lab2s2-etape4', label: 'Vérifications', icon: '🔍' },
          { id: 'lab2s2-etape5', label: 'Sauvegarde', icon: '💾' },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              const element = document.getElementById(id);
              if (element) {
                // Trouver le conteneur scrollable parent
                const scrollContainer = element.closest('.overflow-y-auto');
                if (scrollContainer) {
                  const navHeight = 60;
                  const containerTop = scrollContainer.getBoundingClientRect().top;
                  const elementTop = element.getBoundingClientRect().top;
                  const scrollPosition = scrollContainer.scrollTop + (elementTop - containerTop - navHeight);
                  scrollContainer.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                } else {
                  const navHeight = 60;
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navHeight;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }
            }}
            className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-blue-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
          >
            <span className="text-[10px]">{icon}</span> {label}
          </button>
        ))}
      </div>
    </nav>

    <div className="p-5 space-y-6">
      {/* PLAN DU LAB */}
      <section>
        <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">🧩 Plan du lab</h2>
        <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1">
          <li>Setup de base (hostname, mot de passe, console) sur SW-Core et SW-Dist</li>
          <li>Création du VLAN 99 (Management)</li>
          <li>Configuration de l'IP de management (SVI) sur SW-Core et SW-Dist</li>
          <li>Connexion du PC Admin au VLAN 99</li>
          <li>Configuration du trunk sécurisé (native VLAN 99, VLAN 99 uniquement autorisé)</li>
          <li>Désactivation des ports inutilisés</li>
          <li>Vérifications avec les commandes show et ping</li>
          <li>Sauvegarde</li>
        </ul>
      </section>

      {/* CÂBLAGE */}
      <section>
        <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3">🔌 Câblage</h2>
        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1">
            <li><strong>PC Admin</strong> branché sur <strong>SW-Core Fa0/1</strong></li>
            <li><strong>Trunk inter-switch :</strong> SW-Core Fa0/2 ↔ SW-Dist Fa0/1</li>
          </ul>
          <p className="text-slate-400 text-xs mt-2">Port PC (access VLAN 99) = SW-Core Fa0/1 — Port trunk = SW-Core Fa0/2 et SW-Dist Fa0/1</p>
        </div>
      </section>

      {/* TABLE D'ADRESSAGE IP */}
      <section>
        <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3">📋 Table d'adressage IP</h2>
        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-700/80 border-b border-slate-600">
                <th className="text-left py-2 px-3 text-slate-200 font-semibold">Équipement</th>
                <th className="text-left py-2 px-3 text-slate-200 font-semibold">Interface</th>
                <th className="text-left py-2 px-3 text-slate-200 font-semibold">Adresse IP</th>
                <th className="text-left py-2 px-3 text-slate-200 font-semibold">Masque</th>
                <th className="text-left py-2 px-3 text-slate-200 font-semibold">VLAN</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              <tr className="border-b border-slate-700/50">
                <td className="py-2 px-3">SW-Core</td>
                <td className="py-2 px-3">VLAN 99 (SVI)</td>
                <td className="py-2 px-3 font-mono text-emerald-400">192.168.99.2</td>
                <td className="py-2 px-3 font-mono">255.255.255.0</td>
                <td className="py-2 px-3">99</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-2 px-3">SW-Dist</td>
                <td className="py-2 px-3">VLAN 99 (SVI)</td>
                <td className="py-2 px-3 font-mono text-emerald-400">192.168.99.3</td>
                <td className="py-2 px-3 font-mono">255.255.255.0</td>
                <td className="py-2 px-3">99</td>
              </tr>
              <tr>
                <td className="py-2 px-3">PC Admin</td>
                <td className="py-2 px-3">NIC</td>
                <td className="py-2 px-3 font-mono text-emerald-400">192.168.99.10</td>
                <td className="py-2 px-3 font-mono">255.255.255.0</td>
                <td className="py-2 px-3">99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ÉTAPE 0 — SETUP DE BASE */}
      <section id="lab2s2-etape0" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">🔵 ÉTAPE 0 — SETUP DE BASE (à faire sur SW-Core et SW-Dist)</h2>
        
        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <h3 className="text-blue-300 font-bold text-base mb-2">🔹 1️⃣ Passer en mode administrateur</h3>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur SW-Core puis SW-Dist (ou l'inverse)</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="enable">➡ Permet d'accéder au mode privilégié (#).</CmdLine>
            <CmdLine cmd="configure terminal">➡ Permet de modifier la configuration du switch.</CmdLine>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <h3 className="text-blue-300 font-bold text-base mb-2">🔹 2️⃣ Nommer le switch</h3>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 mb-3">
            <p className="text-slate-300 text-sm mb-2 font-semibold">Sur SW-Core</p>
            <CmdLine cmd="hostname SW-Core">➡ Donne un nom clair au switch.</CmdLine>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
            <p className="text-slate-300 text-sm mb-2 font-semibold">Sur SW-Dist</p>
            <CmdLine cmd="hostname SW-Dist">➡ Permet de distinguer les équipements.</CmdLine>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <h3 className="text-blue-300 font-bold text-base mb-2">🔹 3️⃣ Désactiver la résolution DNS</h3>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur SW-Core et SW-Dist</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="no ip domain-lookup">➡ Empêche le switch de bloquer si une commande est mal tapée.</CmdLine>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4">
          <h3 className="text-blue-300 font-bold text-base mb-2">🔹 4️⃣ Sécuriser l'accès console</h3>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur SW-Core et SW-Dist</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="enable secret cisco123">➡ Définit le mot de passe du mode administrateur (#).</CmdLine>
            <CmdLine cmd="line console 0">➡ Ouvre la configuration de l'accès physique.</CmdLine>
            <CmdLine cmd="password console123">➡ Définit le mot de passe console.</CmdLine>
            <CmdLine cmd="login">➡ Active la demande du mot de passe.</CmdLine>
            <CmdLine cmd="exit">➡ Retour au mode global.</CmdLine>
          </div>
        </div>
      </section>

      {/* ÉTAPE 1 — CRÉATION DU VLAN 99 */}
      <section id="lab2s2-etape1" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">🔵 ÉTAPE 1 — CRÉATION DU VLAN 99 (Management)</h2>
        
        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <p className="text-slate-300 text-sm mb-2">Sur les deux switches</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="vlan 99">➡ Crée un VLAN dédié au management.</CmdLine>
            <CmdLine cmd="name Management">➡ Donne un nom lisible au VLAN.</CmdLine>
            <CmdLine cmd="exit">➡ Quitte le mode VLAN.</CmdLine>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <h3 className="text-emerald-300 font-bold text-base mb-2">🔹 Configurer l'interface VLAN 99 (SVI)</h3>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 mb-3">
            <p className="text-slate-300 text-sm mb-2 font-semibold">Sur SW-Core :</p>
            <CmdLine cmd="interface vlan 99">➡ Ouvre l'interface virtuelle du VLAN 99.</CmdLine>
            <CmdLine cmd="ip address 192.168.99.2 255.255.255.0">➡ Donne une IP au switch pour l'administration.</CmdLine>
            <CmdLine cmd="no shutdown">➡ Active l'interface VLAN.</CmdLine>
            <CmdLine cmd="exit">➡ Quitte la configuration.</CmdLine>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
            <p className="text-slate-300 text-sm mb-2 font-semibold">Sur SW-Dist :</p>
            <CmdLine cmd="interface vlan 99">➡ Ouvre l'interface virtuelle VLAN 99.</CmdLine>
            <CmdLine cmd="ip address 192.168.99.3 255.255.255.0">➡ Donne l'IP management au second switch.</CmdLine>
            <CmdLine cmd="no shutdown">➡ Active l'interface.</CmdLine>
            <CmdLine cmd="exit">➡ Quitte la configuration.</CmdLine>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <h3 className="text-emerald-300 font-bold text-base mb-2">🔹 Connecter le PC Admin au VLAN 99</h3>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur le switch où le PC Admin est branché</p>
          <p className="text-slate-300 text-sm mb-2">Ex. : si le PC Admin est sur Fa0/1 de SW-Core, faire ces commandes sur SW-Core :</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="interface fastEthernet0/1">➡ Sélectionne le port où est branché le PC Admin.</CmdLine>
            <CmdLine cmd="switchport mode access">➡ Définit le port comme port utilisateur.</CmdLine>
            <CmdLine cmd="switchport access vlan 99">➡ Place ce port dans le VLAN 99.</CmdLine>
            <CmdLine cmd="no shutdown">➡ Active le port.</CmdLine>
            <CmdLine cmd="exit">➡ Quitte l'interface.</CmdLine>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4">
          <h3 className="text-emerald-300 font-bold text-base mb-2">🔹 Configurer l'IP du PC Admin</h3>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur le PC Admin (Packet Tracer)</p>
          <p className="text-slate-300 text-sm mb-2">Desktop → IP Configuration :</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
            <ul className="text-slate-300 text-sm space-y-1 list-disc pl-5">
              <li><strong>IP :</strong> 192.168.99.10</li>
              <li><strong>Masque :</strong> 255.255.255.0</li>
              <li><strong>Gateway :</strong> vide (pas de routeur)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ÉTAPE 2 — SÉCURISATION DU TRUNK */}
      <section id="lab2s2-etape2" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">🔵 ÉTAPE 2 — SÉCURISATION DU TRUNK</h2>
        
        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur SW-Core : port Fa0/2 (vers SW-Dist)</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0 mb-4">
            <CmdLine cmd="interface fastEthernet0/2">➡ Port trunk vers SW-Dist.</CmdLine>
            <CmdLine cmd="switchport mode trunk">➡ Permet de transporter plusieurs VLAN sur un seul câble.</CmdLine>
            <CmdLine cmd="switchport trunk native vlan 99">➡ Change le VLAN natif (évite VLAN 1 par défaut).</CmdLine>
            <CmdLine cmd="switchport trunk allowed vlan 99">➡ Autorise uniquement le VLAN 99 à circuler (sécurité).</CmdLine>
            <CmdLine cmd="switchport nonegotiate">➡ Désactive DTP (évite qu'un trunk se crée automatiquement).</CmdLine>
            <CmdLine cmd="no shutdown">➡ Active le port.</CmdLine>
            <CmdLine cmd="exit">➡ Quitte l'interface.</CmdLine>
          </div>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur SW-Dist : port Fa0/1 (vers SW-Core)</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="interface fastEthernet0/1">➡ Port trunk vers SW-Core.</CmdLine>
            <CmdLine cmd="switchport mode trunk">➡ Même config que SW-Core.</CmdLine>
            <CmdLine cmd="switchport trunk native vlan 99">➡ VLAN natif = 99.</CmdLine>
            <CmdLine cmd="switchport trunk allowed vlan 99">➡ VLAN 99 uniquement autorisé.</CmdLine>
            <CmdLine cmd="switchport nonegotiate">➡ Désactive DTP.</CmdLine>
            <CmdLine cmd="no shutdown">➡ Active le port.</CmdLine>
            <CmdLine cmd="exit">➡ Quitte l'interface.</CmdLine>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4">
          <h3 className="text-emerald-300 font-bold text-base mb-2">🔹 Vérifier le trunk</h3>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="show interfaces trunk">➡ SW-Core : trunk sur Fa0/2 — SW-Dist : trunk sur Fa0/1. Native VLAN = 99, Allowed = 99</CmdLine>
          </div>
          <p className="text-amber-500/90 text-xs mt-2">⚠️ Si rien ne s'affiche : vérifier câble (SW-Core Fa0/2 ↔ SW-Dist Fa0/1), <code>no shutdown</code> sur les ports trunk</p>
        </div>
      </section>

      {/* ÉTAPE 3 — DÉSACTIVER LES PORTS INUTILISÉS */}
      <section id="lab2s2-etape3" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3">🔵 ÉTAPE 3 — DÉSACTIVER LES PORTS INUTILISÉS</h2>
        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4">
          <p className="text-amber-500/90 text-xs mb-2">⚠️ Ne pas toucher : SW-Core Fa0/1 (PC), Fa0/2 (trunk) — SW-Dist Fa0/1 (trunk)</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 mb-4">
            <p className="text-slate-300 text-sm mb-2 font-semibold">Sur SW-Core :</p>
            <CmdLine cmd="interface range fastEthernet0/3 - 24">➡ Ports inutilisés (pas Fa0/1 ni Fa0/2).</CmdLine>
            <CmdLine cmd="shutdown">➡ Désactive les ports pour éviter les connexions non autorisées.</CmdLine>
            <CmdLine cmd="exit">➡ Quitte l'interface.</CmdLine>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
            <p className="text-slate-300 text-sm mb-2 font-semibold">Sur SW-Dist :</p>
            <CmdLine cmd="interface range fastEthernet0/2 - 24">➡ Ports inutilisés (pas Fa0/1 trunk).</CmdLine>
            <CmdLine cmd="shutdown">➡ Désactive les ports.</CmdLine>
            <CmdLine cmd="exit">➡ Quitte l'interface.</CmdLine>
          </div>
        </div>
      </section>

      {/* ÉTAPE 4 — VÉRIFICATIONS FINALES */}
      <section id="lab2s2-etape4" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">🔵 ÉTAPE 4 — VÉRIFICATIONS FINALES</h2>
        
        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <h3 className="text-blue-300 font-bold text-base mb-2">🔹 Vérifier VLAN</h3>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur SW-Core et SW-Dist</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="show vlan brief">➡ VLAN 99 doit contenir Fa0/1 (PC). Fa0/2 en trunk peut rester affiché dans VLAN 1, c'est normal.</CmdLine>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <h3 className="text-blue-300 font-bold text-base mb-2">🔹 Vérifier le trunk</h3>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur SW-Core et SW-Dist</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="show interfaces trunk">➡ Vérifie que : Native VLAN = 99, Allowed VLAN = 99</CmdLine>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4 mb-4">
          <h3 className="text-blue-300 font-bold text-base mb-2">🔹 Tester le ping</h3>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur le PC Admin</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-2">
            <div>
              <p className="text-slate-300 text-sm mb-1 font-semibold">Ping SW-Core :</p>
              <CmdLine cmd="ping 192.168.99.2">➡ Teste la connectivité vers SW-Core</CmdLine>
            </div>
            <div>
              <p className="text-slate-300 text-sm mb-1 font-semibold">Ping SW-Dist :</p>
              <CmdLine cmd="ping 192.168.99.3">➡ Teste la connectivité vers SW-Dist</CmdLine>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-2 italic">➡ Si ça répond = VLAN management fonctionne.</p>
        </div>

        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4">
          <h3 className="text-blue-300 font-bold text-base mb-2">🔹 Vérifier que ports inutilisés sont down</h3>
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur SW-Core et SW-Dist</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="show ip interface brief">➡ Les ports inutilisés doivent être "administratively down".</CmdLine>
          </div>
        </div>
      </section>

      {/* SAUVEGARDE */}
      <section id="lab2s2-etape5" className="scroll-mt-4">
        <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">🔵 SAUVEGARDE</h2>
        <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4">
          <p className="text-amber-300 text-sm mb-2 font-semibold">🖥️ Sur SW-Core et SW-Dist</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600 space-y-0">
            <CmdLine cmd="copy running-config startup-config">➡ Sauvegarde permanente.</CmdLine>
          </div>
        </div>
      </section>
    </div>

    <div className="bg-blue-900/20 border-t border-blue-500/30 p-4">
      <p className="text-blue-300 text-sm font-medium flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Résultat final : Câblage PC sur SW-Core Fa0/1, trunk SW-Core Fa0/2 ↔ SW-Dist Fa0/1 ; VLAN 99 (Management) ; IP gestion 192.168.99.2 / 192.168.99.3 ; PC Admin 192.168.99.10 ; Trunk sécurisé (native 99, allowed 99, nonegotiate) ; Ports inutilisés désactivés (SW-Core Fa0/3-24, SW-Dist Fa0/2-24). Vérif : show vlan brief, show interfaces trunk, show ip interface brief, ping 192.168.99.2 et 192.168.99.3.</p>
    </div>
  </div>
);

// --- DONNÉES DE COURS (théorie + lab + quiz) ---

const sessions = [
  {
    id: 1,
    title: "Session 1 : Sécurisation et SSH",
    duration: "1h30",
    icon: <Lock className="w-5 h-5" />,
    slides: [
      {
        type: 'intro',
        title: "Introduction : Oubliez la souris",
        content: `L'objectif de cette séance est de maîtriser les commandes fondamentales de l'administration d'un équipement Cisco.

Un routeur n'a pas d'écran, pas de souris, pas de fenêtres. On lui parle en CLI (ligne de commande) comme si on envoyait des SMS.

Si vous connaissez les bons mots, il fera tout ce que vous voulez. Sinon, il ne fera rien.

🎯 À la fin de cette session, vous serez capable de :

✅ Naviguer entre les différents modes du CLI Cisco (utilisateur, privilégié, configuration)
🔒 Sécuriser un équipement réseau (mots de passe console et enable)
🔐 Configurer et activer SSH pour un accès distant sécurisé
👤 Créer des utilisateurs avec différents niveaux de privilèges
💾 Sauvegarder vos configurations sur NVRAM et serveur TFTP
🔍 Maîtriser les commandes show essentielles pour diagnostiquer un réseau`
      },
      {
        type: 'mode_explorer',
        title: "Les 3 Modes de Fonctionnement",
        content: "Avant de taper une commande, il faut savoir dans quel mode vous êtes. Chaque mode a ses propres permissions."
      },
      {
        type: 'rich_text',
        title: "Commandes Disponibles dans Chaque Mode",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg mb-6">
              Chaque mode a ses propres commandes. Voici quelques commandes importantes que vous pouvez utiliser dans chaque mode :
            </p>

            {/* Mode Utilisateur */}
            <div className="bg-slate-800/60 border-l-4 border-blue-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <span>Router&gt;</span> Mode Utilisateur
              </h3>
              <p className="text-slate-300 mb-4 italic">"Je peux juste observer, pas toucher."</p>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-3 font-medium">Commandes disponibles :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">ping &lt;ip&gt;</code>
                    <span className="text-slate-300 text-xs">Tester la connectivité</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">traceroute &lt;ip&gt;</code>
                    <span className="text-slate-300 text-xs">Tracer le chemin réseau</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">telnet &lt;ip&gt;</code>
                    <span className="text-slate-300 text-xs">Connexion Telnet</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">ssh -l &lt;user&gt; &lt;ip&gt;</code>
                    <span className="text-slate-300 text-xs">Connexion SSH</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">enable</code>
                    <span className="text-slate-300 text-xs">Passer en mode privilégié</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">show version</code>
                    <span className="text-slate-300 text-xs">Version IOS et matériel</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">show clock</code>
                    <span className="text-slate-300 text-xs">Afficher l'heure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">show history</code>
                    <span className="text-slate-300 text-xs">Historique des commandes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">exit</code>
                    <span className="text-slate-300 text-xs">Se déconnecter</span>
                  </div>
                </div>
                <DangerZone className="mt-4">
                  <strong>Limitations :</strong> Pas de modification de configuration, pas de redémarrage, consultation uniquement.
                </DangerZone>
              </div>
            </div>

            {/* Mode Privilégié */}
            <div className="bg-slate-800/60 border-l-4 border-emerald-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <span>Router#</span> Mode Privilégié
              </h3>
              <p className="text-slate-300 mb-4 italic">"J'ai les clés mais je ne modifie pas encore."</p>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-3 font-medium">Commandes disponibles :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">show running-config</code>
                    <span className="text-slate-300 text-xs">Config actuelle (RAM)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">show startup-config</code>
                    <span className="text-slate-300 text-xs">Config sauvegardée (NVRAM)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">show ip interface brief</code>
                    <span className="text-slate-300 text-xs">État des interfaces</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">show ip ssh</code>
                    <span className="text-slate-300 text-xs">Statut SSH</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">show ssh</code>
                    <span className="text-slate-300 text-xs">Sessions SSH actives</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">show users</code>
                    <span className="text-slate-300 text-xs">Utilisateurs connectés</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">reload</code>
                    <span className="text-slate-300 text-xs">Redémarrer l'équipement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">copy run start</code>
                    <span className="text-slate-300 text-xs">Sauvegarder la config</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">copy run tftp:</code>
                    <span className="text-slate-300 text-xs">Sauvegarder vers TFTP</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">configure terminal</code>
                    <span className="text-slate-300 text-xs">Entrer en mode config</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">disable</code>
                    <span className="text-slate-300 text-xs">Retour mode utilisateur</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">clear line vty 0</code>
                    <span className="text-slate-300 text-xs">Déconnecter une session</span>
                  </div>
                </div>
                <ProTip className="mt-4">
                  <strong>Capacités :</strong> Diagnostic complet, redémarrage, sauvegarde/restauration, mais pas encore de modification de configuration.
                </ProTip>
              </div>
            </div>

            {/* Mode Configuration */}
            <div className="bg-slate-800/60 border-l-4 border-amber-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                <span>Router(config)#</span> Mode Configuration
              </h3>
              <p className="text-slate-300 mb-4 italic">"Je modifie la configuration de l'équipement."</p>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-3 font-medium">Commandes principales :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">hostname &lt;nom&gt;</code>
                    <span className="text-slate-300 text-xs">Changer le nom</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">ip domain-name &lt;nom&gt;</code>
                    <span className="text-slate-300 text-xs">Nom de domaine (SSH)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">username &lt;nom&gt; privilege &lt;n&gt; secret &lt;mdp&gt;</code>
                    <span className="text-slate-300 text-xs">Créer utilisateur</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">enable secret &lt;mdp&gt;</code>
                    <span className="text-slate-300 text-xs">Mot de passe privilégié</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">line console 0</code>
                    <span className="text-slate-300 text-xs">Config console</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">line vty 0 4</code>
                    <span className="text-slate-300 text-xs">Config SSH/Telnet</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">interface &lt;type&gt;&lt;num&gt;</code>
                    <span className="text-slate-300 text-xs">Config interface</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">no ip domain-lookup</code>
                    <span className="text-slate-300 text-xs">Désactiver DNS</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">ip ssh version 2</code>
                    <span className="text-slate-300 text-xs">Forcer SSH v2</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">crypto key generate rsa</code>
                    <span className="text-slate-300 text-xs">Générer clés RSA</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">exit</code>
                    <span className="text-slate-300 text-xs">Remonter d'un niveau</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="text-emerald-400 font-mono shrink-0">end</code>
                    <span className="text-slate-300 text-xs">Retour mode privilégié</span>
                  </div>
                </div>

                {/* Sous-modes */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-slate-400 text-sm mb-3 font-medium">Sous-modes de Configuration :</p>
                  
                  <div className="bg-slate-800/50 rounded-lg p-3 mb-3 border border-slate-600">
                    <p className="text-amber-300 font-mono text-xs mb-2">Router(config-if)#</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div><code className="text-emerald-400">ip address &lt;ip&gt; &lt;masque&gt;</code> <span className="text-slate-400">→ Attribuer IP</span></div>
                      <div><code className="text-emerald-400">no shutdown</code> <span className="text-slate-400">→ Activer interface</span></div>
                      <div><code className="text-emerald-400">shutdown</code> <span className="text-slate-400">→ Désactiver interface</span></div>
                      <div><code className="text-emerald-400">description &lt;texte&gt;</code> <span className="text-slate-400">→ Description</span></div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
                    <p className="text-amber-300 font-mono text-xs mb-2">Router(config-line)#</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div><code className="text-emerald-400">password &lt;mdp&gt;</code> <span className="text-slate-400">→ Mot de passe</span></div>
                      <div><code className="text-emerald-400">login</code> <span className="text-slate-400">→ Activer auth</span></div>
                      <div><code className="text-emerald-400">login local</code> <span className="text-slate-400">→ Auth utilisateurs locaux</span></div>
                      <div><code className="text-emerald-400">transport input ssh</code> <span className="text-slate-400">→ SSH uniquement</span></div>
                      <div><code className="text-emerald-400">exec-timeout &lt;min&gt; &lt;sec&gt;</code> <span className="text-slate-400">→ Timeout</span></div>
                    </div>
                  </div>
                </div>

                <ProTip className="mt-4">
                  <strong>Important :</strong> Toutes les modifications sont en RAM (running-config) jusqu'à sauvegarde avec <code className="text-emerald-400 font-mono">copy running-config startup-config</code>.
                </ProTip>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-lg p-6 border border-slate-600">
              <h3 className="text-lg font-bold text-white mb-4">🔄 Navigation entre les Modes</h3>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="space-y-2 text-sm font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">Router&gt;</span>
                    <span className="text-slate-500">→</span>
                    <code className="text-emerald-400">enable</code>
                    <span className="text-slate-500">→</span>
                    <span className="text-emerald-400">Router#</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">Router#</span>
                    <span className="text-slate-500">→</span>
                    <code className="text-emerald-400">configure terminal</code>
                    <span className="text-slate-500">→</span>
                    <span className="text-amber-400">Router(config)#</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">Router(config)#</span>
                    <span className="text-slate-500">→</span>
                    <code className="text-emerald-400">interface g0/0</code>
                    <span className="text-slate-500">→</span>
                    <span className="text-amber-300">Router(config-if)#</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-300">Router(config-if)#</span>
                    <span className="text-slate-500">→</span>
                    <code className="text-emerald-400">exit</code>
                    <span className="text-slate-500">→</span>
                    <span className="text-amber-400">Router(config)#</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">Router(config)#</span>
                    <span className="text-slate-500">→</span>
                    <code className="text-emerald-400">end</code>
                    <span className="text-slate-500">→</span>
                    <span className="text-emerald-400">Router#</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">Router#</span>
                    <span className="text-slate-500">→</span>
                    <code className="text-emerald-400">disable</code>
                    <span className="text-slate-500">→</span>
                    <span className="text-blue-400">Router&gt;</span>
                  </div>
                </div>
                <ProTip className="mt-4">
                  <strong>Astuce :</strong> Utilisez <code className="text-emerald-400 font-mono">?</code> après une commande pour voir les options disponibles. Utilisez <strong>Tab</strong> pour l'auto-complétion.
                </ProTip>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Navigation entre les Modes",
        content: (
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">Voici comment naviguer entre les différents niveaux d'accès :</p>
            <HumanCommand 
              cmd="enable" 
              human="Je veux passer chef (mode privilégié)." 
              context="Prompt qui passe de 'Router>' à 'Router#'. Accès aux commandes de configuration et de diagnostic."
            />
            <HumanCommand 
              cmd="configure terminal" 
              human="Je mets mon casque chantier, je modifie le routeur." 
              context="Entrée en mode configuration globale. Prompt devient 'Router(config)#'. Toutes les modifications système se font ici."
            />
            <HumanCommand 
              cmd="exit" 
              human="Je sors du mode actuel et je remonte d'un niveau." 
              context="Pour sortir du mode config : exit. Pour revenir au mode utilisateur depuis le mode privilégié : exit aussi."
            />
            <ProTip>
              Astuce : Vous pouvez aussi utiliser <code className="text-emerald-400 font-mono">disable</code> pour passer du mode privilégié (#) au mode utilisateur (&gt;).
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Nommer l'Équipement",
        content: (
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">Donner un nom à votre équipement est essentiel pour l'identifier dans un réseau.</p>
            <HumanCommand 
              cmd="hostname R1" 
              human="Appelle-toi R1 désormais." 
              context="Le prompt change immédiatement : 'Router(config)#' devient 'R1(config)#'. Indispensable quand vous gérez plusieurs équipements."
            />
            <DangerZone>
              Attention : Le nom doit être unique dans votre réseau. Évitez les noms génériques comme "Router" ou "Switch".
            </DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Sécuriser l'Accès Console",
        content: (
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">Par défaut, n'importe qui peut se connecter en console (câble bleu) sans mot de passe. Il faut sécuriser ça.</p>
            <HumanCommand 
              cmd="line console 0" 
              human="Je veux configurer la prise physique derrière la machine." 
              context="Le '0' signifie qu'il n'y a qu'une seule prise console. Prompt devient 'Router(config-line)#'."
            />
            <HumanCommand 
              cmd="password cisco123" 
              human="Le mot de passe pour entrer est 'cisco123'." 
              context="Remplacez 'cisco123' par un mot de passe fort. En production, utilisez des mots de passe complexes."
            />
            <HumanCommand 
              cmd="login" 
              human="Active le digicode ! Sans cette commande, le mot de passe ne sert à rien." 
              context="C'est cette commande qui active réellement la demande de mot de passe à la connexion."
            />
            <HumanCommand 
              cmd="exit" 
              human="Je sors de la configuration de la ligne console." 
              context="Retour au mode 'Router(config)#'."
            />
            <ProTip>
              Pour masquer les mots de passe dans la configuration affichée, utilisez <code className="text-emerald-400 font-mono">service password-encryption</code> en mode config global.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Désactiver la Recherche DNS",
        content: (
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">Par défaut, si vous faites une faute de frappe, le routeur pense que c'est un nom de domaine et essaie de le résoudre. Ça bloque tout pendant 30 secondes.</p>
            <HumanCommand 
              cmd="no ip domain lookup" 
              human="Arrête d'essayer de traduire mes fautes de frappe sur Google." 
              context="Désactive la résolution DNS. Maintenant, si vous tapez 'pign' au lieu de 'ping', vous aurez juste une erreur immédiate au lieu d'attendre 30 secondes."
            />
            <DangerZone>
              Cette commande est souvent oubliée par les débutants. Sans elle, chaque faute de frappe = 30 secondes d'attente frustrante.
            </DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Mot de Passe Privilégié : enable password vs enable secret",
        content: (
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">Pour protéger l'accès au mode privilégié (#), vous avez deux options :</p>
            <HumanCommand 
              cmd="enable password cisco123" 
              human="Crée un mot de passe pour le mode privilégié (en clair)." 
              context="⚠️ PROBLÈME : Ce mot de passe apparaît en clair dans la configuration. N'importe qui qui lit 'show running-config' peut le voir."
            />
            <HumanCommand 
              cmd="enable secret cisco456" 
              human="Crée un mot de passe pour le mode privilégié (chiffré)." 
              context="✅ SÉCURISÉ : Ce mot de passe est hashé (MD5). Dans la config, vous verrez quelque chose comme 'enable secret 5 $1$mERr$...' au lieu du mot de passe en clair."
            />
            <DangerZone>
              <strong>Règle d'or :</strong> Si vous configurez les deux, seul <code className="text-red-400 font-mono">enable secret</code> sera utilisé. <code className="text-red-400 font-mono">enable password</code> sera ignoré. Utilisez toujours <code className="text-emerald-400 font-mono">enable secret</code> en production.
            </DangerZone>
          </div>
        )
      },
      {
        type: 'memory_sim',
        title: "RAM vs NVRAM : Le Concept Vital",
        content: "C'est l'erreur n°1 des débutants. Vous configurez pendant 2 heures, vous êtes content. Vous éteignez le routeur. Vous rallumez... et tout a disparu. Pourquoi ?"
      },
      {
        type: 'rich_text',
        title: "Sauvegarder la Configuration",
        content: (
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">Si vous ne devez retenir qu'une seule commande, c'est celle-ci.</p>
            <HumanCommand 
              cmd="copy running-config startup-config" 
              human="Copie ce qu'il y a dans ta tête (RAM) vers ton disque dur (NVRAM)." 
              context="C'est le 'CTRL+S' du routeur. Si vous ne le faites pas, au prochain redémarrage, tout est perdu."
            />
            <HumanCommand 
              cmd="write memory" 
              human="Raccourci pour sauvegarder (2 mots au lieu de 5)." 
              context="Fait exactement la même chose que 'copy running-config startup-config'. Les pros utilisent souvent 'wr' (encore plus court)."
            />
            <HumanCommand 
              cmd="write" 
              human="Le raccourci ultime (1 seul mot)." 
              context="Équivalent à 'write memory'. Très pratique pour sauvegarder rapidement."
            />
            <ProTip>
              <strong>Astuce Pro :</strong> Après chaque modification importante, faites immédiatement un <code className="text-emerald-400 font-mono">copy run start</code> (raccourci accepté aussi). Ne repoussez jamais la sauvegarde à plus tard.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Vérifier la Configuration : Les Commandes 'show'",
        content: (
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">Pour voir ce qui est configuré, utilisez les commandes 'show' :</p>
            <HumanCommand 
              cmd="show running-config" 
              human="Montre-moi tout ce qui est configuré actuellement (en RAM)." 
              context="Affiche la configuration active. C'est ce qui tourne en ce moment. Très long à afficher, utilisez 'show run' pour raccourcir."
            />
            <HumanCommand 
              cmd="show startup-config" 
              human="Montre-moi ce qui sera chargé au prochain démarrage (en NVRAM)." 
              context="Affiche la configuration sauvegardée. C'est ce qui sera utilisé au redémarrage. Utilisez 'show start' pour raccourcir."
            />
            <HumanCommand 
              cmd="show version" 
              human="Donne-moi les infos système : version IOS, matériel, uptime, mémoire." 
              context="Affiche la version du système d'exploitation IOS, le modèle du matériel, depuis combien de temps le routeur tourne, et l'état de la mémoire."
            />
            <HumanCommand 
              cmd="show interfaces" 
              human="Montre-moi l'état de toutes les interfaces réseau." 
              context="Affiche le statut de chaque interface (up/down), les adresses IP configurées, les statistiques de trafic. Utilisez 'show int' pour raccourcir."
            />
            <ProTip>
              Toutes les commandes 'show' peuvent être raccourcies : <code className="text-emerald-400 font-mono">show running-config</code> = <code className="text-emerald-400 font-mono">sh run</code>, <code className="text-emerald-400 font-mono">show interfaces</code> = <code className="text-emerald-400 font-mono">sh int</code>, etc.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Sauvegarde/Restauration avec TFTP",
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" /> C'est quoi TFTP ?
              </h4>
              <p className="text-slate-300 leading-relaxed">
                <strong>TFTP</strong> (Trivial File Transfer Protocol) est un protocole simple pour transférer des fichiers sur le réseau. Sur un <strong>serveur TFTP</strong> (PC ou serveur dédié), vous stockez des copies de vos configurations. C'est comme avoir une sauvegarde externe : si le routeur tombe en panne ou que quelqu'un efface la config, vous récupérez la version sauvegardée sur le serveur.
              </p>
            </div>

            <TFTPFlow />

            <div>
              <h4 className="text-lg font-bold text-white mb-2">Sauvegarder vers le serveur (routeur → TFTP)</h4>
              <HumanCommand 
                cmd="copy running-config tftp:" 
                human="Envoie ma configuration actuelle (celle en RAM) vers un serveur TFTP." 
                context="Après avoir tapé la commande, le routeur demande : 1) Adresse IP du serveur TFTP, 2) Nom du fichier (ex. R1-backup.cfg). La config est copiée sur le serveur = sauvegarde centralisée."
              />
              <p className="text-slate-400 text-sm mt-2 pl-2 border-l-2 border-slate-600">
                <strong>Quand l'utiliser ?</strong> Après une modification importante, ou régulièrement, pour garder une copie de secours en dehors du routeur.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-2">Restaurer depuis le serveur (TFTP → routeur)</h4>
              <HumanCommand 
                cmd="copy tftp: running-config" 
                human="Récupère un fichier de config depuis un serveur TFTP et le charge en RAM (à la place de la config actuelle)." 
                context="Le routeur demande l'IP du serveur et le nom du fichier. La config reçue remplace tout ce qui est en RAM. Ce qui était en cours est perdu si vous n'avez pas sauvegardé avant."
              />
              <DangerZone>
                <strong>Restauration = écrasement.</strong> La commande <code className="text-red-400 font-mono">copy tftp: running-config</code> remplace entièrement votre configuration actuelle par celle du fichier. Avant de lancer cette commande : faites un <code className="text-emerald-400 font-mono">copy running-config startup-config</code> si vous voulez garder une copie de l’état actuel, ou acceptez de perdre la config en cours. Utilisez la restauration pour remettre une ancienne config connue (après incident ou test).
              </DangerZone>
            </div>

            <ProTip>
              <strong>Avantages du TFTP :</strong> Sauvegarde centralisée de tous vos équipements sur un seul serveur ; restauration rapide en cas de panne ; possibilité de dupliquer une config sur plusieurs routeurs identiques en restaurant le même fichier.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Résumé : running-config vs startup-config",
        content: (
          <div className="space-y-4">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5" /> running-config (RAM)
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm list-disc list-inside">
                <li>Configuration <strong>en cours</strong>, stockée en RAM</li>
                <li>C'est ce qui tourne <strong>maintenant</strong></li>
                <li>Disparaît si vous éteignez le routeur sans sauvegarder</li>
                <li>Modifiée à chaque fois que vous tapez une commande de config</li>
              </ul>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <HardDrive className="w-5 h-5" /> startup-config (NVRAM)
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm list-disc list-inside">
                <li>Configuration <strong>sauvegardée</strong>, stockée en NVRAM</li>
                <li>C'est ce qui sera <strong>chargé au démarrage</strong></li>
                <li>Persiste même après coupure de courant</li>
                <li>Modifiée uniquement avec <code className="text-emerald-400 font-mono">copy running-config startup-config</code></li>
              </ul>
            </div>
            <DangerZone>
              <strong>Que se passe-t-il si vous oubliez 'copy run start' ?</strong> Toutes vos modifications seront perdues au redémarrage. Le routeur chargera l'ancienne startup-config, comme si vous n'aviez rien fait.
            </DangerZone>
          </div>
        )
      },
      {
        type: 'interactive_quiz',
        title: "Quiz Interactif : Teste tes Connaissances",
        questions: [
          { q: "Quel prompt indique le mode privilégié ?", options: [">", "#", "(config)#"], a: 1 },
          { q: "Quelle est la différence entre running-config et startup-config ?", options: ["Aucune différence", "running-config est en RAM (actuelle), startup-config est en NVRAM (sauvegardée)", "running-config est sauvegardée, startup-config est temporaire"], a: 1 },
          { q: "Que fait la commande 'copy running-config startup-config' ?", options: ["Redémarre le routeur", "Sauvegarde la config active dans la NVRAM", "Efface la configuration"], a: 1 },
          { q: "Pourquoi utiliser 'enable secret' plutôt que 'enable password' ?", options: ["enable secret est plus rapide", "enable secret est chiffré (hashé MD5), donc plus sécurisé", "enable password ne fonctionne pas"], a: 1 },
          { q: "Que se passe-t-il si on oublie de faire 'copy running-config startup-config' après modification ?", options: ["Rien, c'est automatique", "Toutes les modifications seront perdues au redémarrage", "Le routeur plante"], a: 1 }
        ]
      },
      {
        type: 'command_builder',
        title: "Construire la Configuration de Base",
        steps: [
          { cmd: "enable", desc: "Passer en mode privilégié" },
          { cmd: "configure terminal", desc: "Entrer en configuration globale" },
          { cmd: "hostname R-Nova", desc: "Nommer le routeur" },
          { cmd: "enable secret cisco123", desc: "Définir le mot de passe privilégié" },
          { cmd: "copy running-config startup-config", desc: "Sauvegarder la configuration" }
        ]
      },
      {
        type: 'intro',
        title: "Partie 2 : Connexion sécurisée (SSH)",
        content: `Après avoir sécurisé l'accès local (console, enable), on sécurise l'accès à distance avec SSH. SSH chiffre toute la conversation avec l'équipement (mots de passe, commandes).

🎯 À la fin de cette partie, vous serez capable de :

🔓 Comprendre la différence entre Telnet (non sécurisé) et SSH (chiffré)
🔑 Générer des clés RSA pour activer SSH sur un équipement Cisco
🌐 Configurer un nom de domaine requis pour SSH
👥 Créer des utilisateurs locaux avec authentification
🚪 Restreindre les lignes VTY pour accepter uniquement SSH
🧪 Tester une connexion SSH depuis un PC ou un autre équipement`
      },
      {
        type: 'rich_text',
        title: "Pourquoi SSH ? Le Problème de Telnet",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Par défaut, Cisco utilise <strong>Telnet</strong> pour les connexions à distance. Le problème : <strong>tout transite en clair</strong> sur le réseau. Si quelqu'un intercepte le trafic (sniffing), il voit ton mot de passe, tes commandes, tout.
            </p>
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-200 font-bold mb-2">🚨 Risques avec Telnet :</p>
              <ul className="text-red-100/90 text-sm space-y-1 list-disc list-inside">
                <li>Mots de passe visibles en clair</li>
                <li>Commandes interceptables</li>
                <li>Pas d'authentification forte</li>
                <li>Vulnérable aux attaques "man-in-the-middle"</li>
              </ul>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>SSH (Secure Shell)</strong> chiffre toute la session : authentification, commandes, réponses. Même si quelqu'un intercepte, il ne peut rien lire. C'est le standard en production.
            </p>
            <ProTip>
              <strong>Règle d'or :</strong> En entreprise, <strong>jamais de Telnet en production</strong>. SSH uniquement. Certaines entreprises bloquent même Telnet au niveau du firewall.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Prérequis : IP et Connectivité",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Avant de configurer SSH, l'équipement doit avoir une <strong>adresse IP</strong> et être joignable depuis le réseau.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <h4 className="text-blue-400 font-bold mb-2">Sur un routeur :</h4>
              <HumanCommand 
                cmd="interface gigabitEthernet0/0" 
                human="Sélectionner l'interface connectée au réseau." 
                context="Cette interface doit avoir une IP pour être joignable en SSH. Exemple : 192.168.1.1/24."
              />
              <HumanCommand 
                cmd="ip address 192.168.1.1 255.255.255.0" 
                human="Attribuer l'IP de gestion." 
                context="C'est cette IP que tu utiliseras pour te connecter en SSH depuis un PC : ssh -l admin 192.168.1.1"
              />
              <HumanCommand 
                cmd="no shutdown" 
                human="Activer l'interface." 
                context="Sans cette commande, l'interface reste désactivée et aucune connexion n'est possible."
              />
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <h4 className="text-blue-400 font-bold mb-2">Sur un switch :</h4>
              <HumanCommand 
                cmd="interface vlan 1" 
                human="Ouvrir l'interface virtuelle VLAN 1 (SVI)." 
                context="Un switch n'a pas d'IP sur les ports physiques. L'IP de management se configure sur une interface virtuelle (SVI)."
              />
              <HumanCommand 
                cmd="ip address 192.168.1.2 255.255.255.0" 
                human="Attribuer l'IP de management." 
                context="Cette IP permet d'administrer le switch à distance (SSH, ping, TFTP)."
              />
              <HumanCommand 
                cmd="no shutdown" 
                human="Activer l'interface VLAN 1." 
                context="Par défaut, la SVI peut être désactivée. Il faut l'activer pour que le switch soit joignable."
              />
              <HumanCommand 
                cmd="ip default-gateway 192.168.1.1" 
                human="Configurer la passerelle." 
                context="Permet au switch de communiquer avec d'autres réseaux (ex. pour sauvegarder sur un serveur TFTP distant)."
              />
            </div>
            <DangerZone>
              <strong>Test obligatoire avant SSH :</strong> Depuis un PC, fais un <code className="text-red-400 font-mono">ping</code> vers l'IP du routeur/switch. Si le ping ne répond pas, SSH ne fonctionnera pas non plus. Vérifie la connectivité IP d'abord.
            </DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Étape 1 : Configurer le Nom de Domaine (Obligatoire)",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              SSH utilise des <strong>clés cryptographiques RSA</strong> pour chiffrer la session. Pour générer ces clés, Cisco a besoin d'un <strong>nom de domaine</strong> (même fictif).
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <HumanCommand 
                cmd="ip domain-name novatech.local" 
                human="Définir un nom de domaine (même fictif)." 
                context="Ce nom est utilisé pour générer l'identité cryptographique. Peut être n'importe quoi (ex. entreprise.local, lab.local). Sans cette commande, crypto key generate rsa échouera."
              />
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Pourquoi c'est obligatoire ?</strong> Les clés RSA contiennent une identité (hostname + domaine). Cisco utilise cette combinaison pour créer un certificat auto-signé qui authentifie l'équipement lors de la connexion SSH.
            </p>
            <ProTip>
              Le nom de domaine peut être fictif en lab. En production, utilisez le vrai nom de domaine de votre entreprise si vous avez un serveur DNS interne.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Étape 2 : Générer les Clés RSA",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Les <strong>clés RSA</strong> sont une paire de clés cryptographiques (publique + privée) qui chiffrent la session SSH. Sans elles, SSH ne peut pas fonctionner.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <HumanCommand 
                cmd="crypto key generate rsa" 
                human="Générer la paire de clés RSA." 
                context="Quand demandé, tape 1024 (minimum) ou 2048 (recommandé) pour la taille de la clé. Plus la clé est grande, plus c'est sécurisé mais plus c'est lent. En Packet Tracer, 1024 suffit."
              />
            </div>
            <div className="bg-blue-500/10 border-l-4 border-blue-500/50 p-4 rounded-r-lg">
              <p className="text-blue-200 font-bold mb-2">💡 Comment ça marche ?</p>
              <ul className="text-blue-100/90 text-sm space-y-2 list-disc list-inside">
                <li><strong>Clé privée</strong> : reste sur l'équipement, ne doit jamais être partagée</li>
                <li><strong>Clé publique</strong> : envoyée au client lors de la connexion SSH</li>
                <li>Le client chiffre les données avec la clé publique</li>
                <li>Seul l'équipement (avec la clé privée) peut déchiffrer</li>
                <li>C'est comme un cadenas : la clé publique = cadenas ouvert, la clé privée = la clé unique</li>
              </ul>
            </div>
            <DangerZone>
              Si tu vois l'erreur <code className="text-red-400 font-mono">% Please define a hostname first</code> ou <code className="text-red-400 font-mono">% Please define a domain-name first</code>, c'est que tu as oublié <code className="text-emerald-400 font-mono">hostname</code> ou <code className="text-emerald-400 font-mono">ip domain-name</code> avant.
            </DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Étape 3 : Forcer SSH Version 2",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              SSH existe en deux versions : <strong>SSH v1</strong> (ancienne, vulnérable) et <strong>SSH v2</strong> (moderne, sécurisée). Il faut forcer la v2.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <HumanCommand 
                cmd="ip ssh version 2" 
                human="Forcer SSH version 2 uniquement." 
                context="Désactive SSH v1 et n'accepte que la v2. Plus sécurisé, meilleur chiffrement, protection contre certaines attaques."
              />
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Pourquoi forcer v2 ?</strong> SSH v1 a des failles de sécurité connues. La v2 utilise des algorithmes plus robustes et des mécanismes d'authentification améliorés. C'est le standard aujourd'hui.
            </p>
            <ProTip>
              Tu peux vérifier la version SSH avec <code className="text-emerald-400 font-mono">show ip ssh</code>. Tu devrais voir "SSH Enabled - version 2.0".
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Étape 4 : Créer les Utilisateurs Locaux",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              SSH demande un <strong>identifiant et un mot de passe</strong>. Au lieu d'un seul mot de passe enable, on crée des <strong>utilisateurs locaux</strong> : chacun a son compte et ses droits.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <HumanCommand 
                cmd="username admin privilege 15 secret Admin123" 
                human="Créer l'utilisateur admin avec tous les droits." 
                context="privilege 15 = niveau maximum (équivalent à enable). secret = mot de passe chiffré (hashé MD5). Cet utilisateur pourra tout faire après connexion SSH."
              />
              <HumanCommand 
                cmd="username guest privilege 1 secret Guest123" 
                human="Créer l'utilisateur guest avec droits limités." 
                context="privilege 1 = mode utilisateur uniquement. Peu de commandes disponibles, pas de modification de config. Idéal pour un accès restreint (consultation, tests limités)."
              />
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h4 className="text-blue-400 font-bold mb-2">Niveaux de privilège :</h4>
              <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                <li><strong>Privilege 0</strong> : Très limité (peu utilisé)</li>
                <li><strong>Privilege 1</strong> : Mode utilisateur (consultation, tests basiques)</li>
                <li><strong>Privilege 15</strong> : Mode privilégié (tous les droits, modification de config)</li>
              </ul>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Pourquoi plusieurs utilisateurs ?</strong> En entreprise, tu donnes l'accès admin seulement aux administrateurs réseau. Les autres utilisateurs (techniciens, stagiaires) ont un compte limité qui ne peut pas modifier la configuration.
            </p>
            <ProTip>
              Vérifie les utilisateurs créés avec <code className="text-emerald-400 font-mono">show running-config | include username</code>. Tu devrais voir les deux lignes username avec les privilèges.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Étape 5 : Configurer les Lignes VTY (SSH Only)",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Les <strong>lignes VTY</strong> (Virtual Terminal) gèrent les connexions à distance (Telnet, SSH). On les configure pour n'accepter que SSH, avec authentification par utilisateurs locaux.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <HumanCommand 
                cmd="line vty 0 4" 
                human="Configurer les lignes virtuelles pour l'accès distant." 
                context="VTY 0 à 4 = 5 'portes' pour les connexions distantes. Chaque session SSH (ou Telnet) utilise une de ces lignes. On les configure toutes en même temps pour uniformiser la sécurité."
              />
              <HumanCommand 
                cmd="login local" 
                human="Utiliser les utilisateurs locaux pour l'authentification." 
                context="Sans login local, le routeur demanderait le mot de passe enable à tous. Avec login local, il demande le login + mot de passe des utilisateurs créés (admin, guest)."
              />
              <HumanCommand 
                cmd="transport input ssh" 
                human="Autoriser uniquement SSH, interdire Telnet." 
                context="Par défaut, VTY accepte Telnet (non chiffré). transport input ssh désactive Telnet : seules les connexions SSH sont autorisées. Les mots de passe ne transitent plus en clair."
              />
              <HumanCommand 
                cmd="exec-timeout 1 0" 
                human="Déconnecter après 60 secondes d'inactivité." 
                context="1 0 = 1 minute et 0 seconde. Si tu restes inactif 60 s, la session se ferme. Évite qu'une session oubliée reste ouverte (risque de sécurité si quelqu'un accède à ton poste)."
              />
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <h4 className="text-blue-400 font-bold mb-2">Optionnel : Protection anti brute-force</h4>
              <HumanCommand 
                cmd="exit" 
                human="Sortir du mode line." 
                context="Pour appliquer login block-for au niveau config (pas au niveau line)."
              />
              <HumanCommand 
                cmd="login block-for 60 attempts 3 within 60" 
                human="Protection contre les attaques par dictionnaire." 
                context="3 mots de passe incorrects en 60 secondes → blocage de toute tentative de connexion pendant 60 secondes. Ralentit fortement les attaques automatisées."
              />
            </div>
            <DangerZone>
              <strong>Attention :</strong> Si tu oublies <code className="text-red-400 font-mono">login local</code>, le routeur ne demandera pas les utilisateurs locaux et la connexion SSH échouera. Si tu oublies <code className="text-red-400 font-mono">transport input ssh</code>, Telnet sera toujours accepté (non sécurisé).
            </DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "SSH en bref : Résumé des Commandes",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed">Pour activer SSH il faut : <strong>hostname</strong> + <strong>ip domain-name</strong> + <strong>username</strong> + <strong>crypto key generate rsa</strong> + <strong>line vty</strong> avec <code className="bg-black/40 px-1 rounded">login local</code> et <code className="bg-black/40 px-1 rounded">transport input ssh</code>.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500/50 p-4 rounded-r-lg">
              <p className="text-emerald-200 font-bold mb-2">📋 Checklist SSH :</p>
              <ol className="text-emerald-100/90 text-sm space-y-1 list-decimal list-inside">
                <li>IP configurée sur l'interface (routeur) ou VLAN 1 (switch)</li>
                <li>hostname configuré</li>
                <li>ip domain-name configuré</li>
                <li>Clés RSA générées (crypto key generate rsa)</li>
                <li>SSH v2 forcé (ip ssh version 2)</li>
                <li>Utilisateurs locaux créés (username ... privilege ... secret ...)</li>
                <li>Lignes VTY configurées (login local + transport input ssh)</li>
                <li>Test ping depuis le PC vers l'IP de l'équipement</li>
                <li>Test connexion SSH depuis le PC</li>
              </ol>
            </div>
            <ProTip>Sur un switch : donner une IP via <code className="bg-black/40 px-1 rounded">interface vlan 1</code> + <code className="bg-black/40 px-1 rounded">ip address</code> + <code className="bg-black/40 px-1 rounded">no shutdown</code> pour pouvoir s'y connecter en SSH.</ProTip>
          </div>
        )
      },
      {
        type: 'network_diagram',
        title: "Diagramme Réseau : PC → Switch → Routeur",
        mode: 'ssh'
      },
      {
        type: 'data_flow',
        title: "Flux de Données : SSH vs Telnet (Chiffré ou Clair)"
      },
      {
        type: 'ssh_configurator',
        title: "Simulateur : Configurer SSH Étape par Étape"
      },
      {
        type: 'privilege_explorer',
        title: "Niveaux de Privilège (0, 1, 15)"
      },
      {
        type: 'config_comparison',
        title: "Avant / Après Sécurisation",
        before: ['line vty 0 4', 'password cisco', 'login'],
        after: ['ip domain-name novatech.local', 'username admin privilege 15 secret xxx', 'crypto key generate rsa', 'line vty 0 4', 'login local', 'transport input ssh']
      },
      {
        type: 'ssh_flow',
        title: "Flux de Connexion SSH (5 Étapes)"
      },
      {
        type: 'rich_text',
        title: "Comment Fonctionne une Connexion SSH ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Quand tu te connectes en SSH, voici ce qui se passe étape par étape :
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-4">
              <div className="border-l-4 border-blue-500/50 pl-4">
                <h4 className="text-blue-400 font-bold mb-2">1. Demande de connexion</h4>
                <p className="text-slate-300 text-sm">Le PC envoie une demande de connexion SSH vers l'IP de l'équipement (ex. <code className="bg-slate-900 px-1 rounded">ssh -l admin 192.168.1.1</code>).</p>
              </div>
              <div className="border-l-4 border-blue-500/50 pl-4">
                <h4 className="text-blue-400 font-bold mb-2">2. Échange des clés</h4>
                <p className="text-slate-300 text-sm">L'équipement envoie sa clé publique RSA au PC. Le PC vérifie l'identité (première connexion = avertissement, puis acceptation).</p>
              </div>
              <div className="border-l-4 border-blue-500/50 pl-4">
                <h4 className="text-blue-400 font-bold mb-2">3. Chiffrement de la session</h4>
                <p className="text-slate-300 text-sm">Les deux parties négocient un algorithme de chiffrement (AES, 3DES...) et établissent une session chiffrée.</p>
              </div>
              <div className="border-l-4 border-blue-500/50 pl-4">
                <h4 className="text-blue-400 font-bold mb-2">4. Authentification</h4>
                <p className="text-slate-300 text-sm">Le PC envoie le login (admin) et le mot de passe, <strong>chiffrés</strong> dans la session sécurisée. L'équipement vérifie avec les utilisateurs locaux.</p>
              </div>
              <div className="border-l-4 border-emerald-500/50 pl-4">
                <h4 className="text-emerald-400 font-bold mb-2">5. Session active</h4>
                <p className="text-slate-300 text-sm">Une fois authentifié, toutes les commandes et réponses sont chiffrées. Tu es connecté comme si tu étais en console, mais à distance et de manière sécurisée.</p>
              </div>
            </div>
            <ProTip>
              <strong>Première connexion SSH :</strong> Le PC te demande de confirmer l'identité de l'équipement (fingerprint de la clé). C'est normal ! Tape "yes" pour accepter. Ensuite, cette vérification sera automatique.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Tester la Connexion SSH",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Une fois SSH configuré, teste depuis un PC ou un autre équipement.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <h4 className="text-blue-400 font-bold mb-2">Depuis un PC (Command Prompt) :</h4>
              <HumanCommand 
                cmd="ssh -l admin 192.168.1.1" 
                human="Se connecter en SSH avec l'utilisateur admin." 
                context="-l admin = login avec l'utilisateur admin. Le PC demande ensuite le mot de passe (Admin123). Une fois connecté, tu es en mode utilisateur (>). Tape enable pour passer en mode privilégié."
              />
              <HumanCommand 
                cmd="ssh -l guest 192.168.1.1" 
                human="Se connecter avec l'utilisateur guest (droits limités)." 
                context="L'utilisateur guest (privilege 1) a des droits limités. Il peut faire show, ping, mais pas modifier la config. Teste pour voir la différence avec admin."
              />
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <h4 className="text-blue-400 font-bold mb-2">Vérifications sur l'équipement :</h4>
              <HumanCommand 
                cmd="show ssh" 
                human="Voir les sessions SSH actives." 
                context="Affiche qui est connecté en SSH : utilisateur, adresse IP source, durée de connexion. Utile pour surveiller les accès."
              />
              <HumanCommand 
                cmd="show ip ssh" 
                human="Vérifier le statut SSH." 
                context="Affiche la version SSH (devrait être 2.0), le timeout, le nombre de tentatives. Confirme que SSH est bien activé et configuré."
              />
            </div>
            <DangerZone>
              <strong>Si la connexion SSH échoue :</strong> Vérifie dans l'ordre : 1) Ping fonctionne ? 2) IP configurée ? 3) Clés RSA générées ? 4) Utilisateurs locaux créés ? 5) Lignes VTY avec login local + transport input ssh ? 6) SSH v2 activé ?
            </DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Dépannage SSH",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Pour diagnostiquer une connexion SSH qui échoue ou vérifier le statut SSH sur l'équipement, utilise ces commandes en mode privilégié (#).
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <HumanCommand cmd="terminal monitor" human="Activer l'affichage des messages de debug en SSH sur la session courante (console ou Telnet). Sans ça, certains debugs ne s'affichent pas." />
              <HumanCommand cmd="show ip ssh" human="Affiche le statut SSH : version (1 ou 2), timeout, nombre de tentatives d'authentification. Vérifie que SSH est bien activé." />
              <HumanCommand cmd="show ssh" human="Affiche les sessions SSH actives (connexions en cours, utilisateurs connectés). Utile pour voir qui est loggé." />
            </div>
            <ProTip>Si la connexion SSH échoue : vérifier <code className="bg-black/40 px-1 rounded">show ip ssh</code> (SSH activé ?), que le domaine et les clés RSA sont configurés, et que les lignes VTY ont <code className="bg-black/40 px-1 rounded">transport input ssh</code> et <code className="bg-black/40 px-1 rounded">login local</code>.</ProTip>
          </div>
        )
      },
      {
        type: 'flashcards',
        title: "Révision Complète : Toutes les Commandes",
        mode: 'command_to_definition',
        cards: [
          { q: "enable", a: "Passer en mode privilégié (de '>' vers '#')" },
          { q: "configure terminal", a: "Entrer en mode configuration globale" },
          { q: "hostname <nom>", a: "Changer le nom de l'équipement" },
          { q: "line console 0", a: "Configurer l'accès console physique" },
          { q: "password <mdp>", a: "Définir un mot de passe (dans le contexte d'une ligne)" },
          { q: "login", a: "Activer la demande de mot de passe à la connexion" },
          { q: "no ip domain lookup", a: "Désactiver la résolution DNS (évite les délais)" },
          { q: "enable secret <mdp>", a: "Définir un mot de passe privilégié chiffré (sécurisé)" },
          { q: "enable password <mdp>", a: "Définir un mot de passe privilégié en clair (non sécurisé)" },
          { q: "copy running-config startup-config", a: "Sauvegarder la config active dans la NVRAM" },
          { q: "write memory", a: "Raccourci pour sauvegarder (équivalent à copy run start)" },
          { q: "write", a: "Raccourci ultime pour sauvegarder" },
          { q: "show running-config", a: "Afficher la configuration active (en RAM)" },
          { q: "show startup-config", a: "Afficher la configuration sauvegardée (en NVRAM)" },
          { q: "show version", a: "Afficher la version IOS, matériel, uptime, mémoire" },
          { q: "show interfaces", a: "Afficher le statut de toutes les interfaces réseau" },
          { q: "copy running-config tftp:", a: "Sauvegarder la config vers un serveur TFTP" },
          { q: "copy tftp: running-config", a: "Restaurer une config depuis un serveur TFTP" },
          { q: "service password-encryption", a: "Masquer les mots de passe dans la config affichée" },
          { q: "exit", a: "Sortir du mode actuel et remonter d'un niveau" },
          { q: "ip domain-name <nom>", a: "Définir un nom de domaine (requis pour SSH)" },
          { q: "crypto key generate rsa", a: "Générer les clés RSA pour SSH" },
          { q: "ip ssh version 2", a: "Forcer SSH version 2 uniquement (plus sécurisé)" },
          { q: "username <nom> privilege <niveau> secret <mdp>", a: "Créer un utilisateur local avec niveau de privilège" },
          { q: "line vty 0 4", a: "Configurer les lignes virtuelles pour accès distant" },
          { q: "login local", a: "Utiliser les utilisateurs locaux pour authentification SSH" },
          { q: "transport input ssh", a: "Autoriser uniquement SSH, interdire Telnet" },
          { q: "exec-timeout <min> <sec>", a: "Déconnecter après inactivité (ex. 1 0 = 60 secondes)" },
          { q: "login block-for <sec> attempts <nb> within <sec>", a: "Protection anti brute-force (blocage après tentatives)" },
          { q: "show ip ssh", a: "Afficher le statut SSH (version, timeout, tentatives)" },
          { q: "show ssh", a: "Afficher les sessions SSH actives (utilisateurs connectés)" },
          { q: "interface vlan 1", a: "Configurer l'interface virtuelle VLAN 1 (sur switch, pour IP de management)" },
          { q: "ip default-gateway <ip>", a: "Configurer la passerelle par défaut (sur switch)" }
        ]
      },
      {
        type: 'lab_correction',
        title: "Correction du Lab 1 : Sécurisation et SSH"
      }
    ],
    lab: {
      title: "Mémo des Commandes – Session 1",
      context: "Retrouvez ici toutes les commandes vues dans le cours sur la sécurisation et SSH : navigation CLI, configuration de base, mots de passe, activation SSH, utilisateurs et sauvegarde.",
      consignes: (
        <div className="space-y-10 text-slate-200 text-base leading-relaxed">
          <div className="bg-blue-900/30 border border-blue-500/40 rounded-xl p-5">
            <p className="text-blue-100 font-semibold text-lg mb-1">Où faire les labs ?</p>
            <p className="text-blue-200/90 text-sm leading-relaxed">
              Les trois labs ci-dessous se font sur <strong>Cisco Packet Tracer</strong> (onglet Packet Tracer dans la barre latérale ou application sur ton poste). Le terminal en bas de page sert à t’entraîner aux commandes avant ou pendant le lab.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-6">
            <div>
              <h4 className="text-emerald-400 font-bold text-lg mb-1">LAB S1 – Configuration initiale (NovaTech)</h4>
              <p className="text-slate-400 text-sm">Objectif : construire un petit réseau local, nommer les équipements, les sécuriser et sauvegarder les configs sur un serveur TFTP.</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Matériel à placer</p>
              <ul className="list-none space-y-1 text-slate-300 text-sm">
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 1 routeur → à renommer <strong>R-Nova</strong></li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 2 switches → <strong>SW-Entrée</strong>, <strong>SW-Bureau</strong></li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 1 serveur TFTP → <strong>Srv-TFTP</strong></li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 1 PC → <strong>Tech-PC</strong></li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Câblage</p>
              <p className="text-slate-300 text-sm">Switches reliés au routeur. Serveur TFTP et PC Tech branchés sur un des switches (câble droit).</p>
            </div>
            <div className="border-l-2 border-emerald-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Sur le routeur</p>
              <ol className="timeline-consignes space-y-1.5 text-slate-300 text-sm">
                <li>Renommer : <strong>R-Nova</strong></li>
                <li>Donner une IP dans 192.168.10.0/24 (ex. 192.168.10.1)</li>
                <li>Désactiver la résolution DNS (<code className="text-emerald-400 font-mono text-xs">no ip domain lookup</code>)</li>
                <li>Mot de passe console + <code className="text-emerald-400 font-mono text-xs">enable secret</code></li>
                <li>Sauvegarder : <code className="text-emerald-400 font-mono text-xs">copy running-config startup-config</code></li>
              </ol>
            </div>
            <div className="border-l-2 border-emerald-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Sur chaque switch</p>
              <ol className="timeline-consignes space-y-1.5 text-slate-300 text-sm">
                <li>Nom : SW-Entrée ou SW-Bureau</li>
                <li>IP sur <code className="text-emerald-400 font-mono text-xs">interface vlan 1</code> (même réseau que le routeur, ex. .2 et .3)</li>
                <li>Mot de passe console</li>
                <li>Sauvegarder en local puis tester une sauvegarde vers le serveur TFTP</li>
              </ol>
            </div>
            <div className="border-l-2 border-emerald-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Sur le serveur TFTP</p>
              <ol className="timeline-consignes space-y-1.5 text-slate-300 text-sm">
                <li>IP dans le réseau (ex. 192.168.10.10)</li>
                <li>Activer le service TFTP (onglet Services)</li>
                <li>Vérifier : routeur et switches peuvent envoyer leur config vers le serveur</li>
              </ol>
            </div>
            <p className="text-amber-300/90 text-xs border-l-2 border-amber-500/50 pl-3 py-1">Conseil : utilise <code className="text-emerald-400 font-mono">show</code> pour vérifier ; fais un ping depuis Tech-PC vers le routeur en fin de lab.</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-6">
            <div>
              <h4 className="text-emerald-400 font-bold text-lg mb-1">LAB S2 – Sécurisation SSH (NovaTech)</h4>
              <p className="text-slate-400 text-sm">Objectif : remplacer l’accès Telnet par SSH sur un routeur et un switch. Deux comptes : un admin (tout faire), un restreint (consultation seule).</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Matériel</p>
              <p className="text-slate-300 text-sm">1 routeur <strong>R-Sec</strong>, 1 switch <strong>SW-Core</strong>, 1 PC <strong>PC-Tech</strong>. Câblage : PC → Switch → Routeur (câble droit).</p>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Routeur (R-Sec)</p>
              <ol className="timeline-consignes space-y-1.5 text-slate-300 text-sm">
                <li>Nom + IP (ex. 192.168.1.1/24)</li>
                <li>2 utilisateurs : admin (privilège 15), guest (privilège 1 ou 0)</li>
                <li>Nom de domaine + génération des clés RSA</li>
                <li>Lignes VTY : <code className="text-emerald-400 font-mono text-xs">login local</code> + <code className="text-emerald-400 font-mono text-xs">transport input ssh</code> (SSH uniquement)</li>
                <li>Optionnel : timeout 60 s, 3 tentatives max, SSH v2</li>
              </ol>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Switch (SW-Core)</p>
              <ol className="timeline-consignes space-y-1.5 text-slate-300 text-sm">
                <li>Nom + IP sur interface vlan 1 (ex. 192.168.1.2/24)</li>
                <li>Utilisateur local privilège 15 + SSH (même principe que le routeur)</li>
              </ol>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tests depuis PC-Tech</p>
              <ol className="timeline-consignes space-y-1.5 text-slate-300 text-sm">
                <li>Connexion SSH avec le compte admin → tu dois avoir tous les droits</li>
                <li>Connexion SSH avec le compte restreint → une commande comme <code className="text-emerald-400 font-mono text-xs">show running-config</code> doit être refusée</li>
              </ol>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-6">
            <div>
              <h4 className="text-emerald-400 font-bold text-lg mb-1">LAB S3 – SSH par nom (DNS)</h4>
              <p className="text-slate-400 text-sm">Objectif : te connecter au switch en tapant <code className="text-emerald-400 font-mono text-xs">ssh -l admin SW-Core</code> au lieu de l’IP. Un serveur DNS traduit le nom en adresse.</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Matériel</p>
              <p className="text-slate-300 text-sm">1 routeur <strong>R-Admin</strong>, 1 switch <strong>SW-Core</strong>, 1 serveur <strong>Srv-DNS</strong>, 1 PC <strong>PC-Tech</strong>.</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Adresses IP (à attribuer à tous)</p>
              <p className="text-slate-300 text-sm">Routeur 192.168.1.1 ; Switch 192.168.1.2 (VLAN 1) ; DNS 192.168.1.254 ; PC 192.168.1.100. Masque 255.255.255.0. Passerelle du PC et du switch = 192.168.1.1.</p>
            </div>
            <div className="border-l-2 border-violet-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">1 – Switch</p>
              <p className="text-slate-300 text-sm">Nom, interface vlan 1 (IP + <code className="text-emerald-400 font-mono text-xs">no shutdown</code>), passerelle par défaut, SSH activé. Tester : ping depuis le PC vers 192.168.1.2.</p>
            </div>
            <div className="border-l-2 border-violet-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">2 – Serveur DNS</p>
              <p className="text-slate-300 text-sm">Activer le service DNS. Ajouter une entrée : nom <strong>SW-Core</strong>, IP 192.168.1.2.</p>
            </div>
            <div className="border-l-2 border-violet-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">3 – Routeur</p>
              <p className="text-slate-300 text-sm"><code className="text-emerald-400 font-mono text-xs">ip name-server 192.168.1.254</code>. Tester : <code className="text-emerald-400 font-mono text-xs">ping SW-Core</code> → doit répondre.</p>
            </div>
            <div className="border-l-2 border-violet-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">4 – SSH par nom</p>
              <p className="text-slate-300 text-sm">Depuis le PC : <code className="text-emerald-400 font-mono text-xs">ssh -l admin SW-Core</code>. La connexion doit se faire sans taper l’IP. Vérifier que tu as les droits (niveau 15).</p>
            </div>
            <div className="border-l-2 border-slate-500/50 pl-4">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">5 – Bonus (résolution locale)</p>
              <p className="text-slate-300 text-sm">Enlever <code className="text-emerald-400 font-mono text-xs">ip name-server</code>. Sur le routeur : <code className="text-emerald-400 font-mono text-xs">ip host SW-Core 192.168.1.2</code>. Retester <code className="text-emerald-400 font-mono text-xs">ssh -l admin SW-Core</code>.</p>
            </div>
          </div>
        </div>
      ),
      initialPrompt: "Router>",
      tasks: [
        { cmd: "enable", desc: "Passer en mode privilégié" },
        { cmd: "configure terminal", desc: "Entrer en configuration globale" },
        { cmd: "hostname R-Nova", desc: "Nommer le routeur R-Nova" },
        { cmd: "no ip domain lookup", desc: "Désactiver la recherche DNS" },
        { cmd: "service password-encryption", desc: "Masquer les mots de passe" },
        { cmd: "enable secret cisco123", desc: "Mot de passe privilégié chiffré" },
        { cmd: "line console 0", desc: "Configurer la console" },
        { cmd: "password console123", desc: "Mot de passe console" },
        { cmd: "login", desc: "Activer l'authentification console" },
        { cmd: "exit", desc: "Sortir de la ligne console" },
        { cmd: "exit", desc: "Sortir du mode config" },
        { cmd: "copy running-config startup-config", desc: "Sauvegarder (partie admin)" },
        { cmd: "configure terminal", desc: "Revenir en config pour SSH" },
        { cmd: "ip domain-name novatech.local", desc: "Nom de domaine (obligatoire pour RSA)" },
        { cmd: "username admin privilege 15 secret admin123", desc: "Utilisateur pour SSH" },
        { cmd: "crypto key generate rsa", desc: "Générer les clés RSA" },
        { cmd: "line vty 0 4", desc: "Lignes VTY" },
        { cmd: "login local", desc: "Authentification locale" },
        { cmd: "transport input ssh", desc: "SSH uniquement" },
        { cmd: "exit", desc: "Sortir des lignes VTY" },
        { cmd: "ip ssh version 2", desc: "SSH v2" },
        { cmd: "ip ssh time-out 60", desc: "Timeout 60 s" },
        { cmd: "ip ssh authentication-retries 3", desc: "3 tentatives max" },
        { cmd: "exit", desc: "Sortir du mode config" },
        { cmd: "copy running-config startup-config", desc: "Sauvegarder (partie SSH)" }
      ],
      validations: {
        "enable": { nextPrompt: "Router#", msg: "OK. Vous êtes le chef (#)." },
        "configure terminal": { nextPrompt: "Router(config)#", msg: "OK. Mode configuration activé." },
        "hostname R-Nova": { nextPrompt: "R-Nova(config)#", msg: "Nom changé. C'est plus clair." },
        "no ip domain lookup": { msg: "DNS désactivé. Plus de délais sur les fautes de frappe." },
        "service password-encryption": { msg: "Mots de passe brouillés dans la config." },
        "enable secret": { msg: "Mot de passe privilégié sécurisé configuré." },
        "line console 0": { nextPrompt: "R-Nova(config-line)#", msg: "Vous configurez la prise physique." },
        "password console123": { msg: "Mot de passe console défini." },
        "login": { msg: "Sécurité console active." },
        "exit": { msg: "Sortie effectuée." },
        "copy": { msg: "[OK] Configuration sauvegardée en NVRAM." },
        "ip domain-name": { msg: "Domaine configuré (nécessaire pour la clé RSA)." },
        "username admin": { msg: "Utilisateur admin créé (privilège 15)." },
        "crypto key": { msg: "Clés RSA générées. SSH peut fonctionner." },
        "line vty": { nextPrompt: "R-Nova(config-line)#", msg: "Lignes VTY configurées." },
        "transport input ssh": { msg: "SSH uniquement activé (Telnet bloqué)." },
        "ip ssh version": { msg: "SSH version 2 forcée." },
        "ip ssh time-out": { msg: "Timeout 60 s configuré." },
        "ip ssh authentication-retries": { msg: "3 tentatives max configurées." }
      }
    },
    quiz: [
      { 
        q: "Quel prompt indique le mode privilégié ?", 
        options: [">", "#", "(config)#"], 
        a: 1,
        explanation: "Le prompt '#' indique le mode privilégié (enable mode). Le prompt '>' indique le mode utilisateur, et '(config)#' indique le mode configuration globale.",
        hint: "Pensez aux différents modes Cisco et à leurs prompts respectifs."
      },
      { 
        q: "Quelle est la différence entre running-config et startup-config ?", 
        options: ["Aucune différence", "running-config est en RAM (actuelle), startup-config est en NVRAM (sauvegardée)", "running-config est sauvegardée, startup-config est temporaire"], 
        a: 1,
        explanation: "running-config est la configuration active en RAM, modifiable mais perdue au redémarrage. startup-config est sauvegardée en NVRAM et chargée au démarrage. C'est pourquoi il faut faire 'copy running-config startup-config' pour sauvegarder.",
        hint: "RAM = temporaire, NVRAM = permanent"
      },
      { 
        q: "Que fait la commande 'copy running-config startup-config' ?", 
        options: ["Redémarre le routeur", "Sauvegarde la config active dans la NVRAM", "Efface la configuration"], 
        a: 1,
        explanation: "Cette commande copie la configuration actuelle (running-config en RAM) vers la configuration de démarrage (startup-config en NVRAM). Sans cette commande, toutes les modifications seront perdues au redémarrage.",
        hint: "C'est une commande de sauvegarde essentielle"
      },
      { 
        q: "Que permet de faire la commande 'show version' ?", 
        options: ["Affiche seulement la version IOS", "Affiche la version IOS, le matériel, l'uptime, la mémoire et autres infos système", "Redémarre le routeur"], 
        a: 1,
        explanation: "'show version' affiche des informations complètes sur le système : version IOS, modèle matériel, temps de fonctionnement (uptime), quantité de mémoire RAM/NVRAM, et informations sur les fichiers de configuration.",
        hint: "C'est une commande de diagnostic très utile"
      },
      { 
        q: "Pourquoi utiliser 'enable secret' plutôt que 'enable password' ?", 
        options: ["enable secret est plus rapide", "enable secret est chiffré (hashé MD5), donc plus sécurisé que enable password qui est en clair", "enable password ne fonctionne pas"], 
        a: 1,
        explanation: "'enable secret' utilise un hachage MD5 pour stocker le mot de passe de manière sécurisée, alors que 'enable password' le stocke en clair (ou avec un chiffrement faible). Si les deux sont configurés, 'enable secret' a la priorité.",
        hint: "Sécurité = chiffrement"
      },
      { 
        q: "Que se passe-t-il si on oublie de faire 'copy running-config startup-config' après modification ?", 
        options: ["Rien, c'est automatique", "Toutes les modifications seront perdues au redémarrage", "Le routeur plante"], 
        a: 1,
        explanation: "Sans sauvegarde, toutes les modifications restent uniquement en RAM. Au redémarrage, le routeur charge la startup-config (ancienne version), et toutes les modifications non sauvegardées sont définitivement perdues.",
        hint: "RAM = volatile, NVRAM = permanent"
      },
      { 
        q: "Que fait la commande 'no ip domain lookup' ?", 
        options: ["Active la recherche DNS", "Désactive la résolution DNS pour éviter les délais lors d'une erreur de commande", "Configure un nom de domaine"], 
        a: 1,
        explanation: "Par défaut, Cisco essaie de résoudre les noms via DNS quand vous tapez une commande incorrecte. 'no ip domain lookup' désactive cette fonctionnalité, évitant ainsi des délais de 5-10 secondes lors d'erreurs de frappe.",
        hint: "C'est une optimisation pour éviter les délais"
      },
      { 
        q: "Pour sécuriser l'accès console, quelles commandes sont nécessaires ?", 
        options: ["Seulement 'password'", "Seulement 'login'", "'line console 0', puis 'password', puis 'login'"], 
        a: 2,
        explanation: "Pour sécuriser la console, il faut : 1) Entrer en mode configuration de ligne avec 'line console 0', 2) Définir un mot de passe avec 'password [mot_de_passe]', 3) Activer la demande de mot de passe avec 'login'. Sans 'login', le mot de passe ne sera pas demandé.",
        hint: "Il faut trois étapes : entrer en mode ligne, définir le mot de passe, activer l'authentification"
      },
      { 
        q: "Quels sont les avantages de l'utilisation du TFTP ?", 
        options: ["Aucun avantage", "Sauvegarde et restauration centralisée des configurations, transfert simple de fichiers entre équipements", "TFTP est plus rapide que la sauvegarde locale"], 
        a: 1,
        explanation: "TFTP (Trivial File Transfer Protocol) permet de centraliser les sauvegardes sur un serveur, de restaurer facilement des configurations, et de transférer des fichiers entre équipements réseau. C'est essentiel pour la gestion de plusieurs équipements.",
        hint: "Centralisation et gestion de plusieurs équipements"
      },
      { 
        q: "Quelle commande permet de sauvegarder la config vers un serveur TFTP ?", 
        options: ["copy startup-config tftp:", "copy running-config tftp:", "save tftp:"], 
        a: 1,
        explanation: "'copy running-config tftp:' sauvegarde la configuration active (celle en RAM) vers le serveur TFTP. On peut aussi sauvegarder startup-config, mais running-config contient toujours la version la plus récente.",
        hint: "running-config = configuration actuelle"
      },
      { 
        q: "Dans quel mode faut-il être pour exécuter la commande 'hostname R-Nova' ?", 
        options: ["Mode utilisateur (>)", "Mode privilégié (#)", "Mode configuration globale (config)#"], 
        a: 2,
        explanation: "'hostname' est une commande de configuration, donc elle nécessite d'être en mode configuration globale. Il faut d'abord faire 'enable' puis 'configure terminal' avant de pouvoir renommer l'équipement.",
        hint: "hostname modifie la configuration"
      },
      { 
        q: "Quelle commande permet de voir toutes les interfaces et leurs adresses IP ?", 
        options: ["show ip", "show ip interface brief", "show interfaces"], 
        a: 1,
        explanation: "'show ip interface brief' affiche un résumé concis de toutes les interfaces avec leur adresse IP, leur statut (up/down) et leur protocole. C'est la commande la plus rapide pour vérifier la configuration IP.",
        hint: "brief = résumé"
      },
      { 
        q: "Que signifie 'administratively down' dans le statut d'une interface ?", 
        options: ["L'interface est cassée physiquement", "L'interface a été désactivée manuellement avec 'shutdown'", "L'interface fonctionne normalement"], 
        a: 1,
        explanation: "'administratively down' signifie que l'interface a été désactivée manuellement avec la commande 'shutdown'. Pour la réactiver, il faut utiliser 'no shutdown' en mode configuration d'interface.",
        hint: "administratively = manuellement"
      },
      { 
        q: "Quelle est la différence entre 'enable password' et 'enable secret' si les deux sont configurés ?", 
        options: ["Les deux sont utilisés", "enable secret a la priorité et est utilisé", "enable password a la priorité"], 
        a: 1,
        explanation: "Si les deux commandes sont configurées, 'enable secret' a toujours la priorité. Cisco recommande d'utiliser uniquement 'enable secret' car il est plus sécurisé (chiffrement MD5).",
        hint: "secret > password en termes de priorité"
      },
      { 
        q: "Pourquoi est-il important de sauvegarder régulièrement les configurations ?", 
        options: ["C'est une perte de temps", "Pour pouvoir restaurer rapidement en cas de problème ou d'erreur", "Pour améliorer les performances"], 
        a: 1,
        explanation: "Les sauvegardes régulières permettent de restaurer rapidement une configuration fonctionnelle en cas d'erreur de configuration, de panne matérielle, ou de remplacement d'équipement. C'est une pratique essentielle en administration réseau.",
        hint: "Pensez aux scénarios de récupération après incident"
      },
      { 
        q: "Que fait la commande 'show running-config' ?", 
        options: ["Affiche la configuration sauvegardée", "Affiche la configuration actuelle en RAM", "Redémarre le routeur"], 
        a: 1,
        explanation: "'show running-config' affiche la configuration complète actuellement active en RAM. Pour voir la configuration sauvegardée (qui sera chargée au redémarrage), il faut utiliser 'show startup-config'.",
        hint: "running = en cours d'exécution = actuel"
      },
      { 
        q: "Quelle commande permet de quitter le mode configuration et revenir au mode privilégié ?", 
        options: ["exit", "quit", "'exit' ou 'end' (les deux fonctionnent)"], 
        a: 2,
        explanation: "En mode configuration, 'exit' remonte d'un niveau (ex: de config-if vers config, puis vers #). 'end' ou Ctrl+Z revient directement au mode privilégié (#) depuis n'importe quel sous-mode de configuration.",
        hint: "end = directement au mode privilégié"
      },
      { 
        q: "Quelle est la commande pour entrer en mode configuration d'interface ?", 
        options: ["interface g0/0", "config interface g0/0", "enter interface g0/0"], 
        a: 0,
        explanation: "Pour configurer une interface, on utilise 'interface [nom_interface]' en mode configuration globale. Par exemple, 'interface gigabitEthernet0/0' ou 'interface g0/0' pour entrer en mode configuration d'interface.",
        hint: "interface [nom] depuis le mode config"
      },
      { 
        q: "Que fait la commande 'service password-encryption' ?", 
        options: ["Chiffre tous les mots de passe dans la configuration", "Désactive les mots de passe", "Améliore les performances"], 
        a: 0,
        explanation: "'service password-encryption' chiffre tous les mots de passe en clair dans la configuration (comme ceux définis avec 'password'). Cependant, 'enable secret' est toujours préférable car il utilise un chiffrement plus fort (MD5).",
        hint: "service = service global, password-encryption = chiffrement des mots de passe"
      },
      { 
        q: "Quelle commande permet de voir l'historique des commandes tapées ?", 
        options: ["show history", "show commands", "history (ou flèche haut)"], 
        a: 2,
        explanation: "L'historique des commandes peut être consulté avec la commande 'show history' ou simplement en utilisant la flèche haut du clavier. L'historique est limité à un certain nombre de commandes (par défaut 10).",
        hint: "history = historique"
      }
    ]
  },
  {
    id: 2,
    title: "Session 2 : VLAN",
    duration: "1h15",
    icon: <Network className="w-5 h-5" />,
    slides: [
      {
        type: 'intro',
        title: "Session 2 : VLAN – Calée sur les labs",
        content: `Imagine une petite entreprise : au 1er étage, le bureau Administration (compta, RH). Au 2e étage, le bureau Commercial (ventes). Un seul switch au sous-sol relie tout le monde. Sans VLAN, tout le monde est dans le même « réseau » : les commerciaux voient les broadcasts de l’admin et inversement. Avec des VLANs, on sépare logiquement : un réseau pour l’admin, un pour le commercial, sur le même switch. Cette session vous montre comment faire : créer les VLANs, brancher les bons PC sur les bons ports, donner une IP au switch pour s’y connecter en SSH, et tester. En Séance 1 : créer les VLANs, attribuer les ports, vérifier (show vlan brief, ping). Séance 2 : intro au trunk pour le Lab 2 (commandes de base). Les détails (802.1Q, VLAN natif, VLAN autorisés) sont en Session 3. Objectif : maîtriser création de VLANs, attribution des ports, et config trunk minimale pour le Lab 2.

🎯 À la fin de cette session, vous serez capable de :

🏗️ Créer et nommer des VLANs sur un switch (VLAN 10, 20, etc.)
🔌 Attribuer des ports spécifiques à un VLAN en mode access
🖥️ Configurer une interface de management (interface VLAN 1) avec une adresse IP
🔍 Vérifier la configuration des VLANs avec show vlan brief
🛡️ Comprendre l'isolation du trafic entre différents VLANs
🧪 Tester la connectivité entre machines d'un même VLAN et l'isolation inter-VLAN`
      },
      {
        type: 'rich_text',
        title: "📌 PARTIE 1 — Les VLAN : notions de base et lab Séance 1",
        content: (
          <div className="text-center py-8">
            <div className="inline-block bg-blue-600/30 border-2 border-blue-500 rounded-2xl px-8 py-6">
              <h3 className="text-2xl font-bold text-blue-100 mb-2">PARTIE 1</h3>
              <p className="text-blue-200 font-semibold">Les VLAN : notions de base et lab Séance 1</p>
              <p className="text-slate-400 text-sm mt-3">Notions théoriques → Création des VLANs → Attribution des ports (mode access)</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Qu'est-ce qu'un VLAN ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Un <strong className="text-blue-400">VLAN</strong>, c’est comme créer <strong>plusieurs petits réseaux</strong> à l’intérieur d’un seul switch. Tous les câbles arrivent au même switch, mais le switch sait : « ces ports = réseau Admin », « ces ports = réseau Commercial ». Les deux groupes ne se voient pas (pas de ping entre eux) tant qu’on n’ajoute pas un routeur.
            </p>
            <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-600/40">
              <h4 className="text-amber-300 font-bold mb-2">Exemple concret</h4>
              <p className="text-slate-300 text-sm">Entreprise NovaTech : 1 switch, 8 ports. Ports 1–2 = PC du service Admin. Ports 3–4 = PC du service Commercial. Sans VLAN : tout le monde reçoit les mêmes messages (broadcasts). Avec VLAN 10 (Admin) et VLAN 20 (Commercial) : les PC Admin ne reçoivent que le trafic Admin, les PC Commercial idem. Comme si tu avais deux switches séparés, mais en un seul boîtier.</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h4 className="text-blue-400 font-bold mb-3">Pourquoi utiliser des VLANs ?</h4>
              <ul className="list-none space-y-2 text-slate-300 text-sm">
                <li className="flex gap-2 items-start"><span className="text-emerald-400 shrink-0">•</span> <strong>Sécurité</strong> : les invités (Wi‑Fi) ne sont pas dans le même VLAN que la compta → moins de risques.</li>
                <li className="flex gap-2 items-start"><span className="text-emerald-400 shrink-0">•</span> <strong>Moins de bruit</strong> : moins de broadcasts pour tout le monde → réseau plus calme.</li>
                <li className="flex gap-2 items-start"><span className="text-emerald-400 shrink-0">•</span> <strong>Flexibilité</strong> : Marie passe de Admin à Commercial ? On change le port de VLAN, pas le câble.</li>
                <li className="flex gap-2 items-start"><span className="text-emerald-400 shrink-0">•</span> <strong>Gestion</strong> : tu peux te connecter en SSH au switch depuis le VLAN Admin ou Commercial si tu mets une IP sur chaque.</li>
              </ul>
            </div>
            <ProTip>En une phrase : un VLAN = un groupe de ports qui forment un réseau à part. Le trafic d’un VLAN ne sort pas vers les ports d’un autre VLAN (sans routeur).</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "VLAN vs réseau physique",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Sans VLAN, ton switch = <strong>un seul grand réseau</strong>. Dès qu’un PC envoie un broadcast (ex. « qui a l’IP 192.168.1.5 ? »), tous les autres PC branchés sur le switch le reçoivent. Avec des VLANs, tu découpes en plusieurs petits réseaux : le broadcast du VLAN 10 ne va pas dans le VLAN 20.
            </p>
            <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-600/40">
              <h4 className="text-amber-300 font-bold mb-2">Exemple concret</h4>
              <p className="text-slate-300 text-sm">Même immeuble, un switch pour tout le monde. <strong>Sans VLAN</strong> : le PC de la compta envoie un broadcast → le PC des ventes le reçoit aussi. Inutile et parfois gênant. <strong>Avec VLANs</strong> : le broadcast de la compta reste entre les PC du VLAN Admin ; le VLAN Commercial ne le voit pas. C’est plus propre et plus sécurisé.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-600">
                <h4 className="text-amber-400 font-bold mb-2">Sans VLAN</h4>
                <p className="text-slate-400 text-sm">Un seul réseau. Tout le monde reçoit les mêmes messages. Pas d’isolation. Pour « séparer » Admin et Commercial, il faudrait deux switches et recâbler.</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-emerald-600/50">
                <h4 className="text-emerald-400 font-bold mb-2">Avec VLANs</h4>
                <p className="text-slate-400 text-sm">Plusieurs petits réseaux sur le même switch. Admin et Commercial sont isolés. Pour déplacer un PC d’équipe, tu changes juste le VLAN du port (une commande), pas le câble.</p>
              </div>
            </div>
            <DangerZone>Deux PC dans des VLANs différents ne peuvent pas se ping. Exemple : PC Admin (VLAN 10) ping le PC Commercial (VLAN 20) → pas de réponse. C’est normal : sans routeur (ou switch couche 3), l’isolation est totale.</DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "VLAN 1 par défaut",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Quand tu sors un switch Cisco de la boîte, <strong className="text-blue-400">tous les ports sont déjà dans le VLAN 1</strong>. Tu n’as rien à faire pour ça. On garde le VLAN 1 ; on s’en sert souvent pour l’administration (mettre une IP sur le switch avec <code className="bg-black/40 px-1 rounded">interface vlan 1</code> pour SSH ou ping). Ensuite on crée d’autres VLANs (10, 20, …) pour les équipes et on met les bons ports dedans.
            </p>
            <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-600/40">
              <h4 className="text-amber-300 font-bold mb-2">Exemple concret</h4>
              <p className="text-slate-300 text-sm">Switch neuf : ports 1 à 24 = VLAN 1. Tu crées VLAN 10 (Admin) et VLAN 20 (Commercial). Tu mets les ports 1–2 dans le VLAN 10, les ports 3–4 dans le VLAN 20. Les ports 5–24 restent en VLAN 1 tant que tu ne les assignes pas. Pour vérifier : <code className="bg-black/40 px-1 rounded text-emerald-400">show vlan brief</code> → tu vois la liste des VLANs et quel port est dans quel VLAN.</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-sm">En résumé : ports non utilisés ou « par défaut » = VLAN 1. Ports des PC Admin = VLAN 10. Ports des PC Commercial = VLAN 20. Tu ne supprimes jamais le VLAN 1.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Plage des VLAN",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Les numéros de VLAN sont répartis en plages normalisées. Le <strong className="text-blue-400">nombre maximum</strong> de VLANs dépend du switch (64, 128, 1024 ou 4096 selon le modèle).
            </p>
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-2">
              <p className="text-slate-300 text-sm"><strong>VLAN 1</strong> = VLAN par défaut (tous les ports à l’usine).</p>
              <p className="text-slate-300 text-sm"><strong>2–1001</strong> = VLANs Ethernet normaux (ceux qu’on crée en lab).</p>
              <p className="text-slate-300 text-sm"><strong>1002–1005</strong> = FDDI / Token Ring (legacy, réservés).</p>
              <p className="text-slate-300 text-sm"><strong>1006–4094</strong> = plage étendue (selon logiciel).</p>
              <p className="text-slate-300 text-sm"><strong>0 et 4095</strong> = réservés aux systèmes, invisibles en config.</p>
            </div>
            <ProTip>En lab tu utilises en général 10, 20, 99… dans la plage 2–1001. Le nom (<code className="bg-black/40 px-1 rounded">name</code>) est pour l’affichage ; le numéro est utilisé par le protocole (ex. 802.1Q).</ProTip>
          </div>
        )
      },
      
      {
        type: 'rich_text',
        title: "VLAN, sous-réseau et dépannage",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Les machines d’un <strong>même VLAN</strong> doivent être dans le <strong>même sous-réseau IP</strong>. Sinon le routage ne fonctionne pas comme prévu.
            </p>
            <p className="text-slate-300 text-sm">
              Si le trafic VLAN est <strong>lent</strong>, les causes possibles sont : <strong>collision domain</strong> (carte réseau défaillante), <strong>broadcast domain</strong> (CPU, boucle), <strong>inter-VLAN / mismatch</strong> (mauvaise config trunk ou native). Une collision peut venir de congestions ou d’un mismatch (ex. VLAN natif différent de part et d’autre du trunk).
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-2">
              <p className="text-emerald-400 font-bold mb-2">Commandes utiles</p>
              <HumanCommand cmd="show vlan" human="Liste des VLANs et des ports assignés." />
              <HumanCommand cmd="show cdp neighbors" human="Voisins CDP (équipements connectés)." />
              <p className="text-slate-400 text-sm mt-2">En mode config : <code className="text-emerald-400 font-mono">vlan 50</code> crée le VLAN ; <code className="text-emerald-400 font-mono">no vlan 50</code> le supprime. <code className="text-emerald-400 font-mono">name DATA</code> ou <code className="text-emerald-400 font-mono">name FINANCE</code> modifie le nom. La commande <strong>exit</strong> en (config-vlan)# enregistre le VLAN en base avant de sortir.</p>
            </div>
          </div>
        )
      },
      
      {
        type: 'rich_text',
        title: "Ce que tu feras en lab (Séance 1)",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Le <strong>Lab Séance 1</strong> reprend exactement les étapes ci-dessous : câblage, création des VLANs, attribution des ports, puis vérifications.
            </p>
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-4">
              <p className="text-slate-300 text-sm"><strong>Étape 1 – Câblage :</strong> Un switch, PC Admin sur deux ports (ex. 1 et 2), PC Commercial sur deux autres (ex. 3 et 4).</p>
              <p className="text-slate-300 text-sm"><strong>Étape 2 – Créer les VLANs :</strong> VLAN 10 nommé Administration, VLAN 20 nommé Commercial (<code className="text-emerald-400 font-mono text-xs">vlan 10</code> + <code className="text-emerald-400 font-mono text-xs">name Administration</code> ; idem pour 20 / Commercial).</p>
              <p className="text-slate-300 text-sm"><strong>Étape 3 – Attribuer les ports :</strong> Ports PC Admin → VLAN 10, ports PC Commercial → VLAN 20. Chaque port en mode <strong>access</strong> (<code className="text-emerald-400 font-mono text-xs">switchport mode access</code> puis <code className="text-emerald-400 font-mono text-xs">switchport access vlan 10</code> ou <code className="text-emerald-400 font-mono text-xs">20</code>).</p>
              <p className="text-slate-300 text-sm"><strong>Étape 4 – Vérifier :</strong> <code className="text-emerald-400 font-mono text-xs">show vlan brief</code> → VLAN 10 et 20 avec les bons ports. Ping : PC Admin ↔ PC Admin = OK ; PC Admin ↔ PC Commercial = pas de réponse (normal).</p>
            </div>
            <ProTip>Compétences visées : création de VLANs, ports en mode access, vérification de la segmentation.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Création de VLANs",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Tu es en mode configuration sur le switch. Tu vas créer deux VLANs : un pour l’Administration (numéro 10), un pour le Commercial (numéro 20). Tu leur donnes un <strong>nom</strong> pour les reconnaître facilement dans <code className="bg-black/40 px-1 rounded">show vlan brief</code>. Le numéro compte pour le switch ; le nom, c’est pour toi.
            </p>
            <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-600/40">
              <h4 className="text-amber-300 font-bold mb-2">Exemple concret</h4>
              <p className="text-slate-300 text-sm">NovaTech : on veut séparer Admin et Commercial. On crée VLAN 10 nommé « Administration » et VLAN 20 nommé « Commercial ». Après ça, le switch connaît deux réseaux logiques ; les ports ne sont pas encore assignés (on le fait à l’étape suivante).</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-emerald-400 font-bold mb-2">Commandes à taper (dans l’ordre) :</p>
              <HumanCommand cmd="vlan 10" human="Créer le VLAN 10. Le switch ouvre le sous-mode (config-vlan)#." />
              <HumanCommand cmd="name Administration" human="Donner un nom au VLAN 10 pour le reconnaître." />
              <HumanCommand cmd="exit" human="Sortir du VLAN 10 (ou taper directement vlan 20)." />
              <HumanCommand cmd="vlan 20" human="Créer le VLAN 20." />
              <HumanCommand cmd="name Commercial" human="Nommer le VLAN 20." />
            </div>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-slate-300 text-sm"><strong>Pourquoi 10 et 20 ?</strong> On utilise souvent 10, 20, 30… pour laisser de la place (ex. VLAN 11 pour un sous-groupe Admin). Tu peux aussi utiliser 2 et 3 : ça marche pareil.</p>
            </div>
            <ProTip>Après ces commandes, tape <code className="bg-black/40 px-1 rounded">show vlan brief</code>. Tu dois voir VLAN 10 (Administration) et VLAN 20 (Commercial). Les ports sont encore vides ou en VLAN 1 ; on les assigne à l’étape suivante.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Attribution des ports à un VLAN",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Les VLANs sont créés, mais les ports ne sont pas encore dedans. Là, tu dis au switch : « Le port 1 et le port 2 = VLAN 10 (Admin). Le port 3 et le port 4 = VLAN 20 (Commercial). » Les ports où tu branches des PC sont en <strong>mode accès (access)</strong> : un port = un seul VLAN. Avec <code className="bg-black/40 px-1 rounded">interface range</code>, tu configures plusieurs ports d’un coup.
            </p>
            <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-600/40">
              <h4 className="text-amber-300 font-bold mb-2">Exemple concret</h4>
              <p className="text-slate-300 text-sm">NovaTech : PC de Marie et Pierre (Admin) branchés sur les ports 1 et 2. PC de Sophie et Lucas (Commercial) sur les ports 3 et 4. Tu mets les ports 1–2 dans le VLAN 10, les ports 3–4 dans le VLAN 20. Résultat : Marie peut ping Pierre (même VLAN). Sophie peut ping Lucas (même VLAN). Marie ne peut pas ping Sophie (VLAN différent) tant qu’il n’y a pas de routeur.</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-emerald-400 font-bold mb-2">Commandes (ports 1–2 = Admin, 3–4 = Commercial) :</p>
              <HumanCommand cmd="interface range fa0/1 - 2" human="Choisir les ports 1 et 2. Les prochaines commandes s’appliquent aux deux." />
              <HumanCommand cmd="switchport mode access" human="Mode accès = un seul VLAN par port (pour les PC)." />
              <HumanCommand cmd="switchport access vlan 10" human="Mettre ces deux ports dans le VLAN 10 (Admin)." />
              <HumanCommand cmd="exit" human="Quitter la plage de ports." />
              <HumanCommand cmd="interface range fa0/3 - 4" human="Choisir les ports 3 et 4." />
              <HumanCommand cmd="switchport mode access" human="Mode accès." />
              <HumanCommand cmd="switchport access vlan 20" human="Mettre ces ports dans le VLAN 20 (Commercial)." />
            </div>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-slate-300 text-sm"><strong>Résultat attendu :</strong> Marie (port 1) ping Pierre (port 2) → OK. Sophie (port 3) ping Lucas (port 4) → OK. Marie ping Sophie → pas de réponse (VLAN différent). C’est normal.</p>
            </div>
            <DangerZone>Même VLAN = ils peuvent se ping. VLAN différent = pas de ping sans routeur. L’isolation, c’est voulu.</DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "📌 PARTIE 2 — Intro au trunk (Lab 2 Séance 2)",
        content: (
          <div className="text-center py-8">
            <div className="inline-block bg-emerald-600/30 border-2 border-emerald-500 rounded-2xl px-8 py-6">
              <h3 className="text-2xl font-bold text-emerald-100 mb-2">PARTIE 2</h3>
              <p className="text-emerald-200 font-semibold">Intro au trunk – pour le Lab 2 (2 switches)</p>
              <p className="text-slate-400 text-sm mt-3">Notion de base + commandes pour configurer le trunk. Les détails (802.1Q, VLAN natif, VLAN autorisés) sont en Session 3.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Qu'est-ce qu'un trunk ? (résumé)",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              L’appellation <strong className="text-blue-400">trunk</strong> = un seul câble entre 2 switches qui transporte plusieurs VLANs (tags 802.1Q). Sans trunk = 1 câble par VLAN. Ex. : 2 bâtiments, Admin + Commercial → 1 trunk suffit.
            </p>
            <p className="text-slate-300 text-sm">
              Chaque trame reçoit un tag 802.1Q ? C’est là que le trunk intervient : il fait transiter plusieurs VLANs sur un seul lien en <strong>ajoutant un tag 802.1Q (étiquette du VLAN) dans la trame</strong> — c’est le protocole <strong>802.1Q</strong>.
            </p>
            <ProTip>Un port trunk = pour le lien switch–switch (ou switch–routeur). Ne branche jamais un PC sur un port trunk.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Configurer un trunk (Lab 2)",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              <strong>Vérifier :</strong> <code className="bg-black/40 px-1 rounded">show interfaces trunk</code> → tu vois les ports en trunk, les VLANs autorisés et le VLAN natif.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-emerald-400 font-bold mb-2">À faire sur le port qui relie l'autre switch (ex. fa0/24) :</p>
            <p className="text-slate-500 text-xs mb-2">Ex. : SW-A et SW-B reliés par Fa0/24. Même config des deux côtés.</p>
              <HumanCommand cmd="interface fa0/24" human="Choisir le port." />
              <HumanCommand cmd="switchport mode trunk" human="Activer le trunk." />
              <HumanCommand cmd="switchport trunk native vlan 99" human="(Lab 2) VLAN natif = 99. À faire des deux côtés." />
              <HumanCommand cmd="switchport trunk allowed vlan 99" human="(Lab 2) Autoriser uniquement VLAN 99." />
            </div>
            <p className="text-slate-400 text-sm">Vérifier : <code className="text-emerald-400 font-mono">show interfaces trunk</code>. Pour comprendre trunk, VLAN natif, VLAN autorisés → Session 3.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Pour aller plus loin (optionnel) : IP de Management par VLAN",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Un switch n’a <strong>pas d’IP sur les câbles</strong> (contrairement au routeur). Pour te connecter en SSH ou faire un ping depuis ton PC, il faut lui donner une <strong className="text-blue-400">IP</strong>. Cette IP se met sur une <strong>interface virtuelle</strong> : <code className="bg-black/40 px-1 rounded">interface vlan 1</code> (ou vlan 10, etc.). C’est comme une « adresse du switch » pour l’administration.
            </p>
            <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-600/40">
              <h4 className="text-amber-300 font-bold mb-2">Exemple concret</h4>
              <p className="text-slate-300 text-sm">Tu es au bureau, ton PC est en 192.168.1.10 (VLAN 1). Tu veux te connecter en SSH au switch. Il faut que le switch ait une IP dans le même réseau, par ex. 192.168.1.2. Tu la mets sur <code className="bg-black/40 px-1 rounded text-emerald-400">interface vlan 1</code>. Ensuite, depuis ton PC : <code className="bg-black/40 px-1 rounded text-emerald-400">ping 192.168.1.2</code> puis <code className="bg-black/40 px-1 rounded text-emerald-400">ssh -l admin 192.168.1.2</code>. Si tu veux aussi te connecter depuis un PC du VLAN 10, tu mets une autre IP sur <code className="bg-black/40 px-1 rounded text-emerald-400">interface vlan 10</code> (ex. 192.168.10.1).</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-emerald-400 font-bold mb-2">Commandes (ex. réseau 192.168.1.0/24, switch en .2) :</p>
              <HumanCommand cmd="interface vlan 1" human="Ouvrir l’interface virtuelle du VLAN 1 (management)." />
              <HumanCommand cmd="ip address 192.168.1.2 255.255.255.0" human="Donner l’IP 192.168.1.2 au switch." />
              <HumanCommand cmd="no shutdown" human="Activer l’interface (sinon elle reste down)." />
              <p className="text-slate-400 text-sm mt-3">Optionnel : si tu veux te connecter depuis le VLAN 10, ajoute <code className="bg-black/40 px-1 rounded">interface vlan 10</code> + <code className="bg-black/40 px-1 rounded">ip address 192.168.10.1 255.255.255.0</code> + <code className="bg-black/40 px-1 rounded">no shutdown</code>.</p>
            </div>
            <ProTip>PC en 192.168.1.x → SSH vers 192.168.1.2. PC en 192.168.10.x → SSH vers 192.168.10.1 (si tu as configuré interface vlan 10). Si le switch doit joindre un autre réseau (ex. TFTP), ajoute <code className="bg-black/40 px-1 rounded">ip default-gateway</code>.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Pour aller plus loin (optionnel) : Connexion SSH depuis VLAN 1 et VLAN 2",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              SSH est déjà activé sur le switch (domaine, utilisateur, clé RSA, lignes VTY). Tu peux te connecter depuis n’importe quel PC <strong>qui est dans le même réseau qu’une IP du switch</strong>. Depuis un PC du VLAN 1, tu utilises l’IP du VLAN 1 ; depuis un PC du VLAN 10, l’IP du VLAN 10 (si tu l’as configurée).
            </p>
            <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-600/40">
              <h4 className="text-amber-300 font-bold mb-2">Exemple concret</h4>
              <p className="text-slate-300 text-sm">Marie (Admin) est sur le VLAN 1, IP 192.168.1.10. Le switch a 192.168.1.2 sur interface vlan 1. Marie ouvre son terminal et tape : <code className="bg-black/40 px-1 rounded text-emerald-400">ssh -l admin 192.168.1.2</code>. Elle entre son mot de passe → elle est sur le switch. Sophie (Commercial) est sur le VLAN 10, IP 192.168.10.20. Si le switch a 192.168.10.1 sur interface vlan 10, Sophie tape : <code className="bg-black/40 px-1 rounded text-emerald-400">ssh -l admin 192.168.10.1</code>. Chacune se connecte à la bonne IP selon son VLAN.</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-sm mb-2">Depuis un PC du VLAN 1 (ex. 192.168.1.10) :</p>
              <p className="font-mono text-emerald-400 bg-black/40 rounded px-3 py-2 text-sm">ssh -l admin 192.168.1.2</p>
              <p className="text-slate-400 text-sm mt-3 mb-2">Depuis un PC du VLAN 10 (ex. 192.168.10.20), si le switch a 192.168.10.1 sur vlan 10 :</p>
              <p className="font-mono text-emerald-400 bg-black/40 rounded px-3 py-2 text-sm">ssh -l admin 192.168.10.1</p>
            </div>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-blue-200 text-sm"><strong>Vérification :</strong> une fois connecté, tu vois le prompt du switch (ex. SW-Core#). Tape <code className="bg-black/40 px-1 rounded">show users</code> pour voir les sessions. Avec un compte privilege 15, tu as tous les droits.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Résumé : étapes de configuration VLAN",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Voici l’ordre à suivre pour configurer un switch avec VLANs et pouvoir te connecter en SSH. Exemple : tu viens d’installer un switch pour NovaTech, Admin et Commercial doivent être séparés.
            </p>
            <Timeline steps={[
              "Séance 1 – Créer les VLANs : vlan 10 + name Administration, vlan 20 + name Commercial. Vérifier avec show vlan brief.",
              "Séance 1 – Attribuer les ports : interface range fa0/1-2 → switchport mode access → switchport access vlan 10 ; puis fa0/3-4 → vlan 20. Vérifier : show vlan brief, ping entre PC même VLAN = OK, VLAN différent = pas de réponse.",
              "Séance 2 – Trunk (Lab 2) : interface fa0/24 → switchport mode trunk → switchport trunk native vlan 99 → switchport trunk allowed vlan 99. Des deux côtés. Vérifier : show interfaces trunk.",
              "Session 3 – Détails trunk : 802.1Q, VLAN autorisés, VLAN natif. Router-on-a-Stick pour le routage inter-VLAN.",
              "Optionnel – IP de management : interface vlan 1 → ip address 192.168.1.2 255.255.255.0 → no shutdown. SSH : depuis un PC du même réseau, ssh -l admin 192.168.1.2.",
              ]} />
            <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-600/40">
              <p className="text-slate-300 text-sm"><strong>En cas d’oubli :</strong> un port sur lequel tu n’as rien fait reste dans le VLAN 1. Pour « déplacer » un PC d’équipe (ex. Marie passe de Admin à Commercial), tu changes juste le VLAN du port avec <code className="bg-black/40 px-1 rounded text-emerald-400">switchport access vlan 20</code>, pas besoin de recâbler.</p>
            </div>
          </div>
        )
      },
      {
        type: 'deep_dive',
        title: "Pour les curieux : Détails des commandes VLAN",
        items: [
          { summary: "vlan 10 puis name Administration", details: "Tu tapes vlan 10 → le switch crée le VLAN 10 et passe en mode (config-vlan)#. Ensuite name Administration donne un nom pour le reconnaître dans show vlan brief. exit pour sortir. Le numéro 10 compte pour le switch ; le nom, c'est pour toi. Exemple : vlan 20 + name Commercial pour le second VLAN." },
          { summary: "interface range fa0/1 - 2", details: "Tu choisis plusieurs ports d'un coup (1 et 2). Le prompt devient (config-if-range)#. Tout ce que tu tapes après (switchport mode access, switchport access vlan 10) s'applique aux deux ports. Plus rapide que de configurer le port 1, puis le port 2, un par un." },
          { summary: "switchport mode access vs trunk", details: "Access = le port est pour un seul VLAN (un PC, une imprimante). Un port = un VLAN. Trunk = le port relie deux switches et transporte plusieurs VLANs (étiquetés 802.1Q). Ne branche pas un PC sur un port trunk ; réserve le trunk pour le lien switch–switch ou switch–routeur." },
          { summary: "interface vlan 1 (SVI)", details: "C'est l'interface virtuelle du switch pour le VLAN 1. C'est là qu'on met l'IP du switch (ip address + no shutdown). Le switch n'a pas d'IP sur les câbles (fa0/1, fa0/2…) ; l'SVI sert pour SSH, ping, TFTP. Exemple : interface vlan 1 → ip address 192.168.1.2 255.255.255.0 → no shutdown." },
          { summary: "show vlan brief", details: "Affiche la liste des VLANs (numéro, nom) et quels ports sont dans quel VLAN. Après avoir créé les VLANs et assigné les ports, tape show vlan brief pour vérifier : tu dois voir VLAN 10 avec les ports 1–2, VLAN 20 avec les ports 3–4 (ou selon ta config)." },
          { summary: "switchport mode trunk", details: "Sur le port qui relie deux switches, cette commande active le mode trunk (802.1Q) : le port transporte plusieurs VLANs avec des étiquettes. Ne branche pas un PC sur un port trunk ; réserve le trunk pour le lien switch–switch ou switch–routeur." },
          { summary: "switchport trunk allowed vlan 10,20", details: "Par défaut, tous les VLANs (1-4094) sont autorisés sur le trunk. Cette commande restreint à 10 et 20 : plus sécurisé et évite de propager des VLANs inutiles. Vérification : show interfaces trunk." },
          { summary: "switchport trunk native vlan 999", details: "Le VLAN natif est celui dont les trames circulent sans étiquette 802.1Q sur le trunk. Par défaut c'est le VLAN 1. Pour la sécurité, on peut le changer vers un VLAN dédié (ex. 999). À configurer des deux côtés du trunk." },
          { summary: "switchport trunk encapsulation dot1q / isl", details: "Sur certains switches Cisco, il faut choisir l'encapsulation : dot1q (802.1Q, standard) ou isl (Cisco, encapsule la trame). Sur les modèles récents, dot1q est souvent par défaut." },
          { summary: "show interfaces trunk", details: "Affiche les ports en mode trunk, l'encapsulation, les VLANs autorisés et le VLAN natif. Utilise cette commande pour vérifier la config trunk après show vlan et show interfaces ... switchport." }
        ]
      },
      {
        type: 'vlan_diagram',
        title: "Interactif : Attribution des Ports aux VLANs"
      },
      {
        type: 'interactive_quiz',
        title: "Quiz Interactif : VLAN",
        questions: [
          { q: "À quoi sert un VLAN sur un switch ?", options: ["À augmenter la vitesse", "À séparer logiquement les équipes / le trafic sur un même switch", "À remplacer le routeur"], a: 1 },
          { q: "Quelle commande crée le VLAN 10 ?", options: ["create vlan 10", "vlan 10", "switchport vlan 10"], a: 1 },
          { q: "Pour attribuer un port au VLAN 10, on utilise :", options: ["vlan 10 access", "switchport access vlan 10", "port vlan 10"], a: 1 },
          { q: "Comment donner une IP de management à un switch ?", options: ["Sur une interface physique", "Sur interface vlan 1 avec ip address et no shutdown", "Impossible"], a: 1 },
          { q: "Entre deux PC de VLANs différents (sans routage), le ping :", options: ["Fonctionne", "Ne fonctionne pas (isolation VLAN)", "Fonctionne si même switch"], a: 1 },
          { q: "Quelle commande active le mode trunk sur un port ?", options: ["trunk on", "switchport mode trunk", "port trunk"], a: 1 },
          { q: "Que fait switchport trunk allowed vlan 10,20 ?", options: ["Autorise tous les VLANs", "Autorise uniquement les VLAN 10 et 20 sur le trunk", "Désactive le trunk"], a: 1 },
          { q: "Sur un trunk, le VLAN natif est le VLAN dont les trames circulent :", options: ["Avec un tag 802.1Q", "Sans étiquette (sans tag)", "Uniquement en ISL"], a: 1 },
          { q: "Quel protocole utilise un TAG de 4 octets pour identifier le VLAN dans la trame ?", options: ["ISL", "802.1Q (dot1q)", "CDP"], a: 1 }
        ]
      },
      {
        type: 'command_builder',
        title: "Construire la Configuration VLAN",
        commandBuilderTitle: "Construire la Configuration VLAN",
        steps: [
          { cmd: "vlan 10", desc: "Créer le VLAN 10" },
          { cmd: "name Administration", desc: "Nommer le VLAN 10" },
          { cmd: "interface range fa0/1 - 2", desc: "Sélectionner les ports PC Admin" },
          { cmd: "switchport mode access", desc: "Port en mode accès" },
          { cmd: "switchport access vlan 10", desc: "Attribuer au VLAN 10" },
          { cmd: "interface fa0/24", desc: "Port trunk vers l'autre switch" },
          { cmd: "switchport trunk encapsulation dot1q", desc: "Encapsulation 802.1Q (si nécessaire)" },
          { cmd: "switchport mode trunk", desc: "Activer le mode trunk" },
          { cmd: "switchport trunk allowed vlan 10,20", desc: "VLAN autorisés sur le trunk" },
          { cmd: "switchport trunk native vlan 999", desc: "VLAN natif (des deux côtés)" }
        ]
      },
      {
        type: 'flashcards',
        title: "Flashcards : VLAN",
        mode: 'command_to_definition',
        cards: [
          { q: "vlan 10", a: "Créer le VLAN 10" },
          { q: "name Administration", a: "Nommer le VLAN (Administration)" },
          { q: "switchport mode access", a: "Port en mode accès" },
          { q: "switchport access vlan 10", a: "Attribuer le port au VLAN 10" },
          { q: "switchport mode trunk", a: "Activer le mode trunk sur le port" },
          { q: "switchport trunk allowed vlan 10,20", a: "Autoriser uniquement VLAN 10 et 20 sur le trunk" },
          { q: "switchport trunk native vlan 999", a: "Définir le VLAN natif (des deux côtés du trunk)" },
          { q: "switchport trunk encapsulation dot1q", a: "Encapsulation 802.1Q sur le trunk" },
          { q: "interface vlan 1", a: "Interface de management VLAN 1" }
        ]
      }
    ],
    lab: {
      title: "Mémo des Commandes – Session 2",
      context: "Retrouvez ici toutes les commandes vues dans le cours sur les VLANs : création de VLANs, attribution de ports, configuration de l'interface de management et vérification.",
      consignes: (
        <div className="space-y-10 text-slate-200 text-base leading-relaxed">
          <div className="bg-blue-900/30 border border-blue-500/40 rounded-xl p-5">
            <p className="text-blue-100 font-semibold text-lg mb-1">Où faire les labs Session 2 ?</p>
            <p className="text-blue-200/90 text-sm leading-relaxed">
              Les deux labs ci-dessous se font sur <strong>Cisco Packet Tracer</strong> (onglet Packet Tracer dans la barre latérale ou application sur ton poste). Le terminal en bas de page sert à t’entraîner aux commandes avant ou pendant le lab.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-6">
            <div>
              <h4 className="text-emerald-400 font-bold text-lg mb-1">LAB Session 2 – Séance 1 : Introduction aux VLANs</h4>
              <p className="text-slate-400 text-sm">Objectif : sur un seul switch, séparer deux équipes (Administration et Commerciale) en créant deux VLANs et en branchant les bons PC sur les bons ports. À la fin, les PC d’une même équipe peuvent se ping ; les PC d’équipes différentes ne peuvent pas.</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Matériel</p>
              <ul className="list-none space-y-1 text-slate-300 text-sm">
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 1 switch manageable (ex. 2960)</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 2 PC Administration</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 2 PC Commerciale</li>
              </ul>
            </div>
            <div className="border-l-2 border-emerald-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Étape 1 – Câblage</p>
              <p className="text-slate-300 text-sm">Chaque PC sur un port différent du switch (ex. PC Admin sur ports 1 et 2, PC Commercial sur ports 3 et 4).</p>
            </div>
            <div className="border-l-2 border-emerald-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Étape 2 – Créer les VLANs</p>
              <p className="text-slate-300 text-sm">Sur le switch : VLAN 10 nommé <strong>Administration</strong>, VLAN 20 nommé <strong>Commercial</strong>. Commandes : <code className="text-emerald-400 font-mono text-xs">vlan 10</code> + <code className="text-emerald-400 font-mono text-xs">name Administration</code> ; idem pour 20 / Commercial.</p>
            </div>
            <div className="border-l-2 border-emerald-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Étape 3 – Attribuer les ports</p>
              <p className="text-slate-300 text-sm">Ports des PC Admin → VLAN 10. Ports des PC Commercial → VLAN 20. Mettre chaque port en mode <strong>access</strong> (<code className="text-emerald-400 font-mono text-xs">switchport mode access</code> puis <code className="text-emerald-400 font-mono text-xs">switchport access vlan 10</code> ou <code className="text-emerald-400 font-mono text-xs">20</code>).</p>
            </div>
            <div className="border-l-2 border-emerald-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Étape 4 – Vérifier</p>
              <p className="text-slate-300 text-sm"><code className="text-emerald-400 font-mono text-xs">show vlan brief</code> → tu dois voir VLAN 10 et 20 avec les bons ports. Ping : PC Admin ↔ PC Admin = OK ; PC Admin ↔ PC Commercial = pas de réponse (normal).</p>
            </div>
            <p className="text-slate-400 text-xs border-l-2 border-slate-500/50 pl-3 py-1">Compétences : création de VLANs, ports en mode access, vérification de la segmentation.</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-6">
            <div>
              <h4 className="text-emerald-400 font-bold text-lg mb-1">LAB Session 2 – Séance 2 : VLAN avancés et sécurisation</h4>
              <p className="text-slate-400 text-sm">Objectif : à partir d’un switch déjà configuré avec des VLANs (ex. Admin / Commercial), appliquer des bonnes pratiques : VLAN natif sur les trunks, restriction des VLANs autorisés, vérification des ports d’accès.</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Infrastructure à déployer dans Cisco Packet Tracer</p>
              <ul className="list-none space-y-1 text-slate-300 text-sm">
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 2 Switchs (SW-Core et SW-Dist)</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 1 Routeur pour l'accès distant (optionnel)</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> 1 PC Admin connecté au VLAN de management</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Table d'adressage IP</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-800/80 border-b border-slate-600">
                      <th className="text-left py-2 px-3 text-slate-300 font-semibold">Équipement</th>
                      <th className="text-left py-2 px-3 text-slate-300 font-semibold">Interface</th>
                      <th className="text-left py-2 px-3 text-slate-300 font-semibold">Adresse IP</th>
                      <th className="text-left py-2 px-3 text-slate-300 font-semibold">Masque</th>
                      <th className="text-left py-2 px-3 text-slate-300 font-semibold">VLAN</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    <tr className="border-b border-slate-700/50">
                      <td className="py-2 px-3">SW-Core</td>
                      <td className="py-2 px-3">VLAN 99 (SVI)</td>
                      <td className="py-2 px-3 font-mono text-emerald-400">192.168.99.2</td>
                      <td className="py-2 px-3 font-mono">255.255.255.0</td>
                      <td className="py-2 px-3">99</td>
                    </tr>
                    <tr className="border-b border-slate-700/50">
                      <td className="py-2 px-3">SW-Dist</td>
                      <td className="py-2 px-3">VLAN 99 (SVI)</td>
                      <td className="py-2 px-3 font-mono text-emerald-400">192.168.99.3</td>
                      <td className="py-2 px-3 font-mono">255.255.255.0</td>
                      <td className="py-2 px-3">99</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">PC Admin</td>
                      <td className="py-2 px-3">NIC</td>
                      <td className="py-2 px-3 font-mono text-emerald-400">192.168.99.10</td>
                      <td className="py-2 px-3 font-mono">255.255.255.0</td>
                      <td className="py-2 px-3">99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Étape 1 – Création du VLAN de management</p>
              <p className="text-slate-300 text-sm mb-2"><strong>Sur les deux switches :</strong></p>
              <ul className="text-slate-300 text-sm space-y-1 list-disc pl-5">
                <li>Crée la VLAN 99 Management et attribuer une adresse IP</li>
                <li>Connectez le PC Admin à un port access dans le VLAN 99</li>
              </ul>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Étape 2 – Sécurisation des trunks</p>
              <p className="text-slate-300 text-sm mb-2"><strong>Configurez le lien trunk entre les deux switches (ex : fa0/24) :</strong></p>
              <ul className="text-slate-300 text-sm space-y-1 list-disc pl-5">
                <li>Changez le VLAN natif (au lieu de VLAN 1)</li>
                <li>Limitez les VLANs autorisés sur le trunk</li>
                <li>Désactivez la négociation DTP (<code className="text-emerald-400 font-mono text-xs">switchport nonegotiate</code>)</li>
              </ul>
              <p className="text-slate-300 text-sm mt-2"><strong>Vérifiez la configuration avec :</strong> <code className="text-emerald-400 font-mono text-xs">show interfaces trunk</code></p>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Étape 3 – Sécurisation des ports inutilisés</p>
              <p className="text-slate-300 text-sm"><strong>Désactivez les ports inutilisés sur chaque switch :</strong></p>
              <p className="text-slate-300 text-sm">Utilisez <code className="text-emerald-400 font-mono text-xs">interface range</code> pour sélectionner plusieurs ports et <code className="text-emerald-400 font-mono text-xs">shutdown</code> pour les désactiver.</p>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Étape 4 – Vérifications</p>
              <p className="text-slate-300 text-sm mb-2"><strong>Vérifiez que :</strong></p>
              <ul className="text-slate-300 text-sm space-y-1 list-disc pl-5">
                <li>Le VLAN de management est accessible (ping entre PC Admin et IP des VLAN 99)</li>
                <li>Le trunk est bien limité aux VLANs définis</li>
                <li>Le Native VLAN est bien changé</li>
                <li>Les ports inutilisés sont désactivés</li>
              </ul>
              <p className="text-slate-300 text-sm mt-2"><strong>Commandes de vérification :</strong></p>
              <ul className="text-slate-300 text-sm space-y-1 list-disc pl-5">
                <li><code className="text-emerald-400 font-mono text-xs">show vlan brief</code> - Vérifie les VLANs et les ports</li>
                <li><code className="text-emerald-400 font-mono text-xs">show interfaces trunk</code> - Vérifie la configuration du trunk</li>
                <li><code className="text-emerald-400 font-mono text-xs">show ip interface brief</code> - Vérifie les IPs et l'état des interfaces</li>
                <li><code className="text-emerald-400 font-mono text-xs">ping</code> depuis le PC Admin vers les IPs des switches</li>
              </ul>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Étape 6 – Sauvegarder</p>
              <p className="text-slate-300 text-sm"><code className="text-emerald-400 font-mono text-xs">copy running-config startup-config</code> → sauvegarde permanente (sinon perdu au redémarrage).</p>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">À faire (selon le PDF fourni)</p>
              <ol className="timeline-consignes space-y-1.5 text-slate-300 text-sm">
                <li><strong>VLAN natif :</strong> Sur les ports trunk, configurer un VLAN natif dédié (hors VLAN 1) si demandé.</li>
                <li><strong>VLAN autorisés :</strong> Sur le trunk, autoriser uniquement les VLANs utiles : <code className="text-emerald-400 font-mono text-xs">switchport trunk allowed vlan 10,20</code>.</li>
                <li><strong>Ports d’accès :</strong> Vérifier que les ports vers les PC sont en mode access et dans le bon VLAN (pas de trunk vers un PC).</li>
                <li><strong>Vérifications :</strong> <code className="text-emerald-400 font-mono text-xs">show interfaces trunk</code> et <code className="text-emerald-400 font-mono text-xs">show vlan brief</code>. Optionnel : <code className="text-emerald-400 font-mono text-xs">switchport nonegotiate</code> sur les ports d’accès.</li>
              </ol>
            </div>
            <p className="text-slate-400 text-xs border-l-2 border-slate-500/50 pl-3 py-1">Compétences : configuration de trunk, VLAN natif, restriction des VLANs autorisés, sécurisation des ports d'accès, vérifications avancées.</p>
          </div>
        </div>
      ),
      solutionContent: <CorrectionLab1Session2 />,
      solutionContentLab2: <CorrectionLab2Session2 />,
      initialPrompt: "Switch>",
      tasks: [
        { cmd: "enable", desc: "Mode privilégié" },
        { cmd: "configure terminal", desc: "Mode configuration globale" },
        { cmd: "hostname SW-Core", desc: "Renommer le switch" },
        { cmd: "vlan 10", desc: "Créer VLAN 10" },
        { cmd: "name Administration", desc: "Nommer VLAN 10" },
        { cmd: "exit", desc: "Sortir du VLAN" },
        { cmd: "vlan 20", desc: "Créer VLAN 20" },
        { cmd: "name Commercial", desc: "Nommer VLAN 20" },
        { cmd: "exit", desc: "Sortir du VLAN" },
        { cmd: "interface range fa0/1 - 2", desc: "Ports PC Administration" },
        { cmd: "switchport mode access", desc: "Mode accès" },
        { cmd: "switchport access vlan 10", desc: "Attribuer au VLAN 10" },
        { cmd: "exit", desc: "Sortir" },
        { cmd: "interface range fa0/3 - 4", desc: "Ports PC Commercial" },
        { cmd: "switchport mode access", desc: "Mode accès" },
        { cmd: "switchport access vlan 20", desc: "Attribuer au VLAN 20" },
        { cmd: "exit", desc: "Sortir" },
        { cmd: "interface vlan 1", desc: "Interface de management" },
        { cmd: "ip address 192.168.1.2 255.255.255.0", desc: "IP du switch" },
        { cmd: "no shutdown", desc: "Activer" },
        { cmd: "exit", desc: "Sortir" },
        { cmd: "exit", desc: "Sortir du mode config" }
      ],
      validations: {
        "enable": { nextPrompt: "Switch#", msg: "Mode privilégié activé." },
        "configure terminal": { nextPrompt: "Switch(config)#", msg: "Mode configuration globale." },
        "hostname SW-Core": { nextPrompt: "SW-Core(config)#", msg: "Switch renommé SW-Core." },
        "vlan 10": { nextPrompt: "SW-Core(config-vlan)#", msg: "VLAN 10 créé." },
        "name Administration": { msg: "VLAN 10 nommé Administration." },
        "exit": { msg: "Sortie effectuée." },
        "vlan 20": { nextPrompt: "SW-Core(config-vlan)#", msg: "VLAN 20 créé." },
        "name Commercial": { msg: "VLAN 20 nommé Commercial." },
        "interface range": { nextPrompt: "SW-Core(config-if-range)#", msg: "Ports sélectionnés." },
        "switchport mode access": { msg: "Port en mode accès." },
        "switchport access vlan 10": { msg: "Port(s) attribué(s) au VLAN 10." },
        "switchport access vlan 20": { msg: "Port(s) attribué(s) au VLAN 20." },
        "interface vlan 1": { nextPrompt: "SW-Core(config-if)#", msg: "Interface VLAN 1." },
        "ip address": { msg: "IP de management configurée (192.168.1.2)." },
        "no shutdown": { msg: "Interface activée." }
      }
    },
    quiz: [
      { q: "À quoi sert un VLAN sur un switch ?", options: ["À augmenter la vitesse", "À séparer logiquement les équipes / le trafic sur un même switch", "À remplacer le routeur"], a: 1 },
      { q: "Quelle commande crée le VLAN 10 ?", options: ["vlan 10", "create vlan 10", "switchport vlan 10"], a: 0 },
      { q: "Pour attribuer un port au VLAN 10, on utilise :", options: ["vlan 10 access", "switchport access vlan 10", "port vlan 10"], a: 1 },
      { q: "Comment donner une IP de management à un switch ?", options: ["Sur une interface physique", "Sur interface vlan 1 (ou autre) avec ip address et no shutdown", "Impossible"], a: 1 },
      { q: "Entre deux PC du même VLAN, le ping :", options: ["Ne fonctionne jamais", "Fonctionne (même sous-réseau logique)", "Fonctionne seulement avec un routeur"], a: 1 },
      { q: "Entre deux PC de VLANs différents (sans routage), le ping :", options: ["Fonctionne", "Ne fonctionne pas (isolation VLAN)", "Fonctionne si même switch"], a: 1 }
    ]
  },
  {
    id: 3,
    title: "Session 3 : Trunk et Routage Inter-VLAN",
    duration: "1h15",
    icon: <Network className="w-5 h-5" />,
    slides: [
      {
        type: 'intro',
        title: "Trunk et Communication Inter-VLANs",
        content: `Relier plusieurs VLANs via des trunks entre switches et permettre leur communication via un routeur (Router-on-a-Stick). On aborde : configuration du trunk, VLAN autorisés / non autorisés, et routage inter-VLAN.

🎯 À la fin de cette session, vous serez capable de :

🔗 Configurer un port trunk entre plusieurs switches pour transporter plusieurs VLANs
🔐 Restreindre les VLANs autorisés sur un trunk pour plus de sécurité
🏷️ Définir et comprendre le rôle du VLAN natif sur un trunk
🚀 Mettre en place le routage inter-VLAN avec la technique Router-on-a-Stick
🔀 Créer des sous-interfaces sur un routeur (une par VLAN) avec encapsulation 802.1Q
🌉 Permettre la communication entre machines de VLANs différents via le routeur`
      },
      {
        type: 'rich_text',
        title: "Contexte : Switch, Routeur et Routage Inter-VLAN",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Les <strong className="text-blue-400">switches</strong> sont des équipement qui relie les PC dans un même réseau. Il lit la trame pour l’acheminer, sans changer d’adresse. Avec un <strong>routeur</strong>, le PC envoie un broadcast ARP pour connaître l’adresse MAC du destinataire ; le routeur <strong>bloque les broadcast</strong> et transmet <strong>sa propre MAC</strong> : l’adresse MAC destination change à chaque saut routeur.
            </p>
            <p className="text-slate-300 text-sm">
              L’intérêt du routage inter-VLAN est de faire communiquer des machines dans des <strong>VLANs et sous-réseaux différents</strong>. La limite classique est le <strong>nombre de connexions physiques</strong> du routeur vers le switch (un câble par VLAN). C’est là qu’intervient le <strong>Router-on-a-Stick</strong> : un seul lien physique (trunk) + des sous-interfaces (une par VLAN) sur le routeur.
            </p>
            <ProTip>Tout le trafic entre VLANs passe par ce seul câble. Il vaut mieux qu'il soit rapide (FastEthernet minimum).</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Comment ça marche ? L'exemple concret (trunk)",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Deux bâtiments, deux switches. PC Admin (VLAN 10) bâtiment A envoie vers PC Admin bâtiment B.</p>
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-4">
              <p className="text-blue-400 font-semibold">Switch A reçoit la trame, ajoute étiquette « VLAN 10 »</p>
              <p className="text-emerald-400 font-semibold">Trame traverse le trunk avec le tag</p>
              <p className="text-amber-400 font-semibold">Switch B lit le tag, retire l'étiquette, envoie aux ports VLAN 10</p>
            </div>
            <ProTip>Tout passe par le même câble, mais chaque VLAN reste isolé grâce aux étiquettes 802.1Q.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "802.1Q – Comment l'étiquette fonctionne",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Le protocole <strong className="text-blue-400">802.1Q</strong> (dot1q) ajoute une <strong>étiquette de 4 octets</strong> dans la trame. Le plus important : le <strong>numéro du VLAN</strong> (12 bits → jusqu'à 4094 VLANs).</p>
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-3">
              <p className="text-slate-300 text-sm"><strong>VLAN ID</strong> = identifiant du VLAN (12 bits). C'est la partie la plus importante.</p>
              <p className="text-slate-300 text-sm"><strong>Ethertype</strong> = identifie la trame 802.1Q.</p>
              <p className="text-slate-300 text-sm"><strong>Priorité</strong> = QoS. <strong>CFI</strong> = flag (rarement utilisé).</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "802.1Q (dot1q) vs ISL",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg"><strong>ISL</strong> (Cisco) encapsule toute la trame. Aujourd'hui on utilise <strong>802.1Q</strong> (dot1q), standard et interopérable. Sur les switches récents : <code className="bg-black/40 px-1 rounded">switchport trunk encapsulation dot1q</code>.</p>
            <ProTip>En lab : dot1q (802.1Q).</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Configuration du Trunk",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Un <strong className="text-blue-400">trunk</strong> relie deux switches et transporte plusieurs VLANs (étiquetés 802.1Q). Sur l'interface inter-switch (ex : fa0/24) :
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <HumanCommand cmd="switchport mode trunk" human="Activer le mode trunk sur le port." />
              <HumanCommand cmd="switchport trunk allowed vlan 10,20" human="(Optionnel) Autoriser uniquement les VLAN 10 et 20." />
            </div>
            <ProTip>Vérifier : <code className="bg-black/40 px-1 rounded">show interfaces trunk</code> → ports trunk, VLANs autorisés, VLAN natif.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Limiter les VLANs sur le trunk",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Par défaut, un trunk transporte tous les VLANs (1–4094). On peut restreindre pour la sécurité : <code className="bg-black/40 px-1 rounded">switchport trunk allowed vlan 10,20</code>.</p>
            <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-600/40">
              <p className="text-slate-300 text-sm"><strong>Exemple NovaTech</strong> : VLAN 10, 20, 99. Restreindre à 10,20 → le VLAN 99 ne traverse plus = plus sécurisé.</p>
            </div>
            <HumanCommand cmd="switchport trunk allowed vlan 10,20" human="Uniquement VLAN 10 et 20 sur ce trunk." />
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "VLAN natif – c'est quoi ?",
        content: (
          <div className="space-y-6">
            <div className="bg-blue-600/20 border-2 border-blue-500 rounded-xl p-5 mb-4">
              <p className="text-slate-200 text-base">Le <strong className="text-blue-400">VLAN natif</strong> = le seul dont les trames passent sur le trunk <strong>sans étiquette</strong>. Tous les autres ont un tag 802.1Q. Par défaut = VLAN 1.</p>
            </div>
            <p className="text-slate-200 text-sm"><strong>Pourquoi ?</strong> Les protocoles (CDP, DTP, STP) envoient des trames sans tag. Le switch les associe au VLAN natif.</p>
            <ProTip>Règle : <strong>trame sans tag sur le trunk = VLAN natif</strong>.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Configurer le VLAN natif",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Pour la sécurité, on change le VLAN natif de 1 à un VLAN dédié (ex. 999). À faire des deux côtés du trunk.</p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <HumanCommand cmd="vlan 999" human="Créer le VLAN dédié." />
              <HumanCommand cmd="interface fa0/24" human="Port trunk." />
              <HumanCommand cmd="switchport trunk native vlan 999" human="Définir le VLAN natif. Des deux côtés !" />
            </div>
            <DangerZone>Même réglage des deux côtés. Sinon : mismatch = fuite de trafic entre VLANs. Vérifier avec <code className="text-emerald-400 font-mono">show interfaces trunk</code>.</DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Qu'est-ce que le routage inter-VLAN ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              Imagine deux <strong>bureaux dans le même bâtiment</strong> : le bureau Admin (VLAN 10) et le bureau Commercial (VLAN 20). Ils sont séparés par des cloisons : les gens du bureau Admin ne peuvent pas parler directement à ceux du Commercial. C'est l'isolation des VLANs.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Maintenant, on veut que Marie (Admin) envoie un document à Pierre (Commercial). Il faut quelqu'un qui fasse la liaison entre les deux bureaux — comme un <strong>guichet</strong> au rez-de-chaussée. Ce guichet, c'est le <strong>routeur</strong>. Marie dépose le document au guichet ; le guichet le remet à Pierre. Le routeur fait pareil avec les paquets réseau : il les reçoit d'un VLAN et les envoie vers l'autre. C'est le <strong>routage inter-VLAN</strong>.
            </p>
            <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-600/40">
              <h4 className="text-amber-300 font-bold mb-2">En résumé (sans jargon)</h4>
              <ul className="list-none space-y-2 text-slate-300 text-sm">
                <li className="flex gap-2"><span className="text-amber-400">•</span> <strong>VLAN 10 et VLAN 20</strong> = deux « pièces » séparées. Les PC d'une pièce ne voient pas ceux de l'autre.</li>
                <li className="flex gap-2"><span className="text-amber-400">•</span> <strong>Le routeur</strong> = la « porte » qui relie les deux pièces. Il a une adresse dans chaque pièce (passerelle).</li>
                <li className="flex gap-2"><span className="text-amber-400">•</span> <strong>Routage inter-VLAN</strong> = le chemin emprunté par un message quand il va d'une pièce à l'autre, en passant par le routeur.</li>
              </ul>
            </div>
            <div className="bg-blue-600/20 border-2 border-blue-500 rounded-xl p-5">
              <h4 className="text-blue-300 font-bold mb-2">Pourquoi on en a besoin ?</h4>
              <p className="text-slate-200 text-sm">En entreprise, on sépare les départements (Admin, Commercial, etc.) pour la sécurité. Mais parfois, Admin doit envoyer un fichier à Commercial. Sans routeur : impossible. Avec un routeur qui « touche » les deux réseaux : ça marche.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-600">
                <h4 className="text-amber-400 font-bold mb-2">Sans routage</h4>
                <p className="text-slate-400 text-sm">Admin et Commercial sont chacun dans leur bulle. Pas de communication entre eux.</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-emerald-600/50">
                <h4 className="text-emerald-400 font-bold mb-2">Avec routage</h4>
                <p className="text-slate-400 text-sm">Le routeur fait le pont. Les messages passent par lui pour aller de l'un à l'autre.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Routage Inter-VLAN (Router-on-a-Stick)",
        content: (
          <div className="space-y-6">
            {/* Explication des sous-interfaces - version débutant */}
            <div className="bg-blue-600/20 border-l-4 border-blue-500 rounded-r-xl p-5">
              <h4 className="text-blue-300 font-bold mb-2">C'est quoi une sous-interface ?</h4>
              <p className="text-slate-200 text-sm leading-relaxed mb-3">
                Normalement, un routeur a une prise (port) par réseau. Pour 2 VLANs, il faudrait 2 câbles. Mais on veut n'utiliser qu'<strong>un seul câble</strong> entre le switch et le routeur.
              </p>
              <p className="text-slate-200 text-sm leading-relaxed mb-3">
                La solution : créer des <strong>sous-interfaces</strong>. C'est comme diviser virtuellement une prise en plusieurs. Sur la prise g0/0, on crée g0/0.10 (pour le VLAN 10) et g0/0.20 (pour le VLAN 20). Une seule prise physique, mais le routeur se comporte comme s'il avait deux portes : une vers Admin, une vers Commercial.
              </p>
              <p className="text-slate-300 text-xs">En bref : 1 câble, plusieurs « portes logiques » (sous-interfaces), chacune avec sa propre adresse IP.</p>
            </div>
            {/* Explication de l'encapsulation - version débutant */}
            <div className="bg-amber-900/20 border-l-4 border-amber-500 rounded-r-xl p-5">
              <h4 className="text-amber-300 font-bold mb-2">C'est quoi l'encapsulation dot1Q ?</h4>
              <p className="text-slate-200 text-sm leading-relaxed mb-3">
                Sur le câble entre le switch et le routeur, les messages voyagent <strong>tous ensemble</strong>. Pour que le routeur sache lequel va vers Admin et lequel vers Commercial, chaque message porte une <strong>étiquette</strong> (un numéro) : « je suis pour le VLAN 10 » ou « je suis pour le VLAN 20 ». C'est le protocole 802.1Q (dot1Q).
              </p>
              <p className="text-slate-200 text-sm leading-relaxed mb-3">
                La commande <code className="bg-slate-800 px-1 rounded text-emerald-400">encapsulation dot1Q 10</code> dit au routeur : « Pour la sous-interface g0/0.10, ne reçois que les messages qui ont l'étiquette « VLAN 10 ». » Ainsi, g0/0.10 ne reçoit que le trafic Admin, et g0/0.20 que le trafic Commercial.
              </p>
              <p className="text-slate-300 text-xs">En bref : l'encapsulation l'associe la sous-interface au bon VLAN (grâce à l'étiquette sur les messages).</p>
            </div>
            <p className="text-slate-200 leading-relaxed text-lg">
              Configuration sur le routeur (R-Core) :
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <HumanCommand cmd="interface g0/0.10" human="Créer la « porte » vers le VLAN 10 (Admin)." />
              <HumanCommand cmd="encapsulation dot1Q 10" human="Dire : cette porte ne reçoit que les messages étiquetés VLAN 10." />
              <HumanCommand cmd="ip address 192.168.10.1 255.255.255.0" human="Adresse du routeur dans le réseau Admin. Les PC Admin mettront cette IP comme « passerelle par défaut »." />
              <HumanCommand cmd="interface g0/0.20" human="Créer la « porte » vers le VLAN 20 (Commercial)." />
              <HumanCommand cmd="encapsulation dot1Q 20" human="Cette porte ne reçoit que les messages étiquetés VLAN 20." />
              <HumanCommand cmd="ip address 192.168.20.1 255.255.255.0" human="Adresse du routeur dans le réseau Commercial." />
            </div>
            <ProTip>Sur chaque PC : définir l'adresse IP ET la « passerelle par défaut » (gateway) = l'IP du routeur sur son VLAN. Ex. PC Admin : passerelle 192.168.10.1 ; PC Commercial : passerelle 192.168.20.1.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Inconvénients et Dépannage Router-on-a-Stick",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">
              <strong>Inconvénients :</strong> Tous les broadcast (et tout le trafic inter-VLAN) passent par le <strong>même lien physique</strong> entre le routeur et le switch. Un lien minimum en <strong>FastEthernet</strong> (ou supérieur) est nécessaire. La communication peut être <strong>ralentie</strong> par une différence de bande passante ou de duplex entre le routeur et le switch.
            </p>
            <p className="text-slate-300 text-sm font-bold">Troubleshooting (vérifications utiles) :</p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-2">
              <HumanCommand cmd="show interfaces" human="Statut des interfaces (up/down, bp, duplex)." />
              <HumanCommand cmd="show interfaces status" human="Résumé : statut et mode (ex. « Routed » sur le routeur)." />
              <HumanCommand cmd="show ip route" human="Table de routage (passerelles par VLAN)." />
              <HumanCommand cmd="show interfaces &lt;port&gt; switchport" human="Sur le switch : mode admin/op, encapsulation, VLAN natif. Sur le routeur : pas d’infos couche 2 (port routé)." />
              <HumanCommand cmd="show interfaces trunk" human="Ports en trunk, VLANs autorisés, VLAN natif." />
            </div>
            <ProTip>En cas de problème inter-VLAN : vérifier que les sous-interfaces ont bien une IP par VLAN, que le trunk est actif et que les VLANs autorisés incluent ceux utilisés.</ProTip>
          </div>
        )
      },
      {
        type: 'deep_dive',
        title: "Pour les curieux : Détails Trunk et Router-on-a-Stick",
        items: [
          { summary: "switchport mode trunk", details: "Sur le port qui relie deux switches, cette commande active le protocole 802.1Q : les trames sont étiquetées avec un VLAN ID. Seuls les ports en trunk peuvent transporter plusieurs VLANs." },
          { summary: "switchport trunk allowed vlan 10,20", details: "Par défaut, tous les VLANs (1-4094) sont autorisés sur le trunk. Cette commande restreint à 10 et 20 : plus sécurisé et évite de propager des VLANs inutiles." },
          { summary: "Sous-interfaces et encapsulation dot1Q", details: "Sur le routeur, une interface physique (ex. g0/0) peut avoir des sous-interfaces (g0/0.10, g0/0.20). Chacune a 'encapsulation dot1Q <vlan_id>' et une IP : le routeur route alors le trafic entre VLANs." }
        ]
      },
      {
        type: 'trunk_diagram',
        title: "Interactif : Trunk et Router-on-a-Stick"
      },
      {
        type: 'interactive_quiz',
        title: "Quiz Interactif : Trunk et Inter-VLAN",
        questions: [
          { q: "À quoi sert un port trunk entre deux switches ?", options: ["À augmenter la vitesse", "À transporter plusieurs VLANs (étiquetés) entre les switches", "À remplacer le routeur"], a: 1 },
          { q: "Quelle commande active le mode trunk sur un port ?", options: ["trunk on", "switchport mode trunk", "port trunk"], a: 1 },
          { q: "Que fait 'switchport trunk allowed vlan 10,20' ?", options: ["Autorise tous les VLANs", "Autorise uniquement les VLAN 10 et 20 sur le trunk", "Désactive le trunk"], a: 1 },
          { q: "Qu'est-ce que le Router-on-a-Stick ?", options: ["Un routeur physique dédié", "Un routeur avec des sous-interfaces (une par VLAN) pour faire le routage inter-VLAN", "Un switch"], a: 1 },
          { q: "Pour une sous-interface VLAN 10 sur le routeur, on utilise :", options: ["interface g0/0", "interface g0/0.10 + encapsulation dot1Q 10", "vlan 10"], a: 1 }
        ]
      },
      {
        type: 'command_builder',
        title: "Construire la Configuration Trunk",
        commandBuilderTitle: "Construire la Configuration Trunk",
        steps: [
          { cmd: "interface fa0/24", desc: "Port vers l'autre switch" },
          { cmd: "switchport mode trunk", desc: "Activer le mode trunk" },
          { cmd: "switchport trunk allowed vlan 10,20", desc: "Autoriser uniquement VLAN 10 et 20" }
        ]
      },
      {
        type: 'flashcards',
        title: "Flashcards : Trunk et Inter-VLAN",
        mode: 'command_to_definition',
        cards: [
          { q: "switchport mode trunk", a: "Activer le mode trunk sur le port" },
          { q: "switchport trunk allowed vlan 10,20", a: "Autoriser uniquement les VLAN 10 et 20 sur le trunk" },
          { q: "interface g0/0.10", a: "Sous-interface pour VLAN 10 (Router-on-a-Stick)" },
          { q: "encapsulation dot1Q 10", a: "Encapsulation 802.1Q pour VLAN 10" }
        ]
      },
      {
        type: 'lab_correction',
        title: "Correction du Lab 3 : Trunk et Inter-VLAN"
      }
    ],
    lab: {
      title: "Mémo des Commandes – Session 3",
      context: "Retrouvez ici toutes les commandes vues dans le cours sur les trunks et le routage inter-VLAN : configuration trunk, VLANs autorisés, VLAN natif, sous-interfaces et Router-on-a-Stick.",
      consignes: (
        <div className="space-y-10 text-slate-200 text-base leading-relaxed">
          <div className="bg-blue-900/30 border border-blue-500/40 rounded-xl p-5">
            <p className="text-blue-100 font-semibold text-lg mb-1">Lab Pratique – Séance 2 : Trunks et Communication Inter-VLANs</p>
            <p className="text-blue-200/90 text-sm leading-relaxed">
              Thème : <strong>Relier plusieurs VLANs via trunks et permettre leur communication</strong>. Vous travaillez pour la société <strong>NetCom</strong>. Elle possède plusieurs départements (VLANs) qui doivent être accessibles sur plusieurs switches et pouvoir communiquer via un routeur. Mission : configurer les trunks et réaliser un routage inter-VLAN (Router-on-a-Stick).
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
            <h4 className="text-emerald-400 font-bold text-lg">Infrastructure à déployer (Cisco Packet Tracer)</h4>
            <ul className="list-none space-y-1 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-emerald-400">•</span> 2 switches : <strong>SW-Core</strong> et <strong>SW-Dist</strong></li>
              <li className="flex gap-2"><span className="text-emerald-400">•</span> 1 routeur : <strong>R-Core</strong></li>
              <li className="flex gap-2"><span className="text-emerald-400">•</span> 2 PCs par VLAN (Administration + Commercial)</li>
            </ul>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-6">
            <h4 className="text-amber-400 font-bold text-lg">Étape 1 – Câblage</h4>
            <p className="text-slate-300 text-sm">Utilisez l'outil <strong>câblage automatique</strong> (icône éclair ⚡) dans Packet Tracer : il choisit le bon type de câble et les ports automatiquement. Cliquez sur l'icône, puis sur le premier équipement, puis sur le second.</p>
            <p className="text-slate-300 text-sm font-semibold">Connexions à faire :</p>
            <ul className="list-none space-y-1 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-amber-400">•</span> SW-Core ↔ SW-Dist</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span> SW-Core ↔ R-Core</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span> PC Admin 1 et PC Admin 2 → SW-Core</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span> PC Com 1 et PC Com 2 → SW-Dist</li>
            </ul>
            <p className="text-slate-400 text-xs">Renommer les équipements : Switch0 → SW-Core, Switch1 → SW-Dist, Router0 → R-Core, PC0-PC3 → PC Admin 1, PC Admin 2, PC Com 1, PC Com 2.</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
            <h4 className="text-amber-400 font-bold text-lg">Étape 2 – Création des VLANs</h4>
            <p className="text-slate-300 text-sm">Créer sur <strong>chaque switch</strong> :</p>
            <ul className="list-none space-y-1 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-emerald-400">•</span> VLAN 10 : Administration</li>
              <li className="flex gap-2"><span className="text-emerald-400">•</span> VLAN 20 : Commercial</li>
            </ul>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
            <h4 className="text-amber-400 font-bold text-lg">Étape 3 – Configuration des ports</h4>
            <ul className="list-none space-y-2 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-amber-400 font-bold">•</span> Ports des PC Administration → mode accès, VLAN 10. (Vérifier quels ports avec <code className="text-emerald-400 font-mono">show vlan brief</code> si câblage auto.)</li>
              <li className="flex gap-2"><span className="text-amber-400 font-bold">•</span> Ports des PC Commercial → mode accès, VLAN 20.</li>
              <li className="flex gap-2"><span className="text-amber-400 font-bold">•</span> Port reliant les deux switches → trunk.</li>
            </ul>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
            <h4 className="text-amber-400 font-bold text-lg">Étape 4 – Configuration du Trunk</h4>
            <p className="text-slate-300 text-sm">Sur l’interface inter-switch (souvent fa0/1 ou celui en vert après câblage auto) sur chaque switch :</p>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-emerald-400 text-sm space-y-1">
              <p>switchport mode trunk</p>
              <p className="text-slate-400 text-xs mt-2">Facultatif : autoriser uniquement les VLANs nécessaires.</p>
              <p>switchport trunk allowed vlan 10,20</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
            <h4 className="text-amber-400 font-bold text-lg">Étape 5 – Configuration du Router-on-a-Stick</h4>
            <p className="text-slate-300 text-sm">Sur le routeur (R-Core) :</p>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-emerald-400 text-sm space-y-1">
              <p>interface g0/0.10</p>
              <p>encapsulation dot1Q 10</p>
              <p>ip address 192.168.10.1 255.255.255.0</p>
              <p className="mt-3">interface g0/0.20</p>
              <p>encapsulation dot1Q 20</p>
              <p>ip address 192.168.20.1 255.255.255.0</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
            <h4 className="text-amber-400 font-bold text-lg">Étape 6 – Tests et validation</h4>
            <p className="text-slate-300 text-sm">Attribuer aux PC des IP dans les plages correspondantes :</p>
            <ul className="list-none space-y-1 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-emerald-400">•</span> VLAN 10 : <code className="text-emerald-400 font-mono">192.168.10.X</code> /24 (passerelle 192.168.10.1)</li>
              <li className="flex gap-2"><span className="text-emerald-400">•</span> VLAN 20 : <code className="text-emerald-400 font-mono">192.168.20.X</code> /24 (passerelle 192.168.20.1)</li>
            </ul>
            <p className="text-slate-300 text-sm mt-3">Tester :</p>
            <ul className="list-none space-y-1 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-amber-400">•</span> Ping entre deux PC du même VLAN</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span> Ping entre deux PC de VLANs différents (grâce au routeur)</li>
            </ul>
          </div>

          <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-xl p-5">
            <h4 className="text-emerald-400 font-bold text-lg mb-2">Compétences travaillées</h4>
            <ul className="list-none space-y-1 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-emerald-400">•</span> Configuration de trunk entre switches</li>
              <li className="flex gap-2"><span className="text-emerald-400">•</span> Routage inter-VLAN (Router-on-a-Stick)</li>
              <li className="flex gap-2"><span className="text-emerald-400">•</span> Vérification de la segmentation et de l’interconnexion réseau</li>
            </ul>
            <p className="text-slate-400 text-sm mt-3">Ce lab montre comment relier logiquement plusieurs VLANs et permettre leur communication de manière professionnelle dans un réseau d’entreprise.</p>
          </div>

          {/* LAB 2 DÉPANNAGE - Même maquette que Lab 1 */}
          <div className="mt-14 pt-10 border-t-2 border-violet-500/50">
            <div className="bg-violet-900/30 border-2 border-violet-500/60 rounded-xl p-6 mb-6">
              <h4 className="text-violet-300 font-bold text-xl mb-2 flex items-center gap-2"><Wrench className="w-6 h-6" /> LAB 2 – Dépannage (même maquette que Lab 1)</h4>
              <p className="text-violet-100/90 text-base leading-relaxed">
                NetCom vous appelle : « Le réseau marchait hier, mais ce matin plus de communication entre les VLANs. » Même topologie que le Lab 1. Trouvez et corrigez les pannes.
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
              <h4 className="text-emerald-400 font-bold text-lg">Câblage (identique au Lab 1)</h4>
              <p className="text-slate-300 text-sm">Utilisez la même maquette Packet Tracer que le Lab 1. Ports de connexion :</p>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <table className="w-full text-sm text-slate-300">
                  <thead><tr className="text-left border-b border-slate-600"><th className="py-2 pr-4">Équipement</th><th className="py-2">Port</th><th className="py-2">Connecté à</th></tr></thead>
                  <tbody>
                    <tr className="border-t border-slate-600"><td className="py-1.5 pr-4 font-semibold">SW-Core</td><td className="py-1.5 font-mono">Fa0/1</td><td className="py-1.5">R-Core (Gig0/0)</td></tr>
                    <tr className="border-t border-slate-600"><td className="py-1.5 pr-4">SW-Core</td><td className="py-1.5 font-mono">Fa0/2</td><td className="py-1.5">SW-Dist Fa0/1</td></tr>
                    <tr className="border-t border-slate-600"><td className="py-1.5 pr-4">SW-Core</td><td className="py-1.5 font-mono">Fa0/3, Fa0/4</td><td className="py-1.5">PC Admin 1, PC Admin 2</td></tr>
                    <tr className="border-t border-slate-600"><td className="py-1.5 pr-4 font-semibold">SW-Dist</td><td className="py-1.5 font-mono">Fa0/1</td><td className="py-1.5">SW-Core Fa0/2</td></tr>
                    <tr className="border-t border-slate-600"><td className="py-1.5 pr-4">SW-Dist</td><td className="py-1.5 font-mono">Fa0/3, Fa0/4</td><td className="py-1.5">PC Com 1, PC Com 2</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
              <h4 className="text-amber-400 font-bold text-lg">La panne</h4>
              <p className="text-slate-300 text-sm">Une <strong>seule erreur</strong> de configuration bloque tout le routage inter-VLAN. Les PC du même VLAN communiquent, mais passerelle et communication entre VLANs échouent.</p>
              <ul className="list-none space-y-2 text-slate-300 text-sm">
                <li className="flex gap-2"><span className="text-emerald-400">•</span> Ping Admin 1 ↔ Admin 2 = OK (intra-VLAN)</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Ping Admin 1 → 192.168.10.1 (passerelle) = échec</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Ping Admin 1 → PC Com 1 = échec</li>
              </ul>
              <p className="text-slate-400 text-sm">Mission : trouver et corriger la panne. Guide dans l'onglet <strong>Correction Lab 2 (Dépannage)</strong>.</p>
            </div>
          </div>

          {/* LAB 3 DÉPANNAGE - Autre panne */}
          <div className="mt-14 pt-10 border-t-2 border-amber-500/50">
            <div className="bg-amber-900/30 border-2 border-amber-500/60 rounded-xl p-6 mb-6">
              <h4 className="text-amber-300 font-bold text-xl mb-2 flex items-center gap-2"><Wrench className="w-6 h-6" /> LAB 3 – Dépannage (panne subtile)</h4>
              <p className="text-amber-100/90 text-base leading-relaxed">
                Même maquette. <strong>Panne plus complexe</strong> : les ports sont en trunk, le routeur est opérationnel. Les symptômes sont asymétriques — il faut analyser en détail.
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
              <h4 className="text-emerald-400 font-bold text-lg">Câblage</h4>
              <p className="text-slate-300 text-sm">Identique au Lab 1 et 2.</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
              <h4 className="text-amber-400 font-bold text-lg">Symptômes rapportés</h4>
              <p className="text-slate-400 text-xs">Adresses : Admin 1 = 192.168.10.2, Admin 2 = 192.168.10.3, Com 1 = 192.168.20.2, Com 2 = 192.168.20.3. Passerelles : 192.168.10.1, 192.168.20.1.</p>
              <ul className="list-none space-y-2 text-slate-300 text-sm">
                <li className="flex gap-2"><span className="text-emerald-400">•</span> Ping Admin 1 → Admin 2 (192.168.10.3) = OK</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> Ping Com 1 → Com 2 (192.168.20.3) = OK</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> Ping Admin 1 → 192.168.10.1 (passerelle) = OK</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Ping Com 1 → 192.168.20.1 (passerelle) = échec</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Ping Admin 1 → Com 1 (192.168.20.2) = échec</li>
              </ul>
              <p className="text-slate-400 text-sm">Les Admin atteignent leur passerelle, pas les Com. <code className="bg-slate-900 px-1 rounded">show interfaces trunk</code> affiche bien les ports trunk. Il faut regarder <strong>plus en détail</strong>. Guide dans l'onglet <strong>Correction Lab 3 (Dépannage)</strong>.</p>
            </div>
          </div>

          {/* LAB 4 DÉPANNAGE - Problème passerelle (gateway) */}
          <div className="mt-14 pt-10 border-t-2 border-cyan-500/50">
            <div className="bg-cyan-900/30 border-2 border-cyan-500/60 rounded-xl p-6 mb-6">
              <h4 className="text-cyan-300 font-bold text-xl mb-2 flex items-center gap-2"><Wrench className="w-6 h-6" /> LAB 4 – Dépannage (passerelle absente)</h4>
              <p className="text-cyan-100/90 text-base leading-relaxed">
                Même maquette. Les switches et le routeur sont corrects. La panne est sur la <strong>configuration d'un PC</strong> — la passerelle par défaut n'est pas configurée.
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
              <h4 className="text-emerald-400 font-bold text-lg">Symptômes rapportés</h4>
              <p className="text-slate-400 text-xs">Adresses : Admin 1 = 192.168.10.2, Admin 2 = 192.168.10.3, Com 1 = 192.168.20.2, Com 2 = 192.168.20.3. Passerelles : 192.168.10.1, 192.168.20.1.</p>
              <ul className="list-none space-y-2 text-slate-300 text-sm">
                <li className="flex gap-2"><span className="text-emerald-400">•</span> Ping Admin 1 → Admin 2 (192.168.10.3) = OK</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> Ping Com 1 → Com 2 (192.168.20.3) = OK</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> Ping Admin 1 → 192.168.10.1 (passerelle) = OK</li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span> Ping Com 1 → 192.168.20.1 (passerelle) = OK</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Ping Admin 1 → Com 1 (192.168.20.2) = échec</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Ping Com 1 → Admin 1 (192.168.10.2) = échec</li>
              </ul>
              <p className="text-slate-400 text-sm">Les deux passerelles répondent au ping depuis leur VLAN. Mais la communication inter-VLAN échoue. Où chercher ? Guide dans l'onglet <strong>Correction Lab 4 (Dépannage)</strong>.</p>
              <p className="text-cyan-400/90 text-xs mt-3">Pour casser : Admin 1 → Desktop → IP Configuration → laisser Default Gateway <strong>vide</strong> (ou 0.0.0.0).</p>
            </div>
          </div>
        </div>
      ),
      initialPrompt: "Switch>",
      tasks: [
        { cmd: "enable", desc: "Mode privilégié" },
        { cmd: "configure terminal", desc: "Mode config" },
        { cmd: "hostname SW-Core", desc: "Nommer le switch" },
        { cmd: "vlan 10", desc: "Créer VLAN 10" },
        { cmd: "name Administration", desc: "Nommer VLAN 10" },
        { cmd: "exit", desc: "Sortir" },
        { cmd: "vlan 20", desc: "Créer VLAN 20" },
        { cmd: "name Commercial", desc: "Nommer VLAN 20" },
        { cmd: "exit", desc: "Sortir" },
        { cmd: "interface fa0/24", desc: "Port trunk vers l'autre switch" },
        { cmd: "switchport mode trunk", desc: "Activer le mode trunk" },
        { cmd: "switchport trunk allowed vlan 10,20", desc: "VLAN autorisés (optionnel)" },
        { cmd: "exit", desc: "Sortir" },
        { cmd: "exit", desc: "Sortir du mode config" }
      ],
      validations: {
        "enable": { nextPrompt: "Switch#", msg: "Mode privilégié." },
        "configure terminal": { nextPrompt: "Switch(config)#", msg: "Mode config." },
        "hostname SW-Core": { nextPrompt: "SW-Core(config)#", msg: "Switch renommé SW-Core." },
        "vlan 10": { nextPrompt: "SW-Core(config-vlan)#", msg: "VLAN 10 créé." },
        "name Administration": { msg: "VLAN 10 nommé Administration." },
        "exit": { msg: "Sortie effectuée." },
        "vlan 20": { nextPrompt: "SW-Core(config-vlan)#", msg: "VLAN 20 créé." },
        "name Commercial": { msg: "VLAN 20 nommé Commercial." },
        "interface fa0/24": { nextPrompt: "SW-Core(config-if)#", msg: "Interface fa0/24." },
        "switchport mode trunk": { msg: "Mode trunk activé." },
        "switchport trunk allowed vlan 10,20": { msg: "VLAN 10 et 20 autorisés sur le trunk." }
      }
    },
    quiz: [
      { q: "À quoi sert un port trunk entre deux switches ?", options: ["À augmenter la vitesse", "À transporter plusieurs VLANs (étiquetés) entre les switches", "À remplacer le routeur"], a: 1 },
      { q: "Quelle commande active le mode trunk sur un port ?", options: ["trunk on", "switchport mode trunk", "port trunk"], a: 1 },
      { q: "Que fait 'switchport trunk allowed vlan 10,20' ?", options: ["Autorise tous les VLANs", "Autorise uniquement les VLAN 10 et 20 sur le trunk", "Désactive le trunk"], a: 1 },
      { q: "Qu'est-ce que le Router-on-a-Stick ?", options: ["Un routeur physique dédié", "Un routeur avec des sous-interfaces (une par VLAN) pour faire le routage inter-VLAN", "Un switch"], a: 1 },
      { q: "Pour une sous-interface VLAN 10 sur le routeur, on utilise :", options: ["interface g0/0", "interface g0/0.10 + encapsulation dot1Q 10", "vlan 10"], a: 1 }
    ]
  },
  {
    id: 4,
    title: "Session 1 : DHCP & DNS",
    duration: "1h",
    icon: <Server className="w-5 h-5" />,
    slides: [
      {
        type: 'intro',
        title: "Cours Théorique – Séance 1 : Services d'Attribution et de Résolution (DHCP & DNS)",
        content: `Bienvenue ! Ce cours est fait pour les débutants. On va aller doucement, avec des exemples concrets.

🎯 Ce qu'on va voir :
• Le DHCP : comment ton PC obtient « tout seul » son adresse quand tu te connectes (comme le wifi de la maison)
• Le DNS : pourquoi tu tapes google.fr et pas 142.250.186.35 (comme un annuaire téléphonique)
• Comment configurer tout ça sur un routeur et dans Packet Tracer`
      },
      {
        type: 'rich_text',
        title: "Le problème : configurer chaque PC à la main",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Imagine un bureau avec 50 PC. Chaque PC a besoin d'une adresse sur le réseau (comme une adresse postale) : <strong>IP</strong>, <strong>masque</strong>, <strong>passerelle</strong> (la sortie vers internet), et l'adresse du <strong>serveur DNS</strong>.</p>
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-200 font-bold mb-2">Si tu fais tout à la main sur chaque PC :</p>
              <ul className="text-red-100/90 text-sm space-y-1 list-disc list-inside">
                <li>50 PC = 50 fois la même config</li>
                <li>Risque de se tromper (2 PC avec la même IP = conflit)</li>
                <li>Une erreur de frappe et ça ne marche plus</li>
                <li>Si tu changes quelque chose, tu modifies les 50 postes</li>
              </ul>
            </div>
            <p className="text-slate-300">La solution : le <strong>DHCP</strong>. Comme le wifi à la maison — tu te connectes et tout se configure tout seul.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "DHCP – C'est quoi, en une phrase ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-xl text-center py-4">Le <strong className="text-amber-400">DHCP</strong> = quand tu branches un PC, il reçoit <strong>tout seul</strong> son adresse IP et les infos réseau, sans rien taper.</p>
            <div className="bg-amber-900/20 border border-amber-500/40 rounded-xl p-6">
              <p className="text-amber-200 font-bold mb-2">En bref</p>
              <p className="text-slate-300 text-sm">Comme quand tu te connectes au wifi chez toi : tu choisis le réseau, tu mets le mot de passe, et ton téléphone reçoit automatiquement une adresse. Le routeur (ou une box) fait office de « serveur DHCP » — c'est lui qui distribue les adresses.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "DHCP – Qu'est-ce que le PC reçoit ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Le DHCP ne donne pas que l'IP. Il envoie un « package » complet au PC :</p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3"><span className="bg-amber-600/30 text-amber-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span><span><strong>L'adresse IP</strong> — comme ton numéro dans le bâtiment</span></li>
              <li className="flex gap-3"><span className="bg-amber-600/30 text-amber-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span><span><strong>Le masque</strong> — pour savoir qui est dans ton réseau local</span></li>
              <li className="flex gap-3"><span className="bg-amber-600/30 text-amber-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span><span><strong>La passerelle</strong> — la « porte de sortie » vers internet (souvent le routeur)</span></li>
              <li className="flex gap-3"><span className="bg-amber-600/30 text-amber-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span><span><strong>L'adresse du serveur DNS</strong> — pour traduire les noms (google.fr) en adresses</span></li>
              <li className="flex gap-3"><span className="bg-amber-600/30 text-amber-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span><span><strong>La durée du bail</strong> — l'IP est « louée » un certain temps, puis renouvelée</span></li>
            </ul>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "DHCP – Avant vs Après",
        content: (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-5">
                <p className="text-red-300 font-bold mb-3">❌ Sans DHCP</p>
                <p className="text-slate-300 text-sm">Tu dois aller sur chaque PC, ouvrir les paramètres réseau, taper l'IP, le masque, la passerelle, le DNS… 50 PC = 50 fois la même chose. Un cauchemar.</p>
              </div>
              <div className="bg-emerald-900/20 border-2 border-emerald-500/50 rounded-xl p-5">
                <p className="text-emerald-300 font-bold mb-3">✅ Avec DHCP</p>
                <p className="text-slate-300 text-sm">Sur chaque PC : tu choisis « Obtenir une adresse automatiquement ». C'est tout. Le routeur donne tout le reste. Tu configures une seule fois sur le routeur.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Comment le PC obtient son IP ? — DORA",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Quand tu branches un PC (ou tu le mets en DHCP), il n'a pas encore d'adresse. Il fait une petite « conversation » en 4 étapes avec le routeur. On appelle ça <strong>DORA</strong> :</p>
            <ul className="space-y-2 text-slate-300">
              <li><strong className="text-blue-400">D</strong>écouvrir — Le PC crie « Y'a quelqu'un qui peut me donner une IP ? » (il envoie un message à tout le monde)</li>
              <li><strong className="text-emerald-400">O</strong>ffre — Le routeur répond « Voilà, prends 192.168.10.11 »</li>
              <li><strong className="text-amber-400">R</strong>equest — Le PC dit « OK, je la prends ! »</li>
              <li><strong className="text-violet-400">A</strong>ccusé de réception — Le routeur confirme « C'est noté, c'est à toi »</li>
            </ul>
            <p className="text-slate-400 text-sm">Slide suivante : une petite animation pour voir le flux.</p>
          </div>
        )
      },
      {
        type: 'dora_flow',
        title: "Animation : Le flux DORA"
      },
      {
        type: 'rich_text',
        title: "DORA – En détail",
        content: (
          <div className="space-y-4">
            {[
              { letter: 'D', label: 'Discover', desc: 'Le PC envoie un message à tout le monde : « J\'ai besoin d\'une IP »', color: 'blue' },
              { letter: 'O', label: 'Offer', desc: 'Le routeur répond : « Voilà une adresse pour toi, par ex. 192.168.10.11 »', color: 'emerald' },
              { letter: 'R', label: 'Request', desc: 'Le PC dit : « Je la prends ! »', color: 'amber' },
              { letter: 'A', label: 'Acknowledge', desc: 'Le routeur confirme : « C\'est enregistré, tu peux l\'utiliser. »', color: 'violet' }
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-800/60 rounded-lg border-l-4 border-slate-500">
                <p className="font-bold text-white"><span className="text-lg mr-2">{s.letter}</span>{s.label}</p>
                <p className="text-slate-400 text-sm mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Pourquoi réserver certaines adresses ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Le « pool » DHCP, c'est la réserve d'adresses qu'on peut donner aux PC. Mais certaines adresses doivent rester <strong>libres</strong> — on ne les donne jamais à un PC :</p>
            <ul className="space-y-2 text-slate-300">
              <li><strong>192.168.1.1</strong> — c'est l'adresse du routeur (la passerelle). Si un PC la recevait, conflit : deux machines avec la même adresse !</li>
              <li><strong>192.168.1.10 à .20</strong> — souvent réservées aux serveurs, imprimantes réseau, etc.</li>
              <li><strong>192.168.1.250 à .254</strong> — la fin du rang, souvent pour le serveur DNS ou d'autres équipements fixes</li>
            </ul>
            <p className="text-slate-300">On « exclut » ces adresses du pool. Sinon le DHCP pourrait les donner à un PC, et là tout casse (plus de passerelle, plus de DNS…).</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Étape 0 : Allumer le port du routeur",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Avant de configurer le DHCP, le routeur doit avoir une <strong>adresse</strong> sur le port branché au switch. Et ce port doit être <strong>allumé</strong>. Sinon : câble rouge dans Packet Tracer, rien ne passe.</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-2">
              <p className="text-emerald-400">interface g0/0</p>
              <p className="text-slate-500 text-xs">→ Tu choisis le port à configurer</p>
              <p className="text-emerald-400">ip address 192.168.10.1 255.255.255.0</p>
              <p className="text-slate-500 text-xs">→ Tu donnes l'adresse du routeur (c'est la passerelle des PC)</p>
              <p className="text-emerald-400">no shutdown</p>
              <p className="text-slate-500 text-xs">→ Tu « allumes » le port. <strong>Sans ça, le câble reste rouge !</strong></p>
            </div>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-200 font-bold">L'ordre à respecter : 1) Port allumé → 2) Exclusions → 3) Pool DHCP</p>
              <p className="text-slate-300 text-sm">Si tu fais le pool avant d'avoir fait no shutdown, les PC ne recevront rien : le routeur n'est pas « connecté ».</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Étape 1 : Réserver les adresses qu'on ne donne pas",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">On dit au routeur : « Ces adresses, ne les donne <strong>jamais</strong> à un PC. » On les réserve pour le routeur, le serveur DNS, etc.</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm">
              <p className="text-slate-400">Router(config)#</p>
              <p className="text-emerald-400">ip dhcp excluded-address 192.168.1.1 192.168.1.10</p>
              <p className="text-slate-500 text-xs mt-2">→ On garde .1 à .10 (le routeur est en .1, le reste pour serveurs)</p>
              <p className="text-emerald-400 mt-3">ip dhcp excluded-address 192.168.1.250 192.168.1.254</p>
              <p className="text-slate-500 text-xs mt-2">→ On garde la fin pour le serveur DNS (.254). Sinon les PC ne le trouveraient plus.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Étape 2 : Créer le « réservoir » d'adresses",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">On crée un « pool » (un réservoir) avec un nom, par ex. LAN. Ensuite on va y mettre la plage d'adresses et les infos à donner aux PC.</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm">
              <p className="text-emerald-400">ip dhcp pool LAN</p>
              <p className="text-slate-400 mt-2">Router(dhcp-config)#</p>
              <p className="text-slate-500 text-xs mt-2">→ Le routeur te met en mode « config du pool LAN ». Les commandes suivantes vont dans ce pool.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Étape 3 : Qu'est-ce qu'on donne aux PC ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Dans le pool, tu définis : la plage d'adresses, la passerelle, et l'adresse du serveur DNS. Le routeur donnera tout ça à chaque PC qui demande.</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-2">
              <p className="text-emerald-400">network 192.168.1.0 255.255.255.0</p>
              <p className="text-slate-500 text-xs">→ Les adresses à distribuer (le réseau 192.168.1.x). Les exclusions sont automatiquement retirées.</p>
              <p className="text-emerald-400 mt-3">default-router 192.168.1.1</p>
              <p className="text-slate-500 text-xs">→ La « porte de sortie » : l'adresse du routeur</p>
              <p className="text-emerald-400 mt-2">dns-server 192.168.1.100</p>
              <p className="text-slate-500 text-xs">→ L'adresse du serveur qui traduit les noms (google.fr) en adresses</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Résumé : toute la config DHCP",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed font-semibold">L'ordre à suivre sur le routeur :</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-1">
              <p className="text-slate-500 text-xs">0. Allumer le port : interface g0/0 → ip address → no shutdown</p>
              <p className="text-slate-500 text-xs mt-2">1. Réserver les adresses qu'on ne donne pas</p>
              <p className="text-emerald-400">ip dhcp excluded-address 192.168.1.1 192.168.1.10</p>
              <p className="text-emerald-400">ip dhcp excluded-address 192.168.1.250 192.168.1.254</p>
              <p className="text-slate-500 text-xs mt-4">2. Pool (en mode dhcp-config)</p>
              <p className="text-emerald-400">ip dhcp pool LAN</p>
              <p className="text-emerald-400">network 192.168.1.0 255.255.255.0</p>
              <p className="text-emerald-400">default-router 192.168.1.1</p>
              <p className="text-emerald-400">dns-server 192.168.1.100</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Passons au DNS – Pourquoi on tape google.fr et pas une adresse ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Quand tu vas sur Google, tu tapes <strong>www.google.fr</strong>. Personne ne tape 142.250.186.35 ! Les noms, c'est pour nous. Les machines, elles ont besoin des adresses.</p>
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-200 font-bold mb-2">Sans DNS :</p>
              <p className="text-slate-300 text-sm">Il faudrait retenir l'adresse de chaque site, de chaque serveur… Impossible.</p>
            </div>
            <p className="text-slate-300">La solution : le <strong>DNS</strong>. Comme un annuaire téléphonique : tu lui donnes un nom, il te donne l'adresse.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "DNS – C'est quoi ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-xl text-center py-4">Le <strong className="text-blue-400">DNS</strong> = un annuaire. Tu lui donnes un <strong>nom</strong>, il te renvoie l'<strong>adresse</strong>.</p>
            <div className="bg-blue-900/20 border border-blue-500/40 rounded-xl p-6 text-center">
              <p className="text-blue-200 font-mono text-lg">google.fr</p>
              <p className="text-slate-400 my-2">↓ le DNS traduit ↓</p>
              <p className="text-emerald-300 font-mono">142.250.186.35</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "DNS – À quoi ça sert ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Le DNS traduit les <strong>noms en adresses</strong>. Sans lui :</p>
            <ul className="text-slate-300 space-y-2 list-disc list-inside">
              <li>Qui retient 192.168.10.100 ? Personne. « intranet » c'est plus simple</li>
              <li>Si tu changes l'adresse d'un serveur, tu mets à jour le DNS — les gens continuent à taper le même nom</li>
              <li>Tu ne pourrais pas taper google.fr — seulement des chiffres illisibles</li>
            </ul>
            <div className="bg-emerald-900/20 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <p className="text-emerald-200 font-bold mb-2">En bref</p>
              <p className="text-slate-300 text-sm">Tu utilises des <strong>noms</strong> (intranet, imprimante, files). Le DNS te donne l'adresse. Même si l'adresse change, le nom reste le même.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "DNS – C'est quoi une requête ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Une <strong>requête</strong> = ton PC pose une question au serveur DNS. Le serveur répond avec l'adresse.</p>
            <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-600 space-y-4">
              <p className="text-slate-300 font-semibold">Exemple : tu tapes <code className="bg-slate-900 px-2 py-0.5 rounded text-emerald-400">ping intranet.techcorp.local</code></p>
              <ol className="text-slate-300 list-decimal list-inside space-y-2 text-sm">
                <li>Le PC demande au serveur DNS : « C'est quoi l'adresse de intranet.techcorp.local ? »</li>
                <li>Le serveur répond : « 192.168.10.100 »</li>
                <li>Le PC envoie alors son ping (ou ouvre le navigateur) vers cette adresse</li>
              </ol>
            </div>
            <p className="text-slate-400 text-sm">Le PC sait où est le serveur DNS grâce au DHCP (qui lui a donné l'adresse). Si le PC n'a pas d'adresse DNS, il ne peut pas poser la question → « Ping request could not find host ».</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "DNS – Exemples du quotidien",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed"><strong>Sur internet :</strong> tu tapes google.fr → le DNS te donne l'adresse de Google.</p>
            <p className="text-slate-200 leading-relaxed"><strong>En entreprise :</strong> « imprimante », « intranet », « partage-fichiers » → le DNS interne donne l'adresse de chaque service.</p>
            <div className="bg-blue-900/20 border border-blue-500/40 rounded-xl p-4">
              <p className="text-blue-200 font-bold mb-2">Dans nos labs (TechCorp)</p>
              <p className="text-slate-300 text-sm mb-2">On crée des « fiches » sur le serveur DNS : nom → adresse</p>
              <ul className="text-slate-300 text-sm space-y-1 font-mono">
                <li>intranet.techcorp.local → 192.168.10.100</li>
                <li>files.techcorp.local → 192.168.10.101</li>
                <li>imprimante.techcorp.local → 192.168.10.50</li>
              </ul>
              <p className="text-slate-400 text-xs mt-2">Quand tu tapes <code className="bg-slate-800 px-1 rounded">ping intranet.techcorp.local</code>, le PC demande au DNS, reçoit .100, puis ping cette adresse.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "DNS – Comment ça marche ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">En 4 étapes :</p>
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
              <li>Tu veux joindre un nom (intranet, google.fr…)</li>
              <li>Ton PC demande au serveur DNS : « C'est quoi l'adresse de ce nom ? » (le PC connaît l'adresse du DNS grâce au DHCP)</li>
              <li>Le serveur regarde sa liste (nom → adresse) et répond</li>
              <li>Ton PC utilise cette adresse pour envoyer les données (ping, navigateur, etc.)</li>
            </ol>
            <p className="text-slate-400 text-sm">En lab : Packet Tracer → clic sur le serveur → Services → DNS. Tu ajoutes les fiches (intranet, files, imprimante) pour que les PC puissent les résoudre.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "DNS sur un routeur Cisco (optionnel)",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Si tu veux que le routeur lui-même résolve des noms (par ex. taper <code className="bg-slate-900 px-1 rounded">ping srv-fichiers</code> dans la console du routeur) :</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-2">
              <p className="text-emerald-400">ip domain-lookup</p>
              <p className="text-slate-500 text-xs">→ Active la résolution de noms sur le routeur</p>
              <p className="text-emerald-400 mt-3">ip name-server 192.168.1.100</p>
              <p className="text-slate-500 text-xs">→ Tu indiques quel serveur DNS le routeur doit interroger</p>
            </div>
            <p className="text-slate-400 text-sm">Dans nos labs, le DNS est sur un <strong>serveur à part</strong> (Packet Tracer). Les PC l'interrogent directement. Le routeur donne juste l'adresse du DNS aux PC via le DHCP.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Configurer le serveur DNS dans Packet Tracer",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Le serveur DNS (l'appareil « Server ») doit avoir une <strong>adresse fixe</strong>. Pas de DHCP pour lui — sinon il changerait d'adresse et les PC ne le trouveraient plus.</p>
            <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-600 space-y-4">
              <p className="text-slate-200 font-semibold">Ce que tu fais :</p>
              <ol className="text-slate-300 list-decimal list-inside space-y-2 text-sm">
                <li><strong>Config → IP</strong> : tu lui donnes une adresse fixe (ex. 192.168.10.254), le masque, la passerelle</li>
                <li><strong>Services → DNS</strong> : tu ajoutes les « fiches » : intranet.techcorp.local → 192.168.10.100, files.techcorp.local → 192.168.10.101, imprimante.techcorp.local → 192.168.10.50</li>
              </ol>
            </div>
            <p className="text-slate-400 text-sm">Le DHCP donne cette adresse (192.168.10.254) aux PC. Comme ça, les PC savent où aller poser leurs questions.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Mettre les PC en mode DHCP",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Pour que les PC reçoivent tout automatiquement, tu les mets en <strong>DHCP</strong>.</p>
            <p className="text-slate-300">Dans Packet Tracer : <strong>clic sur le PC</strong> → onglet <strong>Desktop</strong> → <strong>IP Configuration</strong> → tu choisis <strong>DHCP</strong> (pas Static).</p>
            <p className="text-slate-400 text-sm">Le PC demande alors une IP au routeur (DORA) et reçoit : son adresse, la passerelle, et l'adresse du serveur DNS.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Comment vérifier que tout marche ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Tu vérifies du plus simple au plus complexe :</p>
            <ol className="text-slate-300 list-decimal list-inside space-y-3">
              <li><strong>ipconfig</strong> (PC → Desktop → Command Prompt) : le PC a bien reçu une IP ? La passerelle et le DNS sont là ? Si tu vois 0.0.0.0 → le DHCP n'a pas répondu.</li>
              <li><strong>ping 192.168.10.1</strong> : la passerelle répond ? Si « Request timed out » → vérifie que tu as fait no shutdown sur le routeur, et que le câble est bien branché.</li>
              <li><strong>ping intranet.techcorp.local</strong> : le DNS trouve le nom ? Si « could not find host » → le DNS est mal configuré ou le PC n'a pas l'adresse du serveur DNS.</li>
              <li><strong>show ip dhcp binding</strong> (sur le routeur) : tu vois une ligne par PC qui a reçu une IP ?</li>
            </ol>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Récap en 2 phrases",
        content: (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-900/20 border border-amber-500/40 rounded-xl p-5">
                <p className="text-amber-300 font-bold mb-2">DHCP</p>
                <p className="text-slate-300 text-sm">Donne tout seul aux PC leur adresse, la passerelle et l'adresse du DNS. Tu configures une fois sur le routeur, les PC reçoivent tout.</p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/40 rounded-xl p-5">
                <p className="text-blue-300 font-bold mb-2">DNS</p>
                <p className="text-slate-300 text-sm">Traduit les noms en adresses. Tu tapes « intranet », il te donne l'adresse. Comme un annuaire.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Texte à trous – Réponses",
        content: (
          <div className="space-y-6">
            <p className="text-slate-400 text-sm mb-4">Complétez mentalement ou vérifiez vos réponses :</p>
            <div className="space-y-4">
              {[
                { n: 1, text: "Le DHCP permet de ", blank: "donner automatiquement", after: " les adresses aux PC." },
                { n: 2, text: "DORA = le PC demande (D), le routeur propose (O), le PC accepte (R), le routeur confirme (A). En anglais : ", blank: "Discover, Offer, Request, Acknowledgment", after: "." },
                { n: 3, text: "Le DNS traduit un ", blank: "nom en adresse IP", after: "." },
                { n: 4, text: "Pour dire au routeur quel serveur DNS interroger : ", blank: "ip name-server", after: " + l'adresse." },
                { n: 5, text: "Avec le DHCP, tu n'as pas à ", blank: "configurer chaque PC à la main", after: "." }
              ].map(({ n, text, blank, after }) => (
                <div key={n} className="p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                  <p className="text-slate-300">
                    <span>{n}. {text}</span>
                    <span className="bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-semibold">{blank}</span>
                    <span>{after}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Tableau à compléter – Commandes DHCP & DNS",
        content: (
          <div className="space-y-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4 text-amber-300 font-bold">Objectif</th>
                  <th className="text-left py-3 px-4 text-emerald-300 font-bold">Commande associée Cisco</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  { obj: "Allumer le port du routeur", cmd: "no shutdown (après ip address)" },
                  { obj: "Réserver des adresses qu'on ne donne pas aux PC", cmd: "ip dhcp excluded-address [début] [fin]" },
                  { obj: "Créer le réservoir d'adresses", cmd: "ip dhcp pool LAN" },
                  { obj: "Dire quelle plage d'adresses distribuer", cmd: "network 192.168.1.0 255.255.255.0" },
                  { obj: "Donner la passerelle aux PC", cmd: "default-router 192.168.1.1" },
                  { obj: "Donner l'adresse du serveur DNS aux PC", cmd: "dns-server 192.168.1.100" },
                  { obj: "Activer la résolution DNS sur le routeur", cmd: "ip domain-lookup" },
                  { obj: "Dire au routeur quel serveur DNS interroger", cmd: "ip name-server 192.168.1.100" },
                  { obj: "Voir quels PC ont reçu une IP", cmd: "show ip dhcp binding" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-700 hover:bg-slate-800/50">
                    <td className="py-3 px-4">{row.obj}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">{row.cmd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Configuration DHCP – En bref",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Le routeur peut distribuer les adresses aux PC. Exemple pour le réseau 192.168.1.x :</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-1">
              <p className="text-slate-500 text-xs mb-2">Interface (interface g0/0 → ip address 192.168.1.1 255.255.255.0 → no shutdown)</p>
              <p className="text-slate-500 text-xs mt-2 mb-2">Exclusion d'adresses fixes (serveurs, imprimantes, passerelle) :</p>
              <p className="text-emerald-400">ip dhcp excluded-address 192.168.1.1 192.168.1.10</p>
              <p className="text-emerald-400">ip dhcp excluded-address 192.168.1.250 192.168.1.254</p>
              <p className="text-slate-500 text-xs mt-4 mb-2">Création du pool DHCP avec les informations nécessaires :</p>
              <p className="text-emerald-400">ip dhcp pool LAN</p>
              <p className="text-slate-400">Router(dhcp-config)#</p>
              <p className="text-emerald-400">network 192.168.1.0 255.255.255.0</p>
              <p className="text-emerald-400">default-router 192.168.1.1</p>
              <p className="text-emerald-400">dns-server 192.168.1.100</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Rappel – DNS en pratique",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed font-semibold">En bref</p>
            <ul className="text-slate-300 list-disc pl-6 space-y-1">
              <li>Le PC demande au serveur DNS : « C'est quoi l'adresse de intranet ? »</li>
              <li>Le serveur répond : « 192.168.10.100 »</li>
              <li>Le PC utilise cette adresse pour envoyer ses données.</li>
            </ul>
            <p className="text-slate-200 leading-relaxed font-semibold">En lab</p>
            <ul className="text-slate-300 list-disc pl-6 space-y-1 text-sm">
              <li>Le DHCP donne aux PC l'adresse du serveur DNS (192.168.10.254)</li>
              <li>Sur le serveur : Services → DNS → tu ajoutes intranet, files, imprimante</li>
              <li>Tu testes avec <code className="bg-slate-800 px-1 rounded">ping intranet.techcorp.local</code> → si ça répond, c'est bon !</li>
            </ul>
            <p className="text-slate-200 leading-relaxed font-semibold">Sur un routeur Cisco (optionnel)</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-1">
              <p className="text-emerald-400">ip domain-lookup</p>
              <p className="text-slate-500 text-xs">Activer la résolution DNS sur le routeur</p>
              <p className="text-emerald-400 mt-2">ip name-server 192.168.1.100</p>
              <p className="text-slate-500 text-xs">Indiquer quel serveur DNS interroger</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Questions rapides – Réponses",
        content: (
          <div className="space-y-6">
            {[
              { q: "Pourquoi utilise-t-on DHCP ?", a: "Pour que les PC reçoivent leur adresse, la passerelle et le DNS tout seuls. Plus besoin de configurer chaque PC à la main." },
              { q: "Que signifie DORA ?", a: "Les 4 étapes : le PC demande une IP (Discover), le routeur propose (Offer), le PC accepte (Request), le routeur confirme (Acknowledgment)." },
              { q: "Qu'est-ce que le DHCP donne aux PC ?", a: "L'adresse IP, le masque, la passerelle (la sortie vers internet), et l'adresse du serveur DNS." },
              { q: "À quoi sert le DNS ?", a: "À traduire les noms (google.fr, intranet) en adresses. Comme un annuaire : tu donnes un nom, il te donne l'adresse." },
              { q: "Peut-on configurer un serveur DNS dans Packet Tracer ?", a: "Oui. Clic sur le serveur → Services → DNS → tu ajoutes des fiches nom → adresse." }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                <p className="text-amber-300 font-semibold mb-2">{i + 1}. {item.q}</p>
                <p className="text-slate-300 text-sm pl-4 border-l-2 border-emerald-500/50">→ {item.a}</p>
              </div>
            ))}
          </div>
        )
      },
      {
        type: 'interactive_quiz',
        title: "Quiz : DHCP & DNS",
        questions: [
          { q: "Pourquoi utilise-t-on DHCP ?", options: ["Pour aller plus vite sur internet", "Pour que les PC reçoivent leur adresse tout seuls (plus de config à la main)", "Pour remplacer le routeur"], a: 1, explanation: "Le DHCP donne tout aux PC automatiquement : adresse, passerelle, DNS. Tu configures une fois sur le routeur." },
          { q: "Que signifie DORA ?", options: ["Un mot de passe", "Les 4 étapes : PC demande, routeur propose, PC accepte, routeur confirme", "Un protocole de routage"], a: 1, explanation: "D = le PC cherche une IP, O = le routeur propose, R = le PC accepte, A = le routeur valide." },
          { q: "Qu'est-ce que le DHCP donne aux PC ?", options: ["Juste l'adresse IP", "L'adresse, la passerelle, le serveur DNS et le masque", "Uniquement le masque"], a: 1, explanation: "Il donne tout : l'IP, le masque, la passerelle (la sortie) et l'adresse du serveur DNS." },
          { q: "À quoi sert le DNS ?", options: ["À rien", "À traduire les noms (google.fr, intranet) en adresses", "À remplacer le DHCP"], a: 1, explanation: "Comme un annuaire : tu donnes un nom, il te donne l'adresse. Tu n'as pas à mémoriser les chiffres." },
          { q: "Peut-on configurer un serveur DNS dans Packet Tracer ?", options: ["Non", "Oui : serveur → Services → DNS → ajouter des fiches nom → adresse", "Seulement sur un routeur"], a: 1, explanation: "Tu cliques sur le serveur, tu vas dans Services → DNS, et tu ajoutes des enregistrements." },
          { q: "Quelle commande réserve des adresses pour qu'elles ne soient pas données aux PC ?", options: ["exclude-address", "ip dhcp excluded-address", "dhcp exclude"], a: 1, explanation: "ip dhcp excluded-address réserve une plage (par ex. la passerelle et le serveur DNS)." }
        ]
      },
      {
        type: 'command_builder',
        title: "Construire la configuration DHCP",
        commandBuilderTitle: "Configuration DHCP minimale",
        steps: [
          { cmd: "ip dhcp excluded-address 192.168.1.1 192.168.1.10", desc: "Réserver les adresses pour le routeur et les serveurs" },
          { cmd: "ip dhcp pool LAN", desc: "Créer le réservoir d'adresses" },
          { cmd: "network 192.168.1.0 255.255.255.0", desc: "La plage à distribuer" },
          { cmd: "default-router 192.168.1.1", desc: "La passerelle (la sortie)" },
          { cmd: "dns-server 192.168.1.100", desc: "L'adresse du serveur DNS" }
        ]
      },
      {
        type: 'flashcards',
        title: "Flashcards : Commandes DHCP & DNS",
        mode: "command_to_definition",
        cards: [
          { q: "ip dhcp excluded-address", a: "Réserver des adresses qu'on ne donne pas aux PC (routeur, serveur DNS)" },
          { q: "ip dhcp pool", a: "Créer le réservoir d'adresses" },
          { q: "network", a: "La plage d'adresses à distribuer" },
          { q: "default-router", a: "La passerelle qu'on donne aux PC" },
          { q: "dns-server", a: "L'adresse du serveur DNS qu'on donne aux PC" },
          { q: "ip domain-lookup", a: "Activer la résolution de noms sur le routeur" },
          { q: "ip name-server", a: "Dire au routeur quel serveur DNS interroger" },
          { q: "show ip dhcp binding", a: "Voir quels PC ont reçu une IP" }
        ]
      }
    ],
    lab: {
      title: "Lab Pratique – DHCP & DNS",
      context: "Mise en œuvre des services DHCP et DNS pour TechCorp. Topologie : 1 routeur, 1 switch, 2 PC, 1 serveur DNS. Réalisez le lab sur Cisco Packet Tracer.",
      consignes: (
        <div className="space-y-12 text-slate-200 text-base leading-relaxed">
          <div className="bg-blue-900/30 border border-blue-500/40 rounded-xl p-5">
            <p className="text-blue-100 font-semibold text-lg mb-2">Contexte général</p>
            <p className="text-blue-200/90 text-sm leading-relaxed">
              L'entreprise <strong>TechCorp</strong> déploie des réseaux et souhaite <strong>automatiser la configuration IP</strong> via DHCP et permettre l'accès aux serveurs internes via des <strong>noms</strong> (DNS). Deux labs sont proposés : un lab de base, puis un lab plus long avec deux sous-réseaux.
            </p>
          </div>

          {/* LAB 1 */}
          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-6">
            <h4 className="text-emerald-400 font-bold text-lg">LAB 1 – TechCorp base (court)</h4>
            <p className="text-slate-400 text-sm">Topologie : 1 routeur R-Tech, 1 switch, 2 PC, 1 serveur DNS. Plan 192.168.10.0/24.</p>
            <h5 className="text-amber-300 font-semibold mt-2">Câblage (Copper Straight-Through — chaque ligne = 1 câble)</h5>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-slate-300 border border-slate-600 rounded-lg">
                <thead><tr className="bg-slate-700/50"><th className="p-2 text-left">Appareil</th><th className="p-2 text-left">Port</th><th className="p-2 text-center text-slate-400">↔</th><th className="p-2 text-left">Appareil</th><th className="p-2 text-left">Port</th></tr></thead>
                <tbody>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-Bureautique</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/1</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-Technique</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/2</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">Serveur DNS</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/3</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/24</td><td className="p-2 text-center">↔</td><td className="p-2">R-Tech</td><td className="p-2 font-mono">G0/0</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs mb-2">Lecture : PC-Bureautique Fa0 ↔ Switch Fa0/1 = brancher un câble entre le port Fa0 du PC et le port Fa0/1 du switch.</p>
            <h5 className="text-amber-300 font-semibold mt-4">Partie 1 – DHCP</h5>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
              <li>Exclure 192.168.10.1 à 192.168.10.10</li>
              <li>Créer le pool LAN, network, default-router, dns-server</li>
              <li>PC en DHCP, vérifier avec ipconfig</li>
            </ol>
            <h5 className="text-blue-300 font-semibold mt-4">Partie 2 – DNS</h5>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
              <li>Serveur : intranet.techcorp.local → 192.168.10.100, files.techcorp.local → 192.168.10.101</li>
              <li>Vérifier avec ipconfig /all que chaque PC a bien DNS Servers = 192.168.10.254</li>
            </ol>
          </div>

          {/* LAB 2 - Consolidation du cours */}
          <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-6">
            <h4 className="text-violet-400 font-bold text-lg">LAB 2 – TechCorp étendu (consolidation)</h4>
            <p className="text-slate-300 text-sm mb-4">Même topologie et mêmes concepts que le Lab 1 : un seul réseau 192.168.10.0/24, un pool DHCP, un serveur DNS. Ce lab ajoute plus de postes et plus d'enregistrements DNS pour renforcer la maîtrise des notions du cours.</p>

            <h5 className="text-amber-300 font-semibold">Topologie attendue</h5>
            <ul className="list-none space-y-1 text-slate-300 text-sm">
              <li className="flex gap-2"><span className="text-emerald-400">•</span> 1 Routeur <strong>(R-Tech)</strong>, 1 Switch</li>
              <li className="flex gap-2"><span className="text-emerald-400">•</span> 4 PC : PC-B1, PC-B2, PC-B3, PC-B4</li>
              <li className="flex gap-2"><span className="text-emerald-400">•</span> 1 Serveur DNS (IP fixe 192.168.10.254)</li>
            </ul>

            <h5 className="text-amber-300 font-semibold mt-4">Câblage (Copper Straight-Through — chaque ligne = 1 câble)</h5>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-slate-300 border border-slate-600 rounded-lg">
                <thead><tr className="bg-slate-700/50"><th className="p-2 text-left">Appareil</th><th className="p-2 text-left">Port</th><th className="p-2 text-center text-slate-400">↔</th><th className="p-2 text-left">Appareil</th><th className="p-2 text-left">Port</th></tr></thead>
                <tbody>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-B1</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/1</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-B2</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/2</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-B3</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/3</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-B4</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/4</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">Serveur DNS</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/5</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/24</td><td className="p-2 text-center">↔</td><td className="p-2">R-Tech</td><td className="p-2 font-mono">G0/0</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs mb-2">Lecture : PC-B1 Fa0 ↔ Switch Fa0/1 = brancher un câble entre le port Fa0 du PC-B1 et le port Fa0/1 du switch.</p>

            <h5 className="text-amber-300 font-semibold mt-6">Plan d'adressage</h5>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Réseau : 192.168.10.0/24 — Passerelle (routeur G0/0) = 192.168.10.1</li>
              <li>• Serveur DNS : 192.168.10.254</li>
            </ul>

            <h5 className="text-amber-300 font-semibold mt-6">Partie 1 – Câblage et interface du routeur</h5>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
              <li>Câbler selon le tableau ci-dessus : 6 câbles (4 PC, 1 serveur, 1 switch↔routeur)</li>
              <li>Configurer G0/0 : 192.168.10.1/24, no shutdown</li>
            </ol>

            <h5 className="text-amber-300 font-semibold mt-6">Partie 2 – Exclusions DHCP</h5>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
              <li>Exclure 192.168.10.1 à 192.168.10.10 (passerelle + plage réservée)</li>
              <li>Exclure 192.168.10.250 à 192.168.10.254 (serveur DNS et fin du réseau)</li>
            </ol>

            <h5 className="text-amber-300 font-semibold mt-6">Partie 3 – Pool DHCP</h5>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
              <li>Créer le pool <strong>LAN</strong> : network 192.168.10.0 255.255.255.0, default-router 192.168.10.1, dns-server 192.168.10.254</li>
            </ol>

            <h5 className="text-amber-300 font-semibold mt-6">Partie 4 – Serveur DNS</h5>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
              <li>Sur le serveur : IP 192.168.10.254, masque /24, passerelle 192.168.10.1</li>
              <li>Services → DNS, ajouter les enregistrements :</li>
              <ul className="list-disc list-inside mt-2 ml-4 text-slate-400">
                <li>intranet.techcorp.local → 192.168.10.100</li>
                <li>files.techcorp.local → 192.168.10.101</li>
                <li>imprimante.techcorp.local → 192.168.10.50</li>
              </ul>
            </ol>

            <h5 className="text-amber-300 font-semibold mt-6">Partie 5 – PC et vérifications DHCP/DNS</h5>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
              <li>Les 4 PC en mode DHCP (Desktop → IP Configuration)</li>
              <li>ipconfig /all sur chaque PC → IP 192.168.10.x, passerelle 192.168.10.1, DNS 192.168.10.254</li>
              <li>ping 192.168.10.1 (passerelle) depuis un PC</li>
              <li>Sur le routeur : show ip dhcp binding → 4 baux affichés</li>
            </ol>

            <h5 className="text-amber-300 font-semibold mt-6">Partie 6 – Configuration SSH sur le routeur R-Tech</h5>
            <p className="text-slate-400 text-sm mb-2">Sur le routeur (après DHCP/DNS) : configurer SSH pour se connecter à distance depuis un PC. Notions de la Semaine 1 (Administration Cisco).</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
              <li><code className="text-emerald-400 font-mono">hostname R-Tech</code> — nom du routeur</li>
              <li><code className="text-emerald-400 font-mono">ip domain-name techcorp.local</code> — requis pour les clés RSA</li>
              <li><code className="text-emerald-400 font-mono">crypto key generate rsa</code> — taper 1024 quand demandé</li>
              <li><code className="text-emerald-400 font-mono">username admin privilege 15 secret cisco123</code> — utilisateur SSH</li>
              <li><code className="text-emerald-400 font-mono">line vty 0 4</code> → <code className="text-emerald-400 font-mono">login local</code> → <code className="text-emerald-400 font-mono">transport input ssh</code></li>
              <li><code className="text-emerald-400 font-mono">copy running-config startup-config</code> — sauvegarder</li>
            </ol>
            <p className="text-slate-400 text-sm mt-2"><strong>Test :</strong> Depuis PC-B1 (Desktop → Command Prompt) : <code className="text-emerald-400 font-mono">ssh -l admin 192.168.10.1</code> → taper cisco123 → connexion au routeur en mode privilégié.</p>

            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
              <p className="text-amber-200 font-bold mb-2">Livrables Lab 2</p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• 4 PC avec IP automatique via DHCP</li>
                <li>• DNS reçu par les PC (ipconfig /all affiche DNS Servers : 192.168.10.254)</li>
                <li>• show ip dhcp binding montrant les 4 baux</li>
                <li>• Connexion SSH depuis un PC vers le routeur (ssh -l admin 192.168.10.1)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      solutionContent: (
        <div className="max-w-4xl mx-auto space-y-12 text-slate-200 text-base leading-loose pb-16">
          <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/20 border border-emerald-500/40 rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-3">
              <CheckCircle className="w-8 h-8 text-emerald-400 flex-shrink-0" /> Correction détaillée – Lab DHCP & DNS
            </h1>
            <p className="text-emerald-100/90 text-lg leading-relaxed">Lab TechCorp : mise en œuvre complète du DHCP et du DNS sur Cisco Packet Tracer, avec explications à chaque étape.</p>
          </div>

          <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis :</span>
              {[
                { id: 'lab-dhcp-topo', label: 'Topologie', icon: '🔌' },
                { id: 'lab-dhcp-routeur', label: 'Routeur', icon: '📡' },
                { id: 'lab-dhcp-excl', label: 'Exclusions', icon: '🚫' },
                { id: 'lab-dhcp-pool', label: 'Pool DHCP', icon: '🔄' },
                { id: 'lab-dhcp-dns', label: 'Serveur DNS', icon: '🌐' },
                { id: 'lab-dhcp-pc', label: 'Configuration PC', icon: '💻' },
                { id: 'lab-dhcp-verif', label: 'Vérifications', icon: '✅' },
                { id: 'lab-dhcp-depan', label: 'Dépannage', icon: '🔧' }
              ].map(({ id, label, icon }) => (
                <button key={id} type="button" onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-emerald-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1">
                  <span className="text-[10px]">{icon}</span> {label}
                </button>
              ))}
            </div>
          </nav>

          <section id="lab-dhcp-topo" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-emerald-400 mb-6">🔌 Étape 0 — Topologie et câblage</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Placer 1 routeur (R-Tech), 1 switch, 2 PC (PC-Bureautique, PC-Technique), 1 serveur. Utiliser des câbles <strong>Copper Straight-Through</strong> (vert clair). Chaque ligne du tableau = un câble à brancher.</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-slate-300 border border-slate-600 rounded-lg">
                <thead>
                  <tr className="bg-slate-700/50">
                    <th className="p-2 text-left">Appareil</th>
                    <th className="p-2 text-left">Port</th>
                    <th className="p-2 text-center text-slate-400">connexion</th>
                    <th className="p-2 text-left">Appareil</th>
                    <th className="p-2 text-left">Port</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-Bureautique</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/1</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-Technique</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/2</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">Serveur DNS</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/3</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/24</td><td className="p-2 text-center">↔</td><td className="p-2">R-Tech</td><td className="p-2 font-mono">G0/0</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs mb-4">Exemple : le câble du PC-Bureautique se branche sur le port <strong>Fa0</strong> du PC et sur le port <strong>Fa0/1</strong> du switch. Renommer les équipements (clic → Config → Display Name). Attendre 10–20 s que les liens passent au vert.</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
              <p className="text-amber-200 font-bold mb-2">💡 Pourquoi cette topologie ?</p>
              <p className="text-slate-300 text-sm mb-2">Le routeur a deux rôles : (1) <strong>passerelle</strong> — les PC envoient vers lui le trafic sortant du réseau ; (2) <strong>serveur DHCP</strong> — il écoute les requêtes DORA et attribue les IP. Le serveur DNS doit avoir une <strong>IP fixe</strong> (192.168.10.254) : les PC reçoivent cette adresse via le DHCP, et ils doivent savoir où aller pour résoudre les noms. Un serveur en DHCP changerait d'IP et deviendrait introuvable.</p>
              <p className="text-slate-400 text-xs">Le switch relie tout le monde sur le même segment Ethernet. Sans lui, les broadcasts DHCP ne traverseraient pas.</p>
            </div>
          </section>

          <section id="lab-dhcp-routeur" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-blue-400 mb-6">📡 Étape 1 — Configuration de l'interface du routeur</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Donner une IP au routeur sur son interface connectée au switch. Sans IP, le routeur n'est « personne » sur le réseau : les PC ne peuvent pas le joindre, et le DHCP (qui tourne sur le routeur) ne peut pas être atteint par les requêtes broadcast des clients.</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
              <p className="text-amber-200 font-bold mb-2">💡 Pourquoi cette étape en premier ?</p>
              <p className="text-slate-300 text-sm">L'ordre est important : (1) d'abord l'IP du routeur, (2) ensuite les exclusions (pour ne pas donner .1 à un PC), (3) puis le pool DHCP. Si tu crées le pool avant d'avoir activé l'interface, le DHCP ne recevra pas les requêtes car le lien physique serait down.</p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3 mb-2">
                  <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(config)#</code>
                  <div className="flex-1">
                    <code className="text-emerald-400 font-mono text-sm">interface g0/0</code>
                    <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                    <p className="text-slate-400 text-xs">Entre en mode configuration de l'interface GigabitEthernet 0/0. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">Router(config-if)#</code> — toutes les commandes tapées s'appliquent à cette interface.</p>
                    <p className="text-amber-200/90 text-xs font-semibold mt-1">Pourquoi on la tape :</p>
                    <p className="text-slate-400 text-xs">Sans cette étape, on reste en config globale et on ne peut pas attribuer d'IP à une interface précise. On choisit G0/0 car c'est le port physiquement connecté au switch.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3 mb-2">
                  <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(config-if)#</code>
                  <div className="flex-1">
                    <code className="text-emerald-400 font-mono text-sm">ip address 192.168.10.1 255.255.255.0</code>
                    <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                    <p className="text-slate-400 text-xs">Attribue l'adresse 192.168.10.1 avec le masque 255.255.255.0 (/24) à l'interface. Le routeur « vit » maintenant dans le réseau 192.168.10.0 — les 254 adresses .1 à .254 lui sont familières.</p>
                    <p className="text-amber-200/90 text-xs font-semibold mt-1">Pourquoi on la tape :</p>
                    <p className="text-slate-400 text-xs">Sans IP, le routeur n'existe pas pour le réseau : les PC ne savent pas où envoyer les paquets, et les requêtes DHCP (broadcast) ne trouvent personne pour y répondre. Cette IP sera la passerelle (<code className="bg-slate-800 px-1 rounded text-xs">default-router</code>) que le DHCP donnera aux PC.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3 mb-2">
                  <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(config-if)#</code>
                  <div className="flex-1">
                    <code className="text-emerald-400 font-mono text-sm">no shutdown</code>
                    <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                    <p className="text-slate-400 text-xs">Réactive l'interface. Par défaut, les interfaces Cisco sont en <strong>shutdown</strong> (état « administratively down ») : le port est logiciellement désactivé, le lien reste rouge même si le câble est branché.</p>
                    <p className="text-amber-200/90 text-xs font-semibold mt-1">Pourquoi on la tape :</p>
                    <p className="text-slate-400 text-xs">Sans <code className="bg-slate-800 px-1 rounded text-xs">no shutdown</code>, le lien physique ne monte jamais : les paquets ne passent pas, les broadcasts DHCP ne traversent pas, et les PC ne reçoivent jamais d'IP. C'est la cause n°1 de « ça ne marche pas » en lab.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="lab-dhcp-excl" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-amber-400 mb-6">🚫 Étape 2 — Exclusions DHCP (adresses réservées)</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> On dit au routeur : « Ces adresses ne doivent <em>jamais</em> être attribuées à un client DHCP ». Typiquement la passerelle (192.168.10.1), le serveur DNS (.254), et éventuellement serveurs ou imprimantes avec IP fixe.</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
              <p className="text-amber-200 font-bold mb-2">💡 Pourquoi exclure ces adresses ?</p>
              <p className="text-slate-300 text-sm">Si un PC reçoit 192.168.10.1 via DHCP, il aura la même IP que la passerelle → conflit : le routeur ne répond plus correctement, les autres PC ne trouvent plus la passerelle, et tout le réseau est perturbé. En réservant .1 à .10 et .250 à .254, tu gardes ces plages pour les équipements à adresses statiques. Le pool ne distribue que les adresses entre .11 et .249.</p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3 mb-2">
                  <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(config)#</code>
                  <div className="flex-1">
                    <code className="text-emerald-400 font-mono text-sm">ip dhcp excluded-address 192.168.10.1 192.168.10.10</code>
                    <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                    <p className="text-slate-400 text-xs">Indique au routeur : « Ne donne jamais ces adresses (.1 à .10) à un client DHCP ». Ces IP sont retirées du pool et ne seront jamais proposées lors d'une Offre DORA.</p>
                    <p className="text-amber-200/90 text-xs font-semibold mt-1">Pourquoi on la tape :</p>
                    <p className="text-slate-400 text-xs">192.168.10.1 est l'IP du routeur (passerelle). Si un PC la reçoit via DHCP, conflit d'IP : deux machines avec la même adresse, le réseau devient imprévisible. On réserve aussi .2 à .10 pour serveurs, imprimantes, équipements à IP fixe.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3 mb-2">
                  <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(config)#</code>
                  <div className="flex-1">
                    <code className="text-emerald-400 font-mono text-sm">ip dhcp excluded-address 192.168.10.250 192.168.10.254</code>
                    <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                    <p className="text-slate-400 text-xs">Exclut la plage .250 à .254 du pool. Le DHCP ne proposera jamais ces adresses aux PC.</p>
                    <p className="text-amber-200/90 text-xs font-semibold mt-1">Pourquoi on la tape :</p>
                    <p className="text-slate-400 text-xs">192.168.10.254 est réservé au serveur DNS. Ce serveur a une IP fixe ; si le DHCP lui donnait une autre IP ou si un PC recevait .254, le DNS deviendrait introuvable et la résolution des noms échouerait.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-200 font-bold">Rappel</p>
              <p className="text-slate-300 text-sm">Les exclusions se font en <strong>mode configuration globale</strong> (Router(config)#), <em>avant</em> de créer le pool. Une fois le pool créé, tu es en mode dhcp-config et les exclusions ne peuvent plus être modifiées depuis là.</p>
            </div>
          </section>

          <section id="lab-dhcp-pool" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-emerald-400 mb-6">🔄 Étape 3 — Création du pool DHCP</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Créer un « pool » (réservoir) d'adresses que le DHCP distribuera aux clients, et configurer les paramètres que chaque client recevra : passerelle, masque et serveur DNS.</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
              <p className="text-amber-200 font-bold mb-2">💡 Pourquoi après les exclusions ?</p>
              <p className="text-slate-300 text-sm">L'ordre est crucial : les exclusions s'appliquent au pool. Quand tu définis <code className="bg-slate-800 px-1 rounded text-xs">network 192.168.10.0</code>, le DHCP utilise la plage .0–.255 <strong>moins</strong> les adresses exclues. Si tu ne fais pas les exclusions avant, le pool pourrait théoriquement distribuer .1 ou .254 à un PC. Fais toujours exclusions → pool.</p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3 mb-2">
                  <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(config)#</code>
                  <div className="flex-1">
                    <code className="text-emerald-400 font-mono text-sm">ip dhcp pool LAN</code>
                    <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                    <p className="text-slate-400 text-xs">Crée un pool DHCP nommé « LAN » et bascule en mode <code className="bg-slate-800 px-1 rounded text-xs">Router(dhcp-config)#</code>. Toutes les commandes suivantes (network, default-router, dns-server) s'appliquent à ce pool.</p>
                    <p className="text-amber-200/90 text-xs font-semibold mt-1">Pourquoi on la tape :</p>
                    <p className="text-slate-400 text-xs">Un pool = un réservoir d'adresses à distribuer. Le nom (LAN, OFFICE, etc.) sert à identifier le pool dans la config ; il n'apparaît pas aux clients. Sans pool, le routeur ne peut pas répondre aux requêtes DHCP.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3 mb-2">
                  <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(dhcp-config)#</code>
                  <div className="flex-1">
                    <code className="text-emerald-400 font-mono text-sm">network 192.168.10.0 255.255.255.0</code>
                    <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                    <p className="text-slate-400 text-xs">Définit le réseau du pool : 192.168.10.0 avec masque /24. Le DHCP prend toutes les adresses de ce réseau ( .1 à .254 ) puis retire les exclusions. Il ne distribuera que .11 à .249.</p>
                    <p className="text-amber-200/90 text-xs font-semibold mt-1">Pourquoi on la tape :</p>
                    <p className="text-slate-400 text-xs">Sans <code className="bg-slate-800 px-1 rounded text-xs">network</code>, le pool ne sait pas quelles adresses proposer. Le masque doit correspondre au réseau réel ( ici /24 ) pour que les PC aient des IP valides sur le même segment que le routeur.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3 mb-2">
                  <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(dhcp-config)#</code>
                  <div className="flex-1">
                    <code className="text-emerald-400 font-mono text-sm">default-router 192.168.10.1</code>
                    <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                    <p className="text-slate-400 text-xs">Envoie l'adresse de la passerelle par défaut dans la réponse DHCP ( Option 3 ). Chaque PC qui reçoit une IP reçoit aussi cette passerelle et l'enregistre dans sa configuration.</p>
                    <p className="text-amber-200/90 text-xs font-semibold mt-1">Pourquoi on la tape :</p>
                    <p className="text-slate-400 text-xs">Un PC sans passerelle ne sait pas où envoyer le trafic destiné à un autre réseau ( internet, autre sous-réseau ). Il enverrait les paquets en broadcast ou les perdrait. La passerelle = la « porte de sortie » du réseau local.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3 mb-2">
                  <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(dhcp-config)#</code>
                  <div className="flex-1">
                    <code className="text-emerald-400 font-mono text-sm">dns-server 192.168.10.254</code>
                    <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                    <p className="text-slate-400 text-xs">Envoie l'adresse du serveur DNS dans la réponse DHCP ( Option 6 ). Le PC enregistre 192.168.10.254 comme serveur DNS et l'utilisera pour toutes les résolutions de noms.</p>
                    <p className="text-amber-200/90 text-xs font-semibold mt-1">Pourquoi on la tape :</p>
                    <p className="text-slate-400 text-xs">Sans ça, le PC ne saurait pas qui contacter pour traduire intranet.techcorp.local en IP. Tu devrais configurer le DNS manuellement sur chaque poste. Avec cette option, tout est automatisé dès l'obtention de l'IP via DORA.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="lab-dhcp-dns" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-blue-400 mb-6">🌐 Étape 4 — Configuration du serveur DNS</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Configurer le serveur (PC ou device « Server » dans Packet Tracer) avec l’IP 192.168.10.254 (adresse que tu as exclue du pool), puis créer les enregistrements DNS qui associent les noms de domaine aux IP.</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
              <p className="text-amber-200 font-bold mb-2">💡 Pourquoi le DNS et dans quel ordre ?</p>
              <p className="text-slate-300 text-sm">Le DNS permet aux PC de résoudre <code className="bg-slate-800 px-1 rounded text-xs">intranet.techcorp.local</code> en 192.168.10.100. Le pool DHCP envoie déjà l’adresse du DNS (192.168.10.254) aux clients via <code className="bg-slate-800 px-1 rounded text-xs">dns-server</code>, donc tu peux configurer le serveur DNS avant ou après les PC. L’important : l’IP du serveur doit être .254 (dans la plage exclue) et correspondre à ce que tu as mis dans le pool.</p>
            </div>
            <div className="space-y-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-200 text-xs font-semibold">Config du serveur : IP 192.168.10.254, masque /24, passerelle 192.168.10.1</p>
                <p className="text-slate-400 text-xs mt-1">Ce que ça fait : Donne une IP fixe au serveur sur le réseau 192.168.10.0.</p>
                <p className="text-amber-200/90 text-xs">Pourquoi : Le pool DHCP envoie 192.168.10.254 comme DNS. Si le serveur n'a pas cette IP, les PC enverront les requêtes DNS vers une adresse sans répondant.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-200 text-xs font-semibold">Services → DNS → Add : enregistrements nom → IP</p>
                <p className="text-slate-400 text-xs mt-1">Ce que ça fait : Quand un PC demande « quelle est l'IP de intranet.techcorp.local ? », le serveur répond « 192.168.10.100 ».</p>
                <p className="text-amber-200/90 text-xs">Pourquoi : Sans enregistrement, le DNS répond « nom inconnu » et le ping par nom échoue.</p>
                <ul className="list-none space-y-1 text-slate-300 text-sm mt-2">
                  <li><code className="text-emerald-400">intranet.techcorp.local</code> → 192.168.10.100</li>
                  <li><code className="text-emerald-400">files.techcorp.local</code> → 192.168.10.101</li>
                </ul>
              </div>
            </div>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-200 font-bold">Important</p>
              <p className="text-slate-300 text-sm">Les PC reçoivent l'adresse du serveur DNS via le DHCP (commande <code className="bg-slate-900 px-1 rounded">dns-server</code> dans le pool). Tu n'as pas besoin de configurer le DNS manuellement sur les PC.</p>
            </div>
          </section>

          <section id="lab-dhcp-pc" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-amber-400 mb-6">💻 Étape 5 — Configuration des PC en DHCP</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Sur chaque PC : Desktop → IP Configuration, puis choisir <strong>DHCP</strong> au lieu de Static. Le PC envoie une requête broadcast (DORA) et reçoit automatiquement une IP dans le pool, la passerelle et l’adresse du serveur DNS.</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
              <p className="text-amber-200 font-bold mb-2">💡 Pourquoi faire cette étape en dernier côté PC ?</p>
              <p className="text-slate-300 text-sm">Les PC envoient des requêtes DHCP dès qu’ils sont en mode DHCP. Si le routeur n’a pas encore le pool configuré (ou si l’interface est down), la requête ne reçoit pas de réponse et le PC reste à 0.0.0.0. Donc : configure toujours le routeur (interface + exclusions + pool) avant de passer les PC en DHCP.</p>
            </div>
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-200 font-bold">Si l'IP reste à 0.0.0.0</p>
              <p className="text-slate-300 text-sm">Vérifie que le routeur a bien l'interface activée (<code className="bg-slate-900 px-1 rounded">no shutdown</code>), que le pool DHCP est créé, et que le PC est sur le même réseau (branché sur le switch, lui-même relié au routeur). En mode Simulation, tu peux voir les paquets DORA circuler.</p>
            </div>
          </section>

          <section id="lab-dhcp-verif" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-emerald-400 mb-6">✅ Étape 6 — Procédures de vérification (commandes exactes)</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">Suivre chaque étape dans l'ordre. Chaque ligne indique : <strong>où</strong> faire la vérification, la <strong>commande exacte</strong> à taper, et le <strong>résultat attendu</strong>.</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
              <p className="text-amber-200 font-bold mb-2">💡 Pourquoi cet ordre de vérification ?</p>
              <p className="text-slate-300 text-sm">On teste du plus proche au plus loin : d’abord « est-ce que j’ai une IP ? » (ipconfig /all), puis « est-ce que je reach la passerelle ? » (ping .1). Si le ping .1 échoue alors que ipconfig affiche une IP, le problème est au niveau routeur (interface down, mauvais masque). Si ipconfig ne montre pas de DNS, le pool DHCP manque dns-server.</p>
            </div>
            <div className="space-y-6 ml-0 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                <p className="text-amber-300 font-bold mb-2">Vérification 1 — IP et DNS reçus via DHCP</p>
                <p className="text-slate-400 text-sm mb-1"><strong>Où :</strong> PC-Bureautique (ou PC-Technique) → Desktop → Command Prompt</p>
                <p className="text-slate-200 font-mono text-sm mb-2 bg-black/40 px-3 py-2 rounded">ipconfig /all</p>
                <p className="text-slate-400 text-xs font-semibold mb-1">Output attendu :</p>
                <pre className="text-slate-300 text-xs font-mono bg-black/50 p-3 rounded overflow-x-auto mb-2">IPv4 Address. . . . . . . . . : 192.168.10.11
Subnet Mask . . . . . . . . . : 255.255.255.0
Default Gateway . . . . . . . : 192.168.10.1
DNS Servers . . . . . . . . . : 192.168.10.254</pre>
                <p className="text-slate-400 text-xs">Si IP = 0.0.0.0 → DHCP n'a pas répondu. Si DNS absent → ajouter dns-server 192.168.10.254 dans le pool.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                <p className="text-amber-300 font-bold mb-2">Vérification 2 — Passerelle joignable</p>
                <p className="text-slate-400 text-sm mb-1"><strong>Où :</strong> PC-Bureautique → Desktop → Command Prompt</p>
                <p className="text-slate-200 font-mono text-sm mb-2 bg-black/40 px-3 py-2 rounded">ping 192.168.10.1</p>
                <p className="text-slate-400 text-xs font-semibold mb-1">Output attendu :</p>
                <pre className="text-slate-300 text-xs font-mono bg-black/50 p-3 rounded overflow-x-auto mb-2">Pinging 192.168.10.1 with 32 bytes of data:
Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=255
Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=255
Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=255
Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=255</pre>
                <p className="text-slate-400 text-xs">Si « Request timed out » → vérifier interface routeur (no shutdown), câble.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                <p className="text-amber-300 font-bold mb-2">Vérification 3 — Baux DHCP</p>
                <p className="text-slate-400 text-sm mb-1"><strong>Où :</strong> R-Tech → CLI (console) → mode privilégié</p>
                <p className="text-slate-200 font-mono text-sm mb-2 bg-black/40 px-3 py-2 rounded">show ip dhcp binding</p>
                <p className="text-slate-400 text-xs font-semibold mb-1">Output attendu :</p>
                <pre className="text-slate-300 text-xs font-mono bg-black/50 p-3 rounded overflow-x-auto mb-2">IP address       Client-ID/              Lease expiration        Type
                 Hardware address
192.168.10.11    0050.0FC2.1234.01    --                     Automatic
192.168.10.12    0050.0FC2.1234.02    --                     Automatic</pre>
                <p className="text-slate-400 text-xs">2 lignes = PC-Bureautique et PC-Technique avec IP via DHCP.</p>
              </div>
            </div>
          </section>

          <section id="lab-dhcp-depan" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-amber-400 mb-6">🔧 Dépannage courant</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Quand quelque chose ne marche pas, remonter la chaîne des dépendances : (1) lien physique up ? (2) IP du routeur configurée ? (3) pool DHCP créé et exclusions OK ? (4) PC en mode DHCP ? (5) DNS configuré sur le serveur ?</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
              <p className="text-amber-200 font-bold mb-2">💡 Pourquoi suivre cet ordre de vérification ?</p>
              <p className="text-slate-300 text-sm">Chaque élément dépend du précédent : si l'interface du routeur est down, le DHCP ne reçoit jamais les requêtes ; si le pool n'est pas créé, pas d'Offre DHCP ; si le PC est en Static, il n'envoie pas de requête DORA. En vérifiant du plus bas niveau (lien, interface) vers le plus haut (DNS), tu identifies vite le maillon manquant.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-200 font-bold mb-2">Le PC ne reçoit pas d'IP</p>
                <p className="text-slate-400 text-sm mb-2">Vérifie : interface du routeur <code className="bg-slate-900 px-1 rounded">no shutdown</code>, pool DHCP créé avec <code className="bg-slate-900 px-1 rounded">network</code>, exclusions correctes. Vérifie aussi que le câble est bien branché et que le lien est vert.</p>
                <p className="text-amber-200/90 text-xs italic">Pourquoi : si le lien est down, les broadcast DHCP n'atteignent pas le routeur. Si le pool n'existe pas, pas d'Offre. Si les exclusions englobent tout le réseau, plus d'adresses à distribuer.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-200 font-bold mb-2">Le ping par nom échoue</p>
                <p className="text-slate-400 text-sm mb-2">Le PC a-t-il bien reçu le serveur DNS (192.168.10.254) ? Vérifie avec ipconfig. Le serveur a-t-il les enregistrements DNS configurés ? Le serveur a-t-il l'IP 192.168.10.254 ?</p>
                <p className="text-amber-200/90 text-xs italic">Pourquoi : le ping par nom passe par le DNS. Si le PC n'a pas reçu l'adresse DNS (via DHCP), il ne sait pas qui interroger. Si le serveur n'a pas l'enregistrement, il répond « nom inconnu ».</p>
              </div>
            </div>
          </section>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-blue-200 font-bold">DHCP vs DNS — Rappel</p>
            <p className="text-slate-300 text-sm mt-1"><strong>DHCP</strong> : attribue automatiquement IP, masque, passerelle, DNS aux clients. Le client envoie une requête DORA et reçoit tout. <strong>DNS</strong> : traduit les noms en adresses IP. Quand tu tapes intranet.techcorp.local, le PC interroge le DNS, reçoit 192.168.10.100, puis envoie le paquet à cette IP.</p>
            <p className="text-blue-100/80 text-xs mt-2 italic">Pourquoi les deux ensemble ici ? Le pool DHCP transmet l'adresse du serveur DNS (<code className="bg-slate-800 px-1 rounded">dns-server 192.168.10.254</code>). Sans ça, tu devrais configurer le DNS manuellement sur chaque PC. Avec DHCP + DNS, tout est automatisé : le PC reçoit tout en une seule requête.</p>
          </div>
        </div>
      ),
      solutionContentLab2: (
        <div className="max-w-4xl mx-auto space-y-12 text-slate-200 text-base leading-loose pb-16">
          <div className="bg-gradient-to-br from-violet-900/30 to-emerald-900/20 border border-violet-500/40 rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-3">
              <CheckCircle className="w-8 h-8 text-violet-400 flex-shrink-0" /> Correction Lab 2 – TechCorp étendu
            </h1>
            <p className="text-violet-100/90 text-lg leading-relaxed">Même topologie que le Lab 1 : un seul réseau, un pool DHCP, un serveur DNS. 4 PC et 3 enregistrements DNS pour consolider les notions du cours.</p>
          </div>

          <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis :</span>
              {[
                { id: 'lab2-topo', label: 'Topologie', icon: '🔌' },
                { id: 'lab2-routeur', label: 'Routeur', icon: '📡' },
                { id: 'lab2-excl', label: 'Exclusions', icon: '🚫' },
                { id: 'lab2-pool', label: 'Pool DHCP', icon: '🔄' },
                { id: 'lab2-dns', label: 'DNS', icon: '🌐' },
                { id: 'lab2-ssh', label: 'SSH', icon: '🔐' },
                { id: 'lab2-verif', label: 'Vérifications', icon: '✅' }
              ].map(({ id, label, icon }) => (
                <button key={id} type="button" onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-violet-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1">
                  <span className="text-[10px]">{icon}</span> {label}
                </button>
              ))}
            </div>
          </nav>

          <section id="lab2-topo" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-violet-400 mb-6">🔌 Étape 0 — Topologie et câblage</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Même structure que le Lab 1 : 1 routeur R-Tech, 1 switch, 4 PC (PC-B1 à PC-B4), 1 serveur. Câbles <strong>Copper Straight-Through</strong>. Chaque ligne du tableau = un câble.</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-slate-300 border border-slate-600 rounded-lg">
                <thead>
                  <tr className="bg-slate-700/50">
                    <th className="p-2 text-left">Appareil</th>
                    <th className="p-2 text-left">Port</th>
                    <th className="p-2 text-center text-slate-400">↔</th>
                    <th className="p-2 text-left">Appareil</th>
                    <th className="p-2 text-left">Port</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-B1</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/1</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-B2</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/2</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-B3</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/3</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">PC-B4</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/4</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">Serveur DNS</td><td className="p-2 font-mono">Fa0</td><td className="p-2 text-center">↔</td><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/5</td></tr>
                  <tr className="border-t border-slate-600"><td className="p-2">Switch</td><td className="p-2 font-mono">Fa0/24</td><td className="p-2 text-center">↔</td><td className="p-2">R-Tech</td><td className="p-2 font-mono">G0/0</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs mb-4">Exemple : PC-B1 Fa0 ↔ Switch Fa0/1 = brancher un câble entre le port Fa0 du PC-B1 et le port Fa0/1 du switch.</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
              <p className="text-amber-200 font-bold mb-2">💡 Pourquoi ce lab ressemble au Lab 1 ?</p>
              <p className="text-slate-300 text-sm">Le cours enseigne un seul réseau, un pool, un serveur DNS. Ce lab 2 reprend exactement ces notions : plus de PC et plus d'enregistrements DNS pour s'entraîner sans introduire de nouveaux concepts (pas de multi-sites, pas de routage inter-réseaux).</p>
            </div>
          </section>

          <section id="lab2-routeur" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-blue-400 mb-6">📡 Étape 1 — Interface du routeur</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Configurer l'interface G0/0 : IP 192.168.10.1/24 et no shutdown. C'est la passerelle du réseau et l'interface qui reçoit les requêtes DORA.</p>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm"><span className="text-slate-500">Router(config)#</span> interface g0/0</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Entre en mode configuration de l'interface G0/0.</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Pour pouvoir attribuer une IP à cette interface.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm"><span className="text-slate-500">Router(config-if)#</span> ip address 192.168.10.1 255.255.255.0</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Attribue l'IP 192.168.10.1/24 au routeur sur ce port.</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Le routeur doit avoir une IP sur le réseau pour être la passerelle et recevoir les requêtes DHCP.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm"><span className="text-slate-500">Router(config-if)#</span> no shutdown</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Active le port. Sans ça, le lien reste rouge ( administratively down ).</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Le trafic ne passe pas si le port est shutdown. Les broadcasts DHCP n'atteindraient pas le routeur.</p>
              </div>
            </div>
          </section>

          <section id="lab2-excl" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-amber-400 mb-6">🚫 Étape 2 — Exclusions DHCP</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Réserver les adresses fixes : la passerelle (.1 à .10) et le serveur DNS (.250 à .254). Comme vu dans le cours, les exclusions se font en mode config globale, avant le pool.</p>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm">ip dhcp excluded-address 192.168.10.1 192.168.10.10</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Retire les adresses .1 à .10 du pool. Le DHCP ne les attribuera jamais.</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">.1 est la passerelle. Si un PC la reçoit, conflit d'IP. .2 à .10 réservés pour serveurs, imprimantes.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm">ip dhcp excluded-address 192.168.10.250 192.168.10.254</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Retire les adresses .250 à .254 du pool.</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">.254 est le serveur DNS. IP fixe — si un PC la recevait, le DNS serait introuvable.</p>
              </div>
            </div>
          </section>

          <section id="lab2-pool" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-emerald-400 mb-6">🔄 Étape 3 — Pool DHCP</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Créer le pool LAN comme dans le cours : network, default-router, dns-server. Le pool distribue les IP entre .11 et .249 (hors exclusions).</p>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm">ip dhcp pool LAN</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Crée le pool et passe en mode dhcp-config.</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Sans pool, le routeur ne peut pas répondre aux requêtes DORA.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm">network 192.168.10.0 255.255.255.0</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Définit le réseau du pool. Le DHCP distribue les IP de ce réseau moins les exclusions.</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Les PC doivent être sur le même réseau que la passerelle pour communiquer.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm">default-router 192.168.10.1</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Envoie la passerelle dans la réponse DHCP ( Option 3 ).</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Sans passerelle, les PC ne savent pas où envoyer le trafic sortant du réseau.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm">dns-server 192.168.10.254</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Envoie l'adresse du DNS dans la réponse DHCP ( Option 6 ).</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Les PC pourront résoudre les noms ( intranet.techcorp.local, etc. ) sans config manuelle.</p>
              </div>
            </div>
          </section>

          <section id="lab2-dns" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-blue-400 mb-6">🌐 Étape 4 — Serveur DNS</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Configurer le serveur (Packet Tracer : Config → IP 192.168.10.254, masque /24, passerelle 192.168.10.1). Puis Services → DNS, ajouter 3 enregistrements.</p>
            <div className="space-y-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-200 text-xs font-semibold">IP du serveur : 192.168.10.254</p>
                <p className="text-slate-400 text-xs mt-1">Ce que ça fait : Donne une IP fixe au serveur sur le réseau.</p>
                <p className="text-amber-200/90 text-xs">Pourquoi : Le pool DHCP envoie .254 comme DNS aux PC. Si le serveur n'a pas cette IP, les requêtes DNS vont au vide.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-200 text-xs font-semibold">Enregistrements DNS (nom → IP)</p>
                <p className="text-slate-400 text-xs mt-1">Ce que ça fait : Quand un PC demande « quelle est l'IP de intranet.techcorp.local ? », le serveur répond « 192.168.10.100 ».</p>
                <p className="text-amber-200/90 text-xs">Pourquoi : Sans enregistrement, le DNS répond « nom inconnu » et le ping par nom échoue.</p>
                <ul className="list-none space-y-1 text-slate-300 text-sm mt-2">
                  <li><code className="text-emerald-400">intranet.techcorp.local</code> → 192.168.10.100</li>
                  <li><code className="text-emerald-400">files.techcorp.local</code> → 192.168.10.101</li>
                  <li><code className="text-emerald-400">imprimante.techcorp.local</code> → 192.168.10.50</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="lab2-ssh" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-amber-400 mb-6">🔐 Étape 5 — Configuration SSH sur le routeur</h2>
            <p className="text-slate-300 mb-4 leading-relaxed"><strong>Ce qu'on fait :</strong> Configurer SSH sur R-Tech pour s'y connecter à distance depuis un PC (ssh -l admin 192.168.10.1). Reprise des notions de la Semaine 1 (Administration Cisco).</p>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm"><span className="text-slate-500">Router(config)#</span> hostname R-Tech</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Donne le nom « R-Tech » au routeur. Le prompt devient R-Tech(config)#.</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Identifie l'équipement. Requis pour SSH : les clés RSA utilisent le hostname + domain.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm"><span className="text-slate-500">R-Tech(config)#</span> ip domain-name techcorp.local</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Définit le nom de domaine. Le routeur formera « R-Tech.techcorp.local » pour les clés RSA.</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">crypto key generate rsa exige un domain-name. Sans ça, erreur.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm"><span className="text-slate-500">R-Tech(config)#</span> crypto key generate rsa</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Génère une paire de clés RSA (publique + privée). Quand demandé : taper <strong>1024</strong> pour la taille (suffisant en Packet Tracer).</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">SSH chiffre la session avec ces clés. Sans clés RSA, SSH ne démarre pas.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm"><span className="text-slate-500">R-Tech(config)#</span> username admin privilege 15 secret cisco123</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Crée l'utilisateur « admin » avec mot de passe « cisco123 », niveau 15 (accès complet).</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">login local utilisera cet utilisateur pour l'authentification SSH.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm"><span className="text-slate-500">R-Tech(config)#</span> line vty 0 4</p>
                <p className="font-mono text-emerald-400 text-sm mt-1"><span className="text-slate-500">R-Tech(config-line)#</span> login local</p>
                <p className="font-mono text-emerald-400 text-sm mt-1"><span className="text-slate-500">R-Tech(config-line)#</span> transport input ssh</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que font les commandes :</p>
                <p className="text-slate-400 text-xs"><strong>line vty 0 4</strong> = configure les 5 lignes virtuelles. <strong>login local</strong> = demande user + mot de passe. <strong>transport input ssh</strong> = autorise uniquement SSH (désactive Telnet).</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Sécuriser l'accès : plus de Telnet en clair, uniquement SSH chiffré.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="font-mono text-emerald-400 text-sm"><span className="text-slate-500">R-Tech#</span> copy running-config startup-config</p>
                <p className="text-slate-200 text-xs font-semibold mt-1">Ce que fait la commande :</p>
                <p className="text-slate-400 text-xs">Sauvegarde la config en mémoire non volatile. Elle survivra à un reboot.</p>
                <p className="text-amber-200/90 text-xs font-semibold">Pourquoi :</p>
                <p className="text-slate-400 text-xs">Bonne pratique. Sans sauvegarde, tout est perdu si le routeur redémarre.</p>
              </div>
            </div>
            <div className="bg-emerald-900/20 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <p className="text-emerald-200 font-bold mb-2">Test SSH</p>
              <p className="text-slate-300 text-sm">Sur PC-B1 : Desktop → Command Prompt → <code className="bg-slate-900 px-1 rounded">ssh -l admin 192.168.10.1</code>. Quand demandé, taper <strong>cisco123</strong>. Tu dois arriver sur le routeur en mode privilégié (R-Tech#).</p>
            </div>
          </section>

          <section id="lab2-verif" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
            <h2 className="text-xl font-bold text-emerald-400 mb-6">✅ Étape 6 — Procédures de vérification (commandes exactes)</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">Suivre chaque étape dans l'ordre. Chaque ligne indique : <strong>où</strong> faire la vérification, la <strong>commande exacte</strong> à taper, et le <strong>résultat attendu</strong>.</p>
            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                <p className="text-amber-300 font-bold mb-2">Vérification 1 — IP reçue via DHCP</p>
                <p className="text-slate-400 text-sm mb-1"><strong>Où :</strong> PC-B1 (ou PC-B2, PC-B3, PC-B4) → Desktop → Command Prompt</p>
                <p className="text-slate-200 font-mono text-sm mb-2 bg-black/40 px-3 py-2 rounded">ipconfig</p>
                <p className="text-slate-400 text-xs font-semibold mb-1">Output attendu :</p>
                <pre className="text-slate-300 text-xs font-mono bg-black/50 p-3 rounded overflow-x-auto mb-2">Wireless LAN adapter Wireless:
   IPv4 Address. . . . . . . . . : 192.168.10.11
   Subnet Mask . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . : 192.168.10.1
   DNS Servers . . . . . . . . . : 192.168.10.254</pre>
                <p className="text-slate-400 text-xs">Si IP = 0.0.0.0 → DHCP n'a pas répondu.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                <p className="text-amber-300 font-bold mb-2">Vérification 2 — Passerelle joignable</p>
                <p className="text-slate-400 text-sm mb-1"><strong>Où :</strong> PC-B1 → Desktop → Command Prompt</p>
                <p className="text-slate-200 font-mono text-sm mb-2 bg-black/40 px-3 py-2 rounded">ping 192.168.10.1</p>
                <p className="text-slate-400 text-xs font-semibold mb-1">Output attendu :</p>
                <pre className="text-slate-300 text-xs font-mono bg-black/50 p-3 rounded overflow-x-auto mb-2">Pinging 192.168.10.1 with 32 bytes of data:
Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=255
Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=255
Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=255
Reply from 192.168.10.1: bytes=32 time&lt;1ms TTL=255</pre>
                <p className="text-slate-400 text-xs">Si « Request timed out » → vérifier interface routeur (no shutdown), câble.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                <p className="text-amber-300 font-bold mb-2">Vérification 3 — Baux DHCP (sur le routeur)</p>
                <p className="text-slate-400 text-sm mb-1"><strong>Où :</strong> R-Tech → CLI → mode privilégié</p>
                <p className="text-slate-200 font-mono text-sm mb-2 bg-black/40 px-3 py-2 rounded">show ip dhcp binding</p>
                <p className="text-slate-400 text-xs font-semibold mb-1">Output attendu :</p>
                <pre className="text-slate-300 text-xs font-mono bg-black/50 p-3 rounded overflow-x-auto mb-2">IP address       Client-ID/              Lease expiration        Type
                 Hardware address
192.168.10.11    0050.0FC2.1234.01    --                     Automatic
192.168.10.12    0050.0FC2.1234.02    --                     Automatic
192.168.10.13    0050.0FC2.1234.03    --                     Automatic
192.168.10.14    0050.0FC2.1234.04    --                     Automatic</pre>
                <p className="text-slate-400 text-xs">4 lignes = 4 PC avec IP via DHCP.</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                <p className="text-amber-300 font-bold mb-2">Vérification 4 — Connexion SSH</p>
                <p className="text-slate-400 text-sm mb-1"><strong>Où :</strong> PC-B1 → Desktop → Command Prompt</p>
                <p className="text-slate-200 font-mono text-sm mb-2 bg-black/40 px-3 py-2 rounded">ssh -l admin 192.168.10.1</p>
                <p className="text-slate-400 text-xs font-semibold mb-1">Output attendu :</p>
                <pre className="text-slate-300 text-xs font-mono bg-black/50 p-3 rounded overflow-x-auto mb-2">Password: cisco123

R-Tech&gt;</pre>
                <p className="text-slate-400 text-xs">Taper <code className="bg-slate-800 px-1 rounded">enable</code> → R-Tech#. Si « Connection refused » → vérifier config SSH sur le routeur.</p>
              </div>
            </div>
          </section>

          <div className="bg-violet-900/20 border-l-4 border-violet-500 p-4 rounded-r-lg">
            <p className="text-violet-200 font-bold">Récapitulatif</p>
            <p className="text-slate-300 text-sm mt-1">Un réseau, un pool DHCP, un serveur DNS, puis la config SSH sur le routeur (Semaine 1). Ce lab 2 combine les notions des protocoles (DHCP/DNS) et de l'administration Cisco (SSH, sauvegarde). Les 4 PC, les 3 noms DNS et la connexion SSH permettent de pratiquer sans sortir du cadre.</p>
          </div>
        </div>
      )
    },
    quiz: [
      { q: "Que signifie DORA ?", options: ["Un protocole", "Discover, Offer, Request, Acknowledgment — les 4 étapes DHCP", "Un outil de diagnostic"], a: 1, explanation: "DORA décrit le processus complet d'attribution d'une adresse IP par DHCP." },
      { q: "Quelle commande crée un pool DHCP ?", options: ["dhcp pool", "ip dhcp pool nom", "create pool"], a: 1, explanation: "ip dhcp pool [nom] crée un pool et entre en mode dhcp-config." },
      { q: "Comment exclure une plage d'adresses du pool DHCP ?", options: ["exclude gateway", "ip dhcp excluded-address 192.168.1.1 192.168.1.10", "no pool 192.168.1.1"], a: 1, explanation: "ip dhcp excluded-address [ip_debut] [ip_fin] réserve des adresses pour serveurs, passerelle, etc." },
      { q: "Quelle commande active la résolution DNS sur un routeur Cisco ?", options: ["dns on", "ip domain-lookup", "dns enable"], a: 1, explanation: "ip domain-lookup active la résolution de noms par DNS (souvent désactivée avec no ip domain lookup)." },
      { q: "Quelle commande indique le serveur DNS à interroger ?", options: ["dns server", "ip name-server 192.168.1.100", "dns 192.168.1.100"], a: 1, explanation: "ip name-server permet au routeur de résoudre des noms de domaine." },
      { q: "Comment voir les baux DHCP attribués ?", options: ["show dhcp", "show ip dhcp binding", "show leases"], a: 1, explanation: "show ip dhcp binding affiche les baux actifs avec IP, MAC, durée." }
    ]
  },
  {
    id: 5,
    title: "Session 2 : HTTP, FTP et ARP",
    duration: "1h",
    icon: <Globe className="w-5 h-5" />,
    slides: [
      {
        type: 'intro',
        title: "Cours Théorique – Séance 2 : HTTP, FTP et ARP",
        content: `Bienvenue ! Ce cours s'adresse aux débutants. Nous allons progresser pas à pas.

Objectif : Comprendre les protocoles HTTP, FTP et ARP et leur rôle dans la communication réseau.

🎯 À la fin, vous serez capable de :
📡 Comprendre HTTP et HTTPS (client-serveur, ports 80/443)
📂 Comprendre FTP (ports 21 et 20, modes actif/passif)
🔗 Comprendre ARP (résolution IP → MAC, table ARP)`
      },
      {
        type: 'rich_text',
        title: "1. HTTP – Le problème : afficher des pages web",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Quand vous tapez <strong>https://www.google.fr</strong> dans votre navigateur, comment le contenu de la page arrive-t-il jusqu'à vous ?</p>
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-200 font-bold mb-2">Sans protocole standard :</p>
              <p className="text-slate-300 text-sm">Chaque site inventerait sa propre façon d'envoyer les pages → impossible de s'entendre entre navigateurs et serveurs.</p>
            </div>
            <p className="text-slate-300">La solution : le protocole <strong>HTTP</strong>, commun à tous les sites web.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "HTTP – C'est quoi, en une phrase ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-xl text-center py-4">Le <strong className="text-blue-400">HTTP</strong> est le protocole qui permet à un navigateur (client) de demander une page web à un serveur et de recevoir la réponse.</p>
            <div className="bg-blue-900/20 border border-blue-500/40 rounded-xl p-6">
              <p className="text-blue-200 font-bold mb-2">HyperText Transfer Protocol</p>
              <p className="text-slate-300 text-sm">Couche application (modèle OSI). Utilisé par tous les navigateurs et serveurs web du monde.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "HTTP – Modèle client-serveur",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">HTTP fonctionne selon un modèle <strong>client-serveur</strong> :</p>
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
              <li><strong>Le client</strong> (navigateur) envoie une requête au serveur (ex : <code className="bg-slate-900 px-1 rounded">GET /page.html</code>)</li>
              <li><strong>Le serveur</strong> renvoie une réponse avec des en-têtes (headers) et le contenu (body)</li>
            </ol>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm">
              <p className="text-amber-300">Requêtes courantes : GET (récupérer), POST (envoyer des données)</p>
              <p className="text-emerald-400 mt-2">HTTP utilise le port TCP 80</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "HTTP vs HTTPS – La sécurité",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed"><strong>HTTP</strong> transmet les données en clair. N'importe qui sur le réseau peut les lire.</p>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-200 font-bold mb-2">HTTPS</p>
              <p className="text-slate-300 text-sm">HTTPS ajoute une couche de chiffrement <strong>TLS/SSL</strong>. Les données sont cryptées.</p>
              <ul className="text-slate-300 text-sm mt-2 list-disc list-inside">
                <li><strong>Port 443</strong> (au lieu de 80)</li>
                <li>Confidentialité : personne ne peut lire les données</li>
                <li>Authenticité : certificats pour vérifier l'identité du site</li>
                <li>Intégrité : les données ne sont pas modifiées en transit</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "HTTP – Utilisations",
        content: (
          <div className="space-y-6">
            <ul className="space-y-3 text-slate-300">
              <li>• <strong>Navigation web</strong> — afficher des pages HTML, images, vidéos</li>
              <li>• <strong>APIs REST</strong> — les applications échangent des données (JSON, XML) via HTTP</li>
              <li>• <strong>Services cloud</strong> — beaucoup de services utilisent HTTP en arrière-plan</li>
            </ul>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "2. FTP – Le problème : transférer des fichiers",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Comment envoyer ou récupérer des fichiers volumineux entre deux machines (ex : publier un site web, échanger des documents) ?</p>
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-200 font-bold mb-2">FTP – File Transfer Protocol</p>
              <p className="text-slate-300 text-sm">Protocole de la couche application dédié au <strong>transfert de fichiers</strong> entre un client et un serveur.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "FTP – Deux connexions TCP",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">FTP établit <strong>2 connexions TCP</strong> distinctes :</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-900/20 border border-amber-500/40 rounded-xl p-5">
                <p className="text-amber-300 font-bold mb-2">Port 21 — Canal de commandes</p>
                <p className="text-slate-300 text-sm">Authentification (login/mot de passe), navigation dans les dossiers, ordres (upload, download)</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-xl p-5">
                <p className="text-emerald-300 font-bold mb-2">Port 20 — Canal de données</p>
                <p className="text-slate-300 text-sm">Transmission réelle des fichiers (téléchargement, envoi)</p>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "FTP – Mode actif vs Mode passif",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Pour la connexion de données (port 20), deux modes existent :</p>
            <div className="space-y-4">
              <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4">
                <p className="text-amber-300 font-bold">Mode actif</p>
                <p className="text-slate-300 text-sm">Le serveur initie la connexion de données vers le client. Problème : les pare-feux bloquent souvent les connexions entrantes.</p>
              </div>
              <div className="bg-slate-800/60 border border-emerald-600/50 rounded-lg p-4">
                <p className="text-emerald-300 font-bold">Mode passif</p>
                <p className="text-slate-300 text-sm">Le client initie toutes les connexions. Plus adapté pour traverser les pare-feux et NAT.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "FTP – Limitations et alternatives",
        content: (
          <div className="space-y-6">
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-200 font-bold mb-2">Limitation de FTP</p>
              <p className="text-slate-300 text-sm">FTP transmet les données (et le mot de passe) en clair. Non sécurisé sur un réseau non fiable.</p>
            </div>
            <p className="text-slate-200 leading-relaxed">Alternatives sécurisées :</p>
            <ul className="text-slate-300 list-disc pl-6 space-y-1">
              <li><strong>SFTP</strong> — FTP via SSH (chiffrement intégré)</li>
              <li><strong>FTPS</strong> — FTP + TLS (chiffrement des données)</li>
            </ul>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "3. ARP – Le problème : IP vs MAC",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Les applications utilisent des <strong>adresses IP</strong>. Mais sur le réseau local (Ethernet), les machines communiquent avec des <strong>adresses MAC</strong>. Comment passer de l'une à l'autre ?</p>
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-200 font-bold mb-2">ARP – Address Resolution Protocol</p>
              <p className="text-slate-300 text-sm">Protocole de la couche liaison (Layer 2) qui associe une adresse IP à une adresse MAC.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "ARP – Comment ça marche ?",
        content: (
          <div className="space-y-6">
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
              <li>Un hôte doit envoyer un paquet à une adresse IP locale qu'il ne connaît pas.</li>
              <li>Il envoie une <strong>requête ARP en broadcast</strong> : « Qui a l'IP 192.168.1.10 ? »</li>
              <li>Le destinataire répond : « Moi, mon adresse MAC est AA:BB:CC:DD:EE:FF »</li>
              <li>L'expéditeur stocke cette correspondance dans sa <strong>table ARP</strong>.</li>
            </ol>
            <p className="text-slate-400 text-sm">Résultat : les prochaines communications vers cette IP utilisent directement la MAC, sans refaire de requête.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "ARP – Caractéristiques importantes",
        content: (
          <div className="space-y-6">
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>Portée : LAN uniquement</strong> — ARP utilise le broadcast Ethernet, qui ne traverse pas les routeurs.</li>
              <li>• <strong>Table ARP</strong> — stocke les correspondances IP/MAC pour éviter de répéter les requêtes.</li>
              <li>• <strong>Sécurité</strong> — ARP peut être exploité (ARP spoofing : usurpation d'identité pour intercepter du trafic).</li>
            </ul>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Texte à trous – À compléter",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Complétez les trous mentalement avant de consulter les réponses :</p>
            <div className="space-y-4 text-slate-300">
              <p>1. Le protocole _____ utilise un modèle client-serveur, où le client envoie une requête au serveur pour obtenir des ressources.</p>
              <p>2. Pour sécuriser cette communication, _____ ajoute une couche de chiffrement, utilisant le port _____.</p>
              <p>3. Le protocole _____ permet le transfert de fichiers. Il utilise le port _____ pour la connexion de commande.</p>
              <p>4. Pour résoudre une adresse IP en adresse _____, le protocole _____ effectue une requête en _____. Les correspondances sont stockées dans la _____ _____.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Texte à trous – Réponses",
        content: (
          <div className="space-y-6">
            <p className="text-slate-400 text-sm mb-4">Vérifiez vos réponses :</p>
            <div className="space-y-4">
              {[
                { n: 1, text: "Le protocole ", blank: "HTTP", after: " utilise un modèle client-serveur, où le client envoie une requête au serveur pour obtenir des ressources." },
                { n: 2, text: "Pour sécuriser cette communication, ", blank: "HTTPS", after: " ajoute une couche de chiffrement, utilisant le port ", blank2: "443", after2: "." },
                { n: 3, text: "Le protocole ", blank: "FTP", after: " permet le transfert de fichiers. Il utilise le port ", blank2: "21", after2: " pour la connexion de commande." },
                { n: 4, text: "Pour résoudre une adresse IP en adresse ", blank: "MAC", after: ", le protocole ", blank2: "ARP", after2: " effectue une requête en ", blank3: "broadcast", after3: ". Les correspondances sont stockées dans la ", blank4: "table ARP", after4: "." }
              ].map(({ n, text, blank, after, blank2, after2, blank3, after3, blank4, after4 }) => (
                <div key={n} className="p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                  <p className="text-slate-300">
                    <span>{n}. {text}</span>
                    <span className="bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-semibold">{blank}</span>
                    <span>{after}</span>
                    {blank2 && <><span className="bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-semibold">{blank2}</span><span>{after2}</span></>}
                    {blank3 && <><span className="bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-semibold">{blank3}</span><span>{after3}</span></>}
                    {blank4 && <><span className="bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-semibold">{blank4}</span><span>{after4}</span></>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Tableau à compléter – Protocoles et couches",
        content: (
          <div className="space-y-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4 text-amber-300 font-bold">Protocole</th>
                  <th className="text-left py-3 px-4 text-blue-300 font-bold">Couche OSI</th>
                  <th className="text-left py-3 px-4 text-emerald-300 font-bold">Port(s)</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-bold">Fonction principale</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  { proto: "HTTP", layer: "Application", port: "80", func: "Affichage de pages web" },
                  { proto: "HTTPS", layer: "Application", port: "443", func: "Communication web sécurisée" },
                  { proto: "FTP", layer: "Application", port: "21 (commande), 20 (données)", func: "Transfert de fichiers" },
                  { proto: "ARP", layer: "Liaison (Layer 2)", port: "N/A", func: "Résolution IP → MAC" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-700 hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-semibold">{row.proto}</td>
                    <td className="py-3 px-4">{row.layer}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">{row.port}</td>
                    <td className="py-3 px-4">{row.func}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Questions rapides – Réponses",
        content: (
          <div className="space-y-6">
            {[
              { q: "Quelle différence principale distingue HTTP et HTTPS ?", a: "HTTPS ajoute une couche de chiffrement (TLS/SSL), garantissant la confidentialité, l'intégrité et l'authenticité des données échangées, contrairement à HTTP qui transmet en clair." },
              { q: "Pourquoi le protocole FTP utilise-t-il deux connexions (port 21 et port 20) ?", a: "Port 21 pour la connexion de commande (authentification, navigation, ordres). Port 20 pour la transmission réelle des données (fichiers)." },
              { q: "Quelle est la portée d'une requête ARP (LAN ou WAN) ?", a: "ARP fonctionne uniquement sur le réseau local (LAN) car il utilise des diffusions Ethernet (broadcast) qui ne franchissent pas les routeurs." },
              { q: "Quel est le rôle de la table ARP sur un hôte ?", a: "La table ARP stocke temporairement les correspondances IP/MAC pour éviter de renvoyer des requêtes ARP à chaque communication locale." },
              { q: "En quoi le mode passif du FTP est-il important pour la traversée de pare-feu ?", a: "En mode passif, le client initie toutes les connexions (y compris la connexion de données). Cela évite les problèmes de pare-feu/NAT qui bloqueraient une connexion entrante depuis le serveur en mode actif." }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                <p className="text-amber-300 font-semibold mb-2">{i + 1}. {item.q}</p>
                <p className="text-slate-300 text-sm pl-4 border-l-2 border-emerald-500/50">→ {item.a}</p>
              </div>
            ))}
          </div>
        )
      },
      {
        type: 'interactive_quiz',
        title: "Quiz : HTTP, FTP et ARP",
        questions: [
          { q: "Quelle différence principale distingue HTTP et HTTPS ?", options: ["Aucune", "HTTPS ajoute une couche de chiffrement (TLS/SSL), garantissant confidentialité et authenticité", "HTTPS est plus rapide"], a: 1, explanation: "HTTPS chiffre les échanges et utilise des certificats pour vérifier l'identité du serveur." },
          { q: "Pourquoi FTP utilise-t-il le port 21 et le port 20 ?", options: ["Pour la vitesse", "Port 21 = commandes, port 20 = données (transfert des fichiers)", "Pour la sécurité"], a: 1, explanation: "Le canal de commandes gère l'authentification et les ordres ; le canal de données transmet les fichiers." },
          { q: "Quelle est la portée d'une requête ARP ?", options: ["WAN (Internet)", "LAN uniquement", "Les deux"], a: 1, explanation: "ARP utilise le broadcast Ethernet qui ne traverse pas les routeurs." },
          { q: "Quel est le rôle de la table ARP ?", options: ["Stocker des pages web", "Stocker temporairement les correspondances IP/MAC pour éviter de répéter les requêtes", "Gérer les connexions FTP"], a: 1, explanation: "Une fois l'association IP→MAC connue, elle est mise en cache." },
          { q: "Pourquoi le mode passif FTP est-il utile pour les pare-feux ?", options: ["Il est plus rapide", "Le client initie toutes les connexions, ce qui évite les blocages des connexions entrantes", "Il chiffre les données"], a: 1, explanation: "En mode actif, le serveur tente une connexion entrante que le pare-feu peut bloquer." },
          { q: "Quel port utilise HTTPS ?", options: ["80", "443", "21"], a: 1, explanation: "HTTP = 80, HTTPS = 443, FTP commande = 21." }
        ]
      },
      {
        type: 'flashcards',
        title: "Flashcards : HTTP, FTP et ARP",
        mode: "definition_to_term",
        cards: [
          { q: "Protocole qui permet à un navigateur de demander une page web à un serveur", a: "HTTP" },
          { q: "Version sécurisée de HTTP avec chiffrement TLS/SSL, port 443", a: "HTTPS" },
          { q: "Port utilisé par HTTP", a: "80" },
          { q: "Protocole de transfert de fichiers, port 21 (commande) et 20 (données)", a: "FTP" },
          { q: "Mode FTP où le client initie toutes les connexions (meilleur pour pare-feux)", a: "Mode passif" },
          { q: "Protocole qui associe une adresse IP à une adresse MAC", a: "ARP" },
          { q: "Table qui stocke les correspondances IP/MAC pour éviter de répéter les requêtes", a: "Table ARP" }
        ]
      }
    ],
    lab: {
      title: "HTTP, FTP et ARP",
      context: "Cette séance est principalement théorique. Les protocoles HTTP, FTP et ARP sont utilisés par les applications et équipements de façon transparente.",
      consignes: null,
      solutionContent: null
    },
    quiz: [
      { q: "Quel port utilise HTTPS ?", options: ["80", "443", "21"], a: 1, explanation: "HTTPS utilise le port TCP 443." },
      { q: "FTP utilise combien de connexions TCP ?", options: ["Une", "Deux (commande + données)", "Trois"], a: 1, explanation: "Port 21 pour les commandes, port 20 pour les données." },
      { q: "ARP résout une adresse IP en...", options: ["Adresse MAC", "Nom de domaine", "Port"], a: 0, explanation: "ARP associe une adresse IP à une adresse MAC sur le LAN." }
    ]
  },
  {
    id: 6,
    title: "Session 3 : Syslog & SNMP",
    duration: "1h",
    icon: <Activity className="w-5 h-5" />,
    slides: [
      {
        type: 'intro',
        title: "Cours Théorique – Séance 3 : Syslog & SNMP",
        content: `Bienvenue ! Ce cours s'adresse aux débutants. Nous allons progresser pas à pas.

Objectif : Comprendre les protocoles Syslog et SNMP pour la surveillance et la gestion des équipements réseau.

🎯 À la fin, vous serez capable de :
📋 Comprendre Syslog (centralisation des logs, port UDP 514)
📊 Comprendre SNMP (Manager-Agent, MIB, polling, trap)
🔒 Distinguer SNMPv1/v2c et SNMPv3`
      },
      {
        type: 'rich_text',
        title: "1. Syslog – Le problème : des logs partout",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Un routeur, un switch, un pare-feu... Chacun génère des <strong>logs</strong> (messages de journalisation) : interface down, erreur, connexion SSH, changement de config. Si chaque équipement garde ses logs localement, comment les consulter en cas de panne ?</p>
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-200 font-bold mb-2">Sans centralisation :</p>
              <p className="text-slate-300 text-sm">Il faudrait se connecter à chaque équipement pour lire les logs. Impossible de corréler des événements sur plusieurs appareils.</p>
            </div>
            <p className="text-slate-300">La solution : <strong>Syslog</strong>, qui centralise tous les logs vers un serveur unique.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Syslog – C'est quoi, en une phrase ?",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-xl text-center py-4">Le <strong className="text-blue-400">Syslog</strong> est un protocole qui centralise les messages de journalisation (logs) de tous les équipements réseau vers un serveur dédié.</p>
            <div className="bg-blue-900/20 border border-blue-500/40 rounded-xl p-6">
              <p className="text-blue-200 font-bold mb-2">System Logging Protocol</p>
              <p className="text-slate-300 text-sm">Port UDP 514. Standardisé (RFC 5424). Routeurs, switches, firewalls, serveurs… envoient leurs logs vers le serveur Syslog.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Syslog – Fonctionnement",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Flux simple : les équipements <strong>poussent</strong> leurs logs vers le serveur :</p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside">
              <li>Un routeur détecte une interface down → il envoie un message Syslog au serveur</li>
              <li>Un pare-feu bloque une tentative de connexion → log envoyé</li>
              <li>Un switch enregistre une erreur → log envoyé</li>
            </ol>
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-200 font-bold">Niveaux de logs</p>
              <p className="text-slate-300 text-sm">Informations, avertissements, erreurs, alertes critiques. Le serveur archive et permet la recherche.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Syslog – Importance",
        content: (
          <div className="space-y-6">
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>Monitoring</strong> — surveiller l'état du réseau et détecter les anomalies</li>
              <li>• <strong>Diagnostic</strong> — identifier la source d'une panne en consultant les logs centralisés</li>
              <li>• <strong>Traçabilité</strong> — qui a fait quoi, quand (audit, conformité)</li>
              <li>• <strong>Veille sécurité (SIEM)</strong> — corrélation des événements pour détecter des intrusions</li>
            </ul>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "2. SNMP – Le problème : superviser à distance",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed text-lg">Comment connaître la charge CPU d'un switch, le trafic sur une interface, la température d'un équipement... sans se connecter manuellement à chacun ?</p>
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-200 font-bold mb-2">SNMP – Simple Network Management Protocol</p>
              <p className="text-slate-300 text-sm">Protocole de gestion réseau permettant de <strong>collecter des informations</strong> et d'<strong>agir à distance</strong> sur les équipements.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "SNMP – Architecture Manager-Agent",
        content: (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-900/20 border border-amber-500/40 rounded-xl p-5">
                <p className="text-amber-300 font-bold mb-2">Manager (NMS)</p>
                <p className="text-slate-300 text-sm">Network Management Station — outil de supervision (Cacti, PRTG, SolarWinds…). Interroge les agents et affiche les graphiques.</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-xl p-5">
                <p className="text-emerald-300 font-bold mb-2">Agent SNMP</p>
                <p className="text-slate-300 text-sm">Installé sur chaque équipement à superviser (routeur, switch…). Répond aux requêtes du manager et peut envoyer des alertes.</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Ports : 161 (agent, requêtes) et 162 (trap, alertes). Protocole UDP.</p>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "SNMP – La MIB",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed"><strong>MIB</strong> (Management Information Base) : base d'objets normalisés qui décrivent ce qu'un équipement peut exposer (CPU, mémoire, trafic par interface, etc.).</p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-300 text-sm">Le manager et l'agent partagent la même MIB : ils « parlent la même langue ». Ex. : « Donne-moi la valeur de l'objet 1.3.6.1.2.1.1.5.0 » (nom du système).</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "SNMP – Polling vs Trap",
        content: (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-amber-900/20 border border-amber-500/40 rounded-lg p-4">
                <p className="text-amber-300 font-bold">Polling (get, set)</p>
                <p className="text-slate-300 text-sm">Le manager interroge <strong>périodiquement</strong> les agents pour récupérer des informations (CPU, trafic…). Communication bidirectionnelle.</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-lg p-4">
                <p className="text-emerald-300 font-bold">Trap</p>
                <p className="text-slate-300 text-sm">L'agent envoie une <strong>alerte spontanée</strong> au manager lors d'un événement critique (interface down, température élevée…). Communication unidirectionnelle (agent → manager).</p>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "SNMP – Versions et sécurité",
        content: (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4">
                <p className="text-red-300 font-bold">SNMPv1 & v2c</p>
                <p className="text-slate-300 text-sm">Basés sur des <strong>communautés</strong> (mot de passe en clair). Sécurité faible. À éviter en environnement sensible.</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-lg p-4">
                <p className="text-emerald-300 font-bold">SNMPv3</p>
                <p className="text-slate-300 text-sm">Authentification et chiffrement. Préféré en environnement sécurisé.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Syslog vs SNMP – Comparaison",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Log Syslog : message de journalisation régulier (interface, événements, erreurs). Centralisé sur le serveur.</p>
            <p className="text-slate-200 leading-relaxed">Trap SNMP : alerte <strong>immédiate</strong> lors d'un événement critique. L'agent prévient le manager spontanément.</p>
            <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-4">
              <p className="text-slate-300 text-sm">Syslog = centralisation des logs. SNMP = supervision + alertes en temps réel.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Texte à trous – À compléter",
        content: (
          <div className="space-y-6">
            <p className="text-slate-200 leading-relaxed">Complétez avec : UDP 514, NMS, trap, polling, MIB, SNMPv3, logs, authentification.</p>
            <div className="space-y-4 text-slate-300 text-sm">
              <p>1. Syslog utilise le port _____ pour transmettre les _____ vers un serveur centralisé.</p>
              <p>2. SNMP repose sur un modèle Manager-Agent. Le _____ interroge les agents via des requêtes appelées _____.</p>
              <p>3. Lors d'un événement critique, l'agent envoie une alerte spontanée appelée _____.</p>
              <p>4. Tous les objets SNMP sont définis dans une base appelée _____.</p>
              <p>5. _____ introduit _____ et chiffrement pour renforcer la sécurité.</p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Texte à trous – Réponses",
        content: (
          <div className="space-y-6">
            <p className="text-slate-400 text-sm mb-4">Vérifiez vos réponses :</p>
            <div className="space-y-4">
              {[
                { n: 1, text: "Syslog utilise le port ", blank: "UDP 514", after: " pour transmettre les ", blank2: "logs", after2: " vers un serveur centralisé." },
                { n: 2, text: "Le ", blank: "NMS", after: " interroge les agents via des requêtes appelées ", blank2: "polling", after2: "." },
                { n: 3, text: "Lors d'un événement critique, l'agent envoie une alerte spontanée appelée ", blank: "trap", after: "." },
                { n: 4, text: "Tous les objets SNMP sont définis dans une base appelée ", blank: "MIB", after: "." },
                { n: 5, text: "", blank: "SNMPv3", after: " introduit ", blank2: "authentification", after2: " et chiffrement." }
              ].map(({ n, text, blank, after, blank2, after2 }) => (
                <div key={n} className="p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                  <p className="text-slate-300">
                    <span>{n}. {text}</span>
                    <span className="bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-semibold">{blank}</span>
                    <span>{after}</span>
                    {blank2 && <><span className="bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-semibold">{blank2}</span><span>{after2}</span></>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Tableau à compléter – Syslog & SNMP",
        content: (
          <div className="space-y-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4 text-amber-300 font-bold">Protocole</th>
                  <th className="text-left py-3 px-4 text-blue-300 font-bold">Port(s)</th>
                  <th className="text-left py-3 px-4 text-emerald-300 font-bold">Fonction principale</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-bold">Type de communication</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  { proto: "Syslog", port: "UDP 514", func: "Centralisation des logs", comm: "Unidirectionnelle (push vers serveur)" },
                  { proto: "SNMP", port: "161 (agent), 162 (trap)", func: "Supervision et gestion des équipements", comm: "Polling bidirectionnelle + trap unidirectionnel" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-700 hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-semibold">{row.proto}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">{row.port}</td>
                    <td className="py-3 px-4">{row.func}</td>
                    <td className="py-3 px-4 text-sm">{row.comm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Questions rapides – Réponses",
        content: (
          <div className="space-y-6">
            {[
              { q: "Quelle est la différence entre un log Syslog et un trap SNMP ?", a: "Syslog : centralisation des logs (messages de journalisation réguliers). Trap SNMP : alerte immédiate lors d'un événement critique détecté par l'agent." },
              { q: "Pourquoi SNMPv3 est-il préféré aux versions v1 et v2c en environnement sécurisé ?", a: "SNMPv3 intègre authentification et chiffrement. Les versions v1/v2c utilisent des communautés en clair." },
              { q: "Comment un serveur Syslog peut-il aider à diagnostiquer des pannes réseau ?", a: "Il centralise les logs des équipements (interfaces, déconnexions, erreurs), facilitant l'identification de la source de la panne." },
              { q: "Quelle est la différence entre polling SNMP et trap SNMP ?", a: "Polling : le NMS interroge périodiquement les agents pour récupérer des infos. Trap : l'agent envoie spontanément une alerte au NMS lors d'un événement significatif." }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                <p className="text-amber-300 font-semibold mb-2">{i + 1}. {item.q}</p>
                <p className="text-slate-300 text-sm pl-4 border-l-2 border-emerald-500/50">→ {item.a}</p>
              </div>
            ))}
          </div>
        )
      },
      {
        type: 'interactive_quiz',
        title: "Quiz : Syslog & SNMP",
        questions: [
          { q: "Quel port utilise Syslog ?", options: ["TCP 80", "UDP 514", "UDP 161"], a: 1, explanation: "Syslog utilise le port UDP 514 pour la transmission des logs." },
          { q: "Quelle est la différence entre un log Syslog et un trap SNMP ?", options: ["Aucune", "Syslog = logs réguliers centralisés ; Trap = alerte immédiate sur événement critique", "Le trap est plus lent"], a: 1, explanation: "Syslog archive les messages ; le trap SNMP alerte en temps réel." },
          { q: "Pourquoi SNMPv3 est-il préféré à v1/v2c ?", options: ["Il est plus rapide", "Il intègre authentification et chiffrement", "Il utilise moins de bande passante"], a: 1, explanation: "SNMPv3 renforce la sécurité avec authentification et chiffrement." },
          { q: "Qu'est-ce que la MIB en SNMP ?", options: ["Un type de trap", "La base d'objets normalisés décrivant les données exposées par les équipements", "Un protocole"], a: 1, explanation: "Management Information Base — vocabulaire commun entre manager et agents." },
          { q: "Polling SNMP vs Trap SNMP : quelle différence ?", options: ["Identique", "Polling = manager interroge ; Trap = agent alerte spontanément", "Le trap est bidirectionnel"], a: 1, explanation: "Polling : requêtes périodiques. Trap : alerte envoyée par l'agent quand un événement survient." },
          { q: "Quels ports utilise SNMP ?", options: ["80 et 443", "21 et 20", "161 (agent) et 162 (trap)"], a: 2, explanation: "Port 161 pour les requêtes, 162 pour les traps." }
        ]
      },
      {
        type: 'flashcards',
        title: "Flashcards : Syslog & SNMP",
        mode: "definition_to_term",
        cards: [
          { q: "Protocole de centralisation des logs, port UDP 514", a: "Syslog" },
          { q: "Port utilisé par Syslog", a: "UDP 514" },
          { q: "Outil de supervision SNMP (Network Management Station)", a: "NMS" },
          { q: "Requêtes périodiques du manager vers les agents SNMP", a: "Polling" },
          { q: "Alerte spontanée envoyée par l'agent SNMP au manager", a: "Trap" },
          { q: "Base d'objets normalisés en SNMP", a: "MIB" },
          { q: "Version SNMP avec authentification et chiffrement", a: "SNMPv3" }
        ]
      }
    ],
    lab: {
      title: "Syslog & SNMP",
      context: "Cette séance est principalement théorique. Syslog et SNMP sont configurés sur les équipements pour la supervision en production.",
      consignes: null,
      solutionContent: null
    },
    quiz: [
      { q: "Quel port utilise Syslog ?", options: ["TCP 514", "UDP 514", "UDP 161"], a: 1, explanation: "Syslog utilise UDP 514." },
      { q: "Quel port reçoit les traps SNMP ?", options: ["161", "162", "514"], a: 1, explanation: "Port 162 pour les traps." },
      { q: "Qu'est-ce que la MIB ?", options: ["Un type de log", "La base d'objets SNMP", "Un protocole"], a: 1, explanation: "Management Information Base." }
    ]
  }
];

// --- THEORY PLAYER ---

const TheoryPlayer = ({ slides, lab }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];

  const next = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };
  const prev = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const renderSlide = (s) => {
    switch (s.type) {
      case 'mode_explorer':
        return <ModeExplorer />;
      case 'memory_sim':
        return <MemorySimulator />;
      case 'flashcards':
        return <FlashCards cards={s.cards} mode={s.mode} />;
      case 'lab_correction':
        if (lab && lab.solutionContent) return lab.solutionContent;
        return <LabCorrection scenario={lab || s.scenario} />;
      case 'ssh_configurator':
        return <SSHConfigurator />;
      case 'interactive_quiz':
        return <InteractiveQuiz questions={s.questions} />;
      case 'command_builder':
        return <CommandBuilder steps={s.steps} title={s.commandBuilderTitle || s.title} />;
      case 'privilege_explorer':
        return <PrivilegeExplorer />;
      case 'network_diagram':
        return <NetworkDiagram mode={s.mode || 'ssh'} />;
      case 'data_flow':
        return <DataFlowAnimation />;
      case 'dora_flow':
        return <DoraFlowAnimation />;
      case 'config_comparison':
        return <ConfigComparison before={s.before} after={s.after} title={s.title} />;
      case 'ssh_flow':
        return <SSHConnectionFlow />;
      case 'vlan_diagram':
        return <VLANDiagram />;
      case 'trunk_diagram':
        return <TrunkDiagram />;
      case 'deep_dive':
        return (
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">{s.title}</h3>
            <DeepDiveSection items={s.items} />
          </div>
        );
      case 'rich_text':
        return (
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
            {s.content}
          </div>
        );
      default:
        return (
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl min-h-[260px] flex flex-col justify-center">
            <p className="text-slate-200 whitespace-pre-line leading-relaxed">{s.content}</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
          <span className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-sm shadow-lg shadow-blue-900/50">
            {currentSlide + 1}
          </span>
          <span className="text-blue-100">{slide.title}</span>
        </h2>
        <span className="text-xs text-slate-500 font-mono bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          Slide {currentSlide + 1} / {slides.length}
        </span>
      </div>

      <div className="mb-6">
        {renderSlide(slide)}
      </div>

      <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800 sticky bottom-4">
        <button 
          onClick={prev} 
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 transition-colors hover:bg-slate-800 text-sm"
        >
          <ChevronLeft size={16} /> Précédent
        </button>

        <div className="hidden md:flex gap-1.5">
          {slides.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-blue-500 w-10' : 'bg-slate-700 w-3'}`} />
          ))}
        </div>

        <button 
          onClick={next} 
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold disabled:opacity-30 transition-colors shadow-lg shadow-blue-900/30"
        >
          {currentSlide === slides.length - 1 ? 'Terminer' : 'Suivant'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// --- DONNÉES : LISTES DE COMMANDES PAR SESSION ---

const session1Commands = [
  { command: "enable", description: "Passer en mode privilégié (de '>' vers '#')", syntax: "enable" },
  { command: "configure terminal", description: "Entrer en mode configuration globale", syntax: "configure terminal" },
  { command: "hostname", description: "Changer le nom de l'équipement", syntax: "hostname [nom]" },
  { command: "line console 0", description: "Configurer l'accès console physique", syntax: "line console 0" },
  { command: "password", description: "Définir un mot de passe", syntax: "password [mot_de_passe]" },
  { command: "login", description: "Activer la demande de mot de passe à la connexion", syntax: "login" },
  { command: "enable secret", description: "Définir le mot de passe privilégié (chiffré MD5)", syntax: "enable secret [mot_de_passe]" },
  { command: "no ip domain lookup", description: "Désactiver la résolution DNS pour éviter les délais", syntax: "no ip domain lookup" },
  { command: "service password-encryption", description: "Masquer les mots de passe en clair dans la config", syntax: "service password-encryption" },
  { command: "copy running-config startup-config", description: "Sauvegarder la configuration en NVRAM", syntax: "copy running-config startup-config" },
  { command: "show running-config", description: "Afficher la configuration active (en RAM)", syntax: "show running-config" },
  { command: "show startup-config", description: "Afficher la configuration sauvegardée (en NVRAM)", syntax: "show startup-config" },
  { command: "ip domain-name", description: "Définir le nom de domaine (requis pour SSH)", syntax: "ip domain-name [domaine]" },
  { command: "username", description: "Créer un utilisateur local avec privilèges", syntax: "username [nom] privilege [niveau] secret [mdp]" },
  { command: "crypto key generate rsa", description: "Générer les clés RSA pour activer SSH", syntax: "crypto key generate rsa" },
  { command: "line vty 0 4", description: "Configurer les lignes VTY (accès distant)", syntax: "line vty 0 4" },
  { command: "transport input ssh", description: "Autoriser uniquement SSH (bloquer Telnet)", syntax: "transport input ssh" },
  { command: "login local", description: "Utiliser la base de données locale pour l'authentification", syntax: "login local" },
  { command: "ip ssh version 2", description: "Forcer SSH version 2 (plus sécurisé)", syntax: "ip ssh version 2" }
];

const session2Commands = [
  { command: "vlan", description: "Créer un VLAN", syntax: "vlan [id]" },
  { command: "name", description: "Nommer le VLAN (en mode config-vlan)", syntax: "name [nom_vlan]" },
  { command: "interface vlan", description: "Configurer l'interface de management d'un VLAN", syntax: "interface vlan [id]" },
  { command: "ip address", description: "Attribuer une adresse IP et un masque", syntax: "ip address [ip] [masque]" },
  { command: "no shutdown", description: "Activer l'interface", syntax: "no shutdown" },
  { command: "interface", description: "Sélectionner une interface", syntax: "interface [type] [numéro]" },
  { command: "switchport mode access", description: "Configurer le port en mode accès (pour un PC)", syntax: "switchport mode access" },
  { command: "switchport access vlan", description: "Attribuer le port à un VLAN spécifique", syntax: "switchport access vlan [id]" },
  { command: "show vlan brief", description: "Afficher la liste des VLANs et leurs ports", syntax: "show vlan brief" },
  { command: "show interfaces status", description: "Afficher le statut de toutes les interfaces", syntax: "show interfaces status" }
];

const session3Commands = [
  { command: "switchport mode trunk", description: "Activer le mode trunk sur le port (transporte plusieurs VLANs)", syntax: "switchport mode trunk" },
  { command: "switchport trunk allowed vlan", description: "Restreindre les VLANs autorisés sur le trunk", syntax: "switchport trunk allowed vlan [liste]" },
  { command: "switchport trunk native vlan", description: "Définir le VLAN natif du trunk", syntax: "switchport trunk native vlan [id]" },
  { command: "interface", description: "Créer une sous-interface (Router-on-a-Stick)", syntax: "interface [type][numéro].[sous-id]" },
  { command: "encapsulation dot1Q", description: "Définir l'encapsulation 802.1Q pour un VLAN", syntax: "encapsulation dot1Q [vlan_id]" },
  { command: "show interfaces trunk", description: "Afficher les ports trunk et les VLANs autorisés", syntax: "show interfaces trunk" },
  { command: "show ip route", description: "Afficher la table de routage", syntax: "show ip route" }
];

const session4Commands = [
  { command: "ip dhcp excluded-address", description: "Exclure une ou plusieurs adresses du pool DHCP (serveurs, passerelle)", syntax: "ip dhcp excluded-address [ip_debut] [ip_fin]" },
  { command: "ip dhcp pool", description: "Créer un pool DHCP et entrer en mode dhcp-config", syntax: "ip dhcp pool [nom]" },
  { command: "network", description: "Définir la plage d'adresses du pool DHCP", syntax: "network [réseau] [masque]" },
  { command: "default-router", description: "Passerelle par défaut transmise aux clients DHCP", syntax: "default-router [ip]" },
  { command: "dns-server", description: "Serveur DNS transmis aux clients DHCP", syntax: "dns-server [ip]" },
  { command: "ip domain-lookup", description: "Activer la résolution DNS sur l'équipement Cisco", syntax: "ip domain-lookup" },
  { command: "ip name-server", description: "Indiquer le serveur DNS à interroger pour la résolution de noms", syntax: "ip name-server [ip]" },
  { command: "show ip dhcp binding", description: "Afficher les baux DHCP attribués (IP, MAC, bail)", syntax: "show ip dhcp binding" }
];

// --- LISTE PÉDAGOGIQUE DES COMMANDES ---

const CommandsLearningList = ({ commands }) => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
      <div className="bg-slate-800 p-4 border-b border-slate-700">
        <h3 className="text-white font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" /> 
          Commandes à apprendre
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Liste des commandes utilisées dans la partie théorie
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {commands.map((cmd, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800/70 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="bg-blue-500/20 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="font-mono text-emerald-400 font-bold text-base mb-2">
                  {cmd.command}
                </div>
                <div className="text-slate-300 text-sm leading-relaxed">
                  {cmd.description}
                </div>
                {cmd.syntax && (
                  <div className="mt-2 pt-2 border-t border-slate-700">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Syntaxe complète :</span>
                    <div className="font-mono text-amber-400 text-sm mt-1">
                      {cmd.syntax}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 p-4 border-t border-slate-700">
        <p className="text-slate-400 text-xs text-center">
          💡 Astuce : Pratiquez ces commandes dans Cisco Packet Tracer
        </p>
      </div>
    </div>
  );
};

// --- TERMINAL SIMULATEUR ---

const TerminalSimulator = ({ scenario, sessionId, onCommand, onLabComplete }) => {
  const [history, setHistory] = useState([
    "Cisco IOS Software, C2900 Software (C2900-UNIVERSALK9-M)",
    "Press RETURN to get started!",
    ""
  ]);
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState(scenario.initialPrompt);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [labStartTime] = useState(Date.now());
  const [errors, setErrors] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Détecter quand le lab est complété
  useEffect(() => {
    if (completedTasks.length === scenario.tasks.length && onLabComplete) {
      const timeSpent = Math.floor((Date.now() - labStartTime) / 1000);
      onLabComplete(sessionId, true, scenario.tasks.length, errors, timeSpent);
    }
  }, [completedTasks.length, scenario.tasks.length]);

  const handleEnter = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim();
    const newHistory = [...history, `${prompt} ${cmd}`];
    let response = "";

    if (!cmd) {
      setHistory(newHistory);
      setInput("");
      return;
    }

    // Trouver la prochaine tâche attendue (première non complétée)
    const nextTaskIndex = scenario.tasks.findIndex((task, idx) => {
      const taskKey = Object.keys(scenario.validations).find(k => task.cmd.startsWith(k));
      if (!taskKey) return false;
      
      // Vérifier que toutes les tâches précédentes sont complétées
      const previousTasksDone = scenario.tasks.slice(0, idx).every((prevTask) => {
        const prevKey = Object.keys(scenario.validations).find(k => prevTask.cmd.startsWith(k));
        return prevKey && completedTasks.includes(prevKey);
      });
      
      return previousTasksDone && !completedTasks.includes(taskKey);
    });

    if (nextTaskIndex === -1) {
      // Toutes les tâches sont complétées ou aucune tâche valide trouvée
      const anyMatch = scenario.tasks.some(task => {
        const validationKey = Object.keys(scenario.validations).find(k => task.cmd.startsWith(k));
        return validationKey && cmd.startsWith(validationKey);
      });
      
      if (anyMatch) {
        response = "% Toutes les tâches sont déjà complétées. Lab terminé !";
      } else {
        response = "% Invalid input detected at '^' marker.";
      }
    } else {
      const expectedTask = scenario.tasks[nextTaskIndex];
      const expectedKey = Object.keys(scenario.validations).find(k => expectedTask.cmd.startsWith(k));
      
      // Vérifier si la commande tapée correspond à la tâche attendue
      if (expectedKey && cmd.startsWith(expectedKey)) {
        // Commande correcte et dans le bon ordre
        const val = scenario.validations[expectedKey];
        response = val.msg;
        if (val.nextPrompt) setPrompt(val.nextPrompt);
        setCompletedTasks(prev => [...prev, expectedKey]);
        // Tracker la commande réussie
        if (onCommand) onCommand(cmd, true, sessionId);
      } else {
        // Commande incorrecte ou pas dans le bon ordre
        response = `% Erreur : Vous devez d'abord exécuter : ${expectedTask.cmd}`;
        setErrors(prev => prev + 1);
        // Tracker la commande échouée
        if (onCommand) onCommand(cmd, false, sessionId);
      }
    }

    if (response) newHistory.push(response);
    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-black rounded-xl overflow-hidden border border-slate-700 shadow-2xl font-mono text-sm">
      <div className="bg-slate-800 p-3 px-4 flex justify-between items-center border-b border-slate-700">
        <span className="text-slate-300 font-bold flex items-center gap-2">
          <Terminal className="w-4 h-4" /> Terminal Cisco - {scenario.title}
        </span>
        <div className="flex gap-2 text-xs bg-black/30 px-2 py-1 rounded border border-slate-600">
          <span className="text-slate-400">Progression :</span>
          <span className="text-emerald-400 font-bold">
            {completedTasks.length} / {scenario.tasks.length}
          </span>
        </div>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-1 text-slate-300">
        {history.map((line, i) => (
          <div key={i} className={line.includes("Invalid") ? "text-red-400" : ""}>{line}</div>
        ))}
        <div className="flex items-center mt-1">
          <span className="text-slate-400 mr-2">{prompt}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            className="bg-transparent border-none outline-none flex-1 text-white placeholder-slate-600 focus:ring-0"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="bg-slate-900/80 p-3 border-t border-slate-700 max-h-[180px] overflow-y-auto">
        <p className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">
          Liste des commandes à passer :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {scenario.tasks.map((task, idx) => {
            const done = completedTasks.some(k => task.cmd.startsWith(k));
            return (
              <div
                key={idx}
                className={`text-[11px] flex items-center gap-2 p-2 rounded border ${
                  done
                    ? 'bg-emerald-900/20 text-emerald-400 border-emerald-900/60'
                    : 'bg-slate-950 text-slate-300 border-slate-700'
                }`}
              >
                <CheckCircle className={`w-3 h-3 flex-shrink-0 ${done ? 'text-emerald-500' : 'text-slate-600'}`} />
                <span className="font-mono font-bold">{task.cmd}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- CORRECTION DU LAB ---

const LabCorrection = ({ scenario }) => {
  if (!scenario) {
    return (
      <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-xl p-8 text-center">
        <p className="text-slate-400">Aucune correction disponible pour ce lab.</p>
      </div>
    );
  }

  // Construire la séquence des prompts en suivant l'ordre des tâches
  let currentPrompt = scenario.initialPrompt;
  const steps = scenario.tasks.map((task, idx) => {
    const validationKey = Object.keys(scenario.validations).find(k => task.cmd.startsWith(k));
    const validation = validationKey ? scenario.validations[validationKey] : null;
    const stepPrompt = currentPrompt;
    
    // Mettre à jour le prompt pour la prochaine étape
    if (validation?.nextPrompt) {
      currentPrompt = validation.nextPrompt;
    }
    
    return {
      task,
      prompt: stepPrompt,
      validation,
      nextPrompt: validation?.nextPrompt || stepPrompt
    };
  });

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-900/50 to-blue-900/50 p-6 border-b border-slate-700">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <CheckCircle className="text-emerald-400 w-7 h-7" /> Correction du Lab
        </h3>
        <p className="text-slate-400 mt-2 text-sm">
          Voici la solution complète étape par étape avec les explications détaillées.
        </p>
      </div>

      <div className="p-6 space-y-5">
        {steps.map((step, idx) => {
          const { task, prompt, validation, nextPrompt } = step;
          
          return (
            <div key={idx} className="bg-slate-800 rounded-xl border border-slate-700 p-5 space-y-4 hover:border-blue-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold flex-shrink-0 shadow-lg shadow-blue-900/30">
                  {idx + 1}
                </div>
                <div className="flex-1 space-y-3">
                  {/* Commande avec prompt */}
                  <div className="bg-black/40 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-slate-400 font-mono text-sm font-semibold">{prompt}</span>
                      <span className="text-slate-600">→</span>
                      <code className="text-emerald-400 font-mono font-bold text-base bg-emerald-900/20 px-3 py-1 rounded border border-emerald-500/30">
                        {task.cmd}
                      </code>
                    </div>
                    <div className="text-xs text-slate-500 italic mt-2 pl-1">
                      💡 {task.desc}
                    </div>
                  </div>
                  
                  {/* Explication après la commande */}
                  {validation && (
                    <div className="bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500 space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-blue-100 text-sm leading-relaxed font-medium">
                            {validation.msg}
                          </p>
                          {validation.nextPrompt && validation.nextPrompt !== prompt && (
                            <div className="mt-3 pt-3 border-t border-blue-500/30">
                              <p className="text-blue-300 text-xs font-mono">
                                <span className="text-blue-400 font-semibold">Prompt suivant :</span> <span className="text-emerald-400">{validation.nextPrompt}</span>
                              </p>
                              <p className="text-blue-300/70 text-xs mt-1">
                                Le prompt a changé, vous êtes maintenant dans un autre mode.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border-t border-emerald-500/30 p-5">
        <div className="flex items-center gap-3 text-emerald-400 font-bold">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="text-base">Lab complété avec succès !</p>
            <p className="text-emerald-300/80 text-sm font-normal mt-1">
              Toutes les {scenario.tasks.length} commandes ont été exécutées dans le bon ordre. Votre routeur est maintenant configuré et sauvegardé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- EXERCICES PRATIQUES ANIMÉS ---

const PracticeExercises = ({ sessionId }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  
  if (!sessionId) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <p className="text-red-400 text-lg">Erreur : session ID manquant.</p>
      </div>
    );
  }
  
  const exercises = sessionId === 1 ? [
    {
      type: 'terminal_sim',
      title: 'Simulation de Terminal Cisco',
      description: 'Tapez les commandes dans le bon ordre pour configurer un routeur',
      objective: 'Configurer le hostname, le mot de passe enable et sauvegarder',
      commands: [
        { cmd: 'enable', prompt: 'Router>', nextPrompt: 'Router#', desc: 'Passer en mode privilégié' },
        { cmd: 'configure terminal', prompt: 'Router#', nextPrompt: 'Router(config)#', desc: 'Entrer en mode configuration' },
        { cmd: 'hostname R-Nova', prompt: 'Router(config)#', nextPrompt: 'R-Nova(config)#', desc: 'Renommer le routeur' },
        { cmd: 'enable secret cisco123', prompt: 'R-Nova(config)#', nextPrompt: 'R-Nova(config)#', desc: 'Définir le mot de passe enable' },
        { cmd: 'copy running-config startup-config', prompt: 'R-Nova(config)#', nextPrompt: 'R-Nova#', desc: 'Sauvegarder la configuration' }
      ]
    },
    {
      type: 'command_order',
      title: 'Mise en Ordre des Commandes',
      description: 'Réorganisez les commandes dans le bon ordre pour sécuriser l\'accès console',
      objective: 'Sécuriser l\'accès console avec un mot de passe',
      commands: [
        { cmd: 'line console 0', desc: 'Entrer en mode configuration console' },
        { cmd: 'password cisco', desc: 'Définir le mot de passe console' },
        { cmd: 'login', desc: 'Activer la demande de mot de passe' },
        { cmd: 'exit', desc: 'Quitter le mode configuration ligne' }
      ],
      correctOrder: [0, 1, 2, 3]
    },
    {
      type: 'fill_config',
      title: 'Complétion de Configuration',
      description: 'Complétez la configuration SSH en remplissant les champs manquants',
      objective: 'Configurer SSH sur un routeur',
      config: {
        domainName: { value: '', placeholder: 'Ex: novatech.local', correct: 'novatech.local' },
        username: { value: '', placeholder: 'Nom d\'utilisateur admin', correct: 'admin' },
        privilege: { value: '', placeholder: 'Niveau de privilège (0-15)', correct: '15' },
        rsaBits: { value: '', placeholder: 'Taille des clés RSA (ex: 1024)', correct: '1024' }
      }
    },
    {
      type: 'troubleshooting',
      title: 'Dépannage Interactif',
      description: 'Diagnostiquez et réparez une configuration cassée',
      objective: 'Trouver et corriger l\'erreur dans la configuration',
      scenario: 'Le routeur ne peut pas être configuré via SSH. Les utilisateurs locaux existent mais la connexion échoue.',
      steps: [
        { action: 'Vérifier la configuration SSH', cmd: 'show ip ssh', expected: 'SSH Enabled' },
        { action: 'Vérifier les lignes VTY', cmd: 'show running-config | section line vty', expected: 'login local' },
        { action: 'Corriger la configuration', cmd: 'line vty 0 4\nlogin local', expected: 'Configuration corrigée' }
      ]
    }
  ] : [];

  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <Terminal className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400 text-lg">Les exercices pratiques pour cette session seront disponibles prochainement.</p>
      </div>
    );
  }

  const exercise = exercises[currentExercise];

  if (!exercise) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <p className="text-red-400 text-lg">Erreur : exercice non trouvé.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-300 font-semibold mb-1">Exercice {currentExercise + 1} / {exercises.length}</p>
            <p className="text-blue-200/80 text-sm">{exercise.description}</p>
          </div>
        </div>
      </div>

      {exercise.type === 'terminal_sim' && <TerminalSimulatorPractice exercise={exercise} />}
      {exercise.type === 'command_order' && <CommandOrderExercise exercise={exercise} />}
      {exercise.type === 'fill_config' && <FillConfigExercise exercise={exercise} />}
      {exercise.type === 'troubleshooting' && <TroubleshootingExercise exercise={exercise} />}

      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
          disabled={currentExercise === 0}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </button>
        <span className="text-slate-400 text-sm">
          {currentExercise + 1} / {exercises.length}
        </span>
        <button
          onClick={() => setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1))}
          disabled={currentExercise === exercises.length - 1}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          Suivant
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Simulateur de terminal Cisco animé pour exercices pratiques
const TerminalSimulatorPractice = ({ exercise }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (!exercise || !exercise.commands) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <p className="text-red-400">Erreur : données d'exercice manquantes.</p>
      </div>
    );
  }

  // Fonction pour extraire uniquement la commande, en ignorant les prompts
  const extractCommand = (input) => {
    let cmd = input.trim();
    
    // Supprimer les prompts courants (Router>, Router#, Router(config)#, R-Nova(config)#, etc.)
    // Patterns: texte (peut contenir des tirets) suivi de > ou #, avec ou sans mode entre parenthèses
    // Exemples: "Router> ", "Router# ", "Router(config)# ", "R-Nova(config)# ", "Switch>enable"
    cmd = cmd.replace(/^[A-Za-z0-9-]+(\([A-Za-z0-9-]+\))?[>#]\s*/i, '');
    
    // Si la commande commence encore par un prompt (cas où l'utilisateur a tapé plusieurs fois le prompt)
    cmd = cmd.replace(/^[A-Za-z0-9-]+(\([A-Za-z0-9-]+\))?[>#]\s*/i, '');
    
    // Supprimer les espaces en début/fin et les caractères spéciaux de fin de ligne
    cmd = cmd.trim().replace(/\|$/, ''); // Supprimer le curseur | à la fin si présent
    
    return cmd;
  };

  // Fonction pour vérifier si la commande utilisateur correspond à la commande attendue
  // (en ignorant les arguments après la commande de base)
  const commandsMatch = (userCmd, expectedCmd) => {
    const userParts = userCmd.trim().split(/\s+/).filter(p => p.length > 0);
    const expectedParts = expectedCmd.trim().split(/\s+/).filter(p => p.length > 0);
    
    if (userParts.length === 0) return false;
    
    // Déterminer combien de mots de la commande attendue sont nécessaires pour la validation
    // Commandes qui nécessitent 2 mots : "configure terminal", "enable secret"
    // Commandes qui nécessitent seulement 1 mot : "enable", "hostname", "copy"
    
    let wordsToCheck = 1; // Par défaut, vérifier seulement le premier mot
    
    // Si la commande attendue commence par "configure terminal", vérifier 2 mots
    if (expectedParts[0] === 'configure' && expectedParts[1] === 'terminal') {
      wordsToCheck = 2;
    }
    // Si la commande attendue commence par "enable secret", vérifier 2 mots
    else if (expectedParts[0] === 'enable' && expectedParts[1] === 'secret') {
      wordsToCheck = 2;
    }
    // Pour toutes les autres commandes (enable seul, hostname, copy, etc.), vérifier seulement 1 mot
    
    // Vérifier que l'utilisateur a tapé au moins le nombre de mots requis
    if (userParts.length < wordsToCheck) {
      return false;
    }
    
    // Comparer les mots requis
    for (let i = 0; i < wordsToCheck; i++) {
      if (userParts[i] !== expectedParts[i]) {
        return false;
      }
    }
    
    return true;
  };

  const handleCommand = (cmd) => {
    if (currentStep >= exercise.commands.length) {
      setFeedback('✅ Toutes les commandes ont été exécutées avec succès !');
      return;
    }

    const expectedCmd = exercise.commands[currentStep].cmd;
    // Extraire uniquement la commande de l'input utilisateur
    const userCommand = extractCommand(cmd);
    
    // Comparer uniquement la commande de base (sans les arguments)
    if (commandsMatch(userCommand, expectedCmd)) {
      setIsAnimating(true);
      // Stocker uniquement la commande dans l'historique (sans le prompt)
      setCommandHistory([...commandHistory, { cmd: userCommand, prompt: exercise.commands[currentStep].prompt, correct: true }]);
      
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setUserInput('');
        setIsAnimating(false);
        if (currentStep + 1 >= exercise.commands.length) {
          setFeedback('🎉 Excellent ! Configuration complète.');
        }
      }, 800);
    } else {
      setFeedback('❌ Commande incorrecte. Essayez : ' + expectedCmd);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const currentPrompt = currentStep < exercise.commands.length 
    ? exercise.commands[currentStep].prompt 
    : exercise.commands[exercise.commands.length - 1].nextPrompt;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-4">
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 min-h-[300px] font-mono text-sm">
        <div className="space-y-2 mb-4">
          {commandHistory.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-green-400">{item.prompt}</span>
              <span className="text-white">{item.cmd}</span>
              {item.correct && <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">{currentPrompt}</span>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCommand(userInput)}
            className="flex-1 bg-transparent text-white outline-none"
            placeholder={currentStep < exercise.commands.length ? exercise.commands[currentStep].desc : 'Configuration terminée'}
            disabled={currentStep >= exercise.commands.length}
            autoFocus
          />
        </div>
        {isAnimating && (
          <div className="mt-2 text-blue-400 animate-pulse">
            Exécution...
          </div>
        )}
        {feedback && (
          <div className={`mt-4 p-3 rounded-lg ${feedback.includes('✅') || feedback.includes('🎉') ? 'bg-emerald-900/30 border border-emerald-500/50 text-emerald-300' : 'bg-red-900/30 border border-red-500/50 text-red-300'}`}>
            {feedback}
          </div>
        )}
      </div>
      <div className="bg-slate-900/50 rounded-lg p-4">
        <p className="text-slate-300 text-sm font-semibold mb-2">Objectif :</p>
        <p className="text-slate-400 text-sm">{exercise.objective}</p>
        {currentStep < exercise.commands.length && (
          <p className="text-blue-400 text-xs mt-2">
            💡 Indice : {exercise.commands[currentStep].desc}
          </p>
        )}
      </div>
    </div>
  );
};

// Exercice de mise en ordre de commandes
const CommandOrderExercise = ({ exercise }) => {
  const [selectedCommands, setSelectedCommands] = useState([]);
  const [availableCommands, setAvailableCommands] = useState(exercise?.commands ? [...exercise.commands] : []);
  const [feedback, setFeedback] = useState('');

  if (!exercise || !exercise.commands) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <p className="text-red-400">Erreur : données d'exercice manquantes.</p>
      </div>
    );
  }

  const handleCommandClick = (cmd, index, source) => {
    if (source === 'available') {
      setSelectedCommands([...selectedCommands, { cmd, index }]);
      setAvailableCommands(availableCommands.filter((_, i) => i !== index));
    } else {
      setAvailableCommands([...availableCommands, cmd]);
      setSelectedCommands(selectedCommands.filter((_, i) => i !== index));
    }
    setFeedback('');
  };

  const validateOrder = () => {
    const userOrder = selectedCommands.map(c => c.index);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(exercise.correctOrder);
    
    if (isCorrect) {
      setFeedback('✅ Parfait ! L\'ordre des commandes est correct.');
    } else {
      setFeedback('❌ L\'ordre n\'est pas correct. Réessayez !');
    }
  };

  const reset = () => {
    setSelectedCommands([]);
    setAvailableCommands([...exercise.commands]);
    setFeedback('');
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
      <div className="bg-slate-900/50 rounded-lg p-4">
        <p className="text-slate-300 text-sm font-semibold mb-2">Objectif :</p>
        <p className="text-slate-400 text-sm">{exercise.objective}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-slate-300 font-semibold mb-3">Commandes disponibles</h4>
          <div className="space-y-2 min-h-[200px]">
            {availableCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleCommandClick(cmd, exercise.commands.indexOf(cmd), 'available')}
                className="w-full p-3 bg-slate-700 hover:bg-slate-600 text-left rounded-lg border border-slate-600 hover:border-blue-500 transition-all text-sm text-slate-200"
              >
                <code className="text-emerald-400">{cmd.cmd}</code>
                <p className="text-slate-400 text-xs mt-1">{cmd.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-slate-300 font-semibold mb-3">Votre ordre</h4>
          <div className="space-y-2 min-h-[200px]">
            {selectedCommands.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 text-xs font-bold w-6">{idx + 1}.</span>
                    <code className="text-emerald-400 text-sm">{item.cmd.cmd}</code>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 ml-8">{item.cmd.desc}</p>
                </div>
                <button
                  onClick={() => handleCommandClick(item.cmd, item.index, 'selected')}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-lg ${feedback.includes('✅') ? 'bg-emerald-900/30 border border-emerald-500/50 text-emerald-300' : 'bg-red-900/30 border border-red-500/50 text-red-300'}`}>
          {feedback}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={validateOrder}
          disabled={selectedCommands.length !== exercise.commands.length}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Valider l'ordre
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

// Exercice de complétion de configuration
const FillConfigExercise = ({ exercise }) => {
  const [config, setConfig] = useState({});
  const [feedback, setFeedback] = useState({});
  const [completed, setCompleted] = useState(false);

  if (!exercise || !exercise.config) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <p className="text-red-400">Erreur : données d'exercice manquantes.</p>
      </div>
    );
  }

  const handleChange = (key, value) => {
    setConfig({ ...config, [key]: value });
    setFeedback({ ...feedback, [key]: '' });
  };

  const validate = () => {
    const newFeedback = {};
    let allCorrect = true;

    Object.keys(exercise.config).forEach(key => {
      if (config[key]?.toLowerCase() === exercise.config[key].correct.toLowerCase()) {
        newFeedback[key] = 'correct';
      } else {
        newFeedback[key] = 'incorrect';
        allCorrect = false;
      }
    });

    setFeedback(newFeedback);
    if (allCorrect) {
      setCompleted(true);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
      <div className="bg-slate-900/50 rounded-lg p-4">
        <p className="text-slate-300 text-sm font-semibold mb-2">Objectif :</p>
        <p className="text-slate-400 text-sm">{exercise.objective}</p>
      </div>

      <div className="space-y-4">
        {Object.keys(exercise.config).map((key) => (
          <div key={key}>
            <label className="block text-slate-300 font-medium mb-2 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="text"
              value={config[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={exercise.config[key].placeholder}
              className={`w-full p-3 bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none ${
                feedback[key] === 'correct' ? 'border-emerald-500' : feedback[key] === 'incorrect' ? 'border-red-500' : 'border-slate-700'
              }`}
            />
            {feedback[key] === 'correct' && (
              <p className="text-emerald-400 text-xs mt-1">✅ Correct</p>
            )}
            {feedback[key] === 'incorrect' && (
              <p className="text-red-400 text-xs mt-1">❌ Incorrect. Réessayez.</p>
            )}
          </div>
        ))}
      </div>

      {completed ? (
        <div className="bg-emerald-900/30 border border-emerald-500/50 rounded-lg p-4 text-emerald-300">
          ✅ Configuration complète et correcte !
        </div>
      ) : (
        <button
          onClick={validate}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all"
        >
          Valider la configuration
        </button>
      )}
    </div>
  );
};

// Exercice de dépannage interactif
const TroubleshootingExercise = ({ exercise }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [diagnosis, setDiagnosis] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  if (!exercise || !exercise.steps) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <p className="text-red-400">Erreur : données d'exercice manquantes.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
        <h4 className="text-red-300 font-semibold mb-2">Scénario de Dépannage</h4>
        <p className="text-slate-300 text-sm">{exercise.scenario}</p>
      </div>

      <div className="space-y-4">
        {exercise.steps.map((step, idx) => (
          <div key={idx} className={`p-4 rounded-lg border ${
            idx <= currentStep ? 'bg-slate-900/50 border-blue-500/50' : 'bg-slate-900/20 border-slate-700'
          }`}>
            <div className="flex items-start gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                idx < currentStep ? 'bg-emerald-600 text-white' : idx === currentStep ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                {idx < currentStep ? '✓' : idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-white font-semibold mb-2">{step.action}</p>
                <code className="text-emerald-400 text-sm bg-slate-950 px-2 py-1 rounded block">{step.cmd}</code>
                {idx === currentStep && (
                  <button
                    onClick={() => setCurrentStep(idx + 1)}
                    className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-all"
                  >
                    Exécuter cette commande
                  </button>
                )}
                {idx < currentStep && (
                  <p className="text-emerald-400 text-xs mt-2">✓ {step.expected}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentStep >= exercise.steps.length && (
        <div className="bg-emerald-900/30 border border-emerald-500/50 rounded-lg p-4">
          <p className="text-emerald-300 font-semibold mb-2">✅ Problème résolu !</p>
          <p className="text-slate-300 text-sm">Vous avez diagnostiqué et corrigé le problème avec succès.</p>
        </div>
      )}
    </div>
  );
};

// --- QUIZ ---

const QuizForm = ({ questions, onSubmit, sessionId, onQuizComplete }) => {
  const [answers, setAnswers] = useState({});
  const [quizStartTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});

  const handleValidate = () => {
    let score = 0;
    const detailedResults = {};
    
    questions.forEach((q, i) => {
      const isCorrect = answers[i] === q.a;
      if (isCorrect) score++;
      detailedResults[i] = {
        correct: isCorrect,
        explanation: q.explanation || (isCorrect ? "Bonne réponse !" : `La bonne réponse était : ${q.options[q.a]}`)
      };
    });
    
    setResults(detailedResults);
    setShowResults(true);
    
    const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
    
    // Tracker le quiz
    if (onQuizComplete) {
      onQuizComplete(sessionId, score, questions.length, timeSpent);
    }
    
    onSubmit(score);
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setResults({});
    onSubmit(null);
  };

  return (
    <div className="space-y-6">
      {!showResults && (
        <>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-300 font-semibold mb-1">Conseil pour réussir</p>
                <p className="text-blue-200/80 text-sm">
                  Lisez attentivement chaque question. Les explications détaillées vous aideront à comprendre les concepts clés après validation.
                </p>
              </div>
            </div>
          </div>

          {questions.map((q, idx) => (
            <div key={idx} className="space-y-4">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 shadow-md">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-lg md:text-xl text-white mb-2 leading-relaxed">
                      {q.q}
                    </p>
                    {q.hint && (
                      <div className="bg-amber-900/20 border-l-4 border-amber-500/50 pl-3 py-2 mt-3 rounded-r">
                        <p className="text-amber-300 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          <span className="font-medium">Indice :</span> {q.hint}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2.5 pl-14">
                  {q.options.map((opt, optIdx) => (
                    <label 
                      key={optIdx}
                      className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all ${
                        answers[idx] === optIdx 
                          ? 'bg-blue-600/20 border-blue-500 text-blue-100 shadow-md' 
                          : 'border-slate-700 hover:bg-slate-700/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        className="hidden"
                        checked={answers[idx] === optIdx}
                        onChange={() => setAnswers({ ...answers, [idx]: optIdx })}
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex items-center justify-center transition-colors flex-shrink-0 ${
                        answers[idx] === optIdx ? 'border-blue-500 bg-blue-500/20' : 'border-slate-500'
                      }`}>
                        {answers[idx] === optIdx && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                      </div>
                      <span className="flex-1 text-sm leading-relaxed">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
            <div className="text-slate-400 text-sm">
              <span className="font-semibold text-slate-300">{Object.keys(answers).length}</span> / {questions.length} questions répondues
            </div>
            <button
              onClick={handleValidate}
              disabled={Object.keys(answers).length < questions.length}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Valider mes réponses
            </button>
          </div>
        </>
      )}

      {showResults && (
        <div className="space-y-6">
          <div className={`rounded-xl p-6 border-2 ${
            Object.values(results).filter(r => r.correct).length === questions.length
              ? 'bg-emerald-900/30 border-emerald-500/50'
              : Object.values(results).filter(r => r.correct).length >= questions.length * 0.7
              ? 'bg-yellow-900/30 border-yellow-500/50'
              : 'bg-red-900/30 border-red-500/50'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              {Object.values(results).filter(r => r.correct).length === questions.length ? (
                <CheckCircle className="w-12 h-12 text-emerald-400" />
              ) : (
                <AlertCircle className="w-12 h-12 text-yellow-400" />
              )}
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Résultat : {Object.values(results).filter(r => r.correct).length} / {questions.length}
                </h3>
                <p className="text-slate-300">
                  {Object.values(results).filter(r => r.correct).length === questions.length
                    ? "Excellent ! Vous maîtrisez parfaitement ce module."
                    : Object.values(results).filter(r => r.correct).length >= questions.length * 0.7
                    ? "Bien joué ! Quelques révisions vous permettront de perfectionner vos connaissances."
                    : "Continuez à réviser. Consultez les explications ci-dessous pour mieux comprendre."}
                </p>
              </div>
            </div>
          </div>

          {questions.map((q, idx) => {
            const result = results[idx];
            return (
              <div key={idx} className={`bg-slate-800 p-6 rounded-xl border-2 ${
                result.correct ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-red-500/50 bg-red-900/10'
              }`}>
                <div className="flex items-start gap-4 mb-3">
                  {result.correct ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-lg text-white mb-2">{q.q}</p>
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-lg border ${
                            optIdx === q.a
                              ? 'bg-emerald-900/30 border-emerald-500 text-emerald-200'
                              : answers[idx] === optIdx && !result.correct
                              ? 'bg-red-900/30 border-red-500 text-red-200'
                              : 'bg-slate-900/50 border-slate-700 text-slate-400'
                          }`}
                        >
                          {optIdx === q.a && <span className="font-semibold">✓ </span>}
                          {answers[idx] === optIdx && !result.correct && <span className="font-semibold">✗ </span>}
                          {opt}
                        </div>
                      ))}
                    </div>
                    <div className={`mt-4 p-4 rounded-lg border-l-4 ${
                      result.correct
                        ? 'bg-emerald-900/20 border-emerald-500'
                        : 'bg-blue-900/20 border-blue-500'
                    }`}>
                      <p className="text-sm font-semibold text-slate-200 mb-1">
                        {result.correct ? '✅ Explication :' : '💡 Pourquoi cette réponse ?'}
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {result.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
            >
              Recommencer le quiz
            </button>
            {Object.values(results).filter(r => r.correct).length === questions.length && (
              <button
                onClick={() => onSubmit(Object.values(results).filter(r => r.correct).length)}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-lg transition-all shadow-lg"
              >
                Continuer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- SYSTÈME DE STATISTIQUES ET SUIVI ---

// Hook pour gérer les statistiques avec localStorage
const useStats = () => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('netacademy_stats');
    return saved ? JSON.parse(saved) : {
      totalTimeSpent: 0, // en secondes
      commandsExecuted: 0,
      commandsCorrect: 0,
      quizAttempts: [],
      labAttempts: [],
      sessionTime: {}, // { sessionId: seconds }
      dailyProgress: [], // [{ date, time, commands, quiz }]
      strengths: {}, // { command: count }
      weaknesses: {} // { command: errorCount }
    };
  });

  useEffect(() => {
    localStorage.setItem('netacademy_stats', JSON.stringify(stats));
  }, [stats]);

  const addTime = (seconds, sessionId) => {
    setStats(prev => ({
      ...prev,
      totalTimeSpent: prev.totalTimeSpent + seconds,
      sessionTime: {
        ...prev.sessionTime,
        [sessionId]: (prev.sessionTime[sessionId] || 0) + seconds
      },
      dailyProgress: (() => {
        const today = new Date().toISOString().split('T')[0];
        const existing = prev.dailyProgress.find(d => d.date === today);
        if (existing) {
          return prev.dailyProgress.map(d => 
            d.date === today ? { ...d, time: d.time + seconds } : d
          );
        }
        return [...prev.dailyProgress, { date: today, time: seconds, commands: 0, quiz: [] }];
      })()
    }));
  };

  const addCommand = (command, correct, sessionId) => {
    setStats(prev => ({
      ...prev,
      commandsExecuted: prev.commandsExecuted + 1,
      commandsCorrect: prev.commandsCorrect + (correct ? 1 : 0),
      strengths: {
        ...prev.strengths,
        [command]: (prev.strengths[command] || 0) + 1
      },
      weaknesses: correct ? prev.weaknesses : {
        ...prev.weaknesses,
        [command]: (prev.weaknesses[command] || 0) + 1
      },
      dailyProgress: (() => {
        const today = new Date().toISOString().split('T')[0];
        const existing = prev.dailyProgress.find(d => d.date === today);
        if (existing) {
          return prev.dailyProgress.map(d => 
            d.date === today ? { ...d, commands: d.commands + 1 } : d
          );
        }
        return [...prev.dailyProgress, { date: today, time: 0, commands: 1, quiz: [] }];
      })()
    }));
  };

  const addQuizAttempt = (sessionId, score, totalQuestions, timeSpent) => {
    const attempt = {
      sessionId,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      date: new Date().toISOString(),
      timeSpent
    };
    setStats(prev => ({
      ...prev,
      quizAttempts: [...prev.quizAttempts, attempt],
      dailyProgress: (() => {
        const today = new Date().toISOString().split('T')[0];
        const existing = prev.dailyProgress.find(d => d.date === today);
        if (existing) {
          return prev.dailyProgress.map(d => 
            d.date === today ? { ...d, quiz: [...d.quiz, attempt] } : d
          );
        }
        return [...prev.dailyProgress, { date: today, time: 0, commands: 0, quiz: [attempt] }];
      })()
    }));
  };

  const addLabAttempt = (sessionId, completed, totalTasks, errors, timeSpent) => {
    const attempt = {
      sessionId,
      completed,
      totalTasks,
      completedTasks: completed ? totalTasks : totalTasks - errors,
      errors,
      date: new Date().toISOString(),
      timeSpent
    };
    setStats(prev => ({
      ...prev,
      labAttempts: [...prev.labAttempts, attempt]
    }));
  };

  const resetStats = () => {
    const defaultStats = {
      totalTimeSpent: 0,
      commandsExecuted: 0,
      commandsCorrect: 0,
      quizAttempts: [],
      labAttempts: [],
      sessionTime: {},
      dailyProgress: [],
      strengths: {},
      weaknesses: {}
    };
    setStats(defaultStats);
    localStorage.setItem('netacademy_stats', JSON.stringify(defaultStats));
  };

  return { stats, addTime, addCommand, addQuizAttempt, addLabAttempt, resetStats };
};

// Composant Dashboard des Statistiques
const StatsDashboard = ({ stats, sessions, onReset }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}min`;
    return `${minutes}min`;
  };

  const successRate = stats.commandsExecuted > 0 
    ? Math.round((stats.commandsCorrect / stats.commandsExecuted) * 100) 
    : 0;

  const avgQuizScore = stats.quizAttempts.length > 0
    ? Math.round(stats.quizAttempts.reduce((sum, q) => sum + q.percentage, 0) / stats.quizAttempts.length)
    : 0;

  const topStrengths = Object.entries(stats.strengths)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topWeaknesses = Object.entries(stats.weaknesses)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Données pour le graphique de progression (7 derniers jours)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const dailyData = last7Days.map(date => {
    const dayData = stats.dailyProgress.find(d => d.date === date);
    return {
      date: new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
      time: dayData?.time || 0,
      commands: dayData?.commands || 0,
      quiz: dayData?.quiz?.length || 0
    };
  });

  const maxTime = Math.max(...dailyData.map(d => d.time), 1);
  const maxCommands = Math.max(...dailyData.map(d => d.commands), 1);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-blue-900/50 to-emerald-900/50 rounded-xl p-6 border border-slate-700 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-blue-400" /> Dashboard des Statistiques
          </h2>
          <p className="text-slate-400">Suivez votre progression et vos performances</p>
        </div>
        {onReset && (
          <button
            onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toutes les statistiques ? Cette action est irréversible.')) {
                onReset();
              }
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-semibold"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-900/30 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Temps Total</h3>
          <p className="text-2xl font-bold text-white">{formatTime(stats.totalTimeSpent)}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-900/30 p-3 rounded-lg">
              <Terminal className="w-6 h-6 text-emerald-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Commandes Exécutées</h3>
          <p className="text-2xl font-bold text-white">{stats.commandsExecuted}</p>
          <p className="text-xs text-slate-500 mt-1">{successRate}% de réussite</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-900/30 p-3 rounded-lg">
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Score Moyen Quiz</h3>
          <p className="text-2xl font-bold text-white">{avgQuizScore}%</p>
          <p className="text-xs text-slate-500 mt-1">{stats.quizAttempts.length} tentatives</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-900/30 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Labs Complétés</h3>
          <p className="text-2xl font-bold text-white">
            {stats.labAttempts.filter(l => l.completed).length}
          </p>
          <p className="text-xs text-slate-500 mt-1">{stats.labAttempts.length} tentatives</p>
        </div>
      </div>

      {/* Graphiques de progression */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique Temps par jour */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" /> Progression du Temps (7 jours)
          </h3>
          <div className="space-y-3">
            {dailyData.map((day, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-16 text-xs text-slate-400 font-mono">{day.date}</div>
                <div className="flex-1 bg-slate-900 rounded-full h-6 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-500"
                    style={{ width: `${(day.time / maxTime) * 100}%` }}
                  />
                </div>
                <div className="w-16 text-xs text-slate-300 text-right">{formatTime(day.time)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Graphique Commandes par jour */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" /> Commandes par Jour (7 jours)
          </h3>
          <div className="space-y-3">
            {dailyData.map((day, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-16 text-xs text-slate-400 font-mono">{day.date}</div>
                <div className="flex-1 bg-slate-900 rounded-full h-6 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-blue-400 h-full transition-all duration-500"
                    style={{ width: `${(day.commands / maxCommands) * 100}%` }}
                  />
                </div>
                <div className="w-16 text-xs text-slate-300 text-right">{day.commands} cmd</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forces et Faiblesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forces */}
        <div className="bg-slate-800 rounded-xl p-6 border border-emerald-500/30">
          <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Vos Forces
          </h3>
          {topStrengths.length > 0 ? (
            <div className="space-y-3">
              {topStrengths.map(([cmd, count], idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                  <code className="text-emerald-300 font-mono text-sm">{cmd}</code>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{count}x</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Aucune donnée encore</p>
          )}
        </div>

        {/* Faiblesses */}
        <div className="bg-slate-800 rounded-xl p-6 border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> À Améliorer
          </h3>
          {topWeaknesses.length > 0 ? (
            <div className="space-y-3">
              {topWeaknesses.map(([cmd, count], idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                  <code className="text-red-300 font-mono text-sm">{cmd}</code>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-bold">{count} erreurs</span>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Aucune erreur ! Parfait ! 🎉</p>
          )}
        </div>
      </div>

      {/* Historique des Tentatives */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-400" /> Historique Récent
        </h3>
        <div className="space-y-4">
          {/* Historique Quiz */}
          {stats.quizAttempts.slice(-5).reverse().map((attempt, idx) => {
            const session = sessions.find(s => s.id === attempt.sessionId);
            return (
              <div key={`quiz-${idx}`} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className={`w-5 h-5 ${attempt.percentage >= 80 ? 'text-emerald-400' : attempt.percentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`} />
                    <div>
                      <p className="text-white font-semibold">Quiz - {session?.title || `Session ${attempt.sessionId}`}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(attempt.date).toLocaleString('fr-FR')} • {formatTime(attempt.timeSpent)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${attempt.percentage >= 80 ? 'text-emerald-400' : attempt.percentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {attempt.percentage}%
                    </p>
                    <p className="text-xs text-slate-400">{attempt.score}/{attempt.totalQuestions}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Historique Labs */}
          {stats.labAttempts.slice(-5).reverse().map((attempt, idx) => {
            const session = sessions.find(s => s.id === attempt.sessionId);
            return (
              <div key={`lab-${idx}`} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Terminal className={`w-5 h-5 ${attempt.completed ? 'text-emerald-400' : 'text-yellow-400'}`} />
                    <div>
                      <p className="text-white font-semibold">Lab - {session?.title || `Session ${attempt.sessionId}`}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(attempt.date).toLocaleString('fr-FR')} • {formatTime(attempt.timeSpent)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${attempt.completed ? 'text-emerald-400' : 'text-yellow-400'}`}>
                      {attempt.completed ? '✅ Complété' : '⏳ En cours'}
                    </p>
                    <p className="text-xs text-slate-400">{attempt.completedTasks}/{attempt.totalTasks} tâches</p>
                    {attempt.errors > 0 && (
                      <p className="text-xs text-red-400">{attempt.errors} erreurs</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {stats.quizAttempts.length === 0 && stats.labAttempts.length === 0 && (
            <p className="text-slate-400 text-center py-8">Aucun historique pour le moment</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- PACKET TRACER : Simulateur réseau type Cisco Packet Tracer ---

const DEVICE_TYPES = {
  router:   { label: 'Routeur',   icon: RouterIcon, color: 'from-blue-600 to-blue-800' },
  switch:   { label: 'Switch',    icon: Network,   color: 'from-emerald-600 to-emerald-800' },
  pc:       { label: 'PC',        icon: Monitor,   color: 'from-slate-600 to-slate-800' },
  server_tftp: { label: 'Serveur TFTP', icon: Server, color: 'from-amber-600 to-amber-800' },
  server_dns:  { label: 'Serveur DNS',  icon: Server, color: 'from-violet-600 to-violet-800' }
};

function generateId() { return Math.random().toString(36).slice(2, 10); }

// Presets des trois labs (devices + links) pour charger d'un coup
const LAB_PRESETS = {
  empty: { name: 'Vide', devices: [], links: [] },
  lab_s1: {
    name: 'LAB S1 – NovaTech',
    devices: [
      { id: 'r1', type: 'router',   x: 80,  y: 120, name: 'R-Nova' },
      { id: 's1', type: 'switch',  x: 280, y: 60,  name: 'SW-Entrée' },
      { id: 's2', type: 'switch',  x: 280, y: 180, name: 'SW-Bureau' },
      { id: 't1', type: 'server_tftp', x: 480, y: 60,  name: 'Srv-TFTP', ipConfig: { ip: '192.168.10.10', mask: '255.255.255.0', gateway: '192.168.10.1' }, tftpEnabled: false },
      { id: 'p1', type: 'pc',      x: 480, y: 180, name: 'Tech-PC',  ipConfig: { ip: '192.168.10.20', mask: '255.255.255.0', gateway: '192.168.10.1' } }
    ],
    links: [
      { id: 'l1', fromId: 'r1', toId: 's1' }, { id: 'l2', fromId: 'r1', toId: 's2' },
      { id: 'l3', fromId: 's1', toId: 't1' }, { id: 'l4', fromId: 's1', toId: 'p1' }
    ]
  },
  lab_s2: {
    name: 'LAB S2 – SSH',
    devices: [
      { id: 'r1', type: 'router', x: 80,  y: 120, name: 'R-Sec' },
      { id: 's1', type: 'switch', x: 280, y: 120, name: 'SW-Core' },
      { id: 'p1', type: 'pc',     x: 480, y: 120, name: 'PC-Tech', ipConfig: { ip: '192.168.1.10', mask: '255.255.255.0', gateway: '192.168.1.1' } }
    ],
    links: [
      { id: 'l1', fromId: 'r1', toId: 's1' }, { id: 'l2', fromId: 's1', toId: 'p1' }
    ]
  },
  lab_s3: {
    name: 'LAB S3 – DNS',
    devices: [
      { id: 'r1', type: 'router',     x: 60,  y: 120, name: 'R-Admin' },
      { id: 's1', type: 'switch',     x: 260, y: 120, name: 'SW-Core' },
      { id: 'd1', type: 'server_dns', x: 460, y: 60,  name: 'Srv-DNS', ipConfig: { ip: '192.168.1.254', mask: '255.255.255.0', gateway: '192.168.1.1' }, dnsEnabled: false, dnsEntries: [] },
      { id: 'p1', type: 'pc',         x: 460, y: 180, name: 'PC-Tech', ipConfig: { ip: '192.168.1.100', mask: '255.255.255.0', gateway: '192.168.1.1' } }
    ],
    links: [
      { id: 'l1', fromId: 'r1', toId: 's1' }, { id: 'l2', fromId: 's1', toId: 'd1' }, { id: 'l3', fromId: 's1', toId: 'p1' }
    ]
  }
};

function applyPreset(presetKey) {
  const preset = LAB_PRESETS[presetKey];
  if (!preset) return { devices: [], links: [] };
  const devices = preset.devices.map(d => ({ ...d, id: d.id || generateId() }));
  const links = preset.links.map(l => ({ ...l, id: l.id || generateId() }));
  return { devices, links };
}

// Panneau PC : Configuration IP (pas Cisco IOS) + Invite de commandes
const PCConfigPanel = ({ device, onClose, onUpdateDevice }) => {
  const [tab, setTab] = useState('config'); // 'config' | 'cmd'
  const [ip, setIp] = useState(device.ipConfig?.ip || '');
  const [mask, setMask] = useState(device.ipConfig?.mask || '255.255.255.0');
  const [gateway, setGateway] = useState(device.ipConfig?.gateway || '');
  const [history, setHistory] = useState(["Microsoft Windows [Version 10.0]", "C:\\>", ""]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const ipConfig = device.ipConfig || { ip: '', mask: '255.255.255.0', gateway: '' };

  useEffect(() => { setIp(ipConfig.ip); setMask(ipConfig.mask); setGateway(ipConfig.gateway); }, [device.id, ipConfig.ip, ipConfig.mask, ipConfig.gateway]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const handleApply = () => {
    onUpdateDevice({ ip: ip.trim(), mask: mask.trim() || '255.255.255.0', gateway: gateway.trim() });
  };

  const runCmd = (cmd) => {
    const c = cmd.trim().toLowerCase();
    if (!c) return null;
    if (c === 'ipconfig' || c === 'ipconfig /all' || c === 'ip config') {
      const cfg = device.ipConfig || {};
      if (!cfg.ip) return 'Aucune adresse IP configurée.\nConfigurez l\'adressage dans l\'onglet "Configuration IP".';
      return `Configuration IP de Ethernet :\n  Adresse IPv4. . . . . . : ${cfg.ip}\n  Masque de sous-réseau . : ${cfg.mask}\n  Passerelle par défaut . : ${cfg.gateway || '(non configurée)'}`;
    }
    if (c.startsWith('ping ')) {
      const target = cmd.trim().split(/\s+/)[1] || '';
      return `Envoi d’une requête 'Ping'  ${target} avec 32 octets de données :\nRéponse de ${target} : octets=32 temps=1 ms TTL=64`;
    }
    if (cmd.trim().startsWith('ssh')) {
      const parts = cmd.trim().split(/\s+/);
      let user = 'admin', host = '';
      if (parts[1] === '-l' && parts[2]) { user = parts[2]; host = parts[3] || ''; } else host = parts[1] || '';
      if (!host) return 'Usage : ssh -l <utilisateur> <adresse_ou_nom>';
      return `Connexion à ${user}@${host}...\nAuthentification par mot de passe : OK\n\nBienvenue sur le CLI de ${host}. (Pour configurer l'équipement, cliquez sur lui dans le schéma et utilisez son terminal.)`;
    }
    return 'Commande non reconnue. Essayez : ipconfig   ou   ping <adresse>   ssh -l <user> <host>';
  };

  const handleEnter = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim();
    setHistory(prev => [...prev, `C:\\> ${cmd}`]);
    const out = runCmd(cmd);
    if (out) setHistory(prev => [...prev, out]);
    setHistory(prev => [...prev, ""]);
    setInput("");
  };

  return (
    <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur flex flex-col border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <span className="text-white font-bold flex items-center gap-2"><Monitor className="w-4 h-4 text-blue-400" /> {device.name} – PC (pas Cisco IOS)</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-slate-700 text-slate-400"><X size={18} /></button>
      </div>
      <div className="flex border-b border-slate-700">
        <button onClick={() => setTab('config')} className={`px-4 py-2 text-sm font-semibold ${tab === 'config' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Configuration IP</button>
        <button onClick={() => setTab('cmd')} className={`px-4 py-2 text-sm font-semibold ${tab === 'cmd' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Invite de commandes</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'config' && (
          <div className="space-y-4 max-w-md">
            <p className="text-slate-400 text-sm">Le PC n’utilise pas Cisco IOS. Configurez l’adressage IP manuellement (comme sous Windows).</p>
            <div>
              <label className="block text-slate-400 text-xs font-bold mb-1">Adresse IPv4</label>
              <input type="text" value={ip} onChange={e => setIp(e.target.value)} placeholder="ex. 192.168.1.10"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm" />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-bold mb-1">Masque de sous-réseau</label>
              <input type="text" value={mask} onChange={e => setMask(e.target.value)} placeholder="255.255.255.0"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm" />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-bold mb-1">Passerelle par défaut</label>
              <input type="text" value={gateway} onChange={e => setGateway(e.target.value)} placeholder="ex. 192.168.1.1"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm" />
            </div>
            <button onClick={handleApply} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-sm">Appliquer</button>
          </div>
        )}
        {tab === 'cmd' && (
          <div className="font-mono text-sm text-slate-300 h-full flex flex-col">
            <p className="text-slate-500 text-xs mb-2">Commandes : ipconfig | ping &lt;adresse&gt; | ssh -l &lt;user&gt; &lt;host&gt;</p>
            {history.map((line, i) => (
              <div key={i}>{line || ' '}</div>
            ))}
            <div className="flex items-center mt-1">
              <span className="text-slate-400 mr-2">C:\&gt;</span>
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleEnter}
                className="bg-transparent border-none outline-none flex-1 text-white" autoComplete="off" autoFocus />
            </div>
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
};

// Panneau Serveur TFTP : IP + activation du service TFTP
const ServerTFTPPanel = ({ device, onClose, onUpdateDevice }) => {
  const [ip, setIp] = useState(device.ipConfig?.ip || '');
  const [mask, setMask] = useState(device.ipConfig?.mask || '255.255.255.0');
  const [gateway, setGateway] = useState(device.ipConfig?.gateway || '');
  const [tftpEnabled, setTftpEnabled] = useState(device.tftpEnabled ?? false);
  useEffect(() => {
    setIp(device.ipConfig?.ip || ''); setMask(device.ipConfig?.mask || '255.255.255.0'); setGateway(device.ipConfig?.gateway || '');
    setTftpEnabled(device.tftpEnabled ?? false);
  }, [device.id]);
  const handleApply = () => {
    onUpdateDevice({ ipConfig: { ip: ip.trim(), mask: mask.trim() || '255.255.255.0', gateway: gateway.trim() }, tftpEnabled });
  };
  return (
    <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur flex flex-col border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <span className="text-white font-bold flex items-center gap-2"><Server className="w-4 h-4 text-amber-400" /> {device.name} – Serveur TFTP</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-slate-700 text-slate-400"><X size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-md">
        <p className="text-slate-400 text-sm">Configurez l'adresse IP du serveur TFTP. Activez le service pour que les routeurs/switches puissent sauvegarder leurs configs.</p>
        <div><label className="block text-slate-400 text-xs font-bold mb-1">Adresse IPv4</label><input type="text" value={ip} onChange={e => setIp(e.target.value)} placeholder="ex. 192.168.10.10" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm" /></div>
        <div><label className="block text-slate-400 text-xs font-bold mb-1">Masque</label><input type="text" value={mask} onChange={e => setMask(e.target.value)} placeholder="255.255.255.0" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm" /></div>
        <div><label className="block text-slate-400 text-xs font-bold mb-1">Passerelle</label><input type="text" value={gateway} onChange={e => setGateway(e.target.value)} placeholder="ex. 192.168.10.1" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm" /></div>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={tftpEnabled} onChange={e => setTftpEnabled(e.target.checked)} className="rounded" /><span className="text-slate-300 text-sm">Service TFTP activé</span></label>
        <button onClick={handleApply} className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-sm">Appliquer</button>
      </div>
    </div>
  );
};

// Panneau Serveur DNS : IP + activation DNS + entrées (nom → IP)
const ServerDNSPanel = ({ device, onClose, onUpdateDevice }) => {
  const [ip, setIp] = useState(device.ipConfig?.ip || '');
  const [mask, setMask] = useState(device.ipConfig?.mask || '255.255.255.0');
  const [gateway, setGateway] = useState(device.ipConfig?.gateway || '');
  const [dnsEnabled, setDnsEnabled] = useState(device.dnsEnabled ?? false);
  const [dnsEntries, setDnsEntries] = useState(device.dnsEntries || []);
  const [newName, setNewName] = useState(''); const [newIp, setNewIp] = useState('');
  useEffect(() => { setIp(device.ipConfig?.ip || ''); setMask(device.ipConfig?.mask || '255.255.255.0'); setGateway(device.ipConfig?.gateway || ''); setDnsEnabled(device.dnsEnabled ?? false); setDnsEntries(device.dnsEntries || []); }, [device.id]);
  const handleApply = () => { onUpdateDevice({ ipConfig: { ip: ip.trim(), mask: mask.trim() || '255.255.255.0', gateway: gateway.trim() }, dnsEnabled, dnsEntries }); };
  const addEntry = () => { if (newName.trim() && newIp.trim()) { setDnsEntries(prev => [...prev, { name: newName.trim(), ip: newIp.trim() }]); setNewName(''); setNewIp(''); } };
  const removeEntry = (i) => { setDnsEntries(prev => prev.filter((_, idx) => idx !== i)); };
  return (
    <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur flex flex-col border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <span className="text-white font-bold flex items-center gap-2"><Server className="w-4 h-4 text-violet-400" /> {device.name} – Serveur DNS</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-slate-700 text-slate-400"><X size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-md">
        <p className="text-slate-400 text-sm">Configurez l'IP et les entrées DNS (ex. SW-Core → 192.168.1.2) pour la résolution de noms.</p>
        <div><label className="block text-slate-400 text-xs font-bold mb-1">Adresse IPv4</label><input type="text" value={ip} onChange={e => setIp(e.target.value)} placeholder="ex. 192.168.1.254" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm" /></div>
        <div><label className="block text-slate-400 text-xs font-bold mb-1">Masque</label><input type="text" value={mask} onChange={e => setMask(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm" /></div>
        <div><label className="block text-slate-400 text-xs font-bold mb-1">Passerelle</label><input type="text" value={gateway} onChange={e => setGateway(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm" /></div>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={dnsEnabled} onChange={e => setDnsEnabled(e.target.checked)} className="rounded" /><span className="text-slate-300 text-sm">Service DNS activé</span></label>
        <div className="border-t border-slate-700 pt-3">
          <p className="text-slate-400 text-xs font-bold mb-2">Entrées DNS (nom → IP)</p>
          {dnsEntries.map((e, i) => (<div key={i} className="flex justify-between items-center bg-slate-800 rounded px-2 py-1 mb-1"><span className="font-mono text-sm text-slate-300">{e.name} → {e.ip}</span><button type="button" onClick={() => removeEntry(i)} className="text-red-400 hover:text-red-300 text-xs">Suppr.</button></div>))}
          <div className="flex gap-2 mt-2"><input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nom (ex. SW-Core)" className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm" /><input type="text" value={newIp} onChange={e => setNewIp(e.target.value)} placeholder="IP (ex. 192.168.1.2)" className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm" /><button type="button" onClick={addEntry} className="px-2 py-1 bg-violet-600 rounded text-white text-xs font-bold">Ajouter</button></div>
        </div>
        <button onClick={handleApply} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-lg text-sm">Appliquer</button>
      </div>
    </div>
  );
};

// Terminal CLI sandbox pour routeur/switch (Cisco IOS)
const PacketTracerCLI = ({ device, onClose, devices }) => {
  const [history, setHistory] = useState([
    "Cisco IOS Software, Version 15.2(4)M6",
    "Press RETURN to get started!",
    ""
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState('user'); // user, priv, config
  const [config, setConfig] = useState({ hostname: device.name, interfaces: [] });
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const getPrompt = () => {
    if (mode === 'config') return `${config.hostname}(config)#`;
    if (mode === 'priv') return `${config.hostname}#`;
    return `${config.hostname}>`;
  };

  const executeCommand = (cmd) => {
    const raw = cmd.trim();
    const c = raw.toLowerCase();
    if (!c) return null;
    if (c === 'enable') { setMode('priv'); return ''; }
    if (c === 'disable') { setMode('user'); return ''; }
    if (c === 'configure terminal' || c === 'conf t') { setMode('config'); return ''; }
    if (c === 'exit' || c === 'end') { setMode(mode === 'config' ? 'priv' : 'user'); return ''; }
    if (c.startsWith('hostname ')) { const name = raw.split(/\s+/)[1] || ''; setConfig(prev => ({ ...prev, hostname: name || prev.hostname })); return ''; }
    if (c === 'no ip domain lookup') return '';
    if (c.startsWith('line console ') || c.startsWith('line vty ')) return '';
    if (c === 'password ' || c.startsWith('password ')) return '';
    if (c === 'login') return '';
    if (c.startsWith('enable secret ') || c.startsWith('enable secret')) return '';
    if (c.startsWith('ip domain-name ')) return '';
    if (c.startsWith('crypto key generate rsa')) return '';
    if (c.startsWith('username ')) return '';
    if (c === 'login local') return '';
    if (c === 'transport input ssh') return '';
    if (c.startsWith('ip default-gateway ')) return '';
    if (c === 'interface vlan 1' || c === 'int vlan 1') return '';
    if (c.startsWith('ip address ')) { const parts = raw.split(/\s+/); if (parts[2]) setConfig(prev => ({ ...prev, vlan1Ip: parts[2], vlan1Mask: parts[3] || '255.255.255.0' })); return ''; }
    if (c === 'copy running-config startup-config' || c === 'wr' || c === 'write memory' || c === 'write') return '[OK] Configuration saved to NVRAM.';
    if (c.startsWith('copy running-config tftp') || c.startsWith('copy run tftp')) {
      const tftp = devices?.find(d => d.type === 'server_tftp' && d.tftpEnabled && d.ipConfig?.ip);
      return tftp ? `Address or name of remote host []? ${tftp.ipConfig.ip}\nDestination filename [${config.hostname}-config]? \nWriting ${config.hostname}-config !!!\n[OK]` : '% No TFTP server reachable or TFTP service not enabled on server.';
    }
    if (c === 'show running-config' || c === 'sh run') {
      let out = `Building configuration...\n\nhostname ${config.hostname}\n!\n`;
      if (config.vlan1Ip) out += `interface Vlan1\n ip address ${config.vlan1Ip} ${config.vlan1Mask || '255.255.255.0'}\n!\n`;
      out += `interface GigabitEthernet0/0\n no ip address\n shutdown\n!\nend`;
      return out;
    }
    if (c === 'show ip interface brief' || c === 'sh ip int b') {
      const gi = config.vlan1Ip ? `Vlan1\t\t${config.vlan1Ip}\tYES\tmanual\tup` : '';
      return `Interface\t\tIP-Address\tOK?\tMethod\tStatus\n${gi || 'GigabitEthernet0/0\tunassigned\tYES\tunset\tadministratively down'}`;
    }
    if (c.startsWith('ping ')) { const target = raw.split(/\s+/)[1] || ''; return `Sending 5, 100-byte ICMP Echos to ${target}, timeout is 2 seconds:\n!!!!!\nSuccess rate is 100 percent (5/5)`; }
    if (c === 'show startup-config' || c === 'sh start') return `Using ${config.hostname} configuration...\nhostname ${config.hostname}\n!`;
    if (c.startsWith('interface ') || c.startsWith('int ')) return '';
    if (c.startsWith('ip address ') && !c.includes('vlan')) return '';
    if (c === 'no shutdown') return '';
    if (c.startsWith('ip name-server ')) return '';
    if (c.startsWith('ip host ')) return '';
    if (c === '?') return 'enable\nexit\nping\nshow\nconfigure terminal\nhostname\ninterface\nip address\ncopy running-config tftp\nip default-gateway';
    return '% Invalid input detected at \'^\' marker.';
  };

  const handleEnter = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim();
    const currentPrompt = getPrompt();
    setHistory(prev => [...prev, `${currentPrompt} ${cmd}`]);
    const out = executeCommand(cmd);
    if (out) setHistory(prev => [...prev, out]);
    setHistory(prev => [...prev, '']);
    setInput("");
  };

  return (
    <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur flex flex-col border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <span className="text-white font-bold flex items-center gap-2"><Terminal className="w-4 h-4 text-emerald-400" /> {device.name} – CLI</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-slate-700 text-slate-400"><X size={18} /></button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto font-mono text-sm text-slate-300">
        {history.map((line, i) => (
          <div key={i} className={line.includes('Invalid') ? 'text-red-400' : ''}>{line || ' '}</div>
        ))}
        <div className="flex items-center mt-1">
          <span className="text-slate-400 mr-2">{getPrompt()}</span>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleEnter}
            className="bg-transparent border-none outline-none flex-1 text-white" autoComplete="off" autoFocus />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const PacketTracerSection = () => {
  const [devices, setDevices] = useState([]);
  const [links, setLinks] = useState([]);
  const [mode, setMode] = useState('select'); // select | add_router | add_switch | add_pc | add_tftp | add_dns | connect
  const [connectFrom, setConnectFrom] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [cliDevice, setCliDevice] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [presetKey, setPresetKey] = useState('empty');
  const canvasRef = useRef(null);

  const loadPreset = (key) => {
    const k = key || 'empty';
    setPresetKey(k);
    const { devices: d, links: l } = applyPreset(k);
    setDevices(d);
    setLinks(l);
    setSelectedDevice(null);
    setCliDevice(null);
    setMode('select');
  };

  const handleCanvasClick = (e) => {
    if (e.target !== canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (mode === 'add_router') {
      setDevices(prev => [...prev, { id: generateId(), type: 'router', x, y, name: `R${prev.filter(d => d.type === 'router').length + 1}` }]);
      setMode('select');
    } else if (mode === 'add_switch') {
      setDevices(prev => [...prev, { id: generateId(), type: 'switch', x, y, name: `SW${prev.filter(d => d.type === 'switch').length + 1}` }]);
      setMode('select');
    } else if (mode === 'add_pc') {
      setDevices(prev => [...prev, {
        id: generateId(),
        type: 'pc',
        x, y,
        name: `PC${prev.filter(d => d.type === 'pc').length + 1}`,
        ipConfig: { ip: '', mask: '255.255.255.0', gateway: '' }
      }]);
      setMode('select');
    } else if (mode === 'add_tftp') {
      setDevices(prev => [...prev, {
        id: generateId(),
        type: 'server_tftp',
        x, y,
        name: 'Srv-TFTP',
        ipConfig: { ip: '', mask: '255.255.255.0', gateway: '' },
        tftpEnabled: false
      }]);
      setMode('select');
    } else if (mode === 'add_dns') {
      setDevices(prev => [...prev, {
        id: generateId(),
        type: 'server_dns',
        x, y,
        name: 'Srv-DNS',
        ipConfig: { ip: '', mask: '255.255.255.0', gateway: '' },
        dnsEnabled: false,
        dnsEntries: []
      }]);
      setMode('select');
    }
  };

  const handleDeviceClick = (device, e) => {
    e.stopPropagation();
    if (mode === 'connect') {
      if (!connectFrom) setConnectFrom(device);
      else if (connectFrom.id !== device.id) {
        setLinks(prev => [...prev, { id: generateId(), fromId: connectFrom.id, toId: device.id }]);
        setConnectFrom(null);
        setMode('select');
      }
      return;
    }
    setSelectedDevice(device);
    setCliDevice(device);
  };

  const updateDevice = (id, updates) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const handleDragStart = (device, e) => {
    e.stopPropagation();
    setDragging(device.id);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left - device.x, y: e.clientY - rect.top - device.y });
  };

  const handleDragMove = (e) => {
    if (!dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    setDevices(prev => prev.map(d => d.id === dragging ? { ...d, x, y } : d));
  };

  const handleDragEnd = () => { setDragging(null); };

  const deleteDevice = (id) => {
    setDevices(prev => prev.filter(d => d.id !== id));
    setLinks(prev => prev.filter(l => l.fromId !== id && l.toId !== id));
    setSelectedDevice(null);
    setCliDevice(null);
    setConnectFrom(prev => prev?.id === id ? null : prev);
  };

  const getDevicePos = (id) => devices.find(d => d.id === id);
  const getCenter = (d) => ({ x: d.x + 50, y: d.y + 40 });

  return (
    <div className="h-full flex flex-col bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800 p-3 flex flex-wrap items-center gap-2">
        <span className="text-slate-400 font-bold text-sm mr-2">Charger un lab :</span>
        <select value={presetKey} onChange={e => loadPreset(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200 font-semibold">
          <option value="empty">Vide</option>
          <option value="lab_s1">LAB S1 – NovaTech</option>
          <option value="lab_s2">LAB S2 – SSH</option>
          <option value="lab_s3">LAB S3 – DNS</option>
        </select>
        <span className="text-slate-600 mx-1">|</span>
        <span className="text-slate-400 font-bold text-sm mr-2">Outils :</span>
        <button onClick={() => setMode('select')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mode === 'select' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Sélectionner</button>
        <button onClick={() => setMode('add_router')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'add_router' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><RouterIcon size={14} /> Routeur</button>
        <button onClick={() => setMode('add_switch')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'add_switch' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Network size={14} /> Switch</button>
        <button onClick={() => setMode('add_pc')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'add_pc' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Monitor size={14} /> PC</button>
        <button onClick={() => setMode('add_tftp')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'add_tftp' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Server size={14} /> TFTP</button>
        <button onClick={() => setMode('add_dns')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'add_dns' ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Server size={14} /> DNS</button>
        <button onClick={() => setMode('connect')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'connect' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Link size={14} /> Câbler</button>
        {selectedDevice && (
          <button onClick={() => deleteDevice(selectedDevice.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600/80 text-white flex items-center gap-1"><Trash2 size={14} /> Supprimer</button>
        )}
        {(mode === 'add_router' || mode === 'add_switch' || mode === 'add_pc' || mode === 'add_tftp' || mode === 'add_dns') && (
          <span className="text-slate-500 text-xs">Cliquez sur la zone de travail pour placer l'appareil.</span>
        )}
        {mode === 'connect' && <span className="text-slate-500 text-xs">Cliquez sur un premier appareil puis sur un second pour les relier.</span>}
      </div>

      <div className="flex-1 relative overflow-hidden p-4">
        <div
          ref={canvasRef}
          className="w-full h-full min-h-[400px] bg-slate-900/80 rounded-xl border-2 border-dashed border-slate-700 cursor-crosshair relative"
          onClick={handleCanvasClick}
          onMouseMove={handleDragMove}
          onMouseLeave={handleDragEnd}
          onMouseUp={handleDragEnd}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {links.map(l => {
              const from = getDevicePos(l.fromId);
              const to = getDevicePos(l.toId);
              if (!from || !to) return null;
              const c1 = getCenter(from);
              const c2 = getCenter(to);
              return <line key={l.id} x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} stroke="#475569" strokeWidth="2" />;
            })}
          </svg>
          {devices.map(d => {
            const meta = DEVICE_TYPES[d.type];
            const Icon = meta.icon;
            return (
              <div
                key={d.id}
                className={`absolute w-[100px] h-[80px] rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer select-none bg-gradient-to-br ${meta.color} ${selectedDevice?.id === d.id ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''} ${connectFrom?.id === d.id ? 'ring-2 ring-emerald-400' : ''}`}
                style={{ left: d.x, top: d.y }}
                onClick={e => handleDeviceClick(d, e)}
                onMouseDown={e => handleDragStart(d, e)}
              >
                <Icon className="w-8 h-8 text-white/90" />
                <span className="text-white text-xs font-bold mt-1">{d.name}</span>
              </div>
            );
          })}
        </div>

        {cliDevice && cliDevice.type === 'pc' && (
          <div className="absolute bottom-4 right-4 w-full max-w-lg h-80 z-30">
            <PCConfigPanel
              device={devices.find(d => d.id === cliDevice.id) || cliDevice}
              onClose={() => setCliDevice(null)}
              onUpdateDevice={(ipConfig) => updateDevice(cliDevice.id, { ipConfig })}
            />
          </div>
        )}
        {cliDevice && cliDevice.type === 'server_tftp' && (
          <div className="absolute bottom-4 right-4 w-full max-w-md max-h-[420px] z-30">
            <ServerTFTPPanel
              device={devices.find(d => d.id === cliDevice.id) || cliDevice}
              onClose={() => setCliDevice(null)}
              onUpdateDevice={(updates) => updateDevice(cliDevice.id, updates)}
            />
          </div>
        )}
        {cliDevice && cliDevice.type === 'server_dns' && (
          <div className="absolute bottom-4 right-4 w-full max-w-md max-h-[420px] z-30">
            <ServerDNSPanel
              device={devices.find(d => d.id === cliDevice.id) || cliDevice}
              onClose={() => setCliDevice(null)}
              onUpdateDevice={(updates) => updateDevice(cliDevice.id, updates)}
            />
          </div>
        )}
        {cliDevice && (cliDevice.type === 'router' || cliDevice.type === 'switch') && (
          <div className="absolute bottom-4 right-4 w-full max-w-lg h-72 z-30">
            <PacketTracerCLI device={cliDevice} onClose={() => setCliDevice(null)} devices={devices} />
          </div>
        )}
      </div>
    </div>
  );
};

// --- LAB INDÉPENDANT : Session 1 ou 2 (consignes + corrections) ---
const LabsSection = ({ lab, sessionLabel = 'Session 1', sessionDescription, sessionId = 1 }) => {
  const [labTab, setLabTab] = useState('correction'); // 'consignes' | 'correction' | 'correction_lab2' | 'correction_lab3' | 'correction_lab4'
  const isSession2 = sessionId === 2;
  const isSession3 = sessionId === 3;
  const isSession4 = sessionId === 4;
  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-800 p-6 rounded-t-xl border border-slate-700 border-b-0">
        <h3 className="font-bold text-white flex items-center gap-2 text-xl">
          <Terminal className="text-emerald-500 w-5 h-5" /> Lab Pratique – {sessionLabel}
        </h3>
        <p className="text-slate-300 mt-2 max-w-2xl leading-relaxed">
          {sessionDescription ?? <>Les trois labs (S1, S2 SSH, S3 DNS) se réalisent sur <strong className="text-blue-300">Cisco Packet Tracer</strong>. Consultez les corrections ci-dessous.</>}
        </p>
        <div className="flex flex-wrap gap-2 mt-4 p-1 bg-slate-900/60 rounded-lg border border-slate-700 w-fit">
          {lab.consignes && (
            <button
              onClick={() => setLabTab('consignes')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${labTab === 'consignes' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              <BookOpen className="w-4 h-4" /> Consignes
            </button>
          )}
          <button
            onClick={() => setLabTab('correction')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${labTab === 'correction' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            <CheckCircle className="w-4 h-4" /> {isSession4 ? 'Correction Lab 1 (Base)' : isSession3 ? 'Correction Lab 1' : isSession2 ? 'Correction Lab 1 (VLAN)' : 'Correction Lab 1'}
          </button>
          {(isSession2 || isSession3 || isSession4) && (
            <button
              onClick={() => setLabTab('correction_lab2')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${labTab === 'correction_lab2' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              <CheckCircle className="w-4 h-4" /> {isSession4 ? 'Correction Lab 2 (Étendu)' : isSession3 ? 'Correction Lab 2 (Dépannage)' : isSession2 ? 'Correction Lab 2 (VLAN avancés)' : 'Correction Lab 2'}
            </button>
          )}
          {isSession3 && (
            <>
              <button
                onClick={() => setLabTab('correction_lab3')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${labTab === 'correction_lab3' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                <CheckCircle className="w-4 h-4" /> Correction Lab 3 (Dépannage)
              </button>
              <button
                onClick={() => setLabTab('correction_lab4')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${labTab === 'correction_lab4' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                <CheckCircle className="w-4 h-4" /> Correction Lab 4 (Dépannage)
              </button>
            </>
          )}
        </div>
      </div>
      {labTab === 'consignes' && lab.consignes && (
        <div className="flex-1 bg-slate-900/90 border border-slate-700 rounded-b-xl px-6 py-5 overflow-y-auto">
          <h4 className="text-white font-bold flex items-center gap-2 mb-4 text-base">
            <BookOpen className="w-5 h-5 text-amber-400" /> {isSession4 ? 'Consignes des deux labs DHCP & DNS – à réaliser sur Cisco Packet Tracer' : isSession3 ? 'Consignes du lab – à réaliser sur Cisco Packet Tracer' : isSession2 ? 'Consignes des deux labs Session 2' : 'Consignes des trois labs (S1, S2, S3) – à réaliser sur Cisco Packet Tracer'}
          </h4>
          <div className="pr-4 space-y-1 text-slate-300">
            {lab.consignes}
          </div>
        </div>
      )}
      {labTab === 'correction' && (
        <div className="flex-1 bg-slate-900/90 border border-slate-700 rounded-b-xl overflow-y-auto">
          <div className="p-6">
            {isSession4 && lab.solutionContent ? lab.solutionContent : isSession3 ? <LabCorrectionSection3 /> : isSession2 && lab.solutionContent ? lab.solutionContent : <LabCorrectionSection />}
          </div>
        </div>
      )}
      {labTab === 'correction_lab2' && (
        <div className="flex-1 bg-slate-900/90 border border-slate-700 rounded-b-xl overflow-y-auto">
          <div className="p-6">
            {isSession4 ? (lab.solutionContentLab2) : isSession3 ? <LabTroubleshootingSection3 /> : isSession2 ? (lab.solutionContentLab2 || (
              <div className="max-w-2xl mx-auto bg-slate-800/50 border border-slate-600 rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-blue-400 mb-3">Correction Lab 2 – VLAN avancés et sécurisation</h3>
                <p className="text-slate-400">Trunk, VLAN autorisés, VLAN natif. Pour les consignes et la correction détaillée, suivre le PDF « 3 - Introduction Vlan avancés et sécurisation - LAB.pdf ».</p>
              </div>
            )) : <LabCorrectionSection2 />}
          </div>
        </div>
      )}
      {labTab === 'correction_lab3' && isSession3 && (
        <div className="flex-1 bg-slate-900/90 border border-slate-700 rounded-b-xl overflow-y-auto">
          <div className="p-6">
            <LabTroubleshootingSection3Lab3 />
          </div>
        </div>
      )}
      {labTab === 'correction_lab4' && isSession3 && (
        <div className="flex-1 bg-slate-900/90 border border-slate-700 rounded-b-xl overflow-y-auto">
          <div className="p-6">
            <LabTroubleshootingSection3Lab4 />
          </div>
        </div>
      )}
    </div>
  );
};

// --- CORRECTION LAB 3 – Session 3 (Trunk et Routage Inter-VLAN) – Format compact ---
const LabCorrectionSection3 = () => (
  <div className="space-y-10 text-slate-200 text-base leading-relaxed pb-16">
    <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-xl p-5">
      <p className="text-emerald-200 font-semibold text-lg mb-2">Correction Lab – Trunk et Router-on-a-Stick</p>
      <p className="text-slate-300 text-sm">SW-Core, SW-Dist, R-Core. VLANs 10 et 20, routage inter-VLAN.</p>
    </div>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">1. VLANs sur les switches (SW-Core et SW-Dist)</h4>
      <CmdBlock lines={[
        { prompt: "Switch(config)#", cmd: "vlan 10" },
        { prompt: "Switch(config-vlan)#", cmd: "name Administration" },
        { prompt: "Switch(config-vlan)#", cmd: "exit" },
        { prompt: "Switch(config)#", cmd: "vlan 20" },
        { prompt: "Switch(config-vlan)#", cmd: "name Commercial" },
        { prompt: "Switch(config-vlan)#", cmd: "exit" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">2. Ports access (PC Admin → VLAN 10, PC Com → VLAN 20)</h4>
      <CmdBlock lines={[
        { prompt: "Switch(config)#", cmd: "interface range fa0/1-2" },
        { prompt: "Switch(config-if-range)#", cmd: "switchport mode access" },
        { prompt: "Switch(config-if-range)#", cmd: "switchport access vlan 10" },
        { prompt: "Switch(config-if-range)#", cmd: "exit" },
        { prompt: "Switch(config)#", cmd: "interface range fa0/3-4" },
        { prompt: "Switch(config-if-range)#", cmd: "switchport mode access" },
        { prompt: "Switch(config-if-range)#", cmd: "switchport access vlan 20" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">3. Trunk (SW-Core vers R-Core et vers SW-Dist)</h4>
      <CmdBlock lines={[
        { prompt: "SW-Core(config)#", cmd: "interface fa0/1" },
        { prompt: "SW-Core(config-if)#", cmd: "switchport mode trunk" },
        { prompt: "SW-Core(config-if)#", cmd: "switchport trunk allowed vlan 10,20" },
        { prompt: "SW-Core(config)#", cmd: "interface fa0/24" },
        { prompt: "SW-Core(config-if)#", cmd: "switchport mode trunk" },
        { prompt: "SW-Core(config-if)#", cmd: "switchport trunk allowed vlan 10,20" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">4. Routeur R-Core – Router-on-a-Stick</h4>
      <CmdBlock lines={[
        { prompt: "R-Core(config)#", cmd: "interface g0/0" },
        { prompt: "R-Core(config-if)#", cmd: "no shutdown" },
        { prompt: "R-Core(config-if)#", cmd: "exit" },
        { prompt: "R-Core(config)#", cmd: "interface g0/0.10" },
        { prompt: "R-Core(config-subif)#", cmd: "encapsulation dot1Q 10" },
        { prompt: "R-Core(config-subif)#", cmd: "ip address 192.168.10.1 255.255.255.0" },
        { prompt: "R-Core(config)#", cmd: "interface g0/0.20" },
        { prompt: "R-Core(config-subif)#", cmd: "encapsulation dot1Q 20" },
        { prompt: "R-Core(config-subif)#", cmd: "ip address 192.168.20.1 255.255.255.0" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">5. PC – IP et passerelle</h4>
      <p className="text-slate-300 text-sm">PC Admin : 192.168.10.x/24, gateway 192.168.10.1. PC Com : 192.168.20.x/24, gateway 192.168.20.1.</p>
    </section>
  </div>
);

const _LabCorrectionSection3Verbose = () => (
  <div className="max-w-4xl mx-auto space-y-12 text-slate-200 text-base leading-loose pb-16 hidden">
    <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis:</span>
        {[
          { id: 'lab3-config-vlan', label: 'Config VLANs', icon: '🏷️' },
          { id: 'lab3-config-trunk', label: 'Config Trunk', icon: '🔗' },
          { id: 'lab3-config-router', label: 'Config Router (Stick)', icon: '🚀' },
          { id: 'lab3-config-pc', label: 'Config PC', icon: '✅' },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-emerald-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
          >
            <span className="text-[10px]">{icon}</span> {label}
          </button>
        ))}
      </div>
    </nav>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">🎯 Introduction au LAB</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Le but de cet exercice est de permettre à deux départements (<strong>Administration</strong> et <strong>Commercial</strong>), initialement isolés par des VLANs, de communiquer entre eux tout en restant sur des réseaux logiques distincts.
      </p>
    </section>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🔌 Étape 1 : Câblage et Infrastructure</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Avant de configurer, il faut s'assurer que la structure physique est correcte dans Cisco Packet Tracer :
      </p>
      <ul className="list-none space-y-4 ml-0 text-slate-300">
        <li className="flex gap-3 items-start">
          <span className="font-bold text-emerald-400/90 shrink-0">•</span>
          <span><strong>Inter-Switch :</strong> Reliez <strong>SW-Core</strong> et <strong>SW-Dist</strong> via leurs ports <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">fa0/24</code>.</span>
        </li>
        <li className="flex gap-3 items-start">
          <span className="font-bold text-emerald-400/90 shrink-0">•</span>
          <span><strong>Switch vers Routeur :</strong> Connectez le port <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">fa0/1</code> de <strong>SW-Core</strong> à l'interface <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">g0/0</code> (ou fa0/0 selon le modèle) de <strong>R-Core</strong>.</span>
        </li>
        <li className="flex gap-3 items-start">
          <span className="font-bold text-emerald-400/90 shrink-0">•</span>
          <span><strong>Accès :</strong> Branchez les PC sur les ports restants des switchs.</span>
        </li>
      </ul>
    </section>

    <section id="lab3-config-vlan" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🏷️ Étape 2 : Création des VLANs sur les Switches</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Il faut définir les VLANs sur <strong>chaque switch</strong> (SW-Core et SW-Dist) pour qu'ils reconnaissent les étiquettes (tags) des paquets qui circuleront.
      </p>
      
      <div className="bg-amber-600/30 border-2 border-amber-500 rounded-lg px-4 py-2 mb-6 inline-block">
        <span className="text-amber-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : SW-Core</span>
      </div>
      <p className="text-slate-400 text-sm mb-4">Double-cliquez sur SW-Core dans Packet Tracer pour ouvrir la console, puis :</p>
      
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch&gt;</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">enable</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Passer en mode privilégié pour avoir accès aux commandes de configuration.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">Switch(config)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">hostname SW-Core</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Renommer le switch pour l'identifier facilement. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">SW-Core(config)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">vlan 10</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Créer le VLAN 10. Le prompt passe en mode configuration VLAN : <code className="bg-slate-800 px-1 rounded text-xs">SW-Core(config-vlan)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-vlan)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">name Administration</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Donner un nom descriptif au VLAN 10. Cela facilite l'identification lors des vérifications avec <code className="bg-slate-800 px-1 rounded text-xs">show vlan brief</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-vlan)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration VLAN pour revenir au mode configuration globale.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">vlan 20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Créer le VLAN 20 pour le département Commercial.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-vlan)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">name Commercial</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Nommer le VLAN 20 "Commercial" pour le distinguer du VLAN Administration.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-vlan)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-600/20 border-2 border-blue-500 rounded-lg px-4 py-2 mb-4 inline-block">
        <span className="text-blue-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : SW-Dist</span>
      </div>
      <p className="text-blue-200 text-sm mb-6">Répétez exactement les mêmes commandes sur <strong>SW-Dist</strong> : double-cliquez sur SW-Dist, puis <code className="bg-slate-900 px-1 rounded">enable</code>, <code className="bg-slate-900 px-1 rounded">configure terminal</code>, <code className="bg-slate-900 px-1 rounded">hostname SW-Dist</code>, <code className="bg-slate-900 px-1 rounded">vlan 10</code>, <code className="bg-slate-900 px-1 rounded">name Administration</code>, <code className="bg-slate-900 px-1 rounded">exit</code>, <code className="bg-slate-900 px-1 rounded">vlan 20</code>, <code className="bg-slate-900 px-1 rounded">name Commercial</code>, <code className="bg-slate-900 px-1 rounded">exit</code>.</p>
    </section>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🔌 Étape 3 : Configuration des ports d'accès</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Les ports reliés aux PC doivent être assignés manuellement à leur VLAN respectif. On appelle cela le mode <strong>Access</strong>. Un port en mode access ne peut transporter qu'un seul VLAN à la fois.
      </p>
      
      <div className="bg-amber-600/30 border-2 border-amber-500 rounded-lg px-4 py-2 mb-4 inline-block">
        <span className="text-amber-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : SW-Core</span>
      </div>
      <h3 className="text-slate-200 font-bold mb-4 mt-4 border-b border-slate-600 pb-2">3.1 Ports des PC Administration (VLAN 10) — sur SW-Core</h3>
      
      <div className="space-y-6 mb-8">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface range fastEthernet 0/1 - 2</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner les <strong>deux ports</strong> où sont branchés les PC Administration (Admin 1 et Admin 2). Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">SW-Core(config-if-range)#</code>. Les commandes suivantes s'appliquent aux deux ports.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if-range)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport mode access</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Définir les deux ports en mode access (pour un seul VLAN par port).</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if-range)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport access vlan 10</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Assigner les deux ports au VLAN 10. Les paquets entrants sur ces ports seront étiquetés VLAN 10.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if-range)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir de la configuration de la plage de ports pour revenir au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-600/30 border-2 border-amber-500 rounded-lg px-4 py-2 mb-4 inline-block mt-8">
        <span className="text-amber-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : SW-Dist</span>
      </div>
      <h3 className="text-slate-200 font-bold mb-4 mt-4 border-b border-slate-600 pb-2">3.2 Ports des PC Commercial (VLAN 20) — sur SW-Dist</h3>
      <p className="text-slate-400 text-sm mb-4">Même principe : <strong>deux PC Commercial</strong> → deux ports. Utilisez <code className="bg-slate-900 px-1 rounded">interface range</code> pour les configurer ensemble.</p>
      
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Dist(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface range fastEthernet 0/1 - 2</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner les deux ports où sont branchés les PC Commercial (Com 1 et Com 2). Adaptez si votre câblage utilise d'autres numéros (ex. fa0/3-4).</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Dist(config-if-range)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport mode access</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Mode access pour les deux ports.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Dist(config-if-range)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport access vlan 20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Assigner les deux ports au VLAN 20.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Dist(config-if-range)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-900/20 border-l-4 border-blue-500/50 pl-4 py-2">
        <p className="text-blue-200 text-sm">
          <strong>Vérification :</strong> Tapez <code className="bg-slate-900 px-1 rounded">show vlan brief</code> sur chaque switch pour confirmer que les ports 1-2 sont bien dans le VLAN 10 (SW-Core) et le VLAN 20 (SW-Dist).
        </p>
      </div>
    </section>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 id="lab3-config-trunk" className="text-xl font-bold text-blue-400 mb-6 scroll-mt-4">🔗 Étape 4 : Configuration du Trunk</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Pour que les informations des VLAN 10 et 20 passent entre switchs et jusqu'au routeur, les liens doivent être en <strong>Trunk</strong>. Le trunk ajoute une étiquette <strong>IEEE 802.1Q</strong> à chaque trame pour identifier le VLAN.
      </p>
      
      <p className="text-slate-300 mb-6 leading-relaxed">
        <strong>Sur SW-Core</strong>, il y a <strong>deux ports</strong> à mettre en trunk : celui vers le routeur et celui vers SW-Dist. Le port vers le routeur est souvent oublié — c'est la cause la plus fréquente de ping échoué vers la passerelle (192.168.10.1).
      </p>
      
      <div className="bg-red-900/30 border-2 border-red-500 rounded-lg px-4 py-3 mb-6">
        <p className="text-red-200 text-sm font-bold">⚠️ Erreur la plus courante : le port SW-Core vers le routeur reste en mode <em>access</em> au lieu de <em>trunk</em>. Les PC communiquent entre eux (intra-VLAN) mais le ping vers 192.168.10.1 et 192.168.20.2 échoue. → Configurer ce port en trunk !</p>
      </div>
      
      <div className="bg-amber-600/30 border-2 border-amber-500 rounded-lg px-4 py-2 mb-4 inline-block">
        <span className="text-amber-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : SW-Core</span>
      </div>
      <h3 className="text-slate-200 font-bold mb-4 mt-4 border-b border-slate-600 pb-2">4.1 Port SW-Core vers le routeur (fa0/1) — Trunk obligatoire</h3>
      
      <div className="space-y-6 mb-8">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface fa0/1</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner le port qui relie SW-Core au routeur R-Core. Adaptez le numéro (fa0/1, fa0/2…) selon votre câblage.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport mode trunk</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer le mode trunk. <strong>Sans cela, le routeur ne reçoit pas les trames étiquetées</strong> et le routage inter-VLAN ne fonctionne pas.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport trunk allowed vlan 10,20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Autoriser les VLAN 10 et 20 sur ce trunk.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir de la configuration de l'interface.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">4.2 Port SW-Core vers SW-Dist (fa0/24)</h3>
      
      <div className="space-y-6 mb-8">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface fa0/24</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner l'interface qui relie SW-Core à SW-Dist. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">SW-Core(config-if)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport mode trunk</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer le mode trunk sur ce port. Le port peut maintenant transporter plusieurs VLANs en ajoutant une étiquette 802.1Q à chaque trame.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport trunk allowed vlan 10,20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Restreindre les VLANs autorisés sur le trunk (sécurité). Seuls les VLAN 10 et 20 pourront traverser ce lien.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir de la configuration de l'interface.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-600/30 border-2 border-amber-500 rounded-lg px-4 py-2 mb-4 inline-block mt-8">
        <span className="text-amber-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : SW-Dist</span>
      </div>
      <h3 className="text-slate-200 font-bold mb-4 mt-4 border-b border-slate-600 pb-2">4.3 Sur SW-Dist (interface fa0/24)</h3>
      
      <p className="text-slate-300 mb-4 leading-relaxed">
        Double-cliquez sur <strong>SW-Dist</strong> dans Packet Tracer, puis répétez exactement les mêmes commandes :
      </p>
      
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Dist(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface fa0/24</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner l'interface trunk sur SW-Dist.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Dist(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport mode trunk</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer le mode trunk (identique à SW-Core).</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Dist(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport trunk allowed vlan 10,20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Autoriser les mêmes VLANs (10 et 20) sur le trunk. Les deux switches doivent avoir la même configuration pour que le trunk fonctionne.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Dist(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-emerald-900/20 border-l-4 border-emerald-500/50 pl-4 py-2">
        <p className="text-emerald-200 text-sm">
          <strong>Vérification :</strong> Utilisez <code className="bg-slate-900 px-1 rounded font-mono">show interfaces trunk</code> pour vérifier que le trunk est actif et que les VLANs 10 et 20 sont bien autorisés.
        </p>
      </div>
    </section>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 id="lab3-config-router" className="text-xl font-bold text-blue-400 mb-6 scroll-mt-4">🚀 Étape 5 : Routage Inter-VLAN (Router-on-a-Stick)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        C'est l'étape cruciale. Le routeur va servir de "passerelle" entre les deux réseaux. Comme nous n'avons qu'un seul câble physique entre le switch et le routeur, nous créons des <strong>sous-interfaces virtuelles</strong> (une par VLAN).
      </p>
      
      <div className="bg-blue-600/30 border-2 border-blue-500 rounded-lg px-4 py-2 mb-4 inline-block">
        <span className="text-blue-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : R-Core</span>
      </div>
      <p className="text-slate-400 text-sm mb-6">Double-cliquez sur <strong>R-Core</strong> dans Packet Tracer pour ouvrir le CLI, puis exécutez les commandes ci-dessous.</p>
      
      <h3 className="text-slate-200 font-bold mb-4 mt-4 border-b border-slate-600 pb-2">5.1 Activation de l'interface physique principale</h3>
      
      <div className="space-y-6 mb-8">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface g0/0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner l'interface physique GigabitEthernet 0/0 qui est connectée au switch SW-Core.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">no shutdown</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer l'interface physique. <strong>Important :</strong> Sans cette commande, les sous-interfaces ne fonctionneront pas car l'interface mère est désactivée par défaut.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">5.2 Configuration de la sous-interface pour le VLAN 10</h3>
      
      <div className="space-y-6 mb-8">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface g0/0.10</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Créer la sous-interface g0/0.10 (le ".10" correspond au numéro du VLAN). Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">R-Core(config-subif)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">encapsulation dot1Q 10</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Définir l'encapsulation 802.1Q pour le VLAN 10. Cette commande lie la sous-interface au VLAN 10 : elle recevra uniquement les paquets étiquetés VLAN 10.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip address 192.168.10.1 255.255.255.0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Attribuer l'adresse IP de la passerelle pour le VLAN 10. Les PC du VLAN 10 utiliseront cette adresse comme gateway (192.168.10.1).</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir de la configuration de la sous-interface.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">5.3 Configuration de la sous-interface pour le VLAN 20</h3>
      
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface g0/0.20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Créer la sous-interface g0/0.20 pour le VLAN 20.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">encapsulation dot1Q 20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Lier cette sous-interface au VLAN 20. Elle recevra uniquement les paquets étiquetés VLAN 20.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip address 192.168.20.1 255.255.255.0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Attribuer l'adresse IP de la passerelle pour le VLAN 20. Les PC du VLAN 20 utiliseront 192.168.20.1 comme gateway.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-900/20 border-l-4 border-amber-500/50 pl-4 py-2">
        <p className="text-amber-200 text-sm">
          <strong>Rappel :</strong> L'interface physique g0/0 doit être activée avec <code className="bg-slate-900 px-1 rounded font-mono">no shutdown</code> avant de créer les sous-interfaces, sinon elles ne fonctionneront pas.
        </p>
      </div>
    </section>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 id="lab3-config-pc" className="text-xl font-bold text-blue-400 mb-6 scroll-mt-4">✅ Étape 6 : Configuration des PC et Tests</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Pour vérifier que tout fonctionne, attribuez des adresses IP statiques aux PC dans Packet Tracer (onglet Desktop → IP Configuration).
      </p>
      
      <div className="bg-emerald-600/30 border-2 border-emerald-500 rounded-lg px-4 py-2 mb-4 inline-block">
        <span className="text-emerald-200 font-bold text-sm uppercase tracking-wider">📍 Appareils : PC Admin 1, PC Admin 2</span>
      </div>
      <p className="text-slate-400 text-sm mb-4">Double-cliquez sur chaque PC Administration (Admin 1, Admin 2) dans Packet Tracer, puis Desktop → IP Configuration.</p>
      <h3 className="text-slate-200 font-bold mb-4 mt-4 border-b border-slate-600 pb-2">6.1 Configuration des PC du VLAN 10 (Administration)</h3>
      
      <ul className="list-none space-y-3 ml-0 text-slate-300 mb-6">
        <li className="flex gap-3 items-start">
          <span className="font-bold text-emerald-400/90 shrink-0">•</span>
          <span><strong>Adresse IP :</strong> <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">192.168.10.2</code> (ou .3, .4, etc. dans la plage 192.168.10.0/24)</span>
        </li>
        <li className="flex gap-3 items-start">
          <span className="font-bold text-emerald-400/90 shrink-0">•</span>
          <span><strong>Masque de sous-réseau :</strong> <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">255.255.255.0</code></span>
        </li>
        <li className="flex gap-3 items-start">
          <span className="font-bold text-emerald-400/90 shrink-0">•</span>
          <span><strong>Passerelle par défaut (Gateway) :</strong> <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">192.168.10.1</code> (l'adresse de la sous-interface g0/0.10 du routeur)</span>
        </li>
      </ul>

      <div className="bg-emerald-600/30 border-2 border-emerald-500 rounded-lg px-4 py-2 mb-4 inline-block mt-8">
        <span className="text-emerald-200 font-bold text-sm uppercase tracking-wider">📍 Appareils : PC Com 1, PC Com 2</span>
      </div>
      <p className="text-slate-400 text-sm mb-4">Double-cliquez sur chaque PC Commercial (Com 1, Com 2) dans Packet Tracer, puis Desktop → IP Configuration.</p>
      <h3 className="text-slate-200 font-bold mb-4 mt-4 border-b border-slate-600 pb-2">6.2 Configuration des PC du VLAN 20 (Commercial)</h3>
      
      <ul className="list-none space-y-3 ml-0 text-slate-300 mb-6">
        <li className="flex gap-3 items-start">
          <span className="font-bold text-emerald-400/90 shrink-0">•</span>
          <span><strong>Adresse IP :</strong> <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">192.168.20.2</code> (ou .3, .4, etc. dans la plage 192.168.20.0/24)</span>
        </li>
        <li className="flex gap-3 items-start">
          <span className="font-bold text-emerald-400/90 shrink-0">•</span>
          <span><strong>Masque de sous-réseau :</strong> <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">255.255.255.0</code></span>
        </li>
        <li className="flex gap-3 items-start">
          <span className="font-bold text-emerald-400/90 shrink-0">•</span>
          <span><strong>Passerelle par défaut (Gateway) :</strong> <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">192.168.20.1</code> (l'adresse de la sous-interface g0/0.20 du routeur)</span>
        </li>
      </ul>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">6.3 Tests de connectivité</h3>
      
      <div className="overflow-x-auto rounded-xl border border-slate-600 mb-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-700/80 text-slate-200">
              <th className="px-5 py-3 font-bold">Test</th>
              <th className="px-5 py-3 font-bold">Commande</th>
              <th className="px-5 py-3 font-bold">Résultat attendu</th>
              <th className="px-5 py-3 font-bold">Explication</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-t border-slate-600">
              <td className="px-5 py-3 font-medium align-top"><strong>Ping entre 2 PC du même VLAN</strong></td>
              <td className="px-5 py-3"><code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">ping 192.168.10.3</code></td>
              <td className="px-5 py-3"><span className="text-emerald-400 font-bold">Succès ✓</span></td>
              <td className="px-5 py-3 leading-relaxed text-sm">La communication reste au sein du même VLAN, le switch aiguille directement sans passer par le routeur.</td>
            </tr>
            <tr className="border-t border-slate-600">
              <td className="px-5 py-3 font-medium align-top"><strong>Ping vers la passerelle</strong></td>
              <td className="px-5 py-3"><code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">ping 192.168.10.1</code></td>
              <td className="px-5 py-3"><span className="text-emerald-400 font-bold">Succès ✓</span></td>
              <td className="px-5 py-3 leading-relaxed text-sm">Le PC peut atteindre la sous-interface du routeur sur son VLAN.</td>
            </tr>
            <tr className="border-t border-slate-600">
              <td className="px-5 py-3 font-medium align-top"><strong>Ping entre VLAN 10 et VLAN 20</strong></td>
              <td className="px-5 py-3"><code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">ping 192.168.20.2</code></td>
              <td className="px-5 py-3"><span className="text-emerald-400 font-bold">Succès ✓</span></td>
              <td className="px-5 py-3 leading-relaxed text-sm">Le paquet monte au routeur via g0/0.10, est routé vers g0/0.20, puis redescend vers le VLAN 20. C'est le routage inter-VLAN !</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">6.4 Commandes de vérification sur les équipements</h3>
      
      <div className="space-y-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-200 font-semibold mb-2">Sur les switches :</p>
          <ul className="list-none space-y-2 ml-0 text-slate-300 text-sm">
            <li className="flex gap-2"><span className="text-emerald-400">•</span> <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">show vlan brief</code> — Vérifier que les VLANs 10 et 20 existent et que les ports sont assignés correctement</li>
            <li className="flex gap-2"><span className="text-emerald-400">•</span> <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">show interfaces trunk</code> — Vérifier que le trunk est actif et que les VLANs 10 et 20 sont autorisés</li>
            <li className="flex gap-2"><span className="text-emerald-400">•</span> <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">show interfaces fa0/24 switchport</code> — Voir les détails de configuration du port trunk</li>
          </ul>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-200 font-semibold mb-2">Sur le routeur :</p>
          <ul className="list-none space-y-2 ml-0 text-slate-300 text-sm">
            <li className="flex gap-2"><span className="text-emerald-400">•</span> <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">show ip interface brief</code> — Voir toutes les interfaces et leurs adresses IP (les sous-interfaces g0/0.10 et g0/0.20 doivent apparaître)</li>
            <li className="flex gap-2"><span className="text-emerald-400">•</span> <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">show ip route</code> — Voir la table de routage (les réseaux 192.168.10.0/24 et 192.168.20.0/24 doivent être connectés directement)</li>
            <li className="flex gap-2"><span className="text-emerald-400">•</span> <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">show interfaces g0/0.10</code> — Vérifier les détails de la sous-interface VLAN 10</li>
          </ul>
        </div>
      </div>
    </section>

    <div className="bg-emerald-900/20 border-t border-emerald-500/30 p-6 rounded-xl">
      <p className="text-emerald-300 text-sm font-medium flex items-center gap-2">
        <CheckCircle className="w-5 h-5" /> 
        Cette correction détaillée commande par commande vous guide pas à pas dans la compréhension de la circulation des données entre différents réseaux virtuels. Chaque commande est expliquée pour comprendre son rôle dans la configuration globale.
      </p>
    </div>
  </div>
);

// --- LAB 2 DÉPANNAGE – Session 3 (même maquette que Lab 1, ports utilisateur) ---
const LabTroubleshootingSection3 = () => (
  <div className="max-w-4xl mx-auto space-y-12 text-slate-200 text-base leading-loose pb-16">
    <div className="bg-gradient-to-br from-violet-900/30 to-slate-800 border border-violet-500/40 rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-3">
        <Wrench className="w-8 h-8 text-violet-400 flex-shrink-0" /> Guide de dépannage – Lab 2 Session 3
      </h1>
      <p className="text-violet-100/90 text-lg leading-relaxed">Même maquette que le Lab 1. Méthode systématique pour identifier et corriger les pannes (trunk, VLANs, routeur).</p>
    </div>

    <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis:</span>
        {[
          { id: 'dep-scenario', label: 'Scénario', icon: '📋' },
          { id: 'dep-recherche', label: 'Recherche panne', icon: '🔍' },
          { id: 'dep-resolution', label: 'Résolution', icon: '🔧' },
          { id: 'dep-test', label: 'Test', icon: '✅' },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-violet-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
          >
            <span className="text-[10px]">{icon}</span> {label}
          </button>
        ))}
      </div>
    </nav>

    <section id="dep-scenario" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-violet-400 mb-6">📋 1. Scénario</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        NetCom vous appelle : « Le réseau marchait hier, ce matin plus de communication entre les VLANs. » Même maquette que le Lab 1. À vous de trouver l'origine de la panne.
      </p>
      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Symptômes rapportés par l'utilisateur</h3>
      <ul className="list-disc pl-6 text-slate-300 space-y-1">
        <li>Ping Admin 1 ↔ Admin 2 = <span className="text-emerald-400 font-semibold">OK</span> (intra-VLAN)</li>
        <li>Ping Admin 1 → 192.168.10.1 (passerelle) = <span className="text-red-400 font-semibold">échec</span></li>
        <li>Ping Admin 1 → PC Com 1 (192.168.20.2) = <span className="text-red-400 font-semibold">échec</span></li>
      </ul>
      <div className="mt-6 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Câblage (maquette Lab 1)</p>
        <p className="text-slate-300 text-sm">SW-Core Fa0/1 → R-Core | Fa0/2 → SW-Dist | Fa0/3-4 → PC Admin. SW-Dist Fa0/1 → SW-Core | Fa0/3-4 → PC Com.</p>
      </div>
    </section>

    <section id="dep-recherche" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-amber-400 mb-6">🔍 2. Recherche de la panne</h2>
      
      <div className="mb-8 p-6 bg-violet-900/20 border border-violet-500/40 rounded-xl space-y-6">
        <h3 className="text-violet-300 font-bold text-lg">🧠 Trame de réflexion</h3>
        
        <div className="space-y-6 border-l-2 border-violet-500/50 pl-6">
          <div>
            <p className="text-violet-300 font-bold mb-2">1. Que sait-on ?</p>
            <p className="text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">Tests à effectuer d'abord :</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
              <li>Depuis Admin 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.10.3</code> (Admin 2) — teste la communication au sein du VLAN 10, sans passer par le routeur.</li>
              <li>Depuis Admin 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.10.1</code> (passerelle) — teste si Admin 1 atteint le routeur.</li>
              <li>Depuis Admin 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.20.2</code> (Com 1) — teste le routage inter-VLAN.</li>
            </ul>
            <p className="mt-3 text-slate-300 leading-relaxed">Interprétation : si l'intra-VLAN fonctionne (Admin 1 ↔ Admin 2) mais que le ping vers la passerelle échoue, le blocage n'est pas entre Admin 1 et Admin 2. Le trafic vers 192.168.10.1 doit traverser le switch puis le lien vers le routeur — c'est là que ça coince.</p>
          </div>

          <div>
            <p className="text-violet-300 font-bold mb-2">2. Où se situe le blocage ?</p>
            <p className="text-slate-300 leading-relaxed mb-2">Le trafic vers la passerelle suit le chemin : Admin 1 → port switch (Fa0/3 ou Fa0/4) → SW-Core → port vers le routeur (Fa0/1) → routeur.</p>
            <p className="text-slate-300 leading-relaxed">L'intra-VLAN OK prouve que les ports vers les PC et le switch lui-même fonctionnent. Le seul segment non vérifié est le lien entre SW-Core et le routeur. C'est donc la zone à investiguer.</p>
          </div>

          <div>
            <p className="text-violet-300 font-bold mb-2">3. Quel équipement sur ce chemin ?</p>
            <p className="text-slate-300 leading-relaxed mb-2">Le routeur en Router-on-a-Stick reçoit le trafic de plusieurs VLANs sur une même interface physique. Pour distinguer les VLANs, les trames doivent être étiquetées 802.1Q.</p>
            <p className="text-slate-300 leading-relaxed">Un port switch en mode <em>access</em> n'envoie pas d'étiquettes : il enlève le tag VLAN et ne transporte qu'un seul VLAN natif. Le routeur ne recevrait que du trafic « sans VLAN » et ne pourrait pas router correctement entre les sous-réseaux. Le routeur a besoin d'un port en <strong>trunk</strong> pour recevoir les trames étiquetées.</p>
          </div>

          <div>
            <p className="text-violet-300 font-bold mb-2">4. Hypothèse</p>
            <p className="text-slate-300 leading-relaxed">Le port SW-Core connecté au routeur (Fa0/1 selon le câblage) est probablement en mode access au lieu de trunk. Il faut le vérifier avec une commande qui liste les ports en trunk.</p>
          </div>

          <div>
            <p className="text-violet-300 font-bold mb-2">5. Vérification ciblée (test)</p>
            <p className="text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">Commande à exécuter :</p>
            <p className="text-slate-300 leading-relaxed mb-2">Sur <strong>SW-Core</strong>, taper <code className="bg-slate-900 px-1 rounded">show interfaces trunk</code>. Cette commande affiche uniquement les ports configurés en mode trunk.</p>
            <p className="text-slate-300 leading-relaxed">Question : le port qui relie SW-Core au routeur (Fa0/1) apparaît-il dans la liste ? Si non, il est en access — c'est la cause de la panne.</p>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Étape 1 — Vérifier les trunks sur SW-Core</h3>
      <p className="text-slate-300 mb-4">Connectez-vous à <strong>SW-Core</strong> et exécutez :</p>
      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-sm mb-4">
        <p className="text-emerald-400">show interfaces trunk</p>
      </div>
      <p className="text-slate-300 mb-6">Quels ports apparaissent en trunk ? Pour que le Router-on-a-Stick fonctionne, quel port doit obligatoirement être en trunk ? Comparez avec votre câblage (quel port relie SW-Core au routeur ?).</p>
      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Étape 2 — Analyser la sortie</h3>
      <p className="text-slate-300 mb-4">Si le port qui relie SW-Core au routeur (Fa0/1 selon le câblage) n'apparaît pas dans la liste des trunks, c'est la cause. En mode <em>access</em>, le routeur ne reçoit pas les trames étiquetées 802.1Q — le routage inter-VLAN est impossible.</p>
    </section>

    <section id="dep-resolution" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-emerald-400 mb-6">🔧 3. Résolution de la panne</h2>
      <p className="text-slate-400 text-sm mb-4">📍 Appareil : <strong>SW-Core</strong></p>
      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-1">
        <p className="text-slate-400">SW-Core#</p>
        <p className="text-emerald-400">configure terminal</p>
        <p className="text-emerald-400">interface fa0/1</p>
        <p className="text-emerald-400">switchport mode trunk</p>
        <p className="text-emerald-400">switchport trunk allowed vlan 10,20</p>
        <p className="text-emerald-400">exit</p>
      </div>
    </section>

    <section id="dep-test" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">✅ 4. Test de validation</h2>
      <p className="text-slate-300 mb-4 leading-relaxed">Vérifications à effectuer après correction :</p>
      <ol className="list-decimal list-inside space-y-3 text-slate-300 mb-6">
        <li>Sur SW-Core : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">show interfaces trunk</code> — Fa0/1 doit maintenant apparaître en trunk.</li>
        <li>Depuis PC Admin 1 : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">ping 192.168.10.1</code> — doit répondre.</li>
        <li>Depuis PC Admin 1 : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">ping 192.168.20.2</code> (PC Com 1) — doit répondre (routage inter-VLAN OK).</li>
      </ol>
    </section>

    <div className="bg-violet-900/20 border-t border-violet-500/30 p-6 rounded-xl">
      <p className="text-violet-300 text-sm font-medium flex items-center gap-2">
        <Wrench className="w-5 h-5" /> 
        Scénario → Recherche → Résolution → Test. Commande clé : <code className="bg-slate-900 px-1 rounded">show interfaces trunk</code> sur SW-Core.
      </p>
    </div>
  </div>
);

// --- LAB 3 DÉPANNAGE – Session 3 (panne subtile : trunk allowed vlan incomplet) ---
const LabTroubleshootingSection3Lab3 = () => (
  <div className="max-w-4xl mx-auto space-y-12 text-slate-200 text-base leading-loose pb-16">
    <div className="bg-gradient-to-br from-amber-900/30 to-slate-800 border border-amber-500/40 rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-3">
        <Wrench className="w-8 h-8 text-amber-400 flex-shrink-0" /> Guide de dépannage – Lab 3 (panne subtile)
      </h1>
      <p className="text-amber-100/90 text-lg leading-relaxed">Les ports sont en trunk, le routeur fonctionne. La panne est <strong>subtile</strong> — il faut lire les sorties de commandes en détail et comprendre le chemin du trafic.</p>
    </div>

    <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis:</span>
        {[
          { id: 'dep3-scenario', label: 'Scénario', icon: '📋' },
          { id: 'dep3-recherche', label: 'Recherche panne', icon: '🔍' },
          { id: 'dep3-resolution', label: 'Résolution', icon: '🔧' },
          { id: 'dep3-test', label: 'Test', icon: '✅' },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-amber-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
          >
            <span className="text-[10px]">{icon}</span> {label}
          </button>
        ))}
      </div>
    </nav>

    <section id="dep3-scenario" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-amber-400 mb-6">📋 1. Scénario</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Ticket NetCom : « Les commerciaux ne peuvent pas joindre internet ni les admin. Les admin disent que de leur côté tout va. » Les ports trunk apparaissent bien dans <code className="bg-slate-900 px-1 rounded">show interfaces trunk</code>. Le routeur répond au ping depuis les Admin. Où est le blocage ?
      </p>
      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Symptômes rapportés</h3>
      <p className="text-slate-400 text-xs mb-3">Adresses : Admin 1 = 192.168.10.2, Admin 2 = 192.168.10.3, Com 1 = 192.168.20.2, Com 2 = 192.168.20.3. Passerelles : 192.168.10.1 et 192.168.20.1.</p>
      <ul className="list-disc pl-6 text-slate-300 space-y-1">
        <li>Ping Admin 1 → Admin 2 (<code className="bg-slate-900 px-1 rounded">192.168.10.3</code>) = <span className="text-emerald-400 font-semibold">OK</span></li>
        <li>Ping Com 1 → Com 2 (<code className="bg-slate-900 px-1 rounded">192.168.20.3</code>) = <span className="text-emerald-400 font-semibold">OK</span></li>
        <li>Ping Admin 1 → 192.168.10.1 (passerelle) = <span className="text-emerald-400 font-semibold">OK</span></li>
        <li>Ping Com 1 → 192.168.20.1 (passerelle) = <span className="text-red-400 font-semibold">échec</span></li>
        <li>Ping Admin 1 → Com 1 (<code className="bg-slate-900 px-1 rounded">192.168.20.2</code>) = <span className="text-red-400 font-semibold">échec</span></li>
      </ul>
      <div className="mt-6 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Question clé</p>
        <p className="text-slate-300 text-sm">Le trafic des PC Com (VLAN 20) doit passer par quel(s) lien(s) pour atteindre le routeur ? Et sur ces liens, quels VLANs doivent être autorisés ?</p>
      </div>
    </section>

    <section id="dep3-recherche" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-amber-400 mb-6">🔍 2. Recherche de la panne</h2>
      
      <div className="mb-8 p-6 bg-amber-900/20 border border-amber-500/40 rounded-xl space-y-6">
        <h3 className="text-amber-300 font-bold text-lg">🧠 Trame de réflexion</h3>
        
        <div className="space-y-6 border-l-2 border-amber-500/50 pl-6">
          <div>
            <p className="text-amber-300 font-bold mb-3">1. Que sait-on ?</p>
            <p className="text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">Tests à effectuer d'abord :</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
              <li>Depuis Admin 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.10.1</code> — teste si les Admin atteignent leur passerelle.</li>
              <li>Depuis Com 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.20.1</code> — teste si les Com atteignent leur passerelle.</li>
              <li>Depuis Com 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.20.3</code> (Com 2) — teste l'intra-VLAN Com (même VLAN, sans routeur).</li>
              <li>Sur SW-Core et SW-Dist : <code className="bg-slate-900 px-1 rounded">show interfaces trunk</code> — vérifier que des ports apparaissent en trunk.</li>
            </ul>
            <p className="mt-3 text-slate-300 leading-relaxed">Interprétation : Admin OK et Com échec sur la passerelle, alors que les ports trunk sont visibles. Ce n'est pas le Lab 2 (un port en access n'apparaîtrait pas du tout). Ici les ports sont bien en trunk, mais le trafic VLAN 20 ne parvient pas au routeur — la panne est plus subtile.</p>
          </div>

          <div>
            <p className="text-amber-300 font-bold mb-2">2. Où se situe le blocage ?</p>
            <p className="text-slate-300 leading-relaxed mb-2">Le trafic Com (VLAN 20) vers la passerelle suit : PC Com → SW-Dist (Fa0/3 ou Fa0/4) → SW-Dist Fa0/1 (trunk vers SW-Core) → SW-Core Fa0/2 → SW-Core Fa0/1 (trunk vers routeur) → routeur.</p>
            <p className="text-slate-300 leading-relaxed">Le VLAN 10 fonctionne (Admin joignent leur passerelle). Le VLAN 20 ne fonctionne pas. La rupture est donc sur le chemin du trafic VLAN 20 uniquement — un des trunks sur ce chemin bloque peut-être ce VLAN.</p>
          </div>

          <div>
            <p className="text-amber-300 font-bold mb-2">3. Un port trunk peut-il bloquer un VLAN ?</p>
            <p className="text-slate-300 leading-relaxed mb-2">Oui. Par défaut un trunk transporte tous les VLANs, mais on peut restreindre avec <code className="bg-slate-900 px-1 rounded">switchport trunk allowed vlan 10</code>. Dans ce cas, seul le VLAN 10 traverse le trunk — le VLAN 20 est filtré.</p>
            <p className="text-slate-300 leading-relaxed">Le trunk existe (il apparaît dans <code className="bg-slate-900 px-1 rounded">show interfaces trunk</code>), mais la liste des VLANs autorisés peut être incomplète. Il faut lire la colonne « Vlans allowed » ou équivalent pour chaque port.</p>
          </div>

          <div>
            <p className="text-amber-300 font-bold mb-2">4. Hypothèse</p>
            <p className="text-slate-300 leading-relaxed">Sur un des trunks du chemin Com → routeur (SW-Dist Fa0/1, SW-Core Fa0/2 ou Fa0/1), le VLAN 20 n'est pas dans la liste des VLANs autorisés. La commande affiche le port en trunk, mais il faut regarder <em>toute</em> la sortie, pas seulement la présence du port.</p>
          </div>

          <div>
            <p className="text-amber-300 font-bold mb-2">5. Vérification ciblée (test)</p>
            <p className="text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">Action :</p>
            <p className="text-slate-300 leading-relaxed mb-2">Sur <strong>SW-Core</strong> puis <strong>SW-Dist</strong>, exécuter <code className="bg-slate-900 px-1 rounded">show interfaces trunk</code>. La sortie affiche plusieurs colonnes : port, mode, encapsulation, et surtout la liste des <strong>VLANs autorisés</strong> (Vlans allowed on trunk).</p>
            <p className="text-slate-300 leading-relaxed">Pour chaque trunk sur le chemin Com → routeur (Fa0/1, Fa0/2 selon le switch), vérifier que les valeurs <strong>10,20</strong> (ou 1-4094 si « all ») apparaissent. Si un port affiche seulement 10, c'est le port à corriger.</p>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Étape 1 — Commandes à exécuter</h3>
      <p className="text-slate-300 mb-4">Sur <strong>SW-Core</strong>, puis sur <strong>SW-Dist</strong>, exécutez :</p>
      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-sm mb-6">
        <p className="text-emerald-400">show interfaces trunk</p>
      </div>

      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Étape 2 — Observer la sortie</h3>
      <p className="text-slate-300 mb-4">La commande affiche plusieurs colonnes. Notez pour chaque port en trunk :</p>
      <ul className="list-disc pl-6 text-slate-300 space-y-1 mb-6">
        <li>Quel port ?</li>
        <li>Quelle colonne indique les VLANs autorisés à traverser ce trunk ?</li>
        <li>Quelle(s) valeur(s) sont affichées pour chaque port ?</li>
      </ul>

      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Étape 3 — Analyser le chemin du trafic Com</h3>
      <p className="text-slate-300 mb-4">Le trafic des PC Com (VLAN 20) va de SW-Dist vers le routeur via SW-Core. Il traverse :</p>
      <ol className="list-decimal list-inside text-slate-300 space-y-1 mb-4">
        <li>SW-Dist Fa0/1 (lien vers SW-Core)</li>
        <li>SW-Core Fa0/2 (lien depuis SW-Dist)</li>
        <li>SW-Core Fa0/1 (lien vers le routeur)</li>
      </ol>
      <p className="text-slate-300 mb-6">Pour chaque trunk sur ce chemin : le VLAN 20 doit-il être autorisé ? Comparez avec ce que vous avez observé à l'étape 2.</p>

      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Étape 4 — Déduction</h3>
      <p className="text-slate-300">Sur quel(s) port(s) le VLAN 20 est-il absent de la liste des VLANs autorisés ? C'est le ou les ports à corriger.</p>
    </section>

    <section id="dep3-resolution" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-emerald-400 mb-6">🔧 3. Résolution de la panne</h2>
      <p className="text-slate-300 mb-4">Une fois le port identifié (étape 4 de la recherche), appliquer la correction suivante sur l'équipement concerné.</p>
      <p className="text-slate-400 text-sm mb-4">📍 Appareil : celui où se trouve le port fautif (SW-Core ou SW-Dist)</p>
      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-1">
        <p className="text-slate-400">SW-Core# (ou SW-Dist#)</p>
        <p className="text-emerald-400">configure terminal</p>
        <p className="text-emerald-400">interface fa0/X</p>
        <p className="text-slate-400 text-xs mt-1">(remplacer X par le numéro du port identifié : 1 ou 2 selon le switch)</p>
        <p className="text-emerald-400">switchport trunk allowed vlan 10,20</p>
        <p className="text-emerald-400">exit</p>
      </div>
    </section>

    <section id="dep3-test" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">✅ 4. Test de validation</h2>
      <p className="text-slate-400 text-xs mb-3">Rappel : Admin 1 = 192.168.10.2, Com 1 = 192.168.20.2. Passerelles = 192.168.10.1 et 192.168.20.1.</p>
      <ol className="list-decimal list-inside space-y-3 text-slate-300 mb-6">
        <li>Sur chaque switch : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">show interfaces trunk</code> — la colonne « Vlans allowed » doit indiquer 10,20 sur tous les trunks.</li>
        <li>Depuis Com 1 (192.168.20.2) : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">ping 192.168.20.1</code> — doit répondre.</li>
        <li>Depuis Admin 1 (192.168.10.2) : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">ping 192.168.20.2</code> (Com 1) — doit répondre.</li>
      </ol>
    </section>

    <div className="bg-amber-900/20 border-t border-amber-500/30 p-6 rounded-xl">
      <p className="text-amber-300 text-sm font-medium flex items-center gap-2">
        <Wrench className="w-5 h-5" /> 
        Lab 2 : port en access (n'apparaît pas en trunk). Lab 3 : port en trunk mais <strong>VLANs autorisés incomplets</strong> — il faut lire toute la sortie de <code className="bg-slate-900 px-1 rounded">show interfaces trunk</code>, pas seulement vérifier si le port apparaît.
      </p>
    </div>
  </div>
);

// --- LAB 4 DÉPANNAGE – Session 3 (problème passerelle / gateway sur PC) ---
const LabTroubleshootingSection3Lab4 = () => (
  <div className="max-w-4xl mx-auto space-y-12 text-slate-200 text-base leading-loose pb-16">
    <div className="bg-gradient-to-br from-cyan-900/30 to-slate-800 border border-cyan-500/40 rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-3">
        <Wrench className="w-8 h-8 text-cyan-400 flex-shrink-0" /> Guide de dépannage – Lab 4 (passerelle absente)
      </h1>
      <p className="text-cyan-100/90 text-lg leading-relaxed">Les switches et le routeur sont corrects. La panne est sur la <strong>configuration IP d'un PC</strong> — la passerelle par défaut (Default Gateway) est absente.</p>
    </div>

    <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis:</span>
        {[
          { id: 'dep4-scenario', label: 'Scénario', icon: '📋' },
          { id: 'dep4-recherche', label: 'Recherche panne', icon: '🔍' },
          { id: 'dep4-resolution', label: 'Résolution', icon: '🔧' },
          { id: 'dep4-test', label: 'Test', icon: '✅' },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-cyan-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
          >
            <span className="text-[10px]">{icon}</span> {label}
          </button>
        ))}
      </div>
    </nav>

    <section id="dep4-scenario" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-cyan-400 mb-6">📋 1. Scénario</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Ticket NetCom : « Les admin et les commerciaux ne peuvent pas communiquer entre eux. Chacun peut ping sa propre passerelle. » Les ports trunk sont corrects, le routeur répond. Où est le blocage ?
      </p>
      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Symptômes rapportés</h3>
      <p className="text-slate-400 text-xs mb-3">Adresses : Admin 1 = 192.168.10.2, Admin 2 = 192.168.10.3, Com 1 = 192.168.20.2, Com 2 = 192.168.20.3. Passerelles : 192.168.10.1 et 192.168.20.1.</p>
      <ul className="list-disc pl-6 text-slate-300 space-y-1">
        <li>Ping Admin 1 → Admin 2 (<code className="bg-slate-900 px-1 rounded">192.168.10.3</code>) = <span className="text-emerald-400 font-semibold">OK</span></li>
        <li>Ping Com 1 → Com 2 (<code className="bg-slate-900 px-1 rounded">192.168.20.3</code>) = <span className="text-emerald-400 font-semibold">OK</span></li>
        <li>Ping Admin 1 → 192.168.10.1 (passerelle Admin) = <span className="text-emerald-400 font-semibold">OK</span></li>
        <li>Ping Com 1 → 192.168.20.1 (passerelle Com) = <span className="text-emerald-400 font-semibold">OK</span></li>
        <li>Ping Admin 1 → Com 1 (<code className="bg-slate-900 px-1 rounded">192.168.20.2</code>) = <span className="text-red-400 font-semibold">échec</span></li>
        <li>Ping Com 1 → Admin 1 (<code className="bg-slate-900 px-1 rounded">192.168.10.2</code>) = <span className="text-red-400 font-semibold">échec</span></li>
      </ul>
      <div className="mt-6 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Question clé</p>
        <p className="text-slate-300 text-sm">Où vérifier la config IP des PC ? Chaque PC doit avoir la passerelle correspondant à son VLAN.</p>
      </div>
    </section>

    <section id="dep4-recherche" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-cyan-400 mb-6">🔍 2. Recherche de la panne</h2>
      
      <div className="mb-8 p-6 bg-cyan-900/20 border border-cyan-500/40 rounded-xl space-y-6">
        <h3 className="text-cyan-300 font-bold text-lg">🧠 Trame de réflexion</h3>
        
        <div className="space-y-6 border-l-2 border-cyan-500/50 pl-6">
          <div>
            <p className="text-cyan-300 font-bold mb-3">1. Que sait-on ?</p>
            <p className="text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">Tests à effectuer d'abord :</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
              <li>Depuis Admin 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.10.1</code> (passerelle) et <code className="bg-slate-900 px-1 rounded">ping 192.168.10.3</code> (Admin 2) — teste l'accès à la passerelle et l'intra-VLAN Admin.</li>
              <li>Depuis Com 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.20.1</code> (passerelle) et <code className="bg-slate-900 px-1 rounded">ping 192.168.20.3</code> (Com 2) — idem pour le VLAN 20.</li>
              <li>Depuis Admin 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.20.2</code> (Com 1) ; depuis Com 1 : <code className="bg-slate-900 px-1 rounded">ping 192.168.10.2</code> (Admin 1) — teste l'inter-VLAN dans les deux sens.</li>
            </ul>
            <p className="mt-3 text-slate-300 leading-relaxed">Interprétation : si les deux passerelles répondent et l'intra-VLAN fonctionne, le routeur et les trunks sont OK. Seul l'inter-VLAN échoue. Or l'inter-VLAN implique les PC — chacun doit envoyer ses paquets vers sa passerelle pour atteindre l'autre VLAN. Si un PC n'a pas de passerelle configurée, il ne sait pas où envoyer. Le blocage est donc côté configuration des <strong>hôtes</strong>, pas des équipements réseau.</p>
          </div>

          <div>
            <p className="text-cyan-300 font-bold mb-2">2. Où se situe le blocage ?</p>
            <p className="text-slate-300 leading-relaxed mb-2">Les tests prouvent que l'infrastructure (switches, routeur, trunks) fonctionne. Pour qu'Admin 1 joigne Com 1 (192.168.20.2), Admin 1 doit envoyer le paquet vers sa passerelle (192.168.10.1) ; le routeur le forwarde vers Com 1. Même logique dans l'autre sens.</p>
            <p className="text-slate-300 leading-relaxed">Chaque PC a besoin d'une <strong>passerelle par défaut</strong> (Default Gateway) pour savoir à quelle adresse envoyer les paquets destinés à un autre sous-réseau. Sans passerelle, le PC ne connaît pas la route — il ne peut pas envoyer les paquets vers l'autre VLAN.</p>
          </div>

          <div>
            <p className="text-cyan-300 font-bold mb-2">3. Qui est impliqué ?</p>
            <p className="text-slate-300 leading-relaxed mb-2">Les deux sens échouent (Admin 1 → Com 1 et Com 1 → Admin 1). Pour qu'un ping réussisse, il faut l'envoi ET la réponse.</p>
            <p className="text-slate-300 leading-relaxed">Exemple : Com 1 ping Admin 1. Le paquet va Com 1 → passerelle Com → routeur → Admin 1. Admin 1 reçoit et doit répondre. Pour répondre vers 192.168.20.2 (Com 1), Admin 1 doit utiliser sa passerelle (différent sous-réseau). Si Admin 1 n'a pas de passerelle, il ne peut pas envoyer la réponse — le ping échoue. Un seul PC mal configuré peut bloquer les deux sens.</p>
          </div>

          <div>
            <p className="text-cyan-300 font-bold mb-2">4. Hypothèse</p>
            <p className="text-slate-300 leading-relaxed">Un PC a une configuration IP incomplète : adresse et masque corrects, mais le champ <strong>Default Gateway</strong> est vide ou incorrect (par ex. la passerelle d'un autre VLAN).</p>
          </div>

          <div>
            <p className="text-cyan-300 font-bold mb-2">5. Où chercher ? (Test de vérification)</p>
            <p className="text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">Action :</p>
            <p className="text-slate-300 leading-relaxed mb-2">Dans Packet Tracer : cliquer sur chaque PC → onglet <strong>Desktop</strong> → <strong>IP Configuration</strong>. Vérifier pour chaque machine : le champ Default Gateway est-il renseigné ? La valeur correspond-elle au VLAN du PC ?</p>
            <p className="text-slate-300 leading-relaxed">Règle : Admin (VLAN 10, 192.168.10.x) → passerelle 192.168.10.1. Com (VLAN 20, 192.168.20.x) → passerelle 192.168.20.1. Un champ vide ou 0.0.0.0 indique une panne.</p>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Étape 1 — Où vérifier la config des PC ?</h3>
      <p className="text-slate-300 mb-4">Sur chaque PC : cliquer sur le PC → onglet <strong>Desktop</strong> → <strong>IP Configuration</strong>. Contrôler pour chaque machine : adresse IP, masque, et <strong>passerelle par défaut</strong>.</p>

      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Étape 2 — Valeurs attendues</h3>
      <p className="text-slate-300 mb-4">Chaque PC doit avoir une passerelle correspondant à son VLAN :</p>
      <ul className="list-disc pl-6 text-slate-300 space-y-1 mb-6">
        <li><strong>Admin 1, Admin 2</strong> : passerelle = <code className="bg-slate-900 px-1 rounded">192.168.10.1</code></li>
        <li><strong>Com 1, Com 2</strong> : passerelle = <code className="bg-slate-900 px-1 rounded">192.168.20.1</code></li>
      </ul>

      <h3 className="text-slate-200 font-bold mb-3 border-b border-slate-600 pb-2">Étape 3 — Déduction</h3>
      <p className="text-slate-300">Quel PC a le champ Default Gateway vide ou incorrect ? C'est le PC à corriger. (Dans ce lab : Admin 1 sans passerelle.)</p>
    </section>

    <section id="dep4-resolution" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-emerald-400 mb-6">🔧 3. Résolution de la panne</h2>
      <p className="text-slate-300 mb-4">Corriger <strong>Admin 1</strong> : renseigner la passerelle <code className="bg-slate-900 px-1 rounded">192.168.10.1</code> dans le champ Default Gateway.</p>
      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 space-y-2">
        <p className="text-emerald-400">PC Admin 1 → Desktop → IP Configuration</p>
        <p className="text-slate-300 text-sm">Dans Default Gateway : saisir <span className="text-emerald-400">192.168.10.1</span> (au lieu de laisser vide ou 0.0.0.0)</p>
      </div>
      <p className="text-slate-400 text-sm mt-4">Règle : Admin 1 est dans le VLAN 10 (192.168.10.x), sa passerelle doit être 192.168.10.1 (interface routeur sur VLAN 10).</p>
    </section>

    <section id="dep4-test" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">✅ 4. Test de validation</h2>
      <p className="text-slate-400 text-xs mb-3">Rappel : Admin 1 = 192.168.10.2, Com 1 = 192.168.20.2. Passerelles = 192.168.10.1 et 192.168.20.1.</p>
      <ol className="list-decimal list-inside space-y-3 text-slate-300 mb-6">
        <li>Vérifier chaque PC : Desktop → IP Configuration → Default Gateway renseignée et correcte selon le VLAN.</li>
        <li>Depuis Admin 1 : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">ping 192.168.20.2</code> (Com 1) — doit répondre.</li>
        <li>Depuis Com 1 : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">ping 192.168.10.2</code> (Admin 1) — doit répondre.</li>
      </ol>
    </section>

    <div className="bg-cyan-900/20 border-t border-cyan-500/30 p-6 rounded-xl">
      <p className="text-cyan-300 text-sm font-medium flex items-center gap-2">
        <Wrench className="w-5 h-5" /> 
        Lab 4 : quand les switches et le routeur sont corrects, penser aux <strong>hôtes</strong>. Une passerelle manquante ou vide empêche tout trafic inter-VLAN — comportement stable dans Packet Tracer.
      </p>
    </div>
  </div>
);

// --- CORRECTION LAB 2 RÉCAPITULATIF – Session 3 (Synthèse Sessions 1, 2, 3) - conservé pour référence ---
const LabCorrectionSection3Recap = () => (
  <div className="max-w-4xl mx-auto space-y-12 text-slate-200 text-base leading-loose pb-16">
    <div className="bg-gradient-to-br from-amber-900/30 to-emerald-900/20 border border-amber-500/40 rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-3">
        <CheckCircle className="w-8 h-8 text-amber-400 flex-shrink-0" /> Correction Lab 2 – Récapitulatif (Synthèse des 3 sessions)
      </h1>
      <p className="text-amber-100/90 text-lg leading-relaxed">VLANs, trunk, Router-on-a-Stick, sécurisation et sauvegarde. Même style que les autres corrections.</p>
    </div>

    <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis:</span>
        {[
          { id: 'recap-vlan', label: 'VLANs', icon: '🏷️' },
          { id: 'recap-trunk', label: 'Trunk', icon: '🔗' },
          { id: 'recap-router', label: 'Router-on-a-Stick', icon: '🚀' },
          { id: 'recap-sec', label: 'Sécurisation', icon: '🔒' },
          { id: 'recap-verify', label: 'Tests', icon: '✅' },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-emerald-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
          >
            <span className="text-[10px]">{icon}</span> {label}
          </button>
        ))}
      </div>
    </nav>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-emerald-400 mb-6">🎯 Introduction</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Ce lab récapitule les notions des Sessions 1, 2 et 3. Topologie : 2 switches (SW-Core, SW-Dist), 1 routeur (R-Core), 2 PC Admin, 2 PC Commercial. Même câblage que le Lab 1 de la session.
      </p>
    </section>

    <section id="recap-vlan" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🏷️ Étape 1 : VLANs et ports access (Session 2)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Sur chaque switch (SW-Core et SW-Dist), créer les VLANs puis assigner les ports des PC.
      </p>
      
      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">1.1 Création des VLANs sur SW-Core</h3>
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch&gt;</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">enable</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Passer en mode privilégié.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">hostname SW-Core</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Renommer le switch. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">SW-Core(config)#</code>.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">vlan 10</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Créer le VLAN 10. Le prompt passe en <code className="bg-slate-800 px-1 rounded text-xs">SW-Core(config-vlan)#</code>.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-vlan)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">name Administration</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Donner un nom descriptif au VLAN 10 pour le reconnaître dans <code className="bg-slate-800 px-1 rounded text-xs">show vlan brief</code>.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-vlan)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration VLAN.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">vlan 20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Créer le VLAN 20 pour le département Commercial.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-vlan)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">name Commercial</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Nommer le VLAN 20.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-vlan)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">1.2 Attribution des ports aux VLANs (ex. PC Admin sur fa0/2, PC Commercial sur fa0/3)</h3>
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface fa0/2</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner le port où est branché le PC Administration. Adapter le numéro selon votre câblage.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport mode access</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Définir le port en mode access (un seul VLAN par port, pour les PC).</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport access vlan 10</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Assigner ce port au VLAN 10. Les paquets entrant seront étiquetés VLAN 10.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir de la configuration d'interface.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface fa0/3</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner le port du PC Commercial.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport mode access</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Mode access pour ce port.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport access vlan 20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Assigner ce port au VLAN 20.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-blue-900/20 border-l-4 border-blue-500/50 pl-4 py-2">
        <p className="text-blue-200 text-sm"><strong>Répéter</strong> exactement les mêmes étapes sur SW-Dist (en remplaçant SW-Core par SW-Dist). Adapter les numéros de ports selon les PC branchés. Vérifier avec <code className="bg-slate-900 px-1 rounded font-mono">show vlan brief</code>.</p>
      </div>
    </section>

    <section id="recap-trunk" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🔗 Étape 2 : Trunk (Session 3)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Le trunk permet de transporter plusieurs VLANs sur un seul câble entre switches. Sur SW-Core : fa0/24 (vers SW-Dist) <strong>et</strong> fa0/1 (vers le routeur pour Router-on-a-Stick). Sur SW-Dist : fa0/24.
      </p>
      
      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">2.1 Port fa0/24 – SW-Core (lien inter-switch)</h3>
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface fa0/24</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner le port qui relie SW-Core à SW-Dist. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">SW-Core(config-if)#</code>.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport mode trunk</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer le mode trunk. Les trames seront étiquetées 802.1Q avec le VLAN ID. Un seul câble transporte VLAN 10 et 20.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport trunk allowed vlan 10,20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Optionnel : restreindre les VLANs autorisés sur le trunk pour la sécurité. Seuls 10 et 20 traverseront ce lien.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir de la configuration d'interface.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">2.2 Port fa0/1 – SW-Core (lien vers le routeur)</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">
        Pour le Router-on-a-Stick, le routeur envoie des trames étiquetées 802.1Q. Le port du switch vers le routeur doit donc être en trunk.
      </p>
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface fa0/1</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Port connecté au routeur R-Core.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">switchport mode trunk</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer le trunk pour que les sous-interfaces du routeur (g0/0.10, g0/0.20) reçoivent le trafic des VLANs correspondants.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">2.3 Sur SW-Dist – port fa0/24</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">
        Répéter la même configuration sur SW-Dist pour le port fa0/24 (vers SW-Core) : <code className="bg-slate-900 px-1 rounded text-emerald-400 font-mono">interface fa0/24</code>, <code className="bg-slate-900 px-1 rounded text-emerald-400 font-mono">switchport mode trunk</code>, <code className="bg-slate-900 px-1 rounded text-emerald-400 font-mono">switchport trunk allowed vlan 10,20</code> (optionnel), <code className="bg-slate-900 px-1 rounded text-emerald-400 font-mono">exit</code>.
      </p>
      <div className="mt-6 bg-emerald-900/20 border-l-4 border-emerald-500/50 pl-4 py-2">
        <p className="text-emerald-200 text-sm"><strong>Vérification :</strong> <code className="bg-slate-900 px-1 rounded font-mono">show interfaces trunk</code> — le trunk doit être actif et les VLANs 10 et 20 autorisés.</p>
      </div>
    </section>

    <section id="recap-router" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🚀 Étape 3 : Router-on-a-Stick (Session 3)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Le routeur crée des sous-interfaces virtuelles (une par VLAN) sur une seule interface physique. Chaque sous-interface reçoit le trafic de son VLAN grâce à l'encapsulation 802.1Q.
      </p>
      
      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">3.1 Activation de l'interface physique</h3>
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface g0/0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner l'interface physique connectée au switch. Sur certains routeurs Packet Tracer : <code className="bg-slate-800 px-1 rounded text-xs">fa0/0</code>.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">no shutdown</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer l'interface. <strong>Important :</strong> les sous-interfaces ne fonctionnent pas si l'interface mère est administratively down.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">3.2 Sous-interface pour VLAN 10</h3>
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface g0/0.10</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Créer la sous-interface (le .10 correspond au VLAN). Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">R-Core(config-subif)#</code>.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">encapsulation dot1Q 10</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Lier cette sous-interface au VLAN 10. Elle ne recevra que les paquets étiquetés VLAN 10.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip address 192.168.10.1 255.255.255.0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Adresse de la passerelle pour les PC du VLAN 10. Ils utiliseront 192.168.10.1 comme gateway.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir de la sous-interface.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">3.3 Sous-interface pour VLAN 20</h3>
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface g0/0.20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Créer la sous-interface pour le VLAN 20.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">encapsulation dot1Q 20</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Lier au VLAN 20.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip address 192.168.20.1 255.255.255.0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Passerelle pour les PC du VLAN 20.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-subif)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Retourner au mode configuration globale.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">3.4 Configuration des PC</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">Dans Packet Tracer, Desktop → IP Configuration :</p>
      <ul className="list-none space-y-2 ml-0 text-slate-300 mb-6">
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">•</span><span><strong>PC Admin :</strong> IP 192.168.10.2 (ou .3), masque 255.255.255.0, passerelle 192.168.10.1</span></li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">•</span><span><strong>PC Commercial :</strong> IP 192.168.20.2 (ou .3), masque 255.255.255.0, passerelle 192.168.20.1</span></li>
      </ul>
    </section>

    <section id="recap-sec" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🔒 Étape 4 : Sécurisation (Session 1)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Même séquence de commandes sur chaque équipement. Exécutez d'abord sur R-Core, puis sur SW-Core, puis sur SW-Dist.
      </p>
      
      <div className="bg-blue-600/30 border-2 border-blue-500 rounded-lg px-4 py-2 mb-4 inline-block">
        <span className="text-blue-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : R-Core</span>
      </div>
      <p className="text-slate-400 text-sm mb-6">Double-cliquez sur <strong>R-Core</strong>, puis <code className="bg-slate-900 px-1 rounded">enable</code> et <code className="bg-slate-900 px-1 rounded">configure terminal</code>.</p>
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">no ip domain-lookup</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Désactiver la résolution DNS. Évite les délais de 5-10 s lors d'une erreur de frappe (commande inexistante).</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">enable secret cisco123</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Mot de passe privilégié chiffré (MD5). Demandé à chaque <code className="bg-slate-800 px-1 rounded text-xs">enable</code>.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">line console 0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en configuration de la ligne console (prise physique). Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">R-Core(config-line)#</code>.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">password console123</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Définir le mot de passe pour la connexion console.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">login</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer la demande de mot de passe à la connexion console. Sans <code className="bg-slate-800 px-1 rounded text-xs">login</code>, le mot de passe n'est pas demandé.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Core(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir des lignes console.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-600/30 border-2 border-amber-500 rounded-lg px-4 py-2 mb-4 inline-block mt-8">
        <span className="text-amber-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : SW-Core</span>
      </div>
      <p className="text-slate-400 text-sm mb-6">Double-cliquez sur <strong>SW-Core</strong>, puis répétez exactement les mêmes commandes (enable, configure terminal, no ip domain-lookup, enable secret cisco123, line console 0, password console123, login, exit).</p>
      
      <div className="bg-amber-600/30 border-2 border-amber-500 rounded-lg px-4 py-2 mb-4 inline-block">
        <span className="text-amber-200 font-bold text-sm uppercase tracking-wider">📍 Appareil : SW-Dist</span>
      </div>
      <p className="text-slate-400 text-sm mb-6">Double-cliquez sur <strong>SW-Dist</strong>, puis répétez les mêmes commandes. Optionnel : configurer SSH (ip domain-name, crypto key generate rsa, username, line vty + login local + transport input ssh).</p>
    </section>

    <section id="recap-verify" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">✅ Étape 5 : Sauvegarde et tests</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Sans sauvegarde, toutes les modifications sont perdues au redémarrage.
      </p>
      
      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">5.1 Sauvegarde sur chaque équipement</h3>
      <p className="text-slate-400 text-sm mb-4">Commande à exécuter sur <strong>chaque</strong> appareil (SW-Core, SW-Dist, R-Core) : ouvrez le CLI de l'appareil, passez en mode privilégié (<code className="bg-slate-900 px-1 rounded">enable</code>), puis tapez la commande.</p>
      <div className="space-y-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-amber-600/30 border border-amber-500 rounded px-2 py-1 text-amber-200 text-xs font-bold">SW-Core</span>
          <span className="text-slate-400 text-sm">puis</span>
          <span className="bg-amber-600/30 border border-amber-500 rounded px-2 py-1 text-amber-200 text-xs font-bold">SW-Dist</span>
          <span className="text-slate-400 text-sm">puis</span>
          <span className="bg-blue-600/30 border border-blue-500 rounded px-2 py-1 text-blue-200 text-xs font-bold">R-Core</span>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">copy running-config startup-config</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Copier la configuration active (RAM) vers la NVRAM. Réponse : <em>Destination filename [startup-config]?</em> — appuyer sur Entrée. Répéter ensuite sur SW-Dist puis sur R-Core.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">5.2 Tests de connectivité</h3>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-600">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-700/80 text-slate-200">
              <th className="px-5 py-3 font-bold">Test</th>
              <th className="px-5 py-3 font-bold">Commande</th>
              <th className="px-5 py-3 font-bold">Résultat</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-t border-slate-600">
              <td className="px-5 py-3">Ping intra-VLAN</td>
              <td className="px-5 py-3"><code className="bg-slate-900 px-1 rounded text-emerald-400 font-mono text-xs">ping 192.168.10.3</code> (depuis Admin1)</td>
              <td className="px-5 py-3"><span className="text-emerald-400 font-bold">Succès ✓</span></td>
            </tr>
            <tr className="border-t border-slate-600">
              <td className="px-5 py-3">Ping vers passerelle</td>
              <td className="px-5 py-3"><code className="bg-slate-900 px-1 rounded text-emerald-400 font-mono text-xs">ping 192.168.10.1</code></td>
              <td className="px-5 py-3"><span className="text-emerald-400 font-bold">Succès ✓</span></td>
            </tr>
            <tr className="border-t border-slate-600">
              <td className="px-5 py-3">Ping inter-VLAN</td>
              <td className="px-5 py-3"><code className="bg-slate-900 px-1 rounded text-emerald-400 font-mono text-xs">ping 192.168.20.2</code> (depuis Admin1 vers Com1)</td>
              <td className="px-5 py-3"><span className="text-emerald-400 font-bold">Succès ✓</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-slate-200 font-bold mb-4 mt-6 border-b border-slate-600 pb-2">5.3 Commandes de vérification</h3>
      <ul className="list-none space-y-2 ml-0 text-slate-300 text-sm">
        <li className="flex gap-2"><span className="text-emerald-400">•</span> <code className="bg-slate-900 px-1 rounded font-mono">show vlan brief</code> — VLANs et ports assignés</li>
        <li className="flex gap-2"><span className="text-emerald-400">•</span> <code className="bg-slate-900 px-1 rounded font-mono">show interfaces trunk</code> — Ports trunk, VLANs autorisés</li>
        <li className="flex gap-2"><span className="text-emerald-400">•</span> <code className="bg-slate-900 px-1 rounded font-mono">show ip interface brief</code> (routeur) — Sous-interfaces et IP</li>
      </ul>
    </section>

    <div className="bg-amber-900/20 border-t border-amber-500/30 p-6 rounded-xl">
      <p className="text-amber-200 text-sm font-medium flex items-center gap-2">
        <CheckCircle className="w-5 h-5" /> 
        Ce lab récapitule Session 1 (sécurisation, sauvegarde), Session 2 (VLANs, ports access) et Session 3 (trunk, Router-on-a-Stick).
      </p>
    </div>
  </div>
);

// --- CORRECTION LAB 1 – Session 1 (NovaTech) – Format compact commande par commande ---
const LabCorrectionSection = () => (
  <div className="space-y-10 text-slate-200 text-base leading-relaxed pb-16">
    <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-xl p-5">
      <p className="text-emerald-200 font-semibold text-lg mb-2">Correction Lab S1 – NovaTech</p>
      <p className="text-slate-300 text-sm">Configuration à reproduire sur Cisco Packet Tracer. Commande par commande.</p>
    </div>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">1. Routeur R-Nova – Base</h4>
      <CmdBlock lines={[
        { prompt: "Router>", cmd: "enable" },
        { prompt: "Router#", cmd: "configure terminal" },
        { prompt: "Router(config)#", cmd: "hostname R-Nova" },
        { prompt: "R-Nova(config)#", cmd: "no ip domain-lookup" },
        { prompt: "R-Nova(config)#", cmd: "enable secret cisco123" },
        { prompt: "R-Nova(config)#", cmd: "line console 0" },
        { prompt: "R-Nova(config-line)#", cmd: "password console123" },
        { prompt: "R-Nova(config-line)#", cmd: "login" },
        { prompt: "R-Nova(config-line)#", cmd: "exit" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">2. Routeur R-Nova – Interface IP</h4>
      <CmdBlock lines={[
        { prompt: "R-Nova(config)#", cmd: "interface gigabitEthernet0/0" },
        { prompt: "R-Nova(config-if)#", cmd: "ip address 192.168.10.1 255.255.255.0" },
        { prompt: "R-Nova(config-if)#", cmd: "no shutdown" },
        { prompt: "R-Nova(config-if)#", cmd: "exit" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">3. Switches SW-Entrée & SW-Bureau</h4>
      <p className="text-slate-400 text-sm mb-2">Sur chaque switch : hostname, IP sur interface vlan 1, mot de passe console.</p>
      <CmdBlock lines={[
        { prompt: "Switch>", cmd: "enable" },
        { prompt: "Switch#", cmd: "configure terminal" },
        { prompt: "Switch(config)#", cmd: "hostname SW-Entrée" },
        { prompt: "SW-Entrée(config)#", cmd: "interface vlan 1" },
        { prompt: "SW-Entrée(config-if)#", cmd: "ip address 192.168.10.2 255.255.255.0" },
        { prompt: "SW-Entrée(config-if)#", cmd: "no shutdown" },
        { prompt: "SW-Entrée(config-if)#", cmd: "exit" }
      ]} />
      <p className="text-slate-500 text-xs mt-2">SW-Bureau : IP 192.168.10.3. Même principe.</p>
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">4. PC & Serveur TFTP</h4>
      <p className="text-slate-300 text-sm">PC : IP 192.168.10.10, masque /24, passerelle 192.168.10.1. Serveur : activer TFTP dans Services.</p>
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">5. Sauvegarde</h4>
      <CmdBlock lines={[
        { prompt: "R-Nova#", cmd: "copy running-config startup-config" },
        { prompt: "R-Nova#", cmd: "copy startup-config tftp:" }
      ]} />
    </section>
  </div>
);

// --- Ancienne version détaillée (conservée pour référence) ---
const LabCorrectionSectionVerbose = () => (
  <div className="max-w-4xl mx-auto space-y-12 text-slate-200 text-base leading-loose pb-16">
    <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/20 border border-emerald-500/40 rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-3">
        <CheckCircle className="w-8 h-8 text-emerald-400 flex-shrink-0" /> Correction Lab 1 – Session 1
      </h1>
      <p className="text-emerald-100/90 text-lg leading-relaxed">Réseau local NovaTech : correction complète avec explications à chaque étape.</p>
    </div>

    <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis:</span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">🧠</span>
          {[
            { id: 'lab1-routeur-hostname', label: 'Hostname + DNS', icon: '🏷️' },
            { id: 'lab1-routeur-ip', label: 'IP interface', icon: '📡' },
            { id: 'lab1-routeur-password', label: 'Mots de passe', icon: '🔒' },
            { id: 'lab1-routeur-verify', label: 'Vérification', icon: '✅' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-emerald-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
            >
              <span className="text-[10px]">{icon}</span> {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">🟨</span>
          {[
            { id: 'lab1-pc-ip', label: 'IP + Gateway', icon: '🟨' },
            { id: 'lab1-pc-ping', label: 'Test ping', icon: '📶' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-emerald-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
            >
              <span className="text-[10px]">{icon}</span> {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">🟦</span>
          {[
            { id: 'lab1-switch-entree', label: 'SW-Entrée', icon: '🟦' },
            { id: 'lab1-switch-bureau', label: 'SW-Bureau', icon: '🟦' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-emerald-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
            >
              <span className="text-[10px]">{icon}</span> {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">🟪</span>
          {[
            { id: 'lab1-config-tftp', label: 'Config TFTP', icon: '🟪' },
            { id: 'lab1-sauvegarde-tftp', label: 'Sauvegarde', icon: '💾' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-emerald-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
            >
              <span className="text-[10px]">{icon}</span> {label}
            </button>
          ))}
        </div>
      </div>
    </nav>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">🎯 Objectif final</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Ce lab vise à créer un petit réseau local pour le client NovaTech. À la fin, tu dois avoir :</p>
      <ul className="list-none space-y-4 ml-0 text-slate-300">
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">1-</span> <span><strong>Les machines peuvent communiquer</strong> — le PC peut ping le routeur et les autres équipements du même réseau.</span></li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">2-</span> <span><strong>Le réseau est configuré et sécurisé</strong> — chaque équipement a un nom, une IP cohérente, et les ports nécessaires sont activés.</span></li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">3-</span> <span><strong>Les configurations sont sauvegardées</strong> — en local (NVRAM) sur chaque routeur/switch, et en copie sur le serveur TFTP pour archivage.</span></li>
      </ul>
      <p className="mt-6 text-slate-400 border-l-4 border-emerald-500/50 pl-4 py-1">👉 Suis les étapes dans l’ordre : le câblage puis les IP, sinon rien ne communiquera.</p>
    </section>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🧩 Étape 0 — Comprendre les rôles</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Avant de toucher Packet Tracer, il faut savoir <strong>qui fait quoi</strong>. Sinon tu branches au hasard et tu ne comprends pas pourquoi ça ne marche pas.</p>
      <div className="overflow-x-auto rounded-xl border border-slate-600 mb-6">
        <table className="w-full text-left">
          <thead><tr className="bg-slate-700/80 text-slate-200"><th className="px-5 py-3 font-bold">Équipement</th><th className="px-5 py-3 font-bold">Rôle</th></tr></thead>
          <tbody className="text-slate-300">
            <tr className="border-t border-slate-600"><td className="px-5 py-3 font-medium align-top w-40">Routeur</td><td className="px-5 py-3 leading-relaxed">Relie les réseaux et sert de <strong>passerelle</strong> : c’est lui qui aura l’IP 192.168.10.1 et que le PC utilisera pour sortir du réseau (gateway).</td></tr>
            <tr className="border-t border-slate-600"><td className="px-5 py-3 font-medium align-top">Switch</td><td className="px-5 py-3 leading-relaxed">Relie les machines dans le <strong>même réseau local</strong> : PC, serveur et routeur sont branchés sur les switches ; le switch ne route pas, il aiguille les trames.</td></tr>
            <tr className="border-t border-slate-600"><td className="px-5 py-3 font-medium align-top">PC</td><td className="px-5 py-3 leading-relaxed">Poste utilisateur pour les <strong>tests (ping)</strong> et l’administration ; on lui donne une IP dans le même réseau que le routeur.</td></tr>
            <tr className="border-t border-slate-600"><td className="px-5 py-3 font-medium align-top">Serveur TFTP</td><td className="px-5 py-3 leading-relaxed">Stocke les <strong>sauvegardes de configuration</strong> (fichiers .cfg) envoyées par les routeurs et switches ; on l’utilise avec <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">copy startup-config tftp:</code>.</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-slate-400 leading-relaxed"><strong>En résumé :</strong> Un réseau qui fonctionne = <strong>câbles corrects</strong> + <strong>adresses IP dans le même réseau</strong> + <strong>ports activés</strong> (surtout sur le routeur).</p>
    </section>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🟦 Étape 1 — Placer les équipements</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Tu construis le schéma physique du lab : un routeur, deux switches, un PC et un serveur. Peu importe le modèle exact (1841, 2960, etc.), Packet Tracer s’adapte.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">1.1 Où cliquer</h3>
      <ul className="list-none space-y-3 ml-0 text-slate-300">
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">1-</span> En bas de l’écran : <strong>Network Devices</strong> → choisis un <strong>Routeur</strong> et un <strong>Switch</strong> (tu en placeras deux).</li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">2-</span> <strong>End Devices</strong> → choisis un <strong>PC</strong> et un <strong>Server</strong>.</li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">3-</span> Clique sur la zone de travail pour déposer chaque appareil ; arrange-les pour que les câbles soient lisibles (ex. routeur à gauche, switches au centre, PC et serveur à droite).</li>
      </ul>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">1.2 Équipements à placer</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Exactement : <strong>1 routeur</strong>, <strong>2 switches</strong>, <strong>1 PC</strong>, <strong>1 serveur</strong>. Pas de deuxième routeur ni de deuxième PC pour ce lab.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">1.3 Renommer les équipements</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">Pour savoir qui est qui (comme en entreprise), renomme chaque appareil : <strong>clic sur l’équipement → onglet Config → Display Name</strong>. Saisis le nom puis valide.</p>
      <ul className="list-none space-y-3 ml-0 text-slate-300">
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">1-</span> Routeur → <strong>R-Nova</strong></li>
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">2-</span> Premier switch → <strong>SW-Entrée</strong></li>
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">3-</span> Deuxième switch → <strong>SW-Bureau</strong></li>
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">4-</span> PC → <strong>Tech-PC</strong></li>
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">5-</span> Serveur → <strong>Srv-TFTP</strong></li>
      </ul>
      <p className="mt-6 text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-1">✅ Vérification : tu dois voir ces cinq noms directement sous les icônes sur le schéma.</p>
    </section>

    <section className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-emerald-500 mb-6">🟩 Étape 2 — Le câblage</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Sans les bons câbles au bon endroit, aucun trafic ne passe. Il existe plusieurs types de câbles dans Packet Tracer ; pour ce lab on n’en utilise qu’un seul.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">2.1 Quel câble utiliser ?</h3>
      <p className="text-slate-300 mb-3 leading-relaxed">Câble à utiliser : <strong>vert clair</strong>, nommé <strong>Copper Straight-Through</strong>. Il transporte le trafic Ethernet (données).</p>
      <p className="text-red-300/90 mb-6 border-l-4 border-red-500/50 pl-4 py-2">🚫 Le câble <strong>bleu clair</strong> (console) sert à configurer un équipement en local, pas à faire circuler le réseau. Ne l’utilise pas ici.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">2.2 Pourquoi ce câble ?</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">PC ↔ Switch, Switch ↔ Routeur et Serveur ↔ Switch = connexions <strong>Ethernet</strong>. Le Copper Straight-Through est fait pour ça. On l’utilise partout dans ce lab.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">2.3 Brancher (clic par clic)</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">Clique sur l’icône <strong>⚡ Connections</strong>, puis sur le <strong>câble vert clair</strong>. Premier clic = premier appareil + port ; deuxième clic = second appareil + port.</p>
      <ul className="list-none space-y-5 ml-0 text-slate-300">
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">A)</span> <span><strong>Routeur → Switch</strong><br />R-Nova → GigabitEthernet0/0 ; puis SW-Entrée → FastEthernet0/1.</span></li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">B)</span> <span><strong>PC → Switch</strong><br />Tech-PC → FastEthernet0 ; puis SW-Entrée → FastEthernet0/2.</span></li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">C)</span> <span><strong>Serveur → Switch</strong><br />Srv-TFTP → FastEthernet0 ; puis SW-Entrée → FastEthernet0/3.</span></li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">D)</span> <span><strong>Switch → Switch</strong><br />SW-Entrée → FastEthernet0/4 ; puis SW-Bureau → FastEthernet0/1.</span></li>
      </ul>
      <p className="mt-6 text-amber-300/90 border-l-4 border-amber-500/50 pl-4 py-2">⏱️ Après le branchement, attends 10 à 20 secondes. Les liens passent de l’orange au vert quand la liaison est opérationnelle.</p>
    </section>

    <section className="bg-slate-800/50 border border-red-500/30 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-red-400 mb-6">🔴 Étape 3 — Pourquoi c’était rouge ?</h2>
      <p className="text-slate-300 mb-4 leading-relaxed">Sur les routeurs Cisco, les ports sont <strong>fermés (shutdown)</strong> par défaut. Même avec un câble bien branché, le lien reste rouge tant que le port n’est pas activé.</p>
      <p className="text-slate-300 mb-4 leading-relaxed">En résumé : <strong>câble OK</strong> + <strong>port OFF</strong> = rouge. Il faut « allumer » le port avec <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono">no shutdown</code> (étape 4 sur le routeur).</p>
      <p className="text-slate-400 leading-relaxed">Sur les switches, l’interface VLAN 1 peut aussi être down par défaut ; on l’active avec <code className="bg-slate-900 px-1 rounded text-emerald-400 font-mono text-sm">no shutdown</code> à l’étape 6.</p>
    </section>

    <section id="lab1-config-routeur" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🧠 Étape 4 — Configuration du routeur (R-Nova)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Le routeur doit avoir une IP sur son interface connectée au switch (192.168.10.1) et le port doit être activé. C’est la passerelle du réseau.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">4.1 Ouvrir le routeur</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Clique sur <strong>R-Nova</strong> → onglet <strong>CLI</strong>. Si le routeur demande « Would you like to enter the initial configuration dialog? », tape <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">no</code> puis Entrée.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">4.2 Passer en mode admin</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Par défaut tu es en mode utilisateur (prompt <code className="bg-slate-900 px-1 rounded font-mono text-sm">Router&gt;</code>). Tape <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">enable</code> → le prompt devient <code className="bg-slate-900 px-1 rounded font-mono text-sm">Router#</code>.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">4.3 Entrer en configuration</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Tape <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">configure terminal</code> (ou <code className="bg-slate-900 px-1 rounded font-mono text-sm">conf t</code>). Le prompt devient <code className="bg-slate-900 px-1 rounded font-mono text-sm">Router(config)#</code>.</p>
      <h3 id="lab1-routeur-hostname" className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2 scroll-mt-4">4.4 Renommer + bloquer le DNS</h3>
      <ul className="list-none space-y-4 ml-0 text-slate-300 mb-6">
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">1-</span> <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">hostname R-Nova</code> — le prompt devient R-Nova(config)#.</li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">2-</span> <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">no ip domain-lookup</code> — désactive la résolution DNS (évite les délais en cas de faute de frappe).</li>
      </ul>
      <h3 id="lab1-routeur-ip" className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2 scroll-mt-4">4.5 Donner une IP et activer le port</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">IP <strong>192.168.10.1</strong> sur l’interface GigabitEthernet0/0, puis <strong>no shutdown</strong> pour activer le port.</p>
      <div className="space-y-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface gigabitEthernet0/0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sélectionner l'interface GigabitEthernet0/0 qui est connectée au switch. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">R-Nova(config-if)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip address 192.168.10.1 255.255.255.0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Attribuer l'adresse IP 192.168.10.1 avec le masque de sous-réseau 255.255.255.0 (équivalent à /24). Cette IP sera la passerelle du réseau pour tous les équipements.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">no shutdown</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer le port. Par défaut, les ports des routeurs sont désactivés (shutdown). Cette commande les active. Le lien vers le switch devrait passer au vert après quelques secondes.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration et revenir au mode privilégié. Le prompt redevient <code className="bg-slate-800 px-1 rounded text-xs">R-Nova#</code>.</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-none space-y-3 ml-0 text-slate-300 mb-6">
        <li className="flex gap-3 items-start"><span className="text-emerald-400 shrink-0">•</span> <code className="bg-slate-900 px-1 rounded font-mono text-sm">interface gigabitEthernet0/0</code> — config de l’interface.</li>
        <li className="flex gap-3 items-start"><span className="text-emerald-400 shrink-0">•</span> <code className="bg-slate-900 px-1 rounded font-mono text-sm">ip address …</code> — IP et masque 192.168.10.0/24.</li>
        <li className="flex gap-3 items-start"><span className="text-emerald-400 shrink-0">•</span> <code className="bg-slate-900 px-1 rounded font-mono text-sm">no shutdown</code> — active le port.</li>
        <li className="flex gap-3 items-start"><span className="text-emerald-400 shrink-0">•</span> <code className="bg-slate-900 px-1 rounded font-mono text-sm">end</code> — sort de la config.</li>
      </ul>
      <h3 id="lab1-routeur-verify" className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2 scroll-mt-4">4.6 Vérifier</h3>
      <p className="text-slate-300 mb-3 leading-relaxed">Tape <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">show ip interface brief</code>. Tu dois voir :</p>
      <p className="text-slate-300 font-mono text-sm bg-slate-900/50 rounded-lg px-4 py-3 mb-4">GigabitEthernet0/0  192.168.10.1  YES  manual  up  up</p>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-1">✅ Si l’interface est <strong>up up</strong> avec 192.168.10.1, le routeur est prêt. Le lien vers le switch devrait être vert.</p>
      
      <h3 id="lab1-routeur-password" className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2 scroll-mt-4">4.7 Sécuriser le routeur (mots de passe)</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Par défaut, n'importe qui peut accéder au routeur sans mot de passe. Il faut sécuriser l'accès console et le mode privilégié.</p>
      
      <div className="space-y-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">enable secret cisco123</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Définir le mot de passe pour accéder au mode privilégié (mode #). Ce mot de passe est chiffré (hashé MD5) et sécurisé. Remplace "cisco123" par un mot de passe fort.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">line console 0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Configurer l'accès console physique (le port console du routeur). Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">R-Nova(config-line)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">password console123</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Définir le mot de passe pour l'accès console. Remplace "console123" par un mot de passe fort. Ce mot de passe sera demandé lors de la connexion via le câble console.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">login</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer la demande de mot de passe à la connexion. <strong>Sans cette commande, le mot de passe ne sera pas demandé !</strong> Cette commande active réellement l'authentification console.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration de ligne et revenir au mode configuration globale. Le prompt redevient <code className="bg-slate-800 px-1 rounded text-xs">R-Nova(config)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration et revenir au mode privilégié. Le prompt redevient <code className="bg-slate-800 px-1 rounded text-xs">R-Nova#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Nova#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">copy running-config startup-config</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sauvegarder la configuration dans la NVRAM. Sans cette commande, les mots de passe seront perdus lors du redémarrage du routeur.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-500/10 border-l-4 border-blue-500/50 rounded-r-lg p-4 mb-6">
        <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-2 text-sm">
          <span>💡</span> Pourquoi deux mots de passe ?
        </h4>
        <div className="text-slate-300 text-sm leading-relaxed space-y-2">
          <p>
            <strong>Mot de passe console :</strong> Protège l'accès physique au routeur via le câble console (port physique). C'est le premier niveau de sécurité.
          </p>
          <p>
            <strong>Enable secret :</strong> Protège l'accès au mode privilégié (#) où tu peux modifier la configuration. Même si quelqu'un accède au routeur, il ne pourra pas faire de modifications sans ce mot de passe.
          </p>
          <p className="text-emerald-300/90 font-medium mt-2">
            ✅ <strong>Important :</strong> Utilise toujours <code className="bg-slate-800 px-1 rounded text-xs">enable secret</code> plutôt que <code className="bg-slate-800 px-1 rounded text-xs">enable password</code>, car le secret est chiffré et plus sécurisé.
          </p>
        </div>
      </div>
    </section>

    <section id="lab1-config-pc" className="bg-slate-800/50 border border-amber-500/30 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-amber-400 mb-6">🟨 Étape 5 — IP du PC (test)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Le PC doit être dans le <strong>même réseau</strong> que le routeur (192.168.10.0/24) et avoir la <strong>passerelle par défaut</strong> = 192.168.10.1 pour communiquer.</p>
      <h3 id="lab1-pc-ip" className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2 scroll-mt-4">5.1 Configuration IP du PC</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">Clique sur <strong>Tech-PC</strong> → <strong>Desktop</strong> → <strong>IP Configuration</strong>. Renseigne :</p>
      <ul className="list-none space-y-3 ml-0 text-slate-300 mb-6">
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">1-</span> <strong>IP Address</strong> : 192.168.10.20</li>
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">2-</span> <strong>Subnet Mask</strong> : 255.255.255.0</li>
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">3-</span> <strong>Default Gateway</strong> : 192.168.10.1</li>
      </ul>
      
      <div className="bg-blue-500/10 border-l-4 border-blue-500/50 rounded-r-lg p-4 mb-6">
        <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-2 text-sm">
          <span>💡</span> Qu'est-ce que la passerelle par défaut (Default Gateway) ?
        </h4>
        <div className="text-slate-300 text-sm leading-relaxed space-y-2">
          <p>
            La <strong>passerelle par défaut</strong> (ou <strong>gateway</strong>) est l'adresse IP du routeur qui sert de <strong>point de sortie</strong> pour tous les trafics destinés à des réseaux différents du réseau local.
          </p>
          <p>
            <strong>Dans ce lab :</strong> Le PC (192.168.10.20) est sur le réseau 192.168.10.0/24. La passerelle 192.168.10.1 correspond à l'interface du routeur R-Nova connectée au même réseau.
          </p>
          <p>
            <strong>Pourquoi c'est important ?</strong>
          </p>
          <ul className="list-disc list-inside ml-2 space-y-1 text-slate-300">
            <li>Sans passerelle, le PC ne peut communiquer qu'avec les autres appareils sur son propre réseau (192.168.10.x).</li>
            <li>Avec la passerelle, le PC peut envoyer des paquets vers d'autres réseaux (ex. Internet, autres VLANs, etc.).</li>
            <li>Quand le PC veut joindre une adresse hors de son réseau, il envoie le paquet à la passerelle, qui le route vers la destination.</li>
          </ul>
          <p className="text-emerald-300/90 font-medium mt-3">
            💡 <strong>Analogie :</strong> La passerelle est comme la porte de sortie de ton quartier. Pour aller ailleurs, tu dois passer par cette porte !
          </p>
        </div>
      </div>
      
      <h3 id="lab1-pc-ping" className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2 scroll-mt-4">5.2 Test (ping)</h3>
      <p className="text-slate-300 mb-3 leading-relaxed">Tech-PC → <strong>Desktop</strong> → <strong>Command Prompt</strong>. Tape :</p>
      <p className="font-mono text-sm bg-black/50 rounded-xl px-5 py-3 text-emerald-300 mb-4">ping 192.168.10.1</p>
      <p className="text-slate-300 mb-4 leading-relaxed">Tu dois voir des réponses du type « Reply from 192.168.10.1: bytes=32 time=1ms TTL=64 ».</p>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-1">✅ Si le ping répond → le réseau fonctionne. Tu peux enchaîner sur la config des switches.</p>
    </section>

    <section id="lab1-config-switch" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">🟦 Étape 6 — Configuration des switches</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Un switch n’a <strong>pas besoin d’IP pour faire circuler les trames</strong>. Pour l’<strong>administrer à distance</strong> (SSH, TFTP), il doit avoir une IP et une passerelle. On configure <strong>VLAN 1</strong> (management) et <strong>ip default-gateway</strong> vers le routeur.</p>
      <h3 id="lab1-switch-entree" className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2 scroll-mt-4">6.1 Sur SW-Entrée</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Clique sur <strong>SW-Entrée</strong> → <strong>CLI</strong>. Tape <code className="bg-slate-900 px-1 rounded font-mono text-sm">no</code> si demandé, puis :</p>
      
      <div className="space-y-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch&gt;</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">enable</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Passer en mode privilégié pour avoir accès aux commandes de configuration. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">Switch#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">Switch(config)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">hostname SW-Entree</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Renommer le switch pour l'identifier facilement. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">SW-Entree(config)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Entree(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface vlan 1</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Ouvrir l'interface virtuelle du VLAN 1 (interface de management). Sur un switch, on configure l'IP sur une interface virtuelle (SVI - Switch Virtual Interface) et non sur un port physique. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">SW-Entree(config-if)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Entree(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip address 192.168.10.2 255.255.255.0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Attribuer l'adresse IP 192.168.10.2 avec le masque 255.255.255.0 au switch. Cette IP permet de l'administrer à distance (SSH, ping, TFTP).</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Entree(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">no shutdown</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer l'interface VLAN 1. Par défaut, les interfaces virtuelles peuvent être désactivées. Cette commande les active.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Entree(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode interface et revenir au mode configuration globale. Le prompt redevient <code className="bg-slate-800 px-1 rounded text-xs">SW-Entree(config)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Entree(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip default-gateway 192.168.10.1</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Configurer la passerelle par défaut du switch vers le routeur (192.168.10.1). Cette commande permet au switch de communiquer avec des réseaux différents du sien (ex. pour envoyer des sauvegardes TFTP vers un serveur sur un autre réseau).</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Entree(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration et revenir au mode privilégié. Le prompt redevient <code className="bg-slate-800 px-1 rounded text-xs">SW-Entree#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Entree#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">copy running-config startup-config</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sauvegarder la configuration dans la NVRAM (mémoire non volatile). Sans cette commande, la configuration sera perdue lors du redémarrage du switch. Tu peux aussi utiliser <code className="bg-slate-800 px-1 rounded text-xs">wr</code> (write) comme raccourci.</p>
            </div>
          </div>
        </div>
      </div>
      <h3 id="lab1-switch-bureau" className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2 scroll-mt-4">6.2 Sur SW-Bureau</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Même principe : IP <strong>192.168.10.3</strong> sur VLAN 1, même masque, même passerelle 192.168.10.1. Puis sauvegarde.</p>
      
      <div className="space-y-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch&gt;</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">enable</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Passer en mode privilégié. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">Switch#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">Switch(config)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">hostname SW-Bureau</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Renommer le switch. Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">SW-Bureau(config)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Bureau(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface vlan 1</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Ouvrir l'interface virtuelle du VLAN 1 (management). Le prompt devient <code className="bg-slate-800 px-1 rounded text-xs">SW-Bureau(config-if)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Bureau(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip address 192.168.10.3 255.255.255.0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Attribuer l'adresse IP 192.168.10.3 avec le masque 255.255.255.0 au switch SW-Bureau.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Bureau(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">no shutdown</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Activer l'interface VLAN 1.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Bureau(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode interface. Le prompt redevient <code className="bg-slate-800 px-1 rounded text-xs">SW-Bureau(config)#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Bureau(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip default-gateway 192.168.10.1</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Configurer la passerelle par défaut vers le routeur (192.168.10.1).</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Bureau(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration. Le prompt redevient <code className="bg-slate-800 px-1 rounded text-xs">SW-Bureau#</code>.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Bureau#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">copy running-config startup-config</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sauvegarder la configuration dans la NVRAM pour qu'elle persiste après le redémarrage.</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-1">✅ Après les deux switches : chaque équipement a un nom, une IP dans 192.168.10.0/24, et les configs sont sauvegardées en local.</p>
    </section>

    <section id="lab1-config-tftp" className="bg-slate-800/50 border border-violet-500/30 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-violet-400 mb-6">🟪 Étape 7 — Serveur TFTP</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Le serveur TFTP reçoit les fichiers de configuration. Il doit être dans le même réseau (192.168.10.0/24) et le <strong>service TFTP doit être activé</strong>.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">7.1 IP du serveur</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">Clique sur <strong>Srv-TFTP</strong> → <strong>Config</strong> (ou <strong>Desktop</strong>) → section <strong>IP</strong>. Saisis :</p>
      <ul className="list-none space-y-3 ml-0 text-slate-300 mb-6">
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">1-</span> <strong>IP Address</strong> : 192.168.10.10</li>
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">2-</span> <strong>Subnet Mask</strong> : 255.255.255.0</li>
        <li className="flex gap-3"><span className="font-bold text-emerald-400/90 shrink-0">3-</span> <strong>Default Gateway</strong> : 192.168.10.1</li>
      </ul>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">7.2 Activer le service TFTP</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">Dans le même appareil : <strong>Services</strong> (ou <strong>Config → Services</strong>) → onglet <strong>TFTP</strong> → <strong>ON</strong>. Sans ça, les routeurs/switches ne pourront pas envoyer leur config.</p>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-1">✅ Le serveur est prêt à recevoir les sauvegardes.</p>
    </section>

    <section id="lab1-sauvegarde-tftp" className="bg-slate-800/50 border border-amber-700/40 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-amber-300 mb-6">🟫 Étape 8 — Sauvegarde vers TFTP</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">On envoie une copie de la configuration (déjà en NVRAM) vers le serveur TFTP pour avoir une copie centralisée.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">Sur le routeur ou un switch (mode privilégié)</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">Tape :</p>
      <p className="font-mono text-sm bg-black/50 rounded-xl px-5 py-3 text-emerald-300 mb-6">copy startup-config tftp:</p>
      <p className="text-slate-300 mb-4 leading-relaxed">Le routeur/switch demande :</p>
      <ul className="list-none space-y-3 ml-0 text-slate-300 mb-6">
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">1-</span> <strong>Address or name of remote host</strong> : <strong>192.168.10.10</strong></li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">2-</span> <strong>Destination filename</strong> : ex. <strong>R-Nova.cfg</strong>, <strong>SW-Entree.cfg</strong>, <strong>SW-Bureau.cfg</strong></li>
      </ul>
      <p className="text-slate-300 mb-4 leading-relaxed">Si tout est bon : « Writing … !!! » puis « [OK] ».</p>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-1">✅ Sauvegarde locale (NVRAM) + copie sur TFTP. Restauration possible avec <code className="bg-slate-900 px-1 rounded font-mono text-sm">copy tftp: startup-config</code>.</p>
    </section>

    <section className="bg-gradient-to-br from-emerald-900/20 to-slate-800/50 border border-emerald-500/40 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">🎉 Ce que tu sais faire maintenant</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">À la fin de ce lab, tu es capable de :</p>
      <ul className="list-none space-y-4 ml-0 text-slate-300">
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">1-</span> <strong>Câbler un réseau</strong> — Copper Straight-Through, brancher routeur, switches, PC et serveur.</li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">2-</span> <strong>Comprendre les ports</strong> — lien rouge = port shutdown ; <code className="bg-slate-900 px-1 rounded font-mono text-sm">no shutdown</code> pour activer.</li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">3-</span> <strong>Activer un routeur</strong> — IP sur l’interface + <code className="bg-slate-900 px-1 rounded font-mono text-sm">no shutdown</code>.</li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">4-</span> <strong>Donner des IP</strong> — PC, routeur et switches dans le même réseau, passerelle cohérente.</li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">5-</span> <strong>Tester avec ping</strong> — vérifier la connectivité PC ↔ routeur.</li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">6-</span> <strong>Sauvegarder avec TFTP</strong> — <code className="bg-slate-900 px-1 rounded font-mono text-sm">copy startup-config tftp:</code> pour une copie sur le serveur.</li>
      </ul>
      <p className="mt-6 text-slate-400 border-t border-slate-600 pt-6 leading-relaxed">👉 Prochaine étape possible : <strong>sécurité</strong> (mot de passe console, enable secret, SSH) ou un résumé « anti-stress examen ».</p>
    </section>
  </div>
);

// --- CORRECTION LAB 2 – Session 1 (SSH) – Format compact ---
const LabCorrectionSection2 = () => (
  <div className="space-y-10 text-slate-200 text-base leading-relaxed pb-16">
    <div className="bg-blue-900/20 border border-blue-500/40 rounded-xl p-5">
      <p className="text-blue-200 font-semibold text-lg mb-2">Correction Lab S2 – SSH</p>
      <p className="text-slate-300 text-sm">R-Sec, SW-Core, PC-Tech. Configuration SSH.</p>
    </div>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">1. Routeur R-Sec – IP et SSH</h4>
      <CmdBlock lines={[
        { prompt: "Router>", cmd: "enable" },
        { prompt: "Router#", cmd: "configure terminal" },
        { prompt: "Router(config)#", cmd: "hostname R-Sec" },
        { prompt: "R-Sec(config)#", cmd: "interface g0/0" },
        { prompt: "R-Sec(config-if)#", cmd: "ip address 192.168.1.1 255.255.255.0" },
        { prompt: "R-Sec(config-if)#", cmd: "no shutdown" },
        { prompt: "R-Sec(config-if)#", cmd: "exit" },
        { prompt: "R-Sec(config)#", cmd: "ip domain-name novatech.local" },
        { prompt: "R-Sec(config)#", cmd: "username admin privilege 15 secret admin123" },
        { prompt: "R-Sec(config)#", cmd: "crypto key generate rsa" },
        { prompt: "R-Sec(config)#", cmd: "line vty 0 4" },
        { prompt: "R-Sec(config-line)#", cmd: "login local" },
        { prompt: "R-Sec(config-line)#", cmd: "transport input ssh" },
        { prompt: "R-Sec(config-line)#", cmd: "exit" },
        { prompt: "R-Sec(config)#", cmd: "exit" },
        { prompt: "R-Sec#", cmd: "copy running-config startup-config" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">2. Switch SW-Core</h4>
      <CmdBlock lines={[
        { prompt: "Switch(config)#", cmd: "interface vlan 1" },
        { prompt: "Switch(config-if)#", cmd: "ip address 192.168.1.2 255.255.255.0" },
        { prompt: "Switch(config-if)#", cmd: "no shutdown" }
      ]} />
    </section>
    <section className="bg-slate-800/60 border border-slate-600 rounded-xl p-6 space-y-4">
      <h4 className="text-emerald-400 font-bold">3. Test SSH</h4>
      <p className="text-slate-300 text-sm">Depuis PC-Tech (IP 192.168.1.10) : <code className="text-emerald-400">ssh -l admin 192.168.1.1</code></p>
    </section>
  </div>
);

const _LabCorrectionSection2Verbose = () => (
  <div className="max-w-4xl mx-auto space-y-12 text-slate-200 text-base leading-loose pb-16 hidden">
    <nav className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-600 py-2 mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider shrink-0">Raccourcis:</span>
        {[
          { id: 'lab2ssh-cablage', label: 'Câblage', icon: '🔌' },
          { id: 'lab2ssh-ip', label: 'Config IP', icon: '📡' },
          { id: 'lab2ssh-users', label: 'Comptes locaux', icon: '👤' },
          { id: 'lab2ssh-ssh', label: 'Activer SSH', icon: '🔐' },
          { id: 'lab2ssh-vty', label: 'VTY (SSH only)', icon: '📋' },
          { id: 'lab2ssh-save', label: 'Sauvegarder', icon: '💾' },
          { id: 'lab2ssh-tests', label: 'Tests SSH', icon: '✅' },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-2 py-0.5 rounded-md bg-slate-700/80 hover:bg-blue-600/80 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
          >
            <span className="text-[10px]">{icon}</span> {label}
          </button>
        ))}
      </div>
    </nav>

    <section id="lab2ssh-cablage" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">Étape 1 — Câblage (PC → Switch → Routeur)</h2>
      <h3 className="text-slate-200 font-bold mb-3 mt-6 border-b border-slate-600 pb-2">À faire</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Utilise le câble automatique (⚡) ou <strong>Copper Straight-Through</strong> (vert clair) :</p>
      <ul className="list-none space-y-4 ml-0 text-slate-300 mb-6">
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">1-</span> <strong>PC-Tech</strong> ↔ <strong>SW-Core</strong></li>
        <li className="flex gap-3 items-start"><span className="font-bold text-emerald-400/90 shrink-0">2-</span> <strong>SW-Core</strong> ↔ <strong>R-Sec</strong></li>
      </ul>
      <p className="text-slate-400 mb-6 leading-relaxed"><strong>Pourquoi ?</strong> Sans lien physique, aucune IP/SSH ne marchera.</p>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-2">Vérif : les liens deviennent 🟢 (ou 🟠 puis 🟢).</p>
    </section>

    <section id="lab2ssh-ip" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">Étape 2 — Adresses IP (obligatoire pour SSH)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">SSH se connecte à une <strong>adresse IP</strong>. Si le routeur et le switch n'ont pas d'IP, impossible de les joindre à distance. Le PC doit aussi être dans le même réseau (192.168.1.0/24) pour atteindre ces équipements.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">2A) Routeur R-Sec : IP 192.168.1.1/24</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Sur <strong>R-Sec</strong> → CLI :</p>
      <div className="space-y-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router&gt;</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">enable</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">En mode utilisateur (prompt <code className="bg-slate-800 px-1 rounded text-xs">&gt;</code>), tu ne peux que consulter. <strong>enable</strong> te donne les droits d’administration : tu peux modifier la config, redémarrer, etc. Le # indique le mode privilégié.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">C’est le mode où tu modifies la configuration (IP, hostname, mots de passe…). Tant que tu es en <code className="bg-slate-800 px-1 rounded text-xs">(config)#</code>, chaque commande est enregistrée dans la config en cours (running-config). Raccourci possible : <code className="bg-slate-800 px-1 rounded text-xs">conf t</code>.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Router(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">hostname R-Sec</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Un nom clair permet d’identifier l’équipement dans un réseau avec plusieurs routeurs. Utile pour les logs et quand on se connecte en SSH : tu sais tout de suite sur quel appareil tu es.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface gigabitEthernet0/0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0"><strong>GigabitEthernet0/0</strong> est le port physique branché au switch. Sur un routeur, chaque interface a une IP dans un réseau différent. Ici, g0/0 sera dans le réseau 192.168.1.0/24, celui du lab.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip address 192.168.1.1 255.255.255.0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">192.168.1.1 sera la <strong>passerelle</strong> du réseau pour le PC et le switch, et l’adresse à laquelle tu te connecteras en SSH. Sans IP sur l’interface, aucune connexion distante n’est possible.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">no shutdown</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Par défaut, les interfaces Cisco sont en <strong>shutdown</strong> (désactivées). <code className="bg-slate-800 px-1 rounded text-xs">no shutdown</code> les active. Le câble doit passer au vert dans Packet Tracer après quelques secondes.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration et revenir au mode privilégié.</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-none space-y-4 ml-0 text-slate-300 mb-6 leading-relaxed">
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">enable</code> : passe en mode admin (#).</li>
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">configure terminal</code> : entre en mode config.</li>
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">hostname R-Sec</code> : renomme le routeur.</li>
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">interface gigabitEthernet0/0</code> : sélectionne le port branché au switch.</li>
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">ip address …</code> : donne l’IP (adresse SSH + passerelle).</li>
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">no shutdown</code> : allume le port.</li>
      </ul>
      <p className="text-slate-400 mb-3 leading-relaxed">Vérif routeur : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">show ip interface brief</code></p>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-2 mb-8">✅ Attendu : g0/0 192.168.1.1 up up</p>

      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">2B) Switch SW-Core : IP de gestion 192.168.1.2/24 (VLAN 1)</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Sur <strong>SW-Core</strong> → CLI. Un switch 2960 n’a pas d’IP sur les ports physiques ; l’IP se met sur <strong>VLAN 1</strong> (SVI) pour l’administration (SSH/ping/TFTP).</p>
      <div className="space-y-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch&gt;</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">enable</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Comme sur le routeur, le mode <code className="bg-slate-800 px-1 rounded text-xs">&gt;</code> est limité en lecture seule. <strong>enable</strong> ouvre l'accès aux commandes de configuration du switch.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Mode configuration globale : tu peux définir le hostname, les VLANs, l'IP de management… nécessaire pour toutes les étapes suivantes du switch.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">Switch(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">hostname SW-Core</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Même principe que sur le routeur : un nom explicite évite les confusions quand tu gères plusieurs équipements (ex. SW-Core, SW-Dist, SW-Entrée).</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">interface vlan 1</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Un switch est un appareil <strong>couche 2</strong> : il n’a pas d’IP sur les ports. L’IP de management se met sur une <strong>SVI</strong> (Switch Virtual Interface), ici VLAN 1. C’est cette IP que tu utiliseras pour SSH ou ping.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip address 192.168.1.2 255.255.255.0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">192.168.1.2 permet d’administrer le switch à distance : SSH, ping pour tester la connectivité, TFTP pour sauvegarder la config. Elle doit être dans le même réseau que le routeur (192.168.1.0/24).</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">no shutdown</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Comme pour une interface physique, la SVI peut être en shutdown. <strong>no shutdown</strong> l'active pour que le switch soit joignable via son IP 192.168.1.2.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-if)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode interface et revenir au mode configuration globale.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip default-gateway 192.168.1.1</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Le switch doit savoir où envoyer le trafic destiné à d’autres réseaux (ex. un serveur TFTP). La passerelle 192.168.1.1 (le routeur) indique la « porte de sortie ». Sans elle, le switch ne peut communiquer qu’avec les appareils du réseau 192.168.1.x.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration et revenir au mode privilégié.</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-slate-400 mb-3 leading-relaxed">Vérif switch : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">show ip interface brief</code></p>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-2 mb-8">✅ Attendu : Vlan1 192.168.1.2 up up</p>

      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">2C) PC-Tech : IP 192.168.1.10/24</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">Sur <strong>PC-Tech</strong> → Desktop → IP Configuration : IP <strong>192.168.1.10</strong>, Mask <strong>255.255.255.0</strong>, Gateway <strong>192.168.1.1</strong>. La passerelle est indispensable : c'est par elle que le PC envoie les paquets vers le routeur et le switch pour SSH.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">Test ping (OBLIGATOIRE avant SSH)</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">Avant de tester SSH, vérifie que la couche 3 fonctionne. PC-Tech → Command Prompt :</p>
      <p className="font-mono text-sm bg-black/50 rounded-xl px-5 py-3 text-emerald-300 mb-4 leading-relaxed">ping 192.168.1.1<br />ping 192.168.1.2</p>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-2">✅ Si les 2 répondent → la connectivité IP est OK. Tu peux passer à la configuration SSH.</p>
    </section>

    <section id="lab2ssh-users" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">Étape 3 — Créer les comptes locaux (SSH = login local)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">SSH demande un <strong>identifiant et un mot de passe</strong>. Au lieu d'un mot de passe unique (enable), on crée des utilisateurs locaux : chacun a son propre compte et ses droits (admin = tout, guest = limité).</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">3A) Sur le routeur R-Sec (2 comptes)</h3>
      <div className="space-y-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">username admin privilege 15 secret Admin123</code>
              <p className="text-slate-400 text-xs mt-1 ml-0"><strong>privilege 15</strong> = niveau maximum (équivalent à enable). <strong>secret</strong> chiffre le mot de passe (contrairement à <code className="bg-slate-800 px-1 rounded text-xs">password</code>). Cet utilisateur sera demandé lors de la connexion SSH.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">username guest privilege 1 secret Guest123</code>
              <p className="text-slate-400 text-xs mt-1 ml-0"><strong>privilege 1</strong> = mode utilisateur uniquement : peu de commandes, pas de modification de config. Idéal pour un accès restreint (consultation, tests limités).</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration.</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-slate-400 mb-3 leading-relaxed">Vérif : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">show running-config | include username</code></p>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">3B) Sur le switch SW-Core (1 compte admin)</h3>
      <div className="space-y-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">username admin privilege 15 secret Admin123</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Créer l'utilisateur admin. Le switch a besoin d'un utilisateur local pour <code className="bg-slate-800 px-1 rounded text-xs">login local</code> sur VTY.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration.</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-slate-400 leading-relaxed">Le switch a aussi besoin d’un user local si on fait <code className="bg-slate-900 px-1 rounded font-mono text-sm">login local</code> sur VTY.</p>
    </section>

    <section id="lab2ssh-ssh" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">Étape 4 — Activer SSH (domaine + clés RSA + SSH v2)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Par défaut, Cisco utilise Telnet (non chiffré). SSH chiffre toute la session. Pour l'activer, il faut générer une paire de clés RSA ; cela nécessite un nom de domaine (même fictif).</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">4A) Routeur R-Sec</h3>
      <div className="space-y-4 mb-8">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip domain-name novatech.local</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">SSH utilise des clés RSA. Cisco a besoin d'un nom de domaine (même factice) pour générer ces clés. Sans cette commande, <code className="bg-slate-800 px-1 rounded text-xs">crypto key generate rsa</code> échouera.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">crypto key generate rsa</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Les clés RSA chiffrent la session SSH. Quand le routeur demande la taille (modulus size), tape <strong>1024</strong> (minimum) ou <strong>2048</strong> pour plus de sécurité. En Packet Tracer, 1024 suffit.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip ssh version 2</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">SSH v1 a des failles. La v2 est plus robuste. Cette commande empêche les clients d'utiliser l'ancienne version.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration.</p>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">4B) Switch SW-Core</h3>
      <div className="space-y-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip domain-name novatech.local</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Définir le nom de domaine (obligatoire pour les clés RSA).</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">crypto key generate rsa</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Générer les clés RSA. Taper 1024 ou 2048 quand demandé.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">ip ssh version 2</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Forcer SSH v2 uniquement.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="lab2ssh-vty" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">Étape 5 — Sécuriser les lignes VTY (SSH ONLY)</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Les <strong>lignes VTY</strong> (Virtual Terminal) gèrent les connexions à distance (Telnet, SSH). On les configure pour n'accepter que SSH, avec authentification par utilisateurs locaux et protection anti brute-force.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">5A) Routeur R-Sec</h3>
      <div className="space-y-4 mb-8">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">line vty 0 4</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">VTY 0 à 4 = 5 « portes » pour les connexions distantes. Chaque session SSH (ou Telnet) utilise une de ces lignes. On les configure toutes en même temps pour uniformiser la sécurité.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">login local</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sans <strong>login local</strong>, le routeur demanderait le mot de passe enable à tous. Avec login local, il demande le login + mot de passe des utilisateurs créés à l'étape 3 (admin, guest).</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">transport input ssh</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Par défaut, VTY accepte Telnet (non chiffré). <strong>transport input ssh</strong> désactive Telnet : seules les connexions SSH sont autorisées. Les mots de passe ne transitent plus en clair.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exec-timeout 1 0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">1 0 = 1 minute et 0 seconde. Si tu restes inactif 60 s, la session se ferme. Évite qu'une session oubliée reste ouverte (risque de sécurité si quelqu'un accède à ton poste).</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exit</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode line pour appliquer login block-for au niveau config.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">login block-for 60 attempts 3 within 60</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Protection contre les attaques par dictionnaire : 3 mots de passe incorrects en 60 secondes → blocage de toute tentative de connexion pendant 60 secondes. Ralentit fortement les attaques automatisées.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">R-Sec(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration.</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-none space-y-4 ml-0 text-slate-300 mb-8 leading-relaxed">
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1 rounded font-mono text-sm">line vty 0 4</code> : accès distants (sessions).</li>
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1 rounded font-mono text-sm">login local</code> : utilise les users locaux (admin/guest).</li>
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1 rounded font-mono text-sm">transport input ssh</code> : interdit Telnet, SSH uniquement.</li>
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1 rounded font-mono text-sm">exec-timeout 1 0</code> : déconnecte après 60 s d’inactivité.</li>
        <li className="flex gap-3 items-start"><span className="text-blue-400 shrink-0">→</span> <code className="bg-slate-900 px-1 rounded font-mono text-sm">login block-for 60 attempts 3 within 60</code> : anti brute-force (3 essais ratés → blocage 60 s).</li>
      </ul>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">5B) Switch SW-Core</h3>
      <div className="space-y-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">configure terminal</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Entrer en mode configuration globale.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">line vty 0 4</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Configurer les lignes virtuelles pour l'accès distant.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">login local</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Utiliser les utilisateurs locaux pour l'authentification.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">transport input ssh</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Autoriser uniquement SSH.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">exec-timeout 1 0</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Déconnecter après 60 s d'inactivité.</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-start gap-3 mb-2">
            <code className="bg-black/50 px-2 py-1 rounded text-emerald-400 font-mono text-sm shrink-0">SW-Core(config-line)#</code>
            <div className="flex-1">
              <code className="text-emerald-400 font-mono text-sm">end</code>
              <p className="text-slate-400 text-xs mt-1 ml-0">Sortir du mode configuration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="lab2ssh-save" className="bg-slate-800/50 border border-amber-500/30 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-amber-400 mb-6">Étape 6 — Sauvegarder</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">Sur routeur et switch :</p>
      <p className="font-mono text-sm bg-black/50 rounded-xl px-5 py-3 text-emerald-300 mb-6">copy running-config startup-config</p>
      <p className="text-emerald-300/90 font-medium border-l-4 border-emerald-500/50 pl-4 py-2">➡️ Sauvegarde permanente (sinon tout est perdu au reboot).</p>
    </section>

    <section id="lab2ssh-tests" className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8 scroll-mt-4">
      <h2 className="text-xl font-bold text-blue-400 mb-6">Étape 7 — Tests SSH depuis PC-Tech</h2>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">7A) SSH admin vers routeur</h3>
      <p className="font-mono text-sm bg-black/50 rounded-xl px-5 py-3 text-emerald-300 mb-6">ssh -l admin 192.168.1.1</p>
      <p className="text-slate-300 mb-8 leading-relaxed">Doit te donner accès complet. Test : <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">show running-config</code></p>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">7B) SSH guest vers routeur</h3>
      <p className="font-mono text-sm bg-black/50 rounded-xl px-5 py-3 text-emerald-300 mb-6">ssh -l guest 192.168.1.1</p>
      <p className="text-slate-300 mb-6 leading-relaxed">Test : <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">show running-config</code>. L’utilisateur guest a des droits limités (niveau 1).</p>
      <p className="text-amber-300/90 border-l-4 border-amber-500/50 pl-4 py-2 mb-8 leading-relaxed">⚠️ Si « guest » arrive quand même à faire <code className="bg-slate-900 px-1 rounded font-mono text-sm">show running-config</code> dans Packet Tracer, on peut interdire la commande au niveau 1.</p>
      <h3 className="text-slate-200 font-bold mb-3 mt-8 border-b border-slate-600 pb-2">7C) SSH vers switch</h3>
      <p className="font-mono text-sm bg-black/50 rounded-xl px-5 py-3 text-emerald-300">ssh -l admin 192.168.1.2</p>
    </section>
  </div>
);

// --- STRUCTURE DES SEMAINES ---
const weeks = [
  {
    id: 1,
    title: "Administration Cisco & VLAN",
    subtitle: "SSH, VLAN, Trunk, inter-VLAN",
    sessions: [1, 2, 3],
    available: true
  },
  {
    id: 2,
    title: "Protocoles & services réseau",
    subtitle: "DHCP, DNS, HTTP, FTP, ARP, Syslog, SNMP",
    sessions: [4, 5, 6],
    available: true
  },
  {
    id: 3,
    title: "Routage",
    subtitle: "À venir",
    sessions: [],
    available: false
  },
  {
    id: 4,
    title: "Commutation",
    subtitle: "À venir",
    sessions: [],
    available: false
  }
];

// --- MAIN APP : THÉORIE + LAB + QUIZ ---

export default function NetMasterClass() {
  const [viewMode, setViewMode] = useState('sessions'); // 'sessions' | 'packet_tracer' | 'labs' | 'labs_s2' | 'labs_s3' | 'labs_s4'
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [activeTab, setActiveTab] = useState('theory');
  const [completedSessions, setCompletedSessions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quizScore, setQuizScore] = useState(null);
  const [expandedWeek, setExpandedWeek] = useState(1);
  const [expandedLabWeek, setExpandedLabWeek] = useState(1);
  // Système de statistiques
  const { stats, addTime, addCommand, addQuizAttempt, addLabAttempt, resetStats } = useStats();
  
  // Tracking du temps passé
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [timeTracker, setTimeTracker] = useState(null);

  useEffect(() => {
    // Démarrer le tracker de temps
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      if (elapsed > 0 && elapsed % 30 === 0) { // Sauvegarder toutes les 30 secondes
        addTime(30, activeSessionId);
        setSessionStartTime(Date.now());
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [activeSessionId, sessionStartTime]);

  useEffect(() => {
    // Réinitialiser le timer quand on change de session
    setSessionStartTime(Date.now());
  }, [activeSessionId]);

  const activeSession = sessions.find(s => s.id === activeSessionId);
  const progress = (completedSessions.length / sessions.length) * 100;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Overlay pour mobile quand le sommaire est ouvert */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`transition-all duration-300 flex flex-col h-full shadow-2xl bg-slate-900 border-r border-slate-800 ${
        sidebarOpen 
          ? 'w-80 translate-x-0 opacity-100 pointer-events-auto' 
          : 'w-0 -translate-x-full opacity-0 pointer-events-none'
      } absolute lg:relative z-30 overflow-hidden`}>
        <div className="p-6 border-b border-slate-800 bg-slate-900">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
            <Globe className="text-blue-500" /> NetAcademy
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-bold">
            Formation Réseau Cisco
          </p>

          <div className="mt-6 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <div className="flex justify-between text-[11px] mb-2 text-slate-400 font-bold uppercase tracking-wider">
              <span>Progression Globale</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="mb-4 pb-3 border-b border-slate-800">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Programme</p>
          </div>

          {/* Info Pratique */}
          <div className="mb-6 pb-4 border-b border-slate-800 space-y-2">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Info Pratique</p>
            <div className="space-y-3">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm font-bold mb-1">Canal Webex</p>
                    <a 
                      href="mailto:training@net-academy.eu"
                      className="text-blue-400 hover:text-blue-300 text-xs font-mono transition-colors underline decoration-dotted"
                    >
                      training@net-academy.eu
                    </a>
                    <p className="text-slate-500 text-xs mt-2">
                      Pour toute question ou support technique
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Video className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm font-bold mb-1">Réunion Zoom</p>
                    <a 
                      href="https://us06web.zoom.us/j/89070136941?pwd=Xh1bOFpuW3I5iQnFbjxcvjZWsGU8Mk.1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-xs font-mono transition-colors underline decoration-dotted break-all"
                    >
                      Rejoindre la réunion Zoom
                    </a>
                    <p className="text-slate-500 text-xs mt-2">
                      Lien de connexion pour les sessions en ligne
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {weeks.map((week) => (
            <div key={week.id} className="mb-2">
              <button
                onClick={() => week.available && setExpandedWeek(expandedWeek === week.id ? null : week.id)}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-all border ${
                  week.available
                    ? expandedWeek === week.id
                      ? 'bg-blue-600/10 border-blue-500/50 text-blue-100'
                      : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300 hover:border-slate-600'
                    : 'bg-slate-900/50 border-slate-800/50 text-slate-600 cursor-not-allowed opacity-60'
                }`}
                disabled={!week.available}
              >
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">{week.title}</p>
                    {!week.available && (
                      <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-[9px] font-bold text-amber-400 uppercase">Soon</span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{week.subtitle}</p>
                </div>
                {week.available && (
                  <ChevronRight className={`w-4 h-4 transition-transform ${expandedWeek === week.id ? 'rotate-90' : ''}`} />
                )}
              </button>
              
              {expandedWeek === week.id && week.available && (
                <div className="mt-2 ml-3 space-y-2 border-l-2 border-slate-800 pl-3">
                  {week.sessions.map((sessionId) => {
                    const session = sessions.find(s => s.id === sessionId);
                    if (!session) return null;
                    return (
                      <button
                        key={session.id}
                        onClick={() => {
                          setViewMode('sessions');
                          setActiveSessionId(session.id);
                          setActiveTab('theory');
                          setQuizScore(null);
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                        className={`w-full p-3 rounded-lg flex items-start space-x-3 transition-all border group ${
                          activeSessionId === session.id
                            ? 'bg-blue-600/10 border-blue-500 text-blue-100'
                            : completedSessions.includes(session.id)
                              ? 'bg-emerald-900/10 border-emerald-900/40 text-emerald-400'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            activeSessionId === session.id
                              ? 'bg-blue-600 text-white'
                              : completedSessions.includes(session.id)
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 group-hover:bg-slate-700'
                          }`}
                        >
                          {completedSessions.includes(session.id) ? <CheckCircle size={16} /> : session.icon}
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-xs leading-tight">{session.title}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[9px] flex items-center gap-1 bg-slate-950 px-1.5 py-0.5 rounded text-slate-500 border border-slate-800 font-mono">
                              <Clock size={9} /> {session.duration}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Labs Pratiques</p>
            
            {/* Administration Cisco & VLAN - Labs disponibles */}
            <div className="mb-2">
              <button
                onClick={() => setExpandedLabWeek(expandedLabWeek === 1 ? null : 1)}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-all border ${
                  expandedLabWeek === 1
                    ? 'bg-blue-600/10 border-blue-500/50 text-blue-100'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="text-left flex-1">
                  <p className="font-bold text-sm">Administration Cisco & VLAN</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">3 labs disponibles</p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedLabWeek === 1 ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedLabWeek === 1 && (
                <div className="mt-2 ml-3 space-y-2 border-l-2 border-slate-800 pl-3">
                  <button
                    onClick={() => {
                      setViewMode('labs');
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-lg flex items-center gap-2 transition-all border text-xs ${
                      viewMode === 'labs'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-100'
                        : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className={`p-1.5 rounded ${viewMode === 'labs' ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold">Lab Session 1</p>
                      <p className="text-[9px] text-slate-500">Labs S1, S2, S3</p>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('labs_s2');
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-lg flex items-center gap-2 transition-all border text-xs ${
                      viewMode === 'labs_s2'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-100'
                        : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className={`p-1.5 rounded ${viewMode === 'labs_s2' ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>
                      <Network className="w-4 h-4" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold">Lab Session 2</p>
                      <p className="text-[9px] text-slate-500">VLAN, VLAN avancés</p>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('labs_s3');
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-lg flex items-center gap-2 transition-all border text-xs ${
                      viewMode === 'labs_s3'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-100'
                        : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className={`p-1.5 rounded ${viewMode === 'labs_s3' ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>
                      <Link className="w-4 h-4" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold">Lab Session 3</p>
                      <p className="text-[9px] text-slate-500">Trunk et inter-VLAN</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Protocoles & services - Lab DHCP & DNS */}
            <div className="mb-2">
              <button
                onClick={() => setExpandedLabWeek(expandedLabWeek === 2 ? null : 2)}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-all border ${
                  expandedLabWeek === 2
                    ? 'bg-blue-600/10 border-blue-500/50 text-blue-100'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="text-left flex-1">
                  <p className="font-bold text-sm">Protocoles & services</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">2 labs disponibles</p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedLabWeek === 2 ? 'rotate-90' : ''}`} />
              </button>
              {expandedLabWeek === 2 && (
                <div className="mt-2 ml-3 space-y-2 border-l-2 border-slate-800 pl-3">
                  <button
                    onClick={() => {
                      setViewMode('labs_s4');
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-lg flex items-center gap-2 transition-all border text-xs ${
                      viewMode === 'labs_s4'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-100'
                        : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className={`p-1.5 rounded ${viewMode === 'labs_s4' ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>
                      <Server className="w-4 h-4" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold">Lab DHCP & DNS</p>
                      <p className="text-[9px] text-slate-500">Mise en œuvre TechCorp</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Routage - Coming Soon */}
            <button
              disabled
              className="w-full p-3 rounded-xl flex items-center justify-between transition-all border bg-slate-900/50 border-slate-800/50 text-slate-600 cursor-not-allowed opacity-60"
            >
              <div className="text-left flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">Routage</p>
                  <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-[9px] font-bold text-amber-400 uppercase">Soon</span>
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5">À venir</p>
              </div>
            </button>

            {/* Commutation - Coming Soon */}
            <button
              disabled
              className="w-full p-3 rounded-xl flex items-center justify-between transition-all border bg-slate-900/50 border-slate-800/50 text-slate-600 cursor-not-allowed opacity-60"
            >
              <div className="text-left flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">Commutation</p>
                  <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-[9px] font-bold text-amber-400 uppercase">Soon</span>
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5">À venir</p>
              </div>
            </button>
          </div>

        </div>

        <div className="p-3 border-t border-slate-800 text-center text-[11px] text-slate-600">
          v1.0 • Mode "Traduction Humaine" activé
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-950">
        {/* Header */}
        <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 p-4 flex flex-col md:flex-row items-center justify-between z-20 gap-4 shadow-sm">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className={`transition-all p-2.5 rounded-lg flex items-center gap-2 relative z-50 ${
                sidebarOpen 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                  : 'text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30'
              }`}
              title={sidebarOpen ? "Masquer le sommaire" : "Afficher le sommaire pour naviguer"}
              aria-label={sidebarOpen ? "Masquer le sommaire" : "Afficher le sommaire"}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              {!sidebarOpen && <span className="text-xs font-medium hidden sm:inline">Menu</span>}
            </button>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                {viewMode === 'packet_tracer' ? 'Packet Tracer – Simulateur réseau' : viewMode === 'labs' ? 'Mémo Commandes – Session 1' : viewMode === 'labs_s2' ? 'Mémo Commandes – Session 2' : viewMode === 'labs_s3' ? 'Mémo Commandes – Session 3' : viewMode === 'labs_s4' ? 'Lab DHCP & DNS' : activeSession.title}
              </h2>
            </div>
          </div>

          {viewMode === 'sessions' && (
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 w-full md:w-auto overflow-x-auto">
              {[
                { id: 'theory', label: 'Théorie & Concepts', icon: BookOpen },
                { id: 'lab', label: 'Mémo Commandes', icon: BookOpen },
                { id: 'quiz', label: 'Validation', icon: Award, disabled: !QUIZ_ENABLED }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (!tab.disabled) {
                      setActiveTab(tab.id);
                    }
                  }}
                  disabled={tab.disabled}
                  className={`flex-1 md:flex-none flex items-center justify-center px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap relative ${
                    tab.disabled
                      ? 'text-slate-600 cursor-not-allowed opacity-60'
                      : activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-1.5" />
                  <span>{tab.label}</span>
                  {tab.disabled && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-[9px] font-bold text-amber-400 uppercase">Soon</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {viewMode === 'packet_tracer' ? (
            <div className="h-full min-h-[500px]">
              <PacketTracerSection />
            </div>
          ) : viewMode === 'labs' ? (
            <div className="h-full min-h-[500px]">
              <LabsSection lab={sessions[0].lab} sessionLabel="Session 1" sessionDescription="Les trois labs (S1, S2, S3) se réalisent sur Cisco Packet Tracer. Consignes et corrections ci-dessous." sessionId={1} />
            </div>
          ) : viewMode === 'labs_s2' ? (
            <div className="h-full min-h-[500px]">
              <LabsSection lab={sessions[1].lab} sessionLabel="Session 2" sessionDescription="Les deux labs (Introduction VLAN, VLAN avancés et sécurisation) se réalisent sur Cisco Packet Tracer. Consignes et corrections ci-dessous." sessionId={2} />
            </div>
          ) : viewMode === 'labs_s3' ? (
            <div className="h-full min-h-[500px]">
              <LabsSection lab={sessions[2].lab} sessionLabel="Session 3" sessionDescription="Lab Trunk et routage inter-VLAN (Router-on-a-Stick) sur Cisco Packet Tracer. Consignes ci-dessous." sessionId={3} />
            </div>
          ) : viewMode === 'labs_s4' ? (
            <div className="h-full min-h-[500px]">
              <LabsSection lab={sessions[3].lab} sessionLabel="DHCP & DNS" sessionDescription="Lab TechCorp : mise en œuvre DHCP et DNS sur Cisco Packet Tracer. Consignes et correction ci-dessous." sessionId={4} />
            </div>
          ) : (
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            {activeTab === 'theory' && <TheoryPlayer slides={activeSession.slides} lab={activeSession.lab} sessionId={activeSessionId} />}

            {activeTab === 'lab' && (
              <div className="h-full flex flex-col">
                <div className="bg-slate-800 p-6 rounded-t-xl border border-slate-700 border-b-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2 text-xl">
                      <Terminal className="text-emerald-500 w-5 h-5" /> {activeSession.lab.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                      {activeSession.lab.context}
                    </p>
                  </div>
                  {QUIZ_ENABLED && (
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs md:text-sm text-slate-200 transition-colors flex items-center gap-1.5"
                    >
                      Passer au Quiz <ChevronRight size={14} />
                    </button>
                  )}
                </div>
                <div className="flex-1 rounded-b-xl overflow-hidden border border-slate-700 shadow-2xl min-h-[420px]">
                  <CommandsLearningList 
                    commands={
                      activeSessionId === 1 ? session1Commands :
                      activeSessionId === 2 ? session2Commands :
                      activeSessionId === 3 ? session3Commands :
                      activeSessionId === 4 ? session4Commands :
                      []
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === 'quiz' && viewMode === 'sessions' && (
              <div className="max-w-5xl mx-auto w-full pb-12">
                {QUIZ_ENABLED ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800">
                      <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <Award className="text-yellow-500 w-7 h-7" /> Validation des acquis
                      </h3>
                      <p className="text-slate-400 mt-2">
                        Prouvez votre maîtrise du module {activeSession.id} avec des quiz et exercices pratiques.
                      </p>
                    </div>

                  {/* Onglets Quiz / Exercices */}
                  <div className="p-4 border-b border-slate-800 bg-slate-800/50">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setQuizScore(null);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                          quizScore === null || (typeof quizScore === 'number')
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" />
                        Quiz Théorique
                      </button>
                      <button
                        onClick={() => {
                          setQuizScore('practice');
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                          quizScore === 'practice'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        <Terminal className="w-4 h-4" />
                        Exercices Pratiques
                      </button>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    {quizScore === null ? (
                      <QuizForm
                        questions={activeSession.quiz}
                        sessionId={activeSessionId}
                        onQuizComplete={addQuizAttempt}
                        onSubmit={(score) => {
                          setQuizScore(score);
                          if (score === activeSession.quiz.length && !completedSessions.includes(activeSessionId)) {
                            setCompletedSessions(prev => [...prev, activeSessionId]);
                          }
                        }}
                      />
                    ) : quizScore === 'practice' ? (
                      <PracticeExercises sessionId={activeSessionId} />
                    ) : (
                      <div className="text-center py-8">
                        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                          quizScore === activeSession.quiz.length 
                            ? 'bg-emerald-900/30 border-4 border-emerald-500' 
                            : quizScore >= activeSession.quiz.length * 0.7
                            ? 'bg-yellow-900/30 border-4 border-yellow-500'
                            : 'bg-red-900/30 border-4 border-red-500'
                        }`}>
                          <div className="text-5xl">
                            {quizScore === activeSession.quiz.length ? '🎓' : quizScore >= activeSession.quiz.length * 0.7 ? '📚' : '📖'}
                          </div>
                        </div>
                        <h4 className="text-3xl font-bold text-white mb-3">
                          Score final :{' '}
                          <span className={quizScore === activeSession.quiz.length ? 'text-emerald-400' : quizScore >= activeSession.quiz.length * 0.7 ? 'text-yellow-400' : 'text-red-400'}>
                            {quizScore} / {activeSession.quiz.length}
                          </span>
                        </h4>
                        <div className={`inline-block px-4 py-2 rounded-lg mb-6 ${
                          quizScore === activeSession.quiz.length 
                            ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-500/50' 
                            : quizScore >= activeSession.quiz.length * 0.7
                            ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/50'
                            : 'bg-red-900/30 text-red-300 border border-red-500/50'
                        }`}>
                          <p className="font-semibold">
                            {quizScore === activeSession.quiz.length
                              ? "✅ Excellent ! Module validé avec succès"
                              : quizScore >= activeSession.quiz.length * 0.7
                              ? "⚠️ Bien joué ! Quelques révisions recommandées"
                              : "❌ Continuez à réviser avant de continuer"}
                          </p>
                        </div>
                        <p className="text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                          {quizScore === activeSession.quiz.length
                            ? "Félicitations ! Vous maîtrisez parfaitement les concepts de cette session. Vous pouvez passer au module suivant."
                            : quizScore >= activeSession.quiz.length * 0.7
                            ? "Vous avez de bonnes bases ! Consultez les explications détaillées dans le quiz pour améliorer vos connaissances avant de continuer."
                            : "Prenez le temps de revoir la théorie et les explications du quiz. Une bonne compréhension des concepts de base est essentielle pour la suite."}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                          <button
                            onClick={() => setQuizScore(null)}
                            className="px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 font-semibold transition-colors border border-slate-700 flex items-center justify-center gap-2"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Réessayer le quiz
                          </button>
                          <button
                            onClick={() => {
                              setActiveTab('theory');
                              setQuizScore(null);
                            }}
                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                          >
                            <BookOpen className="w-4 h-4" />
                            Revoir la théorie
                          </button>
                          {activeSessionId < sessions.length && typeof quizScore === 'number' && quizScore === activeSession.quiz.length && (
                            <button
                              onClick={() => {
                                setActiveSessionId(id => id + 1);
                                setActiveTab('theory');
                                setQuizScore(null);
                              }}
                              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2"
                            >
                              Module suivant
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                ) : (
                  // Message "Bientôt disponible" quand le quiz est désactivé
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-12 text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 bg-amber-900/30 border-4 border-amber-500">
                        <Award className="w-12 h-12 text-amber-400" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <Award className="text-yellow-500 w-7 h-7" /> Validation des acquis
                      </h3>
                      <div className="inline-block px-4 py-2 rounded-lg mb-6 bg-amber-900/30 text-amber-300 border border-amber-500/50">
                        <p className="font-semibold text-lg">Bientôt disponible</p>
                      </div>
                      <p className="text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
                        La section de validation des acquis (quiz théorique et exercices pratiques) sera disponible prochainement.
                      </p>
                      <p className="text-slate-500 text-sm">
                        Cette fonctionnalité est en cours de développement et sera activée dans une prochaine mise à jour.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          )}
        </main>
      </div>
    </div>
  );
}

