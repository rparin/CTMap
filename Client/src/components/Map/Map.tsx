"use client";

import "./Map.css";
import MPopup, { pInfo } from "../MPopup";
import Search from "@/components/Search";
import Tabs from "../Tabs/Tabs";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

mapboxgl.accessToken =
  "MAP_TOKEN";

export default function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(5);
  const [place, setPlace] = useState('');

  //Get and store data from search result
  const [searchResult, setResult] = useState({});
  const [filterValue, setFilter] = useState<{} | null>(null);
  const mEventHandlers: { marker: HTMLElement; func: () => void }[] = [];

  const removeMarkerEvents = async () => {
    mEventHandlers.forEach(function (item, index) {
      item.marker.removeEventListener("click", item.func);
    });
  };

  const locMarker = new mapboxgl.Marker({draggable: true});

  // set initial settings and location
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "MAP_STYLE", // map styling here; streets and other miscellaneous stuff were removed here
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 10
    });

    // ------------------ ADD CONTROLS FOR MANIPULATING MAP ------------------
    // geocoder control: a built in searchbar that automatically does
    // forward geocoding (aka converts coordinates to real places)
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,    // do not display a marker on location so that results markers can be seen
      placeholder: "Search location"
    });
    map.addControl(geocoder);

    // zoom control: allows user to zoom in/out by clicking on the +/- controls
    // on the bottom right
    const nav = new mapboxgl.NavigationControl({
      showCompass: false, // do not show compass controls so rotation of the map is not allowed (not neeeded anyway)
    });
    map.addControl(nav, "bottom-right");

    // locator control: used for finding the user's location at the click of a
    // button; located underneath the geocoder control/top right
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserLocation: false
      });
    map.addControl(geolocate);
    // --------------------------- MAP CONTROLS END ---------------------------

    // ----------------------- SELECT A LOCATION EVENTS -----------------------
    // ** every event will change the current place name value, as well as place a marker on the map **
    // TRIGGER #1: user selects a location from the location searchbar dropdown
    geocoder.on('result', (event) => {
      // no need for reverse geocoding here since we searched for the place name directly
      setPlace(event.result.place_name);
      locMarker.setLngLat(event.result.center)
        .addTo(map);
    });

    // TRIGGER #2: user clicks on the "find my location button"
    geolocate.on('geolocate', async (pos) => {
      const placeName = reverseGeocode(pos.coords.longitude, pos.coords.latitude);
      setPlace(await placeName);
      locMarker.setLngLat([pos.coords.longitude, pos.coords.latitude])
        .addTo(map);
    });

    // TRIGGER #3: user double clicks on a point on the map
    map.on("dblclick", async (e) => {
      const placeName = reverseGeocode(e.lngLat.lng, e.lngLat.lat);
      setPlace(await placeName);
      locMarker.setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);
    });

    // TRIGGER #4: user drags their location pin around on map
    locMarker.on('dragend', async () => {
      const placeName = reverseGeocode(locMarker.getLngLat().lng, locMarker.getLngLat().lat);
      setPlace(await placeName);
      locMarker.setLngLat([locMarker.getLngLat().lng, locMarker.getLngLat().lat])
        .addTo(map);
    });
    // ------------------------- LOCATION EVENTS END -------------------------

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
        <Search setResult={setResult} filterValue={filterValue} />

        {/* temporarily print coordinates here for reference */}
        Place: {place}
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

// params: coordinates on map (longitude and latitude as numbers)
// returns: name of place (string) 
// ask the server for closest place in the given coordinates (since geolocate only gives users' coordinates)
// be aware that the coordinates may not be accurate so the types are limited to cities/zipcodes and higher in terms of hierarchy (so specific addresses will not be considered)
async function reverseGeocode(
  longitude: number,
  latitude: number
): Promise<string> {
  const ct_location_ep = "http://localhost:8080/api/ct/location";
  let placeName = "";
  await fetch(ct_location_ep + "/" + longitude + "," + latitude).then(async (res) =>
    await res.json().then((data) => {
      // after the data is fetched then get the place name
      placeName = data.locationResult;
    })
  );
  return placeName;
}