import useOrder from "hooks/useOrder";
import { OrderSummaryCard } from "../ProfileSummary/RecentOrders";

export default function MyOrders() {
  const { orders } = useOrder();

  return (
    <ul className="space-y-6">
      {orders.map((order) => (
        <OrderSummaryCard key={order._id} order={order} />
      ))}
    </ul>
  );
}
