import { PolygonCard } from "./polygon-card"

interface Polygon {
  id: string
  thumbnail: string
  name: string
  region: string
  area: number
}

interface PolygonListProps {
  polygons: Polygon[]
}

export function PolygonList({ polygons }: PolygonListProps) {
    return (
      <div className="overflow-y-auto h-[calc(50vh-5rem)] md:h-[calc(100vh-10rem)] pr-2">
        {polygons.map((polygon) => (
          <PolygonCard
            key={polygon.id}
            {...polygon}
            onView={() => console.log("View", polygon.id)}
            onEdit={() => console.log("Edit", polygon.id)}
            onDelete={() => console.log("Delete", polygon.id)}
          />
        ))}
      </div>
    )
  }
  