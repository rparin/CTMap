import RHeader from "./RHeader";
import { Element } from "react-scroll";

type resultType = {
  id: string;
  title: string;
  sponsor: string;
  conditions: string;
  start: string;
  primary: string;
  completion: string;
  enrollment: string;
  type: string;
  phase: string;
  healthy: string;
  sex: string;
  ageRange: string;
  facility: string;
};

export default function Result(info: resultType) {
  return (
    <>
    <section id={info.id} className="p-3 bg-blue-400/20 rounded-md mb-2">
      <p className="flex justify-end text-sky-500 text-xs gap-1 leading-3">
        ClinicalTrials.gov ID
        <span className="text-black font-bold">{info.id}</span>
      </p>
      <RHeader hr={"Study"} info={info.title} />
      <RHeader hr={"Sponsor"} info={info.sponsor} />
      <RHeader hr={"Condition"} info={info.conditions} />
      <RHeader hr={"Facility"} info={info.facility} />

      <div className="grid grid-cols-2 mt-1 mb-1 gap-x-2">
        <RHeader hr={"Sex"} info={info.sex} />
        <RHeader hr={"Study Start"} info={info.start} />
        <RHeader hr={"Primary Completion"} info={info.primary} />
        <RHeader hr={"Study Completion"} info={info.completion} />
        <RHeader hr={"Enrollment"} info={info.enrollment} />
        <RHeader hr={"Study Type"} info={info.type} />
      </div>
      <RHeader hr={"Accepts Healthy Volunteers"} info={info.healthy} />
      <RHeader hr={"Ages Eligible For Study"} info={info.ageRange} />
      <RHeader hr={"Phase"} info={info.phase} />
    </section></>
  );
}
