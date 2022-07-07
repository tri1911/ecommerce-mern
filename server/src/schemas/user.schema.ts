import { z } from "zod";

export const userRegistrationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});

export const userLoginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});
