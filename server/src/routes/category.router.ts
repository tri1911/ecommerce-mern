import express from "express";
import {
  addNewCategory,
  getAllCategories,
  getSingleCategory,
} from "../controllers/category.controller";

const router = express.Router();

router.post("/", addNewCategory);
router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);

export default router;
