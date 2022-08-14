import Stripe from "stripe";
import { Request, Response } from "express";
import config from "config";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
import logger from "@utils/logger.util";
import { userInRequestSchema } from "@schemas/user.schema";
import CartModel, { CartItem } from "@models/cart.model";
import OrderModel, { OrderItem, PaymentMethod } from "@models/order.model";

/**
 * Stripe Client Configurations
 */

const secretKey = config.get<string>("stripe.secretKey");
const stripe = new Stripe(secretKey, { apiVersion: "2022-08-01" });

const MY_DOMAIN = "http://localhost:3000/stripe-checkout";

const getPublishableKey = asyncHandler((_req: Request, res: Response) => {
  if (config.has("stripe.publishableKey")) {
    res
      .status(200)
      .json({ publishableKey: config.get<string>("stripe.publishableKey") });
  } else {
    res.status(404).json({ message: "Stripe publishable key not found." });
  }
});

const createCheckoutSession = asyncHandler(
  async (req: Request, res: Response) => {
    const loggedInUser = userInRequestSchema.parse(req.user);
    const cart = await CartModel.findOne({ userId: loggedInUser._id });

    // TODO: save or update the user info into Stripe server to leverage the pre-filling saved payment method feature

    const session = await stripe.checkout.sessions.create({
      customer_email: loggedInUser.email,
      // customer: "cus_MEJs6LLtRD5EkO",
      client_reference_id: loggedInUser._id.toString(),
      payment_intent_data: {
        setup_future_usage: "off_session",
      },
      mode: "payment",
      submit_type: "pay",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      line_items: validateLineItems(cart?.items ?? []),
      success_url: "http://localhost:3000/order-complete",
      cancel_url: `${MY_DOMAIN}?canceled=true`,
      // Configured to expire after 30 mins
      expires_at: Math.floor(Date.now() / 1000) + 1800,
    });

    res.status(200).json({ sessionId: session.id });
  }
);

const handleStripeEvents = asyncHandler(async (req: Request, res: Response) => {
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

    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        // Fulfill the purchase...
        await fulfillOrder(session as Stripe.Checkout.Session);
        break;
      case "checkout.session.expired":
        // Roll-back items to inventory...
        logger.info("Checkout session has been expired!");
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.sendStatus(200);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // On error, log and return 400 response
    logger.error(`Error message: ${err.message}`);
    res.sendStatus(400);
  }
});

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

const extractShippingDetails = (
  shippingDetails: Stripe.Checkout.Session.ShippingDetails
) => {
  const { name, address } = shippingDetails;

  return {
    name: name,
    address: address?.line1,
    city: address?.city,
    province: address?.state,
    country: address?.country,
    postalCode: address?.postal_code,
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

  await OrderModel.create({
    userId: client_reference_id as string,
    status: "processing",
    items: extractOrderItems(line_items?.data ?? []),
    amountSubTotal: amount_subtotal,
    amountTotal: amount_total,
    shippingDetails:
      shipping_details && extractShippingDetails(shipping_details),
    paymentMethod:
      payment_intent &&
      extractPaymentMethod(
        (payment_intent as Stripe.PaymentIntent)
          .payment_method as Stripe.PaymentMethod
      ),
    stripeCheckoutId: session.id,
  });
};

/**
 * Testing with Stripe API
 */

import { z } from "zod";

const requestWithIdParam = z.object({ params: z.object({ id: z.string() }) });

const getSessionsList = asyncHandler(async (_req: Request, res: Response) => {
  const sessions = await stripe.checkout.sessions.list();
  res.status(200).json(sessions);
});

const getSessionById = asyncHandler(async (req: Request, res: Response) => {
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

const getAllCustomers = asyncHandler(async (_req: Request, res: Response) => {
  const customers = await stripe.customers.list();
  res.status(200).json(customers);
});

const getCustomerById = asyncHandler(async (req: Request, res: Response) => {
  const { params } = requestWithIdParam.parse(req);
  const customer = await stripe.customers.retrieve(params.id);
  res.status(200).json(customer);
});

const getPaymentIntentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { params } = requestWithIdParam.parse(req);
    const paymentIntent = await stripe.paymentIntents.retrieve(params.id);
    res.status(200).json(paymentIntent);
  }
);

const getPaymentMethodById = asyncHandler(
  async (req: Request, res: Response) => {
    const { params } = requestWithIdParam.parse(req);
    const paymentMethod = await stripe.paymentMethods.retrieve(params.id);
    res.status(200).json(paymentMethod);
  }
);

export default {
  getPublishableKey,
  createCheckoutSession,
  handleStripeEvents,
  getSessionsList,
  getSessionById,
  getAllCustomers,
  getCustomerById,
  getPaymentIntentById,
  getPaymentMethodById,
};
