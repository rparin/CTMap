"use client";

import "./Map.css";
import MPopup, { pInfo } from "../MPopup";
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
  const mEventHandlers: { marker: HTMLElement; func: () => void }[] = [];

  const removeMarkerEvents = async () => {
    mEventHandlers.forEach(function (item, index) {
      item.marker.removeEventListener("click", item.func);
    });
  };

  useEffect(() => {
    const tabsContainer = document.querySelector("[role=tablist]");
    const tabButtons = tabsContainer!.querySelectorAll("[role=tab]");
    const tabPanels = document.querySelectorAll("[role=tabpanel]");

    function switchTab(newTab: any) {
      const activePanelId = newTab.getAttribute("aria-controls");
      const activePanel = tabsContainer!.nextElementSibling!.querySelector(
        "#" + CSS.escape(activePanelId)
      );
      tabButtons.forEach((button) => {
        button.setAttribute("aria-selected", "false");
        button.setAttribute("tabindex", "-1");
      });

      tabPanels.forEach((panel) => {
        panel.setAttribute("hidden", "true");
      });

      activePanel!.removeAttribute("hidden");

      newTab.setAttribute("aria-selected", true);
      newTab.setAttribute("tabindex", "0");
      newTab.focus();
    }

    tabsContainer!.addEventListener("click", (e) => {
      const clickedTab = (e.target! as HTMLElement).closest("button");
      const currentTab = tabsContainer!.querySelector('[aria-selected="true"]');

      if (!clickedTab || clickedTab === currentTab) return;

      switchTab(clickedTab);
    });

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

        {/* Todo add location search bar here */}
      </div>

      <div className="absolute m-5 bottom-10 wrapper text-black">
        <div className="bg-slate-200 w-96 h-[40rem]">
          <Tabs />
        </div>
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
