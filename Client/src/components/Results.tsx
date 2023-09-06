import { useEffect, useState } from "react";
import Result from "./Result";

export default function Results({ searchResult }: { searchResult: {} }) {
  var cInfos: any = [];
  const [results, setResults] = useState([]);

  useEffect(() => {
    for (var key in searchResult) {
      const study: any = searchResult[key as keyof {}];
      cInfos.push(
        <Result
          key={key}
          id={study.nctId}
          title={study.title}
          sponsor={study.sponsor}
          conditions={study.conditions}
          start={study.studyStart}
          primary={study.primaryComp}
          completion={study.studyComp}
          enrollment={study.enroll}
          type={study.enrollType}
          phase={study.phase}
          healthy={study.healthy}
          sex={study.sex}
          ageRange={study.ageRange}
        />
      );
    }
    setResults(cInfos);
  }, [searchResult]);
  return (
    <>
      {results.length <= 0 && <section>No Results Found</section>}
      {results.length > 0 && <section>{results}</section>}
      <p className="text-xs italic">
        <a
          className="font-bold text-sky-500"
          href="https://clinicaltrials.gov"
          title="Information on Clinical Trials and Human Research Studies">ClinicalTrials.gov</a> provides patients, their family members, and the public with easy and free access to information on clinical studies for a wide range of diseases and conditions.
      </p>
      <br />
      <p className="text-xs italic">
          ClinicalTrials.gov was developed by the National Library of Medicine. ClinicalTrials.gov is updated daily. You should check ClinicalTrials.gov frequently for updated information.
      </p>
    </>
  );
}
