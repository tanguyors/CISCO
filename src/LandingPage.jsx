import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Terminal, Award, Users, Star, CheckCircle, Zap, Shield, Play, Network, Globe, Layers, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── VIBE 2 — PURPLE LUXURY (full scrollytelling) ────────────────────────────
const MANIFESTO_WORDS = 'Le réseau est partout. Dans chaque paquet transmis. Dans chaque route calculée. Dans chaque connexion établie entre deux machines. Maîtriser le réseau, c\'est comprendre l\'infrastructure invisible qui fait tourner le monde entier.'.split(' ');

// Real sessions extracted from NetMasterClass.jsx
const REAL_SESSIONS = [
  { id: 1,  title: 'Sécurisation & SSH',        slides: 73, quiz: 38, color: '#a855f7', week: 1, tag: 'S1',  keys: ['CLI 3 modes', 'SSH', 'Enable secret', 'TFTP'] },
  { id: 2,  title: 'VLANs',                      slides: 45, quiz: 15, color: '#a855f7', week: 1, tag: 'S2',  keys: ['Segmentation', 'VLAN 1', 'Plages', 'Config'] },
  { id: 3,  title: 'Trunk & Inter-VLAN',         slides: 39, quiz: 23, color: '#a855f7', week: 1, tag: 'S3',  keys: ['802.1Q', 'Dot1Q', 'Router-on-stick', 'SVI'] },
  { id: 4,  title: 'DHCP & DNS',                 slides: 88, quiz: 26, color: '#3b82f6', week: 2, tag: 'S4',  keys: ['DORA', 'Pool DHCP', 'Relais', 'Résolution'] },
  { id: 5,  title: 'HTTP, FTP & ARP',            slides: 43, quiz: 25, color: '#3b82f6', week: 2, tag: 'S5',  keys: ['GET/POST', 'Codes HTTP', 'TFTP', 'Gratuitous ARP'] },
  { id: 6,  title: 'Syslog & SNMP',              slides: 39, quiz:  3, color: '#3b82f6', week: 2, tag: 'S6',  keys: ['8 niveaux', 'Trap SNMP', 'MIB', 'Logging'] },
  { id: 7,  title: 'Adressage IP & Masques',     slides: 67, quiz: 23, color: '#10b981', week: 3, tag: 'S7',  keys: ['CIDR', 'VLSM', 'Binaire', 'Découpage'] },
  { id: 8,  title: 'Routage Statique',           slides: 29, quiz: 10, color: '#10b981', week: 3, tag: 'S8',  keys: ['ip route', 'Table routage', 'Default route', 'AD'] },
  { id: 9,  title: 'OSPF',                       slides: 23, quiz: 20, color: '#10b981', week: 3, tag: 'S9',  keys: ['Areas', 'Wildcard', 'Hello/Dead', 'DR/BDR'] },
  { id: 10, title: 'STP — Spanning Tree',              slides: 28, quiz: 10, color: '#f59e0b', week: 4, tag: 'S10', keys: ['Root Bridge', 'BPDU', 'PortFast', 'BPDU Guard'] },
];

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
const PLATFORM_TOOLS = [
  { Icon: Terminal, color: '#a855f7', title: 'Simulateur CLI',       desc: 'Syntaxe Cisco IOS colorisée. Naviguez entre les modes User, Privileged, Config en live.' },
  { Icon: Zap,      color: '#3b82f6', title: 'Générateur de cmds',   desc: 'Construisez pas-à-pas vos configs VLAN, OSPF, NAT avec le bon ordre de commandes garanti.' },
  { Icon: BookOpen, color: '#10b981', title: 'Flashcards actives',   desc: '100+ commandes clés. Mode retournement, mode examen, répétition des commandes ratées.' },
  { Icon: Globe,    color: '#f59e0b', title: 'Calculateur réseau',   desc: 'Calculs CIDR/VLSM, conversions binaire/décimal, masques. Widget flottant disponible en cours.' },
  { Icon: Layers,   color: '#ec4899', title: 'Tableau interactif',   desc: 'Dessinez vos topologies réseau directement dans l\'interface. Outils crayon, formes, texte.' },
  { Icon: Shield,   color: '#6366f1', title: 'Quiz 193 questions',   desc: 'Questions CCST avec explications détaillées. Mode session ciblée ou révision générale.' },
];

// Partner logos (Simple Icons CDN — standard web dev resource)

const TESTIMONIALS = [
  { name: 'Thomas M.', role: 'Administrateur réseau', quote: 'J\'ai obtenu ma certification CCST en 3 mois. Les labs Packet Tracer sont vraiment proches des vrais examens Cisco.', rating: 5, initials: 'TM', color: '#a855f7' },
  { name: 'Sophie L.', role: 'Étudiante BTS SIO',     quote: 'Les cours sont clairs et progressifs. Les flashcards m\'ont aidée à retenir les 100+ commandes Cisco en quelques jours.', rating: 5, initials: 'SL', color: '#3b82f6' },
  { name: 'Romain D.', role: 'Ingénieur réseau',      quote: 'La meilleure formation CCST que j\'ai trouvée. La progression est logique et les explications OSPF sont enfin compréhensibles.', rating: 5, initials: 'RD', color: '#10b981' },
];

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
const RECRUITERS = [
  { type: 'img',   src: 'https://cdn.simpleicons.org/google/ffffff',    label: 'Google',      sector: 'Cloud & IA',     color: '#4285f4' },
  { type: 'badge', abbr: 'AWS',  bg: '#232f3e',                         label: 'Amazon AWS',  sector: 'Cloud',          color: '#ff9900' },
  { type: 'badge', abbr: 'MS',   bg: '#0078d4',                         label: 'Microsoft',   sector: 'Azure & IA',     color: '#50e6ff' },
  { type: 'img',   src: 'https://cdn.simpleicons.org/meta/ffffff',      label: 'Meta',        sector: 'Data Center',    color: '#0866ff' },
  { type: 'img',   src: 'https://cdn.simpleicons.org/ibm/ffffff',       label: 'IBM',         sector: 'Infrastructure', color: '#1f70c1' },
  { type: 'badge', abbr: 'ORA',  bg: '#c74634',                         label: 'Oracle',      sector: 'Cloud & DB',     color: '#f80000' },
  { type: 'img',   src: 'https://cdn.simpleicons.org/cisco/ffffff',     label: 'Cisco',       sector: 'Networking',     color: '#1ba0d7' },
  { type: 'img',   src: 'https://cdn.simpleicons.org/nokia/ffffff',     label: 'Nokia',       sector: 'Télécoms',       color: '#124191' },
  { type: 'badge', abbr: 'ORG',  bg: '#ff6600',                         label: 'Orange',      sector: 'Télécoms FR',    color: '#ff8533' },
  { type: 'img',   src: 'https://cdn.simpleicons.org/ovhcloud/ffffff',  label: 'OVHcloud',    sector: 'Cloud FR',       color: '#123f6d' },
  { type: 'img',   src: 'https://cdn.simpleicons.org/accenture/ffffff', label: 'Accenture',   sector: 'Conseil IT',     color: '#a100ff' },
  { type: 'img',   src: 'https://cdn.simpleicons.org/capgemini/ffffff', label: 'Capgemini',   sector: 'Conseil IT',     color: '#0070ad' },
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
  { type: 'badge', abbr: '⚜',      bg: '#c41e3a',
    label: 'Région Normandie',      tag: 'Partenaire territorial', desc: 'Soutien & financement régional', accent: '#c41e3a' },
  { type: 'badge', abbr: 'MT',      bg: '#003189',
    label: 'Ministère du Travail',  tag: 'Accréditation nationale',desc: 'CPF & France Compétences', accent: '#003189' },
  { type: 'badge', abbr: 'NA',      bg: '#7c3aed',
    label: 'NET Academy',           tag: 'Centre de formation',    desc: 'Centre agréé Cisco Networking', accent: '#a855f7' },
];

function Vibe2({ onLogin }) {
  const rootRef     = useRef(null);
  const heroRef     = useRef(null);
  const jobStatsRef = useRef(null);
  const recruitRef  = useRef(null);
  const statsRef    = useRef(null);
  const sessionsRef = useRef(null);
  const cliRef      = useRef(null);
  const howRef      = useRef(null);
  const horizWrap   = useRef(null);
  const horizTrack  = useRef(null);
  const prevRef     = useRef(null);
  const maniRef     = useRef(null);
  const toolsRef    = useRef(null);
  const testRef     = useRef(null);
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
      gsap.set('.v2h-trust',     { y: 20,  opacity: 0 });
      gsap.set('.v2h-term',      { x: 40,  opacity: 0 });
      gsap.set('.v2h-term-line', { x: -6,  opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current, start: 'top top', end: '+=180%',
          pin: true, scrub: 0.5, anticipatePin: 1,
          snap: { snapTo: [0, 0.5, 1], duration: { min: 0.3, max: 0.8 }, delay: 0.05, ease: 'power2.inOut' },
          onLeave: sweep, onEnterBack: sweep,
        },
      })
        // ENTER: 0 → snap1 (progress 0.5)
        .to('.v2h-bgimg',    { scale: 1, duration: 1 }, 0)
        .to('.v2h-tag',      { y: 0, opacity: 1, duration: 0.25 }, 0.1)
        .to('.v2h-line',     { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 }, 0.2)
        .to('.v2h-sub',      { y: 0, opacity: 1, duration: 0.3 }, 0.55)
        .to('.v2h-btn',      { y: 0, opacity: 1, scale: 1, duration: 0.25 }, 0.7)
        .to('.v2h-trust',    { y: 0, opacity: 1, stagger: 0.07, duration: 0.25 }, 0.78)
        .to('.v2h-term',     { x: 0, opacity: 1, duration: 0.35 }, 0.72)
        .to('.v2h-term-line',{ x: 0, opacity: 1, stagger: 0.04, duration: 0.05 }, 0.85)
        .set({}, {}, 1.0)
        // EXIT: snap1 → snap2 (progress 1.0)
        .to('.v2h-bgimg',              { scale: 1.15, opacity: 0.3, duration: 0.7 }, 1.0)
        .to('.v2h-term',               { x: 30, opacity: 0, duration: 0.2 }, 1.05)
        .to(['.v2h-trust', '.v2h-btn'],{ y: -90, opacity: 0, stagger: 0.05, duration: 0.3 }, 1.1)
        .to('.v2h-sub',                { y: -60, opacity: 0, duration: 0.3 }, 1.2)
        .to('.v2h-line',               { y: -160, opacity: 0, stagger: 0.1, duration: 0.45 }, 1.25)
        .to('.v2h-tag',                { y: -40, opacity: 0, duration: 0.25 }, 1.7)
        .set({}, {}, 2.0);

      // ── 2. JOB MARKET STATS — pin 280% ───────────────────────────────────
      gsap.set('.v2j-hd',   { y: 60, opacity: 0 });
      gsap.set('.v2j-card', { y: 60, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: jobStatsRef.current, start: 'top top', end: '+=160%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
        onStart: () => {
          JOB_STATS.forEach((s, i) => {
            const el = jobStatsRef.current?.querySelector(`.v2j-num-${i}`);
            if (!el) return;
            const o = { v: 0 };
            gsap.to(o, {
              v: s.val, ease: 'power2.out', duration: 2,
              onUpdate: () => { el.textContent = o.v % 1 !== 0 ? o.v.toFixed(1) + s.suffix : Math.round(o.v) + s.suffix; },
            });
          });
        },
      })
        .to('.v2j-hd',   { y: 0, opacity: 1, stagger: 0.06, duration: 0.25 }, 0)
        .to('.v2j-card', { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 },  0.2);

      // ── 3. RECRUITERS — pin 250% ──────────────────────────────────────────
      const recCards = gsap.utils.toArray(recruitRef.current?.querySelectorAll('.v2r-card') ?? []);
      gsap.set('.v2r-hd',  { y: 30, opacity: 0 });
      gsap.set(recCards,   { y: 60, opacity: 0, scale: 0.9 });
      gsap.timeline({
        scrollTrigger: { trigger: recruitRef.current, start: 'top top', end: '+=150%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to('.v2r-hd', { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, 0)
        .to(recCards,  { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.4 }, 0.15);

      // ── 4. STATS (En chiffres) — pin 220% ────────────────────────────────
      gsap.set('.v2s-hd',    { y: 50, opacity: 0 });
      gsap.set('.v2s-card',  { y: 50, opacity: 0 });
      gsap.set('.v2s-extra', { y: 50, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: statsRef.current, start: 'top top', end: '+=130%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
        onStart: () => {
          REAL_STATS2.forEach((s, i) => {
            const el = statsRef.current?.querySelector(`.v2s-num-${i}`);
            if (!el) return;
            const o = { v: 0 };
            gsap.to(o, {
              v: s.val, ease: 'power2.out', duration: 2,
              onUpdate: () => { el.textContent = Math.round(o.v) + s.suffix; },
            });
          });
        },
      })
        .to('.v2s-hd',    { y: 0, opacity: 1, duration: 0.2 }, 0)
        .to('.v2s-card',  { y: 0, opacity: 1, stagger: 0.1,  duration: 0.35 }, 0.15)
        .to('.v2s-extra', { y: 0, opacity: 1, stagger: 0.08, duration: 0.25 }, 0.5);

      // ── 5. SESSIONS GRID — pin 280% ───────────────────────────────────────
      gsap.set('.v2ss-hd',   { y: 60, opacity: 0 });
      gsap.set('.v2ss-card', { y: 60, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: sessionsRef.current, start: 'top top', end: '+=160%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to('.v2ss-hd',   { y: 0, opacity: 1, duration: 0.2 }, 0)
        .to('.v2ss-card', { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 }, 0.15);

      // ── 6. CLI TERMINALS — pin 350% ───────────────────────────────────────
      gsap.set('.v2cli-hd',    { y: 60, opacity: 0 });
      gsap.set('.v2cli-panel', { y: 60, opacity: 0 });
      const cliTl = gsap.timeline({
        scrollTrigger: { trigger: cliRef.current, start: 'top top', end: '+=200%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      });
      cliTl
        .to('.v2cli-hd',    { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, 0)
        .to('.v2cli-panel', { y: 0, opacity: 1, stagger: 0.1,  duration: 0.3 }, 0.15);
      CLI_PANELS.forEach((_, pi) => {
        const lineEls = gsap.utils.toArray(cliRef.current?.querySelectorAll(`.v2cli-line-p${pi}`) ?? []);
        gsap.set(lineEls, { opacity: 0, x: -8 });
        cliTl.to(lineEls, { opacity: 1, x: 0, stagger: 0.05, duration: 0.06 }, 0.4);
      });

      // ── 7. HOW IT WORKS — pin 300% ────────────────────────────────────────
      gsap.set('.v2w-hd',   { y: 40, opacity: 0 });
      gsap.set('.v2w-step', { x: -60, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: howRef.current, start: 'top top', end: '+=180%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to('.v2w-hd',   { y: 0, opacity: 1, duration: 0.25 }, 0)
        .to('.v2w-step', { x: 0, opacity: 1, stagger: 0.2, duration: 0.5 }, 0.2);

      // ── 8. HORIZONTAL CURRICULUM (scrub:1 intentional) ───────────────────
      const track = horizTrack.current;
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: horizWrap.current, start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true, scrub: 0.5, invalidateOnRefresh: true, anticipatePin: 1,
          },
        });
      }

      // ── 9. PLATFORM PREVIEW — pin 220% ────────────────────────────────────
      gsap.set('.v2p-txt',  { x: -50, opacity: 0 });
      gsap.set('.v2p-img',  { x:  50, opacity: 0 });
      gsap.set('.v2p-feat', { y:  20, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: prevRef.current, start: 'top top', end: '+=130%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to('.v2p-txt',  { x: 0, opacity: 1, duration: 0.5 }, 0)
        .to('.v2p-img',  { x: 0, opacity: 1, duration: 0.5 }, 0.1)
        .to('.v2p-feat', { y: 0, opacity: 1, stagger: 0.1, duration: 0.3 }, 0.5);

      // ── 10. MANIFESTO — pin 320% ──────────────────────────────────────────
      const mWords = gsap.utils.toArray(maniRef.current?.querySelectorAll('.v2m-word') ?? []);
      gsap.set(mWords, { color: '#1e1b4b' });
      gsap.timeline({
        scrollTrigger: { trigger: maniRef.current, start: 'top top', end: '+=180%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to(mWords, { color: '#e2e8f0', stagger: 1 / (mWords.length || 1), duration: 1 }, 0);

      // ── 11. PLATFORM TOOLS — pin 250% ────────────────────────────────────
      gsap.set('.v2tl-hd',   { y: 50, opacity: 0 });
      gsap.set('.v2tl-card', { y: 50, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: toolsRef.current, start: 'top top', end: '+=150%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to('.v2tl-hd',   { y: 0, opacity: 1, duration: 0.25 }, 0)
        .to('.v2tl-card', { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 }, 0.2);

      // ── 12. TESTIMONIALS — pin 220% ───────────────────────────────────────
      gsap.set('.v2t-hd',   { y: 60, opacity: 0 });
      gsap.set('.v2t-card', { y: 60, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: testRef.current, start: 'top top', end: '+=130%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to('.v2t-hd',   { y: 0, opacity: 1, duration: 0.25 }, 0)
        .to('.v2t-card', { y: 0, opacity: 1, stagger: 0.15, duration: 0.4 }, 0.2);

      // ── 13. NOS PARTENAIRES — pin 200% ────────────────────────────────────
      const lgCards = gsap.utils.toArray(logosRef.current?.querySelectorAll('.v2lg-card') ?? []);
      const lgHd    = logosRef.current?.querySelector('.v2lg-hd');
      gsap.set(lgCards, { y: 60, opacity: 0, scale: 0.9 });
      if (lgHd) gsap.set(lgHd, { y: 30, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: logosRef.current, start: 'top top', end: '+=120%', pin: true, scrub: 0.3, anticipatePin: 1, onLeave: sweep, onEnterBack: sweep },
      })
        .to(lgHd,    { y: 0, opacity: 1, duration: 0.2 }, 0)
        .to(lgCards, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.4 }, 0.1);

      // ── 14. CTA — pin 150% ────────────────────────────────────────────────
      gsap.set('.v2c-line',    { scaleY: 0 });
      gsap.set('.v2c-heading', { y: 30, opacity: 0 });
      gsap.set('.v2c-sub',     { y: 30, opacity: 0 });
      gsap.set('.v2c-btn',     { y: 30, opacity: 0 });
      gsap.set('.v2c-trust',   { y: 30, opacity: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: ctaRef.current, start: 'top top', end: '+=150%', pin: true, scrub: true, anticipatePin: 1 },
      })
        .to('.v2c-line',    { scaleY: 1, duration: 0.2 }, 0)
        .to('.v2c-heading', { y: 0, opacity: 1, duration: 0.35 }, 0.15)
        .to('.v2c-sub',     { y: 0, opacity: 1, duration: 0.3 }, 0.42)
        .to('.v2c-btn',     { y: 0, opacity: 1, duration: 0.25 }, 0.6)
        .to('.v2c-trust',   { y: 0, opacity: 1, stagger: 0.08, duration: 0.2 }, 0.75);

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
        { ref: sessionsRef, step: 3 },
        { ref: cliRef,      step: 4 },
        { ref: howRef,      step: 4 },
        { ref: horizWrap,   step: 4 },
        { ref: prevRef,     step: 5 },
        { ref: maniRef,     step: 5 },
        { ref: toolsRef,    step: 6 },
        { ref: testRef,     step: 6 },
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
          {/* trust strip */}
          <div className="flex items-center gap-8 mt-10">
            {[
              { icon: Users, label: '247 étudiants inscrits' },
              { icon: Star,  label: '4.9 / 5 de satisfaction' },
              { icon: Award, label: 'CCST ready en 4 semaines' },
            ].map((t, i) => (
              <div key={i} className="v2h-trust flex items-center gap-2 text-slate-500 text-xs">
                <t.icon size={14} className="text-purple-400 shrink-0" />
                {t.label}
              </div>
            ))}
          </div>
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

      {/* ── JOB MARKET STATS ─────────────────────────────────────────────── */}
      <section ref={jobStatsRef} className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#030108]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(99,102,241,0.07),transparent)]" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <p className="v2j-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Pourquoi se former maintenant</p>
          <h2 className="v2j-hd text-4xl font-black mb-3">L'IA et les data centers <span style={{ background: 'linear-gradient(90deg,#a855f7,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>explosent la demande.</span></h2>
          <p className="v2j-hd text-slate-500 text-base mb-10 max-w-2xl">ChatGPT, Copilot, Gemini… chaque modèle d'IA nécessite des milliers de serveurs interconnectés. Les ingénieurs réseau n'ont jamais été aussi recherchés.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {JOB_STATS.map((s, i) => {
              const StatIcon = s.icon;
              return (
                <div key={i} className="v2j-card p-6 rounded-2xl border bg-white/[0.02]" style={{ borderColor: `${s.color}20` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`v2j-num-${i} text-4xl font-black tabular-nums`}
                      style={{ background: `linear-gradient(135deg,${s.color},${s.color}99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      0{s.suffix}
                    </div>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                      <StatIcon size={16} style={{ color: s.color }} />
                    </div>
                  </div>
                  <div className="text-white text-sm font-semibold mb-1">{s.label}</div>
                  <div className="text-slate-600 text-xs leading-relaxed">{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RECRUITERS ───────────────────────────────────────────────────── */}
      <section ref={recruitRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05030f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(88,28,135,0.08),transparent)]" />
        <div className="relative z-10 w-full max-w-5xl px-8 text-center">
          <p className="v2r-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Débouchés</p>
          <h2 className="v2r-hd text-4xl font-black mb-3">Ils recrutent.</h2>
          <p className="v2r-hd text-slate-500 text-base mb-8">Les plus grandes entreprises tech du monde cherchent des profils réseau certifiés Cisco.</p>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-8">
            {RECRUITERS.map((r, i) => (
              <div key={i} className="v2r-card flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={r.type === 'badge'
                    ? { background: r.bg, border: `1px solid ${r.color}50` }
                    : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {r.type === 'img'
                    ? <img src={r.src} alt={r.label} style={{ width: 30, height: 30, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                    : <span className="text-white font-black text-xs select-none tracking-tight">{r.abbr}</span>
                  }
                </div>
                <div className="text-white text-[10px] font-bold text-center leading-tight">{r.label}</div>
                <div className="text-[9px] text-center" style={{ color: `${r.color}70` }}>{r.sector}</div>
              </div>
            ))}
          </div>
          {/* Job profiles strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { title: 'Ingénieur Réseau',    range: '35–65K€', growth: '+18%/an', color: '#a855f7', icon: Network },
              { title: 'Admin Sys & Réseau',  range: '32–55K€', growth: '+14%/an', color: '#3b82f6', icon: Shield  },
              { title: 'Consultant Infra IT', range: '45–80K€', growth: '+22%/an', color: '#10b981', icon: Globe   },
              { title: 'Technicien Télécom',  range: '28–45K€', growth: '+11%/an', color: '#f59e0b', icon: Zap     },
            ].map((j, i) => {
              const JIcon = j.icon;
              return (
                <div key={i} className="v2r-card flex items-center gap-3 p-4 rounded-xl border bg-white/[0.02] text-left"
                  style={{ borderColor: `${j.color}25` }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${j.color}15`, border: `1px solid ${j.color}30` }}>
                    <JIcon size={16} style={{ color: j.color }} />
                  </div>
                  <div>
                    <div className="text-white text-[11px] font-bold leading-tight">{j.title}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: j.color }}>{j.range}</div>
                    <div className="text-slate-600 text-[9px]">{j.growth}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 2. STATS ─────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#0a051a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,40,200,0.12),transparent)]" />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <p className="v2s-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">En chiffres</p>
          <h2 className="v2s-hd text-4xl font-black mb-10">Une formation complète, mesurable.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            {REAL_STATS2.map((s, i) => {
              const StatIcon = s.icon;
              const colors = ['#a855f7','#3b82f6','#10b981','#f59e0b'];
              return (
                <div key={i} className="v2s-card p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                  <StatIcon size={18} className="mb-3" style={{ color: colors[i] }} />
                  <div className={`v2s-num-${i} text-5xl font-black tabular-nums`}
                    style={{ background: `linear-gradient(135deg,${colors[i]},${colors[(i+1)%4]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    0{s.suffix}
                  </div>
                  <div className="text-white text-sm font-semibold mt-2">{s.label}</div>
                  <div className="text-slate-500 text-xs mt-1">{s.desc}</div>
                </div>
              );
            })}
          </div>
          {/* extra rows */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: CheckCircle, label: '3 sessions live par semaine avec le formateur' },
              { icon: Shield,      label: 'Contenu maintenu à jour avec IOS 15.x' },
              { icon: Zap,         label: 'Accès immédiat à tout le contenu dès l\'inscription' },
              { icon: Users,       label: '474+ diapositives interactives et schémas réseau' },
            ].map((e, i) => (
              <div key={i} className="v2s-extra flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <e.icon size={16} className="text-purple-400 shrink-0" />
                <span className="text-slate-400 text-sm">{e.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 3. SESSIONS GRID ─────────────────────────────────────────────── */}
      <section ref={sessionsRef} className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#05030f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(88,28,135,0.12),transparent)]" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <p className="v2ss-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Programme complet</p>
          <h2 className="v2ss-hd text-4xl font-black mb-8">10 sessions, 0 lacune.</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {REAL_SESSIONS.map((s) => (
              <div key={s.id} className="v2ss-card p-4 rounded-xl border bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                style={{ borderColor: `${s.color}25` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: `${s.color}20`, color: s.color }}>{s.tag}</span>
                  <span className="text-[10px] text-slate-600">S{s.id < 10 ? '0'+s.id : s.id}</span>
                </div>
                <h4 className="text-white text-xs font-bold leading-snug mb-2">{s.title}</h4>
                <div className="flex gap-3 mb-3 text-[10px] text-slate-500">
                  <span>{s.slides} slides</span>
                  <span>{s.quiz} quiz</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {s.keys.map((k, ki) => (
                    <span key={ki} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-500">{k}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-6">
            {[{ color:'#a855f7', label:'S1 — Administration Cisco & VLAN' }, { color:'#3b82f6', label:'S2 — Protocoles & Services' }, { color:'#10b981', label:'S3 — Adressage IP & Routage' }, { color:'#f59e0b', label:'S4 — Commutation (STP)' }].map((leg, i) => (
              <div key={i} className="v2ss-hd flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: leg.color }} />
                {leg.label}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 3b. CLI TERMINALS ────────────────────────────────────────────── */}
      <section ref={cliRef} className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#030108]">
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


      {/* ── 4. HOW IT WORKS ──────────────────────────────────────────────── */}
      <section ref={howRef} className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#05030f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(88,28,135,0.1),transparent)]" />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <p className="v2w-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Comment ça marche</p>
          <h2 className="v2w-hd text-4xl font-black mb-10">De zéro à certifié en 4 étapes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '01', icon: BookOpen, color: '#a855f7', title: 'Cours enregistrés', body: 'Slides interactives, schémas réseau détaillés et exemples CLI Cisco commentés. Disponible à tout moment, à votre rythme.', items: ['10 sessions structurées', '474+ diapositives', 'Exemples CLI annotés'] },
              { num: '02', icon: Users,    color: '#3b82f6', title: 'Sessions live',     body: '3 sessions live par semaine avec votre formateur : correction de labs en direct, Q&A et mise en situation réseau réelle.', items: ['12 lives au total', 'Q&A formateur en direct', 'Correction de labs live'] },
              { num: '03', icon: Terminal, color: '#10b981', title: 'Labs Packet Tracer', body: 'Mettez en pratique sur Cisco Packet Tracer. Topologies NovaTech guidées, correction détaillée et astuces de dépannage.', items: ['10 labs guidés', 'Topologies réalistes', 'Corrections incluses'] },
              { num: '04', icon: Award,    color: '#f59e0b', title: 'Obtenez votre CCST', body: 'Quiz randomisés, flashcards de révision et générateur de commandes pour arriver à l\'examen avec confiance totale.', items: ['193+ questions CCST', 'Flashcards dynamiques', 'Générateur CLI interactif'] },
            ].map((step, i) => (
              <div key={i} className="v2w-step relative">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${step.color}20`, border: `1px solid ${step.color}40` }}>
                    <step.icon size={20} style={{ color: step.color }} />
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-widest" style={{ color: step.color }}>{step.num}</span>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.body}</p>
                <ul className="space-y-2">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-400">
                      <CheckCircle size={14} style={{ color: step.color }} className="shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 5. HORIZONTAL CURRICULUM ─────────────────────────────────────── */}
      <div ref={horizWrap} className="h-screen overflow-hidden">
        <div ref={horizTrack} className="h-full flex" style={{ width: `${(REAL_WEEKS_DATA.length + 1) * 100}vw` }}>
          {/* Intro slide */}
          <div className="w-screen h-full flex flex-col justify-center px-16 md:px-24 shrink-0 relative overflow-hidden bg-[#0a051a]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_50%,rgba(88,28,135,0.15),transparent)]" />
            <div className="max-w-xl relative z-10">
              <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-4">Curriculum détaillé</p>
              <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                4 semaines.<br /><span className="text-purple-500">1 objectif.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">Chaque semaine : cours enregistrés, 3 sessions live avec le formateur, labs Packet Tracer et quiz de validation.</p>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">{REAL_WEEKS_DATA.map((w, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ background: w.color }} />)}</div>
                <span className="text-xs text-slate-600 tracking-widest uppercase">Faites défiler →</span>
              </div>
            </div>
          </div>
          {/* Week slides */}
          {REAL_WEEKS_DATA.map((w, i) => {
            const WeekIcon = w.icon;
            return (
              <div key={i} className="w-screen h-full flex items-center px-12 md:px-20 shrink-0 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, #0a051a 50%, ${w.color}08)` }}>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none text-[18vw] font-black leading-none"
                  style={{ color: `${w.color}07` }}>{w.num}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl relative z-10">
                  {/* Left */}
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: `${w.color}20`, border: `1px solid ${w.color}40` }}>
                      <WeekIcon size={24} style={{ color: w.color }} />
                    </div>
                    <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: w.color }}>Semaine {w.num}</p>
                    <h3 className="text-4xl font-black text-white mb-2">{w.title}</h3>
                    <p className="text-purple-300/70 text-sm italic mb-5">"{w.highlight}"</p>
                    <div className="flex items-center gap-4 text-sm mb-5">
                      <span className="font-bold" style={{ color: w.color }}>{w.sessions} session{w.sessions > 1 ? 's' : ''}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400">{w.labs} lab{w.labs > 1 ? 's' : ''} Packet Tracer</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {w.sessionNames.map((sn, j) => (
                        <span key={j} className="text-xs px-3 py-1 rounded-full border"
                          style={{ borderColor: `${w.color}30`, color: w.color, background: `${w.color}10` }}>{sn}</span>
                      ))}
                    </div>
                  </div>
                  {/* Right */}
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-widest mb-4">Ce que vous maîtriserez</p>
                    <ul className="space-y-3 mb-6">
                      {w.topics.map((topic, j) => (
                        <li key={j} className="flex items-center gap-3 text-slate-300 text-sm">
                          <CheckCircle size={14} style={{ color: w.color }} className="shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 rounded-xl font-mono text-xs whitespace-pre-wrap" style={{ background: '#000000', border: `1px solid ${w.color}30` }}>
                      <div className="text-slate-600 mb-1">Commande clé :</div>
                      <div style={{ color: w.color }}>{w.cmd}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. PLATFORM PREVIEW ──────────────────────────────────────────── */}
      <section ref={prevRef} className="relative h-screen flex items-center px-8 md:px-16 overflow-hidden bg-[#05030f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(88,28,135,0.1),transparent)]" />
        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="v2p-txt">
            <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-3">La plateforme</p>
            <h2 className="text-4xl font-black mb-5">Tout ce qu'il vous faut,<br />au même endroit.</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Une interface conçue pour l'apprentissage des réseaux — cours structurés, labs guidés et outils de révision intégrés.
            </p>
            <ul className="space-y-3">
              {[
                { icon: Layers,   text: 'Slides interactives avec schémas réseau' },
                { icon: Terminal, text: 'Labs Packet Tracer avec correction intégrée' },
                { icon: Zap,      text: 'Quiz adaptatifs et flashcards dynamiques' },
                { icon: Shield,   text: 'Suivi de progression session par session' },
              ].map((f, i) => (
                <li key={i} className="v2p-feat flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <f.icon size={14} className="text-purple-400" />
                  </div>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
          {/* Screenshot */}
          <div className="v2p-img relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/30">
              <img src="/Capture d'écran 2026-03-02 121843.png" alt="Aperçu de la plateforme NetMasterClass" className="w-full" />
            </div>
            <div className="absolute -bottom-4 -right-4 px-4 py-3 rounded-2xl bg-purple-600 text-white text-sm font-bold shadow-lg shadow-purple-500/40">
              ✓ Accès immédiat
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. MANIFESTO ─────────────────────────────────────────────────── */}
      <section ref={maniRef} className="relative h-screen flex items-center justify-center px-8 overflow-hidden bg-[#030108]">
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

      {/* ── 10. PLATFORM TOOLS ───────────────────────────────────────────── */}
      <section ref={toolsRef} className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#0a051a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(88,28,135,0.1),transparent)]" />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <p className="v2tl-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Outils intégrés</p>
          <h2 className="v2tl-hd text-4xl font-black mb-10">La plateforme qui vous fait avancer.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLATFORM_TOOLS.map((t, i) => (
              <div key={i} className="v2tl-card p-6 rounded-2xl border bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                style={{ borderColor: `${t.color}20` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${t.color}15`, border: `1px solid ${t.color}30` }}>
                  <t.Icon size={20} style={{ color: t.color }} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section ref={testRef} className="relative h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden bg-[#05030f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(88,28,135,0.1),transparent)]" />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <p className="v2t-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-2">Ils témoignent</p>
          <h2 className="v2t-hd text-4xl font-black mb-10">Ce qu'en disent les étudiants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="v2t-card p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Students photo */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 h-40 relative">
            <img src="/students.png" alt="Étudiants en formation réseau" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05030f] via-transparent to-[#05030f]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white font-black text-xl">Rejoignez 247 étudiants déjà certifiés</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOS PARTENAIRES ───────────────────────────────────────────────── */}
      <section ref={logosRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05030f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(88,28,135,0.08),transparent)]" />
        <div className="relative z-10 w-full max-w-5xl px-8 text-center">
          <p className="v2lg-hd text-purple-400 text-xs tracking-[0.5em] uppercase mb-12">Nos partenaires</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-5 justify-items-center">
            {PARTNER_DETAILS.map((p, i) => (
              <div key={i} className="v2lg-card flex flex-col items-center gap-4 p-7 rounded-2xl border bg-white/[0.03] w-full"
                style={{ borderColor: `${p.accent}30` }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: p.type === 'badge' ? p.bg : 'rgba(255,255,255,0.04)', border: `1px solid ${p.accent}40` }}>
                  {p.type === 'img'
                    ? <img src={p.src} alt={p.label} style={{ width: 52, height: 52, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                    : <span className="text-white font-black text-2xl select-none">{p.abbr}</span>
                  }
                </div>
                <div className="text-white text-sm font-bold text-center leading-tight">{p.label}</div>
                <div className="text-[10px] px-2.5 py-1 rounded-full border text-center"
                  style={{ borderColor: `${p.accent}40`, color: p.accent }}>{p.tag}</div>
                <div className="text-slate-600 text-[10px] text-center leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA ───────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#030108]">
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
          <div className="flex items-center justify-center gap-8 mt-8">
            {['Sans engagement', 'Accès immédiat', 'Support inclus'].map((t, i) => (
              <div key={i} className="v2c-trust flex items-center gap-2 text-slate-600 text-xs">
                <CheckCircle size={12} className="text-purple-400" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}


// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function LandingPage({ onLogin }) {
  return <Vibe2 onLogin={onLogin} />;
}
