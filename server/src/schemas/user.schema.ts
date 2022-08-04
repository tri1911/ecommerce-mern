import { z } from "zod";
import { Types } from "mongoose";
import { Gender, Role } from "@models/user.model";

/**
 * User Schema to store in database
 */

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
  phone: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Must be 6 or more characters long" })
    .optional(),
  federatedCredentials: z.array(
    z.object({
      provider: z.string(),
      subject: z.string(),
    })
  ),
  avatar: z.string().optional(),
  role: z.nativeEnum(Role),
});

export type User = z.infer<typeof userSchema>;

// NOTE: `user` field in authenticated request may have more fields, but I just care about user id at this time
export const userInRequestSchema = z.object(
  { _id: z.instanceof(Types.ObjectId) },
  { required_error: "user _id is required" }
);

/**
 * Authentication Schemas
 */

const userLogin = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});

export type UserCredential = z.infer<typeof userLogin>["body"];

const userSignUp = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    firstName: z.string({ required_error: "First Name is required" }),
    lastName: z.string({ required_error: "Last Name is required" }),
    phone: z.string().optional(),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});

export type NewUserData = z.infer<typeof userSignUp>["body"];

/**
 * Profile Schemas
 */

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
