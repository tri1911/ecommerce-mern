import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cartItemAdded } from "../../slices/cartSlice";
import { selectAllWishlistItems } from "../../slices/wishlistSlice";
import { WishlistItem } from "../../types";

function WishlistItemRow({
  item: { image, name, price, countInStock },
  onAddToCartClicked,
}: {
  item: WishlistItem;
  onAddToCartClicked?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="__wrapper flex items-center md:justify-between gap-4 md:gap-6 p-4 pr-5 border border-gray-200 rounded flex-wrap md:flex-nowrap relative">
      <div className="__image w-28 shrink-0">
        <img className="w-full" src={image} alt="item thumbnail" />
      </div>
      <div className="__content w-full md:w-fit">
        <h2 className="mb-1 text-gray-800 text-lg xl:text-xl font-medium uppercase">
          {name}
        </h2>
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
        <p className="text-primary text-lg font-semibold">${price.toFixed()}</p>
      </div>
      <button
        className="__add-btn default-btn block px-6 py-2"
        onClick={onAddToCartClicked}
      >
        Add to cart
      </button>
      <div className="__delete-btn absolute md:static top-2 right-3 text-gray-600 hover:text-primary cursor-pointer">
        <i className="fas fa-trash" />
      </div>
    </div>
  );
}

export default function Wishlist() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectAllWishlistItems);

  const handleAddToCart = (item: WishlistItem) => () => {
    const { productId, name, image, price, countInStock } = item;
    // NOTE: determine the default values for size & color
    dispatch(
      cartItemAdded({
        productId,
        name,
        image,
        price,
        countInStock,
        size: "l",
        color: "black",
        quantity: 1,
      })
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
      {wishlistItems.map((item) => (
        <WishlistItemRow
          key={item.productId}
          item={item}
          onAddToCartClicked={handleAddToCart(item)}
        />
      ))}
    </div>
  );
}
