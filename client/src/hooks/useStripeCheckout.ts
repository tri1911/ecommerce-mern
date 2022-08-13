import { useStripe } from "@stripe/react-stripe-js";
import { useAppSelector } from "hooks";
import StripeServices from "services/stripe.service";

const useStripeCheckout = () => {
  const stripe = useStripe();
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleCheckout: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    if (!stripe || !currentUser) {
      return;
    }

    const sessionId = await StripeServices.createCheckoutSession({
      token: currentUser?.token,
    });

    await stripe.redirectToCheckout({ sessionId });
  };

  return { handleCheckout };
};

export default useStripeCheckout;
