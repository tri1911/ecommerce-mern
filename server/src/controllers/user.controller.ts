import asyncHandler from "express-async-handler";
import { HttpException } from "@utils/custom-errors.util";
import userSchemas from "@schemas/user.schema";
import userServices from "@services/user.service";
import reviewServices from "@services/review.service";
import wishlistServices from "@services/wishlist.service";
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

/**
 * Addresses
 */

const addNewAddress = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id },
    body: { newAddress, isDefault },
  } = userSchemas.addNewAddress.parse(req);

  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const updatedUser = await userServices.addNewAddress({
      userId: id,
      newAddress,
      isDefault,
    });
    res.status(201).json({ updatedUser });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id, addressId },
    body: { addressUpdate, isDefault },
  } = userSchemas.updateAddress.parse(req);

  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const updatedUser = await userServices.updateAddress({
      userId: id,
      addressId,
      addressUpdate,
      isDefault,
    });

    res.status(201).json({ updatedUser });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const removeAddress = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id, addressId },
  } = userSchemas.removeAddress.parse(req);

  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const updatedUser = await userServices.removeAddress({
      userId: id,
      addressId,
    });
    res.status(201).json({ updatedUser });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

/**
 * Reviews
 */

const getReviewsByUser = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id },
  } = userSchemas.getReviewsByUser.parse(req);

  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const reviews = await reviewServices.getReviewsByUser({
      userId: currentUser._id,
    });
    res.status(200).json({ reviews });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

/**
 * Wishlist
 */

const addWishlistItem = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id },
    body: { productId },
  } = userSchemas.addWishlistItem.parse(req);

  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const updatedWishlist = await wishlistServices.addWishlistItem({
      userId: currentUser._id,
      productId,
    });
    res.status(200).json({ updatedWishlist });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});
const removeWishlistItem = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id, productId },
  } = userSchemas.removeWishlistItem.parse(req);

  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const updatedWishlist = await wishlistServices.removeWishlistItem({
      userId: currentUser._id,
      productId,
    });
    res.status(200).json({ updatedWishlist });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const getUserWishlist = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { id },
  } = userSchemas.getUserWishlist.parse(req);

  if (id === currentUser._id.toString() || currentUser.role === Role.Admin) {
    const wishlist = await wishlistServices.getUserWishlist({
      userId: currentUser._id,
    });
    res.status(200).json({ wishlist });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

export default {
  getUserById,
  updateUserById,
  updateUserPassword,
  getAllUsers,
  addNewAddress,
  updateAddress,
  removeAddress,
  getReviewsByUser,
  addWishlistItem,
  removeWishlistItem,
  getUserWishlist,
};
