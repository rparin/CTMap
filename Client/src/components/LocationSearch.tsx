import React, { useEffect, MutableRefObject, SetStateAction } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function LocationSearch({
  setPlace,
  place,
}: {
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  place: string;
}) {
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false, // do not display a marker on location so that results markers can be seen
      placeholder: "Search by city, state, etc.",
    });
    geocoder.addTo("#geocoder-container");
    geocoder.setInput(place);
    geocoder.setMinLength(place.length + 1);

    // ** every event will change the current place name value, as well as place a marker on the map **
    // TRIGGER #1: user selects a location from the location searchbar dropdown
    geocoder.on("result", (event: any) => {
      // no need for reverse geocoding here since we searched for the place name directly
      setPlace(event.result.place_name);
      // locMarker.setLngLat(event.result.center).addTo(map);
    });

    geocoder.on("clear", (event: any) => {
      geocoder.setMinLength(1);
      setPlace("");
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
