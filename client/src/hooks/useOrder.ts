import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  cancelOrder,
  getOrdersByUser,
  selectAllOrders,
} from "slices/orders.slice";
import { useNavigate } from "react-router-dom";

const useOrder = () => {
  const status = useAppSelector((state) => state.orders.status);
  const orders = useAppSelector(selectAllOrders);

  const dispatch = useAppDispatch();

  const fetchOrders = useCallback(() => {
    dispatch(getOrdersByUser());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleCancelOrder = useCallback(
    (orderId: string) => () => {
      dispatch(cancelOrder(orderId))
        .unwrap()
        .then((updated) => {
          console.log("updated", updated);
          navigate("/account/orders");
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(
            "rejectedValueOrSerializedError",
            rejectedValueOrSerializedError.payload.message ||
              rejectedValueOrSerializedError.error.message
          );
        });
    },
    [dispatch, navigate]
  );

  return { orders, status, fetchOrders, handleCancelOrder };
};

export default useOrder;
