export type BookingDetailResponse = {
  id: number;
  uuid: string;
  bookNumber: string;
  checkIn: string;
  checkOut: string;
  person: number;
  adult: number;
  child: number;
  night: number;
  hotelId: number;
  marketId: number;
  marketName: string;
  bookingRooms: BookingRoom[];
  activity: any[]; // TODO: change type
  status: number;
  guestFirstName: string;
  guestLastName: string;
  guestPhone: string;
  guestEmail: string;
  guestCountry: string;
  guestZipcode: string;
  agentPhone: string;
  specialRequest: string;
  bookingExpiredAt: string | null;
  canceledAt: string | null;
  confirmedAt: string | null;
  agentName: string;
  logoAgent: string;
  isPackage: boolean;
  createdAt: string;
};

type BookingRoom = {
  totalRoom: number;
  pricePerNight: number;
  room: Room;
};

type Room = {
  id: number;
  hotelId: number;
  roomType: string;
  roomTypeDescription: string;
  roomAllotment: number;
  roomDescription: string;
  hotelName: string;
  pricePerNight: number;
  TotalextraBed: number;
  totalExtraBed: number;
  extraBedPrice: number;
  description: string;
  logoHotel: string;
  benefit: string;
};
