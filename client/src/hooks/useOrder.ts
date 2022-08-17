import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getOrdersByUser, selectAllOrders } from "slices/orders.slice";

const useOrder = () => {
  const orders = useAppSelector(selectAllOrders);
  const status = useAppSelector((state) => state.orders.status);

  const dispatch = useAppDispatch();

  const fetchOrders = useCallback(() => {
    dispatch(getOrdersByUser());
  }, [dispatch]);

  return { orders, status, fetchOrders };
};

export default useOrder;
