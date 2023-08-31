import "./Filters.css";
import EligibilityCriteria from "./EligibilityCriteria";
import StudyPhase from "./StudyPhase";
import StudyType from "./StudyType";
import StudyResults from "./StudyResults";
import {useState} from "react";

export default function Filters() {
    // ELIGIBILITY CRITERION
    const [sex, setSex] = useState("all-sex");
    const [isCustom, setIsCustom] = useState(false);
    const [ageRange, setAgeRange] = useState({
        child: false,
        adult: false,
        older_adult: false
    });
    const [customRange, setCustomAgeRange] = useState({min: null, max: null});
    const [acceptsVolunteers, setAcceptsVolunteers] = useState(false);
    
    const toggleIsCustom = (isCustom:boolean) => {
        setIsCustom(isCustom);
        if (!isCustom) {
            setCustomAgeRange({min: null, max: null});
        } else {
            setAgeRange({child: false, adult: false, older_adult: false});
        }
    }

    // STUDY PHASE
    const [studyPhase, setStudyPhase] = useState({
        early: false,
        phase1: false,
        phase2: false,
        phase3: false,
        phase4: false,
        na: false
    });

    //STUDY TYPE
    const [studyType, setStudyType] = useState({
        interventional: false,
        observational: false,
        patient_registries: false,
        expanded_access: false,
        individual_patients: false,
        intermediate_size_population: false,
        treatment_ind_protocol: false
    });

    //STUDY RESULTS
    const [withResults, setStudyResults] = useState({with: false, without: false});
    
    // CLEAR/ APPLY BUTTON HANDLERS
    const handleClear = () => {
        setSex("all-sex");
        setIsCustom(false);
        setAgeRange({child: false, adult: false, older_adult: false});
        setCustomAgeRange({min: null, max: null})
        setAcceptsVolunteers(false);
        setStudyPhase({early: false, phase1: false, phase2: false, phase3: false, phase4: false, na: false});
        setStudyType({interventional: false, observational: false, patient_registries: false, expanded_access: false, individual_patients: false, intermediate_size_population: false, treatment_ind_protocol: false});
        setStudyResults({with: false, without: false})
        console.log("Clear filters button clicked.");
    }
    const handleApply = () => {
        console.log("Apply filters button clicked");
        console.log(compileFilters());
    };

    const compileFilters = () => {
        var eligibility = {
            "sex": sex,
            "age": {
                isCustom: isCustom,
                min: customRange.min,
                max: customRange.max,
                child: ageRange.child,
                adult: ageRange.adult,
                older_adult: ageRange.older_adult
            },
            "volunteers": acceptsVolunteers
        };
        var phase = {
            "early": studyPhase.early,
            "phase1": studyPhase.phase1,
            "phase2": studyPhase.phase2,
            "phase3": studyPhase.phase3,
            "phase4": studyPhase.phase4,
            "na": studyPhase.na
        };
        var type = {
            "interventional": studyType.interventional,
            "observational": studyType.observational,
            "patient_registries": studyType.patient_registries,
            "expanded_access": studyType.expanded_access,
            "individual_patients": studyType.individual_patients,
            "intermediate_size_population": studyType.intermediate_size_population,
            "treatment_ind_protocol": studyType.treatment_ind_protocol
        };
        var results = {
            with: withResults.with,
            without: withResults.without
        };

        return JSON.stringify({
            "eligibility": eligibility,
            "phase": phase,
            "type": type,
            "results": results
        });
    };

    return (
    <form id="filters">
        <fieldset name="eligibility-criteria">
            <h1>Eligibility Criterion</h1>
            <p><b>Sex</b></p>
            <p><input type="radio" name="sex" id="all-sex" value="all-sex" onClick={() => setSex("all-sex")} /> <label htmlFor="all-sex">All</label></p>
            <p><input type="radio" name="sex" id ="male" value="male" onClick={() => setSex("male")} /> <label htmlFor="male">Male</label></p>
            <p><input type="radio" name="sex" id="female" value="female" onClick={() => setSex("female")} /> <label htmlFor="female">Female</label></p>

            <p><b>Age</b></p>
            <p><input type="radio" name="age" id="ranges" onClick={() => toggleIsCustom(false)} /> <label htmlFor="ranges">Select Ranges</label></p>
            <p><input type="checkbox" name="age" id ="child" value="child" onClick={() => setAgeRange({...ageRange, child : !ageRange.child})} /> <label htmlFor="child">Child (birth-17)</label></p>
            <p><input type="checkbox" name="age" id ="adult" value="adult" onClick={() => setAgeRange({...ageRange, adult : !ageRange.adult})} /> <label htmlFor="adult">Adult (18-64)</label></p>
            <p><input type="checkbox" name="age" id ="older-adult" value="older_adult" onClick={() => setAgeRange({...ageRange, older_adult : !ageRange.older_adult})} /> <label htmlFor="older-adult">Older Adult (65+)</label></p>

            <p><input type="radio" name="age" id ="custom-age" onClick={() => toggleIsCustom(true)} /> <label htmlFor="custom-age">Custom Range</label>
                <input type="number" id="min-age" min="0" />
                -
                <input type="number" id="max-age" min="0" />
            </p>

            <p><b>Accepts healthy volunteers</b></p>
            <p><input type="checkbox" name="volunteers" id="healthy-volunteers" value="healthy-volunteers" onClick={() => setAcceptsVolunteers(!acceptsVolunteers)} /> <label htmlFor="healthy-volunteers">Yes</label></p>    
        </fieldset>

        
        <fieldset name="study-phase">
            <h1>Study Phase</h1>
            <p><input type="checkbox" name="phase" id="early-phase-1" value="early-phase-1" onClick={() => setStudyPhase({...studyPhase, early: !studyPhase.early})} /> <label htmlFor="early-phase-1">Early Phase 1</label></p>
            <p><input type="checkbox" name="phase" id="phase-1" value="phase-1" onClick={() => setStudyPhase({...studyPhase, phase1: !studyPhase.phase1})} /> <label htmlFor="phase-1">Phase 1</label></p>
            <p><input type="checkbox" name="phase" id="phase-2" value="phase-2" onClick={() => setStudyPhase({...studyPhase, phase2: !studyPhase.phase2})} /> <label htmlFor="phase-2">Phase 2</label></p>
            <p><input type="checkbox" name="phase" id="phase-3" value="phase-3" onClick={() => setStudyPhase({...studyPhase, phase3: !studyPhase.phase3})} /> <label htmlFor="phase-3">Phase 3</label></p>
            <p><input type="checkbox" name="phase" id="phase-4" value="phase-4" onClick={() => setStudyPhase({...studyPhase, phase4: !studyPhase.phase4})} /> <label htmlFor="phase-4">Phase 4</label></p>
            <p><input type="checkbox" name="phase" id="phase-na" value="phase-na" onClick={() => setStudyPhase({...studyPhase, na: !studyPhase.na})} /> <label htmlFor="phase-na">Not Applicable</label></p>
        </fieldset>

        
        <fieldset name="study-type">
        <h1>Study Type</h1>
            <p><input type="checkbox" name="type" id="interventional" value="interventional"
                onClick={() => setStudyType({...studyType, interventional: !studyType.interventional})} /> <label htmlFor="interventional">Interventional</label></p>

            <p><input type="checkbox" name="type" id="observational" value="observational"
                onClick={() => setStudyType({...studyType, observational: !studyType.observational})} /> <label htmlFor="observational">Observational</label></p>
            <p>&emsp;<input type="checkbox" name="type" id="patient-registries" value="patient_registries"
                onClick={() => setStudyType({...studyType, patient_registries: !studyType.patient_registries})} /> <label htmlFor="patient-registries">Patient Registries</label></p>

            <p><input type="checkbox" name="type" id="expanded-access" value="expanded_access"
                onClick={() => setStudyType({...studyType, expanded_access: !studyType.expanded_access})} /> <label htmlFor="expanded-access">Expanded Access</label></p>
            <p>&emsp;<input type="checkbox" name="type" id="individual-patients" value="individual_patients"
                onClick={() => setStudyType({...studyType, individual_patients: !studyType.individual_patients})} /> <label htmlFor="individual-patients">Individual Patients</label></p>
            <p>&emsp;<input type="checkbox" name="type" id="intermediate-size-population" value="intermediate_size_population"
                onClick={() => setStudyType({...studyType, intermediate_size_population: !studyType.intermediate_size_population})} /> <label htmlFor="intermediate-size-population">Intermediate-size Population</label></p>
            <p>&emsp;<input type="checkbox" name="type" id="treatment-ind-protocol" value="treatment_ind_protocol"
                onClick={() => setStudyType({...studyType, treatment_ind_protocol: !studyType.treatment_ind_protocol})} /> <label htmlFor="treatment-ind-protocol">Treatment IND/Protocol</label></p>
        </fieldset>

        
        <fieldset name="study-results">
            <h1>Study Results</h1>
            <p><input type="checkbox" name="results" id="with-results" value="with_results" onClick={() => {setStudyResults({...withResults, with: !withResults.with})}} /> <label htmlFor="with-results">With Results</label></p>
            <p><input type="checkbox" name="results" id="without-results" value="without_results" onClick={() => {setStudyResults({...withResults, without: !withResults.without})}} /> <label htmlFor="without-results">Without Results</label></p>
        </fieldset>


        {/* <EligibilityCriteria /> */}
        {/* <StudyPhase /> */}
        {/* <StudyType /> */}
        {/* <StudyResults /> */}

        <div id="filter-buttons">
            <button type="reset" id="clear-button" onClick={handleClear}>Clear Filters</button>
            <button className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" id="apply-button" onClick={handleApply}>Apply Filters</button>
        </div>
    </form>
    );
}