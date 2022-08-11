import { XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import Drawer from "../Shared/Drawer";

import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useShoppingCart from "../../hooks/useShoppingCart";
import { selectAllCartItems, setShowCartDrawer } from "../../slices/cart.slice";

export default function CartDrawer() {
  const showCartDrawer = useAppSelector((state) => state.cart.showCartDrawer);
  const cartItems = useAppSelector(selectAllCartItems);

  const totalPrice = useMemo(
    () =>
      cartItems ? cartItems.reduce((sum, item) => sum + item.price, 0) : 0,
    [cartItems]
  );

  const { handleDeleteCartItem } = useShoppingCart();

  const dispatch = useAppDispatch();

  const closeCartModal = () => {
    dispatch(setShowCartDrawer(false));
  };

  return (
    <Drawer
      title="Shopping Cart"
      isOpen={showCartDrawer}
      closeModal={closeCartModal}
    >
      <section className="mt-6 flex-1 px-4 sm:px-6">
        {cartItems?.map((item) => (
          <div key={item.productId} className="flex mb-5">
            <div className="shrink-0 w-24 h-full rounded-sm overflow-hidden">
              <img
                src={item.image}
                alt="product thumbnail"
                className="w-full h-full"
              />
            </div>
            <div className="grow ml-3 space-y-1">
              <Link
                to={`/products/${item.productId}`}
                className="block font-roboto text-lg font-medium text-gray-700 hover:text-primary transition"
                onClick={closeCartModal}
              >
                {item.title}
              </Link>
              <p className="mr-4 text-xs">
                <span className="font-medium">Price: </span>${item.price}
              </p>
              <p className="text-xs">
                <span className="font-medium">Quantity: </span>
                {item.quantity}
              </p>
            </div>
            <button
              className="bg-white rounded-full w-fit h-fit cursor-pointer hover:text-primary hover:bg-gray-300/30 transition"
              onClick={handleDeleteCartItem(item.productId)}
            >
              <XIcon className="h-6 w-6 p-1" />
            </button>
          </div>
        ))}
      </section>
      <footer className="px-4 sm:px-6 pb-6 sticky bottom-0 border-t border-gray-200 bg-white">
        <div className="pt-4 flex items-center justify-between">
          <h4 className="uppercase text-lg font-medium">Total</h4>
          <h4 className="text-lg">${totalPrice.toFixed(2)}</h4>
        </div>
        <div className="mt-2 flex items-center gap-x-3">
          <Link
            to="/cart"
            className="flex-1 default-btn py-2 text-sm"
            onClick={closeCartModal}
          >
            View Cart
          </Link>
          <Link
            to="/checkout"
            type="button"
            className="flex-1 default-btn py-2 text-sm bg-white text-primary hover:bg-primary hover:text-white"
            onClick={closeCartModal}
          >
            Check out
          </Link>
        </div>
      </footer>
    </Drawer>
  );
}
