"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";

// Component imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Interface import
import { IHouseForm } from "@/interfaces/IHouseForm";

type UploadImage = {
  event: string | undefined;
  info: {
    secure_url: string;
    public_id: string;
  };
};

const HouseEdit: React.FC = ({ params }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagePublicIds, setImagePublicIds] = useState<string[]>([]);
  const router = useRouter();
  const { id } = params;
  const [houseDetails, setHouseDetails] = useState({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    watch,
    setValue,
    reset
  } = useForm<IHouseForm>();

  const fetchHouse = async (houseId) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/houses/${houseId}`);
      const house = res.data;
      setHouseDetails(house);
      console.log(house);
      return house;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchHouse(id).then((house) => {
        if (house) {
          reset(house); // This will set the form values
          setImageUrls(house.images || []); // Assuming images are stored in an array
        }
      });
    }
  }, [id, reset]);

  const listingType = watch("listingType");

  const onSubmit: SubmitHandler<IHouseForm> = async (data) => {
    try {
      const response = await axios.put(`/api/houses/${id}`, data);
      console.log(response);
      // Redirect or show success message
      router.push("/houselist"); // Adjust this to your needs
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "manual",
        message: "Failed to submit house details. Please try again.",
      });
    }
  };

	
  const removeImage = (urlToRemove: string) => {
    setImageUrls((currentUrls) => currentUrls.filter(url => url !== urlToRemove));
    // Update the form value
    const updatedImages = imageUrls.filter(url => url !== urlToRemove);
    setValue('images', updatedImages);
  };


  const handleUploadSuccess = (result: UploadImage) => {
    console.log(result.info.public_id + result.info.secure_url);
    setImageUrls((prev) => [result.info.secure_url,...prev]);
    setImagePublicIds((prev) => [result.info.public_id,...prev]);
    setValue("images", [ result.info.secure_url,...imageUrls]);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md m-2 p-3">
        <CardHeader>
          <CardTitle className="text-2xl">Update House Details</CardTitle>
          <CardDescription>
            Update house details here for buyers/renters to view.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="Cozy 3-bedroom apartment"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="A beautiful house with modern amenities..."
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="locationCity">City</Label>
              <Input
                id="locationCity"
                {...register("locationCity", { required: "City is required" })}
                placeholder="New York"
              />
              {errors.locationCity && (
                <p className="text-red-500">{errors.locationCity.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="locationSociety">Society</Label>
              <Input
                id="locationSociety"
                {...register("locationSociety", {
                  required: "Society is required",
                })}
                placeholder="Greenview Estates"
              />
              {errors.locationSociety && (
                <p className="text-red-500">{errors.locationSociety.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address", { required: "Address is required" })}
                placeholder="123 Main St, Apt 4B"
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="noOfRooms">Number of Rooms</Label>
              <Input
                id="noOfRooms"
                type="number"
                {...register("noOfRooms", {
                  required: "Number of rooms is required",
                  min: { value: 1, message: "Must have at least 1 room" },
                })}
                placeholder="3"
              />
              {errors.noOfRooms && (
                <p className="text-red-500">{errors.noOfRooms.message}</p>
              )}
            </div>
            <div className="grid gap-2">
          <Label htmlFor="EnterHouseImages">House Images</Label>
          {imageUrls.map((url, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img src={url} alt={`House image ${index + 1}`} className="w-20 h-20 object-cover" />
              <Button type="button" variant="destructive" onClick={() => removeImage(url)}>
                Remove
              </Button>
            </div>
          ))}
          <CldUploadButton
            uploadPreset="xbgqg3zy"
            onUpload={handleUploadSuccess}
          />
          {errors.images && (
            <p className="text-red-500">{errors.images.message}</p>
          )}
        </div>
            <div className="grid gap-2">
              <Label htmlFor="listingType">Listing Type</Label>
              <Controller
                name="listingType"
                control={control}
                rules={{ required: "Please select a listing type" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="both">For Rent and Sale</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.listingType && (
                <p className="text-red-500">{errors.listingType.message}</p>
              )}
            </div>

            {(listingType === "rent" || listingType === "both") && (
              <div className="grid gap-2">
                <Label htmlFor="priceOfRent">Price of Rent</Label>
                <Input
                  id="priceOfRent"
                  type="number"
                  {...register("priceOfRent", {
                    required: "Rent price is required for rental listings",
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                  placeholder="1500"
                />
                {errors.priceOfRent && (
                  <p className="text-red-500">{errors.priceOfRent.message}</p>
                )}
              </div>
            )}

            {(listingType === "sale" || listingType === "both") && (
              <div className="grid gap-2">
                <Label htmlFor="priceOfBuy">Price to Buy</Label>
                <Input
                  id="priceOfBuy"
                  type="number"
                  {...register("priceOfBuy", {
                    required: "Buy price is required for sale listings",
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                  placeholder="250000"
                />
                {errors.priceOfBuy && (
                  <p className="text-red-500">{errors.priceOfBuy.message}</p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Update House Details
            </Button>
          </CardFooter>
          {errors.root && (
            <p className="text-red-500 text-center mt-2">
              {errors.root.message}
            </p>
          )}
        </form>
      </Card>
    </div>
  );
};

export default HouseEdit;
