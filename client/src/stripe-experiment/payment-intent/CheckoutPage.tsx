import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import stripeServices from "stripe-experiment/payment-intent/stripe.service";
import CheckoutForm from "./CheckoutForm";
// import "./CheckoutPage.css";

/**
 * - Call `loadStripe` (with Stripe publishable key) outside of a
 * component’s render to avoid recreating the `Stripe` object on
 * every render.
 * - Pass the returned promise to `Elements` provider
 */

const stripePromise = loadStripe(
  "pk_test_51JvW3TAScVG3enFKnP8rHXvB4s4YJlinHuYh36Bd6A5lQu8YolAlkCZkdkpTONrg9tzhcrR5oBLGWXOhqcpDkrbo00yjdr79jf"
);

export default function CheckoutPage() {
  // Store the client secret which is used to complete a charge,
  // so handle it with discretion.
  // Don’t log it, embed it in URLs, or expose it to anyone but the customer.
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // Create PaymentIntent as soon as the page loads
        const result = await stripeServices.createPaymentIntent();
        setClientSecret(result);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    })();
  }, []);

  const appearance = {
    theme: "stripe" as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div id="checkout-root">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
