import Breadcrumbs from "../components/Shared/Breadcrumbs";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";
import { useAppSelector } from "../app/hooks";
import { selectAllCartItems } from "../slices/cartSlice";

export default function CartPage() {
  const cartItems = useAppSelector(selectAllCartItems);

  return (
    <div>
      <Breadcrumbs paths={["Shopping Cart"]} />
      {cartItems.length === 0 ? (
        <p className="text-center pt-4 pb-16">Cart is empty</p>
      ) : (
        <div className="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
          <CartItems cartItems={cartItems} />
          <CartSummary cartItems={cartItems} />
        </div>
      )}
    </div>
  );
}
