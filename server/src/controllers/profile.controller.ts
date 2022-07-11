import asyncHandler from "express-async-handler";
import UserModel from "../models/user.model";
import {
  getProfileRequestSchema,
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
    throw new HttpException("User is not found", 404);
  }

  const isPasswordMatched = await user.matchPassword(currentPassword);

  if (isPasswordMatched) {
    user.password = newPassword;
    await user.save();
    response.status(200).json({ message: "Updated password successfully" });
  } else {
    throw new HttpException("The current password does not match", 401);
  }
});
