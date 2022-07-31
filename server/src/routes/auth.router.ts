import express from "express";
import authControllers from "@controllers/auth.controller";

const router = express.Router();

router.post("/login", authControllers.userLogin);
router.post("/register", authControllers.userSignUp);

export default router;
