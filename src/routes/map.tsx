import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { CampusMap } from "@/components/CampusMap";

export const Route = createFileRoute("/map")({
  component: MapPage,
  validateSearch: (s: Record<string, unknown>) => ({
    from: typeof s.from === "string" ? s.from : undefined,
  }),
  head: () => ({
    meta: [{ title: "Campus Map · Plaksha Navigator" }],
  }),
});

function MapPage() {
  const { from } = Route.useSearch();
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24">
        <CampusMap initialFromId={from || "parking"} />
      </div>
    </div>
  );
}
