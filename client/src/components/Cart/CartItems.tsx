import React from "react";
import CartItem from "./CartItem";

export default function CartItemsSection() {
  return (
    <section className="xl:col-span-9 lg:col-span-8">
      <div className="bg-gray-200 py-2 pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex">
        <p className="text-gray-600 text-center">Product</p>
        <p className="text-gray-600 text-center ml-auto mr-16 xl:mr-24">
          Quantity
        </p>
        <p className="text-gray-600 text-center">Total</p>
      </div>
      <div className="space-y-4">
        <CartItem />
        <CartItem />
      </div>
    </section>
  );
}
