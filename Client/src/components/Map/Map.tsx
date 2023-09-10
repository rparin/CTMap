"use client";

import "./Map.css";
import MPopup, { pInfo } from "../MPopup";
import PageButton from "@/components/PageButton";
import Search from "@/components/Search";
import Tabs from "../Tabs/Tabs";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

mapboxgl.accessToken =
  "MAP_TOKEN";

export default function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);

  //Get and store data from search result
  const [searchResult, setResult] = useState({});
  const [filterValue, setFilter] = useState<{} | null>(null);
  const mEventHandlers: { marker: HTMLElement; func: () => void }[] = [];

  // page stuff
  const pageTokens = useRef<string[]>([]);  // array indices compared to page number are off by 2 (instead of 1 by default) because first page's token is never stored (it's always null)
  const maxPageIndex = useRef(0);
  const currentPageIndex = useRef(0);
  const [currentPageToken, setPageToken] = useState<string | null>(null);

  const removeMarkerEvents = async () => {
    mEventHandlers.forEach(function (item, index) {
      item.marker.removeEventListener("click", item.func);
    });
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/yenlei/cllepzpeh00ha01pwed4dhdh0", // map styling here; streets and other miscellaneous stuff were removed here
      center: [lng, lat],
      zoom: zoom,
    });

    // add zoom control
    const nav = new mapboxgl.NavigationControl({
      showCompass: false, // do not show compass controls so rotation of the map is not allowed (not neeeded anyway)
    });
    map.addControl(nav, "top-right");

    //Fill map with result pins
    if (!isEmpty(searchResult)) {
      let colors = new Set();
      for (var key in searchResult) {
        let curColor = getRandomColor();
        while (colors.has(curColor)) {
          curColor = getRandomColor();
        }
        const study: any = searchResult[key as keyof {}];
        for (let i = 0; i < study.geolocations.length; i++) {
          const marker = new mapboxgl.Marker({ color: curColor })
            .setLngLat(study.geolocations[i])
            .addTo(map);
          const mElement = marker.getElement();

          //Create Popup on marker click
          const mHandler = () => {
            const popup = createPopup(
              {
                id: study.nctId,
                title: study.title,
                studyStart: study.studyStart,
                studyType: study.studyType,
                phase: study.phase,
              },
              { offset: 25 }
            );
            marker.setPopup(popup).togglePopup();
          };
          mElement.addEventListener("click", mHandler);
          mEventHandlers.push({ marker: mElement, func: mHandler });
        }
      }
    }

    // cleanup function to remove map on unmount
    return () => {
      map.remove();
      removeMarkerEvents();
    };
  }, [searchResult]); // update map whenever searchResult changes

  return (
    <>
      <div ref={mapContainer} className="map_container" />
      <div className="flex justify-between absolute m-5 gap-3">
        <Search setResult={setResult} filterValue={filterValue} pageTokens={pageTokens} maxPageIndex={maxPageIndex} currentPageIndex={currentPageIndex} currentPageToken={currentPageToken} />

        {/* Todo add location search bar here */}
      </div>

      <div className="absolute bottom-[43rem] m-5 text-white w-43">
        <PageButton buttonName="Prev" pageTokens={pageTokens} maxPageIndex={maxPageIndex} currentPageIndex={currentPageIndex} setPageToken={setPageToken} pageDiff={-1} />
        {(currentPageIndex.current > 0) ? (`Page ${currentPageIndex.current}`) : ("")}
        <PageButton buttonName="Next" pageTokens={pageTokens} maxPageIndex={maxPageIndex} currentPageIndex={currentPageIndex} setPageToken={setPageToken} pageDiff={1} />
      </div>

      <div className="absolute m-5 bottom-10 text-black bg-slate-200 w-96 h-[40rem] overflow-y-auto ">
        <Tabs searchResult={searchResult} setFilter={setFilter} />
      </div>
    </>
  );
}

function createPopup(
  popupInfo: pInfo,
  pOptions?: mapboxgl.PopupOptions | undefined
) {
  const popup = new mapboxgl.Popup(pOptions);
  const pContainer = document.createElement("div");
  createRoot(pContainer).render(
    <MPopup
      id={popupInfo.id}
      title={popupInfo.title}
      studyStart={popupInfo.studyStart}
      studyType={popupInfo.studyType}
      phase={popupInfo.phase}
    />
  );
  popup.setDOMContent(pContainer);
  return popup;
}

function isEmpty(obj: any) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
