/**
 * Required External Modules
 */

import express from "express";
import authorize from "@middlewares/authorize.middleware";
import stripeControllers from "@controllers/stripe.controller";

const router = express.Router();

/**
 * Endpoints
 */

router.get("/config", stripeControllers.getPublishableKey);

router.post(
  "/create-checkout-session",
  authorize(),
  stripeControllers.createCheckoutSession
);

/**
 * Webhook to listen & handle events from Stripe
 */

router.post(
  "/webhook",
  // Use `express.raw()` to retrieve the raw body as a buffer
  express.raw({ type: "application/json" }),
  stripeControllers.handleStripeEvents
);

/**
 * Testings with Stripe API
 */

router.get("/sessions", stripeControllers.getSessionsList);
router.get("/sessions/:id", stripeControllers.getSessionById);
router.get("/customers", stripeControllers.getAllCustomers);
router.get("/customers/:id", stripeControllers.getCustomerById);
router.get("/payment_intents/:id", stripeControllers.getPaymentIntentById);
router.get("/payment_methods/:id", stripeControllers.getPaymentMethodById);

export default router;
