import {  useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


interface SavePolygonModalProps {
  area: number;
  thumbnailURL: string;
  isOpen: boolean;
  coordinates: any;
  onClose: () => void;
  handleSave: (
    name: string,
    description: string,
    area: number,
    coordinates: any,
    thumbnail: string
  ) => void;
}

export function SavePolygonDialog({
  area,
  thumbnailURL,
  isOpen,
  onClose,
  handleSave,
  coordinates,
}: SavePolygonModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSave(name, description, area, coordinates, thumbnailURL);
    onClose();
  };
  return (
    <Dialog open={isOpen} modal onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Save Polygon</DialogTitle>
        </DialogHeader>
        <form  className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              type="text"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left ">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write a note about the polygon"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 resize-none"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left ">Area</Label>
            <span className="col-span-3 ">{area / 1000000} km²</span>
          </div>
          <img
            src={thumbnailURL}
            alt="Polygon thumbnail"
            className="w-full rounded-md"
          />
          <Button type="submit" className="w-full mt-4" >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}