export type BookingRequest = {
  checkIn: string;
  checkOut: string;
  person: number;
  hotelId: number;
  marketId: number | null;
  child: number;
  night: number;
  adult: number;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequest: string;
  bookingRooms: BookingRoom[];
  guestCountry: string;
  guestZipcode: string;
};

export type BookingRoom = {
  hotelId: number;
  hotelRoomId: number;
  totalRoom: number;
  pricePerNight: number;
  extraBedRate: number;
  totalExtraBed: number;
  contractRateId: number;
  rateId: string;
};
