/**
 * Required External Modules
 */

import Stripe from "stripe";
import express, { Request, Response } from "express";
import { Types } from "mongoose";
import { z } from "zod";
import config from "config";
import logger from "@utils/logger.util";
import authorize from "@middlewares/authorize.middleware";
import { userInRequestSchema } from "@schemas/user.schema";
import CartModel, { CartItem } from "@models/cart.model";
import OrderModel, { OrderItem, PaymentMethod } from "@models/order.model";

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

router.get("/config", (_req: Request, res: Response) => {
  if (config.has("stripe.publishableKey")) {
    res
      .status(200)
      .json({ publishableKey: config.get<string>("stripe.publishableKey") });
  } else {
    res.status(404).json({ message: "Stripe publishable key not found." });
  }
});

router.post(
  "/create-checkout-session",
  authorize(),
  async (req: Request, res: Response) => {
    const loggedInUser = userInRequestSchema.parse(req.user);
    const cart = await CartModel.findOne({ userId: loggedInUser._id });

    // TODO: save or update the user info into Stripe server to leverage the pre-filling saved payment method feature

    const session = await stripe.checkout.sessions.create({
      customer_email: loggedInUser.email,
      client_reference_id: loggedInUser._id.toString(),
      // customer: "cus_MEJs6LLtRD5EkO",
      // payment_intent_data: { setup_future_usage: "off_session" },
      mode: "payment",
      submit_type: "pay",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      billing_address_collection: "auto",
      line_items: validateLineItems(cart?.items ?? []),
      success_url: `${MY_DOMAIN}?success=true`,
      cancel_url: `${MY_DOMAIN}?canceled=true`,
      // Configured to expire after 30 mins
      expires_at: Math.floor(Date.now() / 1000) + 1800,
    });

    res.status(200).json({ sessionId: session.id });
  }
);

/**
 * Testings
 */

const requestWithIdParam = z.object({ params: z.object({ id: z.string() }) });

router.get("/sessions/list", async (_req: Request, res: Response) => {
  const sessions = await stripe.checkout.sessions.list();
  res.status(200).json(sessions);
});

router.get("/sessions/:id", async (req: Request, res: Response) => {
  const { params } = requestWithIdParam.parse(req);
  const session = await stripe.checkout.sessions.retrieve(params.id, {
    expand: [
      "customer",
      "line_items.data.price.product",
      "payment_intent.payment_method",
    ],
  });
  res.json(session);
});

router.get("/customers", async (_req: Request, res: Response) => {
  const customers = await stripe.customers.list();
  res.status(200).json(customers);
});

router.get("/customers/:id", async (req: Request, res: Response) => {
  const { params } = requestWithIdParam.parse(req);
  const customer = await stripe.customers.retrieve(params.id);
  res.status(200).json(customer);
});

router.get("/payment_intents/:id", async (req: Request, res: Response) => {
  const { params } = requestWithIdParam.parse(req);
  const paymentIntent = await stripe.paymentIntents.retrieve(params.id);
  res.status(200).json(paymentIntent);
});

router.get("/payment_methods/:id", async (req: Request, res: Response) => {
  const { params } = requestWithIdParam.parse(req);
  const paymentMethod = await stripe.paymentMethods.retrieve(params.id);
  res.status(200).json(paymentMethod);
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
        await fulfillOrder(session as Stripe.Checkout.Session);
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
 * an function to convert cart items to line items for the checkout session
 *
 * @param {Array<CartItem>} items cart items
 * @returns {Array<Stripe.Checkout.SessionCreateParams.LineItem>} checkout line items
 */

const validateLineItems = (
  items: CartItem[]
): Stripe.Checkout.SessionCreateParams.LineItem[] => {
  return items.map((item) => ({
    price_data: {
      currency: "cad",
      product_data: {
        name: item.title,
        // NOTE: change to item's image instead
        images: ["https://i.imgur.com/EHyR2nP.png"],
        metadata: {
          productId: item.productId.toString(),
        },
      },
      unit_amount: item.price,
      tax_behavior: "exclusive",
    },
    quantity: item.quantity,
  }));
};

const extractOrderItems = (lineItems: Stripe.LineItem[]): OrderItem[] =>
  lineItems.map((item) => ({
    productId: new Types.ObjectId(
      (item.price?.product as Stripe.Product).metadata["productId"]
    ),
    image: (item.price?.product as Stripe.Product).images[0],
    name: item.description,
    unitAmount: item.price?.unit_amount ?? 0,
    quantity: item.quantity ?? 0,
  }));

const extractPaymentMethod = (
  paymentMethod: Stripe.PaymentMethod
): PaymentMethod => {
  const {
    billing_details: { email, name, address },
    card,
  } = paymentMethod;

  return {
    billingDetails: {
      email: email ?? undefined,
      name: name ?? undefined,
      address: address?.line1 ?? undefined,
      city: address?.city ?? undefined,
      country: address?.country ?? undefined,
      province: address?.state ?? undefined,
      postalCode: address?.postal_code ?? undefined,
    },
    brand: card?.brand,
    funding: card?.funding,
    last4: card?.last4,
    country: card?.country ?? undefined,
    expMonth: card?.exp_month,
    expYear: card?.exp_year,
  };
};

const fulfillOrder = async (session: Stripe.Checkout.Session) => {
  const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items.data.price.product", "payment_intent.payment_method"],
  });

  const {
    client_reference_id,
    line_items,
    amount_subtotal,
    amount_total,
    shipping_details,
    payment_intent,
  } = expandedSession;

  const createdOrder = await OrderModel.create({
    userId: client_reference_id as string,
    status: "processing",
    items: extractOrderItems(line_items?.data ?? []),
    amountSubTotal: amount_subtotal,
    amountTotal: amount_total,
    shippingDetails: {
      name: shipping_details?.name,
      address: shipping_details?.address?.line1,
      city: shipping_details?.address?.city,
      province: shipping_details?.address?.state,
      country: shipping_details?.address?.country,
      postalCode: shipping_details?.address?.postal_code,
    },
    paymentMethod: extractPaymentMethod(
      (payment_intent as Stripe.PaymentIntent)
        .payment_method as Stripe.PaymentMethod
    ),
    checkoutSessionId: session.id,
  });

  console.log("order", createdOrder);
};

export default router;
