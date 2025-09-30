import { z } from "zod";

export const searchSchema = z.object({
  country: z.string({ required_error: "Country is required" }),
  countryName: z.string({ required_error: "Country is required" }),
  state: z.string({ required_error: "State is required" }),
  stateName: z.string({ required_error: "State is required" }),
  adult: z
    .number({ required_error: "Adult is required" })
    .min(1, "Adult must be at least 1"),
  child: z
    .number({ required_error: "Child is required" })
    .min(0, "Child must be at least 0"),
  totalRoom: z
    .number({ required_error: "Room is required" })
    .min(1, "Room must be at least 1"),
  startStayDate: z.string({ required_error: "Check in date is required" }),
  endStayDate: z.string({ required_error: "Check out date is required" }),
});

type Search = z.infer<typeof searchSchema>;

export type SearchSchema = Partial<Search>;
