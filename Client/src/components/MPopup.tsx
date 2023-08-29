import React from "react";

export type pInfo = {
  id: string;
  title: string;
  studyStart: string;
  studyType: string;
  phase: string;
};

export default function MPopup(info: pInfo) {
  return (
    <section>
      <p>{info.id}</p>
      <h3>{info.title}</h3>
      <p>{info.studyStart}</p>
      <p>{info.studyType}</p>
      <p>{info.phase}</p>
    </section>
  );
}
