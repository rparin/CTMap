import { useState } from "react";

export default function Filters() {
    const handleApply = () => {
        console.log("Apply Filters Button Clicked");
    };

    return (
    <form id="filters">
        <h1>Eligibility Criterion</h1>
        <p><b>Sex</b></p>
        <p><input type="checkbox" name="sex" id="all-sex" value="all_sex" /> <label htmlFor="all-sex">All</label></p>
        <p><input type="checkbox" name="sex" id ="male" value="male" /> <label htmlFor="male">Male</label></p>
        <p><input type="checkbox" name="sex" id="female" value="female" /> <label htmlFor="female">Female</label></p>

        <p><b>Age</b></p>
        <p><input type="checkbox" name="age" id ="minor" value="minor" /> <label htmlFor="minor">Minor (0-17)</label></p>
        <p><input type="checkbox" name="age" id ="adult" value="adult" /> <label htmlFor="adult">Adult (18-64)</label></p>
        <p><input type="checkbox" name="age" id ="older-adult" value="older_adult" /> <label htmlFor="older-adult">Older Adult (65+)</label></p>
        <p><input type="checkbox" name="age" id ="custom-age" /> <label htmlFor="custom-age">Custom Range</label>
            <input type="number" id="min-age" min="0" />
            -
            <input type="number" id="max-age" min="0" />
        </p>

        <h1>Study Phase</h1>
        <p><input type="checkbox" name="phase" id="early-phase" value="early_phase" /> <label htmlFor="early_phase">Early Phase</label></p>
        <p><input type="checkbox" name="phase" id="phase-1" value="phase_1" /> <label htmlFor="phase_1">Phase 1</label></p>
        <p><input type="checkbox" name="phase" id="phase-2" value="phase_2" /> <label htmlFor="phase_2">Phase 2</label></p>
        <p><input type="checkbox" name="phase" id="phase-3" value="phase_3" /> <label htmlFor="phase_3">Phase 3</label></p>
        <p><input type="checkbox" name="phase" id="phase-4" value="phase_4" /> <label htmlFor="phase_4">Phase 4</label></p>
        <p><input type="checkbox" name="phase" id="phase-na" value="phase_na" /> <label htmlFor="phase_na">Not Applicable</label></p>

        <h1>Study Type</h1>
        <p><input type="checkbox" name="type" id="interventional" value="interventional" /> <label htmlFor="interventional">Interventional</label></p>

        <p><input type="checkbox" name="type" id="observational" value="observational" /> <label htmlFor="observational">Observational</label></p>
        <p>&emsp;<input type="checkbox" name="type" id="patient-registries" value="patient_registries" /> <label htmlFor="patient_registries">Patient Registries</label></p>

        <p><input type="checkbox" name="type" id="expanded-access" value="expanded_access" /> <label htmlFor="expanded_access">Expanded Access</label></p>
        <p>&emsp;<input type="checkbox" name="type" id="individual-patients" value="individual_patients" /> <label htmlFor="individual_patients">Individual Patients</label></p>
        <p>&emsp;<input type="checkbox" name="type" id="intermediate-size-populaiton" value="intermediate_size_populaiton" /> <label htmlFor="intermediate_size_populaiton">Intermediate-size Populaiton</label></p>
        <p>&emsp;<input type="checkbox" name="type" id="treatment-ind-protocol" value="treatment_ind_protocol" /> <label htmlFor="treatment_ind_protocol">Treatment IND/Protocol</label></p>

        
        <h1>Study Results</h1>
        <p><input type="checkbox" name="results" id="with-results" value="with_results" /> <label htmlFor="with_result">With Results</label></p>
        <p><input type="checkbox" name="results" id="without-results" value="without_results" /> <label htmlFor="without_result">Without Results</label></p>

        <button type="button" id="filter-button" onClick={handleApply}>Apply Filters</button>
    </form>
    );
}