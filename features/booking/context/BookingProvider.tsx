import { createContext, ReactNode, useContext, useState } from "react";
import { BookingRequest } from "../types/bookingRequest";

type BookingContextType = {
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

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
