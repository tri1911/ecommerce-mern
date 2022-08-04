import asyncHandler from "express-async-handler";
import { HttpException } from "@utils/custom-errors.util";
import addressSchemas from "@schemas/address.schema";
import addressServices from "@services/address.service";
import { userInRequestSchema } from "@schemas/user.schema";

const getAllAddresses = asyncHandler(async (req, res) => {
  const { _id: userId } = userInRequestSchema.parse(req.user);

  const addresses = await addressServices.getAllAddresses(userId);

  res.status(200).json({ addresses });
});

const getAddressById = asyncHandler(async (request, response) => {
  const {
    params: { id: addressId },
  } = addressSchemas.getAddressById.parse(request);

  const address = await addressServices.getAddressById(addressId);

  if (address) {
    response.status(200).json({ address });
  } else {
    throw new HttpException(`Address with id '${addressId}' not found`, 404);
  }
});

const createNewAddress = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
    body: addressData,
  } = addressSchemas.createNewAddress.parse(request);

  const createdAddress = await addressServices.createNewAddress({
    user: userId,
    ...addressData,
  });

  response.status(200).json({ createdAddress });
});

const updateAddress = asyncHandler(async (request, response) => {
  const {
    params: { id: addressId },
    body: addressUpdate,
  } = addressSchemas.updateAddress.parse(request);

  const updatedAddress = await addressServices.updateAddress(
    addressId,
    addressUpdate
  );

  response.status(200).json({ updatedAddress });
});

const deleteAddress = asyncHandler(async (request, response) => {
  const {
    params: { id: addressId },
  } = addressSchemas.deleteAddress.parse(request);

  await addressServices.deleteAddress(addressId);

  response.status(200).json({
    message: `Successfully delete the address with id of ${addressId}`,
  });
});

export default {
  getAllAddresses,
  getAddressById,
  createNewAddress,
  updateAddress,
  deleteAddress,
};
