export interface IHouseForm {
    title: string;
    description: string;
    locationCity: string;
    locationSociety: string;
    address: string;
    noOfRooms: number;
    listingType: 'rent' | 'sale' | 'both';
    priceOfRent?: number;  
    priceOfBuy?: number;   
    images: string[];     
}