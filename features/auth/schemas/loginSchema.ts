import { z } from "zod";
export const loginSchema = z.object({
  account: z.string().nonempty("Email or password is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 character"),
});

type Login = z.infer<typeof loginSchema>;

export type LoginSchema = Partial<Login>;
