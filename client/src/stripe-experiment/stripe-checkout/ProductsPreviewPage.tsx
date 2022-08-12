import { useEffect, useState } from "react";

const ProductDisplay = () => (
  <section className="w-screen h-screen flex items-center justify-center">
    <form
      action="http://localhost:3001/api/stripe-checkout/create-checkout-session"
      method="POST"
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

  return message ? <Message message={message} /> : <ProductDisplay />;
}
