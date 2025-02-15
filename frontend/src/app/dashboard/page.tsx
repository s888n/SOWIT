import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/dashboard-header";
import { PolygonList } from "@/components/polygon-list";
import { Map } from "@/components/dashboard-map";
// import { PolygonModal } from "@/components/edit-polygon-modal";
import { useEffect, useState } from "react";
import { MapProvider } from "@/contexts/map-context";

import { useNavigate } from "react-router";
export default function Home() {
  const { user, isAuthenticated, getUser } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
    getUser();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      {user && <Header username={user.username} avatar={user.avatar} />}
      <MapProvider>
        <div className="flex flex-col md:flex-row flex-1">
          {/* <PolygonDialog
            polygon={null}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          /> */}
          {/* <PolygonModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          /> */}
          <div className="w-full md:w-2/5 lg:w-1/3 p-4 border-b md:border-b-0 md:border-r order-last md:order-first">
            <h2 className="text-xl font-semibold mb-4">Polygons</h2>
            <PolygonList  setShowModal={setShowModal} />
          </div>
          <div className="w-full md:w-3/5 lg:w-2/3 order-first md:order-last">
            <Map />
          </div>
        </div>
      </MapProvider>
    </div>
  );
}
