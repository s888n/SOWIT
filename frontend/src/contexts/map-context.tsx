// Objectives:
//  Creating a context for the map
// a user can :
// - draw a polygon on the map , once the polygon is drawn a popup should appear asking for
//     the name and color of the polygon and also display the area and region and image of the polygon

//  each polygon card should have 3 buttons:
// - delete a polygon
// - edit a polygon's name and color but not the shape
// - view a polygon on the map (once the button clicked use flyto() to the polygon) , multiple polygons can be viewed at the same time

// - the context:
//     - should have an array of polygons
//     - should have a function to add a polygon
//     - should have a function to delete a polygon

//  api:
//  - /api/polygons/:id - GET => returns a single polygon
//  - /api/polygons - GET => returns all the polygons for the user
//  - /api/polygons - POST => creates a new polygon
//  - /api/polygons/:id - DELETE => deletes a polygon
//  - /api/polygons/:id - PUT => updates a polygon
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
const axiosconfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
// const mockPolygons = [
//   {
//     id: "1",
//     color: "red",
//     thumbnail: "/polygon.png",
//     name: "Polygon 1",
//     region: "North",
//     area: 100,
//   },
//   {
//     id: "2",
//     color: "red",
//     thumbnail: "/polygon.png",
//     name: "Polygon 2",
//     region: "South",
//     area: 150,
//   },
//   {
//     id: "3",
//     color: "red",
//     thumbnail: "/polygon.png",
//     name: "Polygon 3",
//     region: "East",
//     area: 200,
//   },
//   {
//     id: "4",
//     color: "red",
//     thumbnail: "/polygon.png",
//     name: "Polygon 4",
//     region: "West",
//     area: 120,
//   },
//   {
//     id: "5",
//     color: "red",
//     thumbnail: "/polygon.png",
//     name: "Polygon 5",
//     region: "Central",
//     area: 180,
//   },
// ];

import { getPolygons } from "@/api/api";
export const MapContext = createContext<any>(null);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [polygons, setPolygons] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState<any>(null);
  const [currentPolygonIndex, setCurrentPolygonIndex] = useState<number>(0);
  


  useEffect(() => {
    const fetchPolygons = async () => {
      try {
        const data = await getPolygons();
        setPolygons(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPolygons();
  }, []);

  const updatePolygons = useCallback(async () => {
    try {
      const data = await getPolygons();
      setPolygons(data);
    } catch (error) {
      console.error(error);
    }
  }, []);


  const value = {
    polygons,
    updatePolygons,
    showModal,
    setShowModal,
    currentPolygon,
    setCurrentPolygon,
    currentPolygonIndex,
    setCurrentPolygonIndex,
  };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};