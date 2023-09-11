import RHeader from "./RHeader";

export type pInfo = {
  id: string;
  title: string;
  studyStart: string;
  studyType: string;
  phase: string;
  facility: string;
};

export default function MPopup(info: pInfo) {
  return (
    <section className="flex flex-col gap-1">
      <RHeader hr={"NCTID"} info={info.id} />
      <RHeader hr={"Title"} info={info.title} />
      <RHeader hr={"Phase"} info={info.phase} />
      <RHeader hr={"Facility"} info={info.facility} />
      <div className="flex justify-between">
        <RHeader hr={"Study Start"} info={info.studyStart} />
        <RHeader hr={"Study Type"} info={info.studyType} />
      </div>
    </section>
  );
}
