import { OrderSummaryCard } from "./ManageAccount";

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
