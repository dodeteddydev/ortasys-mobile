import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().nonempty("Name is required"),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().optional(),
  countryCode: z.string().nonempty("Country is required"),
  stateCode: z.string().nonempty("State/Province is required"),
  city: z.string().nonempty("City/Regency is required"),
  address: z.string().nonempty("Address is required"),
  email: z.string().nonempty("Email is required").email(),
  phone: z.string().nonempty("Phone is required"),
});

type UpdateProfile = z.infer<typeof updateProfileSchema>;

export type UpdateProfileSchema = Partial<UpdateProfile>;
