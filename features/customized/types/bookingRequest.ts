import { GuestInformationSchema } from "../schemas/guestInformationSchema";
import { HotelRoomSchema } from "../schemas/hotelRoomSchema";

export type BookingRequest = GuestInformationSchema & {
  startStayDate: string;
  endStayDate: string;
  night: number;
  totalRoom: number;
  adult: number;
  child: number;
  hotelRooms: HotelRoomSchema[];
};
