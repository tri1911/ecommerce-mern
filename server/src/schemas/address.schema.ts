import { z } from "zod";
import { userInRequestSchema } from "@schemas/common";

export const getAllAddressesRequestSchema = z.object({
  user: userInRequestSchema,
});

export const getAddressByIdRequestSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Address Id is required" }),
  }),
});

export const createAddressRequestSchema = z.object({
  user: userInRequestSchema,
  body: z.object({
    fullName: z.string({ required_error: "Full Name is required" }),
    phone: z.string({ required_error: "Phone Number is required" }),
    country: z.string({ required_error: "Country is required" }),
    province: z.string({ required_error: "Full Name is required" }),
    city: z.string({ required_error: "Full Name is required" }),
    address: z.string({ required_error: "Full Name is required" }),
    postalCode: z.string({ required_error: "Full Name is required" }),
    isDefault: z.boolean({ required_error: "isDefault is required" }),
  }),
});

export const updateAddressRequestSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Address Id is required" }),
  }),
  body: z.object({
    fullName: z.optional(z.string()),
    phone: z.optional(z.string()),
    country: z.optional(z.string()),
    province: z.optional(z.string()),
    city: z.optional(z.string()),
    address: z.optional(z.string()),
    postalCode: z.optional(z.string()),
    isDefault: z.optional(z.boolean()),
  }),
});

export const deleteAddressRequestSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Address Id is required" }),
  }),
});
