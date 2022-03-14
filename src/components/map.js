import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import './map.css';

export default function Map(){
  const mapContainer = useRef(null);
  const map = useRef(null);
  //copenhagen 12.549133, 55.666742
  const [lng] = useState(12.549133);
  const [lat] = useState(55.666742);
  const [zoom] = useState(17);
  const [API_KEY] = useState('1JIfeS9SHvVJt8fORsPr');

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
   //   style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
  //    style: "https://github.com/jl96032/react-maplibre-app/blob/master/public/osm_liberty.json?",
      //  style: "http://localhost/osm_liberty-localhost.json",
   //   style: "http://localhost:3001/osm_liberty.json",
     // style: "https://master.d34xthyk9j1ki2.amplifyapp.com/osm_liberty.json",
      style: "./osm_liberty.json",
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
/*
    map.current.on('load', function () {
      map.current.addSource('osm', {
        'type': 'vector',
     //   "tiles": ["http://localhost:8080/maps/bonn/{z}/{x}/{y}.vector.pbf?"],
        "tiles": ["https://localhost:8080/maps/osm/{z}/{x}/{y}.vector.pbf?"],
        "tolerance": 0
      });
    
   /*   map.current.addLayer({
        // [Perry] You could try with main_roads or lakes for id and source-layer
        "id": "roads",
       // "source": "bonn",
        "source": "osm",
        "source-layer": "roads",
        "type": "line",
        "paint": {
          "line-color": "#FF0000",
          "line-width": 1
        }
      });*/
  //  });*/
    
  });

  
  
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}