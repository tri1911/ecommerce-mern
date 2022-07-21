import express from "express";
import categoryController from "@controllers/category.controller";

const router = express.Router();

router.post("/", categoryController.createNewCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getSingleCategory);

export default router;
