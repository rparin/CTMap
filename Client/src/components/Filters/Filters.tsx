import "./Filters.css";
import EligibilityCriteria from "./EligibilityCriteria";
import StudyPhase from "./StudyPhase";
import StudyType from "./StudyType";
import StudyResults from "./StudyResults";

export default function Filters() {
    const handleClear = () => {
        console.log("Clear filters button clicked.");
    }
    const handleApply = () => {
        console.log("Apply filters button clicked");
    };

    return (
    <form id="filters">
        <EligibilityCriteria />
        <StudyPhase />
        <StudyType />
        <StudyResults />

        <div id="filter-buttons">
            <button type="button" id="clear-button" onClick={handleClear}>Clear Filters</button>
            <button className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" id="apply-button" onClick={handleApply}>Apply Filters</button>
        </div>
    </form>
    );
}