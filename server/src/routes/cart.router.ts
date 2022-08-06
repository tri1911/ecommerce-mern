import express from "express";
import cartControllers from "@controllers/cart.controller";

const router = express.Router();

router.get("/", cartControllers.getCart);
router.post("/", cartControllers.addItemToCart);
router.put("/", cartControllers.updateItemQuantity);
router.delete("/", cartControllers.removeCartItem);

export default router;
