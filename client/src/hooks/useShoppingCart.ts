import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from ".";
import {
  getCart,
  cartItemAdded,
  cartItemRemoved,
  itemQuantityUpdated,
  setShowCartDrawer,
} from "slices/cart.slice";

const useShoppingCart = () => {
  const { status, data, showCartDrawer } = useAppSelector(
    (state) => state.cart
  );
  const items = data?.items;

  const dispatch = useAppDispatch();

  const fetchCart = useCallback(() => {
    dispatch(getCart());
  }, [dispatch]);

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

  const openCartDrawer = useCallback(() => {
    dispatch(setShowCartDrawer(true));
  }, [dispatch]);

  const closeCartDrawer = useCallback(() => {
    dispatch(setShowCartDrawer(false));
  }, [dispatch]);

  return {
    status,
    showCartDrawer,
    openCartDrawer,
    closeCartDrawer,
    items,
    fetchCart,
    handleAddToCart,
    handleDeleteCartItem,
    handleUpdateItemQuantity,
  };
};

export default useShoppingCart;
