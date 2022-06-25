import React from "react";
import QuantitySelector from "../Shared/QuantitySelector";

function CartItemImage() {
  return (
    <div className="w-32 shrink-0">
      <img
        src="/images/products/product9.jpg"
        className="w-full"
        alt="cart item"
      />
    </div>
  );
}

function CartItemContent() {
  return (
    <div className="md:w-1/3 w-full">
      <h2 className="text-gray-800 mb-3 xl:text-xl text-lg font-medium uppercase">
        Italian L Shape Sofa
      </h2>
      <p className="text-primary font-semibold">$45.00</p>
      <p className="text-gray-500">Size: M</p>
    </div>
  );
}

function CartItemPrice() {
  return (
    <div className="ml-auto md:ml-0">
      <p className="text-primary text-lg font-semibold">$320.00</p>
    </div>
  );
}

function CartDeleteButton() {
  return (
    <div className="text-gray-600 hover:text-primary cursor-pointer">
      <i className="fas fa-trash" />
    </div>
  );
}

export default function CartItem() {
  return (
    <div className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap">
      <CartItemImage />
      <CartItemContent />
      <QuantitySelector />
      <CartItemPrice />
      <CartDeleteButton />
    </div>
  );
}
