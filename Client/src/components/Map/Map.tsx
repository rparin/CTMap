'use client';

import "./Map.css";

import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useRef, useEffect, useState } from 'react';
 
mapboxgl.accessToken = MAP_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,  // map styling here; streets and other miscellaneous stuff were removed here
      center: [lng, lat],
      zoom: zoom
    });

    // add zoom control
    const nav = new mapboxgl.NavigationControl({
      showCompass: false  // do not show compass controls so rotation of the map is not allowed (not neeeded anyway)
    });
    map.current.addControl(nav, "top-right");

  });

  return <div ref={mapContainer} className="map_container" />;
}
