import { Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, QrCode, MapPin, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", to: "/", hash: "" },
  { label: "Features", to: "/", hash: "#features" },
  { label: "Campus Map", to: "/map", hash: "" },
  { label: "About", to: "/", hash: "#about" },
  { label: "Team", to: "/", hash: "#team" },
  { label: "Contact", to: "/", hash: "#contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const go = (to: string, hash: string) => {
    setOpen(false);
    if (to === "/" && router.state.location.pathname === "/") {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.navigate({ to, hash: hash.replace("#", "") || undefined });
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
    >
      <nav className="glass mx-auto max-w-6xl rounded-2xl px-5 py-3 flex items-center justify-between shadow-[0_8px_30px_rgba(31,81,50,0.08)]">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="absolute inset-0 rounded-xl ring-2 ring-accent/40 pulse-glow" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-sm tracking-tight">Plaksha</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Campus Navigator
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.to, l.hash)}
              className="px-3 py-1.5 text-sm rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/qr"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:brightness-95 transition"
          >
            <QrCode className="w-4 h-4" /> Scan QR
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 rounded-lg border border-border flex items-center justify-center"
            aria-label="Menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "md:hidden mt-2 mx-auto max-w-6xl glass rounded-2xl p-3 flex flex-col"
          )}
        >
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.to, l.hash)}
              className="text-left px-3 py-2 rounded-lg hover:bg-secondary text-sm"
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
