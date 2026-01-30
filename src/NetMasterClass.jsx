import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Terminal, CheckCircle, Award, 
  ChevronRight, ChevronLeft, Lock, Shield, 
  Cpu, RotateCcw, Menu, X, Globe,
  Clock, Save, Power, AlertCircle, Eye, AlertTriangle, Lightbulb, HardDrive, Microscope, Router as RouterIcon, Network, ArrowUpDown, Monitor, Command, MessageCircle, HelpCircle,
  BarChart3, TrendingUp, History, Target, Zap, Activity, Send, Key, User, Layout, Plus, Trash2, Link
} from 'lucide-react';

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

Si vous connaissez les bons mots, il fera tout ce que vous voulez. Sinon, il ne fera rien.`
      },
      {
        type: 'mode_explorer',
        title: "Les 3 Modes de Fonctionnement",
        content: "Avant de taper une commande, il faut savoir dans quel mode vous êtes. Chaque mode a ses propres permissions."
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
        content: `Après avoir sécurisé l'accès local (console, enable), on sécurise l'accès à distance avec SSH. SSH chiffre toute la conversation avec l'équipement (mots de passe, commandes).`
      },
      {
        type: 'rich_text',
        title: "SSH en bref",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed">Pour activer SSH il faut : <strong>hostname</strong> + <strong>ip domain-name</strong> + <strong>username</strong> + <strong>crypto key generate rsa</strong> + <strong>line vty</strong> avec <code className="bg-black/40 px-1 rounded">login local</code> et <code className="bg-black/40 px-1 rounded">transport input ssh</code>.</p>
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
          { q: "exit", a: "Sortir du mode actuel et remonter d'un niveau" }
        ]
      },
      {
        type: 'lab_correction',
        title: "Correction du Lab 1 : Sécurisation et SSH"
      }
    ],
    lab: {
      title: "Lab 1 : Sécurisation et SSH",
      context: "SCÉNARIO : Sécurisez le routeur (nom, console, enable secret, DNS) puis activez SSH (domaine, utilisateur, clé RSA, lignes VTY). Sauvegardez en fin de lab.",
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
      { q: "Quel prompt indique le mode privilégié ?", options: [">", "#", "(config)#"], a: 1 },
      { q: "Quelle est la différence entre running-config et startup-config ?", options: ["Aucune différence", "running-config est en RAM (actuelle), startup-config est en NVRAM (sauvegardée)", "running-config est sauvegardée, startup-config est temporaire"], a: 1 },
      { q: "Que fait la commande 'copy running-config startup-config' ?", options: ["Redémarre le routeur", "Sauvegarde la config active dans la NVRAM", "Efface la configuration"], a: 1 },
      { q: "Que permet de faire la commande 'show version' ?", options: ["Affiche seulement la version IOS", "Affiche la version IOS, le matériel, l'uptime, la mémoire et autres infos système", "Redémarre le routeur"], a: 1 },
      { q: "Pourquoi utiliser 'enable secret' plutôt que 'enable password' ?", options: ["enable secret est plus rapide", "enable secret est chiffré (hashé MD5), donc plus sécurisé que enable password qui est en clair", "enable password ne fonctionne pas"], a: 1 },
      { q: "Que se passe-t-il si on oublie de faire 'copy running-config startup-config' après modification ?", options: ["Rien, c'est automatique", "Toutes les modifications seront perdues au redémarrage", "Le routeur plante"], a: 1 },
      { q: "Que fait la commande 'no ip domain lookup' ?", options: ["Active la recherche DNS", "Désactive la résolution DNS pour éviter les délais lors d'une erreur de commande", "Configure un nom de domaine"], a: 1 },
      { q: "Pour sécuriser l'accès console, quelles commandes sont nécessaires ?", options: ["Seulement 'password'", "Seulement 'login'", "'line console 0', puis 'password', puis 'login'"], a: 2 },
      { q: "Quels sont les avantages de l'utilisation du TFTP ?", options: ["Aucun avantage", "Sauvegarde et restauration centralisée des configurations, transfert simple de fichiers entre équipements", "TFTP est plus rapide que la sauvegarde locale"], a: 1 },
      { q: "Quelle commande permet de sauvegarder la config vers un serveur TFTP ?", options: ["copy startup-config tftp:", "copy running-config tftp:", "save tftp:"], a: 1 }
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
        title: "Introduction aux VLANs",
        content: `Séparer les équipes (ex : Administration et Commerciale) sur un même switch en créant des VLANs. On apprend : création de VLANs, attribution des ports à un VLAN, création d'une IP de management par VLAN, et connexion SSH depuis une machine du VLAN 1 et une autre du VLAN 2.`
      },
      {
        type: 'rich_text',
        title: "Création de VLANs",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Un <strong className="text-blue-400">VLAN</strong> permet de séparer logiquement les équipes sur un même switch (ex : VLAN 10 Administration, VLAN 20 Commercial).
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-emerald-400 font-bold mb-2">Créer les VLANs :</p>
              <HumanCommand cmd="vlan 10" human="Créer le VLAN 10 (Administration)." />
              <HumanCommand cmd="name Administration" human="Nommer le VLAN 10." />
              <HumanCommand cmd="vlan 20" human="Créer le VLAN 20 (Commercial)." />
              <HumanCommand cmd="name Commercial" human="Nommer le VLAN 20." />
            </div>
            <ProTip>Vérification : <code className="bg-black/40 px-1 rounded">show vlan brief</code></ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Attribution des ports à un VLAN",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Associez les ports où sont branchés les PC Administration au VLAN 10, et les PC Commercial au VLAN 20. Forcez les ports en mode <strong>access</strong>.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <HumanCommand cmd="interface range fa0/1 - 2" human="Sélectionner les ports 1 et 2 (PC Admin)." />
              <HumanCommand cmd="switchport mode access" human="Port en mode accès (un seul VLAN)." />
              <HumanCommand cmd="switchport access vlan 10" human="Attribuer au VLAN 10." />
              <HumanCommand cmd="interface range fa0/3 - 4" human="Ports 3 et 4 (PC Commercial)." />
              <HumanCommand cmd="switchport mode access" human="Port en mode accès." />
              <HumanCommand cmd="switchport access vlan 20" human="Attribuer au VLAN 20." />
            </div>
            <DangerZone>Entre deux PC du même VLAN → ping OK. Entre VLAN différents → pas de communication (sans routage).</DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "IP de Management par VLAN",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Pour gérer le switch à distance (SSH), donnez une <strong className="text-blue-400">IP de management</strong> à chaque VLAN (interface vlan 1, interface vlan 10, etc.).
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <HumanCommand cmd="interface vlan 1" human="Interface de management VLAN 1." />
              <HumanCommand cmd="ip address 192.168.1.2 255.255.255.0" human="IP du switch (ex. 192.168.1.2/24)." />
              <HumanCommand cmd="no shutdown" human="Activer l'interface." />
              <p className="text-slate-400 text-sm mt-2">Optionnel : <code className="bg-black/40 px-1 rounded">interface vlan 10</code> + <code className="bg-black/40 px-1 rounded">ip address 192.168.10.1 255.255.255.0</code> pour une IP de management par VLAN.</p>
            </div>
            <ProTip>Une machine du VLAN 1 pourra SSH vers 192.168.1.2 ; une machine du VLAN 10 vers 192.168.10.1 (si configuré).</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Connexion SSH depuis VLAN 1 et VLAN 2",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Après avoir activé SSH sur le switch (hostname, ip domain-name, username, crypto key, line vty, transport input ssh), testez une connexion SSH depuis une machine du <strong>VLAN 1</strong> puis depuis une machine du <strong>VLAN 2</strong> (ou VLAN 10).
            </p>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-blue-200 text-sm">Depuis le PC : <code className="bg-black/40 px-1 rounded">ssh -l admin 192.168.1.2</code> (ou l’IP de management du VLAN concerné). Vérifiez les droits (niveau 15).</p>
            </div>
          </div>
        )
      },
      {
        type: 'deep_dive',
        title: "Pour les curieux : Détails des commandes VLAN",
        items: [
          { summary: "vlan 10 puis name Administration", details: "En mode config globale, 'vlan 10' crée le VLAN 10 et ouvre le sous-mode config-vlan. La commande 'name Administration' lui donne un nom lisible. Faire 'exit' pour sortir." },
          { summary: "interface range fa0/1 - 2", details: "Sélectionne plusieurs ports en une fois (1 et 2). Le prompt devient (config-if-range)#. Toutes les commandes suivantes s'appliquent aux deux ports." },
          { summary: "switchport mode access vs trunk", details: "En mode access, le port n'appartient qu'à un seul VLAN (celui des PC). En mode trunk, le port transporte plusieurs VLANs étiquetés (lien inter-switch)." }
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
          { q: "Entre deux PC de VLANs différents (sans routage), le ping :", options: ["Fonctionne", "Ne fonctionne pas (isolation VLAN)", "Fonctionne si même switch"], a: 1 }
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
          { cmd: "switchport access vlan 10", desc: "Attribuer au VLAN 10" }
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
          { q: "interface vlan 1", a: "Interface de management VLAN 1" }
        ]
      },
      {
        type: 'lab_correction',
        title: "Correction du Lab 2 : VLAN"
      }
    ],
    lab: {
      title: "Lab 2 : Introduction VLAN",
      context: "SCÉNARIO : Séparer Administration (VLAN 10) et Commercial (VLAN 20) sur un switch. Créer les VLANs, attribuer les ports, configurer l'IP de management (interface vlan 1), puis tester SSH depuis une machine VLAN 1 et une machine VLAN 2.",
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
        content: `Relier plusieurs VLANs via des trunks entre switches et permettre leur communication via un routeur (Router-on-a-Stick). On aborde : configuration du trunk, VLAN autorisés / non autorisés, et routage inter-VLAN.`
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
            <ProTip>VLAN autorisés / non autorisés : <code className="bg-black/40 px-1 rounded">switchport trunk allowed vlan 10,20</code> restreint le trunk à ces VLANs ; les autres sont interdits.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Routage Inter-VLAN (Router-on-a-Stick)",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Sur le routeur (R-Core), créez des sous-interfaces par VLAN avec encapsulation 802.1Q et une IP par VLAN :
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <HumanCommand cmd="interface g0/0.10" human="Sous-interface pour VLAN 10." />
              <HumanCommand cmd="encapsulation dot1Q 10" human="Encapsulation 802.1Q VLAN 10." />
              <HumanCommand cmd="ip address 192.168.10.1 255.255.255.0" human="Passerelle VLAN 10." />
              <HumanCommand cmd="interface g0/0.20" human="Sous-interface pour VLAN 20." />
              <HumanCommand cmd="encapsulation dot1Q 20" human="Encapsulation 802.1Q VLAN 20." />
              <HumanCommand cmd="ip address 192.168.20.1 255.255.255.0" human="Passerelle VLAN 20." />
            </div>
            <ProTip>PC VLAN 10 : 192.168.10.X/24 ; PC VLAN 20 : 192.168.20.X/24. Le routeur fait le routage entre VLANs.</ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "VLAN autorisés / non autorisés",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Sur un port trunk, vous pouvez <strong className="text-blue-400">autoriser uniquement certains VLANs</strong> pour la sécurité : <code className="bg-black/40 px-1 rounded">switchport trunk allowed vlan 10,20</code>. Les VLANs non listés sont interdits sur le trunk.
            </p>
            <ProTip>Par défaut, tous les VLANs sont autorisés. Restreindre limite les risques et clarifie la topologie.</ProTip>
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
      title: "Lab 3 : Trunk et Communication Inter-VLANs",
      context: "SCÉNARIO : Relier deux switches par trunk, créer VLAN 10 et 20 sur chaque switch, configurer les ports accès, le trunk, et le Router-on-a-Stick pour que les VLANs communiquent.",
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

      <div className="bg-slate-900/80 p-3 border-t border-slate-700">
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

// --- QUIZ ---

const QuizForm = ({ questions, onSubmit, sessionId, onQuizComplete }) => {
  const [answers, setAnswers] = useState({});
  const [quizStartTime] = useState(Date.now());

  const handleValidate = () => {
    let score = 0;
    questions.forEach((q, i) => { if (answers[i] === q.a) score++; });
    const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
    
    // Tracker le quiz
    if (onQuizComplete) {
      onQuizComplete(sessionId, score, questions.length, timeSpent);
    }
    
    onSubmit(score);
  };

  return (
    <div className="space-y-6">
      {questions.map((q, idx) => (
        <div key={idx} className="space-y-4">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <p className="font-bold text-base md:text-lg text-white mb-4 flex gap-3">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                {idx + 1}
              </span>
              {q.q}
            </p>
            <div className="space-y-3 pl-10">
              {q.options.map((opt, optIdx) => (
                <label 
                  key={optIdx}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all text-sm ${
                    answers[idx] === optIdx 
                      ? 'bg-blue-600/20 border-blue-500 text-blue-100 shadow-md' 
                      : 'border-slate-700 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    className="hidden"
                    onChange={() => setAnswers({ ...answers, [idx]: optIdx })}
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${
                    answers[idx] === optIdx ? 'border-blue-500' : 'border-slate-500'
                  }`}>
                    {answers[idx] === optIdx && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                  </div>
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleValidate}
        disabled={Object.keys(answers).length < questions.length}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-blue-900/30 mt-6"
      >
        Valider mes réponses
      </button>
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

const DEVICE_TYPES = { router: { label: 'Routeur', icon: RouterIcon, color: 'from-blue-600 to-blue-800' }, switch: { label: 'Switch', icon: Network, color: 'from-emerald-600 to-emerald-800' }, pc: { label: 'PC', icon: Monitor, color: 'from-slate-600 to-slate-800' } };

function generateId() { return Math.random().toString(36).slice(2, 10); }

// Terminal CLI sandbox pour un appareil (libre, comme Packet Tracer)
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
    if (device.type === 'pc') return `${device.name}>`;
    if (mode === 'config') return `${config.hostname}(config)#`;
    if (mode === 'priv') return `${config.hostname}#`;
    return `${config.hostname}>`;
  };

  const executeCommand = (cmd) => {
    const c = cmd.trim().toLowerCase();
    if (!c) return null;
    if (device.type === 'pc') {
      if (c === 'ping 192.168.1.1' || c.startsWith('ping ')) return 'Reply from 192.168.1.1: bytes=32 time=1ms TTL=64';
      if (c === 'ipconfig' || c === 'ip config') return 'IPv4 Address: 192.168.1.10\nSubnet Mask: 255.255.255.0\nDefault Gateway: 192.168.1.1';
      return 'Commande non reconnue. Essayez ping ou ipconfig.';
    }
    if (c === 'enable') { setMode('priv'); return ''; }
    if (c === 'disable') { setMode('user'); return ''; }
    if (c === 'configure terminal' || c === 'conf t') { setMode('config'); return ''; }
    if (c === 'exit' || c === 'end') { setMode(mode === 'config' ? 'priv' : 'user'); return ''; }
    if (c.startsWith('hostname ')) { const name = cmd.split(/\s+/)[1] || ''; setConfig(prev => ({ ...prev, hostname: name || prev.hostname })); return ''; }
    if (c === 'show running-config' || c === 'sh run') {
      return `Building configuration...\n\nhostname ${config.hostname}\n!\ninterface GigabitEthernet0/0\n no ip address\n shutdown\n!\nend`;
    }
    if (c === 'show ip interface brief' || c === 'sh ip int b') {
      return `Interface\t\tIP-Address\tOK?\tMethod\tStatus\nGigabitEthernet0/0\tunassigned\tYES\tunset\tadministratively down`;
    }
    if (c.startsWith('ping ')) return 'Sending 5, 100-byte ICMP Echos to ' + c.split(/\s+/)[1] + ', timeout is 2 seconds:\n!!!!!\nSuccess rate is 100 percent (5/5)';
    if (c === 'copy running-config startup-config' || c === 'wr') return '[OK] Configuration saved to NVRAM.';
    if (c === 'show startup-config' || c === 'sh start') return `Using ${config.hostname} configuration...\nhostname ${config.hostname}\n!`;
    if (c.startsWith('interface ') || c.startsWith('int ')) return '';
    if (c.startsWith('ip address ')) return '';
    if (c === 'no shutdown') return '';
    if (c === '?') return 'enable\nexit\nping\nshow\nconfigure terminal\nhostname\ninterface\nip address';
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
  const [mode, setMode] = useState('select'); // select | add_router | add_switch | add_pc | connect
  const [connectFrom, setConnectFrom] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [cliDevice, setCliDevice] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

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
      setDevices(prev => [...prev, { id: generateId(), type: 'pc', x, y, name: `PC${prev.filter(d => d.type === 'pc').length + 1}` }]);
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
        <span className="text-slate-400 font-bold text-sm mr-2">Outils :</span>
        <button onClick={() => setMode('select')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mode === 'select' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Sélectionner</button>
        <button onClick={() => setMode('add_router')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'add_router' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><RouterIcon size={14} /> Routeur</button>
        <button onClick={() => setMode('add_switch')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'add_switch' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Network size={14} /> Switch</button>
        <button onClick={() => setMode('add_pc')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'add_pc' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Monitor size={14} /> PC</button>
        <button onClick={() => setMode('connect')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${mode === 'connect' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Link size={14} /> Câbler</button>
        {selectedDevice && (
          <button onClick={() => deleteDevice(selectedDevice.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600/80 text-white flex items-center gap-1"><Trash2 size={14} /> Supprimer</button>
        )}
        {(mode === 'add_router' || mode === 'add_switch' || mode === 'add_pc') && (
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

        {cliDevice && (
          <div className="absolute bottom-4 right-4 w-full max-w-lg h-72 z-30">
            <PacketTracerCLI device={cliDevice} onClose={() => setCliDevice(null)} devices={devices} />
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP : THÉORIE + LAB + QUIZ ---

export default function NetMasterClass() {
  const [viewMode, setViewMode] = useState('sessions'); // 'sessions' | 'packet_tracer'
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [activeTab, setActiveTab] = useState('theory');
  const [completedSessions, setCompletedSessions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quizScore, setQuizScore] = useState(null);
  
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
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full opacity-0'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col absolute z-20 h-full lg:relative lg:translate-x-0 lg:w-80 lg:opacity-100 shadow-2xl`}>
        <div className="p-6 border-b border-slate-800 bg-slate-900">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
            <Globe className="text-blue-500" /> NetAcademy
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-bold">
            Semaine 1 : Administration Cisco, SSH & VLAN
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
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Sessions</p>
          </div>
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => {
                setViewMode('sessions');
                setActiveSessionId(session.id);
                setActiveTab('theory');
                setQuizScore(null);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full p-4 rounded-xl flex items-start space-x-3 transition-all border group ${
                activeSessionId === session.id
                  ? 'bg-blue-600/10 border-blue-500 text-blue-100 shadow-lg shadow-blue-900/20'
                  : completedSessions.includes(session.id)
                    ? 'bg-emerald-900/10 border-emerald-900/40 text-emerald-400'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div
                className={`p-2 rounded-lg mt-0.5 transition-colors ${
                  activeSessionId === session.id
                    ? 'bg-blue-600 text-white'
                    : completedSessions.includes(session.id)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 group-hover:bg-slate-700'
                }`}
              >
                {completedSessions.includes(session.id) ? <CheckCircle size={18} /> : session.icon}
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-sm leading-tight">{session.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded text-slate-500 border border-slate-800 font-mono">
                    <Clock size={10} /> {session.duration}
                  </span>
                </div>
              </div>
            </button>
          ))}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Outils</p>
            <button
              onClick={() => {
                setViewMode('packet_tracer');
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all border ${
                viewMode === 'packet_tracer'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-100'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className={`p-2 rounded-lg ${viewMode === 'packet_tracer' ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>
                <Layout className="w-5 h-5" />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-sm">Packet Tracer</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Simulateur réseau</p>
              </div>
            </button>
          </div>
        </div>

        <div className="p-3 border-t border-slate-800 text-center text-[11px] text-slate-600">
          v1.0 • Mode "Traduction Humaine" activé
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-950">
        {/* Header */}
        <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 p-4 flex flex-col md:flex-row items-center justify-between z-10 gap-4 shadow-sm">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                {viewMode === 'packet_tracer' ? 'Packet Tracer – Simulateur réseau' : activeSession.title}
              </h2>
            </div>
          </div>

          {viewMode === 'sessions' && (
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 w-full md:w-auto overflow-x-auto">
              {[
                { id: 'theory', label: 'Théorie & Concepts', icon: BookOpen },
                { id: 'lab', label: 'Lab Pratique', icon: Terminal },
                { id: 'quiz', label: 'Validation', icon: Award },
                { id: 'stats', label: 'Statistiques', icon: BarChart3 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 md:flex-none flex items-center justify-center px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-1.5" />
                  <span>{tab.label}</span>
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
          ) : (
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            {activeTab === 'theory' && <TheoryPlayer slides={activeSession.slides} lab={activeSession.lab} sessionId={activeSessionId} />}

            {activeTab === 'stats' && (
              <div className="max-w-7xl mx-auto w-full pb-12">
                <StatsDashboard stats={stats} sessions={sessions} onReset={resetStats} />
              </div>
            )}

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
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs md:text-sm text-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    Passer au Quiz <ChevronRight size={14} />
                  </button>
                </div>
                <div className="flex-1 bg-black rounded-b-xl overflow-hidden border border-slate-700 shadow-2xl min-h-[420px]">
                  <TerminalSimulator 
                    scenario={activeSession.lab} 
                    sessionId={activeSessionId}
                    onCommand={addCommand}
                    onLabComplete={addLabAttempt}
                  />
                </div>
              </div>
            )}

            {activeTab === 'quiz' && viewMode === 'sessions' && (
              <div className="max-w-3xl mx-auto w-full pb-12">
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="p-8 border-b border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800">
                    <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                      <Award className="text-yellow-500 w-7 h-7" /> Validation des acquis
                    </h3>
                    <p className="text-slate-400 mt-2">
                      Prouvez votre maîtrise du module {activeSession.id}.
                    </p>
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
                    ) : (
                      <div className="text-center py-10">
                        <div className="text-6xl md:text-7xl mb-4">
                          {quizScore === activeSession.quiz.length ? '🎓' : '📚'}
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">
                          Score :{' '}
                          <span className={quizScore === activeSession.quiz.length ? 'text-emerald-400' : 'text-yellow-400'}>
                            {quizScore} / {activeSession.quiz.length}
                          </span>
                        </h4>
                        <p className="text-slate-400 mb-6">
                          {quizScore === activeSession.quiz.length
                            ? "Félicitations ! Vous avez validé ce module."
                            : "Quelques erreurs, reprenez la théorie puis réessayez."}
                        </p>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => setQuizScore(null)}
                            className="px-6 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 font-medium transition-colors border border-slate-700 text-sm"
                          >
                            Réessayer
                          </button>
                          {activeSessionId < sessions.length && quizScore === activeSession.quiz.length && (
                            <button
                              onClick={() => {
                                setActiveSessionId(id => id + 1);
                                setActiveTab('theory');
                                setQuizScore(null);
                              }}
                              className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold shadow-lg shadow-emerald-900/30 transition-all text-sm"
                            >
                              Module suivant <ChevronRight className="inline ml-1" size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          )}
        </main>
      </div>
    </div>
  );
}

