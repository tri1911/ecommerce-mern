import React from "react";
import { Link } from "react-router-dom";
import useShoppingCart from "hooks/useShoppingCart";
import useWishlist from "hooks/useWishlist";
import Rating from "components/Shared/Rating";
import type { Product } from "services/product.service";

// NOTE: should extract each sub-sections into private, separate components?
export default function ProductHorizontalCard({
  product,
}: {
  product: Product;
}) {
  const { _id, image, title, description, price, ratings } = product;

  const { handleAddToCart } = useShoppingCart();
  const { addedToWishlist, handleAddToWishlist, handleRemoveWishlistItem } =
    useWishlist();

  return (
    <div className="__wrapper border border-gray-200 rounded bg-white md:grid grid-cols-3 gap-3">
      <Link to={`/products/${_id}`} className="md:col-span-1">
        <img src={image} alt="product thumbnail" className="w-full md:h-full" />
      </Link>
      <div className="p-4 space-y-1 md:col-span-2">
        <div className="__content space-y-3 pb-3">
          <Link to={`/products/${_id}`}>
            <h4 className="__title mb-2 capitalize text-xl font-medium text-gray-800 truncate hover:text-primary transition">
              {title}
            </h4>
          </Link>
          <div className="__price flex items-baseline space-x-2">
            <p className="font-roboto text-lg text-primary font-medium">
              ${price.toFixed(2)}
            </p>
            <p className="font-roboto text-base font-medium text-gray-500 line-through">
              ${(price * 1.25).toFixed(2)}
            </p>
          </div>
          <div className="__rating flex items-center">
            <Rating rating={ratings.average} />
            <div className="font-poppins text-xs text-gray-500 ml-3">
              ({ratings.count})
            </div>
          </div>
          <p className="__desc text-gray-700">{description.slice(0, 100)}</p>
        </div>
        <div className="__cta-btn flex items-center text-sm space-x-4">
          <button
            className="px-4 py-2 border border-primary text-center rounded bg-primary text-white font-medium hover:bg-transparent hover:text-primary transition"
            onClick={handleAddToCart({ productId: _id, quantity: 1 })}
          >
            <span className="mr-2">
              <i className="fas fa-shopping-cart" />
            </span>
            Add to Cart
          </button>
          <button
            className="px-6 py-2 border border-primary text-center rounded bg-white text-primary font-medium hover:bg-primary hover:text-white transition"
            onClick={
              addedToWishlist(_id)
                ? handleRemoveWishlistItem(_id)
                : handleAddToWishlist(_id)
            }
          >
            <span className="mr-2">
              <i
                className={
                  addedToWishlist(_id) ? "fas fa-heart" : "far fa-heart"
                }
              />
            </span>
            {addedToWishlist(_id) ? "Added" : "Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
