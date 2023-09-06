export default function StudyPhase() {
    return (
        <fieldset name="study-phase">
            <h1>Study Phase</h1>
            <p><input type="checkbox" name="phase" id="early-phase-1" value="early-phase-1" /> <label htmlFor="early-phase-1">Early Phase 1</label></p>
            <p><input type="checkbox" name="phase" id="phase-1" value="phase-1" /> <label htmlFor="phase-1">Phase 1</label></p>
            <p><input type="checkbox" name="phase" id="phase-2" value="phase-2" /> <label htmlFor="phase-2">Phase 2</label></p>
            <p><input type="checkbox" name="phase" id="phase-3" value="phase-3" /> <label htmlFor="phase-3">Phase 3</label></p>
            <p><input type="checkbox" name="phase" id="phase-4" value="phase-4" /> <label htmlFor="phase-4">Phase 4</label></p>
            <p><input type="checkbox" name="phase" id="phase-na" value="phase-na" /> <label htmlFor="phase-na">Not Applicable</label></p>
        </fieldset>
    );
}