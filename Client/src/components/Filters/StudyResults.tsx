export default function StudyResults() {
    return (
        <fieldset name="study-results">
            <h1>Study Results</h1>
            <p><input type="checkbox" name="results" id="with-results" value="with_results" /> <label htmlFor="with-results">With Results</label></p>
            <p><input type="checkbox" name="results" id="without-results" value="without_results" /> <label htmlFor="without-results">Without Results</label></p>
        </fieldset>
    );
}