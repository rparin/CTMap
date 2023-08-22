"use client";

import "./Map.css";
import MPopup, { pInfo } from "../MPopup";

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
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

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

    //Sample Popup
    const popup = createPopup(
      { title: "pTitle", details: "pDetails" },
      { offset: 25 }
    );

    //Sample Pin
    const marker = new mapboxgl.Marker()
      .setLngLat([-122.414, 37.776])
      .setPopup(popup)
      .addTo(map);

    // cleanup function to remove map on unmount
    return () => map.remove();
  }, []); // adding the empty dependency array ensures that the map is only rendered once

  return <div ref={mapContainer} className="map_container" />;
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
