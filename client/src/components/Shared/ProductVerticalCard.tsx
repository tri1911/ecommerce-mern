import { Link } from "react-router-dom";
import { useAddCartItem, useAddWishlistItem } from "../../app/hooks";
import { Product } from "../../types";
import Rating from "./Rating";

function ProductCardHeader({
  id,
  image,
  isAddedToWishlist,
  onWishlistClicked,
}: {
  id: string;
  image: string;
  isAddedToWishlist: boolean;
  onWishlistClicked: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="relative">
      <img className="w-full" src={image} alt="product thumbnail" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
        <Link
          to={`/products/${id}`}
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
        >
          <i className="fas fa-search" />
        </Link>
        <button
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
          onClick={onWishlistClicked}
        >
          <i className={isAddedToWishlist ? "fas fa-heart" : "far fa-heart"} />
        </button>
      </div>
    </div>
  );
}

function ProductCardContent({
  product: { _id, name, price, rating, reviews },
  onAddToCartClicked,
}: {
  product: Product;
  onAddToCartClicked?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="py-4 px-4 relative overflow-hidden">
      <Link to={`/products/${_id}`}>
        <h4 className="truncate capitalize font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
          {name}
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
          <Rating rating={rating} />
          <div className="text-xs text-gray-500 ml-3">({reviews})</div>
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
  const { _id, name, image, price, countInStock } = product;

  const { isAddedToWishlist, handleAddToWishlist } =
    useAddWishlistItem(product);

  const { handleAddToCart } = useAddCartItem({
    item: { productId: _id, name, image, price, countInStock },
    size: "m",
    quantity: 1,
    color: "black",
  });

  return (
    <div className="group rounded bg-white border border-gray-200 shadow-md overflow-hidden">
      <ProductCardHeader
        id={product._id}
        image={product.image}
        isAddedToWishlist={isAddedToWishlist}
        onWishlistClicked={handleAddToWishlist}
      />
      <ProductCardContent
        product={product}
        onAddToCartClicked={handleAddToCart}
      />
    </div>
  );
}
