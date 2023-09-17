import React, { useState } from "react";
import MPopup from "./MPopup";

export type pInfo = {
  id: string;
  title: string;
  studyStart: string;
  studyType: string;
  phase: string;
  facility: string;
  removeItem: any;
  addItem: any;
};

export const MPopupMenu: React.FC<{ studies: pInfo[] }> = ({ studies }) => {
  const [index, setIndex] = React.useState(-1);
  const handleClick = (newIndex: number) => {
    setIndex(newIndex);
  };

  function getStudyPopup(index: number) {
    const study = studies[index];
    if (study) {
      const id = study.id;
      const title = study.title;
      const studyStart = study.studyStart;
      const studyType = study.studyType;
      const phase = study.phase;
      const facility = study.facility;
      return (
        <MPopup
          id={id}
          title={title}
          studyStart={studyStart}
          studyType={studyType}
          phase={phase}
          facility={facility}
          removeItem={study.removeItem}
          addItem={study.addItem}
        />
      );
    }
  }

  function getStudyTitle(index: number) {
    return studies[index]?.title;
  }

  function getStudiesLength() {
    return studies.length;
  }

  if (studies.length > 1 && index == -1) {
    // show menu
    const btns = [];
    for (let i = 0; i < getStudiesLength(); i++) {
      btns.push(
        <button
          key={i}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded my-1"
          onClick={() => handleClick(i)}
        >
          <p className="line-clamp-2 text-left">{getStudyTitle(i)}</p>
        </button>
      );
    }
    return <>{btns}</>;
  } else if (studies.length > 1) {
    return (
      <>
        <div className="inline-flex w-[63.3%]">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-1
          "
            onClick={() => handleClick(-1)}
          >
            Back
          </button>
        </div>
        {getStudyPopup(index)}
      </>
    );
  } else {
    return <>{getStudyPopup(0)}</>;
  }
};
