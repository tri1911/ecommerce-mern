import axios from "axios";

const baseUrl = "http://localhost:3001/api/stripe";

const createPaymentIntent = async () => {
  const {
    data: { clientSecret },
  } = await axios.post<{ clientSecret: string }>(
    `${baseUrl}/create-payment-intent`
  );
  return clientSecret;
};

const stripeServices = { createPaymentIntent };

export default stripeServices;
