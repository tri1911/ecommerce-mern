import { OrderSummaryCard } from "pages/MyAccountPage/ManageAccount/ProfileSummary/RecentOrders";

export default function OrderCancellations() {
  return (
    <ul className="space-y-6">
      <OrderSummaryCard />
      <OrderSummaryCard />
      <OrderSummaryCard />
      <OrderSummaryCard />
    </ul>
  );
}
