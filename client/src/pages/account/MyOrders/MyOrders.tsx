import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import { getOrdersByUser, selectAllOrders } from "slices/orders.slice";
import { OrderSummaryCard } from "../ProfileSummary/RecentOrders";

export default function MyOrders() {
  const dispatch = useAppDispatch();
  // const orders = useAppSelector(selectAllOrders);

  useEffect(() => {
    dispatch(getOrdersByUser());
  }, [dispatch]);

  return (
    <ul className="space-y-6">
      <OrderSummaryCard />
      <OrderSummaryCard />
      <OrderSummaryCard />
    </ul>
  );
}
