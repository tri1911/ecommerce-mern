import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import { getOrdersByUser, selectAllOrders } from "slices/orders.slice";
import { OrderSummaryCard } from "../ProfileSummary/RecentOrders";

export default function MyOrders() {
  const orders = useAppSelector(selectAllOrders);
  const fetchOrdersStatus = useAppSelector((state) => state.orders.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fetchOrdersStatus === "idle") {
      dispatch(getOrdersByUser());
    }
  }, [dispatch, fetchOrdersStatus]);

  return (
    <ul className="space-y-6">
      {orders.map((order) => (
        <OrderSummaryCard key={order._id} order={order} />
      ))}
    </ul>
  );
}
