import { useState } from "react";
import { Link } from "react-router-dom";
import useShoppingCart from "hooks/useShoppingCart";
import useWishlist from "hooks/useWishlist";
import Rating from "./Rating";
import type { Product } from "services/product.service";
import type { Fn } from "types";
import ProductDetailsModal from "./ProductDetailsModal";

function ProductCardHeader({
  image,
  addedToWishlist,
  onAddToWishlistClicked,
  onRemoveFromWishlistClicked,
  openQuickView,
}: {
  image: string;
  addedToWishlist?: boolean;
  onAddToWishlistClicked?: React.MouseEventHandler<HTMLButtonElement>;
  onRemoveFromWishlistClicked?: React.MouseEventHandler<HTMLButtonElement>;
  openQuickView?: Fn<[], void>;
}) {
  return (
    <div className="relative">
      <div className="h-48 overflow-hidden">
        <img className="w-full" src={image} alt="product thumbnail" />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
        <button
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
          onClick={openQuickView}
        >
          <i className="fas fa-search" />
        </button>
        <button
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
          onClick={
            addedToWishlist
              ? onRemoveFromWishlistClicked
              : onAddToWishlistClicked
          }
        >
          <i className={addedToWishlist ? "fas fa-heart" : "far fa-heart"} />
        </button>
      </div>
    </div>
  );
}

function ProductCardContent({
  product: { _id, title, price, ratings },
  onAddToCartClicked,
}: {
  product: Product;
  onAddToCartClicked?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="py-4 px-4 relative overflow-hidden">
      <Link to={`/products/${_id}`}>
        <h4 className="truncate capitalize font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
          {title}
        </h4>
      </Link>
      <div className="__price-rating-wrapper opacity-100 group-hover:opacity-0">
        <div className="__price flex items-baseline mb-1 space-x-2">
          <p className="text-lg text-primary font-roboto font-medium">
            ${price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 font-roboto line-through">
            ${(price * 1.25).toFixed(2)}
          </p>
        </div>
        <div className="__rating flex items-center">
          <Rating rating={ratings.average} />
          <div className="text-xs text-gray-500 ml-3">({ratings.count})</div>
        </div>
      </div>
      <div className="__cta-btn absolute left-4 top-14 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition duration-300">
        <button
          className="inline-block px-4 py-2 min-w-[150px] uppercase border border-primary rounded text-center text-base font-medium bg-primary text-white hover:bg-transparent hover:text-primary transition duration-300"
          onClick={onAddToCartClicked}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductVerticalCard({ product }: { product: Product }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { handleAddToCart } = useShoppingCart();
  const { addedToWishlist, handleAddToWishlist, handleRemoveWishlistItem } =
    useWishlist();

  return (
    <div className="group rounded bg-white border border-gray-200 shadow-md overflow-hidden">
      <ProductCardHeader
        image={product.image}
        addedToWishlist={addedToWishlist(product._id)}
        onAddToWishlistClicked={handleAddToWishlist(product._id)}
        onRemoveFromWishlistClicked={handleRemoveWishlistItem(product._id)}
        openQuickView={() => setIsQuickViewOpen(true)}
      />
      <ProductCardContent
        product={product}
        onAddToCartClicked={handleAddToCart({
          productId: product._id,
          quantity: 1,
        })}
      />
      <ProductDetailsModal
        product={product}
        isQuickViewOpen={isQuickViewOpen}
        closeQuickView={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
}
