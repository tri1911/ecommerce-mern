import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAllCartItems } from "../../slices/cartSlice";
import CartItemRow from "./CartItemRow";

function CartHeading() {
  return (
    <div className="bg-gray-200 py-2 pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex font-medium">
      <p className="text-gray-600 text-center">Product</p>
      <p className="text-gray-600 text-center ml-auto mr-16 xl:mr-24">
        Quantity
      </p>
      <p className="text-gray-600 text-center">Total</p>
    </div>
  );
}

export default function CartItemsSection() {
  const allCartItems = useAppSelector(selectAllCartItems);

  return (
    <section className="xl:col-span-9 lg:col-span-8">
      <CartHeading />
      <div className="space-y-4">
        {allCartItems.map((item) => (
          <CartItemRow key={item.productId} cartItem={item} />
        ))}
      </div>
    </section>
  );
}
