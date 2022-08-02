import { z } from "zod";
import { Types } from "mongoose";
import { Gender, Role } from "@models/user.model";

const userSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  firstName: z.string({ required_error: "First Name is required" }),
  lastName: z.string({ required_error: "Last Name is required" }),
  birthday: z
    .preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date())
    .optional(),
  gender: z.nativeEnum(Gender).optional(),
  phone: z.string({ required_error: "Phone Number is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Must be 6 or more characters long" }),
  role: z.nativeEnum(Role),
});

export type User = z.infer<typeof userSchema>;

export const userInRequestSchema = z.object(
  { _id: z.instanceof(Types.ObjectId) },
  { required_error: "User is required" }
);

const userLogin = z.object({
  body: userSchema.pick({ email: true, password: true }),
});

const userSignUp = z.object({
  body: userSchema.omit({ birthday: true, gender: true, role: true }),
});

const getUserProfile = z.object({
  user: userInRequestSchema,
});

const updateUserProfile = z.object({
  user: userInRequestSchema,
  body: userSchema.omit({ role: true, password: true }).partial(),
});

const updateUserPassword = z.object({
  user: userInRequestSchema,
  body: z.object({
    currentPassword: z
      .string({ required_error: "Old password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});

export default {
  userLogin,
  userSignUp,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
};
