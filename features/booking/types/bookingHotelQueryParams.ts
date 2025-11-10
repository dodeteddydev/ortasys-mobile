import { BookingListQueryParams } from "./bookingListQueryParams";

export type BookingHotelQueryParams = Pick<
  BookingListQueryParams,
  "checkIn" | "checkOut" | "maxAdult" | "maxChild"
> & {
  hotelId?: number;
};
