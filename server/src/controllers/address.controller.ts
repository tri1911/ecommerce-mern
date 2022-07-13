import asyncHandler from "express-async-handler";
import AddressModel from "../models/address.model";
import {
  createAddressRequestSchema,
  deleteAddressRequestSchema,
  getAddressByIdRequestSchema,
  getAllAddressesRequestSchema,
  updateAddressRequestSchema,
} from "../schemas/address.schema";
import { HttpException } from "../utils/custom-errors.util";

export const getAllAddresses = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
  } = getAllAddressesRequestSchema.parse(request);
  const addresses = await AddressModel.find({ user: userId });
  response.status(200).json({ addresses });
});

export const getAddressById = asyncHandler(async (request, response) => {
  const {
    params: { id: addressId },
  } = getAddressByIdRequestSchema.parse(request);
  const address = await AddressModel.findById(addressId);
  if (address) {
    response.status(200).json({ address });
  } else {
    throw new HttpException(`Address with id '${addressId}' not found`, 404);
  }
});

export const createNewAddress = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
    body: addressData,
  } = createAddressRequestSchema.parse(request);

  const savedAddress = await AddressModel.create({
    user: userId,
    ...addressData,
  });

  response.status(200).json({ savedAddress });
});

export const updateAddress = asyncHandler(async (request, response) => {
  const {
    body: addressUpdate,
    params: { id: addressId },
  } = updateAddressRequestSchema.parse(request);

  const updatedAddress = await AddressModel.findByIdAndUpdate(
    addressId,
    addressUpdate,
    {
      new: true,
    }
  );

  response.status(200).json({ updatedAddress });
});

export const deleteAddress = asyncHandler(async (request, response) => {
  const {
    params: { id: addressId },
  } = deleteAddressRequestSchema.parse(request);

  await AddressModel.findByIdAndDelete(addressId);

  response.status(200).json({ addressId });
});
