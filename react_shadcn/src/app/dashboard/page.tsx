// import { Header } from "@/components/dashboard-header";

// export default function DashboardPage() {

//     return (
//         <div className="flex flex-col h-screen">
//             <Header username="John Doe" />
//             <main className="flex-1 p-6 ">
//                 <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
//             </main>
//         </div>
//     );
//     }

import { Header } from "@/components/dashboard-header";
import { PolygonList } from "@/components/polygon-list";
import { Map } from "@/components/dashboard-map";

const mockPolygons = [
  {
    id: "1",
    thumbnail: "/placeholder.svg",
    name: "Polygon 1",
    region: "North",
    area: 100,
  },
  {
    id: "2",
    thumbnail: "/placeholder.svg",
    name: "Polygon 2",
    region: "South",
    area: 150,
  },
  {
    id: "3",
    thumbnail: "/placeholder.svg",
    name: "Polygon 3",
    region: "East",
    area: 200,
  },
  {
    id: "4",
    thumbnail: "/placeholder.svg",
    name: "Polygon 4",
    region: "West",
    area: 120,
  },
  {
    id: "5",
    thumbnail: "/placeholder.svg",
    name: "Polygon 5",
    region: "Central",
    area: 180,
  },
];

export default function Home() {
    return (
      <div className="min-h-screen flex flex-col">
        <Header username="John Doe" />
        <div className="flex flex-col md:flex-row flex-1">
          <div className="w-full md:w-2/5 lg:w-1/3 p-4 border-b md:border-b-0 md:border-r order-last md:order-first">
            <h2 className="text-xl font-semibold mb-4">Polygons</h2>
            <PolygonList polygons={mockPolygons} />
          </div>
          <div className="w-full md:w-3/5 lg:w-2/3 order-first md:order-last">
            <Map />
          </div>
        </div>
      </div>
    )
  }