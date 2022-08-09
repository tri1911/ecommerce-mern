import express from "express";
import productController from "@controllers/product.controller";

const router = express.Router();

router.route("/").post(productController.createNewProduct);
router.get("/:id", productController.getSingleProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/new", productController.getNewArrivalProducts);

export default router;
