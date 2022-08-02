import express from "express";
import profileControllers from "@controllers/profile.controller";

const router = express.Router();

router
  .route("/")
  .get(profileControllers.getUserProfile)
  .put(profileControllers.updateUserProfile);
router.put("/password", profileControllers.updateUserPassword);

export default router;
