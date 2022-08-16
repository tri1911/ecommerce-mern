import { useCallback } from "react";
import {
  addWishlistItem,
  removeWishlistItem,
  fetchWishlist,
} from "slices/wishlists.slice";
import { useAppDispatch, useAppSelector } from ".";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.wishlist);

  const addedToWishlist = (productId: string) =>
    items?.map((item) => item._id).includes(productId);

  const handleAddToWishlist = useCallback(
    (productId: string) => () => {
      dispatch(addWishlistItem(productId));
    },
    [dispatch]
  );

  const handleRemoveWishlistItem = useCallback(
    (productId: string) => () => {
      dispatch(removeWishlistItem(productId));
    },
    [dispatch]
  );

  const getUserWishlist = useCallback(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return {
    items,
    status,
    addedToWishlist,
    handleAddToWishlist,
    handleRemoveWishlistItem,
    getUserWishlist,
  };
};

export default useWishlist;
