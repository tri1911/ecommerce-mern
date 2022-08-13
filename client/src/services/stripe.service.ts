import axios from "axios";
import { generateConfig } from "utils/generate-auth-config.util";

const baseUrl = "http://localhost:3001/api/stripe";

const createCheckoutSession = async ({ token }: { token: string }) => {
  const {
    data: { sessionId },
  } = await axios.post<{ sessionId: string }>(
    `${baseUrl}/create-checkout-session`,
    {},
    generateConfig(token)
  );
  return sessionId;
};

const stripeServices = { createCheckoutSession };

export default stripeServices;
