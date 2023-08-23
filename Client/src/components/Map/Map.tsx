"use client";

import "./Map.css";
import MPopup, { pInfo } from "../MPopup";
import Search from "@/components/Search";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getEventListeners } from "events";

mapboxgl.accessToken =
  "MAP_TOKEN";

export default function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  //Get and store data from search result
  const [searchResult, setResult] = useState("");
  const mEventHandlers: { marker: HTMLElement; func: () => void }[] = [];

  const removeMarkerEvents = async () => {
    mEventHandlers.forEach(function (item, index) {
      item.marker.removeEventListener("click", item.func);
    });
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "MAP_STYLE", // map styling here; streets and other miscellaneous stuff were removed here
      center: [lng, lat],
      zoom: zoom,
    });

    // add zoom control
    const nav = new mapboxgl.NavigationControl({
      showCompass: false, // do not show compass controls so rotation of the map is not allowed (not neeeded anyway)
    });
    map.addControl(nav, "top-right");

    //Fill map with result pins
    if (searchResult != "") {
      //Sample Popup
      const popup = createPopup(
        { title: "pTitle", details: "pDetails" },
        { offset: 25 }
      );

      //Sample Pin
      const marker = new mapboxgl.Marker({ color: "#9A00FF" })
        .setLngLat([-122.414, 37.776])
        .setPopup(popup)
        .addTo(map);

      // Get data for ct
      const mElement = marker.getElement();
      const mHandler = () => {
        mEvent("nctId");
      };
      mElement.addEventListener("click", mHandler);
      mEventHandlers.push({ marker: mElement, func: mHandler });
    }

    // cleanup function to remove map on unmount
    return () => {
      map.remove();
      removeMarkerEvents();
    };
  }, [searchResult]); // update map whenever searchResult changes

  return (
    <>
      <div className="flex justify-between">
        <Search setResult={setResult} />
      </div>
      <div ref={mapContainer} className="map_container" />
    </>
  );
}

function mEvent(nctId: string) {
  console.log("hello from marker");
}

function createPopup(
  popupInfo: pInfo,
  pOptions?: mapboxgl.PopupOptions | undefined
) {
  const popup = new mapboxgl.Popup(pOptions);
  const pContainer = document.createElement("div");
  createRoot(pContainer).render(
    <MPopup title={popupInfo.title} details={popupInfo.details} />
  );
  popup.setDOMContent(pContainer);
  return popup;
}
