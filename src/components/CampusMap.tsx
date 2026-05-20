import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation2, X, ZoomIn, ZoomOut, Locate, Search, Clock, Footprints,
  Accessibility, MapPin, Compass, Crosshair, Layers, Route as RouteIcon,
  ChevronRight,
} from "lucide-react";
import {
  buildings, waypoints, type Building, findRoute, pathToSvgD, routeDistance,
} from "@/lib/campus-data";
import satelliteImg from "@/assets/campus-satellite.png";
import { cn } from "@/lib/utils";

type Props = { initialFromId?: string };

export function CampusMap({ initialFromId = "gate" }: Props) {
  const [fromId, setFromId] = useState(initialFromId);
  const [toId, setToId] = useState<string | null>(null);
  const [activeBuilding, setActiveBuilding] = useState<Building | null>(null);
  const [search, setSearch] = useState("");
  const [routeStyle, setRouteStyle] = useState<"fastest" | "accessible" | "scenic">("fastest");
  const [showLabels, setShowLabels] = useState(true);
  const [tracking, setTracking] = useState(true);
  const [userPos, setUserPos] = useState<{ x: number; y: number } | null>(null);

  // pan / zoom
  const [zoom, setZoom] = useState(1.05);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const from = buildings.find((b) => b.id === fromId)!;
  const to = toId ? buildings.find((b) => b.id === toId) ?? null : null;

  const route = useMemo(() => (to ? findRoute(from.id, to.id) : []), [from, to]);
  const routeD = useMemo(() => pathToSvgD(route), [route]);
  const meters = useMemo(() => (route.length ? routeDistance(route) : 0), [route]);
  const walkTime = Math.max(1, Math.round(meters / 75));

  const routeColor =
    routeStyle === "accessible" ? "#22c55e" :
    routeStyle === "scenic" ? "#d4a017" : "#1d7afc";

  // Simulated GPS movement along route
  useEffect(() => {
    if (!to || route.length < 2) {
      setUserPos({ x: from.x, y: from.y });
      return;
    }
    let t = 0;
    const total = route.length - 1;
    const id = setInterval(() => {
      t += 0.012;
      if (t >= total) t = 0;
      const i = Math.floor(t);
      const f = t - i;
      const a = route[i];
      const b = route[Math.min(i + 1, total)];
      setUserPos({ x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f });
    }, 60);
    return () => clearInterval(id);
  }, [to, route, from]);

  // Filter buildings
  const filtered = useMemo(
    () => buildings.filter((b) => b.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  // Wheel zoom
  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    setZoom((z) => Math.min(3, Math.max(0.8, z - e.deltaY * 0.002)));
  }

  // Drag pan
  function onPointerDown(e: React.PointerEvent) {
    dragRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    setPan({ x: e.clientX - dragRef.current.x, y: e.clientY - dragRef.current.y });
  }
  function onPointerUp() { dragRef.current = null; }

  function recenter() { setPan({ x: 0, y: 0 }); setZoom(1.05); }

  return (
    <div className="relative w-full h-full flex bg-[#0b1410]">
      <Sidebar
        search={search} setSearch={setSearch} filtered={filtered}
        from={from} to={to} setTo={setToId} setFrom={setFromId}
        openBuilding={setActiveBuilding}
        routeStyle={routeStyle} setRouteStyle={setRouteStyle}
        meters={meters} walkTime={walkTime}
      />

      {/* Map viewport */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Pannable / zoomable surface */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: dragRef.current ? "none" : "transform 0.35s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          {/* Satellite base */}
          <div className="absolute inset-0">
            <img
              src={satelliteImg}
              alt="Plaksha University campus satellite map"
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* darken slightly for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f15]/20 via-transparent to-[#0a1f15]/30" />
          </div>

          {/* SVG overlay */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.9" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="pinDot">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="#1d7afc" />
              </radialGradient>
            </defs>

            {/* Walking paths (faint) */}
            <g opacity="0.55" stroke="#fff" strokeWidth="0.35" fill="none" strokeLinecap="round" strokeDasharray="0.6 0.6">
              {/* draw all edges as thin guides — derived implicitly via the waypoint network */}
              {waypoints.map((w) => (
                <circle key={w.id} cx={w.x} cy={w.y} r="0.25" fill="#ffffff80" />
              ))}
            </g>

            {/* Active route */}
            {routeD && (
              <>
                <path d={routeD} stroke={routeColor} strokeWidth="3" fill="none" opacity="0.35" filter="url(#routeGlow)" strokeLinecap="round" strokeLinejoin="round" />
                <path d={routeD} stroke={routeColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d={routeD} stroke="#ffffff" strokeWidth="0.6" fill="none" className="route-animated" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}

            {/* Building markers */}
            {buildings.map((b) => {
              const isFrom = b.id === from.id;
              const isTo = to?.id === b.id;
              return (
                <g
                  key={b.id}
                  className="cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setActiveBuilding(b); }}
                >
                  {(isFrom || isTo) && (
                    <circle cx={b.x} cy={b.y} r="3" fill={isTo ? routeColor : "#22c55e"} opacity="0.25">
                      <animate attributeName="r" values="2;4.5;2" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.45;0;0.45" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Pin */}
                  <g transform={`translate(${b.x}, ${b.y})`}>
                    <path
                      d="M 0 -3 C 1.7 -3 3 -1.7 3 0 C 3 1.9 0 4 0 4 C 0 4 -3 1.9 -3 0 C -3 -1.7 -1.7 -3 0 -3 Z"
                      fill={isTo ? routeColor : isFrom ? "#22c55e" : b.color}
                      stroke="#fff"
                      strokeWidth="0.35"
                    />
                    <circle cx="0" cy="0" r="1" fill="#fff" />
                  </g>
                  {showLabels && (
                    <g transform={`translate(${b.x}, ${b.y + 6})`}>
                      <rect x="-9" y="-1.6" width="18" height="3.2" rx="1.6" fill="#0a1f15" opacity="0.78" />
                      <text textAnchor="middle" y="0.7" fontSize="2" fontWeight="600" fill="#fff">
                        {b.short}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* User position (live blue dot) */}
            {tracking && userPos && (
              <g transform={`translate(${userPos.x}, ${userPos.y})`}>
                <circle r="3" fill="#1d7afc" opacity="0.18">
                  <animate attributeName="r" values="2;5;2" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.35;0;0.35" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <circle r="1.4" fill="url(#pinDot)" stroke="#fff" strokeWidth="0.4" />
              </g>
            )}
          </svg>
        </div>

        {/* ---- Top search / route bar ---- */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[min(94%,560px)] pointer-events-auto">
          <div className="rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/40 border border-white/40 overflow-hidden">
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-green-500/20" />
              <select
                value={from.id}
                onChange={(e) => setFromId(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium outline-none text-slate-900"
              >
                {buildings.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
              </select>
            </div>
            <div className="h-px bg-slate-200 mx-3" />
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: routeColor }} />
              <select
                value={toId ?? ""}
                onChange={(e) => setToId(e.target.value || null)}
                className="flex-1 bg-transparent text-sm font-medium outline-none text-slate-900"
              >
                <option value="">Where to?</option>
                {buildings.filter((b) => b.id !== from.id).map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              {to && (
                <div className="flex items-center gap-1 text-xs font-semibold text-white bg-[#1d7afc] px-2 py-1 rounded-md">
                  <Clock className="w-3 h-3" /> {walkTime}m
                </div>
              )}
            </div>
          </div>
          {to && (
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex gap-2 overflow-x-auto no-scrollbar"
            >
              {(["fastest","accessible","scenic"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setRouteStyle(s)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border backdrop-blur",
                    routeStyle === s
                      ? "bg-white text-slate-900 border-white"
                      : "bg-black/40 text-white border-white/20 hover:bg-black/55"
                  )}
                >
                  {s === "fastest" && <RouteIcon className="w-3 h-3 inline mr-1" />}
                  {s === "accessible" && <Accessibility className="w-3 h-3 inline mr-1" />}
                  {s === "scenic" && <Footprints className="w-3 h-3 inline mr-1" />}
                  {s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* ---- Right map controls ---- */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <MapBtn onClick={() => setZoom((z) => Math.min(3, z + 0.25))}><ZoomIn className="w-4 h-4" /></MapBtn>
          <MapBtn onClick={() => setZoom((z) => Math.max(0.8, z - 0.25))}><ZoomOut className="w-4 h-4" /></MapBtn>
          <MapBtn onClick={recenter} title="Recenter"><Locate className="w-4 h-4" /></MapBtn>
          <MapBtn onClick={() => setShowLabels((v) => !v)} active={showLabels} title="Labels"><Layers className="w-4 h-4" /></MapBtn>
          <MapBtn onClick={() => setTracking((v) => !v)} active={tracking} title="Live tracking"><Crosshair className="w-4 h-4" /></MapBtn>
        </div>

        {/* Compass */}
        <div className="absolute left-4 top-4 hidden md:flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-black/55 backdrop-blur border border-white/15 flex items-center justify-center text-white shadow-xl">
            <Compass className="w-5 h-5" />
          </div>
          <div className="text-[10px] uppercase tracking-widest text-white/80">N</div>
        </div>

        {/* Bottom-right minimap */}
        <div className="absolute bottom-4 right-4 hidden sm:block">
          <div className="w-44 rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-black/40">
            <div className="relative aspect-square">
              <img src={satelliteImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                {routeD && <path d={routeD} stroke={routeColor} strokeWidth="1.4" fill="none" />}
                <circle cx={from.x} cy={from.y} r="1.6" fill="#22c55e" stroke="#fff" strokeWidth="0.4" />
                {to && <circle cx={to.x} cy={to.y} r="1.6" fill={routeColor} stroke="#fff" strokeWidth="0.4" />}
                {userPos && <circle cx={userPos.x} cy={userPos.y} r="1.2" fill="#1d7afc" stroke="#fff" strokeWidth="0.4" />}
              </svg>
              <div className="absolute top-1 left-2 text-[9px] uppercase tracking-widest text-white/80">Minimap</div>
            </div>
          </div>
        </div>

        {/* Live ETA card */}
        <AnimatePresence>
          {to && (
            <motion.div
              initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[min(420px,calc(100%-2rem))]"
            >
              <div className="rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/40 border border-white/40 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                      {routeStyle} route
                    </div>
                    <div className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                      {walkTime} min <span className="text-base font-medium text-slate-500">· {meters} m</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Walking to {to.name}</div>
                  </div>
                  <button
                    onClick={() => setToId(null)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                    aria-label="End"
                  >
                    <X className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
                <button className="mt-3 w-full rounded-xl bg-[#1d7afc] hover:brightness-110 text-white py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
                  <Navigation2 className="w-4 h-4" /> Start navigation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <BuildingModal
          building={activeBuilding}
          onClose={() => setActiveBuilding(null)}
          onNavigateTo={(id) => { setToId(id); setActiveBuilding(null); }}
          onNavigateFrom={(id) => { setFromId(id); setActiveBuilding(null); }}
        />
      </div>
    </div>
  );
}

function MapBtn({
  children, onClick, title, active,
}: { children: React.ReactNode; onClick: () => void; title?: string; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "w-10 h-10 rounded-xl backdrop-blur border flex items-center justify-center shadow-lg transition",
        active
          ? "bg-[#1d7afc] text-white border-[#1d7afc]"
          : "bg-white/90 text-slate-800 border-white/40 hover:bg-white"
      )}
    >
      {children}
    </button>
  );
}

function Sidebar({
  search, setSearch, filtered, from, to, setTo, setFrom, openBuilding,
  routeStyle, meters, walkTime,
}: {
  search: string; setSearch: (v: string) => void; filtered: Building[];
  from: Building; to: Building | null;
  setTo: (id: string) => void; setFrom: (id: string) => void;
  openBuilding: (b: Building) => void;
  routeStyle: string; setRouteStyle: (v: any) => void;
  meters: number; walkTime: number;
}) {
  return (
    <aside className="hidden lg:flex flex-col w-[340px] bg-[#0d1c14] text-white/90 border-r border-white/10 overflow-y-auto no-scrollbar">
      <div className="p-4 sticky top-0 bg-[#0d1c14]/95 backdrop-blur z-10 border-b border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-[#1d7afc] flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Plaksha Navigator</div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">Smart Campus Routing</div>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search buildings, labs…"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:bg-white/10 placeholder-white/40"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#1d7afc] to-[#1f5132] p-4">
          <div className="text-[10px] uppercase tracking-widest opacity-80">You are at</div>
          <div className="font-semibold text-base mt-0.5">{from.name}</div>
          {to ? (
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="text-[10px] uppercase tracking-widest opacity-80">Heading to</div>
              <div className="font-medium text-sm">{to.name}</div>
              <div className="text-xs opacity-80 mt-1">{walkTime} min · {meters} m · {routeStyle}</div>
            </div>
          ) : (
            <div className="mt-2 text-xs opacity-80">Pick a destination to start a route.</div>
          )}
        </div>

        <Section title="Quick destinations">
          <div className="grid grid-cols-2 gap-2">
            {["library","dining","auditorium","football"].map((id) => {
              const b = buildings.find((x) => x.id === id)!;
              return (
                <button
                  key={id}
                  onClick={() => setTo(id)}
                  className="text-left rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition group"
                >
                  <div className="aspect-[5/3] overflow-hidden">
                    <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="px-2 py-1.5">
                    <div className="text-xs font-semibold truncate">{b.name}</div>
                    <div className="text-[10px] text-white/50 capitalize">{b.category}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="All locations">
          <div className="flex flex-col gap-1">
            {filtered.map((b) => (
              <button
                key={b.id}
                onClick={() => openBuilding(b)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 text-left"
              >
                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={b.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{b.name}</div>
                  <div className="text-[10px] text-white/50 capitalize">{b.category} · {b.floors}F</div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </button>
            ))}
          </div>
        </Section>

        <Section title="Live on campus">
          <div className="flex flex-col gap-1.5">
            {[
              { t: "Tech Talk: AI in Healthcare", w: "Auditorium · 4:00 PM" },
              { t: "Robotics Demo", w: "Havells · 5:30 PM" },
              { t: "Open Mic Night", w: "Dining Lawn · 8 PM" },
            ].map((e) => (
              <div key={e.t} className="p-2 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs font-medium">{e.t}</div>
                <div className="text-[10px] text-white/50">{e.w}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-2">{title}</div>
      {children}
    </div>
  );
}

function BuildingModal({
  building, onClose, onNavigateTo, onNavigateFrom,
}: {
  building: Building | null;
  onClose: () => void;
  onNavigateTo: (id: string) => void;
  onNavigateFrom: (id: string) => void;
}) {
  return (
    <AnimatePresence>
      {building && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-30 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-lg rounded-3xl overflow-hidden bg-white shadow-2xl"
          >
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img src={building.image} alt={building.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow"
              >
                <X className="w-4 h-4 text-slate-800" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="text-[10px] uppercase tracking-widest opacity-80">{building.category}</div>
                <div className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {building.name}
                </div>
              </div>
            </div>

            <div className="p-5 text-slate-800">
              <p className="text-sm text-slate-600 leading-relaxed">{building.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {building.facilities.map((f) => (
                  <div key={f} className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700">
                    {f}
                  </div>
                ))}
              </div>

              {building.departments && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {building.departments.map((d) => (
                    <span key={d} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1f5132]/10 text-[#1f5132] font-semibold">
                      {d}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigateFrom(building.id)}
                  className="rounded-xl bg-slate-100 hover:bg-slate-200 py-2.5 text-sm font-semibold text-slate-800 flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-4 h-4" /> Start from here
                </button>
                <button
                  onClick={() => onNavigateTo(building.id)}
                  className="rounded-xl bg-[#1d7afc] hover:brightness-110 text-white py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5"
                >
                  <Navigation2 className="w-4 h-4" /> Directions
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
