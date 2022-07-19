import express from "express";
import {
  getSingleProduct,
  getProductsByCategory,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/category/:categoryId?", getProductsByCategory);
router.get("/:id", getSingleProduct);

export default router;
