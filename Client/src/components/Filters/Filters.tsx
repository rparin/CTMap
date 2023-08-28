import { useState } from "react";
import EligibilityCriteria from "./EligibilityCriteria";

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

        <h1>Study Phase</h1>
        <p><input type="checkbox" name="phase" id="early-phase" value="early_phase" /> <label htmlFor="early-phase">Early Phase</label></p>
        <p><input type="checkbox" name="phase" id="phase-1" value="phase_1" /> <label htmlFor="phase-1">Phase 1</label></p>
        <p><input type="checkbox" name="phase" id="phase-2" value="phase_2" /> <label htmlFor="phase-2">Phase 2</label></p>
        <p><input type="checkbox" name="phase" id="phase-3" value="phase_3" /> <label htmlFor="phase-3">Phase 3</label></p>
        <p><input type="checkbox" name="phase" id="phase-4" value="phase_4" /> <label htmlFor="phase-4">Phase 4</label></p>
        <p><input type="checkbox" name="phase" id="phase-na" value="phase_na" /> <label htmlFor="phase-na">Not Applicable</label></p>

        <h1>Study Type</h1>
        <p><input type="checkbox" name="type" id="interventional" value="interventional" /> <label htmlFor="interventional">Interventional</label></p>

        <p><input type="checkbox" name="type" id="observational" value="observational" /> <label htmlFor="observational">Observational</label></p>
        <p>&emsp;<input type="checkbox" name="type" id="patient-registries" value="patient_registries" /> <label htmlFor="patient-registries">Patient Registries</label></p>

        <p><input type="checkbox" name="type" id="expanded-access" value="expanded_access" /> <label htmlFor="expanded-access">Expanded Access</label></p>
        <p>&emsp;<input type="checkbox" name="type" id="individual-patients" value="individual_patients" /> <label htmlFor="individual-patients">Individual Patients</label></p>
        <p>&emsp;<input type="checkbox" name="type" id="intermediate-size-populaiton" value="intermediate_size_populaiton" /> <label htmlFor="intermediate-size-populaiton">Intermediate-size Populaiton</label></p>
        <p>&emsp;<input type="checkbox" name="type" id="treatment-ind-protocol" value="treatment_ind_protocol" /> <label htmlFor="treatment-ind-protocol">Treatment IND/Protocol</label></p>

        
        <h1>Study Results</h1>
        <p><input type="checkbox" name="results" id="with-results" value="with_results" /> <label htmlFor="with-results">With Results</label></p>
        <p><input type="checkbox" name="results" id="without-results" value="without_results" /> <label htmlFor="without-results">Without Results</label></p>


        <button type="button" id="clear-button" onClick={handleClear}>Clear Filters</button>
        <button type="button" id="apply-button" onClick={handleApply}>Apply Filters</button>
    </form>
    );
}