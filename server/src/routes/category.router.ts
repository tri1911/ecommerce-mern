import express from "express";
import categoryController from "@controllers/category.controller";

const router = express.Router();

router
  .route("/")
  .post(categoryController.createNewCategory)
  .get(categoryController.getCategoriesTree);
router.get("/:id/products", categoryController.getProductsByCategory);
router.get("/:id", categoryController.getSingleCategory);

export default router;
