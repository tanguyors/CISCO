import React, { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);
import { BookOpen, Terminal, Award, Users, Star, CheckCircle, Zap, Shield, Play, Network, Globe, Layers, Cpu } from 'lucide-react';
import { siGoogle, siAmazonaws, siMicrosoft, siMeta, siIbm, siOracle, siCisco, siNokia, siOvh, siAccenture } from 'simple-icons';

gsap.registerPlugin(ScrollTrigger);

// ─── VIBE 2 — PURPLE LUXURY (full scrollytelling) ────────────────────────────

const HOW_STEPS = [
  { num: '01', title: 'Cours enregistrés', icon: BookOpen, color: '#a855f7',
    body: 'Slides interactives, schémas réseau détaillés et exemples CLI Cisco commentés. Disponible à tout moment, à votre rythme.',
    items: ['10 sessions structurées', '474+ diapositives', 'Exemples CLI annotés'],
    gradient: 'from-purple-500/20 to-transparent' },
  { num: '02', title: 'Sessions live', icon: Users, color: '#3b82f6',
    body: '3 sessions live par semaine avec votre formateur : correction de labs en direct, Q&A et mise en situation réseau réelle.',
    items: ['12 lives au total', 'Q&A formateur en direct', 'Correction de labs live'],
    gradient: 'from-blue-500/20 to-transparent' },
  { num: '03', title: 'Labs Packet Tracer', icon: Terminal, color: '#10b981',
    body: 'Mettez en pratique sur Cisco Packet Tracer. Topologies NovaTech guidées, correction détaillée et astuces de dépannage.',
    items: ['10 labs guidés', 'Topologies réalistes', 'Corrections incluses'],
    gradient: 'from-emerald-500/20 to-transparent' },
  { num: '04', title: 'Obtenez votre CCST', icon: Award, color: '#f59e0b',
    body: 'Quiz randomisés, flashcards de révision et générateur de commandes pour arriver à l\'examen avec confiance totale.',
    items: ['193+ questions CCST', 'Flashcards dynamiques', 'Générateur CLI interactif'],
    gradient: 'from-amber-500/20 to-transparent' },
];

const MANIFESTO_WORDS = 'Le réseau est partout. Dans chaque paquet transmis. Dans chaque route calculée. Dans chaque connexion établie entre deux machines. Maîtriser le réseau, c\'est comprendre l\'infrastructure invisible qui fait tourner le monde entier.'.split(' ');

// Real weeks data
const REAL_WEEKS_DATA = [
  {
    num: 1, title: 'Administration Cisco & VLAN', color: '#a855f7', icon: Cpu, sessions: 3, labs: 3,
    sessionNames: ['Sécurisation & SSH', 'VLANs', 'Trunk & Inter-VLAN'],
    topics: ['3 modes du CLI Cisco', 'SSH & sécurisation complète', 'Segmentation par VLAN', 'Routage inter-VLAN 802.1Q'],
    cmd: 'Switch(config-if)# switchport access vlan 10\nSwitch(config-if)# switchport mode access',
    highlight: 'Construisez le réseau NovaTech de zéro',
  },
  {
    num: 2, title: 'Protocoles & Services', color: '#3b82f6', icon: Globe, sessions: 3, labs: 3,
    sessionNames: ['DHCP & DNS', 'HTTP, FTP & ARP', 'Syslog & SNMP'],
    topics: ['DHCP DORA en 4 étapes', 'Résolution DNS complète', '8 niveaux de sévérité Syslog', 'Supervision SNMP v2/v3'],
    cmd: 'Router(config)# ip dhcp pool LAN\n Router(dhcp-config)# network 192.168.1.0 /24',
    highlight: 'Maîtrisez toute la couche applicative',
  },
  {
    num: 3, title: 'Adressage IP & Routage', color: '#10b981', icon: Network, sessions: 3, labs: 3,
    sessionNames: ['Adressage IP & Masques', 'Routage Statique', 'OSPF'],
    topics: ['CIDR, VLSM, calculs binaires', 'Tables de routage & ip route', 'OSPF multi-area & Wildcard Mask', 'Hello/Dead timers, DR/BDR'],
    cmd: 'Router(config-router)# network 10.0.0.0 0.0.0.255 area 0',
    highlight: 'De l\'adresse IP à OSPF multi-area',
  },
  {
    num: 4, title: 'Commutation Avancée', color: '#f59e0b', icon: Layers, sessions: 1, labs: 1,
    sessionNames: ['STP — Spanning Tree Protocol'],
    topics: ['Boucles Layer 2 & Root Bridge', 'Élection STP & rôles des ports', 'PortFast & BPDU Guard', 'États des ports & convergence'],
    cmd: 'Switch(config)# spanning-tree vlan 1 priority 4096\nSwitch(config-if)# spanning-tree portfast\nSwitch(config-if)# spanning-tree bpduguard enable',
    highlight: 'Éliminez définitivement les boucles Layer 2',
  },
];

// Real platform tools
const TOOLS_DATA = [
  { id: '01', icon: Terminal, color: '#a855f7', title: 'Simulateur CLI',       desc: 'Syntaxe Cisco IOS colorisée. Naviguez entre les modes User, Privileged, Config en live.', img: '/validationtp.png' },
  { id: '02', icon: Zap,      color: '#3b82f6', title: 'Générateur de cmds',   desc: 'Construisez pas-à-pas vos configs VLAN, OSPF, NAT avec le bon ordre de commandes garanti.', img: '/validationtp.png' },
  { id: '03', icon: BookOpen, color: '#10b981', title: 'Flashcards actives',   desc: '100+ commandes clés. Mode retournement, mode examen, répétition des commandes ratées.', img: '/flash.png' },
  { id: '04', icon: Globe,    color: '#f59e0b', title: 'Calculateur réseau',   desc: 'Calculs CIDR/VLSM, conversions binaire/décimal, masques. Widget flottant.', img: '/Calculateur.png' },
  { id: '05', icon: Layers,   color: '#ec4899', title: 'Tableau interactif',   desc: 'Dessinez vos topologies réseau directement dans l\'interface. Outils crayon, formes, texte.', img: '/Tableau interactif.png' },
  { id: '06', icon: Shield,   color: '#6366f1', title: 'Quiz 193 questions',   desc: 'Questions CCST avec explications détaillées. Mode session ciblée ou révision générale.', img: '/Quiz.png' },
];

// Partner logos (Simple Icons CDN — standard web dev resource)


const REAL_STATS2 = [
  { val: 10,  suffix: '',  label: 'Sessions enregistrées', desc: 'Du CLI de base à STP avancé',           icon: BookOpen },
  { val: 193, suffix: '+', label: 'Questions de quiz',     desc: 'Avec explications détaillées',          icon: CheckCircle },
  { val: 10,  suffix: '',  label: 'Labs Packet Tracer',    desc: 'Topologies réalistes NovaTech',         icon: Terminal },
  { val: 12,  suffix: '',  label: 'Sessions live',         desc: '3 lives par semaine avec le formateur', icon: Users },
];

// ── Job market stats ─────────────────────────────────────────────────────────
const JOB_STATS = [
  { val: 47,  suffix: '%',  label: 'hausse des offres réseau',    desc: 'liées à l\'IA & data centers en 2 ans',       icon: Zap,     color: '#a855f7' },
  { val: 3.5, suffix: 'M',  label: 'postes non pourvus',          desc: 'en cybersécurité dans le monde (ISC² 2024)',   icon: Shield,  color: '#3b82f6' },
  { val: 52,  suffix: 'K€', label: 'salaire moyen débutant',      desc: 'ingénieur réseau en France (APEC 2024)',       icon: Award,   color: '#10b981' },
  { val: 8,   suffix: '/10',label: 'entreprises du CAC 40',       desc: 'recrutent activement en réseau & sécurité',    icon: Users,   color: '#f59e0b' },
  { val: 400, suffix: 'K+', label: 'data centers supplémentaires',desc: 'prévus d\'ici 2027 pour répondre à l\'IA',     icon: Globe,   color: '#ec4899' },
  { val: 3,   suffix: 'e',  label: 'métier tech le + recherché',  desc: 'Réseau & infra en France, classement 2024',    icon: Network, color: '#6366f1' },
];

// ── Recruiters ────────────────────────────────────────────────────────────────
// Orange & Capgemini absents de simple-icons v9 — SVG paths inline
const siOrangePath = 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12 7.858 4.5 12 4.5z';
const siCapgeminiPath = 'M11.93 0C5.34 0 0 5.34 0 11.93c0 6.59 5.34 11.93 11.93 11.93 3.78 0 7.16-1.76 9.37-4.52l-3.27-2.37a7.52 7.52 0 0 1-6.1 3.12c-4.16 0-7.52-3.36-7.52-7.52 0-4.15 3.36-7.52 7.52-7.52 2.87 0 5.37 1.61 6.68 3.98H24C22.38 4.04 17.58 0 11.93 0z';

const RECRUITERS = [
  { icon: siGoogle,    color: '#4285F4', label: 'Google',      sector: 'Cloud & IA'     },
  { icon: siAmazonaws, color: '#FF9900', label: 'Amazon AWS',  sector: 'Cloud'          },
  { icon: siMicrosoft, color: '#0078D4', label: 'Microsoft',   sector: 'Azure & IA'     },
  { icon: siMeta,      color: '#0467DF', label: 'Meta',        sector: 'Data Center'    },
  { icon: siIbm,       color: '#3D70D4', label: 'IBM',         sector: 'Infrastructure' },
  { icon: siOracle,    color: '#F80000', label: 'Oracle',      sector: 'Cloud & DB'     },
  { icon: siCisco,     color: '#1BA0D7', label: 'Cisco',       sector: 'Networking'     },
  { icon: siNokia,     color: '#005AFF', label: 'Nokia',       sector: 'Télécoms'       },
  { path: siOrangePath,    color: '#FF7900', label: 'Orange',   sector: 'Télécoms FR'   },
  { icon: siOvh,       color: '#4C9BD6', label: 'OVHcloud',    sector: 'Cloud FR'       },
  { icon: siAccenture, color: '#A100FF', label: 'Accenture',   sector: 'Conseil IT'     },
  { path: siCapgeminiPath, color: '#0070AD', label: 'Capgemini', sector: 'Conseil IT'   },
];

// ── CLI terminal panels (one per week, real NovaTech commands) ─────────────────
const CLI_PANELS = [
  {
    week: 1, color: '#a855f7', title: 'SW-NovaTech', subtitle: 'VLANs & Trunk 802.1Q',
    lines: [
      { t: 'cmd',  v: '# conf t' },
      { t: 'info', v: 'Enter configuration commands, one per line.' },
      { t: 'cmd',  v: '(config)# vlan 10' },
      { t: 'cmd',  v: '(config-vlan)# name DIRECTION' },
      { t: 'cmd',  v: '(config-vlan)# vlan 20' },
      { t: 'cmd',  v: '(config-vlan)# name PRODUCTION' },
      { t: 'cmd',  v: '(config)# int Gi0/1' },
      { t: 'cmd',  v: '(config-if)# switchport mode trunk' },
      { t: 'cmd',  v: '(config-if)# switchport trunk allowed vlan 10,20' },
      { t: 'ok',   v: '%LINEPROTO-5: Line protocol changed to up' },
    ],
  },
  {
    week: 2, color: '#3b82f6', title: 'R-NovaTech', subtitle: 'DHCP & DNS',
    lines: [
      { t: 'cmd',  v: '# conf t' },
      { t: 'cmd',  v: '(config)# ip dhcp pool LAN_DIR' },
      { t: 'cmd',  v: '(dhcp-config)# network 192.168.10.0 /24' },
      { t: 'cmd',  v: '(dhcp-config)# default-router 192.168.10.1' },
      { t: 'cmd',  v: '(dhcp-config)# dns-server 8.8.8.8' },
      { t: 'cmd',  v: '(config)# ip dhcp excluded 192.168.10.1 .10' },
      { t: 'ok',   v: '%DHCP: Pool LAN_DIR successfully created' },
      { t: 'cmd',  v: '# show ip dhcp binding' },
      { t: 'info', v: '192.168.10.11   00A1.B2C3.D4E5   Auto' },
    ],
  },
  {
    week: 3, color: '#10b981', title: 'R-CORE', subtitle: 'OSPF Multi-Area',
    lines: [
      { t: 'cmd',  v: '# conf t' },
      { t: 'cmd',  v: '(config)# router ospf 1' },
      { t: 'cmd',  v: '(config-router)# router-id 1.1.1.1' },
      { t: 'cmd',  v: '(config-router)# network 10.0.0.0 0.0.0.255 area 0' },
      { t: 'cmd',  v: '(config-router)# network 192.168.10.0 0.0.0.255 area 1' },
      { t: 'ok',   v: '%OSPF-5-ADJCHG: Nbr 2.2.2.2, Loading → Full' },
      { t: 'cmd',  v: '# show ip ospf neighbor' },
      { t: 'info', v: '2.2.2.2   1   FULL/DR   00:00:33   10.0.0.2' },
    ],
  },
  {
    week: 4, color: '#f59e0b', title: 'SW-CORE', subtitle: 'STP Rapid-PVST & PortFast',
    lines: [
      { t: 'cmd',  v: '# conf t' },
      { t: 'cmd',  v: '(config)# spanning-tree mode rapid-pvst' },
      { t: 'cmd',  v: '(config)# spanning-tree vlan 1 priority 4096' },
      { t: 'cmd',  v: '# show spanning-tree' },
      { t: 'info', v: 'This bridge is the root' },
      { t: 'info', v: 'Priority 4096   Address 0001.1111.1111' },
      { t: 'cmd',  v: '(config)# int Gi0/0' },
      { t: 'cmd',  v: '(config-if)# spanning-tree portfast' },
      { t: 'ok',   v: '%Warning: portfast enabled on Gi0/0' },
    ],
  },
];

// ── Partner Details ───────────────────────────────────────────────────────────
const PARTNER_DETAILS = [
  { type: 'img',   src: 'https://cdn.simpleicons.org/cisco/ffffff',
    label: 'Cisco',                 tag: 'Partenaire réseau',      desc: 'Certification CCST & CCNA officielle', accent: '#049fd9' },
  { type: 'badge', abbr: 'Q',       bg: '#1a56db',
    label: 'Qualiopi',              tag: 'Certification qualité',  desc: 'Label qualité formation professionnelle', accent: '#1a56db' },
  { type: 'badge', abbr: 'NA',      bg: '#7c3aed',
    label: 'NET Academy',           tag: 'Centre de formation',    desc: 'Centre agréé Cisco Networking', accent: '#a855f7' },
];

function Vibe2({ onLogin }) {
  const rootRef     = useRef(null);
  const heroRef     = useRef(null);
  const jobStatsRef = useRef(null);
  const recruitRef  = useRef(null);
  const statsRef    = useRef(null);
  const cliRef      = useRef(null);
  const howRef      = useRef(null);
  const howSlider   = useRef(null);
  const howProgress = useRef(null);
  const horizWrap   = useRef(null);
  const horizTrack  = useRef(null);
  const maniRef     = useRef(null);
  const toolsRef    = useRef(null);
  const toolsSlider = useRef(null);
  const logosRef    = useRef(null);
  const ctaRef      = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── SWEEP LINE ────────────────────────────────────────────────────────
      const sweepEl   = rootRef.current?.querySelector('.v2-sweep');
      const sweepLine = rootRef.current?.querySelector('.v2-sweep-line');
      const sweep = () => {
        if (!sweepEl || !sweepLine) return;
        gsap.killTweensOf([sweepEl, sweepLine]);
        gsap.set(sweepEl,   { opacity: 1 });
        gsap.set(sweepLine, { scaleX: 0, transformOrigin: 'left center' });
        gsap.to(sweepLine,  {
          scaleX: 1, duration: 0.4, ease: 'power2.inOut',
          onComplete: () => gsap.to(sweepEl, { opacity: 0, duration: 0.3 }),
        });
      };

      // ── 1. HERO — snap 3 phases (scrub:1 intentional) ────────────────────
      gsap.set('.v2h-bgimg',     { scale: 1.12 });
      gsap.set('.v2h-tag',       { y: 24,  opacity: 0 });
      gsap.set('.v2h-line',      { y: 90,  opacity: 0 });
      gsap.set('.v2h-sub',       { y: 16,  opacity: 0 });
      gsap.set('.v2h-btn',       { y: 12,  opacity: 0, scale: 0.85 });
      gsap.set('.v2h-term',      { x: 40,  opacity: 0 });
      gsap.set('.v2h-term-line', { x: -6,  opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current, start: 'top top', end: '+=50%',
          pin: true, scrub: true, anticipatePin: 1,
          snap: { snapTo: [0, 0.5, 1], duration: { min: 0.2, max: 0.5 }, delay: 0.02, ease: 'power2.inOut' },
          onLeave: sweep, onEnterBack: sweep,
        },
      })
        // ENTER: 0 → snap1 (progress 0.5)
        .to('.v2h-bgimg',    { scale: 1, duration: 1 }, 0)
        .to('.v2h-tag',      { y: 0, opacity: 1, duration: 0.25 }, 0.1)
        .to('.v2h-line',     { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 }, 0.2)
        .to('.v2h-sub',      { y: 0, opacity: 1, duration: 0.3 }, 0.55)
        .to('.v2h-btn',      { y: 0, opacity: 1, scale: 1, duration: 0.25 }, 0.7)
        .to('.v2h-term',     { x: 0, opacity: 1, duration: 0.35 }, 0.72)
        .to('.v2h-term-line',{ x: 0, opacity: 1, stagger: 0.04, duration: 0.05 }, 0.85)
        .set({}, {}, 1.0)
        // EXIT: snap1 → snap2 (progress 1.0)
        .to('.v2h-bgimg',              { scale: 1.15, opacity: 0.3, duration: 0.7 }, 1.0)
        .to('.v2h-term',               { x: 30, opacity: 0, duration: 0.2 }, 1.05)
        .to('.v2h-btn',                  { y: -90, opacity: 0, duration: 0.3 }, 1.1)
        .to('.v2h-sub',                { y: -60, opacity: 0, duration: 0.3 }, 1.2)
        .to('.v2h-line',               { y: -160, opacity: 0, stagger: 0.1, duration: 0.45 }, 1.25)
        .to('.v2h-tag',                { y: -40, opacity: 0, duration: 0.25 }, 1.7)
        .set({}, {}, 2.0);

      // ── 2. JOB MARKET STATS — Scrollytelling pin ────────────────────────
      {
        const slides = gsap.utils.toArray('.jv3-slide');
        if (slides.length) {
          gsap.set(slides, { opacity: 0, scale: 0.9 });
          gsap.set(slides[0], { opacity: 1, scale: 1 });
          const jsTl = gsap.timeline({
            scrollTrigger: { trigger: jobStatsRef.current, pin: true, scrub: true, start: 'top top', end: '+=60%', anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
          });
          slides.forEach((slide, i) => {
            if (i > 0) {
              jsTl.to(slides[i - 1], { opacity: 0, scale: 0.85, y: -40, duration: 0.3 });
              jsTl.fromTo(slide, { opacity: 0, scale: 1.08, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.3 });
            }
            jsTl.to({}, { duration: 0.5 });
          });
        }
      }

      // ── 3. RECRUITERS — Cinematic Split ──────────────────────────────────
      gsap.set('.v3r-hd',   { y: 30, opacity: 0 });
      gsap.set('.v3r-stat', { opacity: 0 });
      gsap.set('.v3r-row1', { x: -280, opacity: 0 });
      gsap.set('.v3r-row2', { x:  280, opacity: 0 });
      gsap.set('.v3r-row3', { x: -280, opacity: 0 });
      const v3StatEl = recruitRef.current?.querySelector('.v3r-stat');
      gsap.timeline({
        scrollTrigger: { trigger: recruitRef.current, start: 'top top', end: '+=40%', pin: true, scrub: true, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
        onStart: () => {
          if (!v3StatEl) return;
          const o = { val: 0 };
          gsap.to(o, { val: 2400, duration: 2, ease: 'power2.out', onUpdate: () => { v3StatEl.textContent = `+${Math.floor(o.val).toLocaleString('fr-FR')} offres réseau/mois`; } });
        },
      })
        .to('.v3r-hd',   { y: 0, opacity: 1, stagger: 0.05, duration: 0.2 }, 0)
        .to('.v3r-stat', { opacity: 1, duration: 0.25 }, 0.05)
        .to('.v3r-row1', { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 0.1)
        .to('.v3r-row2', { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 0.18)
        .to('.v3r-row3', { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 0.26);

      // ── 4. STATS (En chiffres) — Magazine Spread scroll ──────────────────
      {
        const rows = gsap.utils.toArray('.sv5-row');
        if (rows.length) {
          gsap.set(rows, { opacity: 0, x: -80 });
          gsap.set(rows[0], { opacity: 1, x: 0 });
          const stTl = gsap.timeline({
            scrollTrigger: { trigger: statsRef.current, pin: true, scrub: true, start: 'top top', end: '+=50%', anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
          });
          rows.forEach((row, i) => {
            if (i > 0) {
              stTl.to(rows[i - 1], { opacity: 0.15, duration: 0.2 });
              stTl.fromTo(row, { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out' });
            }
            stTl.to({}, { duration: 0.4 });
          });
          stTl.to(rows, { opacity: 1, duration: 0.2 });
          stTl.fromTo('.sv5-extra', { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.15 });
          stTl.to({}, { duration: 0.2 });
        }
      }


      // ── 5. HORIZONTAL CURRICULUM (C2) ───────────────────────────────────
      if (horizWrap.current) {
        gsap.fromTo(horizTrack.current, { x: 0 }, {
          x: () => -(horizTrack.current.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: horizWrap.current, pin: true, scrub: true,
            start: 'top top', end: () => `+=${horizTrack.current.scrollWidth * 0.12}`,
            invalidateOnRefresh: true, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep,
          },
        });
      }

      // ── 6. CLI TERMINALS — pin 350% ───────────────────────────────────────
      gsap.set('.v2cli-hd',    { y: 60, opacity: 0 });
      gsap.set('.v2cli-panel', { y: 60, opacity: 0 });
      const cliTl = gsap.timeline({
        scrollTrigger: { trigger: cliRef.current, start: 'top top', end: '+=40%', pin: true, scrub: true, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      });
      cliTl
        .to('.v2cli-hd',    { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, 0)
        .to('.v2cli-panel', { y: 0, opacity: 1, stagger: 0.1,  duration: 0.3 }, 0.15);
      CLI_PANELS.forEach((_, pi) => {
        const lineEls = gsap.utils.toArray(cliRef.current?.querySelectorAll(`.v2cli-line-p${pi}`) ?? []);
        gsap.set(lineEls, { opacity: 0, x: -8 });
        cliTl.to(lineEls, { opacity: 1, x: 0, stagger: 0.05, duration: 0.06 }, 0.4);
      });

      // ── 7. HOW IT WORKS — horizontal carousel ───────────────────────────
      const howPanels = gsap.utils.toArray(howRef.current?.querySelectorAll('.hw-panel') ?? []);
      if (howPanels.length) {
        gsap.to(howPanels, {
          xPercent: -100 * (howPanels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: howRef.current,
            pin: true,
            scrub: true,
            end: () => '+=' + ((howSlider.current?.offsetWidth || window.innerWidth * 1.5) * 0.12),
            anticipatePin: 1,
            onLeave: sweep,
            onEnterBack: sweep,
            onUpdate: (self) => {
              if (howProgress.current) gsap.to(howProgress.current, { scaleX: self.progress, duration: 0.1, ease: 'none' });
            },
          },
        });
      }

      // ── 9. MANIFESTO — pin 320% ──────────────────────────────────────────
      const mWords = gsap.utils.toArray(maniRef.current?.querySelectorAll('.v2m-word') ?? []);
      gsap.set(mWords, { color: '#1e1b4b' });
      gsap.timeline({
        scrollTrigger: { trigger: maniRef.current, start: 'top top', end: '+=35%', pin: true, scrub: true, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to(mWords, { color: '#e2e8f0', stagger: 1 / (mWords.length || 1), duration: 1 }, 0);

      // ── 11. PLATFORM TOOLS — horizontal gallery (T1) ────────────────────
      {
        const toolPanels = gsap.utils.toArray(toolsRef.current?.querySelectorAll('.t1-panel') ?? []);
        if (toolPanels.length) {
          gsap.to(toolPanels, {
            xPercent: -100 * (toolPanels.length - 1),
            ease: 'none',
            scrollTrigger: { trigger: toolsRef.current, pin: true, scrub: true, end: () => '+=' + ((toolsSlider.current?.offsetWidth || window.innerWidth * 6) * 0.12), anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
          });
        }
      }

      // ── 13. NOS PARTENAIRES (L2) — pin 50% ───────────────────────────────
      gsap.set('.l2-badge', { y: 20, opacity: 0 });
      gsap.set('.l2-title', { y: 40, opacity: 0, letterSpacing: '0.5em' });
      gsap.set('.l2-line',  { scaleX: 0 });
      gsap.set('.l2-card',  { y: 80, opacity: 0, rotateX: 8 });
      gsap.set('.l2-footer',{ y: 20, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: logosRef.current, start: 'top top', end: '+=30%', pin: true, scrub: true, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to('.l2-badge',  { y: 0, opacity: 1, duration: 0.2 }, 0)
        .to('.l2-title',  { y: 0, opacity: 1, letterSpacing: '0.15em', duration: 0.35 }, 0.1)
        .to('.l2-line',   { scaleX: 1, duration: 0.2 }, 0.2)
        .to('.l2-card',   { y: 0, opacity: 1, rotateX: 0, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, 0.25)
        .to('.l2-footer', { y: 0, opacity: 1, duration: 0.2 }, 0.6);

      // ── 14. CTA — pin 150% ────────────────────────────────────────────────
      gsap.set('.v2c-line',    { scaleY: 0 });
      gsap.set('.v2c-heading', { y: 30, opacity: 0 });
      gsap.set('.v2c-sub',     { y: 30, opacity: 0 });
      gsap.set('.v2c-btn',     { y: 30, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: ctaRef.current, start: 'top top', end: '+=35%', pin: true, scrub: true, anticipatePin: 1 },
      })
        .to('.v2c-line',    { scaleY: 1, duration: 0.2 }, 0)
        .to('.v2c-heading', { y: 0, opacity: 1, duration: 0.35 }, 0.15)
        .to('.v2c-sub',     { y: 0, opacity: 1, duration: 0.3 }, 0.42)
        .to('.v2c-btn',     { y: 0, opacity: 1, duration: 0.25 }, 0.6);

      // ── NETWORK CABLE SIDEBAR ─────────────────────────────────────────────
      const NET_H      = 300;
      const NET_COLORS = ['#a855f7','#3b82f6','#10b981','#f59e0b','#ec4899','#6366f1','#a855f7'];
      gsap.set('.v2-net-router', { x: 14, opacity: 0 });
      gsap.set('.v2-net-led-0,.v2-net-led-1,.v2-net-led-2,.v2-net-led-3', { fill: '#1a1040' });

      const netStep = (step) => {
        const portY = Math.round((step / 6) * NET_H);
        const col   = NET_COLORS[step];
        gsap.killTweensOf('.v2-net-router');
        gsap.to('.v2-net-router', {
          x: 14, opacity: 0.2, duration: 0.18, ease: 'power2.in',
          onComplete: () => {
            gsap.set('.v2-net-router', { top: portY, x: 14 });
            gsap.to('.v2-net-router', { x: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)' });
          },
        });
        gsap.to('.v2-net-cable-fill', { attr: { y2: portY }, duration: 0.55, ease: 'power2.out' });
        gsap.to('.v2-net-port', { attr: { r: 3, fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.1)' }, duration: 0.25 });
        gsap.to(`.v2-net-port-${step}`, { attr: { r: 5.5, fill: col, stroke: col }, duration: 0.3, ease: 'back.out(2)' });
        const leds = ['.v2-net-led-0','.v2-net-led-1','.v2-net-led-2','.v2-net-led-3'];
        gsap.killTweensOf(leds);
        gsap.set(leds, { fill: '#1a1040' });
        gsap.to('.v2-net-led-0', { fill: '#22c55e', duration: 0.12, delay: 0.35 });
        gsap.to('.v2-net-led-1', { fill: '#22c55e', duration: 0.12, delay: 0.47 });
        gsap.to('.v2-net-led-2', { fill: col,       duration: 0.12, delay: 0.59 });
        gsap.to('.v2-net-led-3', { fill: col,       duration: 0.12, delay: 0.71 });
      };

      gsap.set('.v2-net-router', { top: 0 });
      netStep(0);
      [
        { ref: heroRef,     step: 0 },
        { ref: jobStatsRef, step: 1 },
        { ref: recruitRef,  step: 2 },
        { ref: statsRef,    step: 3 },
        { ref: cliRef,      step: 4 },
        { ref: howRef,      step: 4 },
        { ref: horizWrap,   step: 4 },
        { ref: maniRef,     step: 5 },
        { ref: toolsRef,    step: 6 },
        { ref: logosRef,    step: 6 },
        { ref: ctaRef,      step: 6 },
      ].forEach(({ ref, step }) =>
        ScrollTrigger.create({
          trigger: ref.current, start: 'top top',
          onEnter: () => netStep(step), onEnterBack: () => netStep(step),
        })
      );

    }, rootRef);
    return () => ctx.revert();
  }, []);

  // ── Auto-scroll: reveal hero content on load ──────────────────────────
  useEffect(() => {
    // Scroll to snap point 0.5 of hero (end is +=50vh, so snap 0.5 = 25vh)
    const target = window.innerHeight * 0.25;
    const timer = setTimeout(() => {
      gsap.to(window, {
        scrollTo: { y: target, autoKill: false },
        duration: 1.8,
        ease: 'power2.inOut',
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={rootRef} className="bg-[#0a051a] text-slate-100">

      {/* ── SWEEP TRANSITION OVERLAY ─────────────────────────────────────── */}
      <div className="v2-sweep fixed inset-0 z-[60] pointer-events-none" style={{ opacity: 0 }}>
        <div className="v2-sweep-line absolute top-1/2 left-0 w-full -translate-y-1/2"
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #6366f1 20%, #a855f7 45%, #3b82f6 70%, #10b981 90%, transparent 100%)',
            boxShadow: '0 0 12px #a855f7, 0 0 30px #3b82f6',
            transform: 'scaleX(0)', transformOrigin: 'left',
          }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 35%, rgba(168,85,247,0.04) 50%, transparent 65%)' }} />
      </div>

      {/* ── NETWORK CABLE PROGRESS INDICATOR ────────────────────────── */}
      <div className="v2-net fixed z-50 pointer-events-none hidden xl:block"
        style={{ left: 16, top: '50%', transform: 'translateY(-50%)', width: 60, height: 300 }}>
        <svg width="60" height="300" viewBox="0 0 60 300" fill="none"
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <defs>
            <linearGradient id="v2NetGrad" x1="0" y1="0" x2="0" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a855f7"/>
              <stop offset="100%" stopColor="#3b82f6"/>
            </linearGradient>
          </defs>
          {/* backbone — inactive */}
          <line x1="10" y1="0" x2="10" y2="300" stroke="rgba(255,255,255,0.07)" strokeWidth="2"/>
          {/* backbone — active fill (grows via GSAP attr y2) */}
          <line className="v2-net-cable-fill" x1="10" y1="0" x2="10" y2="0"
            stroke="url(#v2NetGrad)" strokeWidth="2"/>
          {/* section ports */}
          {[0,1,2,3,4,5,6].map(i => {
            const y = Math.round((i / 6) * 300);
            return (
              <g key={i}>
                <line x1="10" y1={y} x2="24" y2={y}
                  stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="2,2"/>
                <circle className={`v2-net-port v2-net-port-${i}`}
                  cx="10" cy={y} r="3"
                  fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              </g>
            );
          })}
        </svg>
        {/* Router icon — positioned & animated by GSAP */}
        <div className="v2-net-router" style={{ position: 'absolute', left: 24, top: 0, opacity: 0 }}>
          <svg width="32" height="22" viewBox="0 0 32 22" fill="none">
            <rect x="0" y="7" width="32" height="13" rx="2"
              fill="#0f0a1e" stroke="rgba(168,85,247,0.55)" strokeWidth="1"/>
            <line x1="5"  y1="7" x2="5"  y2="3" stroke="rgba(168,85,247,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="16" y1="7" x2="16" y2="0" stroke="rgba(168,85,247,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="27" y1="7" x2="27" y2="3" stroke="rgba(168,85,247,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="5"  cy="3" r="1.5" fill="rgba(168,85,247,0.4)"/>
            <circle cx="16" cy="0" r="1.5" fill="rgba(168,85,247,0.4)"/>
            <circle cx="27" cy="3" r="1.5" fill="rgba(168,85,247,0.4)"/>
            <circle className="v2-net-led-0" cx="7"  cy="14" r="1.8" fill="#1a1040"/>
            <circle className="v2-net-led-1" cx="13" cy="14" r="1.8" fill="#1a1040"/>
            <circle className="v2-net-led-2" cx="19" cy="14" r="1.8" fill="#1a1040"/>
            <circle className="v2-net-led-3" cx="25" cy="14" r="1.8" fill="#1a1040"/>
          </svg>
        </div>
      </div>

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex flex-col overflow-hidden">
        {/* nav */}
        <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 pt-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Network size={16} className="text-white" />
            </div>
            <span className="font-black text-white tracking-tight">NET Academy</span>
          </div>
          <button onClick={onLogin} className="px-5 py-2 text-sm text-slate-300 border border-white/10 rounded-full hover:border-purple-500/50 transition-colors">
            Se connecter
          </button>
        </nav>

        {/* bg */}
        <div className="v2h-bgimg absolute inset-0 -z-10">
          <img src="/hero-vibe2-luxury.png" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a051a]/60 via-[#0a051a]/10 to-[#0a051a]" />
        </div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/10 blur-[140px] rounded-full pointer-events-none" />

        {/* content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-8 relative z-10">
          <p className="v2h-tag text-purple-400 text-xs tracking-[0.5em] uppercase mb-6">Formation Réseau — Certification CCST</p>
          <h1 className="text-6xl md:text-8xl font-black leading-[1.0] mb-6 overflow-hidden">
            {['Devenez', 'expert', 'réseau.'].map((w, i) => (
              <span key={i} className="v2h-line block" style={{ color: i === 2 ? '#a855f7' : 'white' }}>{w}</span>
            ))}
          </h1>
          <p className="v2h-sub text-slate-400 text-lg max-w-xl leading-relaxed mb-8">
            Une formation immersive qui vous mène du débutant à la certification CCST — avec des labs Packet Tracer, des quiz et un suivi pas à pas.
          </p>
          <button onClick={onLogin} className="v2h-btn px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold tracking-widest text-sm rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow flex items-center gap-2">
            <Play size={16} className="fill-white" /> Commencer la formation
          </button>
        </div>

        {/* ── Floating terminal (xl+) ─────────────────────────────── */}
        <div className="v2h-term hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 z-20 w-[272px]">
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50"
            style={{ background: 'rgba(8,4,20,0.92)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(16px)' }}>
            {/* title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-purple-500/15" style={{ background: 'rgba(168,85,247,0.06)' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
              </div>
              <span className="text-[10px] font-mono text-purple-400/60 ml-1">SW-NovaTech — session active</span>
            </div>
            {/* lines */}
            <div className="px-4 py-3 font-mono text-[10.5px] leading-[1.7] space-y-px">
              {[
                { t: 'cmd',  v: '# show vlan brief' },
                { t: 'info', v: '10  DIRECTION   active  Gi0/1' },
                { t: 'info', v: '20  PRODUCTION  active  Gi0/2' },
                { t: 'cmd',  v: '# show ip ospf neighbor' },
                { t: 'ok',   v: 'Nbr 2.2.2.2  FULL/DR  ✓' },
                { t: 'cmd',  v: '# show spanning-tree' },
                { t: 'ok',   v: 'Root bridge  Priority 4096  ✓' },
                { t: 'cmd',  v: '# show etherchannel summary' },
                { t: 'info', v: 'Po1  SU  Gi0/1(P)  Gi0/2(P)' },
              ].map((line, i) => (
                <div key={i} className="v2h-term-line flex gap-1.5">
                  {line.t === 'cmd'  && <><span className="text-purple-400 shrink-0">❯</span><span className="text-slate-300">{line.v}</span></>}
                  {line.t === 'info' && <span className="text-slate-500 pl-3">{line.v}</span>}
                  {line.t === 'ok'   && <span className="text-emerald-400 pl-3">{line.v}</span>}
                </div>
              ))}
              <div className="flex gap-1.5 pt-0.5">
                <span className="text-purple-400">❯</span>
                <span className="inline-block w-[7px] h-[13px] bg-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOB MARKET STATS — Scrollytelling ────────────────────────────── */}
      <section ref={jobStatsRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a051a]">
        {/* Dot nav */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {JOB_STATS.map((s, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full opacity-40" style={{ background: s.color }} />
          ))}
        </div>

        {JOB_STATS.map((s, i) => (
          <div key={i} className="jv3-slide absolute inset-0 flex flex-col items-center justify-center px-8">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[600px] h-[600px] rounded-full blur-[180px]" style={{ background: `${s.color}12` }} />
            </div>
            <div className="relative z-10 text-center max-w-3xl">
              <p className="text-xs tracking-[0.6em] uppercase font-mono mb-6 opacity-60" style={{ color: s.color }}>
                {i + 1} / {JOB_STATS.length}
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-6">
                <span className="text-[8rem] md:text-[11rem] font-black leading-none tabular-nums"
                  style={{ color: s.color, textShadow: `0 0 80px ${s.color}50` }}>
                  {s.val}
                </span>
                <span className="text-4xl md:text-5xl font-black text-white/40">{s.suffix}</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-3">{s.label}</p>
              <p className="text-slate-400 text-base">{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── RECRUITERS — Cinematic Split ─────────────────────────────────── */}
      <section ref={recruitRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a051a]">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[10vw] font-black text-white/[0.025] tracking-tighter whitespace-nowrap">ILS RECRUTENT</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/8 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-3 mb-8">
            <div>
              <p className="v3r-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-1.5">Écosystème Partenaire</p>
              <h2 className="v3r-hd text-4xl md:text-5xl font-black text-white tracking-tight">Propulsez votre carrière.</h2>
            </div>
            <p className="v3r-stat text-xl font-bold text-purple-300 tabular-nums italic pb-1">+0 offres réseau/mois</p>
          </div>

          {/* 3 cinematic rows */}
          <div className="space-y-3 mb-8 overflow-hidden">
            <div className="v3r-row1 flex gap-3 justify-center">
              {RECRUITERS.slice(0, 4).map((r, i) => (
                <div key={i} className="h-[60px] w-52 flex-shrink-0 bg-white/[0.03] border border-white/10 rounded-xl flex items-center gap-3 px-5 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all group">
                  <svg role="img" viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: r.color, flexShrink: 0 }}>
                    <path d={r.icon ? r.icon.path : r.path} />
                  </svg>
                  <span className="text-base font-black text-slate-100 tracking-tight group-hover:text-purple-300 transition-colors truncate">{r.label}</span>
                </div>
              ))}
            </div>
            <div className="v3r-row2 flex gap-3 justify-center">
              {RECRUITERS.slice(4, 8).map((r, i) => (
                <div key={i} className="h-[60px] w-52 flex-shrink-0 bg-white/[0.03] border border-white/10 rounded-xl flex items-center gap-3 px-5 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all group">
                  <svg role="img" viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: r.color, flexShrink: 0 }}>
                    <path d={r.icon ? r.icon.path : r.path} />
                  </svg>
                  <span className="text-base font-black text-slate-100 tracking-tight group-hover:text-purple-300 transition-colors truncate">{r.label}</span>
                </div>
              ))}
            </div>
            <div className="v3r-row3 flex gap-3 justify-center">
              {RECRUITERS.slice(8, 12).map((r, i) => (
                <div key={i} className="h-[60px] w-52 flex-shrink-0 bg-white/[0.03] border border-white/10 rounded-xl flex items-center gap-3 px-5 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all group">
                  <svg role="img" viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: r.color, flexShrink: 0 }}>
                    <path d={r.icon ? r.icon.path : r.path} />
                  </svg>
                  <span className="text-base font-black text-slate-100 tracking-tight group-hover:text-purple-300 transition-colors truncate">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS — Magazine Spread ──────────────────────────────────── */}
      <section ref={statsRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a051a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(120,40,200,0.08),transparent)]" />

        <div className="relative z-10 w-full max-w-5xl px-10">
          <p className="text-purple-400 text-[10px] font-mono uppercase tracking-[0.6em] mb-1">En chiffres</p>
          <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Une formation complète, mesurable.</h2>

          <div className="space-y-0">
            {REAL_STATS2.map((s, i) => {
              const colors = ['#a855f7','#3b82f6','#10b981','#f59e0b'];
              return (
                <div key={i} className="sv5-row flex items-baseline gap-5 py-2">
                  <span className="text-[4rem] md:text-[5rem] font-black leading-none tabular-nums tracking-tighter shrink-0" style={{ color: colors[i], opacity: 0.9 }}>
                    {s.val}{s.suffix}
                  </span>
                  <div>
                    <p className="text-white text-lg font-bold">{s.label}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { label: '3 sessions live par semaine avec le formateur',       color: '#a855f7' },
              { label: 'Contenu maintenu à jour avec IOS 15.x',              color: '#3b82f6' },
              { label: 'Accès immédiat à tout le contenu dès l\'inscription', color: '#10b981' },
              { label: '474+ diapositives interactives et schémas réseau',    color: '#f59e0b' },
            ].map((e, i) => (
              <div key={i} className="sv5-extra flex items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: e.color }} />
                <span className="text-slate-400 text-xs">{e.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* ── 3. HORIZONTAL CURRICULUM (C2) ──────────────────────────────────── */}
      <section ref={horizWrap} className="relative h-screen w-full overflow-hidden bg-[#0a051a] text-slate-200">
        <div ref={horizTrack} className="flex h-full w-fit flex-row flex-nowrap items-center">
          {/* Intro Slide */}
          <div className="relative flex h-full w-screen shrink-0 items-center justify-center p-12">
            <div className="max-w-4xl text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-purple-500">Le Parcours Expert</span>
              <h2 className="text-6xl font-black tracking-tight md:text-8xl">4 semaines. <br /><span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">1 objectif.</span></h2>
              <p className="mx-auto mt-8 max-w-xl text-lg text-slate-400 leading-relaxed">Un programme intensif conçu pour passer de débutant à certifié Cisco CCST, mêlant théorie rigoureuse et pratique intensive.</p>
              <div className="mt-12 flex items-center justify-center gap-4 text-slate-500">
                <span className="flex items-center gap-2 text-sm">Scrollez pour explorer →</span>
              </div>
            </div>
          </div>
          {/* Week Cards */}
          {REAL_WEEKS_DATA.map((w, i) => {
            const WeekIcon = w.icon;
            return (
              <div key={i} className="relative flex h-full w-screen shrink-0 items-center justify-center p-6 md:p-12 lg:p-20">
                <div className="grid h-full max-h-[800px] w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                  {/* Left Side: Info */}
                  <div className="relative flex flex-col justify-center">
                    <div className="absolute -top-12 -left-8 select-none text-[15rem] font-black leading-none opacity-5 blur-[2px]" style={{ color: w.color }}>0{w.num}</div>
                    <div className="relative z-10">
                      <div className="mb-6 flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold" style={{ backgroundColor: `${w.color}20`, color: w.color, border: `1px solid ${w.color}40` }}>
                          <WeekIcon size={24} />
                        </span>
                        <div className="h-px w-12 bg-slate-800" />
                        <span className="text-sm font-semibold tracking-widest text-slate-500 uppercase">Semaine {w.num}</span>
                      </div>
                      <h3 className="text-4xl font-bold tracking-tight text-white md:text-6xl">{w.title}</h3>
                      <p className="mt-4 text-lg text-purple-300/60 italic">"{w.highlight}"</p>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-medium">
                          <Cpu className="h-4 w-4 text-blue-400" />{w.sessions} Session{w.sessions > 1 ? 's' : ''} Live
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-medium">
                          <Zap className="h-4 w-4 text-amber-400" />{w.labs} Lab{w.labs > 1 ? 's' : ''} Pratiques
                        </div>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-2">
                        {w.sessionNames.map((sn, j) => (
                          <span key={j} className="rounded-md border border-slate-800 px-3 py-1 text-xs font-mono uppercase tracking-wider text-slate-400">{sn}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Right Side: Topics + Terminal */}
                  <div className="flex flex-col gap-6">
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                      <h4 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400"><Layers className="h-4 w-4" /> Ce que vous maîtriserez</h4>
                      <ul className="space-y-4">
                        {w.topics.map((topic, j) => (
                          <li key={j} className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 shrink-0" style={{ color: w.color }} /><span className="text-slate-300 leading-snug">{topic}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#050510] shadow-2xl">
                      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-4 py-2">
                        <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500/50" /><div className="h-3 w-3 rounded-full bg-amber-500/50" /><div className="h-3 w-3 rounded-full bg-emerald-500/50" /></div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase"><Terminal className="h-3 w-3" /> Cisco_IOS</div>
                      </div>
                      <div className="p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        <div className="text-slate-600 mb-1">Commande clé :</div>
                        <div style={{ color: w.color }}>{w.cmd}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3b. CLI TERMINALS ────────────────────────────────────────────── */}
      <section ref={cliRef} className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#0a051a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(88,28,135,0.09),transparent)]" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <p className="v2cli-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">En pratique</p>
          <h2 className="v2cli-hd text-4xl font-black mb-2">Passez en mode CLI.</h2>
          <p className="v2cli-hd text-slate-500 text-base mb-7 max-w-2xl">4 semaines de configuration Cisco sur le réseau NovaTech — du VLAN de base jusqu'à STP avancé.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CLI_PANELS.map((panel, pi) => (
              <div key={pi} className="v2cli-panel rounded-xl overflow-hidden border"
                style={{ borderColor: `${panel.color}30`, background: '#000' }}>
                {/* title bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b"
                  style={{ background: `${panel.color}10`, borderColor: `${panel.color}20` }}>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
                    </div>
                    <span className="text-[10px] font-mono ml-1" style={{ color: panel.color }}>{panel.title}</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-600">{panel.subtitle}</span>
                </div>
                {/* terminal body */}
                <div className="px-4 py-3 font-mono text-[11px] leading-[1.75] space-y-px">
                  {panel.lines.map((line, li) => (
                    <div key={li} className={`v2cli-line-p${pi} flex gap-1.5`}>
                      {line.t === 'cmd'  && <><span style={{ color: panel.color }} className="shrink-0">❯</span><span className="text-slate-200">{line.v}</span></>}
                      {line.t === 'ok'   && <span className="text-emerald-400 pl-4">{line.v}</span>}
                      {line.t === 'info' && <span className="text-slate-500 pl-4">{line.v}</span>}
                    </div>
                  ))}
                  <div className="flex gap-1.5 pt-1">
                    <span style={{ color: panel.color }} className="shrink-0">❯</span>
                    <span className="inline-block w-[7px] h-[13px] animate-pulse" style={{ background: panel.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 4. HOW IT WORKS — Horizontal Carousel ──────────────────────── */}
      <section ref={howRef} className="relative overflow-hidden bg-[#0a051a]">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 z-40 bg-white/5">
          <div ref={howProgress} className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 origin-left scale-x-0" />
        </div>
        {/* Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        </div>
        {/* Horizontal slider */}
        <div ref={howSlider} className="flex w-[400vw] h-screen relative z-10">
          {HOW_STEPS.map((step, idx) => (
            <div key={idx} className="hw-panel w-screen h-screen flex items-center justify-center px-6 md:px-20 lg:px-32 relative overflow-hidden flex-shrink-0">
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Visual side */}
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
                      <h3 className="text-2xl font-bold text-white mb-6">L'expérience NovaTech</h3>
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
                {/* Text side */}
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-8xl md:text-[140px] font-black tracking-tighter opacity-10 select-none leading-none"
                      style={{ WebkitTextStroke: `1px ${step.color}`, color: 'transparent' }}>{step.num}</span>
                    <div className="h-0.5 w-12 bg-white/20" />
                    <span className="text-sm font-bold tracking-widest uppercase text-white/40">Étape {step.num}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">{step.title}</h2>
                  <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">{step.body}</p>
                </div>
              </div>
              {/* Bottom indicators */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-20 pointer-events-none hidden md:flex">
                {HOW_STEPS.map((s, idx2) => (
                  <div key={idx2} className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${idx === idx2 ? 'text-white' : 'text-slate-500'}`}>{s.num}</span>
                    <div className={`w-1 h-1 rounded-full ${idx === idx2 ? 'bg-white' : 'bg-slate-800'}`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ── 6. MANIFESTO ─────────────────────────────────────────────────── */}
      <section ref={maniRef} className="relative h-screen flex items-center justify-center px-8 overflow-hidden bg-[#0a051a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(88,28,135,0.08),transparent)]" />
        <div className="relative z-10 max-w-4xl text-center">
          <div className="text-6xl text-purple-900 mb-6 leading-none select-none">"</div>
          <p className="text-3xl md:text-4xl font-black leading-relaxed tracking-tight">
            {MANIFESTO_WORDS.map((w, i) => (
              <span key={i} className="v2m-word">{w} </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── 10. PLATFORM TOOLS — T1 Horizontal Gallery ─────────────────── */}
      <section ref={toolsRef} className="relative bg-[#0a051a] overflow-hidden">
        <div className="pt-24 pb-12 px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">OUTILS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">INTÉGRÉS</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Une suite logicielle complète pour la réussite de votre certification Cisco CCST.</p>
        </div>
        <div className="h-screen flex items-center">
          <div ref={toolsSlider} className="flex h-[80vh]" style={{ width: `${TOOLS_DATA.length * 100}vw` }}>
            {TOOLS_DATA.map((tool) => (
              <section key={tool.id} className="t1-panel w-screen h-full flex items-center justify-center relative px-4 md:px-20 flex-shrink-0">
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
      </section>


      {/* ── NOS PARTENAIRES (L2) ──────────────────────────────────────────── */}
      <section ref={logosRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a051a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(88,28,135,0.08),transparent)]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="mb-20 text-center space-y-4">
            <div className="l2-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-blue-400">Collaborations</span>
            </div>
            <h2 className="l2-title text-4xl md:text-5xl font-light text-white tracking-widest uppercase">
              Nos <span className="font-semibold">partenaires</span>
            </h2>
            <div className="l2-line w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-6 origin-center" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
            {/* Qualiopi */}
            <div className="l2-card relative group lg:col-span-3 lg:mt-4">
              <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[2px] blur-[2px] z-20" style={{ background: 'linear-gradient(90deg, transparent, #1a56db, transparent)' }} />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1/2 h-8 blur-2xl opacity-20 z-10 bg-[#1a56db]" />
              <div className="relative overflow-hidden h-full bg-[#110c26]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 transition-all duration-500 ease-out hover:border-white/10 hover:bg-[#150f30]/80 hover:-translate-y-2 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl flex items-center justify-center w-16 h-16 bg-white/5">
                    <div className="w-full h-full flex items-center justify-center bg-[#1a56db] rounded-xl text-white font-black text-2xl group-hover:shadow-[0_0_20px_rgba(26,86,219,0.4)] transition-all">Q</div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border bg-white/5 border-white/10 text-white/60 group-hover:text-white group-hover:border-white/20">Certification qualité</span>
                </div>
                <div className="mt-auto space-y-3">
                  <h3 className="text-xl font-medium text-white tracking-tight">Qualiopi</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">Atteste de la qualité du processus mis en œuvre par les prestataires d'actions concourant au développement des compétences.</p>
                </div>
                <div className="absolute -bottom-12 -right-12 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 bg-[#1a56db]" />
              </div>
            </div>

            {/* Cisco (Hero) */}
            <div className="l2-card relative group lg:col-span-4 lg:-mt-4">
              <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[2px] blur-[2px] z-20" style={{ background: 'linear-gradient(90deg, transparent, #049fd9, transparent)' }} />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1/2 h-8 blur-2xl opacity-20 z-10 bg-[#049fd9]" />
              <div className="relative overflow-hidden h-full bg-[#110c26]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 transition-all duration-500 ease-out hover:border-white/10 hover:bg-[#150f30]/80 hover:-translate-y-2 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl flex items-center justify-center w-20 h-20 bg-white/5">
                    <img src="https://cdn.simpleicons.org/cisco/ffffff" alt="Cisco" className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border bg-white/5 border-white/10 text-white/60 group-hover:text-white group-hover:border-white/20">Partenaire réseau</span>
                </div>
                <div className="mt-auto space-y-3">
                  <h3 className="text-2xl font-medium text-white tracking-tight">Cisco</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">Leader mondial des technologies réseau, fournissant le cadre officiel et les certifications CCST.</p>
                </div>
                <div className="absolute -bottom-12 -right-12 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 bg-[#049fd9]" />
              </div>
            </div>

            {/* NET Academy */}
            <div className="l2-card relative group lg:col-span-3 lg:mt-4">
              <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[2px] blur-[2px] z-20" style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }} />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1/2 h-8 blur-2xl opacity-20 z-10 bg-[#a855f7]" />
              <div className="relative overflow-hidden h-full bg-[#110c26]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 transition-all duration-500 ease-out hover:border-white/10 hover:bg-[#150f30]/80 hover:-translate-y-2 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl flex items-center justify-center w-16 h-16 bg-white/5">
                    <div className="w-full h-full flex items-center justify-center bg-[#a855f7] rounded-xl text-white font-bold text-xl group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">NA</div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border bg-white/5 border-white/10 text-white/60 group-hover:text-white group-hover:border-white/20">Centre de formation</span>
                </div>
                <div className="mt-auto space-y-3">
                  <h3 className="text-xl font-medium text-white tracking-tight">NET Academy</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">Centre d'excellence académique spécialisé dans le déploiement des infrastructures Cisco de nouvelle génération.</p>
                </div>
                <div className="absolute -bottom-12 -right-12 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 bg-[#a855f7]" />
              </div>
            </div>
          </div>

          <div className="l2-footer mt-20 flex justify-center">
            <p className="text-slate-500 text-[11px] tracking-[0.4em] uppercase font-medium">Formations certifiantes reconnues par l'état</p>
          </div>
        </div>
      </section>

      {/* ── 9. CTA ───────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a051a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(88,28,135,0.25),transparent)]" />
        <div className="relative z-10 text-center max-w-2xl px-8">
          <div className="v2c-line w-px h-16 bg-gradient-to-b from-transparent to-purple-500 mx-auto mb-8 origin-top" />
          <h2 className="v2c-heading text-5xl md:text-6xl font-black mb-4">
            Prêt à devenir<br />
            <span style={{ background: 'linear-gradient(90deg,#a855f7,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              expert réseau ?
            </span>
          </h2>
          <p className="v2c-sub text-slate-500 text-lg mb-8">
            Accédez immédiatement à l'ensemble de la formation et préparez votre CCST.
          </p>
          <button onClick={onLogin}
            className="v2c-btn px-14 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm tracking-widest rounded-full shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/60 hover:scale-105 transition-all flex items-center gap-2 mx-auto">
            <Play size={16} className="fill-white" /> Accéder à la formation
          </button>
        </div>
      </section>

    </div>
  );
}


// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function LandingPage({ onLogin }) {
  return <Vibe2 onLogin={onLogin} />;
}
