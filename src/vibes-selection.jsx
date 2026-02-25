import React from 'react';
import { ArrowRight, Calculator, Hash, LayoutGrid, PenTool, Table as TableIcon, Layers, ChevronRight } from 'lucide-react';

const SubnetTheoryDisplay = () => {
  const cidrData = [
    { prefix: '/30', mask: '255.255.255.252', bits: '2', hosts: '2' },
    { prefix: '/29', mask: '255.255.255.248', bits: '3', hosts: '6' },
    { prefix: '/28', mask: '255.255.255.240', bits: '4', hosts: '14' },
    { prefix: '/27', mask: '255.255.255.224', bits: '5', hosts: '30' },
    { prefix: '/26', mask: '255.255.255.192', bits: '6', hosts: '62' },
    { prefix: '/25', mask: '255.255.255.128', bits: '7', hosts: '126' },
    { prefix: '/24', mask: '255.255.255.0', bits: '8', hosts: '254' },
  ];

  return (
    <div className="min-h-screen bg-[#0a051a] text-slate-100 font-sans p-4 md:p-8 space-y-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto relative z-10 border-b border-white/10 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Vibes — Cours Théorique Adressage IP</h1>
        <p className="text-slate-400 max-w-2xl text-lg">Choisis le style qui remplacera le V2Terminal pour les slides théoriques.</p>
      </header>

      {/* VIBE 1: TABLEAU ACADÉMIQUE */}
      <section className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-600/20 rounded-lg border border-purple-500/30">
            <TableIcon className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">Vibe 1 — Tableau Académique</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#0e0920] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 bg-white/5">
              <h3 className="font-bold text-lg">Méthodologie de Calcul</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-6 py-4 border-b border-white/10">Étape</th>
                  <th className="px-6 py-4 border-b border-white/10">Opération</th>
                  <th className="px-6 py-4 border-b border-white/10">Résultat</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 border-b border-white/10 font-medium">1. Besoin hôtes</td>
                  <td className="px-6 py-4 border-b border-white/10">50 machines + 2 (réseau/broadcast)</td>
                  <td className="px-6 py-4 border-b border-white/10 text-purple-400 font-bold">52</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 border-b border-white/10 font-medium">2. Puissance de 2</td>
                  <td className="px-6 py-4 border-b border-white/10">{"2^n ≥ 52"}</td>
                  <td className="px-6 py-4 border-b border-white/10 text-purple-400 font-bold">{"2^6 = 64"}</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 border-b border-white/10 font-medium">3. Préfixe CIDR</td>
                  <td className="px-6 py-4 border-b border-white/10">32 - 6 bits hôtes</td>
                  <td className="px-6 py-4 border-b border-white/10 text-purple-400 font-bold">/26</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 border-b border-white/10 font-medium">4. Masque Final</td>
                  <td className="px-6 py-4 border-b border-white/10">Conversion /26</td>
                  <td className="px-6 py-4 border-b border-white/10 text-emerald-400 font-bold">255.255.255.192</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#0e0920] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 bg-white/5">
              <h3 className="font-bold text-lg">Table de Référence CIDR</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-6 py-4 border-b border-white/10">CIDR</th>
                  <th className="px-6 py-4 border-b border-white/10">Masque Décimal</th>
                  <th className="px-6 py-4 border-b border-white/10 text-right">Hôtes utiles</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {cidrData.map((row) => (
                  <tr key={row.prefix} className={`hover:bg-white/[0.02] transition-colors ${row.prefix === '/26' ? 'bg-purple-500/10' : ''}`}>
                    <td className="px-6 py-3 border-b border-white/10 font-mono font-bold text-purple-400">{row.prefix}</td>
                    <td className="px-6 py-3 border-b border-white/10 font-mono text-sm">{row.mask}</td>
                    <td className="px-6 py-3 border-b border-white/10 text-right font-mono">{row.hosts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* VIBE 2: STEP CALCULATOR */}
      <section className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
            <Calculator className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Vibe 2 — Step Calculator</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
          {[
            { label: 'Besoin', value: '50 Machines', icon: '01' },
            { label: 'Réseau+Broadcast', value: '+ 2 = 52', icon: '02' },
            { label: 'Puissance 2', value: '2^6 = 64', icon: '03' },
            { label: 'CIDR', value: '/26', icon: '04' },
            { label: 'Masque', value: '.192', icon: '05' },
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="bg-[#1a1035] border border-white/10 p-6 rounded-2xl relative group hover:border-purple-500/50 transition-all shadow-xl flex-1">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-xs font-black shadow-lg shadow-purple-500/20">
                  {step.icon}
                </div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{step.label}</div>
                <div className="text-xl font-bold text-white">{step.value}</div>
              </div>
              {idx < 4 && (
                <ChevronRight className="w-5 h-5 text-slate-700 hidden md:block flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Progression des Masques CIDR</h4>
          <div className="flex flex-wrap gap-4">
            {cidrData.map((row) => (
              <div key={row.prefix} className={`flex-1 min-w-[100px] p-4 rounded-xl border transition-all ${row.prefix === '/26' ? 'bg-purple-600/20 border-purple-500/50 shadow-lg shadow-purple-500/10' : 'bg-white/5 border-white/10'}`}>
                <div className="text-xs text-slate-500 font-bold mb-1">{row.prefix}</div>
                <div className="text-sm font-mono text-slate-300">{row.mask}</div>
                <div className="text-xs text-slate-600 mt-1">{row.hosts} hôtes</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIBE 3: INFO TILES */}
      <section className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-600/20 rounded-lg border border-emerald-500/30">
            <LayoutGrid className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Vibe 3 — Info Tiles</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col justify-between h-32 hover:bg-white/[0.06] transition-all">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Utilisateurs</span>
            <div className="text-3xl font-bold text-white">50</div>
          </div>
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col justify-between h-32 hover:bg-white/[0.06] transition-all">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Requis</span>
            <div className="text-3xl font-bold text-purple-400">52</div>
          </div>
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col justify-between h-32 hover:bg-white/[0.06] transition-all">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Taille Bloc</span>
            <div className="text-3xl font-bold text-blue-400">64</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex flex-col justify-between h-32 shadow-xl shadow-purple-500/5">
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">Préfixe</span>
            <div className="text-3xl font-bold text-white">/26</div>
          </div>
          <div className="col-span-2 md:col-span-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col justify-between h-32 hover:bg-white/[0.06] transition-all">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Masque IP</span>
            <div className="text-xl font-mono font-bold text-emerald-400">255.255.255.192</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1035] border border-white/10 p-6 rounded-2xl">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <Hash className="w-3 h-3" /> Puissances de 2 (Reference)
            </h4>
            <div className="flex justify-between text-sm font-mono">
              <div className="space-y-1">
                <div className="text-slate-400">{"2^1 = 2"}</div>
                <div className="text-slate-400">{"2^2 = 4"}</div>
                <div className="text-slate-400">{"2^3 = 8"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-400">{"2^4 = 16"}</div>
                <div className="text-slate-400">{"2^5 = 32"}</div>
                <div className="text-purple-400 font-bold">{"2^6 = 64"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-400">{"2^7 = 128"}</div>
                <div className="text-slate-400">{"2^8 = 256"}</div>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1035] border border-white/10 p-6 rounded-2xl overflow-x-auto">
             <div className="flex gap-4 items-center h-full">
                {cidrData.slice(0, 4).map(d => (
                  <div key={d.prefix} className="flex-1 text-center">
                    <div className="text-xs font-bold text-slate-500">{d.prefix}</div>
                    <div className="text-lg font-bold text-white">{d.hosts}</div>
                    <div className="text-[10px] text-slate-600">hôtes</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* VIBE 4: WHITEBOARD */}
      <section className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-600/20 rounded-lg border border-amber-500/30">
            <PenTool className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Vibe 4 — Whiteboard</span>
        </div>

        <div className="bg-slate-50 rounded-3xl p-10 text-slate-800 shadow-2xl border-b-8 border-slate-300">
          <div className="font-mono space-y-8">
            <div>
              <h3 className="text-2xl font-bold underline decoration-purple-500 decoration-4 underline-offset-8 mb-6">Calcul de Sous-Réseau : 50 machines</h3>
              <p className="text-lg mb-2">1. On ajoute les adresses Réseau & Broadcast :</p>
              <p className="text-2xl font-bold ml-8">50 + <span className="text-blue-600 underline">2</span> = <span className="bg-yellow-200 px-2">52</span> adresses au total</p>
            </div>

            <div>
              <p className="text-lg mb-2">{"2. Trouver la puissance de 2 immédiatement supérieure :"}</p>
              <div className="flex items-center gap-4 ml-8">
                <span className="line-through text-slate-400 italic">{"2^5 = 32 (Trop petit)"}</span>
                <ArrowRight className="w-5 h-5" />
                <span className="text-2xl font-bold text-purple-600">{"2^6 = 64 (OK!)"}</span>
              </div>
              <p className="text-sm mt-2 italic text-slate-500">{"Note: l'exposant (6) est le nombre de bits '0' pour les hôtes."}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
              <div>
                <p className="font-bold text-lg mb-2">3. CIDR :</p>
                <p className="text-xl">32 bits - <span className="text-purple-600 font-bold">6 bits</span> = <span className="text-3xl font-black text-blue-700">/26</span></p>
              </div>
              <div>
                <p className="font-bold text-lg mb-2">4. Masque décimal :</p>
                <p className="text-2xl font-bold">255.255.255.<span className="bg-emerald-100 border-b-4 border-emerald-500 px-2">192</span></p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-slate-300">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{"Table de survie (CIDR → Masque)"}</p>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {cidrData.map(c => (
                   <div key={c.prefix} className="text-center p-2 border border-slate-200 rounded">
                      <div className="text-xs font-bold">{c.prefix}</div>
                      <div className="text-[10px] text-slate-500">.{c.mask.split('.').pop()}</div>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIBE 5: VISUAL FORMULA */}
      <section className="max-w-6xl mx-auto space-y-12 relative z-10 pb-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-pink-600/20 rounded-lg border border-pink-500/30">
            <Layers className="w-5 h-5 text-pink-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-400">Vibe 5 — Visual Formula</span>
        </div>

        <div className="text-center space-y-16">
          <div className="inline-block relative">
            <div className="absolute -inset-4 bg-purple-500/20 blur-2xl rounded-full" />
            <div className="relative flex flex-col items-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] mb-4">La formule magique</div>
              <div className="flex items-baseline gap-4 font-mono text-4xl md:text-7xl font-bold tracking-tighter">
                <span className="text-blue-500">2</span>
                <span className="text-purple-500 text-6xl md:text-8xl">^n</span>
                <span className="text-slate-700">-</span>
                <span className="text-slate-500">2</span>
                <span className="text-slate-600 mx-4">{"≥"}</span>
                <span className="text-emerald-400">50</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="h-1 bg-blue-500 rounded-full w-12 mx-auto mb-4" />
              <div className="text-sm font-bold uppercase text-slate-500 tracking-widest">Input</div>
              <div className="text-2xl font-bold">50 Machines</div>
            </div>
            <div className="space-y-2">
              <div className="h-1 bg-purple-500 rounded-full w-12 mx-auto mb-4" />
              <div className="text-sm font-bold uppercase text-slate-500 tracking-widest">Calcul</div>
              <div className="text-2xl font-bold">n = 6 bits</div>
            </div>
            <div className="space-y-2">
              <div className="h-1 bg-emerald-500 rounded-full w-12 mx-auto mb-4" />
              <div className="text-sm font-bold uppercase text-slate-500 tracking-widest">Résultat</div>
              <div className="text-2xl font-bold text-emerald-400">/26 Masque</div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-white/[0.02] border border-white/5 p-4 rounded-full flex justify-between px-8 items-center">
            {cidrData.slice(4, 7).map(d => (
              <div key={d.prefix} className="flex items-center gap-3">
                <div className="text-xl font-black text-white/20">{d.prefix}</div>
                <div className={`text-xs font-mono ${d.prefix === '/26' ? 'text-purple-400' : 'text-slate-600'}`}>{d.mask}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubnetTheoryDisplay;
