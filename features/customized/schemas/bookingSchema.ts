import { z } from "zod";

export const activitySchema = z.object({
  day: z.number(),
  date: z.string(),
  priceAdult: z.number(),
  priceChild: z.number(),
  packageCategoryId: z.number(),
  packageElementId: z.number(),
  location: z.string(),
  rate: z.number(),
  totalItem: z.number().optional(),
  pricePerItem: z.number(),
  isPricePerItem: z.boolean(),
  description: z.string(),
  base: z.number(),
  markup: z.number(),
  markupAgent: z.number(),
  adult: z.number(),
  child: z.number(),
});

export const hotelRoomSchema = z.object({
  day: z.number(),
  date: z.string(),
  hotelId: z.number().optional(),
  hotelRoomId: z.number().optional(),
  contractRateId: z.number().optional(),
  hotelRoomConfigurationId: z.string().optional(),
  rate: z.number().optional(),
  isCheckout: z.boolean(),
  base: z.number().optional(),
  markupAgent: z.number().optional(),
  markupHotel: z.number().optional(),
  checkIn: z.boolean(),
  activities: z.array(activitySchema),
});

export const bookingSchema = z.object({
  guestFirstName: z.string(),
  guestLastName: z.string(),
  guestEmail: z.string().email(),
  guestPhone: z.string(),
  specialRequest: z.string(),
  startStayDate: z.string(),
  endStayDate: z.string(),
  night: z.number(),
  totalRoom: z.number(),
  adult: z.number(),
  child: z.number(),
  hotelRooms: z.array(hotelRoomSchema),
});

type Booking = z.infer<typeof bookingSchema>;
type HotelRoom = z.infer<typeof hotelRoomSchema>;
type Activity = z.infer<typeof activitySchema>;

export type BookingSchema = Partial<Booking>;
export type HotelRoomSchema = Partial<HotelRoom>;
export type ActivitySchema = Partial<Activity>;
