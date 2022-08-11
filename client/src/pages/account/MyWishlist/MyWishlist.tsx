import { Link } from "react-router-dom";
import { useAppSelector } from "hooks";
import { useRemoveWishlistItem } from "hooks/useWishlist";
import { selectAllWishlistItems } from "slices/wishlistSlice";
import { WishlistItem } from "types";

function WishlistItemRow({ item }: { item: WishlistItem }) {
  const { productId, image, name, price, inStockQty: countInStock } = item;

  // NOTE: determine the default values for size & color
  // const { handleAddToCart } = useShoppingCart({
  //   item,
  //   size: "m",
  //   color: "black",
  //   quantity: 1,
  // });

  const { handleRemoveWishlistItem } = useRemoveWishlistItem(productId);

  return (
    <div className="__wrapper flex items-center md:justify-between gap-4 md:gap-6 p-4 pr-5 border border-gray-200 rounded flex-wrap md:flex-nowrap relative">
      <div className="__image w-28 shrink-0">
        <Link to={`/products/${productId}`}>
          <img className="w-full" src={image} alt="item thumbnail" />
        </Link>
      </div>
      <div className="__content w-full md:w-fit">
        <Link to={`/products/${productId}`}>
          <h2 className="mb-1 text-lg xl:text-xl text-gray-800 font-medium uppercase hover:text-primary transition">
            {name}
          </h2>
        </Link>
        <p className="text-gray-500 text-sm">
          Availability:{" "}
          <span
            className={`${
              countInStock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {countInStock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>
      </div>
      <div className="__price w-full md:w-fit">
        <p className="text-primary text-lg font-semibold">
          ${price.toFixed(2)}
        </p>
      </div>
      <button
        className="__add-btn default-btn block px-6 py-2"
        // onClick={handleAddToCart}
      >
        Add to cart
      </button>
      <button
        className="__delete-btn absolute md:static top-2 right-3 text-gray-600 hover:text-primary cursor-pointer"
        onClick={handleRemoveWishlistItem}
      >
        <i className="fas fa-trash" />
      </button>
    </div>
  );
}

export default function MyWishlist() {
  const wishlistItems = useAppSelector(selectAllWishlistItems);

  // TODO: add a `svg` image
  return wishlistItems.length === 0 ? (
    <div className="pt-4 pb-16 text-center">
      <h3 className="font-medium text-xl">Your wishlist is empty.</h3>
      <p className="mb-6">Add items you want to shop.</p>
      <Link to="/shop" className="default-btn">
        Shop Now
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
      {wishlistItems.map((item) => (
        <WishlistItemRow key={item.productId} item={item} />
      ))}
    </div>
  );
}
