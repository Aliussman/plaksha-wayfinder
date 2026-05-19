export type Building = {
  id: string;
  name: string;
  short: string;
  category: "academic" | "residence" | "dining" | "sports" | "service" | "parking";
  x: number; // %
  y: number; // %
  color: string;
  description: string;
  facilities: string[];
  floors: number;
  departments?: string[];
  image?: string;
};

export const buildings: Building[] = [
  {
    id: "bharti",
    name: "Bharti Block",
    short: "BB",
    category: "academic",
    x: 30,
    y: 42,
    color: "#1f5132",
    description:
      "The primary academic block housing classrooms, labs and the makerspace where most undergraduate teaching happens.",
    facilities: ["Academic Office", "Makerspace", "CTLC Studio", "Physics Lab", "Lecture Halls", "Cafe Lounge"],
    floors: 4,
    departments: ["Computer Science", "Physics", "Mathematics", "Design"],
  },
  {
    id: "havells",
    name: "Havells Building",
    short: "HB",
    category: "academic",
    x: 52,
    y: 36,
    color: "#2d7a4a",
    description:
      "Research-focused building with advanced labs, faculty offices and innovation studios.",
    facilities: ["Research Labs", "Faculty Offices", "Seminar Rooms", "Innovation Studio"],
    floors: 3,
    departments: ["Robotics", "AI / ML", "Materials"],
  },
  {
    id: "boys-hostel",
    name: "Boys Hostel",
    short: "BH",
    category: "residence",
    x: 18,
    y: 70,
    color: "#3d8b56",
    description: "Residence hall for male students with common rooms and study lounges.",
    facilities: ["Single Rooms", "Common Room", "Laundry", "Study Pods", "Gaming Lounge"],
    floors: 5,
  },
  {
    id: "girls-hostel",
    name: "Girls Hostel",
    short: "GH",
    category: "residence",
    x: 70,
    y: 72,
    color: "#3d8b56",
    description: "Residence hall for female students with secure access and lounges.",
    facilities: ["Single Rooms", "Common Room", "Laundry", "Study Pods", "Yoga Room"],
    floors: 5,
  },
  {
    id: "mess",
    name: "Mess",
    short: "MS",
    category: "dining",
    x: 44,
    y: 64,
    color: "#d4a017",
    description: "Central dining hall serving all-day meals with vegetarian and non-veg counters.",
    facilities: ["Main Hall", "Live Counter", "Beverage Bar", "Outdoor Seating"],
    floors: 2,
  },
  {
    id: "sports",
    name: "Sports Complex",
    short: "SC",
    category: "sports",
    x: 82,
    y: 50,
    color: "#e07b39",
    description: "Indoor + outdoor sports facilities including courts, gym and turf.",
    facilities: ["Gym", "Basketball Court", "Football Turf", "Table Tennis", "Yoga Studio"],
    floors: 2,
  },
  {
    id: "auditorium",
    name: "Auditorium",
    short: "AU",
    category: "academic",
    x: 60,
    y: 22,
    color: "#7c4dff",
    description: "500-seat auditorium for talks, performances and conferences.",
    facilities: ["Main Stage", "Green Room", "AV Booth", "Foyer"],
    floors: 1,
  },
  {
    id: "library",
    name: "Library",
    short: "LB",
    category: "academic",
    x: 38,
    y: 22,
    color: "#1f5132",
    description: "24/7 library with quiet zones, group study rooms and digital archives.",
    facilities: ["Reading Hall", "Group Rooms", "Digital Archive", "Cafe Corner"],
    floors: 3,
  },
  {
    id: "parking",
    name: "Parking",
    short: "P",
    category: "parking",
    x: 12,
    y: 28,
    color: "#5a5a5a",
    description: "Main visitor + faculty parking near the campus entrance.",
    facilities: ["Visitor Bays", "EV Charging", "Two-wheeler Zone", "Drop-off Lane"],
    floors: 1,
  },
];

export const routeColors = [
  "#1f5132", // forest
  "#d4a017", // amber
  "#7c4dff", // violet
  "#e07b39", // orange
  "#0ea5e9", // sky
];

// Walking speed: ~80m per % distance heuristic
export function estimateWalkTime(from: Building, to: Building): number {
  const dx = from.x - to.x;
  const dy = from.y - to.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return Math.max(1, Math.round(dist * 0.25));
}
