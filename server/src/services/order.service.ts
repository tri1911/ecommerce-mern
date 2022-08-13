import OrderModel from "@models/order.model";
import { Types } from "mongoose";

const getOrdersByUser = async (userId: Types.ObjectId | string) => {
  const orders = await OrderModel.find({ userId });
  return orders;
};

export default { getOrdersByUser };
