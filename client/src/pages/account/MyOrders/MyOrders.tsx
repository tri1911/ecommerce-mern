import { OrderSummaryCard } from "../ProfileSummary/RecentOrders";

export default function MyOrders() {
  return (
    <ul className="space-y-6">
      <OrderSummaryCard />
      <OrderSummaryCard />
      <OrderSummaryCard />
    </ul>
  );
}
