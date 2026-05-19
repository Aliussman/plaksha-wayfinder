import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { Linkedin, Github, Mail } from "lucide-react";

const team = [
  { name: "Ali Usman Muhammad", role: "Product Lead", initials: "AU" },
  { name: "Shrikant Yadav", role: "Frontend Engineer", initials: "SY" },
  { name: "Aaryan Agarwal", role: "Map & UX Engineer", initials: "AA" },
  { name: "Utkarsh Khurana", role: "Systems & QR Lead", initials: "UK" },
];

export function Team() {
  return (
    <section id="team" className="px-4 py-24 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Group 2 · Alpha Squad"
          title="The team behind the navigator."
          sub="Four students building the way Plaksha should feel from day one — clear, smart and beautifully simple."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-5 text-center hover:shadow-xl hover:shadow-primary/10 transition"
            >
              <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[color:var(--moss)] flex items-center justify-center text-primary-foreground font-semibold text-xl">
                {m.initials}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center border-2 border-card">
                  α
                </div>
              </div>
              <div className="mt-3 font-semibold">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.role}</div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <a className="w-7 h-7 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center"><Linkedin className="w-3.5 h-3.5" /></a>
                <a className="w-7 h-7 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center"><Github className="w-3.5 h-3.5" /></a>
                <a className="w-7 h-7 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center"><Mail className="w-3.5 h-3.5" /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
