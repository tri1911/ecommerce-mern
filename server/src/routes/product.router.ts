import express from "express";
import productController from "@controllers/product.controller";

const router = express.Router();

router
  .route("/")
  .post(productController.createNewProduct)
  .get(productController.getAllProducts);
router
  .route("/:id")
  .get(productController.getSingleProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
