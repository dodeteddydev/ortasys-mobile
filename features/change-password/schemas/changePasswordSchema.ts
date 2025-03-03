import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .nonempty("Old Password is required")
      .min(6, "Old Password must be at least 6 characters"),
    newPassword: z
      .string()
      .nonempty("New Password is required")
      .min(6, "New Password must be at least 6 characters"),
    newPasswordConf: z.string().nonempty("Password Confirmation is required"),
  })
  .refine((data) => data.newPassword === data.newPasswordConf, {
    message: "Password confirmation does not match",
    path: ["newPasswordConf"],
  });

type ChangePassword = z.infer<typeof changePasswordSchema>;

export type ChangePasswordSchema = Partial<ChangePassword>;
