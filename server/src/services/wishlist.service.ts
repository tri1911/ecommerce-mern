import WishlistModel from "@models/wishlist.model";
import { Types } from "mongoose";

const addWishlistItem = async ({
  userId,
  productId,
}: {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
}) => {
  const updatedWishlist = await WishlistModel.findOneAndUpdate(
    { user: userId },
    { $addToSet: { items: productId } },
    { upsert: true, new: true }
  ).populate("items", { title: 1, image: 1, price: 1, countInStock: 1 });

  return updatedWishlist;
};

const removeWishlistItem = async ({
  userId,
  productId,
}: {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
}) => {
  const updatedWishlist = await WishlistModel.findOneAndUpdate(
    {
      user: userId,
    },
    {
      $pull: { items: productId },
    },
    { new: true }
  ).populate("items", { title: 1, image: 1, price: 1, countInStock: 1 });

  return updatedWishlist;
};

const getUserWishlist = async ({ userId }: { userId: Types.ObjectId }) => {
  const wishlist = await WishlistModel.findOne({ user: userId }).populate(
    "items",
    { title: 1, image: 1, price: 1, countInStock: 1 }
  );
  return wishlist;
};

export default { addWishlistItem, removeWishlistItem, getUserWishlist };
