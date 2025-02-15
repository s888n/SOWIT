import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
// import MapSearch from "./map-searchbox";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import * as turf from '@turf/turf';
import * as turf from '@turf/turf';
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-style-switcher/styles.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import GlobeMinimap from "mapbox-gl-globe-minimap";
// import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher"
// const styles: MapboxStyleDefinition[] = [
//   {
//       title: "Dark",
//       uri:"mapbox://styles/mapbox/dark-v11"
//   },
//   {
//       title: "Light",
//       uri:"mapbox://styles/mapbox/light-v11"
//   }
// ];

// const SaveDialog = ({polygonData}: {polygonData: any}) => {
const ACCESS_TOKEN = "pk.eyJ1Ijoic3JhY2hkaSIsImEiOiJjbTZ3ZDBlNDkwaGVsMmtza2tlbWJ1ZTl5In0.MPXsQSgDRg73oG5-oRrggw";
const USERNAME = "srachdi";
import { SavePolygonDialog } from "./save-polygon-modal";
import { useState } from "react";
export function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [polygonData, setPolygonData] = useState<any>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [thumbnailURL, setThumbnailURL] = useState("");
  // const [activeLayerNames, setActiveLayerNames] = useState<string[]>([]);
  // const fullScreen = new mapboxgl.FullscreenControl();
  // const navigation = new mapboxgl.NavigationControl();
  //   const geolocate = new mapboxgl.GeolocateControl({
  //     positionOptions: {
  //         enableHighAccuracy: true
  //     },
  //     trackUserLocation: true
  // });
  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-91.874, 42.76],
      zoom: 5,
    });

    // mapRef.current.on("load", function () {
    // mapRef.current.addControl(fullScreen);
    // mapRef.current.addControl(navigation);
    // mapRef.current.addControl(geolocate);
    // mapRef.current.addControl(
    //     new GlobeMinimap({
    //         landColor: "#4ebf6e",
    //         waterColor: "#8dcbe3"
    //     }),
    //     "bottom-left"
    // );
    // mapRef.current.addControl(new MapboxStyleSwitcherControl(styles, 'Dark'));
    // });
    // draw controls
    const draw = new MapboxDraw({
      // userProperties: true,
      styles: drawStyles,
      displayControlsDefault: false,
      controls: {
        polygon: true,
      },
      defaultMode: "draw_polygon",
    });
    mapRef.current.addControl(draw);
    mapRef.current.on("draw.create", function (e) {
      console.log(e);
      setShowSaveDialog(true);
      setPolygonData(e.features[0]);
      const thumbnailURL = fetchThumbnail(e.features[0].geometry, "#FF0000");
      setThumbnailURL(thumbnailURL);
      // const features = e.features;
      // if (features.length) {
      //   var data = draw.getAll() as any; // Add type assertion here
      //   console.log(data.features[0].geometry);
      //   // show the save form here
      // }
    });

    mapRef.current.on("load", () => {
      // add all the polygons to the map as invisible
      // adding the source
      // Polygons.forEach((polygon) => { 
      //   mapRef.current?.addSource(polygon.name, {
      //     type: "geojson",
      //     data: {
      //       type: "Feature",
      //       properties: {},
      //       geometry: polygon.geometry,
      //     },
      //   });
      //   // adding the layers
      //   mapRef.current?.addLayer({
      //     id: polygon.name,
      //     type: "fill",
      //     source: polygon.name,
      //     layout: {
      //       visibility: polygon.visibility,
      //     },
      //     paint: {
      //       "fill-color": polygon.color,
      //       "fill-opacity": 0.5,
      //     },
      //   });
      // }
      // );
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);


  useEffect(() => {
    if (!mapRef.current) return;
  }, []);
  const onClose = () => {
  //  remove the polygon from the map
    // mapRef.current?.removeLayer(polygonData.name);
    setShowSaveDialog(false);
  }

  return (
    <div className=" w-full h-[50vh] md:h-[calc(100vh-5rem)] flex items-center justify-cente">
      {/* <MapSearch /> */}
      <SavePolygonDialog polygon={mockPolygon} isOpen={showSaveDialog} onClose={() => setShowSaveDialog(false)} imageSource={thumbnailURL} />
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

const drawStyles = [
  // polygon fill
  {
    id: "gl-draw-polygon-fill",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": "#D20C0C",
      "fill-outline-color": "#000",
      "fill-opacity": 0.5,
    },
  },
];


const mockPolygon = {
  id: "1",
  name: "Polygon 1",
  color: "#D20C0C",
  thumbnail: "/polygon.png",
  region: "North",
  area: 100,
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-91.44552969345338, 45.58637769684887],
        [-93.88964918375137, 45.2622563921187],
        [-99.76197520308756, 41.00640553785337],
        [-91.44552969345338, 45.58637769684887],
      ],
    ],
  },
};

const fetchThumbnail = (geometry: any,color :string) => {
  console.log(geometry);
  const features= {
    "type": "Feature",
    "properties": {
      "fill-color": color,
      "fill-opacity": 0.5,
      "stroke-color": "#000000",
      "stroke-width": 2
    },
    "geometry": geometry
  }
  // const center =  turf.centroid(geometry).geometry.coordinates;
  // const zoom = 10;
  // const bearing = 0;
  // const pitch = 60;
  // console.log(center);
  // const thumbnailURL = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${center[0]},${center[1]},${zoom},${bearing},${pitch}/400x400?access_token=${ACCESS_TOKEN}`;
  //   // const thumbnailURL = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${bounds.join(
  //   //   ","
  //   // )}/600x400?access_token=${mapboxgl.accessToken}`;
  //   // console.log(thumbnailURL);
  //   return thumbnailURL;
  // https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geojson({encoded_geojson})/auto/600x400?access_token=YOUR_MAPBOX_ACCESS_TOKEN
  const encodedGeoJSON = encodeURIComponent(JSON.stringify(features));
  const thumbnailURL = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geojson(${encodedGeoJSON})/auto/600x400?access_token=${ACCESS_TOKEN}`;

  return thumbnailURL;
}




  // const generateThumbnail = (geoJSONData?: any) => {
  //   // https://api.mapbox.com/styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}|{bbox}|{auto}/{width}x{height}{@2x}?access_token={your_access_token}
  //   // const bounds = turf.bbox(geoJSONData || polygonData);
  //   const bounds = turf.bbox(geoJSONData
  //   const thumbnailURL = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${bounds.join(
  //     ","
  //   )}/600x400?access_token=${mapboxgl.accessToken}`;
  //   setThumbnailURL(thumbnailURL);
  // }
