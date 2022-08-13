import OrderModel from "@models/order.model";
import { Types } from "mongoose";

const getOrdersByUser = async (userId: Types.ObjectId | string) => {
  return await OrderModel.find({ userId });
};

export default { getOrdersByUser };
