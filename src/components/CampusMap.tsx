"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building as BuildingIcon,
  Navigation2,
  X,
  ZoomIn,
  ZoomOut,
  Locate,
  Layers,
  Search,
  Clock,
  ArrowRight,
  Footprints,
  Volume2,
  Accessibility,
  AlertTriangle,
} from "lucide-react";
import { buildings, type Building, estimateWalkTime, routeColors } from "@/lib/campus-data";
import { cn } from "@/lib/utils";

type Props = {
  initialFromId?: string;
  showSidebar?: boolean;
};

export function CampusMap({ initialFromId = "parking", showSidebar = true }: Props) {
  const [fromId, setFromId] = useState<string>(initialFromId);
  const [toId, setToId] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [activeBuilding, setActiveBuilding] = useState<Building | null>(null);
  const [search, setSearch] = useState("");
  const [voice, setVoice] = useState(false);
  const [accessible, setAccessible] = useState(false);

  const from = buildings.find((b) => b.id === fromId)!;
  const to = toId ? buildings.find((b) => b.id === toId) ?? null : null;

  const filteredBuildings = useMemo(
    () =>
      buildings.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const routeColor = useMemo(() => {
    if (!to) return routeColors[0];
    const idx = (from.id.length + to.id.length) % routeColors.length;
    return routeColors[idx];
  }, [from, to]);

  const walkTime = to ? estimateWalkTime(from, to) : 0;

  // build SVG path with a midpoint curve
  const routePath = useMemo(() => {
    if (!to) return null;
    const mx = (from.x + to.x) / 2 + (to.y - from.y) * 0.15;
    const my = (from.y + to.y) / 2 - (to.x - from.x) * 0.15;
    return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  }, [from, to]);

  return (
    <div className="relative w-full h-full flex bg-[color:var(--cream)] dark:bg-background">
      {showSidebar && (
        <Sidebar
          search={search}
          setSearch={setSearch}
          filtered={filteredBuildings}
          from={from}
          to={to}
          setTo={setToId}
          setFrom={setFromId}
          openBuilding={setActiveBuilding}
          voice={voice}
          setVoice={setVoice}
          accessible={accessible}
          setAccessible={setAccessible}
        />
      )}

      <div className="relative flex-1 overflow-hidden">
        {/* Map canvas */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
            <defs>
              <pattern id="bgGrid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#1f5132" strokeWidth="0.08" opacity="0.18" />
              </pattern>
              <radialGradient id="green-glow">
                <stop offset="0%" stopColor="#1f5132" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#1f5132" stopOpacity="0" />
              </radialGradient>
              <filter id="route-glow">
                <feGaussianBlur stdDeviation="0.8" />
              </filter>
            </defs>

            <rect width="100" height="100" fill="url(#bgGrid)" />
            {/* Greenery */}
            <circle cx="25" cy="55" r="14" fill="url(#green-glow)" />
            <circle cx="70" cy="40" r="16" fill="url(#green-glow)" />
            <circle cx="55" cy="80" r="12" fill="url(#green-glow)" />

            {/* Walkways */}
            <path d="M 12 28 L 30 42 L 52 36 L 60 22" stroke="#e8e1cd" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 30 42 L 38 22" stroke="#e8e1cd" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 30 42 L 44 64 L 18 70" stroke="#e8e1cd" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 44 64 L 70 72" stroke="#e8e1cd" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 52 36 L 82 50" stroke="#e8e1cd" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Construction zone */}
            <g opacity={accessible ? 0.3 : 0.6}>
              <rect x="48" y="48" width="6" height="6" fill="#e07b39" opacity="0.3" />
              <text x="51" y="52" fontSize="2" textAnchor="middle" fill="#e07b39">
                ⚠
              </text>
            </g>

            {/* Active route */}
            {routePath && (
              <>
                <path d={routePath} stroke={routeColor} strokeWidth="2" fill="none" opacity="0.25" filter="url(#route-glow)" />
                <path d={routePath} stroke={routeColor} strokeWidth="1.2" fill="none" strokeLinecap="round" className="route-animated" />
                {/* arrowhead */}
                <circle cx={to!.x} cy={to!.y} r="1.6" fill={routeColor} />
              </>
            )}

            {/* Buildings */}
            {buildings.map((b) => {
              const isFrom = b.id === from.id;
              const isTo = to?.id === b.id;
              const isHover = hover === b.id;
              return (
                <g
                  key={b.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHover(b.id)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setActiveBuilding(b)}
                >
                  <rect
                    x={b.x - 3.5}
                    y={b.y - 3.5}
                    width="7"
                    height="7"
                    rx="1.2"
                    fill={b.color}
                    opacity={isHover || isFrom || isTo ? 1 : 0.9}
                    stroke="white"
                    strokeWidth="0.4"
                  />
                  <text
                    x={b.x}
                    y={b.y + 0.8}
                    textAnchor="middle"
                    fontSize="2.2"
                    fontWeight="700"
                    fill="white"
                  >
                    {b.short}
                  </text>
                  <text
                    x={b.x}
                    y={b.y + 6}
                    textAnchor="middle"
                    fontSize="1.8"
                    fontWeight="600"
                    fill="#1f5132"
                  >
                    {b.name}
                  </text>
                  {isFrom && (
                    <>
                      <circle cx={b.x} cy={b.y - 5.5} r="1.1" fill="#1f5132" />
                      <circle cx={b.x} cy={b.y - 5.5} r="2.5" fill="#1f5132" opacity="0.25">
                        <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Top route bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[min(92%,520px)]">
          <div className="glass rounded-2xl p-3 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                A
              </div>
              <select
                value={from.id}
                onChange={(e) => setFromId(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium outline-none"
              >
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: routeColor }}
              >
                B
              </div>
              <select
                value={toId ?? ""}
                onChange={(e) => setToId(e.target.value || null)}
                className="flex-1 bg-transparent text-sm font-medium outline-none"
              >
                <option value="">Choose destination…</option>
                {buildings
                  .filter((b) => b.id !== from.id)
                  .map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
              </select>
              {to && (
                <div className="flex items-center gap-1 text-xs font-medium text-primary bg-secondary px-2 py-1 rounded-md">
                  <Clock className="w-3 h-3" /> {walkTime}m
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-secondary"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-secondary"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-secondary"
          >
            <Locate className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAccessible((a) => !a)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              accessible ? "bg-accent text-accent-foreground" : "glass hover:bg-secondary"
            )}
            title="Accessibility route"
          >
            <Accessibility className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom mini-map + info */}
        <div className="absolute bottom-4 right-4 hidden md:block">
          <div className="glass rounded-2xl p-2 w-44">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-1 pb-1">Mini-map</div>
            <div className="aspect-square rounded-lg bg-[color:var(--cream)] dark:bg-secondary relative overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {buildings.map((b) => (
                  <circle key={b.id} cx={b.x} cy={b.y} r="2" fill={b.color} />
                ))}
                {routePath && (
                  <path d={routePath} stroke={routeColor} strokeWidth="1" fill="none" />
                )}
                <circle cx={from.x} cy={from.y} r="2.5" fill="none" stroke="#1f5132" strokeWidth="0.8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick chips */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-md">
          {to && (
            <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs">
              <Footprints className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium">{walkTime} min walk</span>
              <span className="text-muted-foreground">· shortest route</span>
            </div>
          )}
          <button
            onClick={() => setVoice((v) => !v)}
            className={cn(
              "rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-medium",
              voice ? "bg-accent text-accent-foreground" : "glass"
            )}
          >
            <Volume2 className="w-3.5 h-3.5" /> Voice
          </button>
          <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-[color:var(--chart-4)]" />
            <span>Avoiding construction near Mess</span>
          </div>
        </div>

        <BuildingModal building={activeBuilding} onClose={() => setActiveBuilding(null)} onNavigate={(id) => { setToId(id); setActiveBuilding(null); }} />
      </div>
    </div>
  );
}

function Sidebar({
  search, setSearch, filtered, from, to, setTo, setFrom, openBuilding, voice, setVoice, accessible, setAccessible,
}: {
  search: string;
  setSearch: (v: string) => void;
  filtered: Building[];
  from: Building;
  to: Building | null;
  setTo: (id: string) => void;
  setFrom: (id: string) => void;
  openBuilding: (b: Building) => void;
  voice: boolean;
  setVoice: (v: boolean) => void;
  accessible: boolean;
  setAccessible: (v: boolean) => void;
}) {
  const recents = ["library", "mess", "sports"];
  return (
    <aside className="hidden lg:flex flex-col w-80 border-r border-border bg-sidebar p-4 gap-3 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-2 mb-1">
        <Layers className="w-4 h-4 text-primary" />
        <div className="text-sm font-semibold">Dashboard</div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search buildings, labs, offices..."
          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <div className="glass-dark rounded-xl p-3 text-primary-foreground">
        <div className="text-[10px] uppercase tracking-wider opacity-80">You are at</div>
        <div className="font-semibold text-sm mt-0.5">{from.name}</div>
      </div>

      <Section title="Quick destinations">
        <div className="grid grid-cols-2 gap-2">
          {["library", "mess", "sports", "auditorium"].map((id) => {
            const b = filtered.find((x) => x.id === id) ?? null;
            const bg = b ?? null;
            const target = bg ?? null;
            const bb = target ?? buildings.find((x) => x.id === id)!;
            return (
              <button
                key={id}
                onClick={() => setTo(id)}
                className="text-left p-2 rounded-xl bg-card border border-border hover:border-primary/30 transition"
              >
                <div className="w-7 h-7 rounded-md mb-1.5" style={{ background: bb.color }} />
                <div className="text-xs font-semibold">{bb.name}</div>
                <div className="text-[10px] text-muted-foreground capitalize">{bb.category}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="All buildings">
        <div className="flex flex-col gap-1">
          {filtered.map((b) => (
            <button
              key={b.id}
              onClick={() => openBuilding(b)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary text-left"
            >
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold text-white" style={{ background: b.color }}>
                {b.short}
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium">{b.name}</div>
                <div className="text-[10px] text-muted-foreground capitalize">{b.category}</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </Section>

      <Section title="Recent">
        <div className="flex flex-wrap gap-1.5">
          {recents.map((id) => {
            const b = buildings.find((x) => x.id === id)!;
            return (
              <button
                key={id}
                onClick={() => setTo(id)}
                className="text-[11px] px-2 py-1 rounded-md bg-secondary hover:bg-accent hover:text-accent-foreground"
              >
                {b.name}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Live on campus">
        <div className="flex flex-col gap-1.5">
          {[
            { t: "Tech Talk: AI in Healthcare", w: "Auditorium · 4:00 PM" },
            { t: "Robotics Demo", w: "Havells · 5:30 PM" },
            { t: "Open Mic Night", w: "Mess Lawn · 8 PM" },
          ].map((e) => (
            <div key={e.t} className="p-2 rounded-lg bg-card border border-border">
              <div className="text-xs font-medium">{e.t}</div>
              <div className="text-[10px] text-muted-foreground">{e.w}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Parking availability">
        <div className="space-y-1.5">
          {[
            { name: "Main Parking", free: 42, total: 80 },
            { name: "Visitor Bay", free: 7, total: 20 },
          ].map((p) => (
            <div key={p.name} className="p-2 rounded-lg bg-card border border-border">
              <div className="flex justify-between text-xs"><span className="font-medium">{p.name}</span><span className="text-muted-foreground">{p.free}/{p.total}</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(p.free / p.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Emergency">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 rounded-lg bg-card border border-border">
            <div className="font-semibold">Security</div>
            <div className="text-muted-foreground">+91 98 1100 0000</div>
          </div>
          <div className="p-2 rounded-lg bg-card border border-border">
            <div className="font-semibold">Medical</div>
            <div className="text-muted-foreground">+91 98 1100 1111</div>
          </div>
        </div>
      </Section>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold px-1 mb-1.5">
        {title}
      </div>
      {children}
    </div>
  );
}

function BuildingModal({ building, onClose, onNavigate }: { building: Building | null; onClose: () => void; onNavigate: (id: string) => void }) {
  return (
    <AnimatePresence>
      {building && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${building.color}, color-mix(in oklab, ${building.color} 60%, white))` }}>
              <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-white/80 text-[11px] uppercase tracking-wider">{building.category}</div>
                  <div className="text-white text-xl font-semibold">{building.name}</div>
                </div>
                <div className="text-white/90 text-xs">{building.floors} floors</div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-muted-foreground">{building.description}</p>

              {building.departments && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Departments</div>
                  <div className="flex flex-wrap gap-1.5">
                    {building.departments.map((d) => (
                      <span key={d} className="text-[11px] px-2 py-1 rounded-md bg-secondary">{d}</span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Facilities</div>
                <div className="grid grid-cols-2 gap-2">
                  {building.facilities.map((f) => (
                    <div key={f} className="text-xs flex items-center gap-2 p-2 rounded-lg bg-secondary">
                      <BuildingIcon className="w-3.5 h-3.5 text-primary" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate(building.id)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:brightness-110 transition"
              >
                <Navigation2 className="w-4 h-4" /> Navigate here
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
