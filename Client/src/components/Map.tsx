"use client";

import { MPopupMenu, pInfo } from "./MPopupMenu";
import Search from "@/components/Search";
import Tabs from "./Tabs/Tabs";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Loader from "./Loader";
import About from "./About";

mapboxgl.accessToken =
  "MAP_TOKEN";

export default function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);
  const [place, setPlace] = useState<{} | null>(null);

  //Get and store data from search result
  const [searchResult, setResult] = useState({});
  const [filterValue, setFilter] = useState<{} | null>(null);
  const mEventHandlers: { marker: HTMLElement; func: () => void }[] = [];

  // page stuff
  const pageTokens = useRef<string[]>([]); // array indices compared to page number are off by 2 (instead of 1 by default) because first page's token is never stored (it's always null)
  const maxPageIndex = useRef(0);
  const currentPageIndex = useRef(0);
  const [currentPageToken, setPageToken] = useState<string | null>(null);
  const [itemList, setItemList] = useState<{}>({});

  const removeMarkerEvents = async () => {
    mEventHandlers.forEach(function (item, index) {
      item.marker.removeEventListener("click", item.func);
    });
  };
  const locMarker = useRef<mapboxgl.Marker | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/yenlei/cllepzpeh00ha01pwed4dhdh0", // map styling here; streets and other miscellaneous stuff were removed here
      center: [lng, lat],
      zoom: zoom,
    });

    // locator control: used for finding the user's location at the click of a
    // button; located underneath the geocoder control/top right
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      showUserLocation: false,
    });
    map.current.addControl(geolocate);

    geolocate.on("geolocate", async (pos: any) => {
      const placeName = await reverseGeocode(
        pos.coords.longitude,
        pos.coords.latitude
      );
      setPlace({
        lng: pos.coords.longitude,
        lat: pos.coords.latitude,
        name: placeName,
      });
      if (locMarker.current == null)
        locMarker.current = new mapboxgl.Marker({ draggable: false });
      if (map.current)
        locMarker.current
          .setLngLat([pos.coords.longitude, pos.coords.latitude])
          .addTo(map.current);
    });

    // TRIGGER #3: user double clicks on a point on the map
    map.current.on("dblclick", async (event: any) => {
      const placeName = await reverseGeocode(
        event.lngLat.lng,
        event.lngLat.lat
      );
      setPlace({
        lng: event.lngLat.lng,
        lat: event.lngLat.lat,
        name: placeName,
      });
      if (locMarker.current == null)
        locMarker.current = new mapboxgl.Marker({ draggable: false });
      if (map.current)
        locMarker.current
          .setLngLat([event.lngLat.lng, event.lngLat.lat])
          .addTo(map.current);
    });

    // add zoom control
    const nav = new mapboxgl.NavigationControl({
      showCompass: false, // do not show compass controls so rotation of the map is not allowed (not neeeded anyway)
    });
    map.current.addControl(nav, "top-right");

    //Fill map with result pins
    if (!isEmpty(searchResult)) {
      const studiesLoc: {
        marker: mapboxgl.Marker;
        location: number[];
        studies: pInfo[];
      }[] = [];
      let colors = new Set();

      for (var key in searchResult) {
        let curColor = getRandomColor();
        while (colors.has(curColor)) {
          curColor = getRandomColor();
        }
        const study: any = searchResult[key as keyof {}];

        // first fill in studiesLoc (this will group together studies in similar facilities)
        for (let i = 0; i < study.geolocations.length; i++) {
          const num = findLocIndex(studiesLoc, study.geolocations[i]);

          const addItem = () => {
            setItemList((prev) => ({
              ...prev,
              [study.nctId]: {
                nctId: study.nctId,
                title: study.title,
                sponsor: study.sponsor,
                conditions: study.conditions,
              },
            }));
          };

          const remItem = () => {
            setItemList((prev) => ({
              ...prev,
              [study.nctId]: null,
            }));
          };

          if (num == -1) {
            const marker = new mapboxgl.Marker({ color: curColor })
              .setLngLat(study.geolocations[i])
              .addTo(map.current);

            studiesLoc.push({
              marker: marker,
              location: study.geolocations[i],
              studies: [
                {
                  id: study.nctId,
                  title: study.title,
                  studyStart: study.studyStart,
                  studyType: study.studyType,
                  phase: study.phase,
                  facility: study.facility,
                  removeItem: remItem,
                  addItem: addItem,
                },
              ],
            });
          } else {
            const studies = studiesLoc[num].studies;
            studies.push({
              id: study.nctId,
              title: study.title,
              studyStart: study.studyStart,
              studyType: study.studyType,
              phase: study.phase,
              facility: study.facility,
              removeItem: remItem,
              addItem: addItem,
            });
            studiesLoc[num].studies = studies;
          }
        }
      }

      // then create popups for all of the locations
      // since we previously grouped together same-facility-studies,
      // only one marker and popup will be used per location
      // and the popup will be adjusted according to how many studies
      // are done at the specific location
      for (let i = 0; i < studiesLoc.length; i++) {
        const marker = studiesLoc[i].marker;
        const mElement = marker.getElement();

        //Create Popup on marker click
        const mHandler = () => {
          const popup = createPopup(studiesLoc[i].studies, { offset: 25 });
          marker.setPopup(popup).togglePopup();
        };
        mElement.addEventListener("click", mHandler);
        mEventHandlers.push({ marker: mElement, func: mHandler });
      }
    }

    // cleanup function to remove map on unmount
    return () => {
      if (map.current) map.current.remove();
      removeMarkerEvents();
    };
  }, [searchResult]); // update map whenever searchResult changes

  // Show loader when results have not finished fetching
  const [loader, setLoader] = useState(false);

  // default to 50 results per page
  const [pageSize, setPageSize] = useState("1");

  return (
    <>
      <div
        ref={mapContainer}
        className="relative w-auto min-h-screen bg-black"
      />
      <div className="absolute flex justify-between gap-3 m-5">
        <Search
          setResult={setResult}
          filterValue={filterValue}
          pageTokens={pageTokens}
          maxPageIndex={maxPageIndex}
          currentPageIndex={currentPageIndex}
          currentPageToken={currentPageToken}
          setLoader={setLoader}
          pageSize={pageSize}
        />
      </div>

      <div className="absolute m-5 bottom-10 text-black bg-slate-200 w-96 h-[40rem]">
        <Tabs
          searchResult={searchResult}
          setFilter={setFilter}
          place={place}
          locMarker={locMarker}
          map={map}
          setPlace={setPlace}
          setPageSize={setPageSize}
          pageTokens={pageTokens}
          maxPageIndex={maxPageIndex}
          currentPageIndex={currentPageIndex}
          setPageToken={setPageToken}
          itemList={itemList}
        />
      </div>

      <About />

      <Loader loader={loader} />
    </>
  );
}

function findLocIndex(
  studiesLoc: {
    marker: mapboxgl.Marker;
    location: number[];
    studies: pInfo[];
  }[],
  location: number[]
) {
  for (let i = 0; i < studiesLoc.length; i++) {
    if (
      studiesLoc[i].location[0] == location[0] &&
      studiesLoc[i].location[1] == location[1]
    ) {
      return i;
    }
  }
  return -1;
}

function createPopup(
  popupInfo: pInfo[],
  pOptions?: mapboxgl.PopupOptions | undefined
) {
  const popup = new mapboxgl.Popup(pOptions);
  const pContainer = document.createElement("div");
  createRoot(pContainer).render(<MPopupMenu studies={popupInfo} />);
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
  const ct_location_ep = "http://localhost:8080/api/mb/location";
  let placeName = "";
  await fetch(`${ct_location_ep}/${longitude},${latitude}`).then(
    async (res) =>
      await res.json().then((data) => {
        // after the data is fetched then get the place name
        placeName = data.locationResult;
      })
  );
  return placeName;
}
