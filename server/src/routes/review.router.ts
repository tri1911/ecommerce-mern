import express from "express";
import reviewControllers from "@controllers/review.controller";
import authorize from "@middlewares/authorize.middleware";
import { Role } from "@models/user.model";

const router = express.Router();

router.post("/", authorize(), reviewControllers.createReview);
router.put("/", authorize(), reviewControllers.updateReview);
router.get("/", authorize(Role.Admin), reviewControllers.getAllReviews);

export default router;
