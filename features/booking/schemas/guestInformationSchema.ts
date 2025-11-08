import { z } from "zod";

export const guestInformationSchema = z.object({
  guestFirstName: z.string().nonempty("Guest First Name is required"),
  guestLastName: z.string().nonempty("Guest Last Name is required"),
  guestEmail: z
    .string()
    .email("Invalid Email")
    .nonempty("Guest Email is required"),
  guestPhone: z.string().nonempty("Guest Phone is required"),
  guestCountry: z.string().optional(),
  guestZipcode: z.string().optional(),
  specialRequest: z.string().optional(),
  bookingRoom: z.array(
    z.object({
      hotelId: z.number(),
      hotelRoomId: z.number(),
      totalRoom: z.number(),
      pricePerNight: z.number(),
      extraBedRate: z.number(),
      totalExtraBed: z.number(),
      contractRateId: z.number(),
      rateId: z.string(),
    })
  ),
});

type GuestInformation = z.infer<typeof guestInformationSchema>;

export type GuestInformationSchema = Partial<GuestInformation>;
