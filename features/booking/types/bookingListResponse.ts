export type BookingListResponse = {
  id: number;
  hotelName: string;
  country: string;
  countryName: string;
  stateName: string;
  state: string;
  city: string;
  createdAt: string;
  addresses: {
    address: string;
  }[];
  accountId: number;
  isVerified: boolean;
  hotelRoomId: number;
  star: number;
  price: number;
  logoPath: string;
  roomImage: string;
  roomType: string;
  roomAllotment: number;
  roomTypeDescription: string;
  maxPerson: number;
  maxExtraBed: number;
  size: number;
  maxChildren: number;
  maxAdult: number;
  childAgeMax: number;
  childAgeMin: number;
  roomDescription: string;
  roomConfigurations: null;
  attributes: {
    attributeId: number;
    attributeName: string;
  }[];
};
