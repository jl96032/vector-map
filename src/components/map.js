import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams  } from 'react-router-dom'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';


function Map(props){

  const [isChecked, setIsChecked] = useState(false);
  

  

  const location = useLocation();
 // console.log("pathname", location.pathname);

  const mapContainer = useRef(null);
  let map = useRef(null);
  //copenhagen 12.549133, 55.666742
  let navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  let { z1 , lat1, lng1 } = useParams() // props.match?.lng1
  //let showCollisionBoxes = props.showCollisionBoxes;
  z1 = z1 || 15;
  lat1 = lat1 || 55.666;
  lng1 = lng1 || 12.549;
  
  
  
  const [lng, setLng] = useState(lng1);
  const [lat, setLat] = useState(lat1);
  const [zoom, setZoom] = useState(z1);

  
  const [API_KEY] = useState('1JIfeS9SHvVJt8fORsPr');
  const [x, setX] = useState()
  const [y, setY] = useState()

   const [searchParams, setSearchParams] = useSearchParams();
   // set search params on url
   //setSearchParams({ hello: "world"  });
  
   const handleOnChange = () => {
    setIsChecked(!isChecked);
    setRefresh(true);
    setcollisionControl(!isChecked);
       // navigate("/");
  };

  //console.log("reading params", useParams(), lng, lat);
  //12.549133, 55.666742, 10.0
  const [collisionControl, setcollisionControl] = useState(false);
  useEffect(() => {
    // console.log("pathname", location.pathname);
    // console.log(`/something/${z1}/${lat1}/${lng1}`);
    // setcollisionControl(searchParams.get("hello"));
    searchParams.get("hello") && console.log("searchParams found:", searchParams.get("hello"));
    
  }, [searchParams, collisionControl]);
  
  useEffect(() => {
   // if (map.current) return;
  
  if (refresh === false && map.current!==null ) return

  setRefresh(false);
    map.current = new maplibregl.Map({
      container: mapContainer.current,
   //   style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
  //    style: "https://github.com/jl96032/react-maplibre-app/blob/master/public/osm_liberty.json?",
      //  style: "http://localhost/osm_liberty-localhost.json",
   //   style: "http://localhost:3001/osm_liberty.json",
     // style: "https://master.d34xthyk9j1ki2.amplifyapp.com/osm_liberty.json",
      style: "/osm_liberty.json",
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(new maplibregl.NavigationControl());
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('moveend', () => {
      var tmpZ= map.current.getZoom().toFixed(2);
      var tmpLng = map.current.getCenter().lng.toFixed(4);
      var tmpLat = map.current.getCenter().lat.toFixed(4);
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      
   //   console.log("move end, temp z",tmpZ, tmpLat, tmpLng);
   //   console.log("move end, zoom ",zoom, lat, lng);
      navigate(`../${tmpZ}/${tmpLat}/${tmpLng}`);
   //   console.log("collisionControl", collisionControl);
      });
    

    // shows the collision box on texts, even line texts
    // map.current.showCollisionBoxes = props.showCollisionBoxes;
    map.current.showCollisionBoxes = collisionControl;

    
  },[collisionControl, refresh, lat, lng, navigate, zoom]);
  
 
  useEffect(
    () => {
      const update = (e) => {
        setX(e.x)
        setY(e.y)
      }
      window.addEventListener('mousemove', update)
      window.addEventListener('touchmove', update)
      return () => {
        
        window.removeEventListener('mousemove', update)
        window.removeEventListener('touchmove', update)
      }
    },
    [x, y]
  )
  
  return (
    <div className="map-wrap">
      {/* { <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        <h1>{`x: ${x}; y: ${y}}`}</h1>
      </div> } */}
      <div className="topping">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleOnChange}
        />
        ShowCollisionBoxes {isChecked ? "checked" : "unchecked"}.
      </div>
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export {Map};