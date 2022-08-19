import { Types } from "mongoose";
import OrderModel from "@models/order.model";

const getOrdersByUser = async (userId: Types.ObjectId | string) => {
  const orders = await OrderModel.find({ userId });
  return orders;
};

const cancelOrder = async ({
  userId,
  orderId,
}: {
  userId: Types.ObjectId | string;
  orderId: Types.ObjectId | string;
}) => {
  const updatedOrder = await OrderModel.findOneAndUpdate(
    { _id: orderId, userId, status: "processing" },
    { status: "cancelled" },
    { new: true }
  );
  return updatedOrder;
};

const getCancellations = async (userId: Types.ObjectId | string) => {
  const cancellations = await OrderModel.find({ userId, status: "cancelled" });
  return cancellations;
};

export default { getOrdersByUser, cancelOrder, getCancellations };
