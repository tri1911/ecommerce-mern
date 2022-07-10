import express from "express";
import { getProductById, getProducts } from "../controllers/product.controller";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
