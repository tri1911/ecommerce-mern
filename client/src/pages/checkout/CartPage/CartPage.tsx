import { Link } from "react-router-dom";
import { useMemo } from "react";
import useShoppingCart from "hooks/useShoppingCart";
import useStripeCheckout from "hooks/useStripeCheckout";
import { type CartItem } from "services/cart.service";
import Breadcrumbs from "components/Shared/Breadcrumbs";
import Spinner from "components/Shared/Spinner";
import QuantitySelector from "components/Shared/QuantitySelector";
import { TrashIcon, XIcon } from "@heroicons/react/outline";

// TODO: change the layout to grid (since the columns are not line up properly)
function CartItemRow({ item }: { item: CartItem }) {
  const { handleDeleteCartItem, handleUpdateItemQuantity } = useShoppingCart();

  const { productId, title, image, price, quantity } = item;

  return (
    <div className="relative grid grid-cols-12 gap-4 sm:gap-6 items-center p-4 border border-gray-200 rounded">
      {/* Image */}
      <div className="w-full aspect-[4/3] rounded overflow-hidden col-span-3 md:col-span-2">
        <img
          src={image}
          className="w-full h-full object-cover"
          alt="Cart Item Thumbnail"
        />
      </div>
      {/* Content */}
      <div className="col-span-5 md:col-span-7 space-y-2 md:grid md:grid-cols-3 md:items-center md:gap-6">
        <div className="space-y-1 md:col-span-2">
          <Link
            to={`/products/${productId}`}
            className="block text-xs sm:text-sm md:text-base lg:text-lg truncate text-gray-800 font-roboto font-medium uppercase hover:text-primary transition"
          >
            {title}
          </Link>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-primary font-semibold">
            ${price.toFixed(2)}
          </p>
          {/* <p className="text-gray-500">Size: {size.toUpperCase()}</p> */}
        </div>
        {/* Qty Selector */}
        <div className="md:col-span-1">
          <QuantitySelector
            value={item.quantity}
            onIncreaseQty={handleUpdateItemQuantity({
              productId,
              quantity: quantity + 1,
            })}
            onDecreaseQty={handleUpdateItemQuantity({
              productId,
              quantity: quantity - 1,
            })}
          />
        </div>
      </div>
      {/* Total Price */}
      <div className="col-span-3 md:col-span-2">
        <p className="text-primary text-sm sm:text-base font-semibold text-center">
          ${(quantity * price).toFixed(2)}
        </p>
      </div>
      {/* Delete Btn */}
      <div className="col-span-1 self-start md:self-center">
        <button
          className="text-gray-600 hover:text-primary cursor-pointer"
          onClick={handleDeleteCartItem(productId)}
        >
          <XIcon className="md:hidden w-4 h-4" />
          <TrashIcon className="hidden md:block w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function CartSummary({
  cartItems,
  onCheckoutPressed,
}: {
  cartItems: CartItem[];
  onCheckoutPressed?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const priceInTotal = useMemo(
    () =>
      cartItems.reduce((sum, { price, quantity }) => sum + price * quantity, 0),
    [cartItems]
  );

  return (
    <section className="xl:col-span-3 lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
      <h4 className="mb-4 text-lg font-semibold text-gray-800 uppercase">
        Order Summary
      </h4>
      {/* Cart Sub-Total */}
      <div className="space-y-1 text-gray-600 pb-3 border-b border-gray-200">
        <div className="flex justify-between font-medium">
          <p>Subtotal</p>
          <p>${priceInTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p>Free</p>
        </div>
      </div>
      <div className="flex justify-between my-3 text-gray-800 font-semibold uppercase">
        <h4>Total</h4>
        <h4>${priceInTotal.toFixed(2)}</h4>
      </div>
      {/* Coupon */}
      <div className="flex mb-5">
        <input
          type="text"
          className="pl-4 w-full border border-r-0 border-primary py-2 px-3 rounded-l-md focus:ring-primary focus:border-primary text-sm"
          placeholder="Coupon Code"
        />
        <button
          type="submit"
          className="px-5 border border-primary rounded-r-md bg-primary text-sm font-medium font-roboto text-white hover:bg-transparent hover:text-primary transition"
        >
          Apply
        </button>
      </div>
      {/* CheckoutBtn */}
      <button
        className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition text-sm w-full block text-center"
        onClick={onCheckoutPressed}
      >
        Proceed to Checkout
      </button>
    </section>
  );
}

export default function CartPage() {
  const { status, items: cartItems } = useShoppingCart();

  const { handleCheckout } = useStripeCheckout();

  if (status === "loading") {
    return <Spinner />;
  }

  if (!cartItems) {
    return null;
  }

  // TODO: add a `svg` image
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Cart" }]} />
      {cartItems.length === 0 ? (
        <div className="pt-4 pb-16 text-center">
          <h3 className="font-medium text-xl">Your shopping cart is empty.</h3>
          <p className="mb-6">Add items you want to shop.</p>
          <Link to="/shop" className="default-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
          <section className="xl:col-span-9 lg:col-span-8">
            {/* Heading */}
            <div className="bg-gray-200 py-2 mb-4 hidden md:grid md:grid-cols-12 font-medium">
              <p className="text-gray-600 text-center md:col-span-6">Product</p>
              <p className="text-gray-600 text-center md:col-span-3">
                Quantity
              </p>
              <p className="text-gray-600 text-center md:col-span-2">Total</p>
            </div>
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </div>
          </section>
          <CartSummary
            cartItems={cartItems}
            onCheckoutPressed={handleCheckout}
          />
        </div>
      )}
    </div>
  );
}
