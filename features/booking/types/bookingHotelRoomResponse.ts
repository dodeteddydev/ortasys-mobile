import { BookingListResponse } from "./bookingListResponse";

export type BookingHotelRoomResponse = BookingListResponse & {
  emailSale: string;
  emailReservation: string;
  phone: string;
  propertyType: {
    id: number;
    propertyType: string;
  };
  code: string;
  highlight: string;
  roomAllotment: number;
  extraBedRate: number;
  galleries: any[]; // adjust if you know the gallery structure
  policies: any | null; // adjust if policies have a defined type
  rates: {
    contractRateId: number;
    hotelRoomId: number;
    rate: number;
    code: string;
    description: string;
    adult: number;
    child: number;
    extraBed: number;
    extraBedRate: number;
    markets: string[];
    rateId: string;
  }[];
  contractRateId: number;
  markets: string[];
  rateId: string;
};
