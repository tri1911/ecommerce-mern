import axios from "axios";
import { generateConfig } from "utils/generate-auth-config.util";

const baseUrl = "http://localhost:3001/api/orders";

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  unitAmount: number;
  quantity: number;
}

interface AddressDetails {
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}

interface ShippingDetails extends AddressDetails {
  name: string;
}
interface BillingDetails extends AddressDetails {
  name: string;
  email: string;
}

interface PaymentMethod {
  billingDetails: BillingDetails;
  brand: string;
  funding: string;
  last4: string;
  country: string;
  expMonth: string;
  expYear: string;
}

export interface Order {
  _id: string;
  userId: string;
  status: string;
  items: OrderItem[];
  amountSubTotal: number;
  amountTotal: number;
  shippingDetails: ShippingDetails;
  paymentMethod: PaymentMethod;
  stripeCheckoutId: string;
  createdAt: string;
}

const getOrdersByUser = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const {
    data: { orders },
  } = await axios.get<{ orders: Order[] }>(
    `${baseUrl}/${userId}`,
    generateConfig(token)
  );
  return orders;
};

const orderServices = { getOrdersByUser };

export default orderServices;
