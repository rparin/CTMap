export default function EligibilityCriteria() {
    return (
    <fieldset name="eligibility-criteria">
    <h1>Eligibility Criterion</h1>
    <p><b>Sex</b></p>
    <p><input type="radio" name="sex" id="all" value="all-sex" /> <label htmlFor="all-sex">All</label></p>
    <p><input type="radio" name="sex" id ="male" value="male" /> <label htmlFor="male">Male</label></p>
    <p><input type="radio" name="sex" id="female" value="female" /> <label htmlFor="female">Female</label></p>

    <p><b>Age</b></p>
    <p><input type="radio" name="age"/></p>
    <p><input type="checkbox" name="age" id ="child" value="child" /> <label htmlFor="child">Child (birth-17)</label></p>
    <p><input type="checkbox" name="age" id ="adult" value="adult" /> <label htmlFor="adult">Adult (18-64)</label></p>
    <p><input type="checkbox" name="age" id ="older-adult" value="older_adult" /> <label htmlFor="older-adult">Older Adult (65+)</label></p>

    <p><input type="radio" name="age" id ="custom-age" /> <label htmlFor="custom-age">Custom Range</label>
        <input type="number" id="min-age" min="0" />
        -
        <input type="number" id="max-age" min="0" />
    </p>

    <p><b>Accepts healthy volunteers</b></p>
    <p><input type="checkbox" name="volunteers" id="healthy-volunteers" value="healthy-volunteers"/> <label htmlFor="healthy-volunteers">Yes</label></p>
    </fieldset>
    );
}