import express from "express";
import authorize from "@middlewares/authorize.middleware";
import { Role } from "@models/user.model";
import userControllers from "@controllers/user.controller";

const router = express.Router();

// only admin
router.get("/", authorize(Role.Admin), userControllers.getAllUsers);
// all authenticated users
router.get("/:id", authorize(), userControllers.getUserById);
router.put("/:id", authorize(), userControllers.updateUserById);
router.put("/:id/password", authorize(), userControllers.updateUserPassword);
// address-related
router.post("/:id/addresses", authorize(), userControllers.addNewAddress);
router.put(
  "/:id/addresses/:addressId",
  authorize(),
  userControllers.updateAddress
);
router.delete(
  "/:id/addresses/:addressId",
  authorize(),
  userControllers.removeAddress
);

export default router;
