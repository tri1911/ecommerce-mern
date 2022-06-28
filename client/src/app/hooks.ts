import { useCallback, useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  cartItemAdded,
  cartItemRemoved,
  cartItemUpdated,
} from "../slices/cartSlice";
import {
  selectWishlistIds,
  wishlistItemAdded,
  wishlistItemRemoved,
} from "../slices/wishlistSlice";
import { SharedProduct, CartItem, Color, Product, Size } from "../types";
import type { RootState, AppDispatch } from "./store";

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilterCheckboxHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // make the filter checkbox to be additive (clicking `cat1` and then `cat2` adds both categories to the search params) instead of replacing the brand
  const handleCheckboxChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value, checked } = event.target;

    if (checked) {
      searchParams.append(name, value);
      setSearchParams(searchParams);
      // navigate(`/shop?${searchParams.toString()}`);
    } else {
      const newParams = new URLSearchParams(
        Array.from(searchParams).filter(([k, v]) => k !== name || v !== value)
      );
      setSearchParams(newParams);
      // navigate(`/shop?${newParams.toString()}`);
    }
  };

  return handleCheckboxChanged;
};

export const useFilterRadioHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRadioChanged: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const { name, value } = event.target;
        searchParams.set(name, value);
        setSearchParams(searchParams);
      },
      [searchParams, setSearchParams]
    );

  return handleRadioChanged;
};

/* Wishlist Hooks */

export const useAddWishlistItem = (product: Product) => {
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);

  const isAddedToWishlist = wishlistIds.includes(product._id);

  const handleAddToWishlist = useCallback(() => {
    const { _id, name, image, countInStock, price } = product;

    if (!isAddedToWishlist) {
      dispatch(
        wishlistItemAdded({ productId: _id, name, image, price, countInStock })
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

/* Shopping Cart Hooks */

export const useAddCartItem = ({
  item,
  size,
  color,
  quantity,
}: {
  item: SharedProduct;
  size?: Size;
  color?: Color;
  quantity: number;
}) => {
  const dispatch = useAppDispatch();

  const canAddItem = [size, color, quantity].every((value) => Boolean(value));

  const handleAddToCart = useCallback(() => {
    if (canAddItem) {
      const { productId, name, image, price, countInStock } = item;

      dispatch(
        cartItemAdded({
          productId,
          name,
          image,
          price,
          countInStock,
          size: size as Size,
          color: color as Color,
          quantity,
        })
      );
    }
  }, [item, size, color, quantity, dispatch, canAddItem]);

  return { canAddItem, handleAddToCart };
};

export const useUpdateCartItemQuantity = (cartItem: CartItem) => {
  const { productId, countInStock, quantity } = cartItem;

  const [selectedQuantity, updateSelectedQuantity] = useState(quantity);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedQuantity !== quantity && selectedQuantity > 0) {
      dispatch(
        cartItemUpdated({
          id: productId,
          changes: { quantity: selectedQuantity },
        })
      );
    }
  }, [quantity, selectedQuantity, productId, dispatch]);

  const increaseQuantity = useCallback(() => {
    if (selectedQuantity < countInStock) {
      updateSelectedQuantity(selectedQuantity + 1);
    }
  }, [selectedQuantity, countInStock]);

  const decreaseQuantity = useCallback(() => {
    if (selectedQuantity > 0) {
      updateSelectedQuantity(selectedQuantity - 1);
    }
  }, [selectedQuantity]);

  return { selectedQuantity, increaseQuantity, decreaseQuantity };
};

export const useDeleteCartItem = (productId: string) => {
  const dispatch = useAppDispatch();

  const handleDeleteCartItem = () => {
    dispatch(cartItemRemoved(productId));
  };

  return { handleDeleteCartItem };
};
