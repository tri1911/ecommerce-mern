import { z } from "zod";

export const userLoginRequestSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});

export const userRegistrationRequestSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    firstName: z.string({ required_error: "First Name is required" }),
    lastName: z.string({ required_error: "Last Name is required" }),
    phone: z.string({ required_error: "Phone Number is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});
