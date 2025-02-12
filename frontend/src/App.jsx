import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./App.css";
const paragraphStyle = {
  fontFamily: "Open Sans",
  margin: 0,
  fontSize: 13,
};

const ACCESS_TOKEN ="pk.eyJ1Ijoic3JhY2hkaSIsImEiOiJjbTZ3ZDBlNDkwaGVsMmtza2tlbWJ1ZTl5In0.MPXsQSgDRg73oG5-oRrggw"
function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const fullScreen = new mapboxgl.FullscreenControl();
  const navigation = new mapboxgl.NavigationControl();
  const [roundedArea, setRoundedArea] = useState();

  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-91.874, 42.76],
      zoom: 5
    });
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });
    // const geocoder = new MapboxGeocoder({
      //   accessToken: ACCESS_TOKEN,
      //   mapboxgl: mapboxgl,
      // });
      mapRef.current.addControl(draw, "top-left");
      mapRef.current.addControl(fullScreen);
      mapRef.current.addControl(navigation);
      // mapRef.current.addControl(geocoder);
      const updateArea = (e) => {
        const data = draw.getAll();
        if (data.features.length > 0) {
          console.log("Data: ", data);
          getPolygonArea(data);
          const area = turf.area(data);
          // Restrict the area to 2 decimal points.
          const rounded_area = Math.round(area * 100) / 100;
          console.log(rounded_area + ' square meters');

      }
      };


      mapRef.current?.on('draw.create', updateArea);
      mapRef.current?.on('draw.delete', updateArea);
      mapRef.current?.on('draw.update', updateArea);
      
      return () => {
        mapRef.current.remove();
      };
    }, []);
    
  const flyToArea = () => {
    mapRef.current.flyTo({
      center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
  };

const getPolygonArea = async (polygon) => {
  const center = turf.centerOfMass(polygon);
  const latitude = center.geometry.coordinates[1];
  const longitude = center.geometry.coordinates[0];
  console.log(latitude, longitude);
  const response = await fetch(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${ACCESS_TOKEN}`);
  const data = await response.json();
  const region = data.features[0].properties.context.region.name;
  console.log(region);
  console.log(data);
}
  return (
    <div className="bg-black  flex flex-col items-center justify-center h-screen">
      <div id="map-container" ref={mapContainerRef} className="" style={{ width: "800px", height: "600px" }}></div>
      <div className=" p-4 rounded-lg mt-4">
        <button onClick={flyToArea} className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">
          Fly to Random Area
        </button>
        <p style={paragraphStyle} className="mt-4">
          {roundedArea ? `The area of the drawn polygon is ${roundedArea} square meters` : "Draw a polygon to get the area"}
        </p>
    </div>
    </div>
  );
}

export default App;

// const [isAuth, setIsAuth] = useState(false);

// const login = async () => {
//   const response = await fetch(`${baseUrl}/_allauth/app/v1/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username: "srachdi",
//       password: "sasa1221",
//     }),
//   });
//   console.log(response);
//   const data = await response.json();
//   console.log(data);
// };

// const signup = async () => {
//   const response = await fetch(`${baseUrl}/_allauth/app/v1/auth/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username: "test123",
//       email: "test123@gmail.com",
//       password: "test123@hello",
//     }),
//   });

//   const data = await response.json();
//   console.log(data);
// };

// const loginWithGoogle = async () => {
//   const googleLoginUrl = `${baseUrl}/accounts/google/login/`;
//   const response = await fetch(googleLoginUrl, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };
