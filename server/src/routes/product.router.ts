import express from "express";
import productController from "@controllers/product.controller";

const router = express.Router();

router.route("/").post(productController.createNewProduct);
router
  .route("/:id")
  .get(productController.getSingleProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);
router.get("/new", productController.getNewArrivalProducts);

export default router;
