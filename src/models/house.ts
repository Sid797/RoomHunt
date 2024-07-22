import mongoose, { Schema } from 'mongoose';
import { IHouse } from '../interfaces/IHouse'

const HouseSchema: Schema = new Schema({
  listingType: {
    type: String,
    enum: ['rent', 'sale', 'both'],
    required: [true, "Please specify if the house is for rent, sale, or both"],
  },
  title: {
    type: String,
    required: [true, "Please enter a title for the house"],
  },
  description: {
    type: String,
    required: [true, "Please enter a short description about the house"],
  },
  locationCity: {
    type: String,
    required: [true, "Please enter the city of the house"],
  },
  locationSociety: {
    type: String,
    required: [true, "Please enter the society of the house"],
  },
  address: {
    type: String,
    required: [true, "Please enter the address of the house"],
  },
  noOfRooms: {
    type: Number,
    required: [true, "Please enter number of rooms in the house"],
  },
  priceOfRent: {
    type: Number,
  },
  priceOfBuy: {
    type: Number,
  },
  images: [{
    type: String,
    required: [true, "Please enter at least one image of the house"],

  }]
}, {
  timestamps: true
})

HouseSchema.pre("validate", function(next) {
  if (this.listingType === 'rent' && !this.priceOfRent) {
    this.invalidate('priceOfRent', "Price of rent is required for rental listings");
  }
  if (this.listingType === 'sale' && !this.priceOfBuy) {
    this.invalidate('priceOfBuy', "Price of buy is required for sale listings");
  }
  if (this.listingType === 'both' && (!this.priceOfRent || !this.priceOfBuy)) {
    this.invalidate('priceOfRent', "Both rent and buy prices are required for combined listings");
    this.invalidate('priceOfBuy', "Both rent and buy prices are required for combined listings");
  }
  next();
})

export default mongoose.models.House || mongoose.model<IHouse>('House', HouseSchema);