import brandControllers from "@controllers/brand.controller";
import express from "express";

const router = express.Router();

router.get("/", brandControllers.getAllBrands);

export default router;
