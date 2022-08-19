import asyncHandler from "express-async-handler";
import orderServices from "@services/order.service";
import orderSchemas from "@schemas/order.schema";
import { Role } from "@models/user.model";

const getOrdersByUser = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { userId },
  } = orderSchemas.getOrdersByUser.parse(req);

  if (
    currentUser._id.toString() === userId ||
    currentUser.role === Role.Admin
  ) {
    const orders = await orderServices.getOrdersByUser(currentUser._id);
    res.status(200).json({ orders });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access this resource" });
  }
});

const cancelOrder = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { userId, orderId },
  } = orderSchemas.cancelOrder.parse(req);

  if (
    currentUser._id.toString() === userId ||
    currentUser.role === Role.Admin
  ) {
    const updatedOrder = await orderServices.cancelOrder({
      userId: currentUser._id,
      orderId,
    });
    res.status(200).json({ updatedOrder });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access this resource" });
  }
});

const getCancellations = asyncHandler(async (req, res) => {
  const {
    user: currentUser,
    params: { userId },
  } = orderSchemas.getCancellations.parse(req);

  if (
    currentUser._id.toString() === userId ||
    currentUser.role === Role.Admin
  ) {
    const cancellations = await orderServices.getCancellations(currentUser._id);
    res.status(200).json({ cancellations });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to access this resource" });
  }
});

export default { getOrdersByUser, cancelOrder, getCancellations };
