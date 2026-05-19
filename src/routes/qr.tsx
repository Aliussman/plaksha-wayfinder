import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Camera, MapPin, Check, ScanLine } from "lucide-react";
import { useState, useEffect } from "react";
import { buildings } from "@/lib/campus-data";

export const Route = createFileRoute("/qr")({
  component: QRPage,
  head: () => ({ meta: [{ title: "QR Scanner · Plaksha Navigator" }] }),
});

function QRPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState<string | null>(null);

  useEffect(() => {
    if (!scanning) return;
    const t = setTimeout(() => {
      setDetected("bharti");
      setScanning(false);
    }, 2200);
    return () => clearTimeout(t);
  }, [scanning]);

  const detectedBuilding = detected ? buildings.find((b) => b.id === detected)! : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          {/* Scanner simulation */}
          <div className="glass rounded-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">Scanner</div>
                <div className="font-semibold">Point camera at any campus QR</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl bg-black overflow-hidden">
              {/* Simulated viewfinder */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-700" />
              <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 50% 60%, #1f5132 0%, transparent 50%)" }} />

              {/* Reticle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-3/5 aspect-square">
                  {["tl","tr","bl","br"].map((p) => (
                    <span
                      key={p}
                      className={`absolute w-8 h-8 border-accent ${
                        p === "tl" ? "top-0 left-0 border-t-2 border-l-2 rounded-tl-xl" :
                        p === "tr" ? "top-0 right-0 border-t-2 border-r-2 rounded-tr-xl" :
                        p === "bl" ? "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl" :
                        "bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl"
                      }`}
                    />
                  ))}
                  {scanning && (
                    <motion.div
                      initial={{ top: "10%" }}
                      animate={{ top: "85%" }}
                      transition={{ duration: 1.1, repeat: Infinity, repeatType: "reverse" }}
                      className="absolute left-2 right-2 h-0.5 bg-accent shadow-[0_0_20px_2px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
                    />
                  )}
                  {!scanning && !detected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ScanLine className="w-10 h-10 text-white/40" />
                    </div>
                  )}
                </div>
              </div>

              {/* Status pill */}
              <div className="absolute top-3 left-3 right-3 flex justify-between">
                <div className="px-2 py-1 rounded-md bg-black/40 backdrop-blur text-white text-[10px] flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${scanning ? "bg-accent animate-pulse" : "bg-white/50"}`} />
                  {scanning ? "Scanning…" : detected ? "QR detected" : "Idle"}
                </div>
                <div className="px-2 py-1 rounded-md bg-black/40 backdrop-blur text-white text-[10px]">PLAKSHA-NAV-v1</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {!detected ? (
                <button
                  onClick={() => setScanning((s) => !s)}
                  className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" /> {scanning ? "Stop scanning" : "Start scanning"}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { setDetected(null); }}
                    className="px-4 py-3 rounded-xl bg-secondary font-medium text-sm"
                  >
                    Re-scan
                  </button>
                  <button
                    onClick={() => router.navigate({ to: "/map", search: { from: detected } })}
                    className="flex-1 py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:brightness-95 transition flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" /> Open route from here
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary font-semibold">QR Navigation</div>
              <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Scan a QR. We do the rest.
              </h1>
              <p className="mt-3 text-muted-foreground">
                Every major spot at Plaksha has a placed QR. Scan it to instantly set your "You are here" pin
                and open turn-by-turn directions to any building.
              </p>
            </div>

            {detectedBuilding && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-primary text-primary-foreground p-5"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-primary-foreground/70">
                  <Check className="w-3.5 h-3.5" /> Location detected
                </div>
                <div className="mt-1 text-xl font-semibold">You are at {detectedBuilding.name} Entrance</div>
                <div className="text-primary-foreground/70 text-sm mt-1">{detectedBuilding.description}</div>
              </motion.div>
            )}

            <div className="grid sm:grid-cols-2 gap-3">
              {buildings.slice(0, 6).map((b) => (
                <div key={b.id} className="glass rounded-2xl p-4 flex items-center gap-3">
                  <div className="rounded-lg p-2 bg-white">
                    <QRCodeSVG value={`plaksha://${b.id}`} size={56} fgColor="#1f5132" bgColor="#ffffff" level="M" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground">QR · {b.short}</div>
                    <div className="font-semibold truncate">{b.name}</div>
                    <button
                      onClick={() => { setDetected(b.id); }}
                      className="mt-1 text-[11px] text-primary font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Simulate scan <QrCode className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
