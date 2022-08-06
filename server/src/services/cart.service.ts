import { Types } from "mongoose";
import CartModel from "@models/cart.model";
import ProductModel from "@models/product.model";

/**
 * Shopping cart with no reservation (only reserve cart items at the checkout process)
 */

const getCart = async (userId: Types.ObjectId) => {
  return await CartModel.find({ userId });
};

const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
}) => {
  // fetch necessary product information first
  const product = await ProductModel.findById(productId);

  // add the item into the cart only when the in-stock quantity is sufficient
  if (product && product.countInStock >= quantity) {
    const { title, image, price } = product;

    // add new item into cart (create new cart if user's cart is not active)
    const updatedCart = await CartModel.findOneAndUpdate(
      {
        userId,
        status: "active",
      },
      {
        $push: { items: { productId, quantity, title, image, price } },
      },
      { new: true, upsert: true }
    );

    return updatedCart;
  } else {
    throw new Error(
      product ? "the item is out of stock" : "product to add is not found"
    );
  }
};

const updateItemQuantity = async ({
  userId,
  productId,
  newQuantity,
}: {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  newQuantity: number;
}) => {
  const product = await ProductModel.findById(productId);

  if (product && product.countInStock >= newQuantity) {
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId, "items.productId": productId, status: "active" },
      { $set: { "items.$.quantity": newQuantity } },
      { new: true }
    );

    return updatedCart;
  } else {
    throw new Error(
      product
        ? "updated quantity is over the quantity limit"
        : "product to add is not found"
    );
  }
};

const removeCartItem = async ({
  userId,
  productId,
}: {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
}) => {
  await CartModel.findOneAndUpdate(
    { userId, "items.productId": productId },
    { $pull: { items: { productId } } }
  );
};

/**
 * at the time of checkout, attempt to reserve all requested cart items
 * and, set the cart `status` to `pending`
 */

const cartItemsReservation = async (userId: Types.ObjectId) => {
  const cart = await CartModel.findOne({ userId });
  if (cart) {
    // reverse cart items (move requested product quantities into `reservations` array)
    const updatedProducts = await Promise.all(
      cart.items.map(async (item) => {
        const product = await ProductModel.findOne({
          productId: item.productId,
        });
        // check whether in-stock count is sufficient before reserve products
        if (product && product.countInStock >= item.quantity) {
          product.countInStock -= item.quantity;
          product.reservations.push({
            userId,
            quantity: item.quantity,
            modifiedAt: new Date(),
          });
          return product;
        } else {
          throw new Error(
            product
              ? `item with productId ${item.productId} is over limit quantity`
              : `product with id ${item.productId} is not found`
          );
        }
      })
    );
    // save updates to database
    await ProductModel.bulkSave(updatedProducts);
  } else {
    throw new Error("cart is not found");
  }
};

export default {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeCartItem,
  cartItemsReservation,
};
