export type ListHotelResponse = {
  id: number;
  hotelName: string;
  country: string;
  countryName: string;
  stateName: string;
  state: string;
  city: string;
  createdAt: string;
  addresses: { address: string }[];
  hotelRoomId: number;
  star: number;
  price: number;
  logoPath: string;
  roomImage: string;
  roomType: string;
  roomAllotment: number;
  roomTypeDescription: string;
  maxPerson: number;
  attributes: {
    attributeId: number;
    attributeName: string;
  }[];
};
