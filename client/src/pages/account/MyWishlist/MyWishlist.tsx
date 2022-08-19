import { Link } from "react-router-dom";
import classNames from "classnames";
import { type WishlistItem } from "services/user.service";
import useWishlist from "hooks/useWishlist";
import useShoppingCart from "hooks/useShoppingCart";
import { TrashIcon } from "@heroicons/react/outline";

function WishlistItemRow({
  item,
  onAddToCartClicked,
  onRemoveWishlistItemClicked,
}: {
  item: WishlistItem;
  onAddToCartClicked?: React.MouseEventHandler<HTMLButtonElement>;
  onRemoveWishlistItemClicked?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { _id, title, image, price, countInStock } = item;
  const isAvailable = countInStock > 0;

  return (
    <div className="__wrapper space-y-3 md:space-y-0 md:grid md:grid-cols-12 md:gap-6 md:items-center p-4 border border-gray-200 rounded relative">
      <div className="__image w-24 h-20 md:col-span-2">
        <Link to={`/products/${_id}`}>
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="item thumbnail"
          />
        </Link>
      </div>
      <div className="__content w-full md:col-span-4">
        <Link to={`/products/${_id}`}>
          <h2 className="mb-1 text-sm sm:text-base text-gray-800 font-medium uppercase truncate hover:text-primary transition">
            {title}
          </h2>
        </Link>
        <p className="text-gray-500 text-xs sm:text-sm">
          Availability:{" "}
          <span
            className={classNames(
              { "text-green-600": isAvailable },
              { "text-red-600": !isAvailable }
            )}
          >
            {isAvailable ? "In Stock" : "Out of Stock"}
          </span>
        </p>
      </div>
      <div className="__price w-full md:col-span-2">
        <p className="text-primary text-sm sm:text-base font-semibold">
          ${price.toFixed(2)}
        </p>
      </div>
      <div className="md:col-span-3">
        <button
          className="__add-btn default-btn px-6 py-2 text-xs sm:text-sm"
          onClick={onAddToCartClicked}
        >
          Add to cart
        </button>
      </div>
      <div className="absolute top-2 right-3 md:static md:col-span-1">
        <button
          className="__delete-btn text-gray-600 hover:text-primary cursor-pointer"
          onClick={onRemoveWishlistItemClicked}
        >
          <TrashIcon className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
}

export default function MyWishlist() {
  const { items, handleRemoveWishlistItem } = useWishlist();
  const { handleAddToCart } = useShoppingCart();

  // TODO: add a `svg` image
  return !items || items.length === 0 ? (
    <div className="pt-4 pb-16 text-center">
      <h3 className="font-medium text-xl">Your wishlist is empty.</h3>
      <p className="mb-6">Add items you want to shop.</p>
      <Link to="/shop" className="default-btn">
        Shop Now
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
      {items.map((item) => (
        <WishlistItemRow
          key={item._id}
          item={item}
          onAddToCartClicked={handleAddToCart({
            productId: item._id,
            quantity: 1,
          })}
          onRemoveWishlistItemClicked={handleRemoveWishlistItem(item._id)}
        />
      ))}
    </div>
  );
}
