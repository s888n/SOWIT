import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, Trash2, Pencil,EyeOff } from "lucide-react";
interface PolygonCardProps {
  thumbnail: string;
  name: string;
  region: string;
  area: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  // setShowModal: (value: boolean) => void;
}

// this will show in the
const ConfirmDelete = ({ setShowConfirmDelete }: { setShowConfirmDelete: any }) => {
  return (
    <div className="flex flex-col h-32 p-4">
      {/* <h2 className="text-lg font-semibold">Delete Polygon</h2> */}
      <p className="text-center">
        Are you sure you want to delete this polygon?
      </p>
      <div className="flex justify-center space-x-2 mt-4">
        <Button variant="outline" size="sm" onClick={() => setShowConfirmDelete(false)}>
          Cancel
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
      {/* </div> */}
    </div>
  );
};

export function PolygonCard({
  thumbnail,
  name,
  region,
  area,
  onView,
  onEdit,
  onDelete,
}: // setShowModal
PolygonCardProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  return (
    <div className=" rounded-lg shadow-md mb-4 overflow-hidden border">
      {!showConfirmDelete ? (
      <div className="flex h-32">
        <div className="w-1/3  border ">
          <img src={thumbnail } alt={name}  className="" />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm ">{region}</p>
            <p className="text-sm ">{area} sq km</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="icon" onClick={onView}>
              <Eye size={20} />
            </Button>
            <Button variant="outline" size="icon" onClick={onEdit}>
              <Pencil size={20} />
            </Button>
            <Button variant="destructive" size="icon" onClick={() => setShowConfirmDelete(true)}>
              <Trash2 size={20} />
            </Button>
          </div>
        </div>
      </div>
      ) :
      <ConfirmDelete setShowConfirmDelete={setShowConfirmDelete} />
      }
    </div>
  );
}
