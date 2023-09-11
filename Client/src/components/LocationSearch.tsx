import React, { useEffect, useState } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function LocationSearch() {
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false, // do not display a marker on location so that results markers can be seen
      placeholder: "Search location",
    });
    geocoder.addTo("#geocoder-container");
  }, []);

  return (
    <>
      <div id="geocoder-container"></div>
    </>
  );
}
