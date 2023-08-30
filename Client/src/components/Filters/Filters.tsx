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

    
    // CLEAR/ APPLY BUTTON HANDLERS
    const handleClear = () => {
        setSex("all-sex");
        console.log("Clear filters button clicked.");
    }
    const handleApply = () => {
        console.log("sex: " + sex);
        console.log("custom?: " + isCustom + ", child: " + ageRange.child + ", adult: " + ageRange.adult + ", older_adult: " + ageRange.older_adult);
        console.log("volunteers?: " + acceptsVolunteers);
        console.log("Apply filters button clicked");
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


        {/* <EligibilityCriteria /> */}
        <StudyPhase />
        <StudyType />
        <StudyResults />

        <div id="filter-buttons">
            <button type="reset" id="clear-button" onClick={handleClear}>Clear Filters</button>
            <button className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" id="apply-button" onClick={handleApply}>Apply Filters</button>
        </div>
    </form>
    );
}