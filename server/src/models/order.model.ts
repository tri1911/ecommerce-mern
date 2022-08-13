import { Schema, model, InferSchemaType } from "mongoose";

/**
 * Order infos
 * [x] Order Number
 * [x] Line Items (name, unit price, quantity)
 * [x] Amount Total
 * [x] Purchased Date
 * [x] Shipping Details
 * [x] Billing Details
 * [x] Delivered Date
 * [x] Payment Method
 * [-] Invoice?
 */

// line items information within the order
// (extract from `checkout.session.line_items.data`)
const itemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  name: { type: String, required: true },
  image: { type: String, required: true },
  unitAmount: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// shipping address associated with this order
// (extract from `checkout.session.shipping_details`)
const shippingDetailsSchema = new Schema({
  name: String,
  address: String,
  city: String,
  province: String,
  country: String,
  postalCode: String,
});

// billing address retrieved from `checkout.session.payment_intent.payment_method`
const billingDetailsSchema = new Schema({
  email: String,
  name: String,
  address: String,
  city: String,
  province: String,
  country: String,
  postalCode: String,
});

// the payment method used for this order
// (extract from `checkout.session.payment_intent.payment_method)
const paymentMethodSchema = new Schema({
  billingDetails: billingDetailsSchema,
  brand: String,
  funding: String,
  last4: String,
  country: String,
  expMonth: Number,
  expYear: Number,
});

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      required: true,
    },
    items: [itemSchema],
    amountSubTotal: { type: Number, default: 0 },
    amountTotal: { type: Number, default: 0 },
    shippingDetails: shippingDetailsSchema,
    paymentMethod: paymentMethodSchema,
    deliveredAt: { type: Date },
    // Stripe info
    checkoutSessionId: { type: String, required: true },
  },
  { timestamps: true } // createdAt = purchasedDate
);

orderSchema.index({ userId: 1 });

export type OrderItem = InferSchemaType<typeof itemSchema>;
export type PaymentMethod = InferSchemaType<typeof paymentMethodSchema>;
export type Order = InferSchemaType<typeof orderSchema>;

export default model("Order", orderSchema);
