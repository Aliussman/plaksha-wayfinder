import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Navigation2, QrCode, Sparkles } from "lucide-react";
import { buildings } from "@/lib/campus-data";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Floating GPS lines bg */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute top-32 left-0 right-0 h-px gps-line overflow-hidden" />
        <div className="absolute top-64 left-0 right-0 h-px gps-line overflow-hidden" style={{ animationDelay: "1s" }} />
        <div className="absolute top-96 left-0 right-0 h-px gps-line overflow-hidden" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_60%)]" />
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-foreground bg-accent rounded-sm p-0.5" />
            QR-enabled · AI rerouting · Plaksha University
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Smart Visual <br />
            <span className="bg-gradient-to-r from-primary via-[color:var(--moss)] to-accent bg-clip-text text-transparent">
              Navigation System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground max-w-lg"
          >
            A QR-enabled digital campus map with color-coded navigation paths for Plaksha University.
            Find any building, lab or hostel in seconds — from anywhere on campus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/map"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all shadow-lg shadow-primary/20"
            >
              <MapPin className="w-4 h-4" />
              Open Campus Map
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/qr"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:brightness-95 transition-all"
            >
              <QrCode className="w-4 h-4" /> Scan QR
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-8 grid grid-cols-3 max-w-md gap-4"
          >
            {[
              { v: "9+", l: "Buildings mapped" },
              { v: "24/7", l: "Live navigation" },
              { v: "<3s", l: "QR to route" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl px-3 py-3">
                <div className="text-xl font-semibold">{s.v}</div>
                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Animated illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative"
        >
          <div className="glass rounded-3xl p-4 shadow-2xl shadow-primary/10">
            <div className="aspect-square relative rounded-2xl bg-gradient-to-br from-[color:var(--cream)] via-white to-[color:var(--cream)] overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
                    <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#1f5132" strokeWidth="0.1" opacity="0.15" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                {/* roads */}
                <path d="M 5 50 Q 50 30 95 50" stroke="#cbd5b8" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 50 5 Q 30 50 50 95" stroke="#cbd5b8" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* animated route */}
                <path
                  d="M 12 28 Q 25 35 30 42 Q 40 50 44 64"
                  stroke="#d4a017"
                  strokeWidth="1.2"
                  fill="none"
                  className="route-animated"
                />
                {/* buildings dots */}
                {buildings.map((b) => (
                  <g key={b.id}>
                    <circle cx={b.x} cy={b.y} r="1.8" fill={b.color} />
                    <circle cx={b.x} cy={b.y} r="3" fill={b.color} opacity="0.2" />
                  </g>
                ))}
                {/* you are here */}
                <g>
                  <circle cx="12" cy="28" r="2.5" fill="#1f5132" />
                  <circle cx="12" cy="28" r="5" fill="#1f5132" opacity="0.15">
                    <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>

              {/* Floating mini cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-4 left-4 glass rounded-xl px-3 py-2 text-xs"
              >
                <div className="text-[10px] text-muted-foreground">You are at</div>
                <div className="font-semibold">Parking · Gate 1</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-4 right-4 glass rounded-xl px-3 py-2 text-xs flex items-center gap-2"
              >
                <Navigation2 className="w-3.5 h-3.5 text-primary" />
                <div>
                  <div className="font-semibold">5 min walk</div>
                  <div className="text-[10px] text-muted-foreground">to Bharti Block</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
