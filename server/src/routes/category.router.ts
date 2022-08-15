import express from "express";
import categoryController from "@controllers/category.controller";

const router = express.Router();

router.post("/", categoryController.createNewCategory);
router.get("/", categoryController.getCategoriesTree);
router.get("/:id/products", categoryController.getProductsByCategory);
router.get("/:id", categoryController.getSingleCategory);

export default router;
