import express from "express";
import {
  getSingleProduct,
  getProducts,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/:id", getSingleProduct);
router.get("/", getProducts);

export default router;
