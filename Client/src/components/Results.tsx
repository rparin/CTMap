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
        />
      );
    }
    setResults(cInfos);
  }, [searchResult]);
  return <section>{results}</section>;
}
