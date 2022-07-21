import express from "express";
import {
  createNewAddress,
  deleteAddress,
  getAddressById,
  getAllAddresses,
  updateAddress,
} from "@controllers/address.controller";

const router = express.Router();

router.route("/").get(getAllAddresses).post(createNewAddress);
router
  .route("/:id")
  .get(getAddressById)
  .put(updateAddress)
  .delete(deleteAddress);

export default router;
