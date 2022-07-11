import express from "express";
import {
  getProfile,
  updatePassword,
  updateProfile,
} from "../controllers/profile.controller";

const router = express.Router();

router.route("/").get(getProfile).put(updateProfile);
router.put("/password", updatePassword);

export default router;
