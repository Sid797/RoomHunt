import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface HouseModalProps {
  title: string;
  description: string;
  locationCity: string;
  locationSociety: string;
  address: string;
  room: number;
  price: number|undefined;
  images: string[];
}

export const HouseModal: React.FC<HouseModalProps> = ({
  title,
  description,
  locationCity,
  locationSociety,
  address,
  room,
  price,
  images,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <Carousel>
          <CarouselContent>
            {images.map((url, index) => (
              <CarouselItem key={index} className="w-full h-64">
                <img
                  src={url}
                  alt={`Image ${index + 1} of the house`}
                  className="object-cover w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <AlertDialogDescription className="mt-4">{description}</AlertDialogDescription>
        <AlertDialogDescription className="mt-2">
          {locationCity}, {locationSociety}, {address}
        </AlertDialogDescription>
        <AlertDialogDescription className="mt-2">Rooms: {room}</AlertDialogDescription>
        <AlertDialogDescription className="mt-2">Price: ₹{price}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>OK</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
