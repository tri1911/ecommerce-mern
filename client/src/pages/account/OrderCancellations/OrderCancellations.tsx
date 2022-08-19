import { useAppSelector } from "hooks";
import { selectAllCancellations } from "slices/cancellations.slice";
import { OrderSummaryCard } from "../ProfileSummary/RecentOrders";

export default function OrderCancellations() {
  const cancellations = useAppSelector(selectAllCancellations);

  return (
    <ul className="space-y-6">
      {cancellations.map((order) => (
        <OrderSummaryCard key={order._id} order={order} />
      ))}
    </ul>
  );
}
