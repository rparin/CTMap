import { useEffect, useState } from "react";
import List from "./List";

export default function Lists({ itemList }: { itemList: {} }) {
  var cInfos: any = [];
  const [item, setList] = useState([]);

  useEffect(() => {
    for (var key in itemList) {
      const study: any = itemList[key as keyof {}];
      if (study) {
        cInfos.push(
          <List
            key={key}
            id={study.nctId}
            title={study.title}
            sponsor={study.sponsor}
            conditions={study.conditions}
          />
        );
      }
    }
    setList(cInfos);
  }, [itemList]);
  return (
    <>
      {item.length <= 0 && <section>No Clinical Trials Added</section>}
      {item.length > 0 && <section className="h-[35.25rem] overflow-y-auto">{item}</section>}
    </>
  );
}
