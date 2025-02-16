import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
interface Polygon {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  area: number;
  coordinates: any;
}
interface PolygonCardProps {
  polygon: Polygon;
  onView: (polygon: Polygon) => void;
  onEdit: (polygon: Polygon) => void;
  onDelete: (polygon: Polygon) => void;
}

interface ConfirmDeleteProps {
  setShowConfirmDelete: (arg0: boolean) => void;
  handleDelete: () => void;
}
const ConfirmDelete = ({
  setShowConfirmDelete,
  handleDelete,
}: ConfirmDeleteProps) => {
  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className="flex flex-col h-32 p-4">
      <p className="text-center">
        Are you sure you want to delete this polygon?
      </p>
      <div className="flex justify-center space-x-2 mt-4">
        <Button variant="outline" size="sm" onClick={cancelDelete}>
          Cancel
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export function PolygonCard({
  polygon,
  onView,
  // onEdit,
  onDelete,
}: // setShowModal
PolygonCardProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = (polygon: Polygon) => {
    onDelete(polygon);
    setShowConfirmDelete(false);
  };
  return (
    <div className=" rounded-lg shadow-md mb-4 overflow-hidden border">
      {!showConfirmDelete ? (
        <div className="flex h-32">
          <div className="w-1/3  border ">
            <img
              src={polygon.thumbnail}
              alt={polygon.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">{polygon.name}</h3>
              <p className="text-sm ">Area: {polygon.area} km²</p>
            </div>
            <div
              className="flex-1"
            >{<p className="text-sm">{polygon.description}</p>}</div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onView(polygon)}
              >
                <Eye size={20} />
              </Button>
              {/* <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(polygon)}
              >
                <Pencil size={20} />
              </Button> */}
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setShowConfirmDelete(true)}
              >
                <Trash2 size={20} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <ConfirmDelete
          setShowConfirmDelete={setShowConfirmDelete}
          handleDelete={() => handleDelete(polygon)}
        />
      )}
    </div>
  );
}
