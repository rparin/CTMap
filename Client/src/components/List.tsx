import RHeader from "./RHeader";

type ListType = {
  id: string;
  title: string;
  sponsor: string;
  conditions: string;
};

export default function List(info: ListType) {
  return (
    <section className="p-3 bg-blue-400/20 rounded-md mb-2">
      <p className="flex justify-end text-sky-500 text-xs gap-1 leading-3">
        ClinicalTrials.gov ID
        <span className="text-black font-bold">{info.id}</span>
      </p>
      <RHeader hr={"Study"} info={info.title} />
      <RHeader hr={"Sponsor"} info={info.sponsor} />
      <RHeader hr={"Condition"} info={info.conditions} />
    </section>
  );
}
