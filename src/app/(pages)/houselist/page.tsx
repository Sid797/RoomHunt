// src/app/(pages)/houselist/page.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HouseModal } from '@/components/custom/houseModal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

interface IHouse {
  id: string;
  title: string;
  description: string;
  locationCity: string;
  locationSociety: string;
  address: string;
  noOfRooms: number;
  listingType: "rent" | "sale" | "both";
  priceOfRent?: number;
  priceOfBuy?: number;
  images: string[];
}

const fetchHouses = async (): Promise<IHouse[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/houses`, {
    cache: 'no-store', // Ensures fresh data for each request
  });
  if (!response.ok) {
    throw new Error('Failed to fetch houses');
  }
  return response.json();
};

const HouseList: React.FC = async () => {
  const houses = await fetchHouses();

  return (
    <div className="flex flex-col gap-6 items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">House List</h1>
      <Link href="/houseadd">
        <Button variant="default">Add New House</Button>
      </Link>
      <ul className="w-full flex flex-wrap justify-center gap-6">
        {houses.map((house) => (
          <li key={house.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col h-full">
              <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4">
                <img
                  src={house.images[0]}
                  alt="First image of the house"
                  className="object-cover w-full h-full"
                />
              </div>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                {house.title}
              </h5>
              <p className="text-md font-medium tracking-tight text-gray-600 dark:text-gray-200 mb-4 truncate">
                {house.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{house.priceOfRent || house.priceOfBuy}
                </span>
                <HouseModal
                  title={house.title}
                  description={house.description}
                  locationCity={house.locationCity}
                  locationSociety={house.locationSociety}
                  address={house.address}
                  room={house.noOfRooms}
                  price={house.priceOfRent || house.priceOfBuy}
                  images={house.images}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HouseList;
