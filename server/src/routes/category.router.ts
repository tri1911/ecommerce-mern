import express from "express";
import categoryControllers from "@controllers/category.controller";

const router = express.Router();

router.post("/", categoryControllers.createNewCategory);
router.get("/", categoryControllers.getAllCategories);
router.get("/:id", categoryControllers.getSingleCategory);

export default router;
