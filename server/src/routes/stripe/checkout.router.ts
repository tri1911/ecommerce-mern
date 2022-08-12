/**
 * Required External Modules
 */

import express, { Request, Response } from "express";
import Stripe from "stripe";
import config from "config";
import logger from "@utils/logger.util";
import CartModel, { CartItem } from "@models/cart.model";

const router = express.Router();

/**
 * Stripe Client Configurations
 */

const secretKey = config.get<string>("stripe.secretKey");
const stripe = new Stripe(secretKey, { apiVersion: "2022-08-01" });

/**
 * Endpoints
 */

const MY_DOMAIN = "http://localhost:3000/stripe-checkout";

router.post(
  "/create-checkout-session",
  async (_req: Request, res: Response) => {
    const cart = await CartModel.findOne({
      userId: "62edf2d16cd1c92a63582ee4",
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: "customer@example.com",
      submit_type: "pay",
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      line_items: generateLineItems(cart?.items ?? []),
      mode: "payment",
      success_url: `${MY_DOMAIN}?success=true`,
      cancel_url: `${MY_DOMAIN}?canceled=true`,
      // automatic_tax: { enabled: true },
    });

    res.redirect(303, session.url as string);
  }
);

router.get("/list-sessions", async (_req: Request, res: Response) => {
  const sessions = await stripe.checkout.sessions.list();
  res.status(200).json(sessions);
});

router.get("/sessions/:id", async (req: Request, res: Response) => {
  const sessions = await stripe.checkout.sessions.retrieve();
  res.status(200).json(sessions);
});

/**
 * Webhook to listen & handle events from Stripe
 */

router.post(
  "/webhook",
  // Use `express.raw()` to retrieve the raw body as a buffer
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    let event;

    // Verify the event came from Stripe (webhook endpoint secret is required)
    try {
      if (!config.has("stripe.webhookEndpointSecret")) {
        throw new Error("Webhook endpoint secret key is missing");
      }
      const payload = req.body as Buffer;
      // Get the webhook secret
      const endpointSecret = config.get<string>("stripe.webhookEndpointSecret");
      // Get the signature sent by Stripe
      const signature = req.headers["stripe-signature"] as string;

      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // On error, log and return 400 response
      logger.error(`Error message: ${err.message}`);
      return res.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        // Fulfill the purchase..
        await fulfillOrder(session);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.sendStatus(200);
  }
);

/**
 * Utility Functions
 */

/**
 * function to convert cart items into line items for the checkout session
 *
 * @param {Array<CartItem>} items cart items
 * @returns {Array<Stripe.Checkout.SessionCreateParams.LineItem>} checkout line items
 */

const generateLineItems = (
  items: CartItem[]
): Stripe.Checkout.SessionCreateParams.LineItem[] => {
  return items.map((item) => ({
    price_data: {
      currency: "cad",
      product_data: {
        name: item.title,
        // NOTE: change to item's image instead
        images: ["https://i.imgur.com/EHyR2nP.png"],
      },
      unit_amount: item.price,
      tax_behavior: "exclusive",
    },
    quantity: item.quantity,
  }));
};

const fulfillOrder = async (session: Stripe.Event.Data.Object) => {
  // TODO: fill me in
  // logger.info("Fulfilling order", session);

  logger.info("Retrieving line_items...");
  const lineItems = await stripe.checkout.sessions.listLineItems(
    (<{ id: string }>session).id
  );
  logger.info("return:", lineItems);
};

export default router;
