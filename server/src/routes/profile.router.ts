import express from "express";
import {
  getProfile,
  setShippingAddress,
  updatePassword,
  updateProfile,
} from "../controllers/profile.controller";

const router = express.Router();

router.route("/").get(getProfile).put(updateProfile);
router
  .put("/password", updatePassword)
  .put("/shipping_address", setShippingAddress);

export default router;
