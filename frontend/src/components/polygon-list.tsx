import { PolygonCard } from "./polygon-card"
import { useMap } from "@/contexts/map-context"
interface Polygon {
  id: string
  name: string
  color: string
  thumbnail: string
  region: string
  area: number
  geometry: any
}

interface PolygonListProps {
  setShowModal: (value: boolean) => void
}

export function PolygonList({
  setShowModal
 }: PolygonListProps) {
    const { polygons } = useMap()
    return (
      <div className="overflow-y-auto h-[calc(50vh-5rem)] md:h-[calc(100vh-10rem)] pr-2">
        {polygons.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">No polygons found</div>
        ) : (
          <>
            {polygons.map((polygon: Polygon) => (
              <PolygonCard
                key={polygon.id}
                {...polygon}
                onView={() => console.log("View", polygon.id)}
                onEdit={() => setShowModal(true)}
                onDelete={() => console.log("Delete", polygon.id)}
              />
            ))}
          </>
        )}
      </div>
    )
  }
  