import { Types } from "mongoose";
import CartModel from "@models/cart.model";
import ProductModel from "@models/product.model";
import { HttpException } from "@utils/custom-errors.util";

/**
 * Shopping cart with no reservation (only reserve cart items at the checkout process)
 */

const getCart = async (userId: Types.ObjectId | string) => {
  let cart = await CartModel.findOne({ userId });
  // create new cart if it does not exist
  if (!cart) {
    cart = await CartModel.create({ userId });
  }
  return cart;
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
  const cart = await CartModel.findOne({ userId });
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new HttpException("product is not found", 404);
  }

  const { title, image, price, countInStock } = product;

  if (cart) {
    // check whether the item was already added to the cart previously
    const foundIdx = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    // if the item does exists, add the new quantity to the current one
    if (foundIdx !== -1) {
      const oldQty = cart.items[foundIdx].quantity;
      // update to new, accumulated qty (cap the new qty to in-stock count)
      cart.items[foundIdx].quantity = Math.min(countInStock, oldQty + quantity);
      // update other properties as well
      cart.items[foundIdx].title = title;
      cart.items[foundIdx].image = image;
      cart.items[foundIdx].price = price;
    } else {
      // otherwise, push new item into cart
      cart.items.push({ productId, title, image, price, quantity });
    }
    const updatedCart = await cart.save();
    return updatedCart;
  } else {
    // create new cart with newly added item if it does not exist
    const newCart = await CartModel.create({
      userId,
      items: [{ productId, title, image, price, quantity }],
    });
    return newCart;
  }
};

// TODO: remove cart item if the qty = 0
const updateItemQuantity = async ({
  userId,
  productId,
  newQty,
}: {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  newQty: number;
}) => {
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new HttpException("product is not found", 404);
  }

  newQty = Math.min(newQty, product.countInStock);

  const updatedCart = await CartModel.findOneAndUpdate(
    { userId, "items.productId": productId },
    // cap quantity to the in-stock qty
    { $set: { "items.$.quantity": newQty } },
    { new: true }
  );

  return updatedCart;
};

const removeCartItem = async ({
  userId,
  productId,
}: {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
}) => {
  const updatedCart = await CartModel.findOneAndUpdate(
    { userId, "items.productId": productId },
    { $pull: { items: { productId } } },
    { new: true }
  );
  return updatedCart;
};

const emptyCart = async (userId: Types.ObjectId) => {
  const updatedCart = await CartModel.findOneAndUpdate(
    { userId },
    { items: [] },
    { new: true }
  );
  return updatedCart;
};

/**
 * at the time of checkout, attempt to reserve all requested cart items
 */

const cartItemsReservation = async (userId: Types.ObjectId) => {
  const cart = await CartModel.findOne({ userId });
  if (cart) {
    // reverse cart items (move requested product quantities into `reservations` array)
    const updatedProducts = await Promise.all(
      cart.items.map(async (item) => {
        const product = await ProductModel.findById(item.productId);
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
  emptyCart,
  cartItemsReservation,
};
