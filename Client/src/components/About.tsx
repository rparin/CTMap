export default function About() {
  return (
    <div className="absolute right-0 bottom-10 p-[5px] w-[270px] overflow-y-auto text-black bg-slate-200 bg-opacity-60 text-xs">
      <p>
        <a
          className="font-bold hover:text-white"
          href="https://clinicaltrials.gov"
          title="Information on Clinical Trials and Human Research Studies">
          ClinicalTrials.gov
        </a>{" "}
        provides patients, their family members, and the public with easy and
        free access to information on clinical studies for a wide range of
        diseases and conditions.
      </p>
      <br />
      <p>
        ClinicalTrials.gov was developed by the National Library of Medicine.
        ClinicalTrials.gov is updated daily. You should check ClinicalTrials.gov
        frequently for updated information.
      </p>
    </div>
  );
}
