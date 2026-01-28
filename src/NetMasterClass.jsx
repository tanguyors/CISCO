import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Terminal, CheckCircle, Award, 
  ChevronRight, ChevronLeft, Lock, Shield, 
  Cpu, RotateCcw, Menu, X, Globe,
  Clock, Save, Power, AlertCircle, Eye, AlertTriangle, Lightbulb, HardDrive, Microscope, Router as RouterIcon, Network, ArrowUpDown, Monitor, Command, MessageCircle, HelpCircle
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
const CommandBuilder = ({ steps }) => {
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
      <h3 className="text-xl font-bold text-white">Construire la Configuration SSH</h3>
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
    title: "Session 1 : Les Premiers Mots",
    duration: "1h30",
    icon: <Cpu className="w-5 h-5" />,
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
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">TFTP (Trivial File Transfer Protocol) permet de sauvegarder vos configurations sur un serveur externe. C'est comme avoir une sauvegarde dans le cloud.</p>
            <HumanCommand 
              cmd="copy running-config tftp:" 
              human="Envoie ma configuration actuelle vers un serveur TFTP." 
              context="Le routeur vous demandera : 1) L'adresse IP du serveur TFTP, 2) Le nom du fichier. Utile pour avoir une sauvegarde centralisée de toutes vos configs."
            />
            <HumanCommand 
              cmd="copy tftp: running-config" 
              human="Récupère une configuration depuis un serveur TFTP et la charge en RAM." 
              context="⚠️ ATTENTION : Cela remplace complètement votre configuration actuelle. Le routeur vous demandera l'IP du serveur et le nom du fichier."
            />
            <DangerZone>
              <strong>Restauration TFTP :</strong> La commande <code className="text-red-400 font-mono">copy tftp: running-config</code> écrase votre config actuelle. Assurez-vous d'avoir sauvegardé avant, ou utilisez-la seulement si vous voulez restaurer une ancienne version.
            </DangerZone>
            <ProTip>
              <strong>Avantages du TFTP :</strong> Sauvegarde centralisée, restauration rapide en cas de problème, partage de configurations entre équipements identiques.
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
        title: "Correction du Lab 1 : Administration Complète"
      }
    ],
    lab: {
      title: "Lab 1 : Administration Complète",
      context: "SCÉNARIO : Vous venez de déballer le routeur 'R-Nova'. Configurez-le complètement : nom, sécurité console, mot de passe privilégié, désactivation DNS, et surtout... n'oubliez pas de sauvegarder !",
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
        { cmd: "copy running-config startup-config", desc: "SAUVEGARDER (essentiel !)" }
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
        "copy": { msg: "[OK] Ouf ! Votre travail est sauvé en NVRAM." }
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
    title: "Session 2 : Parler en Secret (SSH)",
    duration: "1h15",
    icon: <Lock className="w-5 h-5" />,
    slides: [
      {
        type: 'intro',
        title: "SSH : Parler en Secret",
        content: `Imagine que tu veux contrôler ton routeur depuis chez toi, mais tu ne veux pas que n'importe qui puisse écouter tes conversations. SSH, c'est comme avoir une conversation téléphonique cryptée avec ton équipement réseau !`
      },
      {
        type: 'rich_text',
        title: "Qu'est-ce que SSH ?",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              <strong className="text-blue-400">SSH (Secure Shell)</strong> = c'est comme avoir une <strong>conversation privée et cryptée</strong> avec ton routeur ou ton switch à distance.
            </p>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-blue-200 mb-3"><strong>💡 Exemple concret :</strong></p>
              <p className="text-blue-100 text-sm leading-relaxed">
                Tu es chez toi, ton routeur est au bureau. Avec SSH, tu peux te connecter à distance et faire toutes tes configurations, 
                mais personne ne peut "écouter" ce que tu dis (même si quelqu'un intercepte les données, elles sont cryptées).
              </p>
            </div>
            <DangerZone>
              <p className="text-sm font-bold mb-2">Telnet vs SSH : La Différence en Langage Simple</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">❌ Telnet :</span>
                  <span className="text-red-100">C'est comme parler dans un téléphone sans fil que tout le monde peut écouter. 
                  <strong> Ton mot de passe passe en clair</strong> - n'importe qui peut le voir !</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✅ SSH :</span>
                  <span className="text-emerald-100">C'est comme parler dans une langue secrète que seul toi et ton routeur comprennent. 
                  <strong> Tout est crypté</strong> - même si quelqu'un écoute, il ne comprend rien !</span>
                </div>
              </div>
            </DangerZone>
            <ProTip>
              <strong>Petit détail technique :</strong> SSH utilise le <strong>port 22</strong> par défaut (comme une adresse postale spécifique pour les lettres cryptées).
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Les 6 Ingédients Magiques pour SSH",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Pour que SSH fonctionne, c'est comme faire un gâteau : il faut <strong className="text-blue-400">TOUS les ingrédients</strong>. 
              Si tu en oublies un seul, ça ne marchera pas !
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-xl">1.</span>
                <div className="flex-1">
                  <span className="text-slate-200 font-semibold">Une adresse IP</span>
                  <p className="text-slate-400 text-sm mt-1">💡 C'est l'adresse de ton équipement sur le réseau. Sans ça, personne ne peut le trouver !</p>
                  <p className="text-slate-500 text-xs mt-1 italic">Exemple : 192.168.1.10</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-xl">2.</span>
                <div className="flex-1">
                  <span className="text-slate-200 font-semibold">Un nom d'hôte (hostname)</span>
                  <p className="text-slate-400 text-sm mt-1">💡 C'est le "prénom" de ton équipement. Au lieu de "Router", tu lui donnes un vrai nom.</p>
                  <p className="text-slate-500 text-xs mt-1 italic">Exemple : SW-Securite ou R-Bureau</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-xl">3.</span>
                <div className="flex-1">
                  <span className="text-slate-200 font-semibold">Un nom de domaine</span>
                  <p className="text-slate-400 text-sm mt-1">💡 C'est le "nom de famille" de ton équipement. Nécessaire pour créer les clés de chiffrement.</p>
                  <p className="text-slate-500 text-xs mt-1 italic">Exemple : novatech.local ou entreprise.fr</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-xl">4.</span>
                <div className="flex-1">
                  <span className="text-slate-200 font-semibold">Un compte utilisateur avec mot de passe</span>
                  <p className="text-slate-400 text-sm mt-1">💡 C'est comme créer un compte utilisateur sur ton ordinateur. Tu crées un "utilisateur" qui pourra se connecter.</p>
                  <p className="text-slate-500 text-xs mt-1 italic">Exemple : username admin secret admin123</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-xl">5.</span>
                <div className="flex-1">
                  <span className="text-slate-200 font-semibold">Une clé RSA générée</span>
                  <p className="text-slate-400 text-sm mt-1">💡 C'est la "clé de chiffrement" qui permet de crypter les conversations. Sans ça, pas de cryptage possible !</p>
                  <p className="text-slate-500 text-xs mt-1 italic">Exemple : crypto key generate rsa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-xl">6.</span>
                <div className="flex-1">
                  <span className="text-slate-200 font-semibold">SSH activé sur les lignes VTY</span>
                  <p className="text-slate-400 text-sm mt-1">💡 C'est comme ouvrir la porte d'entrée pour SSH. Tu dis "OK, les connexions SSH sont autorisées".</p>
                  <p className="text-slate-500 text-xs mt-1 italic">Exemple : transport input ssh</p>
                </div>
              </div>
            </div>
            <DangerZone>
              <strong>⚠️ Attention :</strong> Si tu oublies UN SEUL de ces ingrédients, SSH ne fonctionnera pas du tout. 
              C'est tout ou rien ! (Mais ne t'inquiète pas, on va tout faire ensemble étape par étape 😊)
            </DangerZone>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Donner une Adresse IP à un Switch",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Un switch, c'est un peu spécial : il n'a <strong className="text-blue-400">pas de prise réseau physique</strong> pour lui donner une adresse IP directement. 
              C'est comme un immeuble sans numéro de rue !
            </p>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-blue-200 mb-2"><strong>💡 Le Problème :</strong></p>
              <p className="text-blue-100 text-sm leading-relaxed">
                Un routeur a des interfaces physiques (GigabitEthernet 0/0, etc.) où tu peux mettre une IP. 
                Un switch n'a que des ports pour brancher des câbles, mais pas d'interface "réseau" pour lui-même.
              </p>
            </div>
            <p className="text-slate-200 leading-relaxed">
              <strong>La Solution :</strong> On crée une <strong className="text-emerald-400">interface virtuelle</strong> (VLAN 1) qui agit comme une "fausse interface réseau" pour le switch.
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <p className="text-slate-300 font-semibold mb-2">📝 Les 3 Commandes Magiques :</p>
              <HumanCommand 
                cmd="interface vlan 1" 
                human="Je crée une interface virtuelle pour mon switch (comme créer une fausse prise réseau)." 
              />
              <HumanCommand 
                cmd="ip address 192.168.1.10 255.255.255.0" 
                human="Je lui donne une adresse IP : 192.168.1.10 avec le masque 255.255.255.0 (comme donner une adresse postale)." 
              />
              <HumanCommand 
                cmd="no shutdown" 
                human="J'active cette interface (par défaut elle est désactivée, comme une prise électrique éteinte)." 
              />
            </div>
            <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
              <p className="text-emerald-200 mb-2"><strong>✅ Résultat :</strong></p>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Maintenant ton switch a une adresse IP ! Tu peux :
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Te connecter en SSH depuis un autre ordinateur</li>
                  <li>Faire un ping vers cette adresse</li>
                  <li>Le gérer à distance comme un routeur</li>
                </ul>
              </p>
            </div>
            <ProTip>
              <strong>Exemple concret :</strong> Si ton switch est à l'adresse 192.168.1.10, tu peux faire <code className="bg-black/40 px-1 rounded">ping 192.168.1.10</code> 
              depuis ton PC et ça répondra ! Avant, sans IP, c'était impossible.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Configuration SSH : Les 3 Premières Étapes",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              On y va étape par étape ! C'est comme suivre une recette de cuisine. Voici les <strong className="text-blue-400">3 premières étapes</strong> :
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-4">
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                <p className="text-emerald-400 font-bold mb-2 text-lg">Étape 1 : Donner un nom à ton équipement</p>
                <HumanCommand cmd="hostname SW-SSH" human="Je renomme mon switch 'SW-SSH' pour qu'on sache qui c'est." />
                <p className="text-slate-400 text-sm mt-2">
                  💡 <strong>Pourquoi ?</strong> Au lieu d'avoir "Switch#" comme prompt, tu auras "SW-SSH#". 
                  C'est plus clair quand tu gères plusieurs équipements !
                </p>
                <p className="text-slate-500 text-xs mt-1 italic">Autres exemples : R-Bureau, SW-Salle1, Router-Maison</p>
              </div>
              
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                <p className="text-emerald-400 font-bold mb-2 text-lg">Étape 2 : Définir un nom de domaine</p>
                <HumanCommand cmd="ip domain-name novatech.local" human="Je définis le domaine 'novatech.local' (comme un nom de famille)." />
                <p className="text-slate-400 text-sm mt-2">
                  💡 <strong>Pourquoi ?</strong> C'est obligatoire pour générer les clés RSA. Sans ça, pas de clés = pas de SSH !
                  C'est comme avoir besoin d'un nom complet pour créer une carte d'identité.
                </p>
                <p className="text-slate-500 text-xs mt-1 italic">Exemples : entreprise.fr, lab.local, monreseau.com</p>
              </div>
              
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                <p className="text-emerald-400 font-bold mb-2 text-lg">Étape 3 : Créer un utilisateur</p>
                <HumanCommand cmd="username admin privilege 15 secret admin123" human="Je crée un utilisateur 'admin' avec tous les droits (niveau 15) et le mot de passe 'admin123'." />
                <p className="text-slate-400 text-sm mt-2">
                  💡 <strong>Décortiquons cette commande :</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                    <li><code className="bg-black/40 px-1 rounded">username admin</code> = le nom de l'utilisateur</li>
                    <li><code className="bg-black/40 px-1 rounded">privilege 15</code> = tous les droits (comme être admin)</li>
                    <li><code className="bg-black/40 px-1 rounded">secret admin123</code> = le mot de passe (chiffré automatiquement)</li>
                  </ul>
                </p>
                <p className="text-slate-500 text-xs mt-2 italic">
                  Exemple avec utilisateur limité : <code className="bg-black/40 px-1 rounded">username consult privilege 1 secret consult123</code> 
                  (peut seulement consulter, pas modifier)
                </p>
              </div>
            </div>
            <ProTip>
              <strong>Astuce :</strong> Tu peux créer plusieurs utilisateurs avec des niveaux différents. 
              Par exemple : un admin (niveau 15) et un stagiaire (niveau 1) qui peut seulement regarder.
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Configuration SSH : Les 3 Dernières Étapes",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              On continue ! Les <strong className="text-blue-400">3 dernières étapes</strong> pour finaliser SSH :
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-4">
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                <p className="text-emerald-400 font-bold mb-2 text-lg">Étape 4 : Générer les clés de chiffrement</p>
                <HumanCommand cmd="crypto key generate rsa" human="Je génère les clés RSA (comme créer une paire de clés : une publique, une privée)." />
                <p className="text-slate-400 text-sm mt-2">
                  💡 <strong>Quand tu tapes ça, le routeur va te demander :</strong> "Quelle taille de clé ?" 
                  Tu réponds <strong>1024</strong> ou <strong>2048</strong> (plus c'est grand, plus c'est sécurisé, mais plus c'est lent).
                </p>
                <div className="bg-slate-900/50 rounded p-2 mt-2 text-xs text-slate-300">
                  <p className="font-mono">The name for the keys will be: R-Sec.novatech.local</p>
                  <p className="font-mono">Choose the size of the key modulus: <span className="text-emerald-400">1024</span></p>
                </div>
                <p className="text-slate-500 text-xs mt-2 italic">
                  💡 <strong>Astuce :</strong> Tape juste "1024" et appuie sur Entrée. C'est le minimum recommandé.
                </p>
              </div>
              
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                <p className="text-emerald-400 font-bold mb-2 text-lg">Étape 5 : Configurer les lignes VTY (les portes d'entrée)</p>
                <p className="text-slate-300 text-sm mb-3">
                  Les lignes VTY, c'est comme les <strong>"portes d'entrée"</strong> pour les connexions à distance. 
                  On va les configurer pour accepter seulement SSH.
                </p>
                <HumanCommand cmd="line vty 0 4" human="Je configure les lignes 0 à 4 (5 portes d'entrée pour 5 connexions simultanées)." />
                <p className="text-slate-400 text-xs mt-1 ml-4">
                  💡 <strong>Pourquoi 0 à 4 ?</strong> Ça veut dire 5 lignes (0, 1, 2, 3, 4). 
                  Tu peux avoir jusqu'à 5 personnes connectées en même temps.
                </p>
                <HumanCommand cmd="login local" human="Je dis 'utilise les comptes locaux qu'on a créés avec username'." />
                <p className="text-slate-400 text-xs mt-1 ml-4">
                  💡 Sans ça, le routeur ne saurait pas quel compte utiliser pour se connecter !
                </p>
                <HumanCommand cmd="transport input ssh" human="Je dis 'seulement SSH est autorisé, pas Telnet'." />
                <p className="text-slate-400 text-xs mt-1 ml-4">
                  💡 <strong>Important :</strong> Ça bloque Telnet (non sécurisé) et autorise seulement SSH (sécurisé). 
                  C'est comme fermer la porte d'entrée non sécurisée et garder seulement la porte blindée !
                </p>
              </div>
            </div>
            <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
              <p className="text-emerald-200 font-bold mb-2">✅ Résumé en langage simple :</p>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Tu as créé les clés de chiffrement (étape 4) et ouvert les portes d'entrée pour SSH uniquement (étape 5). 
                Maintenant ton équipement est prêt à accepter des connexions SSH sécurisées !
              </p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Renforcer la Sécurité SSH (Optionnel mais Recommandé)",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              SSH fonctionne déjà maintenant, mais on peut le rendre <strong className="text-blue-400">encore plus sécurisé</strong> 
              avec ces 3 paramètres optionnels (mais très recommandés !) :
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-4">
              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
                <HumanCommand 
                  cmd="ip ssh version 2" 
                  human="Je force l'utilisation de SSH version 2 uniquement (la plus récente et sécurisée)." 
                />
                <p className="text-slate-400 text-sm mt-2">
                  💡 <strong>Pourquoi ?</strong> Il existe SSH version 1 (ancienne, moins sécurisée) et version 2 (moderne, très sécurisée). 
                  On veut seulement la version 2, comme refuser les vieilles serrures et accepter seulement les nouvelles.
                </p>
              </div>
              
              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
                <HumanCommand 
                  cmd="ip ssh time-out 60" 
                  human="Si quelqu'un se connecte mais ne fait rien pendant 60 secondes, il est déconnecté automatiquement." 
                />
                <p className="text-slate-400 text-sm mt-2">
                  💡 <strong>Pourquoi ?</strong> C'est comme fermer automatiquement une porte laissée ouverte. 
                  Si quelqu'un oublie sa session ouverte, elle se ferme toute seule après 1 minute d'inactivité. 
                  Ça évite les sessions "oubliées" qui restent ouvertes.
                </p>
                <p className="text-slate-500 text-xs mt-1 italic">Tu peux mettre 120, 300, etc. selon tes besoins (en secondes).</p>
              </div>
              
              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
                <HumanCommand 
                  cmd="ip ssh authentication-retries 3" 
                  human="Maximum 3 tentatives de mot de passe. Après ça, la connexion est refusée." 
                />
                <p className="text-slate-400 text-sm mt-2">
                  💡 <strong>Pourquoi ?</strong> C'est une protection contre les "attaques par force brute" : 
                  quelqu'un qui essaie des milliers de mots de passe pour trouver le bon. 
                  Avec cette limite, après 3 mauvais essais, la connexion est bloquée.
                </p>
                <p className="text-slate-500 text-xs mt-1 italic">
                  Exemple : Si quelqu'un tape 3 fois le mauvais mot de passe, il doit attendre avant de réessayer.
                </p>
              </div>
            </div>
            <DangerZone>
              <strong>⚠️ Important :</strong> Ces paramètres sont <strong>optionnels</strong> (SSH fonctionne sans), 
              mais en production (vraie entreprise), <strong>toujours les configurer</strong> ! 
              C'est comme mettre une alarme en plus d'une serrure : pas obligatoire, mais très recommandé.
            </DangerZone>
            <ProTip>
              <strong>Résumé simple :</strong> Version 2 = plus sécurisé, Timeout = ferme les sessions oubliées, 
              Retries = bloque les tentatives de piratage. Trois couches de sécurité en plus !
            </ProTip>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Les Niveaux de Privilège : Qui Peut Faire Quoi ?",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Les niveaux de privilège, c'est comme les <strong className="text-blue-400">niveaux d'accès</strong> dans un jeu vidéo ou dans un immeuble avec des badges :
            </p>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30 mb-4">
              <p className="text-blue-200 text-sm leading-relaxed">
                💡 <strong>Exemple concret :</strong> Dans un immeuble, il y a des badges différents :
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Badge visiteur = peut seulement entrer dans le hall (niveau 0)</li>
                  <li>Badge employé = peut entrer dans les bureaux (niveau 1)</li>
                  <li>Badge admin = peut TOUT faire, même la salle serveurs (niveau 15)</li>
                </ul>
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-4">
              <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-red-400 font-bold text-2xl">0</span>
                  <span className="text-red-300 font-bold text-lg">Accès Ultra-Limité</span>
                </div>
                <p className="text-slate-300 text-sm mb-2">
                  C'est comme un <strong>visiteur</strong> : il peut seulement faire des trucs basiques.
                </p>
                <p className="text-slate-400 text-xs mb-2"><strong>Peut faire :</strong> ping, logout, exit</p>
                <p className="text-slate-400 text-xs mb-2"><strong>Ne peut PAS faire :</strong> show running-config, configure terminal, etc.</p>
                <code className="bg-black/40 text-red-300 px-3 py-1 rounded font-mono text-xs block mt-2">
                  username stagiaire privilege 0 secret stagiaire123
                </code>
                <p className="text-slate-500 text-xs mt-2 italic">💡 Utilisé pour : stagiaires, visiteurs, comptes très limités</p>
              </div>
              
              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-yellow-400 font-bold text-2xl">1</span>
                  <span className="text-yellow-300 font-bold text-lg">Accès Utilisateur (Par Défaut)</span>
                </div>
                <p className="text-slate-300 text-sm mb-2">
                  C'est comme un <strong>employé normal</strong> : il peut consulter mais pas modifier.
                </p>
                <p className="text-slate-400 text-xs mb-2"><strong>Peut faire :</strong> show (toutes les commandes show), ping, traceroute, telnet, ssh</p>
                <p className="text-slate-400 text-xs mb-2"><strong>Ne peut PAS faire :</strong> configure terminal, copy, reload, erase</p>
                <code className="bg-black/40 text-yellow-300 px-3 py-1 rounded font-mono text-xs block mt-2">
                  username consult privilege 1 secret consult123
                </code>
                <p className="text-slate-500 text-xs mt-2 italic">💡 Utilisé pour : techniciens qui doivent regarder mais pas modifier</p>
              </div>
              
              <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-emerald-400 font-bold text-2xl">15</span>
                  <span className="text-emerald-300 font-bold text-lg">Administrateur (Tous les Droits)</span>
                </div>
                <p className="text-slate-300 text-sm mb-2">
                  C'est comme le <strong>boss</strong> : il peut TOUT faire, absolument tout !
                </p>
                <p className="text-slate-400 text-xs mb-2"><strong>Peut faire :</strong> TOUTES les commandes (configure terminal, copy, reload, erase, etc.)</p>
                <p className="text-slate-400 text-xs mb-2"><strong>Équivalent à :</strong> être en mode <code className="bg-black/40 px-1 rounded">enable</code> en permanence</p>
                <code className="bg-black/40 text-emerald-300 px-3 py-1 rounded font-mono text-xs block mt-2">
                  username admin privilege 15 secret admin123
                </code>
                <p className="text-slate-500 text-xs mt-2 italic">💡 Utilisé pour : administrateurs réseau, responsables IT</p>
              </div>
            </div>
            <ProTip>
              <strong>Astuce pratique :</strong> Tu peux créer plusieurs utilisateurs avec des niveaux différents sur le même équipement. 
              Par exemple : un admin (niveau 15), un technicien (niveau 1), et un stagiaire (niveau 0). 
              Chacun aura accès selon son niveau !
            </ProTip>
          </div>
        )
      },
      {
        type: 'privilege_explorer',
        title: "Explorer les Niveaux de Privilège"
      },
      {
        type: 'ssh_configurator',
        title: "Simulateur de Configuration SSH"
      },
      {
        type: 'command_builder',
        title: "Construire la Configuration SSH",
        steps: [
          { cmd: "hostname R-Sec", desc: "Nommer l'équipement" },
          { cmd: "ip domain-name novatech.local", desc: "Définir le domaine" },
          { cmd: "username admin privilege 15 secret admin123", desc: "Créer un utilisateur admin" },
          { cmd: "crypto key generate rsa", desc: "Générer les clés RSA" },
          { cmd: "line vty 0 4", desc: "Configurer les lignes VTY" },
          { cmd: "login local", desc: "Activer l'authentification locale" },
          { cmd: "transport input ssh", desc: "Autoriser uniquement SSH" }
        ]
      },
      {
        type: 'rich_text',
        title: "Les Lignes VTY : Les Portes d'Entrée à Distance",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              <strong className="text-blue-400">VTY = Virtual Teletype Lines</strong> = Les <strong>"portes d'entrée virtuelles"</strong> pour se connecter à distance.
            </p>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-blue-200 mb-3"><strong>💡 Exemple concret :</strong></p>
              <p className="text-blue-100 text-sm leading-relaxed">
                Imagine ton routeur comme un immeuble :
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Console (câble bleu)</strong> = la porte d'entrée physique (tu es sur place avec un câble)</li>
                  <li><strong>Lignes VTY</strong> = les portes d'entrée virtuelles pour les connexions à distance (via réseau)</li>
                </ul>
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <p className="text-slate-200">
                Ces connexions peuvent se faire via <strong className="text-red-400">Telnet</strong> (non sécurisé, comme une porte sans serrure) 
                ou <strong className="text-emerald-400">SSH</strong> (sécurisé, comme une porte blindée). 
                On privilégie toujours SSH !
              </p>
            </div>
            <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
              <p className="text-emerald-200 font-bold mb-2 text-lg">Que veut dire "line vty 0 4" ?</p>
              <div className="space-y-2 text-emerald-100 text-sm">
                <p>
                  Les lignes VTY sont <strong>numérotées</strong>, comme des portes numérotées dans un immeuble.
                </p>
                <p>
                  <code className="bg-black/40 px-2 py-1 rounded font-mono">line vty 0 4</code> signifie que tu configures les lignes 
                  <strong> 0, 1, 2, 3, et 4</strong>.
                </p>
                <p>
                  <strong>Résultat :</strong> Tu peux avoir <strong>5 personnes connectées en même temps</strong> à distance !
                </p>
              </div>
              <div className="bg-slate-900/50 rounded p-3 mt-3">
                <p className="text-slate-300 text-xs mb-2"><strong>Exemple visuel :</strong></p>
                <div className="font-mono text-xs text-slate-400 space-y-1">
                  <p>Ligne VTY 0 ← Personne 1 peut se connecter</p>
                  <p>Ligne VTY 1 ← Personne 2 peut se connecter</p>
                  <p>Ligne VTY 2 ← Personne 3 peut se connecter</p>
                  <p>Ligne VTY 3 ← Personne 4 peut se connecter</p>
                  <p>Ligne VTY 4 ← Personne 5 peut se connecter</p>
                  <p className="text-red-400 mt-2">Ligne VTY 5 ← Plus de place ! (pas configurée)</p>
                </div>
              </div>
            </div>
            <ProTip>
              <strong>Astuce :</strong> Sur certains équipements plus puissants, tu peux avoir <code className="bg-black/40 px-1 rounded">line vty 0 15</code> 
              pour jusqu'à <strong>16 connexions simultanées</strong> (lignes 0 à 15) ! 
              C'est utile si plusieurs personnes doivent gérer l'équipement en même temps.
            </ProTip>
            <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
              <p className="text-yellow-200 text-sm">
                <strong>⚠️ Cas pratique :</strong> Si tu configures seulement <code className="bg-black/40 px-1 rounded">line vty 0</code> 
                (une seule ligne), alors <strong>une seule personne</strong> pourra se connecter à distance à la fois. 
                Les autres verront "Connection refused" (connexion refusée).
              </p>
            </div>
          </div>
        )
      },
      {
        type: 'rich_text',
        title: "Comment Vérifier que SSH Fonctionne ?",
        content: (
          <div className="space-y-4">
            <p className="text-slate-200 leading-relaxed text-lg">
              Après avoir tout configuré, tu veux être sûr que SSH fonctionne bien ? Voici <strong className="text-blue-400">3 commandes magiques</strong> pour vérifier :
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-4">
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                <HumanCommand 
                  cmd="show ip ssh" 
                  human="Je vérifie le statut SSH : est-ce qu'il est activé ? Quelle version ? Quel timeout ?" 
                />
                <div className="bg-slate-900/50 rounded p-3 mt-2 text-xs">
                  <p className="text-green-300 font-mono mb-1">R-Sec# show ip ssh</p>
                  <p className="text-slate-300 font-mono">SSH Enabled - version 2.0</p>
                  <p className="text-slate-300 font-mono">Authentication timeout: 60 secs</p>
                  <p className="text-slate-300 font-mono">Authentication retries: 3</p>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  💡 Si tu vois <strong>"SSH Enabled"</strong>, c'est bon signe ! Ça veut dire que SSH est actif.
                </p>
              </div>
              
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                <HumanCommand 
                  cmd="show running-config | section line vty" 
                  human="Je vérifie la configuration des lignes VTY (est-ce que transport input ssh est bien là ?)." 
                />
                <div className="bg-slate-900/50 rounded p-3 mt-2 text-xs">
                  <p className="text-green-300 font-mono mb-1">R-Sec# show running-config | section line vty</p>
                  <p className="text-slate-300 font-mono">line vty 0 4</p>
                  <p className="text-emerald-400 font-mono"> login local</p>
                  <p className="text-emerald-400 font-mono"> transport input ssh</p>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  💡 Tu dois voir <code className="bg-black/40 px-1 rounded">transport input ssh</code> et <code className="bg-black/40 px-1 rounded">login local</code>. 
                  Si tu vois ça, c'est parfait !
                </p>
              </div>
              
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                <HumanCommand 
                  cmd="show crypto key mypubkey rsa" 
                  human="Je vérifie que les clés RSA sont bien générées (sans ça, SSH ne marche pas)." 
                />
                <div className="bg-slate-900/50 rounded p-3 mt-2 text-xs">
                  <p className="text-green-300 font-mono mb-1">R-Sec# show crypto key mypubkey rsa</p>
                  <p className="text-slate-300 font-mono">Key name: R-Sec.novatech.local</p>
                  <p className="text-slate-300 font-mono">Key type: RSA PUBLIC KEY</p>
                  <p className="text-emerald-400 font-mono">Key Data: 30820122 300D0609...</p>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  💡 Si tu vois une clé avec des chiffres et lettres (comme "30820122..."), c'est bon ! 
                  Les clés RSA sont générées.
                </p>
              </div>
            </div>
            <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
              <p className="text-emerald-200 font-bold mb-2">✅ Test Final : Essaie de te connecter !</p>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Depuis un autre ordinateur sur le même réseau, essaie de te connecter en SSH :
                <code className="bg-black/40 px-2 py-1 rounded font-mono text-xs block mt-2">
                  ssh admin@192.168.1.1
                </code>
                Si ça te demande le mot de passe et que tu arrives à te connecter, <strong>c'est gagné !</strong> 🎉
              </p>
            </div>
            <ProTip>
              <strong>Astuce de dépannage :</strong> Si SSH ne fonctionne pas, vérifie ces 3 choses dans l'ordre : 
              (1) Les clés RSA sont générées ? (2) transport input ssh est configuré ? (3) L'adresse IP est correcte ?
            </ProTip>
          </div>
        )
      },
      {
        type: 'interactive_quiz',
        title: "Quiz Interactif : Teste tes Connaissances SSH",
        questions: [
          { q: "Sur quel port SSH fonctionne-t-il par défaut ?", options: ["Port 21", "Port 22", "Port 23"], a: 1 },
          { q: "Quelle est la principale différence entre SSH et Telnet ?", options: ["SSH est plus rapide", "SSH chiffre les données, Telnet les envoie en clair", "Aucune différence"], a: 1 },
          { q: "Pourquoi faut-il générer une clé RSA pour utiliser SSH ?", options: ["Ce n'est pas nécessaire", "Elle permet l'établissement de connexions chiffrées", "Pour accélérer les connexions"], a: 1 },
          { q: "Que signifie 'line vty 0 4' ?", options: ["Configuration de 1 ligne", "Configuration des lignes 0 à 4, soit 5 sessions simultanées", "Configuration de 10 lignes"], a: 1 },
          { q: "Quel niveau de privilège donne tous les droits (administrateur) ?", options: ["Niveau 0", "Niveau 1", "Niveau 15"], a: 2 }
        ]
      },
      {
        type: 'flashcards',
        title: "Flashcards : Commandes SSH",
        mode: 'command_to_definition',
        cards: [
          { q: "hostname <nom>", a: "Définir le nom d'hôte de l'équipement" },
          { q: "ip domain-name <domaine>", a: "Définir le nom de domaine (nécessaire pour générer la clé RSA)" },
          { q: "username <nom> privilege <niveau> secret <mdp>", a: "Créer un utilisateur local avec niveau de privilège et mot de passe" },
          { q: "crypto key generate rsa", a: "Générer les clés RSA pour SSH (minimum 1024 bits)" },
          { q: "line vty 0 4", a: "Accéder aux lignes de connexion distante (5 sessions)" },
          { q: "login local", a: "Forcer l'authentification par comptes utilisateurs locaux" },
          { q: "transport input ssh", a: "Autoriser uniquement SSH sur les lignes VTY (pas Telnet)" },
          { q: "ip ssh version 2", a: "Forcer l'utilisation de SSH version 2 (plus sécurisée)" },
          { q: "ip ssh time-out <secondes>", a: "Définir le timeout d'inactivité avant déconnexion" },
          { q: "ip ssh authentication-retries <nombre>", a: "Limiter le nombre de tentatives de connexion" },
          { q: "interface vlan 1", a: "Accéder à l'interface virtuelle VLAN 1 (pour donner une IP au switch)" },
          { q: "ip address <ip> <masque>", a: "Configurer une adresse IP sur une interface" },
          { q: "no shutdown", a: "Activer une interface (par défaut elle est désactivée)" },
          { q: "show ip ssh", a: "Afficher le statut et la configuration SSH" },
          { q: "show crypto key mypubkey rsa", a: "Afficher les clés RSA générées" }
        ]
      },
      {
        type: 'lab_correction',
        title: "Correction du Lab 2 : Configuration SSH Complète"
      }
    ],
    lab: {
      title: "Lab 2 : Sécurisation SSH Complète",
      context: "SCÉNARIO : Vous êtes missionné par NovaTech pour sécuriser l'accès à distance. Configurez SSH sur le routeur R-Sec et le switch SW-Core avec différents niveaux de privilèges.",
      initialPrompt: "Router>",
      tasks: [
        { cmd: "enable", desc: "Passer en mode privilégié" },
        { cmd: "configure terminal", desc: "Entrer en configuration globale" },
        { cmd: "hostname R-Sec", desc: "Renommer le routeur" },
        { cmd: "ip domain-name novatech.local", desc: "Définir le nom de domaine" },
        { cmd: "username admin privilege 15 secret admin123", desc: "Créer un utilisateur admin avec privilège 15" },
        { cmd: "username consult privilege 1 secret consult123", desc: "Créer un utilisateur avec privilège 1 (consultation)" },
        { cmd: "crypto key generate rsa", desc: "Générer les clés RSA (choisir 1024 bits minimum)" },
        { cmd: "line vty 0 4", desc: "Configurer les lignes VTY" },
        { cmd: "login local", desc: "Activer l'authentification locale" },
        { cmd: "transport input ssh", desc: "Autoriser uniquement SSH" },
        { cmd: "exit", desc: "Sortir des lignes VTY" },
        { cmd: "ip ssh version 2", desc: "Forcer SSH version 2" },
        { cmd: "ip ssh time-out 60", desc: "Définir timeout à 60 secondes" },
        { cmd: "ip ssh authentication-retries 3", desc: "Limiter à 3 tentatives" },
        { cmd: "interface gigabitethernet 0/0", desc: "Configurer l'interface du routeur" },
        { cmd: "ip address 192.168.1.1 255.255.255.0", desc: "Donner une IP au routeur" },
        { cmd: "no shutdown", desc: "Activer l'interface" },
        { cmd: "exit", desc: "Sortir de l'interface" },
        { cmd: "exit", desc: "Sortir du mode config" },
        { cmd: "copy running-config startup-config", desc: "Sauvegarder la configuration" }
      ],
      validations: {
        "enable": { nextPrompt: "Router#", msg: "OK. Mode privilégié activé." },
        "configure terminal": { nextPrompt: "Router(config)#", msg: "Mode configuration globale activé." },
        "hostname R-Sec": { nextPrompt: "R-Sec(config)#", msg: "Routeur renommé R-Sec." },
        "ip domain-name": { msg: "Nom de domaine configuré. Nécessaire pour générer la clé RSA." },
        "username admin": { msg: "Utilisateur admin créé avec privilège 15 (tous les droits)." },
        "username consult": { msg: "Utilisateur consult créé avec privilège 1 (consultation uniquement)." },
        "crypto key": { msg: "Clés RSA générées. SSH peut maintenant fonctionner." },
        "line vty": { nextPrompt: "R-Sec(config-line)#", msg: "Configuration des lignes VTY (5 sessions simultanées)." },
        "login local": { msg: "Authentification locale activée. Les comptes username seront utilisés." },
        "transport input ssh": { msg: "SSH uniquement activé. Telnet est désormais bloqué." },
        "exit": { msg: "Sortie effectuée." },
        "ip ssh version": { msg: "SSH version 2 forcée (plus sécurisée)." },
        "ip ssh time-out": { msg: "Timeout configuré à 60 secondes d'inactivité." },
        "ip ssh authentication-retries": { msg: "Limite de 3 tentatives configurée (protection brute force)." },
        "interface gigabitethernet": { nextPrompt: "R-Sec(config-if)#", msg: "Configuration de l'interface GigabitEthernet." },
        "ip address": { msg: "Adresse IP configurée sur l'interface." },
        "no shutdown": { msg: "Interface activée." },
        "copy": { msg: "[OK] Configuration sauvegardée en NVRAM." }
      }
    },
    quiz: [
      { q: "Qu'est-ce que SSH ?", options: ["Un protocole de communication chiffré pour accéder à distance", "Un protocole non sécurisé comme Telnet", "Une commande pour redémarrer un routeur"], a: 0 },
      { q: "Sur quel port SSH fonctionne-t-il par défaut ?", options: ["Port 21", "Port 22", "Port 23"], a: 1 },
      { q: "Quelle est la principale différence entre SSH et Telnet ?", options: ["SSH est plus rapide", "SSH chiffre les données, Telnet les envoie en clair", "Aucune différence"], a: 1 },
      { q: "Pourquoi faut-il générer une clé RSA pour utiliser SSH ?", options: ["Ce n'est pas nécessaire", "Elle permet l'établissement de connexions chiffrées. Sans elle, SSH ne peut pas fonctionner", "Pour accélérer les connexions"], a: 1 },
      { q: "Que signifie 'line vty 0 4' ?", options: ["Configuration de 1 ligne", "Configuration des lignes 0 à 4, soit 5 sessions simultanées", "Configuration de 10 lignes"], a: 1 },
      { q: "À quoi sert la commande 'login local' ?", options: ["Elle force l'utilisation des comptes utilisateurs locaux définis avec username", "Elle désactive l'authentification", "Elle active Telnet"], a: 0 },
      { q: "Quelle commande permet de vérifier que SSH est activé ?", options: ["show ssh", "show ip ssh", "show crypto"], a: 1 },
      { q: "Pourquoi définir un nom d'hôte et un nom de domaine pour SSH ?", options: ["Ce n'est pas nécessaire", "Ils sont nécessaires pour générer la clé RSA. SSH dépend de ces informations", "Pour améliorer les performances"], a: 1 },
      { q: "Peut-on utiliser SSH sur un switch de couche 2 ?", options: ["Non, impossible", "Oui, à condition d'avoir une interface VLAN configurée avec une IP et tous les prérequis SSH", "Oui, sans aucune condition"], a: 1 },
      { q: "Pourquoi limiter les tentatives d'authentification SSH ?", options: ["Pour ralentir les connexions", "Pour se protéger contre les attaques par brute force et sécuriser l'accès", "Ce n'est pas recommandé"], a: 1 },
      { q: "Quel niveau de privilège donne tous les droits (administrateur) ?", options: ["Niveau 0", "Niveau 1", "Niveau 15"], a: 2 },
      { q: "Que fait la commande 'transport input ssh' ?", options: ["Active Telnet", "Autorise uniquement SSH sur les lignes VTY (bloque Telnet)", "Désactive SSH"], a: 1 },
      { q: "Comment donner une adresse IP à un switch de couche 2 ?", options: ["Via une interface physique", "Via une interface VLAN virtuelle (interface vlan 1)", "C'est impossible"], a: 1 },
      { q: "Que fait 'ip ssh version 2' ?", options: ["Désactive SSH", "Force l'utilisation de SSH version 2 (plus sécurisée)", "Active SSH version 1"], a: 1 }
    ]
  },
  {
    id: 3,
    title: "Session 3 : Le Videur (ACL)",
    duration: "1h15",
    icon: <Shield className="w-5 h-5" />,
    slides: [
      {
        type: 'intro',
        title: "Principe d'une ACL",
        content: `Une ACL est une liste de règles 'permit' / 'deny'.
À la fin, il y a toujours un 'deny any' caché.`
      },
      {
        type: 'rich_text',
        title: "Écrire une ACL simple",
        content: (
          <div className="space-y-2">
            <HumanCommand 
              cmd="access-list 10 permit 192.168.1.10" 
              human="Le VIP 192.168.1.10 a le droit d'entrer." 
            />
          </div>
        )
      }
    ],
    lab: {
      title: "Lab 3 : Filtrage basique",
      context: "Autoriser un seul client à se connecter.",
      initialPrompt: "Router(config)#",
      tasks: [
        { cmd: "access-list 10 permit 192.168.1.10", desc: "Créer la liste VIP" }
      ],
      validations: {
        "access-list": { msg: "ACL créée. N'oubliez pas : deny any implicite." }
      }
    },
    quiz: [
      { q: "Que fait la règle implicite à la fin d'une ACL ?", options: ["Autorise tout", "Refuse tout le reste", "Rien"], a: 1 }
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
        return <CommandBuilder steps={s.steps} />;
      case 'privilege_explorer':
        return <PrivilegeExplorer />;
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

const TerminalSimulator = ({ scenario }) => {
  const [history, setHistory] = useState([
    "Cisco IOS Software, C2900 Software (C2900-UNIVERSALK9-M)",
    "Press RETURN to get started!",
    ""
  ]);
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState(scenario.initialPrompt);
  const [completedTasks, setCompletedTasks] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

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
      } else {
        // Commande incorrecte ou pas dans le bon ordre
        response = `% Erreur : Vous devez d'abord exécuter : ${expectedTask.cmd}`;
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

const QuizForm = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleValidate = () => {
    let score = 0;
    questions.forEach((q, i) => { if (answers[i] === q.a) score++; });
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

// --- MAIN APP : THÉORIE + LAB + QUIZ ---

export default function NetMasterClass() {
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [activeTab, setActiveTab] = useState('theory');
  const [completedSessions, setCompletedSessions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quizScore, setQuizScore] = useState(null);

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
            Semaine 1 : Fondamentaux
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
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => {
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
                {activeSession.title}
              </h2>
            </div>
          </div>

          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 w-full md:w-auto overflow-x-auto">
            {[
              { id: 'theory', label: 'Théorie & Concepts', icon: BookOpen },
              { id: 'lab', label: 'Lab Pratique', icon: Terminal },
              { id: 'quiz', label: 'Validation', icon: Award }
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
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            {activeTab === 'theory' && <TheoryPlayer slides={activeSession.slides} lab={activeSession.lab} />}

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
                  <TerminalSimulator scenario={activeSession.lab} />
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
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
        </main>
      </div>
    </div>
  );
}

