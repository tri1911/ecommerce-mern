import { Link } from "react-router-dom";
import { useMemo } from "react";
import useShoppingCart from "hooks/useShoppingCart";
import useStripeCheckout from "hooks/useStripeCheckout";
import { type CartItem } from "services/cart.service";
import Breadcrumbs from "components/Shared/Breadcrumbs";
import Spinner from "components/Shared/Spinner";
import QuantitySelector from "components/Shared/QuantitySelector";

// TODO: change the layout to grid (since the columns are not line up properly)
function CartItemRow({ item }: { item: CartItem }) {
  const { handleDeleteCartItem, handleUpdateItemQuantity } = useShoppingCart();

  const { productId, title, image, price, quantity } = item;

  return (
    <div className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap">
      {/* Image */}
      <div className="w-32 shrink-0">
        <img src={image} className="w-full" alt="Cart Item Thumbnail" />
      </div>
      {/* Content */}
      <div className="md:w-fit w-full">
        <Link to={`/products/${productId}`}>
          <h2 className="text-gray-800 mb-3 xl:text-xl text-lg font-medium uppercase hover:text-primary transition">
            {title}
          </h2>
        </Link>
        <p className="text-primary font-semibold">${price.toFixed(2)}</p>
        {/* <p className="text-gray-500">Size: {size.toUpperCase()}</p> */}
      </div>
      {/* Qty Selector */}
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
      {/* Price */}
      <div className="ml-auto md:ml-0">
        <p className="text-primary text-lg font-semibold">
          ${(quantity * price).toFixed(2)}
        </p>
      </div>
      {/* Delete Btn */}
      <button
        className="text-gray-600 hover:text-primary cursor-pointer"
        onClick={handleDeleteCartItem(productId)}
      >
        <i className="fas fa-trash" />
      </button>
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
        Process to checkout
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
            <div className="bg-gray-200 py-2 pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex font-medium">
              <p className="text-gray-600 text-center">Product</p>
              <p className="text-gray-600 text-center ml-auto mr-16 xl:mr-24">
                Quantity
              </p>
              <p className="text-gray-600 text-center">Total</p>
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
