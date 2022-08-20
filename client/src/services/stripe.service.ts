import axios from "axios";
import { generateConfig } from "utils/generate-auth-config.util";

const baseUrl = "/api/stripe";

const getPublishableKey = async () => {
  const {
    data: { publishableKey },
  } = await axios.get<{ publishableKey: string }>(`${baseUrl}/config`);

  return publishableKey;
};

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

const stripeServices = { getPublishableKey, createCheckoutSession };

export default stripeServices;
