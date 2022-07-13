import { z } from "zod";
import { Gender } from "../models/user.model";
import { userInRequestSchema } from "./common";

export const getProfileRequestSchema = z.object({
  user: userInRequestSchema,
});

export const updateProfileRequestSchema = z.object({
  user: userInRequestSchema,
  body: z.object({
    firstName: z.optional(z.string()),
    lastName: z.optional(z.string()),
    birthday: z.optional(
      z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date())
    ),
    gender: z.optional(z.nativeEnum(Gender)),
    email: z.optional(
      z.string().email({
        message: "Invalid email address",
      })
    ),
    phone: z.optional(z.string()),
  }),
});

export const updatePasswordRequestSchema = z.object({
  user: userInRequestSchema,
  body: z.object({
    currentPassword: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
    newPassword: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});
