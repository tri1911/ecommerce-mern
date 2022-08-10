import { z } from "zod";
import { Types } from "mongoose";
import { Gender, Role } from "@models/user.model";

/**
 * Zod User Schema
 */

const addressSchema = z.object({
  fullName: z.string({ required_error: "full name is required" }),
  phone: z.string({ required_error: "phone number is required" }),
  country: z.string({ required_error: "country name is required" }),
  province: z.string({ required_error: "province name is required" }),
  city: z.string({ required_error: "city name is required" }),
  address: z.string({ required_error: "address is required" }),
  postalCode: z.string({ required_error: "postal code is required" }),
});

export type Address = z.infer<typeof addressSchema>;

const userSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
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
  addresses: z.array(addressSchema),
  shippingAddress: z.preprocess((arg) => {
    if (typeof arg == "string") return new Types.ObjectId(arg);
  }, z.instanceof(Types.ObjectId).optional()),
  billingAddress: z.preprocess((arg) => {
    if (typeof arg == "string") return new Types.ObjectId(arg);
  }, z.instanceof(Types.ObjectId).optional()),
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

/**
 * Authentication schemas
 */

export const jwtAuthPayloadSchema = z.object({ sub: z.string() });

export type JwtAuthPayload = z.infer<typeof jwtAuthPayloadSchema>;

// schema to parse the `req.user` object (which is attached after successful authentication)
export const userInRequestSchema = userSchema.pick({
  _id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
});

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
 * User Profile Request Schemas
 */

const getUserById = z.object({
  user: userInRequestSchema,
  params: z.object({ id: z.string() }),
});

const updateUserById = z.object({
  user: userInRequestSchema,
  params: z.object({ id: z.string() }),
  body: userSchema
    .omit({ federatedCredentials: true, role: true, password: true })
    .partial(),
});

const updateUserPassword = z.object({
  user: userInRequestSchema,
  params: z.object({ id: z.string() }),
  body: z.object({
    currentPassword: z
      .string({ required_error: "Old password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});

/**
 * User Address-related Request Schemas
 */

const addNewAddress = z.object({
  user: userInRequestSchema,
  params: z.object({ id: z.string() }),
  body: z.object({
    newAddress: addressSchema,
    isDefault: z.boolean().optional(),
  }),
});

const updateAddress = z.object({
  user: userInRequestSchema,
  params: z.object({ id: z.string(), addressId: z.string() }),
  body: z.object({
    addressUpdate: addressSchema.partial(),
    isDefault: z.boolean().optional(),
  }),
});

const removeAddress = z.object({
  user: userInRequestSchema,
  params: z.object({ id: z.string(), addressId: z.string() }),
});

export default {
  userLogin,
  userSignUp,
  getUserById,
  updateUserById,
  updateUserPassword,
  addNewAddress,
  updateAddress,
  removeAddress,
};
