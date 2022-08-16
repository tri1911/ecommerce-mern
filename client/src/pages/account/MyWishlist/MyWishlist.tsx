import { Link } from "react-router-dom";
import classNames from "classnames";
import { type WishlistItem } from "services/user.service";
import useWishlist from "hooks/useWishlist";
import useShoppingCart from "hooks/useShoppingCart";

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
    <div className="__wrapper flex items-center md:justify-between gap-4 md:gap-6 p-4 pr-5 border border-gray-200 rounded flex-wrap md:flex-nowrap relative">
      <div className="__image w-28 shrink-0">
        <Link to={`/products/${_id}`}>
          <img className="w-full" src={image} alt="item thumbnail" />
        </Link>
      </div>
      <div className="__content w-full md:w-fit">
        <Link to={`/products/${_id}`}>
          <h2 className="mb-1 text-lg xl:text-xl text-gray-800 font-medium uppercase hover:text-primary transition">
            {title}
          </h2>
        </Link>
        <p className="text-gray-500 text-sm">
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
      <div className="__price w-full md:w-fit">
        <p className="text-primary text-lg font-semibold">
          ${price.toFixed(2)}
        </p>
      </div>
      <button
        className="__add-btn default-btn block px-6 py-2"
        onClick={onAddToCartClicked}
      >
        Add to cart
      </button>
      <button
        className="__delete-btn absolute md:static top-2 right-3 text-gray-600 hover:text-primary cursor-pointer"
        onClick={onRemoveWishlistItemClicked}
      >
        <i className="fas fa-trash" />
      </button>
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
