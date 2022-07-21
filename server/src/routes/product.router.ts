import express from "express";
import productController from "@controllers/product.controller";

const router = express.Router();

router.get("/:id", productController.getSingleProduct);

export default router;
