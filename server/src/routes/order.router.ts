import express from "express";
import authorize from "@middlewares/authorize.middleware";
import orderControllers from "@controllers/order.controller";

const router = express.Router();

router.get(
  "/:userId/cancellations",
  authorize(),
  orderControllers.getCancellations
);
router.put(
  "/:userId/:orderId/cancel",
  authorize(),
  orderControllers.cancelOrder
);
// should be api/orders/:userId or api/users/:userId/orders
router.get("/:userId", authorize(), orderControllers.getOrdersByUser);

export default router;
