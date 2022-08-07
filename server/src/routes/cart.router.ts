import express from "express";
import cartControllers from "@controllers/cart.controller";

const router = express.Router();

router.get("/:userId", cartControllers.getCart);
router.post("/:userId/items", cartControllers.addItemToCart);
router.put("/:userId/items", cartControllers.updateItemQuantity);
router.delete("/:userId/items/:productId", cartControllers.removeCartItem);
router.delete("/:userId/empty-cart", cartControllers.emptyCart);

export default router;
