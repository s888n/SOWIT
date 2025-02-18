import { Header } from "@/components/dashboard-header";
import { PolygonList } from "@/components/polygon-list";
import { Map } from "@/components/dashboard-map";
import { createPolygon, getPolygons, deletePolygon } from "@/api/api";
// import { PolygonModal } from "@/components/edit-polygon-modal";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
interface Polygon {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  area: number;
  coordinates: any;
}
export default function DashboardPage() {
  const { auth } = useAuth();
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [selectedPolygon, setSelectedPolygon] = useState<Polygon | null>(null);

  // fetch the polygons from the backend
  const fetchPolygons = async () => {
    try {
      const data = await getPolygons();
      setPolygons(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (polygon: Polygon) => {
    setSelectedPolygon(polygon);
  };
  // this will add in the future
  const handleEdit = (polygon: Polygon) => {
    console.log("Edit", polygon);
    // fetchPolygons();
  };

  const handleDelete = (polygon: Polygon) => {
    console.log("Delete", polygon);
    const id = polygon.id;
    deletePolygon(id);
    setPolygons(polygons.filter((p) => p.id !== id));
  };
  const handleSave = (
    name: string,
    description: string,
    area: number,
    coordinates: any,
    thumbnail: string
  ) => {
    try {
      createPolygon(name, description, area, coordinates, thumbnail).then(
        (data) => {
          setPolygons([...polygons, data]);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPolygons();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header username={auth.user.username} avatar={auth.user.avatar} /> */}
      {auth.user && (
        <Header username={auth.user.username} avatar={auth.user.avatar} />
      )}
      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-2/5 lg:w-1/3 p-4 border-b md:border-b-0 md:border-r order-last md:order-first">
          <h2 className="text-xl font-semibold mb-4">Polygons</h2>
          <PolygonList
            polygons={polygons}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
        <div className="w-full md:w-3/5 lg:w-2/3 order-first md:order-last">
          <Map
            polygons={polygons}
            selectedPolygon={selectedPolygon}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleView={handleView}
            handleSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
