import { SetStateAction, useEffect, useState } from "react";
import RHeader from "./RHeader";

export type pInfo = {
  id: string;
  title: string;
  studyStart: string;
  studyType: string;
  phase: string;
};

export default function MPopup(info: pInfo)
{
  const ct_pdf = "http://localhost:8080/api/ct/addct";

  const [buttonText, setButtonText] = useState('Add');
  const [buttonClass, setButtonClass] = useState('bg-blue-400 hover:bg-blue-600 text-white font-bold py-0.5 px-0.5 rounded');

  var test = {};

  const handleClick = () => {
    if (buttonText === 'Add') {
      callPdfAPI();
      setButtonText('Remove');
  } else {
      setButtonText('Add');
  }
  };

  const callPdfAPI = () => {
    fetch(ct_pdf + "/" + info.id)
    .then((res) => res.json())
    .then((data) => {
      test = data.itemList;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  return (
    <section className="flex flex-col gap-1">
      <RHeader hr={"NCTID"} info={info.id} />
      <RHeader hr={"Title"} info={info.title} />
      {info.phase && <RHeader hr={"Phase"} info={info.phase} />}
      <div className="flex justify-between">
        <RHeader hr={"Study Start"} info={info.studyStart} />
        <RHeader hr={"Study Type"} info={info.studyType} />
      </div>
      <div className="text-sky-500 font-bold text-xs border-b-2 border-solid border-x-2 border-transparent border-b-sky-600/20">My List</div>
      <button
        className={buttonClass}
        onClick={handleClick}>
        {buttonText}
      </button>
    </section>
  );
}
