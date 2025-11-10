import { createContext, ReactNode, useContext, useState } from "react";
import { BookingRequest } from "../types/bookingRequest";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";

type BookingContextType = {
  bookingRoomData?: BookingHotelRoomResponse[];
  setBookingRoomData: (booking: BookingHotelRoomResponse[]) => void;
  booking?: BookingRequest;
  setBooking: (booking: BookingRequest) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }

  return context;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBooking] = useState<BookingRequest>();
  const [bookingRoomData, setBookingRoomData] =
    useState<BookingHotelRoomResponse[]>();

  return (
    <BookingContext.Provider
      value={{ bookingRoomData, setBookingRoomData, booking, setBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};
