import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { store } from "app/store";
import "index.css";
import App from "App";
import HomePage from "pages/home/HomePage";
import TrackOrderPage from "pages/others/TrackOrderPage";
import NotFoundPage from "pages/others/NotFoundPage";
import FAQPage from "pages/faq/FAQPage";
import ContactPage from "pages/contact/ContactPage";
import AboutUsPage from "pages/about/AboutUsPage";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
} from "pages/authentication";
import {
  MyAccountPage,
  ProfileSummary,
  ProfileEdit,
  AddressesList,
  AddressEdit,
  AddressAdd,
  PasswordUpdate,
  MyOrders,
  OrderDetails,
  OrderReturns,
  OrderReturnDetails,
  OrderCancellations,
  MyReviews,
  ReviewDetails,
  PaymentMethods,
  PaymentDetails,
  Voucher,
  MyWishlist,
} from "pages/account";
import { ProductDetailsPage, ProductsPage } from "pages/products";
import {
  CartPage,
  CheckoutPage,
  PaymentPage,
  OrderCompletePage,
} from "pages/checkout";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ExperimentPage from "components/experiment";
import StripeCheckoutWithPaymentIntent from "stripe-experiment/payment-intent/CheckoutPage";
import StripeCheckoutPage from "stripe-experiment/stripe-checkout/ProductsPreviewPage";

const container = document.getElementById("root")!;
const root = createRoot(container);

(async () => {
  const {
    data: { publishableKey },
  } = await axios.get<{ publishableKey: string }>(
    "http://localhost:3001/api/stripe/config"
  );

  const stripePromise = loadStripe(publishableKey);

  root.render(
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              {/* Authentication */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              {/* Account Information Management */}
              <Route path="account" element={<MyAccountPage />}>
                <Route path="summary" element={<ProfileSummary />} />
                <Route path="profile" element={<ProfileEdit />} />
                <Route path="address">
                  <Route index element={<AddressesList />} />
                  <Route path="edit" element={<AddressEdit />} />
                  <Route path="add" element={<AddressAdd />} />
                </Route>
                <Route path="password" element={<PasswordUpdate />} />
                <Route path="order">
                  <Route index element={<MyOrders />} />
                  <Route path="details" element={<OrderDetails />} />
                </Route>
                <Route path="order-return">
                  <Route index element={<OrderReturns />} />
                  <Route path="details" element={<OrderReturnDetails />} />
                </Route>
                <Route path="order-cancel" element={<OrderCancellations />} />
                <Route path="reviews">
                  <Route index element={<MyReviews />} />
                  <Route path="details" element={<ReviewDetails />} />
                </Route>
                <Route path="payment-method">
                  <Route index element={<PaymentMethods />} />
                  <Route path="details" element={<PaymentDetails />} />
                </Route>
                <Route path="voucher" element={<Voucher />} />
                <Route path="wishlist" element={<MyWishlist />} />
              </Route>
              {/* Products Catalog */}
              <Route path="categories/:categoryId" element={<ProductsPage />} />
              <Route
                path="products/:productId"
                element={<ProductDetailsPage />}
              />
              {/* Cart & Checkout workflow */}
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="order-complete" element={<OrderCompletePage />} />
              {/* Others */}
              <Route path="track-order" element={<TrackOrderPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="about" element={<AboutUsPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            {/* Testings */}
            <Route path="/experiment" element={<ExperimentPage />} />
            <Route
              path="/stripe-payment-intent"
              element={<StripeCheckoutWithPaymentIntent />}
            />
            <Route path="/stripe-checkout" element={<StripeCheckoutPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Elements>
  );
})();
