// Real Plaksha campus data — coordinates aligned with the satellite map
// (src/assets/campus-satellite.png). All x/y are normalized 0-100.

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

export const buildings: Building[] = [
  {
    id: "gate",
    name: "Gate 01 · Main Entry",
    short: "G1",
    category: "entry",
    x: 84,
    y: 30,
    color: "#0ea5e9",
    description:
      "Primary campus entrance with security check, visitor desk and drop-off lane.",
    facilities: ["Security Cabin", "Visitor Desk", "Drop-off Lane", "EV Charging"],
    floors: 1,
    image: gateImg,
  },
  {
    id: "havells",
    name: "Havells Research Building",
    short: "HRB",
    category: "academic",
    x: 60,
    y: 38,
    color: "#1f5132",
    description:
      "Flagship research tower housing advanced labs, faculty studios and the Plaksha innovation hub.",
    facilities: ["Research Labs", "Faculty Offices", "Innovation Hub", "Seminar Rooms", "Roof Terrace"],
    floors: 6,
    departments: ["Robotics", "AI / ML", "Materials", "Climate Tech"],
    image: havellsImg,
  },
  {
    id: "bharti",
    name: "Bharti Academic Building",
    short: "BAB",
    category: "academic",
    x: 49,
    y: 47,
    color: "#1f5132",
    description:
      "Primary academic tower with classrooms, makerspace, design studios and the CTLC.",
    facilities: ["Lecture Halls", "Makerspace", "CTLC Studio", "Physics Lab", "Cafe Lounge"],
    floors: 7,
    departments: ["Computer Science", "Physics", "Mathematics", "Design"],
    image: bhartiImg,
  },
  {
    id: "dining",
    name: "Dining Block",
    short: "DB",
    category: "dining",
    x: 55,
    y: 31,
    color: "#d4a017",
    description:
      "All-day dining hall with live counters, beverage bar and outdoor seating overlooking the lawn.",
    facilities: ["Main Hall", "Live Counter", "Beverage Bar", "Outdoor Seating"],
    floors: 2,
    image: diningImg,
  },
  {
    id: "library",
    name: "Asha Mukul Agrawal Library",
    short: "LIB",
    category: "academic",
    x: 70,
    y: 52,
    color: "#2d7a4a",
    description:
      "24/7 library with reading halls, group study pods, digital archive and a quiet roof deck.",
    facilities: ["Reading Hall", "Group Rooms", "Digital Archive", "Cafe Corner"],
    floors: 3,
    image: libraryImg,
  },
  {
    id: "auditorium",
    name: "Auditorium",
    short: "AUD",
    category: "academic",
    x: 45,
    y: 70,
    color: "#7c4dff",
    description:
      "500-seat auditorium for talks, performances, conferences and student showcases.",
    facilities: ["Main Stage", "Green Room", "AV Booth", "Foyer"],
    floors: 1,
    image: auditoriumImg,
  },
  {
    id: "hostel1",
    name: "Hostel 01",
    short: "H1",
    category: "residence",
    x: 36,
    y: 24,
    color: "#3d8b56",
    description:
      "Residential block with single rooms, study lounges and common social areas.",
    facilities: ["Single Rooms", "Common Room", "Laundry", "Study Pods", "Gaming Lounge"],
    floors: 9,
    image: hostelImg,
  },
  {
    id: "hostel2",
    name: "Hostel 02",
    short: "H2",
    category: "residence",
    x: 50,
    y: 16,
    color: "#3d8b56",
    description:
      "Residential block with secure entry, study pods and a rooftop deck.",
    facilities: ["Single Rooms", "Common Room", "Laundry", "Study Pods", "Yoga Room"],
    floors: 9,
    image: hostelImg,
  },
  {
    id: "hostel3",
    name: "Hostel 03",
    short: "H3",
    category: "residence",
    x: 63,
    y: 18,
    color: "#3d8b56",
    description:
      "Newest residential block with a podium-level lounge and direct path to the dining block.",
    facilities: ["Single Rooms", "Common Room", "Laundry", "Study Pods"],
    floors: 9,
    image: hostelImg,
  },
  {
    id: "football",
    name: "Football Ground",
    short: "FG",
    category: "sports",
    x: 22,
    y: 44,
    color: "#e07b39",
    description:
      "Full-size football turf bordered by a jogging track and floodlit for evening play.",
    facilities: ["Football Turf", "Jogging Track", "Floodlights", "Spectator Lawn"],
    floors: 1,
    image: sportsImg,
  },
  {
    id: "courts",
    name: "Sports Courts",
    short: "SC",
    category: "sports",
    x: 18, y: 72,
    color: "#e07b39",
    description: "Outdoor basketball and tennis courts with shaded benches and skate ramp.",
    facilities: ["Basketball Court", "Tennis Court", "Skate Ramp", "Benches"],
    floors: 1,
    image: sportsImg,
  },
  {
    id: "gate2",
    name: "Gate 02 · Service Entry",
    short: "G2",
    category: "entry",
    x: 12, y: 30,
    color: "#0ea5e9",
    description: "Secondary entrance used for service vehicles and the western residence cluster.",
    facilities: ["Security Cabin", "Service Lane"],
    floors: 1,
    image: gateImg,
  },
  {
    id: "csai",
    name: "CS & AI Building",
    short: "CSAI",
    category: "academic",
    x: 56, y: 60,
    color: "#1f5132",
    description: "Dedicated wing for computer science, artificial intelligence labs and project studios.",
    facilities: ["AI Lab", "GPU Cluster", "Lecture Pods", "Project Studios"],
    floors: 4,
    departments: ["AI / ML", "Computer Science", "Data Science"],
    image: bhartiImg,
  },
  {
    id: "hyfc",
    name: "HYFC · Hostel Food Court",
    short: "HYFC",
    category: "dining",
    x: 38, y: 80,
    color: "#d4a017",
    description: "Open-air food court and student hangout between the hostels and the auditorium.",
    facilities: ["Food Stalls", "Open Seating", "Juice Bar", "ATM"],
    floors: 1,
    image: diningImg,
  },
  {
    id: "mph",
    name: "MPH Sports Area",
    short: "MPH",
    category: "sports",
    x: 28, y: 56,
    color: "#e07b39",
    description: "Multi-purpose hall for indoor sports, fitness classes and inter-house tournaments.",
    facilities: ["Indoor Courts", "Gym", "Locker Rooms"],
    floors: 1,
    image: sportsImg,
  },
  {
    id: "volleyball",
    name: "Volleyball Court",
    short: "VB",
    category: "sports",
    x: 14, y: 58,
    color: "#e07b39",
    description: "Sand volleyball court next to the western residence path.",
    facilities: ["Sand Court", "Floodlights"],
    floors: 1,
    image: sportsImg,
  },
  {
    id: "junctionA",
    name: "Junction A",
    short: "JA",
    category: "service",
    x: 50, y: 40,
    color: "#94a3b8",
    description: "Central path junction connecting academic blocks, dining and hostels.",
    facilities: ["Signage", "Bench", "QR Checkpoint"],
    floors: 1,
    image: gateImg,
  },
  {
    id: "junctionB",
    name: "Junction B",
    short: "JB",
    category: "service",
    x: 42, y: 68,
    color: "#94a3b8",
    description: "Southern junction near the auditorium connecting HYFC, sports and academic zones.",
    facilities: ["Signage", "Bench", "QR Checkpoint"],
    floors: 1,
    image: gateImg,
  },
];

// Waypoints (routing-only nodes — sit on real roads/paths)
export type Waypoint = { id: string; x: number; y: number };
export const waypoints: Waypoint[] = [
  { id: "w_gate", x: 82, y: 33 },
  { id: "w_road", x: 70, y: 34 },
  { id: "w_dining", x: 58, y: 32 },
  { id: "w_havells", x: 60, y: 41 },
  { id: "w_library", x: 70, y: 48 },
  { id: "w_bharti_n", x: 50, y: 40 },
  { id: "w_bharti_s", x: 48, y: 55 },
  { id: "w_hostel_e", x: 60, y: 22 },
  { id: "w_hostel_w", x: 42, y: 22 },
  { id: "w_field_e", x: 35, y: 40 },
  { id: "w_field_s", x: 30, y: 58 },
  { id: "w_audi", x: 42, y: 68 },
  { id: "w_courts", x: 22, y: 70 },
];

// Edge list (graph): connects buildings + waypoints along real walking paths
const edges: [string, string][] = [
  ["gate", "w_gate"],
  ["w_gate", "w_road"],
  ["w_road", "w_dining"],
  ["w_road", "w_library"],
  ["w_dining", "dining"],
  ["w_dining", "w_havells"],
  ["w_havells", "havells"],
  ["w_havells", "w_bharti_n"],
  ["w_bharti_n", "bharti"],
  ["bharti", "w_bharti_s"],
  ["w_library", "library"],
  ["w_library", "w_bharti_s"],
  ["w_bharti_s", "w_audi"],
  ["w_audi", "auditorium"],
  ["w_audi", "w_courts"],
  ["w_courts", "courts"],
  ["w_bharti_n", "w_field_e"],
  ["w_field_e", "football"],
  ["w_field_e", "w_hostel_w"],
  ["w_field_e", "w_field_s"],
  ["w_field_s", "w_courts"],
  ["w_hostel_w", "hostel1"],
  ["w_hostel_w", "hostel2"],
  ["hostel2", "w_hostel_e"],
  ["w_hostel_e", "hostel3"],
  ["w_hostel_e", "w_dining"],
  // New buildings wired into the graph
  ["gate2", "w_hostel_w"],
  ["gate2", "volleyball"],
  ["volleyball", "w_field_s"],
  ["mph", "w_field_s"],
  ["mph", "w_field_e"],
  ["junctionA", "w_bharti_n"],
  ["junctionA", "w_havells"],
  ["junctionA", "bharti"],
  ["junctionB", "w_audi"],
  ["junctionB", "w_bharti_s"],
  ["junctionB", "hyfc"],
  ["hyfc", "auditorium"],
  ["hyfc", "w_courts"],
  ["csai", "w_bharti_s"],
  ["csai", "library"],
  ["csai", "junctionB"],
];

type Node = { id: string; x: number; y: number };
const nodeMap: Record<string, Node> = {};
for (const b of buildings) nodeMap[b.id] = { id: b.id, x: b.x, y: b.y };
for (const w of waypoints) nodeMap[w.id] = w;

const adj: Record<string, { to: string; w: number }[]> = {};
for (const [a, b] of edges) {
  const na = nodeMap[a];
  const nb = nodeMap[b];
  const d = Math.hypot(na.x - nb.x, na.y - nb.y);
  (adj[a] ??= []).push({ to: b, w: d });
  (adj[b] ??= []).push({ to: a, w: d });
}

// Pathfinding algorithm selector
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
    queue.delete(u);
    visited.add(u);
    for (const { to, w } of adj[u] ?? []) {
      if (visited.has(to)) continue;
      const alt = dist[u] + w;
      if (alt < dist[to]) { dist[to] = alt; prev[to] = u; }
    }
  }
  const path: string[] = [];
  let cur: string | null = toId;
  while (cur) { path.unshift(cur); cur = prev[cur]; }
  if (path[0] !== fromId) return [];
  return path;
}

// A* with Euclidean heuristic
function astar(fromId: string, toId: string): string[] {
  if (!nodeMap[fromId] || !nodeMap[toId]) return [];
  const goal = nodeMap[toId];
  const h = (id: string) => Math.hypot(nodeMap[id].x - goal.x, nodeMap[id].y - goal.y);
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
  if (path[0] !== fromId) return [];
  return path;
}

export function findRouteIds(fromId: string, toId: string, algo: Algorithm = "dijkstra"): string[] {
  return algo === "astar" ? astar(fromId, toId) : dijkstra(fromId, toId);
}

export function findRoute(fromId: string, toId: string, algo: Algorithm = "dijkstra"): { x: number; y: number }[] {
  return findRouteIds(fromId, toId, algo).map((id) => ({ x: nodeMap[id].x, y: nodeMap[id].y }));
}

// QR checkpoints — scanning one snaps the user to that node
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

// Turn-by-turn step generator (Google Maps-style)
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

export function buildSteps(fromId: string, toId: string): Step[] {
  const ids = findRouteIds(fromId, toId);
  if (ids.length < 2) return [];
  const pts = ids.map((id) => nodeMap[id]);
  const fromBldg = buildings.find((b) => b.id === fromId);
  const toBldg = buildings.find((b) => b.id === toId);
  const steps: Step[] = [{
    kind: "start",
    text: `Head out from ${fromBldg?.name ?? "your location"}`,
    meters: 0,
    x: pts[0].x,
    y: pts[0].y,
  }];
  let segMeters = 0;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    segMeters += Math.hypot(cur.x - prev.x, cur.y - prev.y) * 7;
    if (i === pts.length - 1) {
      steps.push({
        kind: "arrive",
        text: `Arrive at ${toBldg?.name ?? "destination"}`,
        meters: Math.round(segMeters),
        x: cur.x,
        y: cur.y,
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
      x: cur.x,
      y: cur.y,
    });
    segMeters = 0;
  }
  return steps;
}

export function routeDistance(points: { x: number; y: number }[]): number {
  let d = 0;
  for (let i = 1; i < points.length; i++) {
    d += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  // 1 unit ≈ 7 meters (campus diameter heuristic)
  return Math.round(d * 7);
}

export function estimateWalkTime(from: Building, to: Building): number {
  const route = findRoute(from.id, to.id);
  const meters = route.length ? routeDistance(route) : Math.hypot(from.x - to.x, from.y - to.y) * 7;
  // walking 75 m/min
  return Math.max(1, Math.round(meters / 75));
}

export const routeColors = ["#1d7afc", "#d4a017", "#22c55e", "#7c4dff", "#e07b39"];

export function pathToSvgD(points: { x: number; y: number }[]): string {
  if (!points.length) return "";
  // Smooth Catmull–Rom → cubic Bezier for natural-looking walking routes
  if (points.length < 3) {
    return points
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}
