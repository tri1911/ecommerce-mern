import { useCallback } from "react";
import { useAppDispatch } from ".";
import {
  cartItemAdded,
  cartItemRemoved,
  itemQuantityUpdated,
  setShowCartDrawer,
} from "../slices/cart.slice";

const useShoppingCart = () => {
  const dispatch = useAppDispatch();

  const handleAddToCart = useCallback(
    (payload: { productId: string; quantity: number }) => () => {
      dispatch(cartItemAdded(payload));
      dispatch(setShowCartDrawer(true));
    },
    [dispatch]
  );

  const handleDeleteCartItem = useCallback(
    (productId: string) => () => {
      dispatch(cartItemRemoved(productId));
    },
    [dispatch]
  );

  const handleUpdateItemQuantity = useCallback(
    (payload: { productId: string; quantity: number }) => () => {
      dispatch(itemQuantityUpdated(payload));
    },
    [dispatch]
  );

  return { handleAddToCart, handleDeleteCartItem, handleUpdateItemQuantity };
};

export default useShoppingCart;
