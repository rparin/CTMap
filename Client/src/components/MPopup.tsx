import { useEffect, useState } from "react";
import RHeader from "./RHeader";
import { pInfo } from "./MPopupMenu";

export default function MPopup(info: pInfo) {
  const ct_pdf = "http://localhost:8080/api/ct/addct";

  var test = {};

  const handleAdd = () => {
    callPdfAPI();
    info.addItem();
  };

  const handleRemove = () => {
    info.removeItem();
  };

  const callPdfAPI = () => {
    fetch(ct_pdf + "/" + info.id)
      .then((res) => res.json())
      .then((data) => {
        test = data.itemList; // Send to PDF class to generate PDF.
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

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
      <div className="text-sky-500 font-bold text-xs border-b-2 border-solid border-x-2 border-transparent border-b-sky-600/20">
        My List
      </div>
      <div className="flex justify-around">
        <button
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-5 rounded"
          onClick={handleAdd}>
          Add
        </button>
        <button
          className="bg-red-400 hover:bg-red-600 text-white font-bold py-1 px-5 rounded"
          onClick={handleRemove}>
          Remove
        </button>
      </div>
    </section>
  );
}
