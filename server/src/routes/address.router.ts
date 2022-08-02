import express from "express";
import addressControllers from "@controllers/address.controller";

const router = express.Router();

router
  .route("/")
  .get(addressControllers.getAllAddresses)
  .post(addressControllers.createNewAddress);
router
  .route("/:id")
  .get(addressControllers.getAddressById)
  .put(addressControllers.updateAddress)
  .delete(addressControllers.deleteAddress);

export default router;
