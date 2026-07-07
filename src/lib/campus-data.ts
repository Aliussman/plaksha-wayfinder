// Plaksha campus data — layout & distances derived from the handwritten
// campus map. Coordinates are normalized 0-100 to roughly match the
// hand-drawn layout, and edge weights come from the meter labels on the
// hand-drawn map (not euclidean distance) so routing distances match reality.

import bhartiImg from "@/assets/bharti.jpeg";
import havellsImg from "@/assets/havells.jpeg";
import libraryImg from "@/assets/library.jpeg";
import diningImg from "@/assets/dining.jpeg";
import auditoriumImg from "@/assets/auditorium.jpeg";
import hostelImg from "@/assets/hostel.jpeg";
import sportsImg from "@/assets/sports.jpeg";
import gateImg from "@/assets/gate.jpeg";

export type Category =
  | "academic"
  | "residence"
  | "dining"
  | "sports"
  | "service"
  | "entry";

export type Building = {
  id: string;
  name: string;
  short: string;
  category: Category;
  x: number;
  y: number;
  color: string;
  description: string;
  facilities: string[];
  floors: number;
  departments?: string[];
  image: string;
};

// -------------------- Buildings (source & destination nodes) --------------------
// Positions mirror the handwritten map (roughly). x/y are 0-100.
export const buildings: Building[] = [
  {
    id: "gate",
    name: "Gate 01 · Main Entry",
    short: "G1",
    category: "entry",
    x: 90, y: 40,
    color: "#0ea5e9",
    description: "Primary campus entrance with security check, visitor desk and drop-off lane.",
    facilities: ["Security Cabin", "Visitor Desk", "Drop-off Lane", "EV Charging"],
    floors: 1,
    image: gateImg,
  },
  {
    id: "gate2",
    name: "Gate 02 · Service Entry",
    short: "G2",
    category: "entry",
    x: 84, y: 8,
    color: "#0ea5e9",
    description: "Secondary entrance used for service vehicles and the northern residence cluster.",
    facilities: ["Security Cabin", "Service Lane"],
    floors: 1,
    image: gateImg,
  },
  {
    id: "parking",
    name: "Parking Area",
    short: "P",
    category: "service",
    x: 96, y: 14,
    color: "#94a3b8",
    description: "Visitor and staff parking, 100m north of Gate 02.",
    facilities: ["Car Park", "Two-wheeler Bay", "EV Chargers"],
    floors: 1,
    image: gateImg,
  },
  {
    id: "hostel1",
    name: "H1 · Girls Hostel",
    short: "H1",
    category: "residence",
    x: 30, y: 12,
    color: "#3d8b56",
    description: "Girls residence with common lounges, laundry and rooftop deck.",
    facilities: ["Single Rooms", "Common Room", "Laundry", "Study Pods"],
    floors: 5,
    image: hostelImg,
  },
  {
    id: "hostel2",
    name: "H2 · Boys Hostel",
    short: "H2",
    category: "residence",
    x: 55, y: 16,
    color: "#3d8b56",
    description: "Boys residence with study pods, gaming lounge and dining shortcut.",
    facilities: ["Single Rooms", "Common Room", "Laundry", "Gaming Lounge"],
    floors: 5,
    image: hostelImg,
  },
  {
    id: "dining",
    name: "Dining Hall",
    short: "DH",
    category: "dining",
    x: 34, y: 22,
    color: "#d4a017",
    description: "All-day dining hall with live counters and outdoor seating.",
    facilities: ["Main Hall", "Live Counter", "Beverage Bar", "Outdoor Seating"],
    floors: 2,
    image: diningImg,
  },
  {
    id: "football",
    name: "Football Ground",
    short: "FG",
    category: "sports",
    x: 8, y: 24,
    color: "#e07b39",
    description: "Full-size football turf bordered by a jogging track.",
    facilities: ["Football Turf", "Jogging Track", "Floodlights"],
    floors: 1,
    image: sportsImg,
  },
  {
    id: "volleyball",
    name: "Volleyball Court",
    short: "VB",
    category: "sports",
    x: 8, y: 40,
    color: "#e07b39",
    description: "Sand volleyball court next to the western path.",
    facilities: ["Sand Court", "Floodlights"],
    floors: 1,
    image: sportsImg,
  },
  {
    id: "pickup",
    name: "Pickup Area",
    short: "PU",
    category: "service",
    x: 30, y: 33,
    color: "#94a3b8",
    description: "Student pickup / drop point next to the MPH sports complex.",
    facilities: ["Waiting Bay", "Signage"],
    floors: 1,
    image: gateImg,
  },
  {
    id: "mph",
    name: "MPH · Multi-Purpose Sports",
    short: "MPH",
    category: "sports",
    x: 32, y: 44,
    color: "#e07b39",
    description: "Multi-purpose hall for indoor sports and fitness classes.",
    facilities: ["Indoor Courts", "Gym", "Locker Rooms"],
    floors: 1,
    image: sportsImg,
  },
  {
    id: "csai",
    name: "CS & AI Building",
    short: "CSAI",
    category: "academic",
    x: 45, y: 36,
    color: "#1f5132",
    description: "Dedicated wing for computer science and AI labs.",
    facilities: ["AI Lab", "GPU Cluster", "Lecture Pods", "Project Studios"],
    floors: 4,
    departments: ["AI / ML", "Computer Science", "Data Science"],
    image: bhartiImg,
  },
  {
    id: "junctionA",
    name: "Junction A",
    short: "JA",
    category: "service",
    x: 54, y: 40,
    color: "#f5d76e",
    description: "Central path junction connecting academic blocks and hostels.",
    facilities: ["Signage", "Bench", "QR Checkpoint"],
    floors: 1,
    image: gateImg,
  },
  {
    id: "havells",
    name: "Havells Research Building",
    short: "HRB",
    category: "academic",
    x: 72, y: 42,
    color: "#1f5132",
    description: "Flagship research tower with labs, faculty studios and the innovation hub.",
    facilities: ["Research Labs", "Faculty Offices", "Innovation Hub", "Seminar Rooms"],
    floors: 6,
    departments: ["Robotics", "AI / ML", "Materials", "Climate Tech"],
    image: havellsImg,
  },
  {
    id: "bharti",
    name: "Bharti Academic Block",
    short: "BAB",
    category: "academic",
    x: 72, y: 56,
    color: "#1f5132",
    description: "Primary academic tower with classrooms, makerspace and design studios.",
    facilities: ["Lecture Halls", "Makerspace", "CTLC Studio", "Physics Lab"],
    floors: 7,
    departments: ["Computer Science", "Physics", "Mathematics", "Design"],
    image: bhartiImg,
  },
  {
    id: "library",
    name: "Library",
    short: "LIB",
    category: "academic",
    x: 84, y: 72,
    color: "#2d7a4a",
    description: "24/7 library with reading halls, group study pods and a digital archive.",
    facilities: ["Reading Hall", "Group Rooms", "Digital Archive", "Cafe Corner"],
    floors: 3,
    image: libraryImg,
  },
  {
    id: "cycle_track",
    name: "Cycle Track",
    short: "CT",
    category: "sports",
    x: 92, y: 66,
    color: "#e07b39",
    description: "Outdoor cycling loop east of the library.",
    facilities: ["Cycle Loop", "Rest Bench"],
    floors: 1,
    image: sportsImg,
  },
  {
    id: "junctionB",
    name: "Junction B",
    short: "JB",
    category: "service",
    x: 46, y: 62,
    color: "#f5d76e",
    description: "Southern junction linking HYFC, auditorium and academic zones.",
    facilities: ["Signage", "Bench", "QR Checkpoint"],
    floors: 1,
    image: gateImg,
  },
  {
    id: "hyfc",
    name: "HYFC · Food Court",
    short: "HYFC",
    category: "dining",
    x: 54, y: 74,
    color: "#d4a017",
    description: "Open-air food court and student hangout between the hostels and auditorium.",
    facilities: ["Food Stalls", "Open Seating", "Juice Bar", "ATM"],
    floors: 1,
    image: diningImg,
  },
  {
    id: "auditorium",
    name: "Auditorium",
    short: "AUD",
    category: "academic",
    x: 16, y: 76,
    color: "#7c4dff",
    description: "500-seat auditorium for talks, performances and conferences.",
    facilities: ["Main Stage", "Green Room", "AV Booth", "Foyer"],
    floors: 1,
    image: auditoriumImg,
  },
];

// -------------------- Path / road nodes (routing-only) --------------------
// These sit on visible roads and turns of the handwritten map.
export type Waypoint = { id: string; x: number; y: number };
export const waypoints: Waypoint[] = [
  { id: "p_gate_road",    x: 82, y: 40 }, // road between Gate-01 & Havells
  { id: "p_havells_n",    x: 72, y: 30 }, // north of Havells (toward H2)
  { id: "p_junctionA_n",  x: 54, y: 30 }, // north of Junction A
  { id: "p_dining_e",     x: 44, y: 24 }, // east of Dining Hall
  { id: "p_hostel_road",  x: 44, y: 14 }, // road between H1 & H2
  { id: "p_bharti_e",     x: 82, y: 56 }, // east of Bharti (toward Library)
  { id: "p_library_n",    x: 84, y: 64 }, // north of Library
  { id: "p_hyfc_w",       x: 40, y: 74 }, // west of HYFC toward Auditorium
  { id: "p_field_s",      x: 18, y: 44 }, // south of Football/Volleyball
  { id: "p_pickup_s",     x: 24, y: 40 }, // south of Pickup/MPH cluster
];

type NodeXY = { id: string; x: number; y: number };
const nodeMap: Record<string, NodeXY> = {};
for (const b of buildings) nodeMap[b.id] = { id: b.id, x: b.x, y: b.y };
for (const w of waypoints) nodeMap[w.id] = w;

// -------------------- Edges (from handwritten map, weights in meters) --------------------
export type Edge = { a: string; b: string; w: number };
export const edges: Edge[] = [
  // Entry & main road
  { a: "gate2",         b: "parking",       w: 100 },
  { a: "gate2",         b: "p_hostel_road", w: 40  },
  { a: "p_hostel_road", b: "hostel1",       w: 25  },
  { a: "p_hostel_road", b: "hostel2",       w: 12  },
  { a: "hostel2",       b: "p_dining_e",    w: 20  },
  { a: "hostel1",       b: "dining",        w: 20  },
  { a: "dining",        b: "p_dining_e",    w: 15  },
  { a: "p_dining_e",    b: "p_junctionA_n", w: 25  },
  { a: "p_junctionA_n", b: "junctionA",     w: 20  },
  { a: "hostel2",       b: "p_junctionA_n", w: 30  },

  // Sports / west cluster
  { a: "dining",        b: "football",      w: 20  },
  { a: "football",      b: "p_field_s",     w: 22  },
  { a: "volleyball",    b: "p_field_s",     w: 12  },
  { a: "p_field_s",     b: "p_pickup_s",    w: 15  },
  { a: "p_pickup_s",    b: "pickup",        w: 12  },
  { a: "pickup",        b: "dining",        w: 10  },
  { a: "pickup",        b: "mph",           w: 5   },
  { a: "mph",           b: "p_pickup_s",    w: 12  },
  { a: "mph",           b: "csai",          w: 20  },
  { a: "csai",          b: "junctionA",     w: 20  },

  // Junction A → Havells → Gate 01
  { a: "junctionA",     b: "havells",       w: 50  },
  { a: "havells",       b: "p_havells_n",   w: 15  },
  { a: "p_havells_n",   b: "p_junctionA_n", w: 20  },
  { a: "havells",       b: "p_gate_road",   w: 25  },
  { a: "p_gate_road",   b: "gate",          w: 25  }, // Gate 01 ↔ Havells = 50m total
  { a: "gate",          b: "cycle_track",   w: 35  },

  // Havells → Bharti → Library
  { a: "havells",       b: "bharti",        w: 10  },
  { a: "bharti",        b: "p_bharti_e",    w: 10  },
  { a: "p_bharti_e",    b: "p_library_n",   w: 15  },
  { a: "p_library_n",   b: "library",       w: 12  },
  { a: "bharti",        b: "library",       w: 90  }, // long southern loop
  { a: "library",       b: "cycle_track",   w: 35  },

  // Junction B & southern zone
  { a: "bharti",        b: "junctionB",     w: 40  },
  { a: "junctionA",     b: "junctionB",     w: 30  },
  { a: "junctionB",     b: "hyfc",          w: 40  },
  { a: "hyfc",          b: "auditorium",    w: 50  },
  { a: "junctionB",     b: "auditorium",    w: 60  },
  { a: "hyfc",          b: "p_hyfc_w",      w: 12  },
  { a: "p_hyfc_w",      b: "auditorium",    w: 30  },
  { a: "junctionB",     b: "p_hyfc_w",      w: 20  },
];

// Adjacency list with meter weights
const adj: Record<string, { to: string; w: number }[]> = {};
for (const { a, b, w } of edges) {
  (adj[a] ??= []).push({ to: b, w });
  (adj[b] ??= []).push({ to: a, w });
}

// -------------------- Pathfinding --------------------
export type Algorithm = "dijkstra" | "astar";

function dijkstra(fromId: string, toId: string): string[] {
  if (!nodeMap[fromId] || !nodeMap[toId]) return [];
  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const visited = new Set<string>();
  for (const id of Object.keys(nodeMap)) { dist[id] = Infinity; prev[id] = null; }
  dist[fromId] = 0;
  const queue = new Set(Object.keys(nodeMap));
  while (queue.size) {
    let u: string | null = null;
    let best = Infinity;
    for (const id of queue) if (dist[id] < best) { best = dist[id]; u = id; }
    if (!u || u === toId) break;
    queue.delete(u); visited.add(u);
    for (const { to, w } of adj[u] ?? []) {
      if (visited.has(to)) continue;
      const alt = dist[u] + w;
      if (alt < dist[to]) { dist[to] = alt; prev[to] = u; }
    }
  }
  const path: string[] = [];
  let cur: string | null = toId;
  while (cur) { path.unshift(cur); cur = prev[cur]; }
  return path[0] === fromId ? path : [];
}

function astar(fromId: string, toId: string): string[] {
  if (!nodeMap[fromId] || !nodeMap[toId]) return [];
  const goal = nodeMap[toId];
  // Heuristic in meters: euclidean on normalized coords × campus scale factor
  const SCALE = 7;
  const h = (id: string) =>
    Math.hypot(nodeMap[id].x - goal.x, nodeMap[id].y - goal.y) * SCALE;
  const g: Record<string, number> = {};
  const f: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  for (const id of Object.keys(nodeMap)) { g[id] = Infinity; f[id] = Infinity; prev[id] = null; }
  g[fromId] = 0; f[fromId] = h(fromId);
  const open = new Set([fromId]);
  const closed = new Set<string>();
  while (open.size) {
    let u: string | null = null;
    let best = Infinity;
    for (const id of open) if (f[id] < best) { best = f[id]; u = id; }
    if (!u) break;
    if (u === toId) break;
    open.delete(u); closed.add(u);
    for (const { to, w } of adj[u] ?? []) {
      if (closed.has(to)) continue;
      const tentative = g[u] + w;
      if (tentative < g[to]) {
        prev[to] = u; g[to] = tentative; f[to] = tentative + h(to);
        open.add(to);
      }
    }
  }
  const path: string[] = [];
  let cur: string | null = toId;
  while (cur) { path.unshift(cur); cur = prev[cur]; }
  return path[0] === fromId ? path : [];
}

export function findRouteIds(fromId: string, toId: string, algo: Algorithm = "dijkstra"): string[] {
  return algo === "astar" ? astar(fromId, toId) : dijkstra(fromId, toId);
}

export function findRoute(fromId: string, toId: string, algo: Algorithm = "dijkstra"): { x: number; y: number }[] {
  return findRouteIds(fromId, toId, algo).map((id) => ({ x: nodeMap[id].x, y: nodeMap[id].y }));
}

// Meter distance for a routed path (sums real handwritten weights)
export function routeMeters(ids: string[]): number {
  let total = 0;
  for (let i = 1; i < ids.length; i++) {
    const a = ids[i - 1], b = ids[i];
    const e = (adj[a] ?? []).find((n) => n.to === b);
    if (e) total += e.w;
  }
  return Math.round(total);
}

// Back-compat: accepts either an id list or point list
export function routeDistance(points: { x: number; y: number }[] | string[]): number {
  if (!points.length) return 0;
  if (typeof points[0] === "string") return routeMeters(points as string[]);
  let d = 0;
  const pts = points as { x: number; y: number }[];
  for (let i = 1; i < pts.length; i++) {
    d += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  return Math.round(d * 7);
}

// -------------------- QR checkpoints --------------------
export const qrCheckpoints = [
  "gate", "gate2", "junctionA", "junctionB", "havells", "bharti", "library", "dining", "hyfc",
];

export function nearestBuildingId(x: number, y: number): string {
  let best = buildings[0].id;
  let bestD = Infinity;
  for (const b of buildings) {
    const d = Math.hypot(b.x - x, b.y - y);
    if (d < bestD) { bestD = d; best = b.id; }
  }
  return best;
}

// -------------------- Turn-by-turn --------------------
export type Step = {
  kind: "start" | "straight" | "left" | "right" | "slight-left" | "slight-right" | "arrive";
  text: string;
  meters: number;
  x: number;
  y: number;
};

function nearestBuildingName(x: number, y: number): string | null {
  let best: Building | null = null;
  let bestD = Infinity;
  for (const b of buildings) {
    const d = Math.hypot(b.x - x, b.y - y);
    if (d < bestD) { bestD = d; best = b; }
  }
  return best && bestD < 12 ? best.name.replace(/\s·.*$/, "") : null;
}

export function buildSteps(fromId: string, toId: string, algo: Algorithm = "dijkstra"): Step[] {
  const ids = findRouteIds(fromId, toId, algo);
  if (ids.length < 2) return [];
  const pts = ids.map((id) => nodeMap[id]);
  const fromBldg = buildings.find((b) => b.id === fromId);
  const toBldg = buildings.find((b) => b.id === toId);
  const steps: Step[] = [{
    kind: "start",
    text: `Head out from ${fromBldg?.name ?? "your location"}`,
    meters: 0,
    x: pts[0].x, y: pts[0].y,
  }];
  let segMeters = 0;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const edge = (adj[ids[i - 1]] ?? []).find((n) => n.to === ids[i]);
    segMeters += edge ? edge.w : Math.hypot(cur.x - prev.x, cur.y - prev.y) * 7;
    if (i === pts.length - 1) {
      steps.push({
        kind: "arrive",
        text: `Arrive at ${toBldg?.name ?? "destination"}`,
        meters: Math.round(segMeters),
        x: cur.x, y: cur.y,
      });
      break;
    }
    const next = pts[i + 1];
    const a1 = Math.atan2(cur.y - prev.y, cur.x - prev.x);
    const a2 = Math.atan2(next.y - cur.y, next.x - cur.x);
    let diff = ((a2 - a1) * 180) / Math.PI;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    let kind: Step["kind"] = "straight";
    let verb = "Continue straight";
    if (diff > 45) { kind = "right"; verb = "Turn right"; }
    else if (diff > 18) { kind = "slight-right"; verb = "Bear right"; }
    else if (diff < -45) { kind = "left"; verb = "Turn left"; }
    else if (diff < -18) { kind = "slight-left"; verb = "Bear left"; }
    if (kind === "straight") continue;
    const landmark = nearestBuildingName(cur.x, cur.y);
    steps.push({
      kind,
      text: landmark ? `${verb} near ${landmark}` : verb,
      meters: Math.round(segMeters),
      x: cur.x, y: cur.y,
    });
    segMeters = 0;
  }
  return steps;
}

export function estimateWalkTime(from: Building, to: Building): number {
  const ids = findRouteIds(from.id, to.id);
  const meters = ids.length ? routeMeters(ids) : Math.hypot(from.x - to.x, from.y - to.y) * 7;
  return Math.max(1, Math.round(meters / 75)); // walking ~75 m/min
}

export const routeColors = ["#1d7afc", "#d4a017", "#22c55e", "#7c4dff", "#e07b39"];

// Smooth Catmull–Rom → cubic Bezier for natural-looking walking routes
export function pathToSvgD(points: { x: number; y: number }[]): string {
  if (!points.length) return "";
  if (points.length < 3) {
    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    // Reduced tension so path hugs the road segments (less curviness)
    const c1x = p1.x + (p2.x - p0.x) / 8;
    const c1y = p1.y + (p2.y - p0.y) / 8;
    const c2x = p2.x - (p3.x - p1.x) / 8;
    const c2y = p2.y - (p3.y - p1.y) / 8;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

// Straight polyline (used to render the raw road network)
export function polyToSvgD(points: { x: number; y: number }[]): string {
  if (!points.length) return "";
  return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
}

// Expose node position for renderers
export function nodePos(id: string): { x: number; y: number } | null {
  const n = nodeMap[id];
  return n ? { x: n.x, y: n.y } : null;
}
