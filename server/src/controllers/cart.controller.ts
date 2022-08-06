import asyncHandler from "express-async-handler";
import cartSchemas from "@schemas/cart.schema";
import cartServices from "@services/cart.service";
import { userInRequestSchema } from "@schemas/user.schema";

const getCart = asyncHandler(async (req, res) => {
  const { _id } = userInRequestSchema.parse(req.user);
  const cart = await cartServices.getCart(_id);
  res.status(200).json({ cart });
});

const addItemToCart = asyncHandler(async (req, res) => {
  const {
    user: { _id },
    body: { productId, quantity },
  } = cartSchemas.addItemToCart.parse(req);

  const updatedCart = await cartServices.addItemToCart({
    userId: _id,
    productId,
    quantity,
  });

  res.status(201).json({ updatedCart });
});

const updateItemQuantity = asyncHandler(async (req, res) => {
  const {
    user: { _id },
    body: { productId, newQuantity },
  } = cartSchemas.updateItemQuantity.parse(req);

  const updatedCart = await cartServices.updateItemQuantity({
    userId: _id,
    productId,
    newQuantity,
  });

  res.status(201).json({ updatedCart });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const {
    user: { _id },
    body: { productId },
  } = cartSchemas.removeCartItem.parse(req);

  await cartServices.removeCartItem({ userId: _id, productId });

  res.status(204).json({ message: "successfully remove cart item" });
});

export default { getCart, addItemToCart, updateItemQuantity, removeCartItem };
