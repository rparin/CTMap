"use client";

import "./Map.css";
import MPopup from "../MPopup";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

mapboxgl.accessToken =
  "MAP_TOKEN";

export default function Map() {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "MAP_STYLE", // map styling here; streets and other miscellaneous stuff were removed here
      center: [lng, lat],
      zoom: zoom,
    });

    // add zoom control
    const nav = new mapboxgl.NavigationControl({
      showCompass: false, // do not show compass controls so rotation of the map is not allowed (not neeeded anyway)
    });
    map.current.addControl(nav, "top-right");

    //Sample Popup
    const popup = new mapboxgl.Popup({ offset: 25 });
    const pContainer = document.createElement("div");
    createRoot(pContainer).render(
      <MPopup title={"pTitle"} details={"pDetails"} />
    );
    popup.setDOMContent(pContainer);

    //Sample Pin
    const marker = new mapboxgl.Marker()
      .setLngLat([-122.414, 37.776])
      .setPopup(popup)
      .addTo(map.current);

    // cleanup function to remove map on unmount
    return () => map.remove();
  }, []); // adding the empty dependency array ensures that the map is only rendered once

  return <div ref={mapContainer} className="map_container" />;
}
