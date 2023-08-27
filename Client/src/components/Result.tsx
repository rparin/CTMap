import RHeader from "./RHeader";

export default function Result() {
  return (
    <section className="p-3 bg-blue-400/20 rounded-md">
      <p className="flex justify-end text-sky-500 text-xs gap-1 leading-3">
        ClinicalTrials.gov ID
        <span className="text-black font-bold">{"NCT02376244"}</span>
      </p>
      <RHeader hr={"Study"} info={"Study Name"} />
      <RHeader hr={"Sponsor"} info={"Sponsor Name"} />
      <RHeader hr={"Condition"} info={"Condition List"} />

      <div className="grid grid-cols-2 mt-1 mb-1 gap-x-2">
        <RHeader hr={"Study Start"} info={"Date"} />
        <RHeader hr={"Primary Completion"} info={"Date"} />
        <RHeader hr={"Study Completion"} info={"Date"} />
        <RHeader hr={"Enrollment"} info={"Number"} />
        <RHeader hr={"Study Type"} info={"Info"} />
      </div>
      <RHeader hr={"Phase"} info={"Phase List"} />
    </section>
  );
}
