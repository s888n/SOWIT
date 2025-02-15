import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// const mockPolygon = {
//   id: "1",
//   name: "Polygon 1",
//   color: "#D20C0C",
//   thumbnail: "/polygon.png",
//   region: "North",
//   area: 100,
//   geometry: {
//     type: "Polygon",
//     coordinates: [
//       [
//         [-91.44552969345338, 45.58637769684887],
//         [-93.88964918375137, 45.2622563921187],
//         [-99.76197520308756, 41.00640553785337],
//         [-91.44552969345338, 45.58637769684887],
//       ],
//     ],
//   },
// };

interface PolygonProps {
  id: string;
  name: string;
  color: string;
  thumbnail: string;
  region: string;
  area: number;
  geometry: any;
}

interface EditPolygonModalProps {
  polygon?: PolygonProps;
  isOpen: boolean;
  onClose: () => void;
  onSave: (polygon: PolygonProps) => void;
}

export function EditPolygonDialog({
  polygon,
  isOpen,
  onClose,
}: EditPolygonModalProps) {
  const [editedPolygon, setEditedPolygon] = useState<PolygonProps | null>(
    polygon || null
  );

  const handleChange = (field: "name" | "color", value: string) => {
    // setEditedPolygon((prev) => ({ ...prev, [field]: value, id: prev?.id || "" }));
    console.log(editedPolygon);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted polygon:", editedPolygon);
  };

  return (
    <Dialog open={isOpen} modal>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {editedPolygon?.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              required
              id="name"
              value={editedPolygon?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <Input
              id="color"
              type="color"
              value={editedPolygon?.color || ""}
              onChange={(e) => handleChange("color", e.target.value)}
              className="col-span-3 h-10"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Region</Label>
            <span className="col-span-3">{editedPolygon?.region}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Area</Label>
            <span className="col-span-3">{editedPolygon?.area} sq </span>
          </div>
          <img
            src={editedPolygon?.thumbnail || "/placeholder.svg"}
            alt="Polygon thumbnail"
            className="w-full rounded-md"
          />
          <Button type="submit" className="w-full mt-4">
            'Update'
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
