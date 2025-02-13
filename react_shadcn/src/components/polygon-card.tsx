import { Button } from "@/components/ui/button";
import { Eye, Trash2, Pencil } from "lucide-react";
interface PolygonCardProps {
  thumbnail: string;
  name: string;
  region: string;
  area: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function PolygonCard({
  thumbnail,
  name,
  region,
  area,
  onView,
  onEdit,
  onDelete,
}: PolygonCardProps) {
  return (
    <div className=" rounded-lg shadow-md mb-4 overflow-hidden border">
      <div className="flex h-32">
        <div className="w-1/3 relative border">
          <img src={thumbnail || "/placeholder.svg"} alt={name} />
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
            <Button variant="destructive" size="icon" onClick={onDelete}>
              <Trash2 size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
