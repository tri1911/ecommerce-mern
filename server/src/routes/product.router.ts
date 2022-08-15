import express from "express";
import productController from "@controllers/product.controller";

const router = express.Router();

router.route("/").post(productController.createNewProduct);
router.get("/new", productController.getNewProducts);
router.get("/:id", productController.getSingleProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
