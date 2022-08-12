/**
 * Required External Modules
 */

import express, { Request, Response } from "express";
import config from "config";
import Stripe from "stripe";
import cartModel, { CartItem } from "@models/cart.model";
import { HttpException } from "@utils/custom-errors.util";
import logger from "@utils/logger.util";

/**
 * Stripe Configurations
 */

const secretKey = config.get<string>("stripe.secretKey");
const stripe = new Stripe(secretKey, { apiVersion: "2022-08-01" });

/**
 * Create endpoint to create an PaymentIntent by using the stripe node library which  abstracts the interaction with Stripe api
 *
 * 1. install stripe-node library
 * 2. create the stripe client instance with the Stripe secret key
 * 3. create the endpoint to initialize new payment intent use `stripe.paymentIntents.create()`
 */

const router = express.Router();

/**
 * The server endpoint for handing the publishable key to client-side
 */
router.get("/config", (_req: Request, res: Response) => {
  // params including `paymentMethodType` and `currency`
  res.json({ publishableKey: "some key here" });
});

/**
 * Helper function to compute the cart's sub-total
 * @param {CartItem[]} items cart items
 * @returns {number} sub-total price of cart
 */
const calculateOrderAmount = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/**
 * The server endpoint for creating a new payment session for customer
 */
router.post("/create-payment-intent", async (_req: Request, res: Response) => {
  const cart = await cartModel.findOne({ userId: "62edf2d16cd1c92a63582ee4" });

  if (!cart) {
    throw new HttpException("cart is not found");
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cart.items),
    currency: "cad",
    payment_method: "pm_card_visa",
    // automatic_payment_methods: {
    //   enabled: true,
    // },
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
});

/**
 * The server endpoint that updates the amount on the PaymentIntent
 */
router.get("/update", async (_req: Request, res: Response) => {
  const paymentIntent = await stripe.paymentIntents.update(
    "{{PAYMENT_INTENT_ID}}",
    {
      amount: 1499,
    }
  );
  res.json({ status: paymentIntent.status });
});

/* Reflect the update on client-side with `elements.fetchUpdates()` like so:
  (async () => {
    const response = await fetch('/update');
    if (response.status === 'requires_payment_method') {
      const {error} = await elements.fetchUpdates();
    }
  })();
*/

/**
 * The server endpoint that listen stripe events
 */

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    let event = JSON.parse(req.body as string) as Stripe.Event;

    // Secure the webhook by verifying whether the request comes from Stripe (an endpoint secret is required)
    if (config.has("stripe.webhookSecret")) {
      const endpointSecret = config.get<string>("stripe.webhookSecret");
      // Get the signature sent by Stripe
      const signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body as string,
          signature as string,
          endpointSecret
        );
      } catch (err) {
        if (err instanceof Error) {
          logger.error(
            `⚠️ Webhook signature verification failed.`,
            err.message
          );
        }
        return res.sendStatus(400);
      }

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          // const paymentIntent = event.data.object;
          // logger.info(
          //   `PaymentIntent for ${paymentIntent.amount} was successful!`
          // );
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
        case "payment_method.attached":
          // const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        default:
          // Unexpected event type
          logger.error(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      res.send();
    }
  }
);

export default router;
