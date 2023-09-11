import React, { useEffect, SetStateAction } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function LocationSearch({
  setPlace,
  place,
}: {
  setPlace: React.Dispatch<SetStateAction<{} | null>>;
  place: {} | null;
}) {
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false, // do not display a marker on location so that results markers can be seen
      placeholder: "Search by city, state, etc.",
    });

    geocoder.addTo("#geocoder-container");

    //Update geocoder input on double click or on Geolocate
    if (place) {
      const inputElements = document.getElementsByClassName(
        "mapboxgl-ctrl-geocoder--input"
      );

      if (inputElements.length > 0) {
        (inputElements[0] as any).value = (place as any).name;
      }
    }

    // ** every event will change the current place name value, as well as place a marker on the map **
    // TRIGGER #1: user selects a location from the location searchbar dropdown
    geocoder.on("result", (event: any) => {
      // no need for reverse geocoding here since we searched for the place name directly
      setPlace({
        lng: event.result.center[0],
        lat: event.result.center[1],
        name: event.result.place_name,
      });
    });

    geocoder.on("clear", (event: any) => {
      setPlace(null);
    });

    return () => {
      geocoder.onRemove();
    };
  }, [place]);

  return (
    <>
      <div id="geocoder-container"></div>
    </>
  );
}
