import Breadcrumbs from "../components/Shared/Breadcrumbs";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";
import { useAppSelector } from "../hooks";
import { selectAllCartItems } from "../slices/cartSlice";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cartItems = useAppSelector(selectAllCartItems);

  // TODO: add a `svg` image
  return (
    <div>
      <Breadcrumbs paths={["Shopping Cart"]} />
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
          <CartItems cartItems={cartItems} />
          <CartSummary cartItems={cartItems} />
        </div>
      )}
    </div>
  );
}
