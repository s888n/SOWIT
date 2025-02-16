import { PolygonCard } from "./polygon-card"

interface Polygon {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  area: number;
  coordinates: any;
}
interface PolygonListProps {

  polygons: Polygon[];
  handleView: (polygon: Polygon) => void;
  handleEdit: (polygon : Polygon) => void;
  handleDelete: (polygon : Polygon) => void;
}

export function PolygonList({
  polygons,
  handleView,
  handleEdit,
  handleDelete,
 }: PolygonListProps) {
    return (
      <div className="overflow-y-auto h-[calc(50vh-5rem)] md:h-[calc(100vh-10rem)] pr-2">
        {polygons.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">No polygons found</div>
        ) : (
          <>
            {polygons.map((polygon: Polygon) => (
              <PolygonCard
                key={polygon.id}
                polygon={polygon}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}
      </div>
    )
  }
  