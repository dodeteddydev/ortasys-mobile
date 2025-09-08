import { z } from "zod";
import { hotelRoomSchema } from "./hotelRoomSchema";

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

export type BookingSchema = Partial<Booking>;
