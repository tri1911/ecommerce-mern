import asyncHandler from "express-async-handler";
import { HttpException } from "@utils/custom-errors.util";
import userSchemas from "@schemas/user.schema";
import profileServices from "@services/profile.service";

const getUserProfile = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
  } = userSchemas.getUserProfile.parse(request);

  const user = await profileServices.getUserProfile(userId);

  if (user) {
    response.status(200).json({ user });
  } else {
    throw new HttpException(
      `User profile with id '${userId}' is not found`,
      404
    );
  }
});

const updateUserProfile = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
    body: profileUpdate,
  } = userSchemas.updateUserProfile.parse(request);

  const updatedUser = await profileServices.updateUserProfile(
    userId,
    profileUpdate
  );

  response.status(201).json({ updatedUser });
});

const updateUserPassword = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
    body: { currentPassword, newPassword },
  } = userSchemas.updateUserPassword.parse(request);

  await profileServices.updateUserPassword({
    userId,
    currentPassword,
    newPassword,
  });

  response
    .status(201)
    .json({ message: "Password has been updated successfully" });
});

export default { getUserProfile, updateUserProfile, updateUserPassword };
