import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
// import MapSearch from "./map-searchbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-style-switcher/styles.css";
import GlobeMinimap from "mapbox-gl-globe-minimap";
import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher"
const styles: MapboxStyleDefinition[] = [
  {
      title: "Dark",
      uri:"mapbox://styles/mapbox/dark-v11"
  },
  {
      title: "Light",
      uri:"mapbox://styles/mapbox/light-v11"
  }
];

export function Map() {
  const mapRef = useRef<unknown | null>(null);
  const mapContainerRef = useRef<unknown | null>(null);
  const fullScreen = new mapboxgl.FullscreenControl();
  const navigation = new mapboxgl.NavigationControl();
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
useEffect(() => {
  mapboxgl.accessToken = "pk.eyJ1Ijoic3JhY2hkaSIsImEiOiJjbTZ3ZDBlNDkwaGVsMmtza2tlbWJ1ZTl5In0.MPXsQSgDRg73oG5-oRrggw";
  mapRef.current = new mapboxgl.Map({
    container: mapContainerRef.current,
    center: [-91.874, 42.76],
    zoom: 5,
  });
  
  
  mapRef.current.on("load", function () {
    mapRef.current.addControl(fullScreen);
    mapRef.current.addControl(navigation);
    mapRef.current.addControl(geolocate);
    mapRef.current.addControl(
        new GlobeMinimap({
            landColor: "#4ebf6e",
            waterColor: "#8dcbe3"
        }),
        "bottom-left"
    );
    mapRef.current.addControl(new MapboxStyleSwitcherControl(styles, 'Dark'));
});

    return () => {
      mapRef.current?.remove();
    };
  }, []);
  return (
    <div className=" w-full h-[50vh] md:h-[calc(100vh-5rem)] flex items-center justify-cente">
      {/* <MapSearch /> */}
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
