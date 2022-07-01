import { OrderSummaryCard } from "./ManageAccount";

export default function OrderHistory() {
  return (
    <ul className="space-y-6">
      <OrderSummaryCard />
      <OrderSummaryCard />
      <OrderSummaryCard />
    </ul>
  );
}
