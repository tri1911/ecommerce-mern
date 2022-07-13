import asyncHandler from "express-async-handler";
import AddressModel from "../models/address.model";
import UserModel from "../models/user.model";
import {
  getProfileRequestSchema,
  setShippingAddressRequestSchema,
  updatePasswordRequestSchema,
  updateProfileRequestSchema,
} from "../schemas/profile.schema";
import { HttpException } from "../utils/custom-errors.util";

export const getProfile = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
  } = getProfileRequestSchema.parse(request);

  const user = await UserModel.findById(userId);

  if (user) {
    response.status(200).json({ user });
  } else {
    throw new HttpException(
      `User profile with id '${userId}' is not found`,
      404
    );
  }
});

// TODO: check whether the new email does exist
export const updateProfile = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
    body: profileUpdate,
  } = updateProfileRequestSchema.parse(request);

  const updatedUser = await UserModel.findByIdAndUpdate(userId, profileUpdate, {
    new: true,
  }).select({ password: 0 });

  response.status(201).json({ updatedUser });
});

export const updatePassword = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
    body: { currentPassword, newPassword },
  } = updatePasswordRequestSchema.parse(request);

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new HttpException(
      `User profile with id '${userId}' is not found`,
      404
    );
  }

  const isPasswordMatched = await user.matchPassword(currentPassword);

  if (isPasswordMatched) {
    user.password = newPassword;
    await user.save();
    response
      .status(201)
      .json({ message: "Password has been updated successfully" });
  } else {
    throw new HttpException("The current password does not match", 400);
  }
});

export const setShippingAddress = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
    body: { addressId },
  } = setShippingAddressRequestSchema.parse(request);
  console.log("go here");

  const address = await AddressModel.findById(addressId);

  if (!address) {
    throw new HttpException(
      `The address with id '${addressId}' is not found`,
      404
    );
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      shippingAddress: address._id,
    },
    { new: true }
  );

  response.status(200).json({ updatedUser });
});
