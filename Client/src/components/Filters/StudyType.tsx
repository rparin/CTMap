export default function StudyType() {
    return (
        <fieldset name="study-type">
        <h1>Study Type</h1>
            <p><input type="checkbox" name="type" id="interventional" value="interventional" /> <label htmlFor="interventional">Interventional</label></p>

            <p><input type="checkbox" name="type" id="observational" value="observational" /> <label htmlFor="observational">Observational</label></p>
            <p>&emsp;<input type="checkbox" name="type" id="patient-registries" value="patient_registries" /> <label htmlFor="patient-registries">Patient Registries</label></p>

            <p><input type="checkbox" name="type" id="expanded-access" value="expanded_access" /> <label htmlFor="expanded-access">Expanded Access</label></p>
            <p>&emsp;<input type="checkbox" name="type" id="individual-patients" value="individual_patients" /> <label htmlFor="individual-patients">Individual Patients</label></p>
            <p>&emsp;<input type="checkbox" name="type" id="intermediate-size-populaiton" value="intermediate_size_populaiton" /> <label htmlFor="intermediate-size-populaiton">Intermediate-size Populaiton</label></p>
            <p>&emsp;<input type="checkbox" name="type" id="treatment-ind-protocol" value="treatment_ind_protocol" /> <label htmlFor="treatment-ind-protocol">Treatment IND/Protocol</label></p>

        </fieldset>
    );
}