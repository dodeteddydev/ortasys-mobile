export type RoomSimpleResponse = {
  id: number;
  hotelId: number;
  roomType: string;
  roomTypeDescription: string;
  roomAllotment: number;
  roomDescription: string;
  size: number;
  roomTypeCode: string;
  maxChildren: number;
  maxAdult: number;
  maxPerson: number;
  basePrice: number;
  attributes: [];
  galleries: [];
  roomConfigurations: {
    id: string;
    adult: number;
    child: number;
    extrabed: number;
    rate: number;
  }[];
};
