import { motion } from "framer-motion";
import {
  QrCode,
  Map,
  Route,
  Compass,
  Volume2,
  Accessibility,
  Building2,
  Sparkles,
  Smartphone,
} from "lucide-react";

const features = [
  { icon: QrCode, title: "Instant QR Check-in", desc: "Scan any QR placed on campus to auto-set your location in seconds." },
  { icon: Map, title: "Interactive Campus Map", desc: "Apple-Maps-grade clarity with clickable buildings, hover insights and zoom." },
  { icon: Route, title: "Color-coded Routes", desc: "Distinct color paths to make multi-destination navigation effortless." },
  { icon: Compass, title: '"You Are Here" Pin', desc: "Live pulsing indicator with directional arrows and turn-by-turn cues." },
  { icon: Building2, title: "Building Information", desc: "Photos, departments, facilities and floor plans in beautiful modals." },
  { icon: Sparkles, title: "Smart Rerouting", desc: "Avoids construction zones and suggests the shortest viable path." },
  { icon: Volume2, title: "Voice Navigation", desc: "Hands-free turn-by-turn directions for busy walks between classes." },
  { icon: Accessibility, title: "Accessible Routes", desc: "Step-free, ramp-friendly paths for wheelchair users and visitors." },
  { icon: Smartphone, title: "Mobile First", desc: "Designed for the phone in your hand the moment you enter campus." },
];

export function Features() {
  return (
    <section id="features" className="px-4 py-24 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Capabilities"
          title="Everything you need to find your way."
          sub="A complete navigation stack purpose-built for Plaksha — QR, AI rerouting, building intelligence and accessibility, in one place."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group glass rounded-2xl p-5 hover:shadow-xl hover:shadow-primary/5 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition">
                <f.icon className="w-5 h-5" />
              </div>
              <div className="font-semibold">{f.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-block text-[10px] uppercase tracking-[0.22em] text-primary font-semibold mb-3">{eyebrow}</div>
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
