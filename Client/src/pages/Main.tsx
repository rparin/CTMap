import "./Main.css";
import Map from "@/components/Map/Map";
import Results from "@/components/Results";

export default function Main() {
  return (
    <main className="main_container">
      {/* Map */}
      <Map />

      {/* Bottom Stuff (Todo) */}
      <Results />
    </main>
  );
}
