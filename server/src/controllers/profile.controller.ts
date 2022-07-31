import asyncHandler from "express-async-handler";
import profileServices from "@services/profile.service";
import userSchemas from "@schemas/user.schema";

export const getUserProfile = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
  } = userSchemas.getUserProfile.parse(request);

  const user = await profileServices.getUserProfile(userId);

  response.status(200).json({ user });
});

export const updateUserProfile = asyncHandler(async (request, response) => {
  const {
    user: { _id: userId },
    body: profileUpdate,
  } = userSchemas.updateUserProfile.parse(request);

  const updatedUser = await profileServices.updateUserProfile({
    userId,
    profileUpdate,
  });

  response.status(201).json({ updatedUser });
});

export const updatePassword = asyncHandler(async (request, response) => {
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
