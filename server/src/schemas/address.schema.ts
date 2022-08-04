import { z } from "zod";
import { Types } from "mongoose";
import { userInRequestSchema } from "@schemas/user.schema";

/**
 * Address Schema
 */

const addressSchema = z.object({
  user: z.instanceof(Types.ObjectId),
  fullName: z.string({ required_error: "full name is required" }),
  phone: z.string({ required_error: "phone number is required" }),
  country: z.string({ required_error: "country name is required" }),
  province: z.string({ required_error: "province name is required" }),
  city: z.string({ required_error: "city name is required" }),
  address: z.string({ required_error: "address is required" }),
  postalCode: z.string({ required_error: "postal code is required" }),
  isDefault: z.boolean({
    required_error: "need to determine this address is default or not?",
  }),
});

export type Address = z.infer<typeof addressSchema>;

/**
 * Address-related Schemas for incoming requests
 */

const getAddressById = z.object({
  params: z.object({
    id: z.string({ required_error: "Address Id is required" }),
  }),
});

const createNewAddress = z.object({
  user: userInRequestSchema,
  body: addressSchema.omit({ user: true }),
});

const updateAddress = z.object({
  params: z.object({
    id: z.string({ required_error: "Address Id is required" }),
  }),
  body: addressSchema.omit({ user: true }).partial(),
});

const deleteAddress = z.object({
  params: z.object({
    id: z.string({ required_error: "Address Id is required" }),
  }),
});

export default {
  getAddressById,
  createNewAddress,
  updateAddress,
  deleteAddress,
};
