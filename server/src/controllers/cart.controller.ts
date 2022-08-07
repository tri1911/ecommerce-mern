import asyncHandler from "express-async-handler";
import cartSchemas from "@schemas/cart.schema";
import cartServices from "@services/cart.service";
import { Role } from "@models/user.model";

const getCart = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { userId },
  } = cartSchemas.getCart.parse(req);

  if (
    currentUser._id.toString() === userId ||
    currentUser.role === Role.Admin
  ) {
    const cart = await cartServices.getCart(currentUser._id);
    res.status(200).json({ cart });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const addItemToCart = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { userId },
    body: { productId, quantity },
  } = cartSchemas.addItemToCart.parse(req);

  if (
    currentUser._id.toString() === userId ||
    currentUser.role === Role.Admin
  ) {
    const updatedCart = await cartServices.addItemToCart({
      userId: currentUser._id,
      productId,
      quantity,
    });

    res.status(201).json({ updatedCart });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const updateItemQuantity = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { userId },
    body: { productId, quantity },
  } = cartSchemas.updateItemQuantity.parse(req);

  if (
    currentUser._id.toString() === userId ||
    currentUser.role === Role.Admin
  ) {
    const updatedCart = await cartServices.updateItemQuantity({
      userId: currentUser._id,
      productId,
      newQty: quantity,
    });

    res.status(201).json({ updatedCart });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const removeCartItem = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { userId, productId },
  } = cartSchemas.removeCartItem.parse(req);

  if (
    currentUser._id.toString() === userId ||
    currentUser.role === Role.Admin
  ) {
    const updatedCart = await cartServices.removeCartItem({
      userId: currentUser._id,
      productId,
    });

    res.status(204).json({ updatedCart });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { userId },
  } = cartSchemas.emptyCart.parse(req);

  if (
    currentUser._id.toString() === userId ||
    currentUser.role === Role.Admin
  ) {
    const updatedCart = await cartServices.emptyCart(currentUser._id);

    res.status(204).json({ updatedCart });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access to this resource" });
  }
});

export default {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeCartItem,
  emptyCart,
};
