import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";
import Rating from "../Shared/Rating";

// NOTE: should extract each sub-sections into private, separate components?
export default function ProductHorizontalCard({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="__wrapper border border-gray-200 rounded bg-white md:grid grid-cols-3 gap-3">
      <Link to={`/products/${product._id}`} className="md:col-span-1">
        <img
          src={product.image}
          alt="product thumbnail"
          className="w-full md:h-full"
        />
      </Link>
      <div className="p-4 space-y-1 md:col-span-2">
        <div className="__content space-y-3 pb-3">
          <Link to={`/products/${product._id}`}>
            <h4 className="__title mb-2 capitalize text-xl font-medium text-gray-800 truncate hover:text-primary transition">
              {product.name}
            </h4>
          </Link>
          <div className="__price flex items-baseline space-x-2">
            <p className="font-roboto text-lg text-primary font-medium">
              ${product.price}
            </p>
            <p className="font-roboto text-base font-medium text-gray-500 line-through">
              ${(product.price * 1.25).toFixed(2)}
            </p>
          </div>
          <div className="__rating flex items-center">
            <Rating rating={product.rating} />
            <div className="font-poppins text-xs text-gray-500 ml-3">
              ({product.reviews})
            </div>
          </div>
          <p className="__desc text-gray-700">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatem, ipsa.
          </p>
        </div>
        <div className="__cta-btns flex items-center text-sm space-x-4">
          <Link
            to={`/cart/${product._id}`}
            className="px-4 py-2 border border-primary text-center rounded bg-primary text-white font-medium hover:bg-transparent hover:text-primary transition"
          >
            <span className="mr-2">
              <i className="fas fa-shopping-cart" />
            </span>
            Add to Cart
          </Link>
          <Link
            to={`/wishlist/${product._id}`}
            className="px-6 py-2 border border-primary text-center rounded bg-white text-primary font-medium hover:bg-primary hover:text-white transition"
          >
            <span className="mr-2">
              <i className="far fa-heart" />
            </span>
            Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
}
