import express from "express";
import { authenticateUser, registerUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", authenticateUser);
router.post("/register", registerUser);

export default router;
