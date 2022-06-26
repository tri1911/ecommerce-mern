import Breadcrumbs from "../components/Shared/Breadcrumbs";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";

export default function CartPage() {
  return (
    <div>
      <Breadcrumbs paths={["Shopping Cart"]} />
      <div className="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
        <CartItems />
        <CartSummary />
      </div>
    </div>
  );
}
