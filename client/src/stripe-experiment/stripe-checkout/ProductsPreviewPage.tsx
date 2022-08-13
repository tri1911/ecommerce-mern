import axios from "axios";
import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useAppSelector } from "hooks";
import { generateConfig } from "utils/generate-auth-config.util";

const ProductDisplay = ({
  onSubmit,
}: {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) => (
  <section className="w-screen h-screen flex items-center justify-center">
    <form
      // action="http://localhost:3001/api/stripe-checkout/create-checkout-session"
      // method="POST"
      onSubmit={onSubmit}
    >
      <button className="default-btn" type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function ProductsPreviewPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const stripe = useStripe();

  const currentUser = useAppSelector((state) => state.auth.user);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!currentUser || !stripe) {
      return;
    }

    try {
      const {
        data: { sessionId },
      } = await axios.post<{ sessionId: string }>(
        "http://localhost:3001/api/stripe/create-checkout-session",
        {},
        generateConfig(currentUser.token)
      );

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (err) {
      setMessage((err as Error).message);
    }
  };

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay onSubmit={handleSubmit} />
  );
}
