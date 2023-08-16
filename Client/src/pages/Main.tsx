import "./Main.css";
import Searchbar from "@/components/Searchbar";
import Map from "@/components/Map/Map";
import Results from "@/components/Results";

export default function Main() {
  return (
    <main className="main_container">
      {/* Top stuff */}
      <div className=" flex justify-between">
        <Searchbar />

        <div className=" flex">
          <p>Filters: </p>
          <div>Insert dropdown components</div>
        </div>
      </div>

      {/* Map */}
      <Map />

      {/* Bottom Stuff (Todo) */}
      <Results />
    </main>
  );
}
