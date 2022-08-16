import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from ".";
import {
  selectWishlistIds,
  wishlistItemAdded,
  wishlistItemRemoved,
} from "../slices/wishlists.slice";
import { Product } from "../types";

export const useAddWishlistItem = (product: Product) => {
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);

  const isAddedToWishlist = wishlistIds.includes(product._id);

  const handleAddToWishlist = useCallback(() => {
    const { _id, name, image, inStockQty, price } = product;

    if (!isAddedToWishlist) {
      dispatch(
        wishlistItemAdded({
          productId: _id,
          name,
          image,
          price,
          inStockQty,
        })
      );
    } else {
      dispatch(wishlistItemRemoved(_id));
    }
  }, [product, isAddedToWishlist, dispatch]);

  return { isAddedToWishlist, handleAddToWishlist };
};

export const useRemoveWishlistItem = (productId: string) => {
  const dispatch = useAppDispatch();

  const handleRemoveWishlistItem = useCallback(() => {
    dispatch(wishlistItemRemoved(productId));
  }, [dispatch, productId]);

  return { handleRemoveWishlistItem };
};
