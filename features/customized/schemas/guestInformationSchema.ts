import { z } from "zod";

export const guestInformationSchema = z.object({
  guestFirstName: z.string({ required_error: "First name is required" }),
  guestLastName: z.string({ required_error: "Last name is required" }),
  guestEmail: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  guestPhone: z.string({ required_error: "Phone is required" }),
  guestZipCode: z.string().optional(),
  guestCountry: z.string().optional(),
  specialRequest: z.string().optional(),
});

type GuestInformation = z.infer<typeof guestInformationSchema>;

export type GuestInformationSchema = Partial<GuestInformation>;
