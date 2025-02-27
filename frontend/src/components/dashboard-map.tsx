import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-style-switcher/styles.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

interface Polygon {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  area: number;
  coordinates: any;
}
interface MapProps {
  polygons: Polygon[];
  selectedPolygon: Polygon | null;
  handleView: (polygon: Polygon) => void;
  handleEdit: (polygon: Polygon) => void;
  handleDelete: (polygon: Polygon) => void;
  handleSave: (
    name: string,
    description: string,
    area: number,
    coordinates: any,
    thumbnail: string
  ) => void;
}

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

import { SavePolygonDialog } from "./save-polygon-modal";
import { useState } from "react";
export function Map({ polygons, selectedPolygon, handleSave }: MapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const drawRef = useRef<null>(null);
  const [newPolygon, setNewPolygon] = useState<any | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const fullScreen = new mapboxgl.FullscreenControl();
  const navigation = new mapboxgl.NavigationControl();
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  });

  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-7.5898, 33.5731],
      zoom: 10,
    });

    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        line_string: false,
      },
      defaultMode: "draw_polygon",
    });
    // add controls
    mapRef.current?.addControl(drawRef.current);
    mapRef.current.on("load", function () {
      mapRef.current?.addControl(fullScreen);
      mapRef.current?.addControl(navigation);
      mapRef.current?.addControl(geolocate);
    });
    mapRef.current.on("draw.create", handleDrawCreate);

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !drawRef.current) return;
    drawRef.current?.deleteAll();
    polygons.forEach((polygon) => {
      if (polygon.coordinates) {
        const feature = {
          id: polygon.id,
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: polygon.coordinates,
          },
        };
        drawRef.current.add(feature);
      }
    });
  }, [polygons]);

  useEffect(() => {
    if (mapRef.current && selectedPolygon) {
      console.log("Selected Polygon", selectedPolygon);
      const center = turf.centroid(turf.polygon(selectedPolygon.coordinates));
      const coordinates = center.geometry.coordinates as [number, number]; // Convert Position to [number, number]
      mapRef.current.flyTo({
        center: coordinates,
        zoom: 10,
        essential: true,
      });
    }
  }, [selectedPolygon, mapRef.current]);

  const onClose = () => {
    setShowSaveDialog(false);
    setNewPolygon(null);
    if (drawRef.current) {
      const allFeatures = drawRef.current.getAll();
      if (allFeatures.features.length > 0) {
        drawRef.current.delete(
          allFeatures.features[allFeatures.features.length - 1].id
        );
      }
    }
  };

  const handleDrawCreate = (e: any) => {
    const features = (e as any).features[0];
    const geometry = features.geometry;
    const coordinates = geometry.coordinates;
    const area = turf.area(turf.polygon(coordinates));
    const thumbnailURL = fetchThumbnail(features.geometry, "#FF0000");
    setNewPolygon({
      area,
      coordinates,
      thumbnailURL,
    });
    setShowSaveDialog(true);
  };

  return (
    <div className=" w-full h-[50vh] md:h-[calc(100vh-5rem)] flex items-center justify-cente">
      <SavePolygonDialog
        area={newPolygon?.area}
        thumbnailURL={newPolygon?.thumbnailURL}
        coordinates={newPolygon?.coordinates}
        isOpen={showSaveDialog}
        onClose={onClose}
        handleSave={handleSave}
      />
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

const fetchThumbnail = (geometry: any, color: string) => {
  console.log(geometry);
  const features = {
    type: "Feature",
    properties: {
      "fill-color": color,
      "fill-opacity": 0.5,
      "stroke-color": "#000000",
      "stroke-width": 2,
    },
    geometry: geometry,
  };
  const encodedGeoJSON = encodeURIComponent(JSON.stringify(features));
  const thumbnailURL = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geojson(${encodedGeoJSON})/auto/600x400?access_token=${ACCESS_TOKEN}`;

  return thumbnailURL;
};
