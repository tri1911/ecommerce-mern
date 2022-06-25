import React from "react";
import { Link } from "react-router-dom";

function WishlistItem() {
  return (
    <div className="__wrapper flex items-center md:justify-between gap-4 md:gap-6 p-4 pr-5 border border-gray-200 rounded flex-wrap md:flex-nowrap relative">
      <div className="__image w-28 shrink-0">
        <img className="w-full" src="/images/products/product9.jpg" alt="" />
      </div>
      <div className="__content w-full md:w-fit">
        <h2 className="mb-1 text-gray-800 text-lg xl:text-xl font-medium uppercase">
          Italian L Shape Sofa
        </h2>
        <p className="text-gray-500 text-sm">
          Availability: <span className="text-green-600">In Stock</span>
        </p>
      </div>
      <div className="__price w-full md:w-fit">
        <p className="text-primary text-lg font-semibold">$320.00</p>
      </div>
      <Link to="/cart/id" className="__add-btn default-btn px-6 py-2">
        Add to cart
      </Link>
      <div className="__delete-btn absolute md:static top-2 right-3 text-gray-600 hover:text-primary cursor-pointer">
        <i className="fas fa-trash" />
      </div>
    </div>
  );
}

export default function Wishlist() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
      <WishlistItem />
      <WishlistItem />
      <WishlistItem />
      <WishlistItem />
      <WishlistItem />
    </div>
  );
}
