"use client";

import "./Map.css";
import MPopup, { pInfo } from "../MPopup";
import Search from "@/components/Search";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getEventListeners } from "events";

mapboxgl.accessToken =
  "MAP_TOKEN";

export default function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(5);
  const [place, setPlace] = useState(null);
  const [cr, setCR] = useState('');

  //Get and store data from search result
  const [searchResult, setResult] = useState({});
  const mEventHandlers: { marker: HTMLElement; func: () => void }[] = [];

  const removeMarkerEvents = async () => {
    mEventHandlers.forEach(function (item, index) {
      item.marker.removeEventListener("click", item.func);
    });
  };

  // set initial settings and location
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "MAP_STYLE", // map styling here; streets and other miscellaneous stuff were removed here
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 15
    });

    // add geocoder control
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,    // do not display a marker on location so that results markers can be seen
      placeholder: "Search location"
    });
    map.addControl(geocoder);

    // result event is triggered when the user selects a result from the location search bar's dropdown menu
    // when the user searches a location via the location searchbox, set the place
    geocoder.on('result', (event) => {
      setPlace(event.result.place_name);
    });

    // add zoom control
    const nav = new mapboxgl.NavigationControl({
      showCompass: false, // do not show compass controls so rotation of the map is not allowed (not neeeded anyway)
    });
    map.addControl(nav, "bottom-right");

    // create and add user locator control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      fitBoundsOptions: {maxZoom: 5}
      });
    map.addControl(geolocate);

    // geolocate event is triggered when user click on the "use my location button"
    geolocate.on('geolocate', (pos) => {
      // ask the server for closest place in the given coordinates (since geolocate only gives users' coordinates)
      // be aware that the coordinates may not be accurate so i just limited the types to be cities/zipcodes and higher in terms of hierarchy (so specific addresses will not be considered)
      const ct_location_ep = "http://localhost:8080/api/ct/location";
      fetch(ct_location_ep + "/" + pos.coords.longitude + "," + pos.coords.latitude).then((res) =>
        res.json().then((data) => {
          // after the data is fetched then set the place to the first place in the results
          console.log(data.locationResult);
          setPlace(data.locationResult);
        })
      );
    });

    //Fill map with result pins
    if (!isEmpty(searchResult)) {
      let colors = new Set();
      for (var key in searchResult) {
        let nctId = key;
        let curColor = getRandomColor();
        while (colors.has(curColor)) {
          curColor = getRandomColor();
        }
        const arr: any[] = searchResult[key as keyof {}];
        for (let i = 0; i < arr.length; i++) {
          const marker = new mapboxgl.Marker({ color: curColor })
            .setLngLat(arr[i])
            .addTo(map);
          const mElement = marker.getElement();

          //Create Popup on marker click
          const mHandler = () => {
            const popup = createPopup(
              { title: nctId, details: "pDetails" },
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
        <Search setResult={setResult} />

        {/* temporarily print coordinates here for reference */}
        Place: {place}
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
    <MPopup title={popupInfo.title} details={popupInfo.details} />
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
