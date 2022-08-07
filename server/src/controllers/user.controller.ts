import asyncHandler from "express-async-handler";
import { HttpException } from "@utils/custom-errors.util";
import userSchemas from "@schemas/user.schema";
import userServices from "@services/user.service";
import { Role } from "@models/user.model";

const getUserById = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id },
  } = userSchemas.getUserById.parse(req);

  // only allow admins to access other user records
  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const user = await userServices.getUserById(id);
    if (user) {
      res.status(200).json({ user });
    } else {
      throw new HttpException("Cannot found the user", 404);
    }
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id },
    body: userUpdate,
  } = userSchemas.updateUserById.parse(req);

  // only the owner or admin can update user profile
  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const updatedUser = await userServices.updateUserById(
      currentUser._id,
      userUpdate
    );
    res.status(201).json({ updatedUser });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id },
    body: { currentPassword, newPassword },
  } = userSchemas.updateUserPassword.parse(req);

  // only the owner or admin can update the password
  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const updatedUser = await userServices.updateUserPassword({
      userId: currentUser._id,
      currentPassword,
      newPassword,
    });

    res.status(201).json({ updatedUser });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await userServices.getAllUsers();
  res.status(200).json(users);
});

export default {
  getUserById,
  updateUserById,
  updateUserPassword,
  getAllUsers,
};
