# Design System — Vibe 2: Purple Glassmorphism

## Color Palette

### Backgrounds
- **Main BG**: `bg-[#0a051a]` (deepest purple-black)
- **Sidebar/Panel BG**: `bg-[#0e0920]` (dark purple)
- **Card BG**: `bg-[#1a1035]` (medium dark purple)
- **Lighter elements**: `bg-[#251845]` (lighter purple)
- **Glass cards**: `bg-white/[0.03]` with `backdrop-blur-xl`

### Borders
- **Primary**: `border-white/10`
- **Secondary**: `border-white/[0.15]`
- **Tertiary/hover**: `border-white/20`

### Accent Colors
- **Primary accent**: `purple-600` / `purple-500`
- **Secondary accent**: `purple-400`
- **Gradients**: `from-purple-500 to-blue-500`, `from-purple-400 via-purple-300 to-blue-400`
- **Shadows**: `shadow-purple-900/30`, `shadow-purple-500/20`
- **Success**: Keep `emerald-*` for success states
- **Warning**: Keep `amber-*` for warnings
- **Error**: Keep `red-*` for errors

### Text Colors
- **Primary text**: `text-slate-100`
- **Body text**: `text-slate-200` / `text-slate-300`
- **Secondary text**: `text-slate-400`
- **Muted text**: `text-slate-500`
- **Accent text**: `text-purple-400`, `text-purple-300`

## Effects

### Glassmorphism
- Sidebar: `bg-[#0e0920]/80 backdrop-blur-xl`
- Glass cards: `bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl`

### Background Glows
```jsx
<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
```

### Progress Bars
```jsx
<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
  <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_12px_rgba(168,85,247,0.4)]" />
</div>
```

### Active Tab Indicator
```jsx
<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_-4px_12px_rgba(168,85,247,0.8)]" />
```

### Buttons
- **Primary**: `bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-500/20`
- **Secondary**: `bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10`

### Terminal/Code Blocks
- **BG**: `bg-[#0d0a1f]` or `bg-black`
- **Border**: `border-white/10`
- **Syntax**: emerald for commands, purple for prompts, blue for values

## Typography
- **Font**: `font-sans` (system)
- **Headings**: `font-bold tracking-tight text-white`
- **Labels**: `text-xs font-bold uppercase tracking-widest`
- **Code**: `font-mono`

## Reference Code (Vibe 2 - Course Layout)

```jsx
// Glass Card component
const GlassCard = ({ children, className }) => (
  <div className={cn("bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden", className)}>
    {children}
  </div>
);

// Tab with animated indicator
<button className={cn(
  "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative",
  activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300"
)}>
  {activeTab === tab && (
    <motion.div layoutId="tabBg" className="absolute inset-0 bg-white/10 rounded-lg shadow-sm" />
  )}
  <span className="relative z-10">{tab}</span>
</button>

// Sidebar item with purple active state
<button className={cn(
  "w-full flex items-center justify-between p-3 rounded-xl transition-all",
  isOpen ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/[0.02]"
)}>
  <div className={cn(
    "p-2 rounded-lg transition-colors",
    isOpen ? "bg-purple-500/20 text-purple-400" : "bg-[#1a1035]/50"
  )}>
    <Icon size={18} />
  </div>
</button>
```
