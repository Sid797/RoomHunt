import { Document } from "mongoose";

export interface IHouse extends Document {
    listingType: 'rent' | 'sale' | 'both';
    title: string;
    description: string;
    locationCity: string;
    locationSociety: string;
    address: string;
    noOfRooms: number;
    priceOfRent?: number;
    priceOfBuy?: number;
    id:string,
    createdAt: Date;
    updatedAt: Date;
    images: string[];
}