import express from "express";
import authorize from "@middlewares/authorize.middleware";
import orderControllers from "@controllers/order.controller";

const router = express.Router();

router.get("/:userId", authorize(), orderControllers.getOrdersByUser);

export default router;
