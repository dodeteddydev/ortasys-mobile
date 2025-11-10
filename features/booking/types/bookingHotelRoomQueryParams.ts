import { BookingListQueryParams } from "./bookingListQueryParams";

export type BookingHotelRoomQueryParams = Pick<
  BookingListQueryParams,
  "checkIn" | "checkOut" | "maxAdult" | "maxChild"
>;
