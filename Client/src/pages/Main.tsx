import "./Main.css";
import Map from "@/components/Map/Map";
import Results from "@/components/Results";
import Search from "@/components/Search";

export default function Main() {
  return (
    <main className="main_container">
      {/* Top stuff */}
      <div className="flex justify-between">
        <Search />
      </div>

      {/* Map */}
      <Map />

      {/* Bottom Stuff (Todo) */}
      <Results />
    </main>
  );
}
