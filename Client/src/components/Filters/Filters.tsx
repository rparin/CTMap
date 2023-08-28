import { useState } from "react";
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

        <button type="button" id="clear-button" onClick={handleClear}>Clear Filters</button>
        <button type="button" id="apply-button" onClick={handleApply}>Apply Filters</button>
    </form>
    );
}