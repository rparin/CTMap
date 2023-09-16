import { MouseEventHandler, useEffect, useState } from "react";
import RHeader from "./RHeader";
import { pInfo } from "./MPopupMenu";
import { Link, animateScroll as scroll } from "react-scroll";

export default function MPopup(info: pInfo) {
  const ct_pdf = "http://localhost:8080/api/ct/addct";
  const idLink: string = "#" + info.id;

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

  // const handleLearnClick = () => {
  //   document?.getElementById(info.id)?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <>
      <div className="inline-flex justify-end w-fit align-center">
        <Link
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-1"
          activeClass="active"
          to={info.id}
          smooth={true}
          offset={0}
          duration={500}
          containerId="resultsContainer">
          Learn More
        </Link>
      </div>
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
            onClick={handleAdd}
          >
            Add
          </button>
          <button
            className="bg-red-400 hover:bg-red-600 text-white font-bold py-1 px-5 rounded"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </section>
    </>
  );
}
